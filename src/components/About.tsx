const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'
const drop = (e: React.SyntheticEvent<HTMLImageElement>) => e.currentTarget.remove()

export default function About() {
  return (
    <section className="pad" id="about" style={{ paddingTop: 30 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <span className="eyebrow"><i />About me</span>
          <h2 className="sec-title">Hi, I'm Prashant.</h2>
        </div>
        <div className="about-grid">
          <div className="rv">
            <p className="about-lead">A frontend engineer who loves the <em>whole craft</em> — from the first wireframe to the last loading state.</p>
            <p className="about-p">By day I build <b>DWERP</b>, an enterprise multi-tenant ERP, where I've shipped access control, multi-region configuration and reusable component systems in React 19 + strict TypeScript. By night I build my own things — <b>Quarters</b>, a SaaS running in production, and <b>ai-diff-check</b>, an open-source CLI.</p>
            <p className="about-p">I sweat the details users feel: fast loads, smooth motion, forms that guide instead of fight, and layouts that work on any screen. And my edge with <b>AI-powered development</b> isn't using the tools — it's directing them: I work with agents the way a tech lead reviews a fast junior, delegating execution and gatekeeping the output against what "good" actually looks like. Clean git history, reviewed PRs and repeatable playbooks keep it shippable to a <b>team</b>, not just working on my machine.</p>
            <p className="about-p">My path: <b>BCA at Silver Oak University (8.6 CGPA)</b> → intensive <b>MERN training at Tops Technologies</b> → building an enterprise ERP at <b>MSBC Group</b> — while shipping side projects the whole way.</p>
            <p className="about-p">A few opinions I've earned so far: loading and empty states are half of UX, <b>strict TypeScript beats optimism</b>, and a form that fights the user is a bug even when the code is "correct". Off the clock it's chai, side-project rabbit holes, and an unreasonable number of open tabs.</p>
          </div>
          <div className="about-side">
            <div className="avatar-card rv" data-d="1" aria-hidden="true">
              <span className="fb fb1"><img src={`${D}/react/react-original.svg`} alt="" loading="lazy" onError={drop} /></span>
              <span className="fb fb2"><img src={`${D}/typescript/typescript-original.svg`} alt="" loading="lazy" onError={drop} /></span>
              <span className="fb fb3">✦</span>
              <svg className="avatar" viewBox="0 0 200 150">
                <path d="M38 150 Q100 102 162 150 Z" fill="#2f6bff" />
                <path d="M86 122 Q100 132 114 122 L114 150 L86 150 Z" fill="#fff" />
                <rect x="92" y="84" width="16" height="16" rx="7" fill="#eeb98e" />
                <circle cx="69" cy="60" r="6" fill="#f6c89f" /><circle cx="131" cy="60" r="6" fill="#f6c89f" />
                <circle cx="100" cy="58" r="30" fill="#f6c89f" />
                <path d="M68 56 Q65 19 100 16 Q135 19 132 56 L126 56 Q124 32 100 30 Q76 32 74 56 Z" fill="#1d232b" />
                <path d="M82 38 Q90 31 102 33 Q96 36 92 40 Q86 40 82 38 Z" fill="#1d232b" />
                <path d="M79 45 Q86 41.5 93 45" stroke="#1d232b" strokeWidth={2.4} strokeLinecap="round" fill="none" />
                <path d="M107 45 Q114 41.5 121 45" stroke="#1d232b" strokeWidth={2.4} strokeLinecap="round" fill="none" />
                <g className="eyes">
                  <circle cx="87.5" cy="57" r="4.6" fill="#fff" />
                  <circle cx="112.5" cy="57" r="4.6" fill="#fff" />
                  <circle className="pupil" cx="87.5" cy="57.3" r="2.5" fill="#12161b" />
                  <circle className="pupil" cx="112.5" cy="57.3" r="2.5" fill="#12161b" />
                </g>
                <rect x="77" y="49" width="21" height="15.5" rx="7.5" fill="none" stroke="#22303f" strokeWidth={2.3} />
                <rect x="102" y="49" width="21" height="15.5" rx="7.5" fill="none" stroke="#22303f" strokeWidth={2.3} />
                <path d="M98 56 h4" stroke="#22303f" strokeWidth={2.3} strokeLinecap="round" />
                <path d="M100 61 q2.5 4.5 0 7" stroke="#e8a87c" strokeWidth={2.2} strokeLinecap="round" fill="none" />
                <circle cx="80" cy="70" r="4" fill="#f79d7f" opacity="0.4" /><circle cx="120" cy="70" r="4" fill="#f79d7f" opacity="0.4" />
                <path d="M91 77 Q100 84.5 109 77" stroke="#1d232b" strokeWidth={2.6} strokeLinecap="round" fill="none" />
                <path d="M58 150 L142 150 L136 116 L64 116 Z" fill="#131922" />
                <path d="M64 116 L136 116" stroke="#6ea8ff" strokeWidth={2.5} opacity="0.85" />
                <circle cx="100" cy="133" r="6" fill="none" stroke="#2f6bff" strokeWidth={2} />
              </svg>
              <span className="hand avatar-caption">me, mid-debug — the eyes follow your cursor, try it</span>
            </div>
            <div className="side-card rv" data-d="2">
              <h4>Education &amp; Training</h4>
              <div className="edu"><div className="d">Bachelor of Computer Application</div><div className="m"><span>Silver Oak University</span><b>2023–2025</b></div><div className="m"><span>CGPA</span><b>8.6</b></div></div>
              <div className="edu"><div className="d">MERN Stack Development Program</div><div className="m"><span>Tops Technologies, Ahmedabad</span><b>2025</b></div></div>
              <div className="side-langs"><b>Languages</b> — English (Proficient) · Hindi (Native) · Gujarati (Basic)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
