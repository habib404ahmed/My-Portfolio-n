import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  techDomains,
  pipelinesData,
  type TechDomain,
  type TechItem,
  type PipelineData,
} from '@/data/techStack'
import { TechnologyDetailModal } from '@/components/technology/TechnologyDetailModal'
import { PipelineDetailModal } from '@/components/technology/PipelineDetailModal'

export function Scene04TechnologyUniverse() {
  const [selectedDomain, setSelectedDomain] = useState<TechDomain | null>(null)
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineData | null>(null)
  const [clickedCardId, setClickedCardId] = useState<string | null>(null)

  const handleOpenDomain = (domain: TechDomain, initialTechItem?: TechItem) => {
    // Subtle card compression & pulse feedback before opening
    setClickedCardId(domain.id)
    setTimeout(() => {
      setClickedCardId(null)
      setSelectedDomain(domain)
      setSelectedTech(initialTechItem || null)
    }, 120)
  }

  const handleOpenPipeline = (pipelineId: 'intelligent' | 'zero-trust') => {
    const pipe = pipelinesData.find((p) => p.id === pipelineId) || null
    setSelectedPipeline(pipe)
  }

  return (
    <section id="universe" aria-label="Connected Stack">
      <div className="page-container">
        {/* ─── Section Header ─── */}
        <header className="scene-header">
          {/* Scene Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-[14px] rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono text-[11px] sm:text-xs tracking-[0.12em] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SCENE 04 // CONNECTED STACK</span>
          </div>

          {/* Heading: ENGINEERED ECOSYSTEM */}
          <h2 className="m-0 text-[clamp(42px,5vw,58px)] font-display font-extrabold text-white tracking-tight leading-none uppercase mt-3">
            ENGINEERED{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
              ECOSYSTEM
            </span>
          </h2>

          {/* Description */}
          <p className="mt-4 max-w-[820px] text-[17px] text-slate-300 font-body leading-[1.6]">
            Organized into cohesive architectural layers. Every language, runtime, database, and protocol is chosen for reliability, high throughput, and strict security.
          </p>
        </header>

        {/* ─── Pipeline Area (Interactive Liquid Glass Laboratory Flows) ─── */}
        <div className="pipeline-grid">
          {/* Flow 1: Intelligent Systems Pipeline — Interactive Module */}
          <button
            type="button"
            onClick={() => handleOpenPipeline('intelligent')}
            className="p-[14px_16px] rounded-[16px] glass-level-1 liquid-edge min-h-[64px] h-auto flex flex-col justify-center shadow-sm w-full box-border min-w-0 text-left transition-all duration-300 hover:border-[#8B7CFF]/50 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(139,124,255,0.18)] cursor-pointer group active:scale-[0.98]"
            aria-label="Open Intelligent Systems Pipeline details"
            aria-haspopup="dialog"
          >
            <div className="flex items-center justify-between mb-[7px]">
              <span className="font-mono text-[10px] sm:text-[11px] text-[#8B7CFF] font-semibold tracking-[0.08em] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] animate-pulse" />
                INTELLIGENT SYSTEMS PIPELINE
              </span>
              <span className="font-mono text-[10px] text-slate-400 group-hover:text-[#8B7CFF] transition-colors flex items-center gap-1">
                <span>INSPECT FLOW</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-1.5 font-mono text-[13px] text-[#F4F7FA] leading-[1.3]">
              <span className="glass-chip text-[#8B7CFF] font-medium group-hover:border-[#8B7CFF]/40 transition-colors">
                AI / ML
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#6575FF] font-medium group-hover:border-[#6575FF]/40 transition-colors">
                Backend API
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#00D9FF] font-medium group-hover:border-[#00D9FF]/40 transition-colors">
                Vector DB
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#6575FF] font-medium group-hover:border-[#6575FF]/40 transition-colors">
                Cloud
              </span>
            </div>
          </button>

          {/* Flow 2: Zero-Trust Defense Pipeline — Interactive Module */}
          <button
            type="button"
            onClick={() => handleOpenPipeline('zero-trust')}
            className="p-[14px_16px] rounded-[16px] glass-level-1 liquid-edge min-h-[64px] h-auto flex flex-col justify-center shadow-sm w-full box-border min-w-0 text-left transition-all duration-300 hover:border-[#00D9FF]/50 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,217,255,0.18)] cursor-pointer group active:scale-[0.98]"
            aria-label="Open Zero-Trust Defense Pipeline details"
            aria-haspopup="dialog"
          >
            <div className="flex items-center justify-between mb-[7px]">
              <span className="font-mono text-[10px] sm:text-[11px] text-[#00D9FF] font-semibold tracking-[0.08em] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                ZERO-TRUST DEFENSE PIPELINE
              </span>
              <span className="font-mono text-[10px] text-slate-400 group-hover:text-[#00D9FF] transition-colors flex items-center gap-1">
                <span>INSPECT FLOW</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </span>
            </div>
            <div className="flex items-center flex-wrap gap-1.5 font-mono text-[13px] text-[#F4F7FA] leading-[1.3]">
              <span className="glass-chip text-[#00D9FF] font-medium group-hover:border-[#00D9FF]/40 transition-colors">
                Cybersecurity
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#6575FF] font-medium group-hover:border-[#6575FF]/40 transition-colors">
                Packet Inspector
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#00D9FF] font-medium group-hover:border-[#00D9FF]/40 transition-colors">
                Auth Guard
              </span>
              <span className="text-[#687687]">&rarr;</span>
              <span className="glass-chip text-[#6575FF] font-medium group-hover:border-[#6575FF]/40 transition-colors">
                Encrypted Edge
              </span>
            </div>
          </button>
        </div>

        {/* ─── Technology Grid: Interactive Liquid Glass Modules (9 Categories) ─── */}
        <div className="tech-grid">
          {techDomains.map((domain: TechDomain) => {
            const isClicking = clickedCardId === domain.id

            return (
              <motion.button
                key={domain.id}
                type="button"
                onClick={() => handleOpenDomain(domain)}
                className={`w-full min-w-0 box-border p-[16px_18px] rounded-2xl glass-card liquid-edge flex flex-col justify-between text-left transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] h-auto min-h-[220px] cursor-pointer group relative overflow-hidden select-none ${
                  isClicking ? 'scale-[0.98] ring-2 ring-cyan-400/60' : 'hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)]'
                }`}
                style={{
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = domain.color
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.45), 0 0 25px ${domain.glowColor}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.boxShadow = ''
                }}
                aria-label={`Open ${domain.label} technology module containing ${domain.tech.length} verified technologies`}
                aria-haspopup="dialog"
                aria-expanded={selectedDomain?.id === domain.id}
              >
                {/* Subtle top-edge cyan pulse on hover */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${domain.color} 50%, transparent 100%)`,
                  }}
                  aria-hidden="true"
                />

                <div className="w-full">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 group-hover:animate-ping"
                        style={{ background: domain.color }}
                      />
                      <h3 className="font-mono text-[14px] sm:text-[15px] font-extrabold tracking-[0.06em] text-[#F4F7FA] group-hover:text-cyan-300 transition-colors m-0 truncate">
                        {domain.label}
                      </h3>
                    </div>
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/10 uppercase font-semibold flex-shrink-0 ml-2 text-slate-300 group-hover:border-cyan-500/40"
                      style={{ color: domain.color }}
                    >
                      {domain.shortLabel}
                    </span>
                  </div>

                  {/* Card Description */}
                  <p className="font-body text-[12px] sm:text-[13px] text-[#A8B4C2] leading-[1.45] mt-1 mb-3 m-0 line-clamp-2">
                    {domain.description}
                  </p>

                  {/* Technology Rows — Interactive Sub-Nodes */}
                  <div className="space-y-1.5 my-2">
                    {domain.tech.map((item: TechItem) => (
                      <div
                        key={item.name}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenDomain(domain, item)
                        }}
                        className="w-full text-left px-3 h-[30px] rounded-lg bg-white/[0.035] border border-white/[0.08] hover:bg-white/[0.08] hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between text-[#A8B4C2] hover:text-[#F4F7FA] cursor-pointer"
                        title={`Click to inspect ${item.name} details & project connections`}
                      >
                        <span className="font-mono text-[12px] sm:text-[13px] font-medium truncate whitespace-nowrap">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#687687] hover:text-cyan-400 transition-colors flex-shrink-0 ml-2">
                          &rarr;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Clear Call to Action */}
                <div className="mt-auto pt-3 border-t border-[rgba(140,190,210,0.12)] flex items-center justify-between font-mono text-[11px] text-[#687687] w-full">
                  <span className="flex items-center gap-1.5">
                    <span>{domain.tech.length} Technologies</span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="font-semibold" style={{ color: domain.color }}>
                      VERIFIED
                    </span>
                  </span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span className="hidden sm:inline text-[10px] tracking-wider uppercase">EXPLORE</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* ─── Liquid Glass Modals ─── */}
      <TechnologyDetailModal
        domain={selectedDomain}
        initialTech={selectedTech}
        onClose={() => {
          setSelectedDomain(null)
          setSelectedTech(null)
        }}
      />

      <PipelineDetailModal
        pipeline={selectedPipeline}
        onClose={() => setSelectedPipeline(null)}
      />
    </section>
  )
}
