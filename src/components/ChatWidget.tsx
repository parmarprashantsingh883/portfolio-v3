import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ask } from '../lib/chatEngine'
import { DEFAULT_CHIPS, GREETING } from '../lib/chatKB'

type Msg = { role: 'user' | 'bot'; text: string; chips?: string[]; instant?: boolean }

const timeGreeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning!' : h < 17 ? 'Good afternoon!' : 'Good evening!'
}

/* animated robot mascot: blinking eyes + cursor-tracking pupils (wired in ChatWidget) */
function BotFace() {
  return (
    <svg className="bot-face" viewBox="0 0 48 48" aria-hidden>
      <line className="bf-ant" x1="24" y1="10" x2="24" y2="4.5" />
      <circle className="bf-tip" cx="24" cy="3.6" r="2.4" />
      <rect className="bf-head" x="7" y="10" width="34" height="29" rx="11" />
      <circle className="bf-pupil" cx="17.5" cy="23.5" r="3" />
      <circle className="bf-pupil" cx="30.5" cy="23.5" r="3" />
      <rect className="bf-lid" x="13" y="19" width="9" height="9" rx="4.5" />
      <rect className="bf-lid" x="26" y="19" width="9" height="9" rx="4.5" />
      <path className="bf-smile" d="M18.5 31.5q5.5 4.4 11 0" />
      <circle className="bf-cheek" cx="13.4" cy="29.4" r="1.9" />
      <circle className="bf-cheek" cx="34.6" cy="29.4" r="1.9" />
    </svg>
  )
}

/* markdown-lite → React nodes: **bold**, [text](url), newlines. No innerHTML. */
function render(text: string): ReactNode[] {
  return text.split('\n').flatMap((line, li, arr) => {
    const nodes: ReactNode[] = []
    const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/g
    let last = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(line))) {
      if (m.index > last) nodes.push(line.slice(last, m.index))
      if (m[1] !== undefined) nodes.push(<b key={`${li}-${m.index}b`}>{m[1]}</b>)
      else if (m[2] !== undefined) {
        const href = m[3]
        const external = /^https?:/i.test(href)
        nodes.push(
          <a key={`${li}-${m.index}a`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined}>
            {m[2]}
          </a>,
        )
      } else if (m[4] !== undefined) nodes.push(<code key={`${li}-${m.index}c`}>{m[4]}</code>)
      last = m.index + m[0].length
    }
    if (last < line.length) nodes.push(line.slice(last))
    return li < arr.length - 1 ? [...nodes, <br key={`${li}-br`} />] : nodes
  })
}

/* bot replies stream in line-by-line (markdown stays intact per line) */
function StreamedText({ text, instant, onGrow }: { text: string; instant?: boolean; onGrow: () => void }) {
  const lines = text.split('\n')
  const [n, setN] = useState(instant || matchMedia('(prefers-reduced-motion: reduce)').matches ? lines.length : 1)
  useEffect(() => {
    if (n >= lines.length) return
    const t = setTimeout(() => {
      setN(n + 1)
      onGrow()
    }, 170)
    return () => clearTimeout(t)
  }, [n, lines.length, onGrow])
  return <>{render(lines.slice(0, n).join('\n'))}</>
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [tease, setTease] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* one-time attention nudge above the FAB */
  useEffect(() => {
    if (sessionStorage.getItem('pf-teased')) return
    const show = setTimeout(() => setTease(true), 4500)
    const hide = setTimeout(() => setTease(false), 15000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  /* pupils follow the cursor (fine pointers only) */
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return
    const onMove = (e: MouseEvent) => {
      document.querySelectorAll<SVGSVGElement>('.bot-face').forEach((face) => {
        const r = face.getBoundingClientRect()
        if (r.width === 0) return
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const d = Math.hypot(dx, dy) || 1
        const m = Math.min(2, (d / 60) * 2)
        const t = `translate(${((dx / d) * m).toFixed(2)} ${((dy / d) * m).toFixed(2)})`
        face.querySelectorAll('.bf-pupil').forEach((p) => p.setAttribute('transform', t))
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const openChat = () => {
    setOpen(true)
    setTease(false)
    sessionStorage.setItem('pf-teased', '1')
  }

  /* command palette → open chat */
  useEffect(() => {
    const on = () => openChat()
    window.addEventListener('pf-open-chat', on)
    return () => window.removeEventListener('pf-open-chat', on)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ role: 'bot', text: `${timeGreeting()} ${GREETING.replace('Hi! ', '')}`, chips: DEFAULT_CHIPS, instant: true }])
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 120)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, typing])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const send = async (raw?: string) => {
    const q = (raw ?? input).trim()
    if (!q || typing) return
    setInput('')
    const history = msgs.map((m) => ({ role: m.role === 'bot' ? ('assistant' as const) : ('user' as const), content: m.text }))
    setMsgs((prev) => [...prev, { role: 'user', text: q }])
    setTyping(true)
    const started = performance.now()
    const reply = await ask(q, history)
    // small floor so instant local answers still read as "thought about it"
    const wait = Math.max(0, 500 + Math.min(q.length * 8, 400) - (performance.now() - started))
    setTimeout(() => {
      setMsgs((prev) => [...prev, { role: 'bot', text: reply.text, chips: reply.chips }])
      setTyping(false)
      inputRef.current?.focus()
    }, wait)
  }

  const lastChips = !typing && msgs.length > 0 ? msgs[msgs.length - 1].chips : undefined

  return (
    <>
      {tease && !open && (
        <button className="chat-tease" onClick={openChat}>
          <b>Hi! I'm Prashant's AI 👋</b>
          <span>Ask me anything — try "rate him /10"</span>
        </button>
      )}
      <button className={`chat-fab${open ? ' hidden' : ''}`} onClick={openChat} aria-label="Ask AI about Prashant">
        <BotFace />
        Ask AI
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with Prashant's AI assistant">
          <div className="chat-head">
            <span className="bot" aria-hidden>
              <BotFace />
            </span>
            <div className="t">
              <b>Prashant's AI assistant</b>
              <span><i className="d" /> knows his work · replies instantly</span>
            </div>
            <button className="chat-x" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.role === 'bot' ? (
                  <StreamedText text={m.text} instant={m.instant} onGrow={() => {
                    const el = bodyRef.current
                    if (el) el.scrollTop = el.scrollHeight
                  }} />
                ) : (
                  m.text
                )}
              </div>
            ))}
            {typing && (
              <div className="typing" aria-label="Assistant is typing">
                <i /><i /><i />
              </div>
            )}
          </div>

          {lastChips && lastChips.length > 0 && (
            <div className="chat-chips">
              {lastChips.map((c) => (
                <button key={c} className="chat-chip" onClick={() => send(c)}>{c}</button>
              ))}
            </div>
          )}

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about his work, projects, skills…"
              aria-label="Your question"
              maxLength={300}
            />
            <button className="chat-send" type="submit" disabled={!input.trim() || typing} aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          <div className="chat-note">local knowledge engine · upgrades to a live LLM when deployed with an API key</div>
        </div>
      )}
    </>
  )
}
