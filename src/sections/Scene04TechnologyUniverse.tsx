import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { techDomains, type TechDomain, type TechItem } from '@/data/techStack'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'

export function Scene04TechnologyUniverse() {
  const [activeItem, setActiveItem] = useState<{ domainId: string; item: TechItem } | null>(null)

  return (
    <SectionTransition id="universe" ariaLabel="Connected Stack" className="py-24 md:py-32 border-b border-white/5">
      <SceneContainer
        badge="SCENE 04 // CONNECTED STACK"
        title="ENGINEERED"
        titleHighlight="ECOSYSTEM"
        subtitle="Organized into cohesive architectural layers. Every language, runtime, database, and protocol is chosen for reliability, high throughput, and strict security."
      >
        {/* Subtle Architectural Relationships (Section 13) */}
        <div className="mb-12 p-6 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
              ARCHITECTURAL PIPELINES
            </span>
            <span className="font-mono text-[0.625rem] text-slate-500 uppercase tracking-widest hidden sm:inline">
              END-TO-END FLOW RELATIONSHIPS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Flow 1: AI / Data Flow */}
            <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02]">
              <div className="font-mono text-[0.6875rem] text-violet-400 mb-2 font-medium">
                INTELLIGENT SYSTEMS PIPELINE
              </div>
              <div className="flex items-center flex-wrap gap-1.5 font-mono text-xs text-slate-300">
                <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300">
                  AI / ML
                </span>
                <span className="text-slate-600">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  Backend
                </span>
                <span className="text-slate-600">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  Database
                </span>
                <span className="text-slate-600">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300">
                  Cloud
                </span>
              </div>
            </div>

            {/* Flow 2: Cybersecurity Flow */}
            <div className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02]">
              <div className="font-mono text-[0.6875rem] text-emerald-400 mb-2 font-medium">
                ZERO-TRUST DEFENSE PIPELINE
              </div>
              <div className="flex items-center flex-wrap gap-1.5 font-mono text-xs text-slate-300">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  Cybersecurity
                </span>
                <span className="text-slate-600">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                  Network
                </span>
                <span className="text-slate-600">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  Backend
                </span>
                <span className="text-slate-600">&rarr;</span>
                <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300">
                  Infrastructure
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Tech Detail Drawer */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mb-8 p-4 rounded-lg border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-display font-semibold text-white text-sm">
                  {activeItem.item.name}
                </span>
                <span className="text-slate-400 font-body text-xs hidden sm:inline">
                  &mdash; {activeItem.item.description}
                </span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1"
                aria-label="Dismiss technology details"
              >
                CLOSE [x]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grouped Technologies Grid (7 Distinct Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {techDomains.map((domain: TechDomain) => (
            <div
              key={domain.id}
              className="p-5 rounded-xl border border-white/10 bg-slate-950/60 backdrop-blur-sm flex flex-col justify-between hover:border-white/20 transition-colors duration-300"
            >
              <div>
                {/* Domain Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: domain.color }}
                    />
                    <h3 className="font-mono text-xs font-bold tracking-wider text-slate-200">
                      {domain.label}
                    </h3>
                  </div>
                  <span className="font-mono text-[0.625rem] text-slate-500 uppercase">
                    {domain.shortLabel}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="font-body text-xs text-slate-400 mb-4">
                  {domain.description}
                </p>

                {/* Structured Tech Items with Visual Hierarchy */}
                <div className="space-y-1.5">
                  {domain.tech.map((item: TechItem) => {
                    const isSelected = activeItem?.item.name === item.name
                    return (
                      <button
                        key={item.name}
                        onClick={() =>
                          setActiveItem(
                            isSelected ? null : { domainId: domain.id, item }
                          )
                        }
                        className={`w-full text-left px-3 py-2 rounded border transition-all duration-200 flex items-center justify-between group ${
                          isSelected
                            ? 'border-cyan-400/40 bg-cyan-950/30'
                            : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                        }`}
                        aria-label={`View info for ${item.name}`}
                      >
                        <span className="font-mono text-xs text-slate-300 group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[0.625rem] font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                          info &rarr;
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[0.625rem] text-slate-500">
                <span>{domain.tech.length} Technologies</span>
                <span style={{ color: domain.color }}>VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </SceneContainer>
    </SectionTransition>
  )
}
