import { motion } from 'framer-motion'
import type { ProjectData } from '@/data/projects'

interface ProjectConstellationNavProps {
  projects: ProjectData[]
  activeProjectId: string
  onSelectProject: (id: string) => void
}

export function ProjectConstellationNav({
  projects,
  activeProjectId,
  onSelectProject,
}: ProjectConstellationNavProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
          PROJECT CONSTELLATION MAP
        </span>
        <span className="font-mono text-xs text-slate-400">
          SELECT WORLD TO ENTER
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {projects.map((proj) => {
          const isActive = proj.id === activeProjectId
          return (
            <button
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className={`p-3 rounded-xl border text-left transition-all duration-300 relative group overflow-hidden ${
                isActive
                  ? 'border-white/40 bg-slate-900/90 shadow-xl scale-102'
                  : 'border-white/10 bg-slate-950/60 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
              style={{
                boxShadow: isActive ? `0 0 25px ${proj.glowColor}` : 'none',
              }}
              aria-pressed={isActive}
              aria-label={`Select Project ${proj.number}: ${proj.title}`}
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-mono text-[0.625rem] font-bold"
                  style={{ color: proj.accentColor }}
                >
                  {proj.number} // {proj.category.toUpperCase()}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    background: isActive ? proj.accentColor : 'rgba(255,255,255,0.15)',
                    boxShadow: isActive ? `0 0 8px ${proj.accentColor}` : 'none',
                  }}
                />
              </div>

              <div
                className={`font-display text-xs font-bold tracking-wide truncate ${
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                }`}
              >
                {proj.title}
              </div>

              {/* Active bottom accent bar */}
              {isActive && (
                <motion.div
                  layoutId="activeBar"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: proj.accentColor }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
