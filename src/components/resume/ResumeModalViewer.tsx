import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '@/data/profile'
import { CinematicButton } from '@/components/ui/CinematicButton'

interface ResumeModalViewerProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModalViewer({ isOpen, onClose }: ResumeModalViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(100)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleKey)
      return () => {
        document.body.style.overflow = originalOverflow
        document.removeEventListener('keydown', handleKey)
      }
    }
  }, [isOpen, onClose])

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 150))
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 75))

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md no-print"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Full-Screen Resume Document Viewer"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[91] flex flex-col p-4 sm:p-6 no-print pointer-events-none"
          >
            <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col rounded-2xl border border-white/15 bg-slate-950/95 overflow-hidden shadow-2xl pointer-events-auto">
              {/* Modal Toolbar */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/60">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    RESUME VIEWER // ATS COMPLIANT
                  </span>
                  <span className="font-mono text-[0.6875rem] text-slate-400 hidden sm:inline">
                    Md-Habib-Munsar-Ahmed-Resume.pdf
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <div className="hidden sm:flex items-center gap-1 mr-3 border border-white/10 rounded-lg p-1 bg-white/5 font-mono text-xs text-slate-300">
                    <button
                      onClick={handleZoomOut}
                      className="px-2 py-0.5 hover:text-white transition-colors"
                      title="Zoom Out"
                      aria-label="Zoom out resume"
                    >
                      &minus;
                    </button>
                    <span className="px-1.5 text-slate-400 text-[0.625rem]">{zoomLevel}%</span>
                    <button
                      onClick={handleZoomIn}
                      className="px-2 py-0.5 hover:text-white transition-colors"
                      title="Zoom In"
                      aria-label="Zoom in resume"
                    >
                      &#43;
                    </button>
                  </div>

                  {/* Print Button */}
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/30 transition-all font-mono text-xs flex items-center gap-1.5"
                    title="Print Resume"
                    aria-label="Print resume document"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span className="hidden sm:inline">PRINT</span>
                  </button>

                  {/* Download Button */}
                  <CinematicButton
                    variant="primary"
                    size="sm"
                    href={profile.resume.path}
                    download={true}
                    ariaLabel="Download resume PDF"
                  >
                    DOWNLOAD PDF
                  </CinematicButton>

                  {/* Close Button */}
                  <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/30 transition-all ml-2"
                    aria-label="Close resume viewer"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Embedded Document Viewport */}
              <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-900/60">
                <div
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-out',
                  }}
                  className="w-full max-w-4xl h-[75vh] rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-white"
                >
                  <iframe
                    src={`${profile.resume.path}#toolbar=0&navpanes=0`}
                    title="Md Habib Munsar Ahmed Resume PDF"
                    className="w-full h-full border-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
