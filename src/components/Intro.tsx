import { useEffect, useState } from 'react'

/** Dark curtain that reveals the page, then unmounts. */
export default function Intro() {
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true)
      return
    }
    const t1 = setTimeout(() => setDone(true), 950)
    const t2 = setTimeout(() => setGone(true), 1950)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (gone) return null
  return (
    <div className={`intro${done ? ' done' : ''}`}>
      <div className="intro-word">
        <span>Prashant&nbsp;<b>Parmar</b></span>
      </div>
    </div>
  )
}
