import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { techDomains, type TechDomain, type TechItem } from '@/data/techStack'

export function Scene04TechnologyUniverse() {
  const [activeItem, setActiveItem] = useState<{ domainId: string; item: TechItem } | null>(null)

  return (
    <section id="universe" aria-label="Connected Stack">
      <div className="page-container">
        {/* ─── Section Header ─── */}
        <header className="scene-header">
          {/* Scene Label (11-12px, letter-spacing 0.12em, mb 14px) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-[14px] rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono text-[11px] sm:text-xs tracking-[0.12em] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SCENE 04 // CONNECTED STACK</span>
          </div>

          {/* Heading: ENGINEERED ECOSYSTEM (clamp(42px, 5vw, 58px), line-height 1, margin: 12px 0 0) */}
          <h2 className="m-0 text-[clamp(42px,5vw,58px)] font-display font-extrabold text-white tracking-tight leading-none uppercase mt-3">
            ENGINEERED{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              ECOSYSTEM
            </span>
          </h2>

          {/* Description (max-width 820px, font-size 17px, line-height 1.6, margin-top 16px) */}
          <p className="mt-4 max-w-[820px] text-[17px] text-slate-300 font-body leading-[1.6]">
            Organized into cohesive architectural layers. Every language, runtime, database, and protocol is chosen for reliability, high throughput, and strict security.
          </p>
        </header>

        {/* ─── Pipeline Area (Phase 9 Glass Laboratory Flows) ─── */}
        <div className="pipeline-grid">
          {/* Flow 1: Intelligent Systems Pipeline */}
          <div className="p-[14px_16px] rounded-[16px] glass-level-1 liquid-edge min-h-[64px] h-auto flex flex-col justify-center shadow-sm w-full box-border min-w-0">
            <div className="font-mono text-[10px] sm:text-[11px] text-[#8B7CFF] mb-[7px] font-semibold tracking-[0.08em] uppercase">
              INTELLIGENT SYSTEMS PIPELINE
            </div>
            <div className="flex items-center flex-wrap gap-1.5 font-mono text-[13px] text-[#F4F7FA] leading-[1.3]">
              <span className="glass-chip text-[#8B7CFF] font-medium">
                AI / ML
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#6575FF] font-medium">
                Backend API
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#00D9FF] font-medium">
                Vector DB
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#6575FF] font-medium">
                Cloud
              </span>
            </div>
          </div>

          {/* Flow 2: Zero-Trust Defense Pipeline */}
          <div className="p-[14px_16px] rounded-[16px] glass-level-1 liquid-edge min-h-[64px] h-auto flex flex-col justify-center shadow-sm w-full box-border min-w-0">
            <div className="font-mono text-[10px] sm:text-[11px] text-[#00D9FF] mb-[7px] font-semibold tracking-[0.08em] uppercase">
              ZERO-TRUST DEFENSE PIPELINE
            </div>
            <div className="flex items-center flex-wrap gap-1.5 font-mono text-[13px] text-[#F4F7FA] leading-[1.3]">
              <span className="glass-chip text-[#00D9FF] font-medium">
                Cybersecurity
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#6575FF] font-medium">
                Packet Inspector
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#00D9FF] font-medium">
                Auth Guard
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#6575FF] font-medium">
                Encrypted Edge
              </span>
            </div>
          </div>
        </div>

        {/* Selected Tech Detail Drawer — Focus Glass */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 p-3.5 px-4 rounded-xl glass-focus liquid-edge flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                <span className="font-display font-semibold text-white text-sm">
                  {activeItem.item.name}
                </span>
                <span className="text-slate-300 font-body text-xs hidden sm:inline">
                  &mdash; {activeItem.item.description}
                </span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 cursor-pointer"
                aria-label="Dismiss technology details"
              >
                CLOSE [x]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Technology Grid: Floating Glass Clusters (Phase 9 Section 17 & 18) ─── */}
        <div className="tech-grid">
          {techDomains.map((domain: TechDomain) => (
            <div
              key={domain.id}
              className="w-full min-w-0 box-border p-[14px_16px] rounded-2xl glass-card liquid-edge flex flex-col justify-between hover:border-[rgba(0,217,255,0.4)] transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] h-auto min-h-0"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: domain.color }}
                    />
                    <h3 className="font-mono text-[14px] sm:text-[15px] font-bold tracking-[0.04em] text-[#F4F7FA] m-0 truncate">
                      {domain.label}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#687687] uppercase font-medium flex-shrink-0 ml-2">
                    {domain.shortLabel}
                  </span>
                </div>

                {/* Card Description */}
                <p className="font-body text-[12px] sm:text-[13px] text-[#A8B4C2] leading-[1.4] mt-[6px] mb-[6px] m-0">
                  {domain.description}
                </p>

                {/* Technology Rows — Interactive Glass Chips */}
                <div className="space-y-1 mt-1">
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
                        className={`w-full text-left px-2.5 h-[28px] rounded-lg transition-all duration-200 flex items-center justify-between group cursor-pointer min-w-0 overflow-hidden ${
                          isSelected
                            ? 'glass-focus text-[#38E8FF]'
                            : 'hover:bg-white/[0.05] hover:-translate-y-0.5 text-[#A8B4C2] hover:text-[#F4F7FA]'
                        }`}
                        aria-label={`View info for ${item.name}`}
                      >
                        <span className="font-mono text-[13px] sm:text-[14px] font-medium truncate whitespace-nowrap">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#687687] group-hover:text-[#00D9FF] transition-colors flex-shrink-0 ml-2">
                          info &rarr;
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-auto pt-2 border-t border-[rgba(140,190,210,0.12)] flex items-center justify-between font-mono text-[11px] text-[#687687]">
                <span>{domain.tech.length} Technologies</span>
                <span className="font-semibold" style={{ color: domain.color }}>
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
