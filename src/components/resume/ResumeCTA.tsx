import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { CinematicButton } from '@/components/ui/CinematicButton'
import { SectionTransition } from '@/components/ui/SectionTransition'

export function ResumeCTA() {
  return (
    <SectionTransition id="resume-cta" ariaLabel="Resume Call to Action and Transition to Phase 6">
      <div
        className="relative min-h-[70vh] flex flex-col items-center justify-center py-24 px-6 text-center overflow-hidden no-print"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(12,16,24,0.95) 0%, var(--color-void) 70%)',
        }}
      >
        {/* Soft Ambient Light Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.06) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-cyan-300 font-mono text-xs tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            INITIATE COLLABORATION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            READY TO BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              SOMETHING IMPACTFUL?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-300 font-body text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          >
            Looking to collaborate on challenging software engineering projects, AI systems, or full-stack applications.
          </motion.p>

          {/* Action Buttons Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
          >
            <CinematicButton
              variant="primary"
              size="lg"
              href={`mailto:${profile.contact.email}`}
              ariaLabel="Email Md Habib Munsar Ahmed"
            >
              EMAIL ME &rarr;
            </CinematicButton>

            <CinematicButton
              variant="secondary"
              size="lg"
              href="/assets/Md-Habib-Munsar-Ahmed-Resume.pdf"
              download="Md-Habib-Munsar-Ahmed-Resume.pdf"
              ariaLabel="Download PDF Resume"
            >
              DOWNLOAD RESUME
            </CinematicButton>

            <CinematicButton
              variant="secondary"
              size="lg"
              href={profile.social.github}
              target="_blank"
              ariaLabel="View GitHub profile"
            >
              GITHUB
            </CinematicButton>

            <CinematicButton
              variant="secondary"
              size="lg"
              href={profile.social.linkedin}
              target="_blank"
              ariaLabel="View LinkedIn profile"
            >
              LINKEDIN
            </CinematicButton>
          </motion.div>

          {/* Phase 6 Transition Bridge */}
          <div className="pt-8 border-t border-white/10 w-full max-w-md text-center">
            <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-2">
              TRANSITION // PHASE 06
            </div>
            <div className="text-sm font-display font-medium text-slate-300 tracking-wide">
              LET&rsquo;S BUILD THE NEXT THING.
            </div>
          </div>
        </div>
      </div>
    </SectionTransition>
  )
}
