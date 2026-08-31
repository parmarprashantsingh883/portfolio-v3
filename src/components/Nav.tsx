import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 960 && setOpen(false)
    const onDoc = (e: MouseEvent) => {
      const header = document.getElementById('header')
      if (header && !header.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.addEventListener('click', onDoc)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('click', onDoc)
    }
  }, [open])

  return (
    <header id="header">
      <div className="navbar">
        <a className="brand" href="#top">
          <span className="mk">P<b>.</b></span> <span className="brand-name">Prashant Parmar</span>
        </a>
        <nav className="navlinks" id="navlinks">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#ai">AI</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
          <a href="/resume.pdf" target="_blank" rel="noopener">Resume</a>
        </nav>
        <button
          className="theme-btn"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          onClick={toggle}
        >
          {theme === 'light' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
              <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" />
            </svg>
          )}
        </button>
        <a className="nav-cta" href="#contact"><span className="dot" /> Hire me</a>
        <button
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={(e) => {
            e.stopPropagation()
            setOpen((v) => !v)
          }}
        >
          <svg className="bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg className="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <nav className="mobile-menu" id="mobileMenu" aria-label="Mobile navigation" onClick={() => setOpen(false)}>
        <a href="#work">Work <span>01</span></a>
        <a href="#experience">Experience <span>02</span></a>
        <a href="#ai">AI Development <span>03</span></a>
        <a href="#skills">Skills <span>04</span></a>
        <a href="#about">About <span>05</span></a>
        <a href="/resume.pdf" target="_blank" rel="noopener">Resume <span>PDF</span></a>
        <a className="mm-cta" href="#contact">● Hire me</a>
      </nav>
    </header>
  )
}
