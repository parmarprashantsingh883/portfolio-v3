import type { CSSProperties } from 'react'

const vars = (dc: string, dcs: string) => ({ '--dc': dc, '--dcs': dcs }) as CSSProperties

export default function WhatIDo() {
  return (
    <section className="pad" id="what">
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i />What I do</span>
          <h2 className="sec-title">More than pixels — complete products.</h2>
          <p className="sec-sub">
            From a Figma frame or a PRD to a deployed, tested app — I cover the whole frontend craft and enough of the
            stack to ship alone.
          </p>
        </div>
        <div className="do-grid">
          <div className="do-card rv" style={vars('#2f6bff', '#eaf0ff')}>
            <div className="do-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M8 21h8M12 18v3" />
                <path d="m8.5 9.5 2 2-2 2M13 13.5h3" />
              </svg>
            </div>
            <h3>Build interfaces that feel great</h3>
            <p>Component-driven React UIs with real design sense — spacing, type, motion and micro-interactions that make products feel premium, not just functional.</p>
          </div>
          <div className="do-card rv" data-d="1" style={vars('#7c5cff', '#f1edff')}>
            <div className="do-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3>Ship features end-to-end</h3>
            <p>Typed forms, data layers, auth flows, dashboards, PDFs, payments — designed, built, wired to APIs and deployed. My own SaaS runs in production.</p>
          </div>
          <div className="do-card rv" data-d="2" style={vars('#0eaa5f', '#e5f7ee')}>
            <div className="do-ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
                <path d="M9 12l2 2 4-5" />
                <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
              </svg>
            </div>
            <h3>Keep quality high</h3>
            <p>Strict TypeScript, Zod validation, Vitest + Playwright, accessibility and performance budgets — plus sharp debugging when something does break.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
