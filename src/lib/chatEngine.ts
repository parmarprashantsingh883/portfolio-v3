import {
  BRIEFS,
  COMPARE_VERDICTS,
  DEFAULT_CHIPS,
  KB,
  SKILL_FACTS,
  SKILL_LOOKUP,
  SYNONYMS,
  type KBEntry,
} from './chatKB'

export type BotReply = { text: string; chips: string[] }

/* ---------- parsing ---------- */

const rawTokens = (q: string): string[] =>
  q
    .toLowerCase()
    .replace(/\.js\b/g, 'js') // next.js → nextjs, node.js → nodejs
    .replace(/[^a-z0-9\s@+#-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

const canonTokens = (toks: string[]): string[] => toks.map((t) => SYNONYMS[t] ?? t)

const isYesNoQ = (q: string) =>
  /^(does|do|did|is|has|have|had|can|could|would|will|was|are|any)\b/i.test(q.trim()) ||
  /\b(know|knows|use|uses|used|familiar|worked|work with|experience (with|in|of)|comfortable)\b/i.test(q)

const PROJECT_IDS = new Set(['quarters', 'signet', 'adc', 'clovers', 'dwerp'])

let lastEntry: KBEntry | null = null

/* ---------- small talk ---------- */

const SMALLTALK: Array<[RegExp, () => BotReply]> = [
  [
    /^(hi+|hey+|hello+|yo|hola|namaste|sup|good (morning|afternoon|evening))\b/i,
    () => ({
      text: 'Hey! 👋 Great to have you here. Ask me anything about Prashant — his work, projects, or how to reach him.',
      chips: DEFAULT_CHIPS,
    }),
  ],
  [
    /\b(thanks|thank you|thx|ty|appreciated)\b/i,
    () => ({ text: "You're welcome! Anything else you'd like to know? 😊", chips: ['His projects', 'Contact him', 'Download resume'] }),
  ],
  [
    /\b(bye|goodbye|see you|later|cya)\b/i,
    () => ({
      text: 'Thanks for stopping by! If anything stood out, **[drop Prashant an email](mailto:parmarprashantsingh883@gmail.com)** — he replies fast. 👋',
      chips: [],
    }),
  ],
  [
    /\b(help|what can you (do|answer)|options)\b/i,
    () => ({
      text: "I can genuinely answer questions, not just recite: try **\"rate him out of 10\"**, **\"does he know Next.js?\"**, **\"Quarters vs Signet?\"** — or anything about his work, projects, skills, education and contact.",
      chips: DEFAULT_CHIPS,
    }),
  ],
]

/* ---------- opinion & evaluation questions ---------- */

function opinionAnswer(q: string, raw: string[]): BotReply | null {
  // "rate him /10", "score", "marks out of ten"
  if (/\b(rate|rating|score|scale|marks?|out of (ten|10)|\/10)\b/i.test(q)) {
    // tailored rating when a specific skill is named ("rate his react skills")
    const skillIds = [...new Set(raw.map((t) => SKILL_LOOKUP[t]).filter(Boolean))] as string[]
    if (skillIds.length === 1) {
      const f = SKILL_FACTS[skillIds[0]]
      if (f) {
        return f.known
          ? { text: `On that specifically? **9/10** — ${f.text}\n(The missing point is because I'm programmed to leave room for growth 😄)`, chips: ['Rate him overall', 'His projects', 'Contact him'] }
          : { text: `Honest score today: **low — he hasn't shipped it yet.** ${f.text}\nRate him on what he HAS shipped instead:`, chips: ['Rate him overall', 'What he IS deep in', 'Contact him'] }
      }
    }
    return {
      text:
        "I'm his AI assistant, so grain of salt 😄 — but let's do it properly:\n" +
        '→ React + TypeScript craft: **9/10** — React 19 + strict TS on a live enterprise ERP\n' +
        '→ Shipping end-to-end: **9/10** — a deployed SaaS and an npm CLI, both solo\n' +
        '→ AI-assisted development: **10/10** — his headline skill; he even built ai-diff-check\n' +
        '→ Objectivity of this rating: **6/10** 😉\n' +
        "**Verdict: strong hire for a React/TypeScript role.** Interview him and score him yourself — [email him](mailto:parmarprashantsingh883@gmail.com).",
      chips: ['Why hire him?', 'His projects', 'Contact him'],
    }
  }
  // "should I hire / would you recommend / worth interviewing / good fit"
  if (/\b(recommend|should (i|we) (hire|interview|consider)|worth (hiring|interviewing|a look)|good fit|hire him)\b/i.test(q)) {
    return {
      text:
        'If you need a React/TypeScript engineer who **ships** and is genuinely **AI-native** — yes, without hesitation.\nThe receipts: live enterprise-ERP production work, a deployed multi-tenant SaaS (Quarters), an npm-published CLI (ai-diff-check). Junior title, senior habits.\nWorst case of [emailing him](mailto:parmarprashantsingh883@gmail.com)? A good conversation.',
      chips: ['Download resume', 'His projects', 'Contact him'],
    }
  }
  // "is he good / how good / talented / skilled / what do you think of him"
  if (/\b(how good|is he (good|talented|skilled|smart|any good)|what do you think (of|about)|your opinion)\b/i.test(q)) {
    return {
      text:
        "Genuinely good — and I can point at evidence rather than adjectives:\n→ his code runs in a **live enterprise ERP** that real businesses use daily\n→ he's **deployed a whole SaaS solo** (frontend, API, database)\n→ his npm CLI has **10+ releases** and real users\nHonest caveat: he's early-career on paper. Judged on **output**, he plays above the title.",
      chips: ['Rate him /10', 'Why hire him?', 'His projects'],
    }
  }
  // "best / favorite / proudest project"
  if (/\b(best|favorite|favourite|proudest|top)\b/i.test(q) && /\b(project|work|thing|build)\b/i.test(q)) {
    return {
      text:
        "His proudest build is **Quarters** — because it's the whole job in one project: designed, built and **deployed solo** (React frontend, Node/Express API, MongoDB Atlas), with real multi-tenancy, billing and PDF receipts. It's live.\nThe judges' favorite though might be **ai-diff-check** — an npm CLI born from a genuinely original take on AI code quality.",
      chips: ['Tell me about Quarters', 'What is ai-diff-check?', 'Rate him /10'],
    }
  }
  // a little fun
  if (/\b(joke|funny|make me laugh)\b/i.test(q)) {
    return {
      text: 'Why did the React developer stay calm during the production incident?\nBecause he had **strict TypeScript** and the bug literally couldn\'t compile 😄\n(Prashant would add: "…and Playwright caught it before deploy anyway.")',
      chips: DEFAULT_CHIPS,
    }
  }
  return null
}

/* ---------- reasoning steps ---------- */

/** months since he started at MSBC, computed live */
function experienceAnswer(q: string): BotReply | null {
  if (!/\b(how (long|much|many)|years?|months?)\b/i.test(q) || !/\b(experience|experienced|working|coding|work)\b/i.test(q)) return null
  const start = new Date(2026, 2, 1) // Mar 2026
  const now = new Date()
  const months = Math.max(1, (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()))
  const span = months < 12 ? `${months} month${months === 1 ? '' : 's'}` : `${Math.floor(months / 12)}+ year${months >= 24 ? 's' : ''}`
  return {
    text:
      `Hands-on production experience: **${span}** shipping to a **live enterprise ERP** (DWERP at MSBC Group, since March 2026) — real users, real consequences, not tutorials.\n` +
      'But the fairer measure is what he shipped *around* it: a **deployed multi-tenant SaaS** (Quarters), an **npm-published CLI** (ai-diff-check) and a full design-system platform (Signet) — all solo. Output over years. 📈',
    chips: ['His experience at MSBC', 'Show me his projects', 'Why hire him?'],
  }
}

/** "quarters vs signet" style comparisons */
function comparisonAnswer(canon: string[]): BotReply | null {
  const found = [...new Set(canon.filter((t) => PROJECT_IDS.has(t)))]
  if (found.length < 2) return null
  const [a, b] = found.map((t) => (t === 'dwerp' ? 'work' : t))
  const verdict = found.includes('dwerp')
    ? '**DWERP** is the live-production credential — enterprise scale, real users, real consequences. The solo builds prove he can own an entire product alone. Different proof, same engineer.'
    : COMPARE_VERDICTS[`${a}+${b}`] ?? COMPARE_VERDICTS[`${b}+${a}`] ?? COMPARE_VERDICTS.default
  return {
    text: `→ ${BRIEFS[a]}\n→ ${BRIEFS[b]}\n${verdict}`,
    chips: [`Tell me about ${a === 'adc' ? 'ai-diff-check' : a === 'work' ? 'DWERP' : a[0].toUpperCase() + a.slice(1)}`, 'His other projects', 'Contact him'],
  }
}

/** direct answers about specific technologies — including honest gaps */
function skillAnswer(q: string, raw: string[]): BotReply | null {
  const hits: string[] = []
  for (const t of raw) {
    const id = SKILL_LOOKUP[t]
    if (id && !hits.includes(id)) hits.push(id)
  }
  // "react native" bigram beats separate react + native hits
  if (/react[\s-]?native/i.test(q)) {
    const i = hits.indexOf('react')
    if (i !== -1) hits.splice(i, 1)
    if (!hits.includes('reactnative')) hits.unshift('reactnative')
  }
  if (hits.length === 0) return null

  const facts = hits.slice(0, 3).map((id) => SKILL_FACTS[id]).filter(Boolean)
  if (facts.length === 0) return null

  if (facts.length === 1) {
    const f = facts[0]
    const opener = isYesNoQ(q) ? (f.known ? '**Yes.** ' : '**Honest answer: not yet.** ') : ''
    return {
      text: opener + f.text,
      chips: f.known ? ['Projects using it', 'His full stack', 'Contact him'] : ['What he IS deep in', 'His AI workflow', 'Contact him'],
    }
  }
  const lines = facts.map((f) => `${f.known ? '✅' : '➖'} ${f.text}`)
  const knownCount = facts.filter((f) => f.known).length
  const opener =
    knownCount === facts.length ? '**Yes to all of those:**\n' : knownCount === 0 ? 'Honest scorecard:\n' : 'Mixed bag — honest scorecard:\n'
  return { text: opener + lines.join('\n'), chips: ['His full stack', 'His projects', 'Contact him'] }
}

/** stitch two strong topics into one composed answer ("his job and his projects?") */
function multiTopicAnswer(canon: string[], scored: Array<{ entry: KBEntry; score: number }>): BotReply | null {
  const strong = scored.filter((s) => s.score >= 1 && BRIEFS[s.entry.id]).slice(0, 3)
  if (strong.length < 2 || !canon.includes('and')) return null
  const lines = strong.map((s) => `→ ${BRIEFS[s.entry.id]}`)
  return {
    text: `Here's the short version of both:\n${lines.join('\n')}\nWant the deep dive on either one?`,
    chips: strong.map((s) => s.entry.chips?.[0] ?? 'Tell me more').slice(0, 3),
  }
}

/* ---------- core resolver ---------- */

function localAnswer(query: string): BotReply {
  for (const [re, make] of SMALLTALK) if (re.test(query)) return make()

  // follow-ups: "tell me more" / pronoun references resolve to the last topic
  if (/^\s*(tell me )?more\b|\b(elaborate|deeper|expand|details?)\b/i.test(query) && lastEntry?.more) {
    const entry = lastEntry
    lastEntry = null
    return { text: entry.more!, chips: entry.chips?.filter((c) => c !== 'Tell me more') ?? DEFAULT_CHIPS }
  }
  let q = query
  if (lastEntry && /\b(it|that|this one|the project)\b/i.test(q) && !/\b(what|who) (is|was) (it|that)\b/i.test(q)) {
    q = `${q} ${lastEntry.id}` // pronoun → last topic
  }

  const raw = rawTokens(q)
  const canon = canonTokens(raw)

  // reasoning layers, most specific first
  const op = opinionAnswer(q, raw)
  if (op) return op
  const exp = experienceAnswer(q)
  if (exp) return exp
  const cmp = comparisonAnswer(canon)
  if (cmp) return cmp
  const skill = skillAnswer(q, raw)
  if (skill) return skill

  // score KB entries
  const tokenSet = new Set(canon)
  const lower = q.toLowerCase()
  const scored = KB.map((entry) => {
    let score = 0
    for (const k of entry.keys) if (tokenSet.has(k)) score += 1
    for (const p of entry.phrases ?? []) if (lower.includes(p)) score += 5
    return { entry, score }
  }).sort((a, b) => b.score - a.score)

  const multi = multiTopicAnswer(canon, scored)
  if (multi) return multi

  const best = scored[0]
  if (best && best.score >= 1) {
    lastEntry = best.entry
    return { text: best.entry.answer, chips: best.entry.chips ?? DEFAULT_CHIPS }
  }

  // smart fallback: fuzzy-suggest the nearest topic instead of a generic shrug
  const STOP = new Set([
    'what', 'when', 'where', 'which', 'whose', 'does', 'did', 'tell', 'about', 'know', 'knows', 'have', 'has',
    'with', 'this', 'that', 'they', 'them', 'then', 'than', 'your', 'yours', 'from', 'were', 'will', 'would',
    'should', 'could', 'much', 'many', 'some', 'like', 'want', 'need', 'give', 'show',
  ])
  const near = KB.flatMap((e) => e.keys.map((k) => ({ e, k }))).find(({ k }) =>
    raw.some((t) => t.length > 3 && !STOP.has(t) && (k.startsWith(t.slice(0, 4)) || t.startsWith(k.slice(0, 4)))),
  )
  if (near) {
    lastEntry = near.e
    return {
      text: `I *think* you're asking about **${near.e.id === 'adc' ? 'ai-diff-check' : near.e.id}** — here's what I know:\n${near.e.answer}`,
      chips: near.e.chips ?? DEFAULT_CHIPS,
    }
  }
  return {
    text:
      "That one's outside my notes — I'd rather say so than make something up. I can genuinely answer things like **\"rate him /10\"**, **\"does he know Next.js?\"**, **\"Quarters vs Signet\"**, or anything about his **work, projects, skills and contact**. For the rest, [email him directly](mailto:parmarprashantsingh883@gmail.com).",
    chips: DEFAULT_CHIPS,
  }
}

/* ---- optional Claude upgrade ----
   In production we first try the /api/chat serverless function (real LLM).
   If it isn't configured (404/501) or errors, we fall back to the local
   engine and stop trying for the rest of the session. */

let remoteDown = !import.meta.env.PROD

type WireMsg = { role: 'user' | 'assistant'; content: string }

async function remoteAnswer(history: WireMsg[]): Promise<string | null> {
  if (remoteDown) return null
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-8) }),
      signal: ctrl.signal,
    })
    clearTimeout(timer)
    if (!res.ok) {
      remoteDown = true
      return null
    }
    const data = (await res.json()) as { reply?: string | null }
    return typeof data.reply === 'string' && data.reply.trim() ? data.reply : null
  } catch {
    remoteDown = true
    return null
  }
}

export async function ask(query: string, history: WireMsg[]): Promise<BotReply> {
  const remote = await remoteAnswer([...history, { role: 'user', content: query }])
  if (remote) return { text: remote, chips: DEFAULT_CHIPS }
  return localAnswer(query)
}
