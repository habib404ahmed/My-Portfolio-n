import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '@/data/profile'
import { ContactForm } from '@/components/contact/ContactForm'
import { SocialConstellation } from '@/components/contact/SocialConstellation'
import { ClosingCredits } from '@/components/contact/ClosingCredits'
import { FinalSpaceCanvas } from '@/components/contact/FinalSpaceCanvas'
import { CinematicButton } from '@/components/ui/CinematicButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Phase6ContactFinalProps {
  onRestart?: () => void
}

export function Phase6ContactFinal({ onRestart }: Phase6ContactFinalProps) {
  const [showForm, setShowForm] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black text-slate-100 overflow-hidden pt-20 pb-12"
      aria-label="Contact and Final Experience"
    >
      {/* ──────────────────────────────────────────
          SCENE 01: FINAL ENVIRONMENT (Deep Space + Digital Network)
          ────────────────────────────────────────── */}
      <FinalSpaceCanvas />

      {/* Atmospheric Radial Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-slate-900/30 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="page-container relative">
        {/* ──────────────────────────────────────────
            TRANSITION FROM RESUME: CONVERGENCE & REVELATION
            ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center py-20 border-b border-white/10"
        >
          {/* Subtle Converging Singularity Glyph */}
          <div className="w-12 h-12 mx-auto mb-8 relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-cyan-500/20"
            />
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_#06b6d4]"
            />
          </div>

          <p className="font-mono text-xs sm:text-sm text-cyan-400 font-semibold tracking-[0.3em] uppercase mb-4">
            SCENE 12 &bull; FINAL CONNECTION
          </p>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-emerald-400">
              SOMETHING MEANINGFUL.
            </span>
          </h2>

          <p className="font-body text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Open to software engineering, AI/ML, full-stack and cybersecurity opportunities.
          </p>
        </motion.div>

        {/* ──────────────────────────────────────────
            SCENE 02: FINAL IDENTITY
            ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-center py-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-slate-300">
              ENGINEER SPECIFICATION
            </span>
          </div>

          <h3 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mb-3">
            {profile.name.full}
          </h3>

          <p className="font-mono text-sm sm:text-base text-cyan-400 tracking-[0.2em] uppercase font-bold mb-4">
            {profile.title}
          </p>

          {/* Specialization Trio */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm text-slate-300 tracking-wider">
            <span className="px-3 py-1 rounded-md border border-cyan-500/20 bg-cyan-950/20 text-cyan-300">
              AI / ML
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="px-3 py-1 rounded-md border border-sky-500/20 bg-sky-950/20 text-sky-300">
              FULL-STACK
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="px-3 py-1 rounded-md border border-emerald-500/20 bg-emerald-950/20 text-emerald-300">
              CYBERSECURITY
            </span>
          </div>
        </motion.div>

        {/* ──────────────────────────────────────────
            SCENE 03: CONTACT PHILOSOPHY
            ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="font-body text-base text-slate-300 leading-relaxed font-light">
            Whether you are discussing engineering roles, collaborative systems, or technical architecture &mdash; I am always eager to connect with fellow builders.
          </p>
        </motion.div>

        {/* ──────────────────────────────────────────
            SCENE 04: PRIMARY CONTACT & TRANSMISSION
            ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Primary CTA (Email Client Direct Link) */}
            <a
              href={`mailto:${profile.contact.email}`}
              className="px-8 py-3.5 rounded-full font-display text-sm font-bold tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 hover:brightness-110 shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-300 text-center block"
              aria-label={`Get in touch with Md Habib via email: ${profile.contact.email}`}
            >
              GET IN TOUCH &bull; {profile.contact.email}
            </a>

            {/* Optional Contact Form Toggle */}
            <CinematicButton
              variant={showForm ? 'primary' : 'ghost'}
              size="md"
              onClick={() => setShowForm(!showForm)}
              ariaLabel={showForm ? 'Hide message transmission form' : 'Open message transmission form'}
            >
              {showForm ? 'CLOSE FORM &times;' : 'TRANSMIT MESSAGE VIA FORM &darr;'}
            </CinematicButton>
          </div>

          <p className="font-mono text-xs text-slate-500 mt-2">
            Direct inbox: <span className="text-slate-400 font-semibold">{profile.contact.email}</span>
          </p>
        </motion.div>

        {/* Contact Form Container */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.4 }}
              className="overflow-hidden mb-16"
            >
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ──────────────────────────────────────────
            SOCIAL CONNECTIONS & NETWORK TOPOLOGY
            ────────────────────────────────────────── */}
        <SocialConstellation />

        {/* ──────────────────────────────────────────
            SCENES 05, 06, 07: DIGITAL SIGNATURE, FINAL CREED & RESTART
            ────────────────────────────────────────── */}
        <ClosingCredits onRestart={onRestart} />

        {/* ──────────────────────────────────────────
            SCENE 08: MINIMAL FOOTER
            ────────────────────────────────────────── */}
        <footer
          className="pt-12 pb-6 border-t border-white/10 text-center sm:text-left"
          aria-label="Portfolio Footer"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-bold text-sm text-white tracking-wide">
                {profile.name.full}
              </p>
              <p className="font-mono text-xs text-slate-400">
                {profile.title} &bull; {profile.location}
              </p>
            </div>

            {/* Social Direct Links */}
            <div className="flex items-center gap-6 font-mono text-xs text-slate-400">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                GitHub
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                YouTube
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="hover:text-cyan-400 transition-colors"
              >
                Email
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[0.6875rem] font-mono text-slate-500 gap-2">
            <p>&copy; 2026 {profile.name.full}. All rights reserved.</p>
            <p className="text-slate-600">
              Curated for Excellence &bull; AI/ML &bull; Full-Stack &bull; Cybersecurity
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
