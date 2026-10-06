import { motion } from 'framer-motion'

const JOURNEY_STEPS = [
  { year: '2025', title: 'FOUNDATION', desc: 'BCA Begins & Academic Rigor', color: '#38bdf8' },
  { year: '2025 — 2026', title: 'LEARNING', desc: 'Modern AI & Cyber Exploration', color: '#a78bfa' },
  { year: '2026', title: 'BUILDING', desc: '5 Production Codebases Shipped', color: '#06b6d4' },
  { year: '2026', title: 'LEADERSHIP', desc: 'University Program Coordination', color: '#f59e0b' },
  { year: '2028', title: 'NEXT CHAPTER', desc: 'Open Horizon & Future Milestones', color: '#e2e8f0', isOpen: true },
]

export function JourneySummary() {
  return (
    <div className="w-full mb-20 text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">
        JOURNEY TRAJECTORY
      </div>
      <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8">
        The Arc of Growth
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative max-w-4xl mx-auto">
        {JOURNEY_STEPS.map((step, idx) => (
          <div key={step.year + step.title} className="flex flex-col md:flex-row items-center w-full">
            <div className="p-4 rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur-sm w-full text-center">
              <div
                className="font-mono text-xs font-bold mb-1"
                style={{ color: step.color }}
              >
                {step.year}
              </div>
              <div className="font-display font-bold text-sm text-white mb-0.5">
                {step.title}
              </div>
              <div className="font-mono text-[0.625rem] text-slate-400">
                {step.desc}
              </div>
              {step.isOpen && (
                <span className="inline-block mt-2 font-mono text-[0.5625rem] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                  OPEN HORIZON
                </span>
              )}
            </div>

            {idx < JOURNEY_STEPS.length - 1 && (
              <div className="my-2 md:my-0 md:mx-2 text-slate-600 font-mono text-sm">
                <span className="hidden md:inline">&rarr;</span>
                <span className="md:hidden">&darr;</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
