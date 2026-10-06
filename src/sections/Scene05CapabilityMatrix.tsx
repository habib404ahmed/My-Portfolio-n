import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { capabilities } from '@/data/capabilities'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'

export function Scene05CapabilityMatrix() {
  const [selectedCapId, setSelectedCapId] = useState(capabilities[0].id)
  const currentCapability = capabilities.find((c) => c.id === selectedCapId) || capabilities[0]

  return (
    <SectionTransition id="capabilities" ariaLabel="Capability Matrix" className="py-24 md:py-32 border-b border-white/5">
      <SceneContainer
        badge="SCENE 05 // SYSTEM CAPABILITIES"
        title="WHAT I CAN"
        titleHighlight="BUILD"
        subtitle="Transforming architectural concepts into living, resilient digital systems. Click a capability to trace its execution pipeline."
      >
        {/* Capability Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {capabilities.map((cap) => {
            const isSelected = cap.id === selectedCapId
            return (
              <button
                key={cap.id}
                onClick={() => setSelectedCapId(cap.id)}
                className={`p-3.5 rounded-lg border text-left transition-all duration-300 flex flex-col justify-between min-h-[96px] ${
                  isSelected
                    ? 'border-white/30 bg-slate-900/90 shadow-lg scale-102'
                    : 'border-white/5 bg-slate-950/40 hover:border-white/20 hover:bg-white/[0.02]'
                }`}
                style={{
                  boxShadow: isSelected ? `0 0 20px ${cap.color}25` : 'none',
                }}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className="font-mono text-[0.625rem] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      color: cap.color,
                      background: `${cap.color}15`,
                    }}
                  >
                    {cap.domain}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: isSelected ? cap.color : 'rgba(255,255,255,0.1)',
                    }}
                  />
                </div>
                <div className="font-display font-semibold text-xs text-slate-200 mt-2 leading-tight">
                  {cap.title}
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Capability Deep Pipeline View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCapability.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-white/10 bg-slate-950/80 p-6 md:p-10 relative overflow-hidden backdrop-blur-md"
          >
            {/* Ambient Background Aura */}
            <div
              className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: currentCapability.color,
                opacity: 0.08,
                filter: 'blur(70px)',
              }}
              aria-hidden="true"
            />

            {/* Header of selected capability */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <div>
                <span
                  className="font-mono text-xs uppercase tracking-wider block mb-1"
                  style={{ color: currentCapability.color }}
                >
                  SYSTEM PIPELINE // {currentCapability.domain}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {currentCapability.title}
                </h3>
              </div>
              <p className="text-sm text-slate-400 font-body max-w-md">
                {currentCapability.description}
              </p>
            </div>

            {/* Visual Step-by-Step Flow Pipeline */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                {currentCapability.flow.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col">
                    <div
                      className="p-4 rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm flex flex-col justify-between min-h-[110px] hover:border-white/30 transition-all group"
                      style={{
                        boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-slate-500 group-hover:text-slate-300">
                          {step.step}
                        </span>
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: currentCapability.color }}
                        />
                      </div>
                      <div className="font-mono text-xs font-semibold text-slate-200 mt-3 group-hover:text-white transition-colors">
                        {step.label}
                      </div>
                    </div>

                    {/* Arrow between steps (desktop) */}
                    {idx < currentCapability.flow.length - 1 && (
                      <div
                        className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600 font-mono text-xs pointer-events-none"
                        aria-hidden="true"
                      >
                        &rarr;
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </SceneContainer>
    </SectionTransition>
  )
}
