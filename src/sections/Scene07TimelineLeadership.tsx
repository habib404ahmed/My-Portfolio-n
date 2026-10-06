import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineEvents, type TimelineEvent } from '@/data/timeline'
import { certifications } from '@/data/certifications'
import { CertificateViewer } from '@/components/ui/cert/CertificateViewer'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface EnvironmentStyle {
  ambientBg: string
  gridType: string
  visualElements: string
}

const ENVIRONMENTS: Record<string, EnvironmentStyle> = {
  'bca-foundation': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
    gridType: 'ARCHITECTURAL_NODES',
    visualElements: 'Clean geometric forms & core algorithmic primitives',
  },
  'ai-foundation': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(167, 139, 250, 0.12) 0%, transparent 70%)',
    gridType: 'NEURAL_STREAMS',
    visualElements: 'Autonomous weights, embedding vectors & RAG pipelines',
  },
  'technical-growth': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
    gridType: 'API_ARCHITECTURE',
    visualElements: 'Distributed event bus, microservice mesh & database clusters',
  },
  'ethical-hacking': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
    gridType: 'SECURITY_PERIMETER',
    visualElements: 'Hardened network topology, vulnerability telemetry & zero-trust boundaries',
  },
  'university-leadership': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(245, 158, 11, 0.14) 0%, transparent 75%)',
    gridType: 'HUMAN_CENTERED_WARMTH',
    visualElements: 'Institutional appreciation document & cross-campus coordination',
  },
  'future-chapter': {
    ambientBg: 'radial-gradient(circle at 50% 30%, rgba(226, 232, 240, 0.08) 0%, transparent 80%)',
    gridType: 'OPEN_HORIZON',
    visualElements: 'Expansive digital frontier & lifelong engineering trajectory',
  },
}

