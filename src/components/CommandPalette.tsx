import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type Item = {
  id: string
  label: string
  hint?: string
  icon: ReactNode
  run: () => void | boolean // return true to keep the palette open
}

const I = {
  section: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><path d="M5 9h14M5 15h14M9 4 8 20M16 4l-1 16" /></svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z" /></svg>
  ),
  bot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><rect x="4.5" y="7" width="15" height="12" rx="4" /><path d="M12 7V4" /><circle cx="9.3" cy="12.6" r="1.1" fill="currentColor" stroke="none" /><circle cx="14.7" cy="12.6" r="1.1" fill="currentColor" stroke="none" /><path d="M9.5 15.8c.8.7 4.2.7 5 0" /></svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
  ),
  gh: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1.1 1.5 1.1.9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z" /></svg>
  ),
}

const SECTIONS: Array<[string, string]> = [
  ['work', 'Go to Work'],
  ['experience', 'Go to Experience'],
  ['ai', 'Go to AI Development'],
  ['skills', 'Go to Skills'],
  ['about', 'Go to About'],
  ['contact', 'Go to Contact'],
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pf-open-kbar', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pf-open-kbar', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setCopied(false)
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  const items = useMemo<Item[]>(() => {
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const go = (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: rm ? 'auto' : 'smooth' })
    }
    return [
      ...SECTIONS.map(([id, label]) => ({ id: `s-${id}`, label, hint: 'Section', icon: I.section, run: () => go(id) })),
      {
        id: 'chat',
        label: 'Ask the AI assistant',
        hint: 'Chat',
        icon: I.bot,
        run: () => {
          window.dispatchEvent(new Event('pf-open-chat'))
        },
      },
      {
        id: 'theme',
        label: 'Toggle dark / light mode',
        hint: 'Theme',
        icon: I.moon,
        run: () => {
          document.querySelector<HTMLButtonElement>('.theme-btn')?.click()
          return true
        },
      },
      { id: 'resume', label: 'Open résumé (PDF)', hint: 'File', icon: I.doc, run: () => {
          window.open('/resume.pdf', '_blank')
        } },
      {
        id: 'email',
        label: copied ? 'Email copied ✓' : 'Copy email address',
        hint: 'Contact',
        icon: I.mail,
        run: () => {
          navigator.clipboard?.writeText('parmarprashantsingh883@gmail.com')
          setCopied(true)
          setTimeout(() => setOpen(false), 900)
          return true
        },
      },
      { id: 'github', label: 'Open GitHub profile', hint: 'Link', icon: I.gh, run: () => {
          window.open('https://github.com/parmarprashantsingh883', '_blank')
        } },
    ]
  }, [copied])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? items.filter((i) => i.label.toLowerCase().includes(q) || i.hint?.toLowerCase().includes(q)) : items
  }, [items, query])

  const runItem = (item: Item) => {
    const keep = item.run()
    if (!keep) setOpen(false)
  }

  if (!open) return null
  return (
    <div className="kbar-overlay" onClick={() => setOpen(false)}>
      <div className="kbar" role="dialog" aria-label="Command palette" onClick={(e) => e.stopPropagation()}>
        <div className="kbar-top">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input
            ref={inputRef}
            value={query}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, filtered.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              } else if (e.key === 'Enter' && filtered[active]) {
                runItem(filtered[active])
              }
            }}
          />
          <span className="kbar-esc">esc</span>
        </div>
        <div className="kbar-list">
          {filtered.length === 0 && <div className="kbar-empty">No matches — try "work", "theme", "resume"…</div>}
          {filtered.map((item, i) => (
            <button
              key={item.id}
              className={`kbar-item${i === active ? ' active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => runItem(item)}
            >
              <span className="ki">{item.icon}</span>
              <span className="kl">{item.label}</span>
              {item.hint && <span className="kh">{item.hint}</span>}
            </button>
          ))}
        </div>
        <div className="kbar-foot">
          <span><b>↑↓</b> navigate</span>
          <span><b>↵</b> select</span>
          <span><b>esc</b> close</span>
        </div>
      </div>
    </div>
  )
}
