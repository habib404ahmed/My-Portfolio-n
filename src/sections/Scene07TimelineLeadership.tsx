import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineEvents, type TimelineEvent } from '@/data/timeline'
import { certifications, type Certification } from '@/data/certifications'
import { CertificateViewer } from '@/components/ui/cert/CertificateViewer'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePortfolioContent } from '@/context/ContentContext'

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
  const { content } = usePortfolioContent()
  const certList = (Array.isArray(content?.certifications)
    ? (content.certifications as unknown as Certification[])
    : certifications
  ).filter((c) => c.visible !== false)

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [viewerCertId, setViewerCertId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  const activeEvent = timelineEvents[activeIndex] || timelineEvents[0]
  const currentEnv = ENVIRONMENTS[activeEvent.id] || ENVIRONMENTS['bca-foundation']

  const activeCertForViewer = certList.find((c) => c.id === viewerCertId) || null

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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-cyan-400 mb-3 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SCENE 07 &bull; CINEMATIC TRAJECTORY</span>
          </div>

          <h2 className="text-[clamp(32px,4vw,56px)] font-display font-extrabold text-[#F5F8FA] tracking-tight uppercase leading-[1.1] mb-3">
            THE JOURNEY
          </h2>

          <p className="font-body text-[clamp(16px,1.2vw,18px)] text-[#A8B4C2] leading-[1.65] max-w-[65ch] mx-auto">
            Academic grounding, self-directed systems &amp; security exploration, production engineering, and leadership.
          </p>
        </div>

        {/* ─── MILESTONE STEPPING TIMELINE — Glass Capsules (Phase 9 Section 20 & 24) ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 mb-10">
          {timelineEvents.map((evt, idx) => {
            const isActive = idx === activeIndex
            const isPast = idx < activeIndex
            return (
              <button
                key={evt.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-3 rounded-2xl text-left transition-all duration-300 relative group focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer ${
                  isActive
                    ? 'glass-focus liquid-edge border-white/50 shadow-xl scale-102 opacity-100 ring-1 ring-cyan-400/50'
                    : isPast
                    ? 'glass-card opacity-70 hover:opacity-100 hover:border-white/30'
                    : 'glass-level-1 opacity-45 hover:opacity-85 hover:border-white/20'
                }`}
                style={{
                  boxShadow: isActive ? `0 0 24px ${evt.color}35` : 'none',
                }}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="font-mono text-[13px] sm:text-[14px] font-bold"
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
                <div className="font-display text-[12px] sm:text-[13px] font-bold tracking-wide text-slate-200 uppercase truncate">
                  {evt.label}
                </div>
              </button>
            )
          })}
        </div>

        {/* ─── ACTIVE MILESTONE HERO VIEWPORT (Glass Focus Terminal) ─── */}
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
                className="p-8 sm:p-10 rounded-2xl glass-focus liquid-edge glass-reflection-sweep relative overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.5)]"
              >
                {/* Environment Indicator Pill */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: activeEvent.color }}
                  />
                  <span className="font-mono text-[12px] sm:text-[13px] tracking-widest uppercase text-slate-300 font-semibold">
                    DISCIPLINE &bull; {currentEnv.gridType}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-mono text-[18px] sm:text-[22px] font-bold"
                    style={{ color: activeEvent.color }}
                  >
                    {activeEvent.period}
                  </span>
                  <h3 className="font-display text-[clamp(22px,2.2vw,28px)] font-extrabold text-[#F5F8FA] tracking-tight uppercase leading-tight">
                    {activeEvent.label}
                  </h3>
                </div>

                <div className="font-mono text-[14px] sm:text-[15px] text-cyan-400 mb-4 font-semibold">
                  {activeEvent.subtitle}
                </div>

                <p className="font-body text-[16px] sm:text-[17px] text-[#A8B4C2] leading-[1.65] mb-6 font-normal">
                  {activeEvent.description}
                </p>

                {/* Connected Architecture Tags */}
                {activeEvent.connectedProjects && (
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                    <span className="font-mono text-[12px] sm:text-[13px] text-slate-400 uppercase tracking-wider font-semibold">
                      PROJECTS:
                    </span>
                    {activeEvent.connectedProjects.map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded bg-white/5 border border-white/10 font-mono text-[13px] sm:text-[14px] text-slate-200 font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                {/* Subtitle environment cue */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[13px] font-mono text-slate-400">
                  <span>{currentEnv.visualElements}</span>
                  <span className="text-slate-500 font-semibold">
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
                  className="w-full max-w-sm p-6 rounded-2xl glass-card liquid-edge shadow-[0_15px_40px_rgba(244,63,94,0.15)] group"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-500/20">
                    <span className="font-mono text-[12px] sm:text-[13px] font-bold text-rose-400 uppercase tracking-widest">
                      EDUCATIONAL OUTREACH
                    </span>
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-display text-[18px] sm:text-[20px] font-bold text-[#F5F8FA] group-hover:text-rose-300 transition-colors">
                        King of Kali Linux
                      </div>
                      <div className="font-mono text-[13px] sm:text-[14px] text-rose-300 font-medium">
                        @king_of_kali_linux_404
                      </div>
                    </div>
                  </div>

                  <p className="font-body text-[14px] sm:text-[15px] text-[#A8B4C2] leading-[1.6] mb-5">
                    Producing practical technical guides demystifying ethical hacking, Kali Linux workflows, and defensive security architectures.
                  </p>

                  <a
                    href="https://youtube.com/@king_of_kali_linux_404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-[14px] font-mono text-rose-300 font-semibold flex items-center justify-between transition-all"
                  >
                    <span>VISIT YOUTUBE CHANNEL</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </motion.div>
              ) : activeEvent.certificateRef ? (
                /* ─── CERTIFICATE DOCUMENT INSPECTION CARD (Glass Document Frame) ─── */
                <motion.div
                  key={activeEvent.certificateRef}
                  initial={{ opacity: 0, scale: 0.94, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -15 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setViewerCertId(activeEvent.certificateRef || null)}
                  className="w-full max-w-sm p-6 sm:p-7 rounded-2xl glass-card liquid-edge glass-reflection-sweep cursor-pointer border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_15px_40px_rgba(6,182,212,0.18)] transition-all group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && setViewerCertId(activeEvent.certificateRef || null)
                  }
                  aria-label={`View verified certificate for ${activeEvent.label}`}
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyan-500/20">
                    <span className="font-mono text-[12px] sm:text-[13px] font-bold text-cyan-400 uppercase tracking-widest">
                      DOCUMENT EVIDENCE &bull; VERIFIED
                    </span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  <div className="font-display text-[18px] sm:text-[20px] font-bold text-[#F5F8FA] mb-1 group-hover:text-cyan-300 transition-colors">
                    {activeEvent.subtitle}
                  </div>
                  <div className="font-mono text-[13px] sm:text-[14px] text-cyan-300 font-medium mb-3">
                    {activeEvent.period}
                  </div>
                  <p className="font-body text-[14px] sm:text-[15px] text-[#A8B4C2] leading-[1.6] mb-4">
                    {activeEvent.description}
                  </p>

                  <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-black/40 flex items-center justify-between text-[13px] sm:text-[14px] font-mono text-cyan-300 font-semibold">
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
                  className="w-full max-w-sm p-6 sm:p-7 rounded-2xl glass-card liquid-edge text-center"
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
                      className="font-mono text-[16px] font-bold"
                      style={{ color: activeEvent.color }}
                    >
                      {activeEvent.year}
                    </span>
                  </div>
                  <div className="font-display text-[15px] sm:text-[16px] font-bold text-[#F5F8FA] uppercase tracking-wider mb-1.5">
                    {activeEvent.label}
                  </div>
                  <div className="font-mono text-[13px] text-slate-400 mb-4 font-medium">
                    {currentEnv.gridType}
                  </div>
                  <p className="font-body text-[14px] text-[#A8B4C2] leading-[1.6] m-0">
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
          certificates={certList}
        />
      </div>
    </SectionTransition>
  )
}
