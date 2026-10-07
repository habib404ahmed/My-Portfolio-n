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
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(101, 117, 255, 0.12) 0%, transparent 70%)',
    gridType: 'ACADEMIC_FOUNDATION',
    visualElements: 'Core algorithms, discrete math & data structures at Assam Down Town University',
  },
  'systems-experience': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(101, 117, 255, 0.10) 0%, transparent 70%)',
    gridType: 'SYSTEMS_DIAGNOSTICS',
    visualElements: 'Hardware architecture, PC configuration, dual-boot setups & system optimization',
  },
  'cybersecurity-learning': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(0, 217, 255, 0.12) 0%, transparent 70%)',
    gridType: 'SECURITY_LABS',
    visualElements: 'Kali Linux terminal mastery, penetration testing tools, Nmap & network defense',
  },
  'ai-exploration': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(56, 232, 255, 0.12) 0%, transparent 70%)',
    gridType: 'NEURAL_STREAMS',
    visualElements: 'Cisco modern AI foundations, Python machine learning, RAG & agent architectures',
  },
  'technical-growth': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(0, 217, 255, 0.14) 0%, transparent 70%)',
    gridType: 'PRODUCTION_SYSTEMS',
    visualElements: 'SENTRA passive SOC, multi-agent frameworks, Campus Care & UniBox platforms',
  },
  'content-creator': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(139, 124, 255, 0.12) 0%, transparent 70%)',
    gridType: 'TECHNICAL_BROADCAST',
    visualElements: 'King of Kali Linux educational channel & practical cybersecurity knowledge sharing',
  },
  'ethical-hacking': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(0, 217, 255, 0.12) 0%, transparent 70%)',
    gridType: 'CERTIFIED_AUDIT',
    visualElements: 'Pitronix Solutions certified ethical penetration testing & defense standards',
  },
  'university-leadership': {
    ambientBg: 'radial-gradient(circle at 60% 40%, rgba(101, 117, 255, 0.12) 0%, transparent 75%)',
    gridType: 'CAMPUS_COORDINATION',
    visualElements: 'Assam Down Town University Certificate of Appreciation & program organization',
  },
  'future-chapter': {
    ambientBg: 'radial-gradient(circle at 50% 30%, rgba(244, 247, 250, 0.08) 0%, transparent 80%)',
    gridType: 'OPEN_HORIZON',
    visualElements: 'Expansive digital frontier, lifelong engineering mastery & scalable impact',
  },
}

export function Scene07TimelineLeadership() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [viewerCertId, setViewerCertId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  const activeEvent = timelineEvents[activeIndex] || timelineEvents[0]
  const currentEnv = ENVIRONMENTS[activeEvent.id] || ENVIRONMENTS['bca-foundation']

  const activeCertForViewer = certifications.find((c) => c.id === viewerCertId) || null

  return (
    <SectionTransition id="achievements" ariaLabel="Cinematic Journey Timeline" className="border-b border-white/5">
      <div className="page-container relative">
        {/* Dynamic Scene Environment Backdrop */}
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
            Academic grounding, self-directed systems &amp; security exploration, production engineering, and leadership.
          </p>
        </div>

        {/* ─── MILESTONE STEPPING TIMELINE (9 Milestones Grid) ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 mb-10">
          {timelineEvents.map((evt, idx) => {
            const isActive = idx === activeIndex
            const isPast = idx < activeIndex
            return (
              <button
                key={evt.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 relative group focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer ${
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
                <div className="font-display text-[0.625rem] sm:text-[0.6875rem] font-bold tracking-wider text-slate-200 uppercase truncate">
                  {evt.label}
                </div>
              </button>
            )
          })}
        </div>

        {/* ─── ACTIVE MILESTONE HERO VIEWPORT ─── */}
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
                    DISCIPLINE &bull; {currentEnv.gridType}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-xl sm:text-2xl font-bold"
                    style={{ color: activeEvent.color }}
                  >
                    {activeEvent.period}
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

          {/* Right Column: Visual Evidence, Certificate Document, or Content Channel Card */}
          <div className="lg:col-span-5 flex justify-center">
            <AnimatePresence mode="wait">
              {activeEvent.id === 'content-creator' ? (
                /* ─── CONTENT CREATOR: KING OF KALI LINUX CARD ─── */
                <motion.div
                  key="content-creator-card"
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-sm p-6 rounded-2xl border border-rose-500/30 bg-gradient-to-br from-rose-950/30 to-slate-950/80 backdrop-blur-md shadow-[0_15px_40px_rgba(244,63,94,0.15)] group"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-500/20">
                    <span className="font-mono text-[0.625rem] font-bold text-rose-400 uppercase tracking-widest">
                      EDUCATIONAL OUTREACH
                    </span>
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                        King of Kali Linux
                      </div>
                      <div className="font-mono text-xs text-rose-300/80">
                        @king_of_kali_linux_404
                      </div>
                    </div>
                  </div>

                  <p className="font-body text-xs text-slate-300 leading-relaxed mb-5">
                    Producing practical technical guides demystifying ethical hacking, Kali Linux workflows, and defensive security architectures.
                  </p>

                  <a
                    href="https://youtube.com/@king_of_kali_linux_404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-mono text-rose-300 flex items-center justify-between transition-all"
                  >
                    <span>VISIT YOUTUBE CHANNEL</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </motion.div>
              ) : activeEvent.certificateRef ? (
                /* ─── CERTIFICATE DOCUMENT INSPECTION CARD ─── */
                <motion.div
                  key={activeEvent.certificateRef}
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -15 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setViewerCertId(activeEvent.certificateRef || null)}
                  className="w-full max-w-sm p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 to-slate-950/80 backdrop-blur-md cursor-pointer hover:border-cyan-400/60 shadow-[0_15px_40px_rgba(6,182,212,0.15)] transition-all group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && setViewerCertId(activeEvent.certificateRef || null)
                  }
                  aria-label={`View verified certificate for ${activeEvent.label}`}
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20">
                    <span className="font-mono text-[0.625rem] font-bold text-cyan-400 uppercase tracking-widest">
                      DOCUMENT EVIDENCE &bull; VERIFIED
                    </span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  <div className="font-display text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {activeEvent.subtitle}
                  </div>
                  <div className="font-mono text-xs text-cyan-300/80 mb-3">
                    {activeEvent.period}
                  </div>
                  <p className="font-body text-xs text-slate-300 leading-relaxed mb-4">
                    {activeEvent.description}
                  </p>

                  <div className="p-3 rounded-lg border border-cyan-500/20 bg-black/40 flex items-center justify-between text-xs font-mono text-cyan-300">
                    <span>INSPECT VERIFIED DOCUMENT</span>
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
