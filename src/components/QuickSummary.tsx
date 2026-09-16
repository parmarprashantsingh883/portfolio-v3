import { useEffect, useState } from 'react'
import { RESUME_URL } from '../lib/paths'

/* 30-second summary overlay — the "I'm in a hurry" path for recruiters.
   Opens via the hero quick-start row or the pf-open-summary event. */
export default function QuickSummary() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('pf-open-summary', onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pf-open-summary', onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  if (!open) return null
  return (
    <div className="kbar-overlay" onClick={() => setOpen(false)}>
      <div className="qsum" role="dialog" aria-label="30 second summary" onClick={(e) => e.stopPropagation()}>
        <div className="qsum-head">
          <span className="qsum-clock" aria-hidden>⏱</span>
          <b>Prashant in 30 seconds</b>
          <button className="chat-x" onClick={() => setOpen(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="qsum-body">
          <p><b>Frontend engineer, Ahmedabad</b> — React 19 + TypeScript strict.</p>
          <ul>
            <li><b>Live production experience</b> — ships daily to DWERP, an enterprise ERP real businesses run on (MSBC Group, Mar 2026–present)</li>
            <li><b>Finishes what he starts</b> — Quarters (multi-tenant SaaS, deployed solo) and ai-diff-check (npm-published CLI, 10+ releases)</li>
            <li><b>AI-native, verification-first</b> — directs Claude Code &amp; Copilot like a tech lead; nothing ships without types + tests passing</li>
          </ul>
        </div>
        <div className="qsum-actions">
          <a className="btn dark" href={RESUME_URL} target="_blank" rel="noopener" onClick={() => setOpen(false)}>Resume PDF</a>
          <a className="btn line" href="mailto:parmarprashantsingh883@gmail.com">Email him</a>
          <button
            className="btn line"
            onClick={() => {
              setOpen(false)
              window.dispatchEvent(new Event('pf-open-chat'))
            }}
          >
            Ask his AI
          </button>
        </div>
      </div>
    </div>
  )
}
