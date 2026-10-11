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
      className="relative bg-transparent text-[#F4F7FA] overflow-hidden"
      aria-label="Contact and Final Experience"
    >
      {/* ──────────────────────────────────────────
          SCENE 01: FINAL ENVIRONMENT (Deep Space + Digital Network)
          ────────────────────────────────────────── */}
      <FinalSpaceCanvas />

      {/* Atmospheric Radial Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00D9FF]/[0.03] rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6575FF]/[0.03] rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="page-container relative z-10">
        {/* ──────────────────────────────────────────
            TRANSITION FROM RESUME: CONVERGENCE & REVELATION
            ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center py-10 border-b border-[rgba(140,190,210,0.16)]"
        >
          {/* Subtle Converging Singularity Glyph */}
          <div className="w-12 h-12 mx-auto mb-8 relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-[rgba(0,217,255,0.25)]"
            />
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.5)]"
            />
          </div>

          <p className="font-mono text-[13px] text-[#00D9FF] font-semibold tracking-[0.14em] uppercase mb-4">
            SCENE 12 &bull; FINAL CONNECTION
          </p>

          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-tight text-[#F5F8FA] mb-5 uppercase leading-[1.1]">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#38E8FF] to-[#F4F7FA]">
              SOMETHING MEANINGFUL.
            </span>
          </h2>

          <p className="font-body text-[clamp(16px,1.2vw,18px)] text-[#A8B4C2] max-w-[65ch] mx-auto font-normal leading-[1.65]">
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
          <div className="inline-block px-4 py-1.5 rounded-full border border-[rgba(140,190,210,0.16)] bg-[#0D131A]/60 backdrop-blur-sm mb-6">
            <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-[#A8B4C2] font-semibold">
              ENGINEER SPECIFICATION
            </span>
          </div>

          <h3 className="font-display text-[clamp(28px,3.5vw,48px)] font-extrabold text-[#F5F8FA] tracking-tight uppercase mb-2">
            {profile.name.full}
          </h3>

          <p className="font-mono text-[17px] sm:text-[20px] text-[#00D9FF] tracking-[0.12em] uppercase font-bold mb-4">
            {profile.title}
          </p>

          {/* Specialization Trio */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-[13px] sm:text-[14px] text-[#A8B4C2] tracking-wider">
            <span className="px-3.5 py-1.5 rounded-md border border-[rgba(0,217,255,0.25)] bg-[#0D131A]/70 text-[#00D9FF] font-medium">
              AI / ML
            </span>
            <span className="text-[#687687]">&bull;</span>
            <span className="px-3.5 py-1.5 rounded-md border border-[rgba(101,117,255,0.25)] bg-[#0D131A]/70 text-[#6575FF] font-medium">
              FULL-STACK
            </span>
            <span className="text-[#687687]">&bull;</span>
            <span className="px-3.5 py-1.5 rounded-md border border-[rgba(56,232,255,0.25)] bg-[#0D131A]/70 text-[#38E8FF] font-medium">
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
          <p className="font-body text-[16px] sm:text-[17px] text-[#A8B4C2] leading-[1.65] font-normal">
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
              className="px-8 py-4 rounded-full font-display text-[15px] sm:text-[16px] font-bold tracking-wider text-[#050608] bg-[#00D9FF] hover:bg-[#38E8FF] shadow-[0_0_35px_rgba(0,217,255,0.35)] hover:shadow-[0_0_45px_rgba(0,217,255,0.5)] transition-all duration-300 text-center block cursor-pointer"
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

          <p className="font-mono text-[14px] text-slate-400 mt-2 font-medium">
            Direct inbox: <span className="text-[#F5F8FA] font-semibold">{profile.contact.email}</span>
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
      </div>

      {/* ──────────────────────────────────────────
          SCENE 08: SUBTLE TRANSLUCENT LIQUID GLASS FOOTER
          ────────────────────────────────────────── */}
      <footer
        className="w-full relative z-20 border-t border-[rgba(120,190,220,0.20)]"
        style={{
          background: 'rgba(3, 9, 17, 0.68)',
          backdropFilter: 'blur(12px) saturate(120%)',
          WebkitBackdropFilter: 'blur(12px) saturate(120%)',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.45)',
        }}
        aria-label="Portfolio Footer"
      >
        <div className="page-container py-8 sm:py-10">
          {/* Upper Footer Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-display font-bold text-[17px] sm:text-[18px] text-[#F5F8FC] tracking-wide m-0">
                {profile.name.full}
              </p>
              <p className="font-mono text-[13px] sm:text-[14px] text-[#C2CDD9] mt-1.5 mb-0">
                Software Engineer &bull; Bongaigaon, Assam, India
              </p>
            </div>

            {/* Social Direct Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-7 font-mono text-[14px]">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C2CDD9] hover:text-[#27DDF5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#27DDF5] rounded px-1"
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C2CDD9] hover:text-[#27DDF5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#27DDF5] rounded px-1"
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
              <a
                href={profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C2CDD9] hover:text-[#27DDF5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#27DDF5] rounded px-1"
                aria-label="YouTube Channel"
              >
                YouTube
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-[#27DDF5] hover:text-[#F5F8FC] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#27DDF5] rounded px-1"
                aria-label={`Send Email to ${profile.contact.email}`}
              >
                Email
              </a>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] my-6 sm:my-7 bg-[rgba(190,220,245,0.20)]" />

          {/* Lower Footer Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[12px] sm:text-[13px] font-mono gap-3 text-center sm:text-left">
            <p className="text-[#C2CDD9] m-0">
              &copy; 2026 {profile.name.full}. All rights reserved.
            </p>
            <p className="text-[#A7B6C7] m-0">
              Curated for Excellence &bull; AI/ML &bull; Full-Stack &bull; Cybersecurity
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}
