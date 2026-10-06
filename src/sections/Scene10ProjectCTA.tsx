import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { CinematicButton } from '@/components/ui/CinematicButton'
import { SectionTransition } from '@/components/ui/SectionTransition'

export function Scene10ProjectCTA() {
  const handleExploreProjects = () => {
    const el = document.getElementById('projects')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SectionTransition id="projects-cta" ariaLabel="Transition to Phase 3 Projects">
      <div
        className="relative min-h-[80vh] flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--color-void) 0%, rgba(8,12,20,0.98) 50%, var(--color-void) 100%)',
        }}
      >
        {/* Subtle digital horizon portal glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.06) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />

        {/* Ambient perspective lines hinting at digital city / project world */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(6,182,212,0.15) 1px, transparent 1px)`,
            backgroundSize: '80px 100%',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          {/* Act / Phase transition indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 mb-8 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-300 font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            TRANSITION // PHASE 03
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            READY TO EXPLORE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              WHAT I BUILD?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 font-body text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          >
            Witness the full-scale systems in action: SENTRA AI, Box Cricket, Campus Care,
            5minhelp, and autonomous multi-agent software.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <CinematicButton
              variant="primary"
              size="lg"
              onClick={handleExploreProjects}
              ariaLabel="Explore Software Projects"
            >
              EXPLORE PROJECTS &rarr;
            </CinematicButton>

            <CinematicButton
              variant="secondary"
              size="lg"
              href={profile.resume.path}
              download={profile.resume.available}
              ariaLabel="Download Resume PDF"
            >
              DOWNLOAD RESUME
            </CinematicButton>
          </motion.div>

          {/* Micro status telemetry */}
          <div className="mt-14 font-mono text-[0.625rem] text-slate-500 uppercase tracking-widest flex items-center gap-3">
            <span>SYS_STATUS: OPTIMAL</span>
            <span>&bull;</span>
            <span>5 PRODUCTION PROJECTS LOADED</span>
            <span>&bull;</span>
            <span>ZERO ARTIFACT DEBT</span>
          </div>
        </div>
      </div>
    </SectionTransition>
  )
}
