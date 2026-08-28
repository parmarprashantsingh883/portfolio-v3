import type { CSSProperties } from 'react'
import { CheckIcon } from './icons'

const rc = (c: string) => ({ '--rc': c }) as CSSProperties
const cc = (c: string) => ({ '--c': c }) as CSSProperties

const BULLETS = [
  <>Built the <b>RBAC access-management UI</b> — permission gating for modules, routes and actions across all <b>5 ERP modules</b>.</>,
  <>Delivered <b>country-aware tax, bank &amp; address configuration</b> for 4 regions (IN · UK · US · AUS) with typed React Hook Form + Zod flows.</>,
  <>Refactored brittle screens into <b>reusable typed components</b> and aligned frontend contracts to the API — killing a recurring class of HTTP 400s.</>,
  <>Own features from spec to release: <b>PRD gap analysis, PR reviews</b>, and every change gated by strict tsc, Vitest &amp; Playwright.</>,
  <><b>Debug &amp; root-cause production issues</b> through the component tree, the TanStack Query data layer and REST API contracts — fixing causes, not symptoms.</>,
  <>Triage QA reports into <b>frontend vs backend defects</b> and turn them into reviewed, test-passing PRs — accelerated by an AI-assisted workflow.</>,
]

export default function Experience() {
  return (
    <section className="pad" id="experience" style={{ paddingTop: 30 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i />Experience</span>
          <h2 className="sec-title">Building at enterprise scale.</h2>
        </div>
        <div className="xp-wrap">
          <span className="hand xp-note">my real company project — live in production!</span>
          <div className="xp-card rv">
          <div className="xp-head">
            <div className="xp-title">Software Development Engineer · <b>MSBC Group</b></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className="badge live">● Live in production</span>
              <div className="xp-date">Mar 2026 — Present</div>
            </div>
          </div>
          <p className="xp-ctx">
            <b style={{ color: 'var(--ink)' }}>DWERP</b> — a <b style={{ color: 'var(--ink)' }}>real commercial product</b>, not a demo: a live, enterprise multi-tenant SaaS ERP built by MSBC Group for the fenestration &amp; glass industry, which manufacturing teams run their business on every day — sales, inventory, production, delivery and finance. React 19 · TypeScript (strict) · Vite · Tailwind · TanStack Query v5.
          </p>

          <div className="xp-roles">
            <div className="xp-role-card" style={rc('#2f6bff')}>
              <span className="k">01</span>
              <span className="ri">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><path d="m8 9-3 3 3 3M16 9l3 3-3 3M13.5 6l-3 12" /></svg>
              </span>
              <h5>Develop</h5>
              <p>Ship features end-to-end on a live product — RBAC screens, typed forms, data layers and multi-region configuration.</p>
            </div>
            <div className="xp-role-card" style={rc('#0eaa5f')}>
              <span className="k">02</span>
              <span className="ri">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><circle cx="12" cy="13" r="5" /><path d="M12 8V6M9.5 6.5 8 5M14.5 6.5 16 5M7 13H4.5M19.5 13H17M8.5 17.5 7 19.5M15.5 17.5 17 19.5M12 10.5v2.5l1.5 1.5" /></svg>
              </span>
              <h5>Debug</h5>
              <p>Root-cause production issues across the component tree, TanStack Query cache and REST API contracts.</p>
            </div>
            <div className="xp-role-card" style={rc('#7c5cff')}>
              <span className="k">03</span>
              <span className="ri">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" /><path d="m10.5 12 1.2 1.2 2.3-2.6" /></svg>
              </span>
              <h5>Review</h5>
              <p>Review pull requests and gate every merge with strict tsc, Vitest &amp; Playwright — quality is part of the job.</p>
            </div>
          </div>

          <div className="xp-mods">
            <span className="lbl">Modules I work across</span>
            <span className="mod">CRM</span><span className="mod">Sales</span><span className="mod">Inventory</span><span className="mod">Production</span><span className="mod">Delivery &amp; Finance</span>
            <span className="mod all">RBAC on all 5</span>
          </div>

          <ul className="xp-list">
            {BULLETS.map((b, i) => (
              <li className="xp-item" key={i}><CheckIcon /><span>{b}</span></li>
            ))}
          </ul>
          </div>
        </div>

        <div className="stats" style={{ marginTop: 22 }}>
          <div className="stat rv" style={cc('#2f6bff')}>
            <div className="stat-k">In production</div>
            <div className="v">Live</div>
            <div className="l">enterprise ERP used by real manufacturing teams, every day</div>
          </div>
          <div className="stat rv" data-d="1" style={cc('#7c5cff')}>
            <div className="stat-k">Quality gate</div>
            <div className="v"><span data-count="100">0</span>%</div>
            <div className="l">of my code ships typed (strict TS) &amp; test-gated</div>
          </div>
          <div className="stat rv" data-d="2" style={cc('#0eaa5f')}>
            <div className="stat-k">End-to-end</div>
            <div className="v"><span data-count="4">0</span>+</div>
            <div className="l">products designed, built &amp; deployed — frontend to database</div>
          </div>
          <div className="stat rv" data-d="3" style={cc('#ff8a3d')}>
            <div className="stat-k">Open source</div>
            <div className="v"><span data-count="10">0</span>+</div>
            <div className="l">released versions of ai-diff-check, my code-review CLI</div>
          </div>
        </div>
      </div>
    </section>
  )
}
