import { useEffect } from 'react'

export type Study = {
  title: string
  accent: string
  status: string
  problem: string
  decisions: Array<{ q: string; a: string }>
  arch: string[]
  outcomes: string[]
  links: Array<{ label: string; href: string }>
}

export const STUDIES: Record<string, Study> = {
  quarters: {
    title: 'Quarters — case study',
    accent: '#2f6bff',
    status: 'Live in production',
    problem:
      'Hostel & PG operators in India mostly run on spreadsheets and WhatsApp — rooms, tenants, rent and receipts scattered everywhere. I wanted to solve that properly, and to prove I could own a product end-to-end: frontend, API, database, deployment.',
    decisions: [
      { q: 'How to isolate each hostel\'s data?', a: 'True multi-tenancy: a tenant plugin injects the organisation scope into every database model automatically — isolation by architecture, not by remembering to filter.' },
      { q: 'How to make it a business, not a demo?', a: 'Self-serve onboarding (register → org + admin + trial in one flow), billing plans with usage limits, and a full payment lifecycle with polished PDF receipts.' },
      { q: 'Buy or build the UI?', a: 'Hand-built design system with dark mode — the product had to feel like a product.' },
    ],
    arch: ['React SPA', 'Express API (JWT)', 'MongoDB Atlas'],
    outcomes: [
      'Deployed and live — Vercel (frontend) + Render (API) + Atlas (data)',
      'Real multi-tenant SaaS mechanics: trials, plans, limits, receipts',
      'Built solo, end to end — design to deployment',
    ],
    links: [{ label: 'GitHub repo ↗', href: 'https://github.com/prashant1234568/hostelhub' }],
  },
  signet: {
    title: 'Signet — case study',
    accent: '#0eaa5f',
    status: 'Open source',
    problem:
      'IT teams track laptops and equipment in Excel: no audit trail, no accountability when hardware moves. Signet replaces that with a proper platform — and it was my testbed for enterprise patterns built solo: a design system, RBAC, and typed architecture.',
    decisions: [
      { q: 'How to ship a frontend before the backend exists?', a: 'A fully typed mock-API layer behind the same interfaces the real API will use — the app runs standalone today and swaps to live endpoints without rewrites.' },
      { q: 'How do handovers become accountable?', a: 'A 3-step wizard ending in a signed acknowledgement PDF — signature captured in-app, document generated client-side.' },
      { q: 'Who can do what?', a: 'RBAC via a capability map (admin / manager / junior) gating routes, actions and UI — never inline role checks.' },
    ],
    arch: ['React 18 + TS strict', 'TanStack Query v5', 'Typed mock-API layer'],
    outcomes: [
      'Own design system ("ledger" theme) with dark mode',
      'Dashboard analytics, asset registry, audit timeline, Excel import',
      'Enterprise architecture patterns, demonstrated solo',
    ],
    links: [{ label: 'GitHub repo ↗', href: 'https://github.com/prashnat-MSBC/signet' }],
  },
  adc: {
    title: 'ai-diff-check — case study',
    accent: '#7c5cff',
    status: 'Published on npm',
    problem:
      "AI coding agents write code fast — and slip in subtle problems humans skim past: duplicated logic, dead exports, stubbed error handling, untested changes. I ship with AI daily, so I built the review gate I wanted to exist.",
    decisions: [
      { q: 'LLM-powered reviewer?', a: 'No — deterministic AST analysis. Same input, same verdict, runs offline, free, and no code leaves your machine. A review gate should be dependable, not probabilistic.' },
      { q: 'How does it fit a real workflow?', a: 'Zero-config: npx ai-diff-check in any repo, reviews the diff before commit. If a tool needs setup, nobody runs it.' },
    ],
    arch: ['TypeScript CLI', 'AST parsing', 'Rule engine → report'],
    outcomes: [
      'Published on npm — 10+ releases',
      'Verified on real projects: genuine detections, no false positives',
      'My answer to shipping AI-generated code responsibly',
    ],
    links: [
      { label: 'npm package ↗', href: 'https://www.npmjs.com/package/ai-diff-check' },
      { label: 'GitHub repo ↗', href: 'https://github.com/prashant1234568/ai-diff-check' },
    ],
  },
  clovers: {
    title: 'Clovers — case study',
    accent: '#ff8a3d',
    status: 'React · REST',
    problem:
      'A grocery storefront built to master real e-commerce flows end to end — not a todo app: catalogue, search, cart, checkout-adjacent flows and the state management they actually require.',
    decisions: [
      { q: 'How to keep 10+ screens consistent?', a: 'Composed from reusable, responsive components — one card, one list, one form pattern reused everywhere.' },
      { q: 'How to keep it honest?', a: 'A 21-test suite over the flows — features count when they\'re verified.' },
    ],
    arch: ['React SPA', 'JSON REST API'],
    outcomes: [
      'Full e-commerce tier: search, reviews, wishlist, coupons, order timeline',
      'Cart & address flows with reusable component architecture',
      '21 passing tests',
    ],
    links: [{ label: 'GitHub repo ↗', href: 'https://github.com/parmarprashantsingh883/clovers' }],
  },
}

export default function CaseStudy({ id, onClose }: { id: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!id) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [id, onClose])

  const s = id ? STUDIES[id] : null
  if (!s) return null
  return (
    <div className="cs-overlay" onClick={onClose}>
      <aside className="cs-drawer" role="dialog" aria-label={s.title} onClick={(e) => e.stopPropagation()} style={{ ['--pc' as string]: s.accent }}>
        <div className="cs-head">
          <div>
            <span className="cs-status">{s.status}</span>
            <h3>{s.title}</h3>
          </div>
          <button className="chat-x" onClick={onClose} aria-label="Close case study">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="cs-body">
          <h5>The problem</h5>
          <p>{s.problem}</p>

          <h5>Key decisions</h5>
          {s.decisions.map((d) => (
            <div className="cs-dec" key={d.q}>
              <b>{d.q}</b>
              <p>{d.a}</p>
            </div>
          ))}

          <h5>Architecture</h5>
          <div className="cs-arch">
            {s.arch.map((a, i) => (
              <span key={a}>
                <span className="cs-node">{a}</span>
                {i < s.arch.length - 1 && <span className="cs-arrow">→</span>}
              </span>
            ))}
          </div>

          <h5>Outcomes</h5>
          <ul className="cs-out">
            {s.outcomes.map((o) => <li key={o}>{o}</li>)}
          </ul>

          <div className="cs-links">
            {s.links.map((l) => (
              <a key={l.href} className="btn line" href={l.href} target="_blank" rel="noopener">{l.label}</a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
