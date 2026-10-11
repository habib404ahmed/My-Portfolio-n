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
        className="mb-14 pt-10 border-t border-[rgba(190,220,245,0.20)]"
      >
        <span className="font-mono text-[13px] tracking-[0.14em] uppercase text-[#27DDF5] font-semibold block mb-3">
          SYSTEM SIGNATURE
        </span>
        <h3 className="font-display text-[26px] sm:text-[32px] font-extrabold tracking-tight text-[#F5F8FC] mb-2 uppercase">
          MD HABIB MUNSAR AHMED
        </h3>
        <p className="font-mono text-[15px] sm:text-[16px] text-[#C2CDD9] font-semibold tracking-wider uppercase mb-1.5">
          Software Engineer
        </p>
        <p className="font-mono text-[13px] sm:text-[14px] text-[#A7B6C7] tracking-wider uppercase">
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
        className="my-16 max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl border border-[rgba(120,190,220,0.20)] bg-[rgba(3,9,17,0.68)] backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.4)]"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#27DDF5]/80 to-transparent" />
        <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-[#A7B6C7] font-semibold mb-4">
          FINAL TRANSMISSION
        </div>
        <blockquote className="font-display text-[20px] sm:text-[24px] font-medium text-[#F5F8FC] leading-relaxed tracking-wide space-y-2">
          <p className="text-[#27DDF5]">&ldquo;Build with curiosity.</p>
          <p className="text-[#F5F8FC]">Engineer with purpose.</p>
          <p className="text-[#34D399]">Secure what matters.&rdquo;</p>
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
        className="my-20 flex flex-col items-center justify-center relative z-10"
      >
        {/* Tiny AI Core Visual Representation (Phase 1 Callback) */}
        <div
          className="relative mb-6 group cursor-pointer"
          onClick={handleRestart}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleRestart()}
          aria-label="Restart cinematic experience"
        >
          <div className="w-16 h-16 rounded-full border border-[rgba(39,221,245,0.45)] bg-[#030911]/90 flex items-center justify-center relative shadow-[0_0_25px_rgba(39,221,245,0.3)] group-hover:scale-110 transition-transform duration-500">
            {/* Spinning Outer Ring */}
            <div
              className={`absolute inset-0 rounded-full border border-dashed border-[#27DDF5]/70 ${
                prefersReduced ? '' : 'animate-spin'
              }`}
              style={{ animationDuration: '10s' }}
            />
            {/* Inner Core Pulse */}
            <div
              className={`w-5 h-5 rounded-full bg-gradient-to-tr from-[#27DDF5] to-emerald-400 shadow-[0_0_15px_#27DDF5] ${
                prefersReduced ? '' : 'animate-pulse'
              }`}
            />
          </div>
          <div className="absolute -inset-4 bg-[#27DDF5]/10 rounded-full blur-xl -z-10 group-hover:bg-[#27DDF5]/25 transition-colors pointer-events-none" />
        </div>

        <div className="font-mono text-[12px] sm:text-[13px] text-[#27DDF5] tracking-[0.14em] uppercase mb-1.5 font-semibold">
          THE END CONNECTS TO THE BEGINNING
        </div>
        <p className="font-body text-[14px] sm:text-[15px] text-[#C2CDD9] max-w-sm mb-6 leading-relaxed">
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
