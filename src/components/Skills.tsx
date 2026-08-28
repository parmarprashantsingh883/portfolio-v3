import type { CSSProperties } from 'react'

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const N = 'https://cdn.jsdelivr.net/npm/simple-icons/icons'
const sc = (c: string) => ({ '--sc': c }) as CSSProperties
const drop = (e: React.SyntheticEvent<HTMLImageElement>) => e.currentTarget.remove()

const Logo = ({ src }: { src: string }) => <img src={src} alt="" loading="lazy" onError={drop} />

type Chip = { label: string; src?: string }
const Chips = ({ items }: { items: Chip[] }) => (
  <div className="sc-chips">
    {items.map((c, i) => (
      <span className="sk" key={i}>{c.src && <Logo src={c.src} />}{c.label}</span>
    ))}
  </div>
)

const SIGS = [
  { src: `${D}/react/react-original.svg`, name: 'React 19', note: '4 products shipped — enterprise ERP screens to my own SaaS', tag: 'Daily' },
  { src: `${D}/typescript/typescript-original.svg`, name: 'TypeScript', note: 'Strict mode on everything I own — typed forms, contracts, hooks', tag: 'Strict' },
  { src: `${D}/tailwindcss/tailwindcss-original.svg`, name: 'Tailwind CSS', note: 'Design systems built for 3 of my products', tag: 'Daily' },
  { src: `${N}/reactquery.svg`, name: 'TanStack Query v5', note: "The data layer behind DWERP's live enterprise modules", tag: 'Prod' },
  { src: `${D}/nodejs/nodejs-original.svg`, name: 'Node · Express', note: 'The API behind Quarters — deployed and serving users', tag: 'Live' },
]

const FRONTEND: Chip[] = [
  { label: 'React 19', src: `${D}/react/react-original.svg` },
  { label: 'JavaScript ES6+', src: `${D}/javascript/javascript-original.svg` },
  { label: 'React Router', src: `${N}/reactrouter.svg` },
  { label: 'Redux', src: `${D}/redux/redux-original.svg` },
  { label: 'TanStack Query v5', src: `${N}/reactquery.svg` },
  { label: 'TanStack Table', src: `${N}/reactquery.svg` },
  { label: '🐻 Zustand' },
  { label: 'React Hook Form', src: `${N}/reacthookform.svg` },
  { label: 'Zod', src: `${N}/zod.svg` },
  { label: 'Typed forms' }, { label: 'Data-layer design' }, { label: 'Performance tuning' },
]

const UI: Chip[] = [
  { label: 'Tailwind CSS', src: `${D}/tailwindcss/tailwindcss-original.svg` },
  { label: 'shadcn/ui · Radix', src: `${N}/shadcnui.svg` },
  { label: 'Material UI', src: `${D}/materialui/materialui-original.svg` },
  { label: 'Bootstrap', src: `${D}/bootstrap/bootstrap-original.svg` },
  { label: 'Responsive design' }, { label: 'WCAG accessibility' }, { label: 'UI motion' },
]

const BACKEND: Chip[] = [
  { label: 'Node.js', src: `${D}/nodejs/nodejs-original.svg` },
  { label: 'Express', src: `${D}/express/express-original.svg` },
  { label: 'MongoDB', src: `${D}/mongodb/mongodb-original.svg` },
  { label: 'REST APIs' },
  { label: 'JWT auth', src: `${N}/jsonwebtokens.svg` },
  { label: 'Multi-tenancy' },
]

const TOOLS: Chip[] = [
  { label: 'Vite', src: `${N}/vite.svg` },
  { label: 'Vitest', src: `${N}/vitest.svg` },
  { label: 'Playwright', src: `${D}/playwright/playwright-original.svg` },
  { label: 'Git · GitHub', src: `${D}/git/git-original.svg` },
  { label: 'Azure DevOps', src: `${D}/azuredevops/azuredevops-original.svg` },
  { label: 'Vercel', src: `${N}/vercel.svg` },
  { label: 'Render', src: `${N}/render.svg` },
]

const AI: Chip[] = [
  { label: 'AI-Assisted Development' }, { label: 'AI-Powered Development' },
  { label: 'Claude Code', src: `${N}/claude.svg` },
  { label: 'GitHub Copilot', src: `${N}/githubcopilot.svg` },
  { label: 'ChatGPT', src: `${N}/openai.svg` },
  { label: 'ai-diff-check (my OSS)', src: `${N}/github.svg` },
  { label: 'Agentic workflows' },
  { label: 'Custom agents & subagents' }, { label: 'Prompt engineering' },
  { label: 'Context & token optimization' }, { label: 'MCP tool integrations' },
  { label: 'Project memory (CLAUDE.md)' }, { label: 'AI-assisted debugging' },
  { label: 'Spec gap analysis' }, { label: 'AI code-review gates' },
]

