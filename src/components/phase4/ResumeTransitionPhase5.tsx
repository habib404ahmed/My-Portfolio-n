import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { CinematicButton } from '@/components/ui/CinematicButton'
import { SectionTransition } from '@/components/ui/SectionTransition'

export function ResumeTransitionPhase5() {
  return (
    <SectionTransition id="resume-preview" ariaLabel="Transition to Phase 5 Resume Experience">
      <div
        className="relative min-h-[85vh] flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(15,20,30,0.95) 0%, var(--color-void) 70%)',
        }}
      >
        {/* Soft Ambient Light Cone */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, rgba(167,139,250,0.1) 40%, transparent 70%)',
            filter: 'blur(70px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          {/* Subtle Monogram & Name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-16 h-16 rounded-2xl border border-cyan-500/30 bg-black/60 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
          >
            <span className="font-mono text-xl font-bold text-cyan-400">H</span>
          </motion.div>

          <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2 font-bold">
            TRANSITION // PHASE 05
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight mb-2">
            MD HABIB MUNSAR AHMED
          </h2>

          <div className="font-mono text-sm text-slate-400 tracking-wider uppercase mb-8">
            SOFTWARE ENGINEER &bull; RESUME ARCHIVE
          </div>

          {/* Rotating Resume Document Representation */}
          <motion.div
            animate={{ rotateY: [-4, 4, -4], rotateX: [2, -2, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ perspective: 1000 }}
            className="w-56 sm:w-64 h-72 sm:h-80 rounded-xl border border-white/20 bg-gradient-to-b from-slate-900/90 to-black/95 p-5 shadow-2xl backdrop-blur-md mb-10 flex flex-col justify-between text-left group hover:border-cyan-400/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="font-mono text-[0.625rem] text-cyan-400 font-bold">CURRICULUM VITAE</span>
                <span className="font-mono text-[0.625rem] text-slate-500">PDF</span>
              </div>
              <div className="font-display font-bold text-xs text-white mb-1">
                Md Habib Munsar Ahmed
              </div>
              <div className="font-mono text-[0.5625rem] text-slate-400 mb-3">
                Software Engineer &bull; BCA
              </div>

              {/* Decorative Document Skeleton Lines */}
              <div className="space-y-2 opacity-50">
                <div className="w-full h-1.5 rounded bg-white/20" />
                <div className="w-5/6 h-1.5 rounded bg-white/20" />
                <div className="w-4/6 h-1.5 rounded bg-white/20" />
                <div className="w-full h-1.5 rounded bg-white/20 mt-4" />
                <div className="w-3/4 h-1.5 rounded bg-white/20" />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 font-mono text-[0.625rem] text-cyan-400 flex items-center justify-between">
              <span>OFFICIAL PROFILE</span>
              <span>&bull; VERIFIED</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <CinematicButton
              variant="primary"
              size="lg"
              href={profile.resume.path}
              target="_blank"
              ariaLabel="View Resume in Browser"
            >
              VIEW MY RESUME
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
          </div>

          <p className="mt-8 font-mono text-[0.625rem] text-slate-500 tracking-wider">
            PHASE 05 &bull; COMPLETE RESUME & CREDENTIAL DOSSIER
          </p>
        </div>
      </div>
    </SectionTransition>
  )
}
