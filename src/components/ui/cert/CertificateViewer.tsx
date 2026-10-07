import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { certifications, type Certification } from '@/data/certifications'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CertificateViewerProps {
  cert: Certification | null
  onClose: () => void
  onSelectCert?: (cert: Certification) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  ai: '#38bdf8',
  security: '#10b981',
  recognition: '#f59e0b',
}

export function CertificateViewer({
  cert,
  onClose,
  onSelectCert,
}: CertificateViewerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const prefersReduced = useReducedMotion()

  // Find index in certifications array for Next/Previous navigation
  const currentIndex = cert
    ? certifications.findIndex((c) => c.id === cert.id)
    : -1

  const handleNext = () => {
    if (currentIndex === -1) return
    const nextIdx = (currentIndex + 1) % certifications.length
    const nextCert = certifications[nextIdx]
    if (onSelectCert) onSelectCert(nextCert)
  }

  const handlePrev = () => {
    if (currentIndex === -1) return
    const prevIdx = (currentIndex - 1 + certifications.length) % certifications.length
    const prevCert = certifications[prevIdx]
    if (onSelectCert) onSelectCert(prevCert)
  }

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!cert) return

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus close button on mount
    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [cert, currentIndex, onClose])

  if (!cert) return null

  const accentColor = CATEGORY_COLORS[cert.category] || '#38bdf8'

  // Descriptive alt text for screen readers
  const getAltText = (c: Certification) => {
    if (c.id === 'cisco-modern-ai') {
      return 'Introduction to Modern AI certificate of course completion issued by Cisco Networking Academy to Habib Munsar Ahmed'
    }
    if (c.id === 'ethical-hacking') {
      return 'Ethical Hacking Certificate of Completion issued by Pitronix Solutions to Md Habib Munsar Ahmed (#00102970)'
    }
    return 'Certificate of Appreciation issued by Sunstone and Assam Down Town University to Md Habib Munsar Ahmed'
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`Official Credential: ${cert.title}`}
      >
        {/* ─── 1. Backdrop (Closes on Click, Covers Fixed Navbar Completely) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.25 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-25"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor}40 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* ─── 2. Dedicated Prominent Close Button (Fixed, Above All Layers) ─── */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-7 z-[1010] w-11 h-11 rounded-full bg-slate-950/85 border border-cyan-500/40 text-white hover:text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/60 shadow-lg shadow-black/70 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group cursor-pointer"
          aria-label="Close certificate viewer"
          title="Close certificate viewer (Escape)"
        >
          <svg
            className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ─── 3. Desktop Prev / Next Buttons (Vertically Centered Relative to Screen) ─── */}
        <button
          onClick={handlePrev}
          className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-[1010] w-14 h-14 rounded-full bg-slate-950/80 border border-white/20 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/50 shadow-2xl hidden md:flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer group"
          aria-label="Previous certificate"
          title="Previous certificate (Arrow Left)"
        >
          <svg
            className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[1010] w-14 h-14 rounded-full bg-slate-950/80 border border-white/20 text-slate-200 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/50 shadow-2xl hidden md:flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer group"
          aria-label="Next certificate"
          title="Next certificate (Arrow Right)"
        >
          <svg
            className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ─── 4. Main Certificate Content Container ─── */}
        <div
          className="relative z-[1001] w-full max-w-[min(90vw,1000px)] flex flex-col items-center justify-center pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Certificate Image Frame — Liquid Glass Frame (Phase 9 Section 40) */}
          <motion.div
            key={cert.id}
            initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl glass-focus liquid-edge p-1.5 shadow-2xl overflow-hidden flex items-center justify-center w-auto max-h-[min(72vh,680px)]"
            style={{
              boxShadow: `0 28px 70px rgba(0, 0, 0, 0.95), 0 0 45px ${accentColor}25`,
            }}
          >
            <picture className="block max-h-[min(72vh,680px)] w-auto rounded-xl overflow-hidden">
              <source type="image/webp" srcSet={cert.imageWebp} />
              <img
                src={cert.image}
                alt={getAltText(cert)}
                className="max-h-[min(72vh,680px)] max-w-[min(90vw,1000px)] w-auto h-auto object-contain filter contrast-[1.01]"
                loading="eager"
              />
            </picture>
          </motion.div>

          {/* ─── 5. Certificate Metadata & Action Bar — Glass Level 1 ─── */}
          <div className="mt-4 sm:mt-5 w-full glass-level-1 liquid-edge p-3.5 sm:p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-slate-300">
            {/* Metadata Left */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-center sm:text-left">
              <span className="text-white font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
                {cert.title}
              </span>
              <span className="text-slate-600 hidden sm:inline">&bull;</span>
              <span className="text-slate-400">
                ISSUED: <strong className="text-slate-200">{cert.date}</strong>
              </span>
              {cert.certificateId && (
                <>
                  <span className="text-slate-600 hidden sm:inline">&bull;</span>
                  <span className="text-cyan-400">ID: {cert.certificateId}</span>
                </>
              )}
            </div>

            {/* Navigation & Actions Right */}
            <div className="flex items-center gap-3">
              {/* Mobile Prev / Next Controls (Placed Below Certificate on <md) */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={handlePrev}
                  className="px-3.5 py-1.5 rounded-lg border border-white/15 bg-slate-900/90 text-slate-200 hover:text-white hover:border-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Previous certificate"
                >
                  &larr; PREV
                </button>
                <button
                  onClick={handleNext}
                  className="px-3.5 py-1.5 rounded-lg border border-white/15 bg-slate-900/90 text-slate-200 hover:text-white hover:border-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Next certificate"
                >
                  NEXT &rarr;
                </button>
              </div>

              {/* Stepper Indicator */}
              <div className="px-3 py-1 rounded-full border border-white/10 bg-slate-950/80 text-slate-400 font-bold tracking-wider">
                0{currentIndex + 1} / 0{certifications.length}
              </div>

              {/* Download Original Asset Option */}
              <a
                href={cert.downloadUrl || cert.image}
                download={`${cert.id}.jpg`}
                className="px-3 py-1 rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all hidden sm:flex items-center gap-1.5"
                aria-label={`Download certificate image for ${cert.title}`}
              >
                <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>DOWNLOAD</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  )
}

