import { MailIcon, DocIcon, GithubIcon, LinkedinIcon, PinIcon } from './icons'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-card rv">
          <span className="eyebrow"><i />Contact</span>
          <h2 className="contact-big">Have an idea? <em>Let's build it.</em></h2>
          <p className="contact-sub">
            Open to frontend roles, freelance builds, or just a good tech chat. No forms here — email me and I'll
            actually reply, usually the same day.
          </p>
          <div className="contact-cta">
            <a className="btn white" href="mailto:Parmarprashantsingh883@gmail.com"><MailIcon /> Email me</a>
            <a className="btn glass" href="/resume.pdf" target="_blank" rel="noopener"><DocIcon /> View resume</a>
            <a className="btn glass" href="tel:+919574028096">+91 95740 28096</a>
          </div>
          <div className="contact-links">
            <a href="https://github.com/parmarprashantsingh883" target="_blank" rel="noopener"><GithubIcon /> github.com/parmarprashantsingh883</a>
            <a href="https://linkedin.com/in/prashant-parmar" target="_blank" rel="noopener"><LinkedinIcon /> in/prashant-parmar</a>
            <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><PinIcon /> Ahmedabad, India</span>
          </div>
          <p className="ps"><b>P.S.</b> — this whole site is a hand-built React app. Peek at the repo if you don't believe me :)</p>
        </div>
      </div>
    </section>
  )
}