export function Scene07TimelineLeadership() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [viewerCertId, setViewerCertId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  const activeEvent = timelineEvents[activeIndex] || timelineEvents[0]
  const currentEnv = ENVIRONMENTS[activeEvent.id] || ENVIRONMENTS['bca-foundation']

  const appreciationCert = certifications.find(
    (c) => c.id === 'adtu-sunstone-appreciation'
  )

  const activeCertForViewer = certifications.find((c) => c.id === viewerCertId) || null

  return (
    <SectionTransition id="achievements" ariaLabel="Cinematic Journey Timeline" className="py-24 md:py-32 border-b border-white/5">
      <div className="page-container relative">
        {/* Dynamic Scene Environment Backdrop (Rule 05) */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 -z-10"
          style={{ background: currentEnv.ambientBg }}
          aria-hidden="true"
        />

        {/* Scene Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-cyan-400 mb-3 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SCENE 07 &bull; CINEMATIC TRAJECTORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight uppercase mb-3">
            THE JOURNEY
          </h2>

          <p className="font-mono text-xs sm:text-sm text-slate-400">
            The camera travels through foundational milestones, security hardening, and leadership.
          </p>
        </div>

        {/* ─── RULE 04: MILESTONE STEPPING TIMELINE ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {timelineEvents.map((evt, idx) => {
            const isActive = idx === activeIndex
            const isPast = idx < activeIndex
            return (
              <button
                key={evt.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all duration-300 relative group focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                  isActive
                    ? 'border-white/50 bg-slate-900/95 shadow-xl scale-102 opacity-100 ring-1 ring-cyan-400/40'
                    : isPast
                    ? 'border-white/10 bg-slate-950/50 opacity-65 hover:opacity-95 hover:border-white/25'
                    : 'border-white/5 bg-slate-950/30 opacity-35 hover:opacity-75 hover:border-white/15'
                }`}
                style={{
                  boxShadow: isActive ? `0 0 20px ${evt.color}25` : 'none',
                }}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: evt.color }}
                  >
                    {evt.year}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: isActive ? evt.color : 'rgba(255,255,255,0.2)',
                    }}
                  />
                </div>
                <div className="font-display text-[0.6875rem] font-bold tracking-wider text-slate-200 uppercase truncate">
                  {evt.label}
                </div>
              </button>
            )
          })}
        </div>

        {/* ─── ACTIVE MILESTONE HERO VIEWPORT (Rule 04, 05, 06) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
          {/* Left Column: Milestone Narrative */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: prefersReduced ? 0 : 0.4 }}
                className="p-8 sm:p-10 rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-md relative overflow-hidden"
              >
                {/* Environment Indicator Pill */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: activeEvent.color }}
                  />
                  <span className="font-mono text-[0.625rem] tracking-widest uppercase text-slate-400 font-semibold">
                    ENVIRONMENT &bull; {currentEnv.gridType}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-xl sm:text-2xl font-bold"
                    style={{ color: activeEvent.color }}
                  >
                    {activeEvent.year}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                    {activeEvent.label}
                  </h3>
                </div>

                <div className="font-mono text-xs sm:text-sm text-cyan-400 mb-4 font-medium">
                  {activeEvent.subtitle}
                </div>

                <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-light">
                  {activeEvent.description}
                </p>

                {/* Connected Architecture Tags */}
                {activeEvent.connectedProjects && (
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
                    <span className="font-mono text-[0.625rem] text-slate-500 uppercase tracking-wider">
                      PROJECTS:
                    </span>
                    {activeEvent.connectedProjects.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-slate-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {/* Subtitle environment cue */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[0.6875rem] font-mono text-slate-500">
                  <span>{currentEnv.visualElements}</span>
                  <span className="text-slate-600">
                    STEP {activeIndex + 1} OF {timelineEvents.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Visual Evidence or Materializing Document (Rule 06) */}
          <div className="lg:col-span-5 flex justify-center">
            <AnimatePresence mode="wait">
              {activeEvent.type === 'leadership' && appreciationCert ? (
                /* ─── RULE 06: MATERIALIZING LEADERSHIP APPRECIATION DOCUMENT ─── */
                <motion.div
                  key="leadership-doc"
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -15 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setViewerCertId('adtu-sunstone-appreciation')}
                  className="w-full max-w-sm p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-slate-950/80 backdrop-blur-md cursor-pointer hover:border-amber-400/60 shadow-[0_15px_40px_rgba(245,158,11,0.15)] transition-all group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && setViewerCertId('adtu-sunstone-appreciation')
                  }
                  aria-label="View verified Certificate of Appreciation"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
                    <span className="font-mono text-[0.625rem] font-bold text-amber-400 uppercase tracking-widest">
                      DOCUMENT EVIDENCE &bull; ADTU
                    </span>
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  </div>

                  <div className="font-display text-lg font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                    Certificate of Appreciation
                  </div>
                  <div className="font-mono text-xs text-amber-300/80 mb-3">
                    Assam Down Town University &bull; Sunstone
                  </div>
                  <p className="font-body text-xs text-slate-300 leading-relaxed mb-4">
                    Conferred for leadership & logistics execution during university Orientation &
                    Independence Day programs.
                  </p>

                  <div className="p-3 rounded-lg border border-amber-500/20 bg-black/40 flex items-center justify-between text-xs font-mono text-amber-300">
                    <span>INSPECT DOCUMENT</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </motion.div>
              ) : (
                /* Standard Technical Milestone Telemetry */
                <motion.div
                  key={activeEvent.id + '-visual'}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm p-6 rounded-2xl border border-white/10 bg-slate-950/50 backdrop-blur-sm text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 border flex items-center justify-center"
                    style={{
                      borderColor: `${activeEvent.color}40`,
                      background: `${activeEvent.color}10`,
                      boxShadow: `0 0 25px ${activeEvent.color}25`,
                    }}
                  >
                    <span
                      className="font-mono text-sm font-bold"
                      style={{ color: activeEvent.color }}
                    >
                      {activeEvent.year}
                    </span>
                  </div>
                  <div className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1">
                    {activeEvent.label}
                  </div>
                  <div className="font-mono text-xs text-slate-400 mb-4">
                    {currentEnv.gridType}
                  </div>
                  <p className="font-body text-xs text-slate-400 leading-relaxed">
                    {currentEnv.visualElements}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Certificate Modal Viewer for Evidence */}
        <CertificateViewer
          cert={activeCertForViewer}
          onClose={() => setViewerCertId(null)}
        />
      </div>
    </SectionTransition>
  )
}
