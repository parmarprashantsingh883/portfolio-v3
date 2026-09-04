/* Vercel serverless function: POST /api/chat
   Optional real-LLM mode for the portfolio assistant. The widget works
   without this (local knowledge engine). To activate LLM answers, set ONE
   of these env vars in Vercel — checked in this order:

     ANTHROPIC_API_KEY    console.anthropic.com          (paid, best quality)
     GROQ_API_KEY         console.groq.com/keys          (FREE tier, no card, fast)
     GEMINI_API_KEY       aistudio.google.com/apikey     (FREE tier)
     OPENROUTER_API_KEY   openrouter.ai/settings/keys    (free models available)

   CHAT_MODEL optionally overrides the provider's default model. */
import Anthropic from '@anthropic-ai/sdk'

import { SYSTEM } from '../src/lib/chatPersona'

const MAX_CHARS = 600
type Msg = { role: 'user' | 'assistant'; content: string }

/* ---------- providers ---------- */

async function viaAnthropic(messages: Msg[]): Promise<string | null> {
  const client = new Anthropic()
  const response = await client.messages.create({
    model: process.env.CHAT_MODEL || 'claude-opus-4-8',
    max_tokens: 400,
    system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
    messages,
  })
  if (response.stop_reason === 'refusal') return null
  return response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim()
}

/** OpenAI-compatible chat completions (Groq, OpenRouter) */
async function viaOpenAICompat(messages: Msg[], url: string, key: string, model: string): Promise<string | null> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: process.env.CHAT_MODEL || model,
      max_tokens: 400,
      messages: [{ role: 'system', content: SYSTEM }, ...messages],
    }),
  })
  if (!res.ok) throw new Error(`upstream ${res.status}`)
  const data: any = await res.json()
  const text = data?.choices?.[0]?.message?.content
  return typeof text === 'string' ? text.trim() : null
}

async function viaGemini(messages: Msg[], key: string): Promise<string | null> {
  const model = process.env.CHAT_MODEL || 'gemini-2.5-flash'
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
        generationConfig: { maxOutputTokens: 400 },
      }),
    },
  )
  if (!res.ok) throw new Error(`upstream ${res.status}`)
  const data: any = await res.json()
  const text = (data?.candidates?.[0]?.content?.parts ?? [])
    .map((p: any) => (typeof p?.text === 'string' ? p.text : ''))
    .join('')
  return text.trim() || null
}

/* ---------- handler ---------- */

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  const raw = Array.isArray(body.messages) ? body.messages : []
  const messages: Msg[] = raw
    .filter(
      (m: any): m is Msg =>
        m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim() !== '',
    )
    .slice(-8)
    .map((m: Msg) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    res.status(400).json({ error: 'messages must end with a user turn' })
    return
  }

  const { ANTHROPIC_API_KEY, GROQ_API_KEY, GEMINI_API_KEY, OPENROUTER_API_KEY } = process.env
  try {
    let reply: string | null = null
    if (ANTHROPIC_API_KEY) {
      reply = await viaAnthropic(messages)
    } else if (GROQ_API_KEY) {
      reply = await viaOpenAICompat(messages, 'https://api.groq.com/openai/v1/chat/completions', GROQ_API_KEY, 'openai/gpt-oss-120b')
    } else if (GEMINI_API_KEY) {
      reply = await viaGemini(messages, GEMINI_API_KEY)
    } else if (OPENROUTER_API_KEY) {
      reply = await viaOpenAICompat(messages, 'https://openrouter.ai/api/v1/chat/completions', OPENROUTER_API_KEY, 'meta-llama/llama-3.3-70b-instruct:free')
    } else {
      // no provider configured — the widget silently falls back to its local engine
      res.status(501).json({ error: 'not configured' })
      return
    }
    res.status(200).json({ reply: reply || null })
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      res.status(429).json({ error: 'rate limited' })
    } else {
      res.status(502).json({ error: 'upstream error' })
    }
  }
}
