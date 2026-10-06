import { motion } from 'framer-motion'
import { SectionTransition } from '@/components/ui/SectionTransition'

export function ProjectTransitionPhase4() {
  return (
    <SectionTransition id="phase4-transition" ariaLabel="Transition to Phase 4">
      <div
        className="relative min-h-[70vh] flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--color-void) 0%, rgba(12,10,25,0.95) 50%, var(--color-void) 100%)',
        }}
      >
        {/* Converging Stream Ray */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.15) 0%, rgba(6,182,212,0.08) 50%, transparent 80%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />

        {/* Converging Central Beam Line */}
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-28 bg-gradient-to-b from-transparent via-cyan-400 to-transparent mb-8"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-4">
            SYSTEM CONVERGENCE // MILESTONE
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-none mb-6">
            MORE THAN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
              CODE.
            </span>
          </h2>

          <p className="text-slate-300 font-body text-base sm:text-lg leading-relaxed max-w-lg mb-8">
            Software is only the execution layer. The true impact lies in solving real-world challenges,
            winning hackathons, leading teams, and relentlessly engineering solutions.
          </p>

          <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-widest">
            <span>HACKATHONS</span>
            <span>&bull;</span>
            <span>LEADERSHIP</span>
            <span>&bull;</span>
            <span>CERTIFICATIONS</span>
          </div>
        </div>
      </div>
    </SectionTransition>
  )
}