export default function Skills() {
  return (
    <section className="pad" id="skills" style={{ paddingTop: 30 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i />Toolbox</span>
          <h2 className="sec-title">Skills &amp; technologies.</h2>
        </div>
        <div className="skills-bento">

          <div className="skill-card s3 rv fl" style={sc('#2f6bff')}>
            <img className="sc-mark" src={`${D}/typescript/typescript-original.svg`} alt="" loading="lazy" onError={drop} />
            <div className="sc-head">
              <span className="sc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2z" /></svg></span>
              <h4>Core stack</h4><span className="cnt">Daily drivers</span>
            </div>
            <div className="sigs">
              {SIGS.map((s) => (
                <div className="sig" key={s.name}>
                  <span className="lg"><Logo src={s.src} /></span>
                  <span className="tx"><b>{s.name}</b><span>{s.note}</span></span>
                  <span className="tag">{s.tag}</span>
                </div>
              ))}
            </div>
            <Chips items={[
              { label: 'HTML5', src: `${D}/html5/html5-original.svg` },
              { label: 'CSS3', src: `${D}/css3/css3-original.svg` },
              { label: 'Python (basic)', src: `${D}/python/python-original.svg` },
              { label: 'C / C++', src: `${D}/cplusplus/cplusplus-original.svg` },
            ]} />
          </div>

          <div className="skill-card s3 rv fr" data-d="1" style={sc('#4f46e5')}>
            <img className="sc-mark" src={`${D}/react/react-original.svg`} alt="" loading="lazy" onError={drop} />
            <div className="sc-head">
              <span className="sc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="m9 9-2.5 2.5L9 14M15 9l2.5 2.5L15 14M13 8l-2 8" /></svg></span>
              <h4>Frontend engineering</h4><span className="cnt">Component craft</span>
            </div>
            <Chips items={FRONTEND} />
          </div>

          <div className="skill-card s2 rv fl" style={sc('#7c5cff')}>
            <img className="sc-mark" src={`${D}/tailwindcss/tailwindcss-original.svg`} alt="" loading="lazy" onError={drop} />
            <div className="sc-head">
              <span className="sc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><circle cx="13.5" cy="6.5" r="2.5" /><path d="M17 11a9 9 0 1 0-6 10.5c1.5.5 3-.5 3-2v-1a2 2 0 0 1 2-2h2.5A2.5 2.5 0 0 0 21 14c0-1-.5-2-1.5-2.5" /><circle cx="7.5" cy="10.5" r="1" /><circle cx="8.5" cy="15.5" r="1" /></svg></span>
              <h4>UI &amp; Styling</h4><span className="cnt">Design systems</span>
            </div>
            <Chips items={UI} />
          </div>

          <div className="skill-card s2 rv" data-d="1" style={sc('#0eaa5f')}>
            <img className="sc-mark" src={`${D}/mongodb/mongodb-original.svg`} alt="" loading="lazy" onError={drop} />
            <div className="sc-head">
              <span className="sc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><ellipse cx="12" cy="5.5" rx="8" ry="2.8" /><path d="M4 5.5V12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8V5.5" /><path d="M4 12v6.5c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8V12" /></svg></span>
              <h4>Backend &amp; Data</h4><span className="cnt">Ship alone</span>
            </div>
            <Chips items={BACKEND} />
          </div>

          <div className="skill-card s2 rv fr" data-d="2" style={sc('#ff8a3d')}>
            <img className="sc-mark" src={`${N}/vite.svg`} alt="" loading="lazy" onError={drop} />
            <div className="sc-head">
              <span className="sc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" /><path d="m9 11.5 2 2 4-4.5" /></svg></span>
              <h4>Testing &amp; Tools</h4><span className="cnt">Quality gates</span>
            </div>
            <Chips items={TOOLS} />
          </div>

          <div className="skill-card s6 dark rv" style={sc('#6ea8ff')}>
            <img className="sc-mark" src={`${N}/claude.svg`} alt="" loading="lazy" onError={drop} />
            <div className="sc-head">
              <span className="sc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" /><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" /></svg></span>
              <h4>AI-Assisted Development</h4><span className="cnt">My edge</span>
            </div>
            <Chips items={AI} />
          </div>

        </div>
      </div>
    </section>
  )
}
