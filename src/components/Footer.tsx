export default function Footer() {
  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  return (
    <footer>
      <div className="wrap foot">
        <span>© 2026 <b>Prashant Parmar</b> · Ahmedabad</span>
        <span>made with an unhealthy amount of chai ☕ · last updated July 2026</span>
        <span className="top" onClick={toTop}>Back to top ↑</span>
      </div>
    </footer>
  )
}
