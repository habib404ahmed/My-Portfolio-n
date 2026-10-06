import { motion } from 'framer-motion'
import { CinematicButton } from '@/components/ui/CinematicButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ClosingCreditsProps {
  onRestart?: () => void
}

export function ClosingCredits({ onRestart }: ClosingCreditsProps) {
  const prefersReduced = useReducedMotion()

  const handleRestart = () => {
    if (onRestart) {
      onRestart()
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth',
      })
    }
  }

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-16 text-center px-4 relative">
      {/* ──────────────────────────────────────────
          SCENE 05: DIGITAL SIGNATURE (Closing Credits Feel)
          ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="mb-14 pt-10 border-t border-white/10"
      >
        <span className="font-mono text-[0.625rem] tracking-[0.3em] uppercase text-cyan-400 block mb-3">
          SYSTEM SIGNATURE
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          MD HABIB MUNSAR AHMED
        </h3>
        <p className="font-mono text-xs sm:text-sm text-slate-300 font-semibold tracking-wider uppercase mb-1">
          Software Engineer
        </p>
        <p className="font-mono text-[0.6875rem] text-slate-400 tracking-widest uppercase">
          AI/ML &bull; Full-Stack &bull; Cybersecurity
        </p>
      </motion.div>

      {/* ──────────────────────────────────────────
          SCENE 06: FINAL CREED / EMOTIONAL QUOTE
          ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1, delay: 0.2 }}
        className="my-16 max-w-2xl mx-auto p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.12)]"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
        <div className="font-mono text-[0.625rem] tracking-[0.25em] uppercase text-slate-400 mb-4">
          FINAL TRANSMISSION
        </div>
        <blockquote className="font-display text-lg sm:text-2xl font-medium text-slate-100 leading-relaxed tracking-wide space-y-2">
          <p className="text-cyan-300/90">&ldquo;Build with curiosity.</p>
          <p className="text-white">Engineer with purpose.</p>
          <p className="text-emerald-400/90">Secure what matters.&rdquo;</p>
        </blockquote>
      </motion.div>

      {/* ──────────────────────────────────────────
          SCENE 07: RETURN TO BEGINNING (Looping to Phase 1 AI Core)
          ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="my-20 flex flex-col items-center justify-center relative"
      >
        {/* Tiny AI Core Visual Representation (Phase 1 Callback) */}
        <div className="relative mb-6 group cursor-pointer" onClick={handleRestart} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleRestart()} aria-label="Restart cinematic experience">
          <div className="w-16 h-16 rounded-full border border-cyan-500/40 bg-slate-950/80 flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-500">
            {/* Spinning Outer Ring */}
            <div
              className={`absolute inset-0 rounded-full border border-dashed border-cyan-400/60 ${
                prefersReduced ? '' : 'animate-spin'
              }`}
              style={{ animationDuration: '10s' }}
            />
            {/* Inner Core Pulse */}
            <div
              className={`w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 shadow-[0_0_15px_#06b6d4] ${
                prefersReduced ? '' : 'animate-pulse'
              }`}
            />
          </div>
          <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-xl -z-10 group-hover:bg-cyan-500/25 transition-colors" />
        </div>

        <div className="font-mono text-[0.625rem] text-cyan-400 tracking-[0.25em] uppercase mb-1">
          THE END CONNECTS TO THE BEGINNING
        </div>
        <p className="font-body text-xs text-slate-400 max-w-sm mb-6">
          The cycle of continuous learning, architecture, and exploration restarts.
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <CinematicButton
            variant="primary"
            size="md"
            onClick={handleRestart}
            ariaLabel="Restart the cinematic portfolio experience"
          >
            &larr; RESTART EXPERIENCE
          </CinematicButton>

          <CinematicButton
            variant="ghost"
            size="md"
            onClick={handleBackToTop}
            ariaLabel="Scroll smoothly back to top"
          >
            BACK TO TOP &uarr;
          </CinematicButton>
        </div>
      </motion.div>
    </div>
  )
}
