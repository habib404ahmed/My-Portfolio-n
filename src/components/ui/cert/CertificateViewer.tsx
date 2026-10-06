import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { certifications, type Certification } from '@/data/certifications'

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
  const [zoom, setZoom] = useState<number>(1)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Find index in certifications array for Next/Previous navigation
  const currentIndex = cert
    ? certifications.findIndex((c) => c.id === cert.id)
    : -1

  const handleNext = () => {
    if (currentIndex === -1) return
    const nextIdx = (currentIndex + 1) % certifications.length
    const nextCert = certifications[nextIdx]
    setZoom(1)
    if (onSelectCert) onSelectCert(nextCert)
  }

  const handlePrev = () => {
    if (currentIndex === -1) return
    const prevIdx = (currentIndex - 1 + certifications.length) % certifications.length
    const prevCert = certifications[prevIdx]
    setZoom(1)
    if (onSelectCert) onSelectCert(prevCert)
  }

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5))
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75))
  const resetZoom = () => setZoom(1)

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!cert) return
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
    return () => document.removeEventListener('keydown', handleKeyDown)
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

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[90] flex flex-col justify-between overflow-hidden bg-black/95 backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Official Credential: ${cert.title}`}
      >
        {/* Environmental Atmospheric Lighting (Behind Certificate) */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 -z-10 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor}33 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* ─── Top Control Bar ─── */}
        <header className="w-full border-b border-white/10 bg-slate-950/80 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ background: accentColor }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  CREDENTIAL {cert.number} / 03
                </span>
                <span className="font-mono text-[0.625rem] text-slate-400 uppercase hidden sm:inline">
                  &bull; {cert.categoryLabel}
                </span>
              </div>
              <div className="font-display text-sm font-semibold text-slate-200 truncate max-w-xs sm:max-w-md">
                {cert.title}
              </div>
            </div>
          </div>

          {/* Action & Zoom Controls */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center border border-white/10 rounded-lg bg-black/40 p-0.5 font-mono text-xs text-slate-300">
              <button
                onClick={zoomOut}
                className="px-2 py-1 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                &minus;
              </button>
              <button
                onClick={resetZoom}
                className="px-2 py-1 text-[0.6875rem] hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Reset Zoom"
                aria-label="Reset Zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                onClick={zoomIn}
                className="px-2 py-1 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Zoom In"
                aria-label="Zoom In"
              >
                +
              </button>
            </div>

            {/* Download Original Asset Button */}
            <a
              href={cert.downloadUrl || cert.image}
              download={`${cert.id}.jpg`}
              className="px-3.5 py-1.5 rounded-lg border border-white/15 bg-white/5 font-mono text-xs text-slate-200 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-950/30 transition-all flex items-center gap-1.5"
              aria-label={`Download original certificate asset for ${cert.title}`}
            >
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden sm:inline">DOWNLOAD ORIGINAL</span>
            </a>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 font-mono text-xs text-slate-300 hover:text-white hover:bg-rose-950/40 hover:border-rose-500/40 transition-all"
              aria-label="Close certificate viewer (Escape)"
            >
              CLOSE &times;
            </button>
          </div>
        </header>

        {/* ─── Center Full-Resolution Document Canvas ─── */}
        <main
          className="relative flex-1 w-full flex items-center justify-center p-4 sm:p-8 overflow-auto select-none"
          onWheel={(e) => {
            if (e.deltaY < 0) zoomIn()
            else zoomOut()
          }}
        >
          {/* Previous Slide Trigger (Desktop) */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 bg-slate-950/80 text-white hover:border-cyan-400 hover:bg-cyan-950/40 transition-all hidden md:flex items-center justify-center z-20 shadow-xl"
            aria-label="Previous certificate"
          >
            &larr;
          </button>

          {/* Certificate Image Frame */}
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: zoom }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[76vh] w-auto h-auto rounded-lg shadow-2xl border border-white/10 overflow-hidden bg-black flex items-center justify-center"
            style={{
              transformOrigin: 'center center',
            }}
          >
            <picture className="block max-h-[76vh] w-auto">
              <source type="image/webp" srcSet={cert.imageWebp} />
              <img
                src={cert.image}
                alt={getAltText(cert)}
                className="max-h-[76vh] w-auto max-w-full object-contain filter contrast-[1.01]"
                loading="eager"
              />
            </picture>
          </motion.div>

          {/* Next Slide Trigger (Desktop) */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 bg-slate-950/80 text-white hover:border-cyan-400 hover:bg-cyan-950/40 transition-all hidden md:flex items-center justify-center z-20 shadow-xl"
            aria-label="Next certificate"
          >
            &rarr;
          </button>
        </main>

        {/* ─── Bottom Footer Bar & Stepper ─── */}
        <footer className="w-full border-t border-white/10 bg-slate-950/90 px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 z-10 font-mono text-xs">
          <div className="flex items-center gap-4 text-slate-400">
            <span>ISSUED: <strong className="text-slate-200">{cert.date}</strong></span>
            {cert.certificateId && (
              <span>ID: <strong className="text-cyan-400">{cert.certificateId}</strong></span>
            )}
          </div>

          {/* Navigation Controls (Mobile + Tablet + Desktop Accessible) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="px-3 py-1 rounded border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
              aria-label="View previous certificate"
            >
              &larr; PREV
            </button>

            <span className="text-slate-500 font-bold">
              0{currentIndex + 1} / 03
            </span>

            <button
              onClick={handleNext}
              className="px-3 py-1 rounded border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
              aria-label="View next certificate"
            >
              NEXT &rarr;
            </button>
          </div>
        </footer>
      </div>
    </AnimatePresence>
  )
}
