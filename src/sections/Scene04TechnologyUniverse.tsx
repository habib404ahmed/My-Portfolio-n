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

        {/* ─── Pipeline Area (Inside .page-container, 2 equal cols desktop, 1 col mobile/tablet) ─── */}
        <div className="pipeline-grid">
          {/* Flow 1: Intelligent Systems Pipeline */}
          <div className="p-[14px_16px] rounded-[14px] border border-white/10 bg-slate-950/60 backdrop-blur-sm min-h-[64px] h-auto flex flex-col justify-center shadow-sm w-full box-border min-w-0">
            <div className="font-mono text-[10px] sm:text-[11px] text-violet-400 mb-[7px] font-semibold tracking-[0.08em] uppercase">
              INTELLIGENT SYSTEMS PIPELINE
            </div>
            <div className="flex items-center flex-wrap gap-1.5 font-mono text-[13px] text-slate-200 leading-[1.3]">
              <span className="px-2 py-0.5 rounded bg-violet-500/15 border border-violet-500/25 text-violet-300 font-medium">
                AI / ML
              </span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 font-medium">
                Backend
              </span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/25 text-amber-300 font-medium">
                Database
              </span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-500/25 text-sky-300 font-medium">
                Cloud
              </span>
            </div>
          </div>

          {/* Flow 2: Zero-Trust Defense Pipeline */}
          <div className="p-[14px_16px] rounded-[14px] border border-white/10 bg-slate-950/60 backdrop-blur-sm min-h-[64px] h-auto flex flex-col justify-center shadow-sm w-full box-border min-w-0">
            <div className="font-mono text-[10px] sm:text-[11px] text-emerald-400 mb-[7px] font-semibold tracking-[0.08em] uppercase">
              ZERO-TRUST DEFENSE PIPELINE
            </div>
            <div className="flex items-center flex-wrap gap-1.5 font-mono text-[13px] text-slate-200 leading-[1.3]">
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 font-medium">
                Cybersecurity
              </span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/25 text-cyan-300 font-medium">
                Network
              </span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 font-medium">
                Backend
              </span>
              <span className="text-slate-600">&rarr;</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/15 border border-sky-500/25 text-sky-300 font-medium">
                Infrastructure
              </span>
            </div>
          </div>
        </div>

        {/* Selected Tech Detail Drawer */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 p-3.5 px-4 rounded-xl border border-cyan-500/30 bg-cyan-950/30 backdrop-blur-sm flex items-center justify-between shadow-lg"
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

        {/* ─── Technology Grid: Row 1 (3), Row 2 (3), Row 3 (1 in Column 1) ─── */}
        <div className="tech-grid">
          {techDomains.map((domain: TechDomain) => (
            <div
              key={domain.id}
              className="w-full min-w-0 box-border p-[14px_16px] rounded-[14px] border border-white/10 bg-slate-950/60 backdrop-blur-sm flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] h-auto min-h-0"
            >
              <div>
                {/* Card Header (14-15px font-weight 700, code 10px opacity 0.55) */}
                <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-white/5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: domain.color }}
                    />
                    <h3 className="font-mono text-[14px] sm:text-[15px] font-bold tracking-[0.04em] text-slate-100 m-0 truncate">
                      {domain.label}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400/55 uppercase font-medium flex-shrink-0 ml-2">
                    {domain.shortLabel}
                  </span>
                </div>

                {/* Card Description (12-13px, line-height 1.4, mt 6px, mb 6px, muted gray) */}
                <p className="font-body text-[12px] sm:text-[13px] text-slate-400/80 leading-[1.4] mt-[6px] mb-[6px] m-0">
                  {domain.description}
                </p>

                {/* Technology Rows (height 24-26px, flex space-between, border-bottom, 13-14px font) */}
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
                        className={`w-full text-left px-2.5 h-[26px] rounded transition-all duration-150 flex items-center justify-between group border-b border-white/5 cursor-pointer min-w-0 overflow-hidden ${
                          isSelected
                            ? 'bg-cyan-950/40 text-cyan-200'
                            : 'hover:bg-white/[0.04] text-slate-300 hover:text-white'
                        }`}
                        aria-label={`View info for ${item.name}`}
                      >
                        <span className="font-mono text-[13px] sm:text-[14px] font-medium truncate whitespace-nowrap">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-2">
                          info &rarr;
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Card Footer: margin-top: auto inside flex-column */}
              <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-slate-400">
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
