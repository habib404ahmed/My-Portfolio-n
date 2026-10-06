import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineEvents, type TimelineEvent } from '@/data/timeline'

interface CareerTimelineProps {
  onSelectCertificate?: (certRef: string) => void
}

export function CareerTimeline({ onSelectCertificate }: CareerTimelineProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>(timelineEvents[0].id)
  const currentEvent = timelineEvents.find((e) => e.id === selectedEventId) || timelineEvents[0]

  return (
    <div className="w-full mb-20">
      {/* Timeline Nav Stepper */}
      <div className="relative mb-10 pb-4">
        {/* Connecting track line */}
        <div
          className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-white/10 hidden md:block"
          aria-hidden="true"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 relative z-10">
          {timelineEvents.map((evt) => {
            const isSelected = evt.id === selectedEventId
            return (
              <button
                key={evt.id}
                onClick={() => setSelectedEventId(evt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 relative group ${
                  isSelected
                    ? 'border-white/40 bg-slate-900/90 shadow-xl scale-102'
                    : 'border-white/10 bg-slate-950/60 hover:border-white/20 hover:bg-white/[0.02]'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 25px ${evt.color}30` : 'none',
                }}
                aria-pressed={isSelected}
                aria-label={`Milestone: ${evt.year} - ${evt.label}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: evt.color }}
                  >
                    {evt.year}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      background: evt.isOpenNode ? 'transparent' : isSelected ? evt.color : 'rgba(255,255,255,0.2)',
                      border: evt.isOpenNode ? `1.5px dashed ${evt.color}` : 'none',
                    }}
                  />
                </div>
                <div
                  className={`font-display text-xs font-bold tracking-wide truncate ${
                    isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {evt.label}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Focused Milestone Display Dossier */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEvent.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 sm:p-10 backdrop-blur-md relative overflow-hidden shadow-2xl"
        >
          {/* Ambient Corner Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
            style={{
              background: currentEvent.color,
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left Narrative Col */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="font-mono text-xs font-bold px-2.5 py-0.5 rounded"
                  style={{
                    color: currentEvent.color,
                    background: `${currentEvent.color}18`,
                  }}
                >
                  {currentEvent.period}
                </span>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                  {currentEvent.type.toUpperCase()} MILESTONE
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-2">
                {currentEvent.label}
              </h3>
              <div className="text-base text-cyan-300 font-medium font-body mb-4">
                {currentEvent.subtitle}
              </div>

              <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed mb-6">
                {currentEvent.description}
              </p>

              {/* Connected Projects Pill (for 2026 Technical Growth) */}
              {currentEvent.connectedProjects && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="font-mono text-[0.625rem] text-slate-400 uppercase tracking-widest mb-2.5">
                    BUILT IN THIS ERA
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentEvent.connectedProjects.map((p) => (
                      <span
                        key={p}
                        className="px-3 py-1 rounded-md border border-white/10 bg-black/40 font-mono text-xs text-slate-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Meta / Action Col */}
            <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-black/40 h-full">
              <div>
                <div className="font-mono text-[0.625rem] text-slate-500 uppercase tracking-widest mb-2">
                  RECORD INTEGRITY
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Verified Milestones Only</span>
                </div>

                <p className="text-xs text-slate-400 font-body leading-relaxed">
                  {currentEvent.isOpenNode
                    ? 'The journey is continuous. Actively expanding capabilities in distributed backend systems, AI agents, and cyber defense.'
                    : 'Documented without exaggeration or fabricated credentials. Supported by formal institutional records.'}
                </p>
              </div>

              {currentEvent.certificateRef && onSelectCertificate && (
                <button
                  onClick={() => onSelectCertificate(currentEvent.certificateRef!)}
                  className="mt-6 w-full py-2.5 px-4 rounded-lg border border-cyan-500/30 bg-cyan-950/30 font-mono text-xs text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  <span>INSPECT VERIFIED DOCUMENT</span>
                  <span>&rarr;</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
