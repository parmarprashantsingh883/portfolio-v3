import { MailIcon, DocIcon, GithubIcon, LinkedinIcon, PinIcon, WhatsAppIcon } from './icons'
import { RESUME_URL } from '../lib/paths'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-card rv">
          <span className="eyebrow"><i />Contact</span>
          <h2 className="contact-big">Have an idea? <em>Let's build it.</em></h2>
          <p className="contact-sub">
            Open to full-stack &amp; frontend roles, freelance builds, or just a good tech chat. Prefer to talk now?
            Ping me on WhatsApp — otherwise email me and I'll reply, usually the same day.
          </p>
          <div className="contact-cta">
            <a
              className="btn wa"
              href="https://wa.me/919574028096?text=Hi%20Prashant%2C%20I%20came%20across%20your%20portfolio%20and%20wanted%20to%20connect"
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
            <a className="btn white" href="mailto:Parmarprashantsingh883@gmail.com"><MailIcon /> Email me</a>
            <a className="btn glass" href={RESUME_URL} target="_blank" rel="noopener"><DocIcon /> View resume</a>
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
