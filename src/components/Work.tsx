import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import CaseStudy from './CaseStudy'

const pc = (c: string) => ({ '--pc': c }) as CSSProperties

type Project = {
  num: string
  sid: string
  accent: string
  title: string
  badge: { label: string; kind: 'live' | 'oss' | 'app' }
  role: string
  desc: string
  points: ReactNode[]
  tags: string[]
  repo: string
  note?: string
}

const PROJECTS: Project[] = [
  {
    num: '01',
    sid: 'quarters',
    accent: '#2f6bff',
    title: 'Quarters',
    badge: { label: '● Live in production', kind: 'live' },
    role: 'Multi-tenant hostel-management SaaS — solo build',
    desc: 'A complete SaaS designed, built and deployed solo — frontend, API and database all mine.',
    points: [
      <><b>Org-scoped multi-tenancy</b> on every model — true tenant isolation</>,
      <>Billing plans with trial limits, <b>full payment lifecycle</b> &amp; PDF receipts</>,
      <>Deployed on <b>Vercel · Render · MongoDB Atlas</b>, serving real users</>,
    ],
    tags: ['React', 'Node · Express', 'MongoDB Atlas', 'JWT'],
    repo: 'https://github.com/prashnat-MSBC/hostelhub',
    note: "my proudest build — it's live!",
  },
  {
    num: '02',
    sid: 'signet',
    accent: '#0eaa5f',
    title: 'Signet — IT Asset Management',
    badge: { label: 'Open source', kind: 'oss' },
    role: 'Enterprise-style asset platform — designed & built solo',
    desc: 'An IT asset-management product with its own design system — registry, handovers and audit trail.',
    points: [
      <>Live <b>dashboard analytics</b> — donut, area &amp; category breakdowns</>,
      <>3-step <b>handover wizard</b> with signed-acknowledgement PDF</>,
      <><b>RBAC-gated UI</b> on a fully typed mock-API architecture</>,
    ],
    tags: ['React 18', 'TypeScript strict', 'TanStack Query v5', 'Tailwind', 'Zod'],
    repo: 'https://github.com/prashnat-MSBC/signet',
  },
  {
    num: '03',
    sid: 'adc',
    accent: '#7c5cff',
    title: 'ai-diff-check',
    badge: { label: 'Open source', kind: 'oss' },
    role: 'CLI · code-quality tooling · 10+ releases',
    desc: "A CLI that reviews AI-written diffs before they're committed — my answer to shipping AI code responsibly.",
    points: [
      <><b>Published on npm</b> — runs with a single <b>npx ai-diff-check</b></>,
      <>Deterministic <b>AST analysis</b> — no cloud, no LLM required</>,
      <>Flags <b>duplicated logic, dead exports, stubbed handling</b> &amp; untested changes</>,
    ],
    tags: ['TypeScript', 'Node.js', 'AST', 'Vitest'],
    repo: 'https://github.com/prashnat-MSBC/ai-diff-check',
  },
  {
    num: '04',
    sid: 'clovers',
    accent: '#ff8a3d',
    title: 'Clovers',
    badge: { label: 'React · REST', kind: 'app' },
    role: 'Grocery e-commerce storefront',
    desc: 'A full grocery storefront built against a JSON REST API.',
    points: [
      <>Category filters, dynamic product pages, <b>cart &amp; wishlist</b> flows</>,
      <><b>Search, reviews, coupons</b> &amp; order timeline — a full e-commerce tier</>,
      <>Composed from <b>reusable, responsive components</b>, backed by <b>21 tests</b></>,
    ],
    tags: ['React', 'REST API', 'Responsive UI'],
    repo: 'https://github.com/parmarprashantsingh883/clovers',
  },
]

export default function Work() {
  const [study, setStudy] = useState<string | null>(null)
  return (
    <section className="pad" id="work" style={{ paddingTop: 30 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i />Selected work</span>
          <h2 className="sec-title">Projects I've shipped.</h2>
          <p className="sec-sub">Real products with real users and real constraints — built end-to-end.</p>
        </div>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <article className="proj rv" data-d={i % 2 === 1 ? 1 : undefined} key={p.num} style={pc(p.accent)}>
              <span className="proj-wm" aria-hidden>{p.num}</span>
              {p.note && <span className="hand proj-note">{p.note}</span>}
              <div className="proj-top"><h3>{p.title}</h3><span className={`badge ${p.badge.kind}`}>{p.badge.label}</span></div>
              <div className="proj-role">{p.role}</div>
              <p className="proj-desc">{p.desc}</p>
              <ul className="proj-points">
                {p.points.map((pt, j) => <li key={j}><span>{pt}</span></li>)}
              </ul>
              <div className="proj-tags">
                {p.tags.map((t) => <span className="ptag" key={t}>{t}</span>)}
              </div>
              <div className="proj-cta">
                <button className="cs-open" onClick={() => setStudy(p.sid)}>
                  Read the case study
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
                <a
                  className="proj-proof"
                  href={p.sid === 'adc' ? 'https://www.npmjs.com/package/ai-diff-check' : p.repo}
                  target="_blank"
                  rel="noopener"
                >
                  {p.sid === 'adc' ? 'npm ↗' : 'GitHub ↗'}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <CaseStudy id={study} onClose={() => setStudy(null)} />
    </section>
  )
}
