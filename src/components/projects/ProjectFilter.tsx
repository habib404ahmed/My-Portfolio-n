interface ProjectFilterProps {
  currentCategory: string
  onCategoryChange: (cat: string) => void
}

const CATEGORIES = [
  { id: 'all', label: 'ALL PROJECTS' },
  { id: 'ai', label: 'AI & AGENTS' },
  { id: 'cybersecurity', label: 'CYBERSECURITY' },
  { id: 'fullstack', label: 'FULL-STACK' },
]

export function ProjectFilter({ currentCategory, onCategoryChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      {CATEGORIES.map((c) => {
        const isActive = c.id === currentCategory
        return (
          <button
            key={c.id}
            onClick={() => onCategoryChange(c.id)}
            className={`px-3 py-1 rounded-full font-mono text-[0.6875rem] font-bold tracking-wider uppercase transition-all duration-300 ${
              isActive
                ? 'border border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'border border-white/10 bg-black/40 text-slate-400 hover:text-white hover:border-white/25'
            }`}
            aria-pressed={isActive}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
