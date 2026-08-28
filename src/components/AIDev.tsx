import type { CSSProperties, ReactNode } from 'react'

const at = (c: string) => ({ '--at': c }) as CSSProperties

// Concrete AI-development capabilities — the skills-first showcase.
const SKILLS: { n: string; title: string; items: ReactNode[] }[] = [
  {
    n: '01', title: 'Custom agents & subagents',
    items: [
      <>Build agents with tuned <b>system prompts, tool access, skills &amp; slash commands</b> per project</>,
      <>Orchestrate <b>multi-agent workflows</b> — fan work out, then verify it back</>,
    ],
  },
  {
    n: '02', title: 'Prompt & context engineering',
    items: [
      <>Precise prompts and <b>curated context</b> — the right files, none of the noise</>,
      <><b>Project-memory files (CLAUDE.md)</b> that keep agents accurate on a large codebase</>,
    ],
  },
  {
    n: '03', title: 'Token & cost optimization',
    items: [
      <><b>Cache-aware sessions</b>, tight context windows and scoped tasks</>,
      <>Keeps agent runs <b>fast and cheap</b> — no runaway token bills</>,
    ],
  },
  {
    n: '04', title: 'MCP tool integrations',
    items: [
      <>Wire agents to <b>real tools via MCP</b> — browsers, terminals, APIs</>,
      <>So they <b>ship work</b> — run tests, drive a UI, hit endpoints — not just chat</>,
    ],
  },
  {
    n: '05', title: 'AI-assisted debugging',
    items: [
      <>Reproduce bugs and <b>root-cause across a large, unfamiliar codebase</b> fast</>,
      <>Run <b>spec-vs-implementation gap analysis</b> against PRD / BRD docs</>,
    ],
  },
  {
    n: '06', title: 'I build AI tooling too',
    items: [
      <>Authored <b>ai-diff-check</b> — an open-source CLI that audits AI-written diffs</>,
      <>Flags <b>duplicated logic, dead exports, stubbed handling &amp; untested changes</b></>,
    ],
  },
]

export default function AIDev() {
  return (
    <section className="pad" id="ai" style={{ paddingTop: 30 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i />AI-powered development</span>
          <h2 className="sec-title">AI-native — with a human in the loop.</h2>
          <p className="sec-sub">
            The edge isn't using AI — soon everyone will. It's <b style={{ color: 'var(--ink)' }}>directing</b> it. I
            adopted agents early and turned them into a real engineering skill set.
          </p>
        </div>
        <div className="ai-grid">

          <div className="ai-feature rv">
            <h3>My AI toolkit — early adopter, daily driver</h3>
            <p>
              AI agents aren't a novelty in my workflow — they're <b>core to how I ship every day</b>: reproducing bugs,
              drafting fixes and tests, navigating unfamiliar code, and turning reports into reviewed PRs. The tools I
              drive daily:
            </p>
            <div className="ai-tools">
              <span className="ai-tool" style={at('#d97757')}><i />Claude Code</span>
              <span className="ai-tool" style={at('#24292f')}><i />GitHub Copilot</span>
              <span className="ai-tool" style={at('#10a37f')}><i />ChatGPT</span>
              <span className="ai-tool" style={at('#2f6bff')}><i />ai-diff-check — my own gate</span>
            </div>
          </div>

          {SKILLS.map((c) => (
            <div className="ai-card rv" key={c.n}>
              <h4><span className="n">{c.n}</span>{c.title}</h4>
              <ul>
                {c.items.map((it, j) => <li key={j}><span>{it}</span></li>)}
              </ul>
            </div>
          ))}

          <div className="ai-feature rv">
            <h3>…and a disciplined pipeline behind it all</h3>
            <p>
              AI is a <b>fast pair, never autopilot</b>. I delegate execution, then gatekeep — agents draft; I review,
              verify and own every line. And "tests pass" isn't "done": I <b>verify in a real browser</b>, because a live
              screen surfaces bugs a green build never will. Nothing merges unless the whole gate is green.
            </p>
            <div className="ai-pipe" aria-label="AI development pipeline">
              <span className="ai-node start">AI drafts</span><span className="ai-arr">→</span>
              <span className="ai-node">I review &amp; refine</span><span className="ai-arr">→</span>
              <span className="ai-node ok">tsc ✓ strict</span><span className="ai-arr">→</span>
              <span className="ai-node ok">build ✓</span><span className="ai-arr">→</span>
              <span className="ai-node ok">Vitest · Playwright ✓</span><span className="ai-arr">→</span>
              <span className="ai-node end">reviewed PR merged</span>
            </div>
            <span className="hand pipe-note">if any gate is red, it simply doesn't merge — no exceptions.</span>
          </div>

        </div>
      </div>
    </section>
  )
}
