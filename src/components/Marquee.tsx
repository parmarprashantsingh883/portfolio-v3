const ITEMS = [
  'React 19', 'TypeScript', 'Vite', 'TanStack Query', 'Tailwind CSS', 'React Hook Form', 'Zod', 'Zustand',
  'Node · Express', 'MongoDB', 'Playwright', 'Vitest', 'shadcn/ui', 'REST · JWT', 'Claude Code', 'GitHub Copilot',
]

export default function Marquee() {
  // Rendered twice so the -50% translate loop is seamless.
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track" id="mq">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <div className="mq-i" key={i}>{t}</div>
        ))}
      </div>
    </div>
  )
}
