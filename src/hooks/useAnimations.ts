import { useEffect } from 'react'

/**
 * Ports the original vanilla-JS interaction layer (scroll progress, cursor ring,
 * typewriter, scroll-reveal, split titles, count-up, magnetic buttons, parallax,
 * active-nav, avatar pupils) into a single mount-once effect. Runs after render,
 * so every target node exists; the page components are static (never re-render),
 * so DOM mutations here are safe from React reconciliation.
 */
export function useAnimations() {
  useEffect(() => {
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = matchMedia('(pointer:fine)').matches
    const dispose: Array<() => void> = []
    let killed = false

    /* scroll progress + header shadow */
    const header = document.getElementById('header')
    const progress = document.getElementById('progress')
    const onScroll = () => {
      const st = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (progress) progress.style.width = (h > 0 ? (st / h) * 100 : 0) + '%'
      header?.classList.toggle('scrolled', st > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    dispose.push(() => window.removeEventListener('scroll', onScroll))

    /* rotating hero word — whole-word flip; width morphs once per cycle so the
       centered headline never jitters (the old per-letter typewriter did) */
    const spin = document.getElementById('spin')
    if (spin) {
      const words = ['products.', 'interfaces.', 'dashboards.', 'experiences.']
      if (rm) {
        spin.textContent = words[0]
      } else {
        spin.innerHTML = '<span class="flip"></span><span class="meas"></span>'
        const flip = spin.querySelector('.flip') as HTMLElement
        const meas = spin.querySelector('.meas') as HTMLElement
        flip.textContent = words[0]
        let wi = 0
        const setWidth = (word: string) => {
          meas.textContent = word
          spin.style.width = meas.offsetWidth + 'px'
        }
        const onResize = () => setWidth(words[wi])
        window.addEventListener('resize', onResize, { passive: true })
        dispose.push(() => window.removeEventListener('resize', onResize))
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setWidth(words[wi]))
        setWidth(words[0])
        const cycle = () => {
          if (killed) return
          const next = (wi + 1) % words.length
          flip.classList.remove('in')
          flip.classList.add('out')
          setWidth(words[next]) // width glides to the next word while it swaps
          setTimeout(() => {
            if (killed) return
            wi = next
            flip.textContent = words[wi]
            flip.classList.remove('out')
            flip.classList.add('in')
          }, 320)
        }
        const iv = window.setInterval(cycle, 3000)
        dispose.push(() => clearInterval(iv))
      }
    }

    /* reveal on scroll */
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } }),
      { threshold: 0.13, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    dispose.push(() => io.disconnect())

    /* skills bento: stagger chips, then clear delay so hover stays instant */
    document.querySelectorAll('.skill-card').forEach((card) => {
      Array.from(card.querySelectorAll<HTMLElement>('.sk')).forEach((chip, i) => {
        chip.style.transitionDelay = (0.15 + i * 0.045) + 's'
        const h = (ev: TransitionEvent) => {
          if (ev.propertyName === 'opacity') { chip.style.transitionDelay = '0s'; chip.removeEventListener('transitionend', h) }
        }
        chip.addEventListener('transitionend', h)
      })
    })

    /* split section titles into words */
    if (!rm) {
      const titles = Array.from(document.querySelectorAll<HTMLElement>('.sec-title'))
      titles.forEach((el) => {
        el.classList.add('split')
        const ws = (el.textContent || '').trim().split(/\s+/)
        el.textContent = ''
        ws.forEach((word, i) => {
          const w = document.createElement('span'); w.className = 'w'
          const s = document.createElement('span'); s.textContent = word; s.style.transitionDelay = (i * 0.05) + 's'
          w.appendChild(s); el.appendChild(w); el.appendChild(document.createTextNode(' '))
        })
      })
      const tio = new IntersectionObserver(
        (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); tio.unobserve(en.target) } }),
        { threshold: 0.3 },
      )
      titles.forEach((el) => tio.observe(el))
      dispose.push(() => tio.disconnect())
    }

    /* count-up */
    const cio = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return
      const el = en.target as HTMLElement
      cio.unobserve(el)
      const t = parseFloat(el.dataset.count || '0')
      const dec = Number(el.dataset.dec || 0)
      if (rm) { el.textContent = t.toFixed(dec); return }
      let t0: number | null = null
      const step = (ts: number) => {
        if (t0 == null) t0 = ts
        const p = Math.min((ts - t0) / 1200, 1)
        const e = 1 - Math.pow(1 - p, 3)
        el.textContent = (t * e).toFixed(dec)
        if (p < 1) requestAnimationFrame(step)
        else el.textContent = t.toFixed(dec)
      }
      requestAnimationFrame(step)
    }), { threshold: 0.6 })
    document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el))
    dispose.push(() => cio.disconnect())

    /* magnetic buttons + floating-chip parallax */
    if (!rm && fine) {
      document.querySelectorAll<HTMLElement>('.btn,.nav-cta').forEach((b) => {
        b.addEventListener('pointermove', (e: PointerEvent) => {
          const r = b.getBoundingClientRect()
          b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.16) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.26 - 1) + 'px)'
        })
        b.addEventListener('pointerleave', () => { b.style.transform = '' })
      })
      const chips = Array.from(document.querySelectorAll<HTMLElement>('.float-chip'))
      const par = (e: PointerEvent) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5
        chips.forEach((c) => { const d = Number(c.dataset.depth || 10); c.style.transform = 'translate(' + nx * d + 'px,' + ny * d + 'px)' })
      }
      window.addEventListener('pointermove', par, { passive: true })
      dispose.push(() => window.removeEventListener('pointermove', par))
    }

    /* active nav link */
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.navlinks a'))
    const map: Record<string, HTMLAnchorElement> = {}
    links.forEach((a) => { const href = a.getAttribute('href') || ''; if (href.startsWith('#')) map[href.slice(1)] = a })
    const sio = new IntersectionObserver((es) => es.forEach((en) => {
      const a = map[(en.target as HTMLElement).id]
      if (a && en.isIntersecting) { links.forEach((l) => l.classList.remove('active')); a.classList.add('active') }
    }), { rootMargin: '-40% 0px -55% 0px' })
    ;['work', 'experience', 'ai', 'skills', 'about'].forEach((id) => { const s = document.getElementById(id); if (s) sio.observe(s) })
    dispose.push(() => sio.disconnect())

    /* avatar pupils follow the cursor */
    if (!rm && fine) {
      const av = document.querySelector('.avatar-card') as HTMLElement | null
      const pupils = Array.from(document.querySelectorAll<SVGElement>('.avatar .pupil'))
      if (av && pupils.length) {
        const move = (e: PointerEvent) => {
          const r = av.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2
          const dx = Math.max(-3, Math.min(3, (e.clientX - cx) / 70)), dy = Math.max(-2.5, Math.min(2.5, (e.clientY - cy) / 70))
          pupils.forEach((p) => { p.style.transform = 'translate(' + dx + 'px,' + dy + 'px)' })
        }
        window.addEventListener('pointermove', move, { passive: true })
        dispose.push(() => window.removeEventListener('pointermove', move))
      }
    }

    return () => { killed = true; dispose.forEach((d) => d()) }
  }, [])
}
