import { GithubIcon, LinkedinIcon, MailIcon, ArrowIcon, DownloadIcon } from './icons'

const CHIPS = [
  { label: 'React 19', depth: 18, style: { top: '26%', left: '7%', animationDelay: '1.7s' } },
  { label: 'TypeScript', depth: -14, style: { top: '22%', right: '9%', animationDelay: '1.85s' } },
  { label: 'Tailwind CSS', depth: 12, style: { bottom: '24%', left: '11%', animationDelay: '2s' } },
  { label: 'Node.js', depth: -18, style: { bottom: '27%', right: '8%', animationDelay: '2.15s' } },
]

export default function Hero() {
  return (
    <section className="hero wrap">
      <span className="hero-pill">
        <span className="dot" /> Frontend Engineer · Open to opportunities · Ahmedabad, India
      </span>
      <h1 className="hero-h">
        <span className="row"><span style={{ animationDelay: '.55s' }}>I design &amp; build</span></span>
        <span className="row"><span style={{ animationDelay: '.7s' }}><span className="spin" id="spin">products.</span></span></span>
      </h1>
      <p className="hero-sub">
        I'm Prashant, a frontend engineer from Ahmedabad. Days go into a <b>live enterprise ERP</b> (React 19, strict
        TypeScript). Evenings go into my own things — <b>a SaaS that's actually deployed</b> and an open-source CLI. AI
        agents help me move fast; <b>I make sure nothing sloppy ships</b>.
      </p>
      <div className="hero-cta">
        <a className="btn dark" href="#work">
          See my work <ArrowIcon />
        </a>
        <a className="btn line" href="/resume.pdf" target="_blank" rel="noopener">
          <DownloadIcon /> Resume
        </a>
        <a className="btn line" href="#contact">Get in touch</a>
      </div>
      <span className="hand hand-note hero-note">
        <svg viewBox="0 0 32 30" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4 Q20 6 22 24" />
          <path d="M15 20l7 5 3-8" />
        </svg>
        everything below is real &amp; shipped — receipts included
      </span>
      <div className="hero-meta">
        <a href="https://github.com/parmarprashantsingh883" target="_blank" rel="noopener"><GithubIcon /> GitHub</a>
        <a href="https://linkedin.com/in/prashant-parmar" target="_blank" rel="noopener"><LinkedinIcon /> LinkedIn</a>
        <a href="mailto:Parmarprashantsingh883@gmail.com"><MailIcon /> Email</a>
      </div>
      {CHIPS.map((c) => (
        <span key={c.label} className="float-chip" data-depth={c.depth} style={c.style}>
          <i>◈</i>
          {c.label}
        </span>
      ))}
    </section>
  )
}
