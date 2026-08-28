import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > 650)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`top-fab${on ? ' on' : ''}`}
      aria-label="Back to top"
      onClick={() => {
        const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: rm ? 'auto' : 'smooth' })
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  )
}
