import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/* index.html sets documentElement.dataset.theme before first paint;
   this hook takes over from there and keeps storage + meta in sync. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'),
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('pf-theme', theme)
    } catch {
      /* private mode — theme applies for the session only */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0b0e13' : '#fafbfc')
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), [])
  return { theme, toggle }
}
