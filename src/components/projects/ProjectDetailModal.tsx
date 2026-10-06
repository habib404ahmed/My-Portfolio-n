import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectData } from '@/data/projects'
import { CinematicButton } from '@/components/ui/CinematicButton'

interface ProjectDetailModalProps {
  project: ProjectData | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (project) {
      closeButtonRef.current?.focus()
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleKey)
      return () => document.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Project Details: ${project.title}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="w-full max-w-3xl my-auto rounded-2xl border border-white/15 bg-slate-950/95 p-6 sm:p-10 shadow-2xl relative overflow-hidden pointer-events-auto"
              style={{
                boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${project.glowColor}`,
              }}
            >
              {/* Corner accent glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
                style={{
                  background: project.accentColor,
                  filter: 'blur(50px)',
                }}
                aria-hidden="true"
              />

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/30 transition-all"
                aria-label="Close project modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Top Meta Header */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-0.5 rounded"
                  style={{
                    color: project.accentColor,
                    background: `${project.accentColor}18`,
                  }}
                >
                  PROJECT {project.number} // {project.categoryLabel}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-base text-cyan-300/90 font-medium font-body mb-6">
                {project.tagline}
              </p>

              {/* Long Description */}
              <p className="text-sm text-slate-300 font-body leading-relaxed mb-6">
                {project.longDescription}
              </p>

              {/* Architectural Pipeline Steps */}
              <div className="mb-6 p-4 rounded-xl border border-white/10 bg-black/40">
                <div className="font-mono text-[0.625rem] text-slate-400 uppercase tracking-widest mb-3">
                  SYSTEM EXECUTION PIPELINE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {project.pipeline.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded border border-white/5 bg-white/[0.02] flex flex-col justify-between"
                    >
                      <span className="font-mono text-[0.5625rem] text-slate-500 mb-1">{p.step}</span>
                      <span className="font-mono text-xs font-semibold text-slate-200">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <div className="font-mono text-[0.625rem] text-slate-400 uppercase tracking-widest mb-2.5">
                  VERIFIED STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md border border-white/10 bg-slate-900 font-mono text-xs text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <div className="font-mono text-[0.625rem] text-slate-400 uppercase tracking-widest mb-2.5">
                  CORE CAPABILITIES & IMPLEMENTATION
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-body">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5 font-mono">&bull;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* My Contribution */}
              <div className="mb-8 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20">
                <div className="font-mono text-[0.625rem] text-cyan-300 uppercase tracking-widest mb-1.5 font-bold">
                  MY ROLE & CONTRIBUTION
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-body leading-relaxed">
                  {project.contribution}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <CinematicButton
                    variant="primary"
                    size="md"
                    href={project.githubUrl}
                    target="_blank"
                    ariaLabel={`View source code on GitHub for ${project.title}`}
                  >
                    VIEW ON GITHUB &rarr;
                  </CinematicButton>

                  {project.liveUrl && (
                    <CinematicButton
                      variant="secondary"
                      size="md"
                      href={project.liveUrl}
                      target="_blank"
                      ariaLabel={`Open Live Demo for ${project.title}`}
                    >
                      LIVE DEMO
                    </CinematicButton>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="font-mono text-xs text-slate-400 hover:text-white transition-colors"
                >
                  &larr; BACK TO PROJECT UNIVERSE
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
