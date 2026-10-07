import { useState } from 'react'
import {
  techDomains,
  pipelinesData,
  type TechDomain,
  type TechItem,
  type PipelineData,
} from '@/data/techStack'
import { TechnologyDetailModal } from '@/components/technology/TechnologyDetailModal'
import { PipelineDetailModal } from '@/components/technology/PipelineDetailModal'
import { CinematicDepthCard } from '@/components/technology/CinematicDepthCard'

export function Scene04TechnologyUniverse() {
  const [selectedDomain, setSelectedDomain] = useState<TechDomain | null>(null)
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineData | null>(null)
  const [clickedCardId, setClickedCardId] = useState<string | null>(null)

  const handleOpenDomain = (domain: TechDomain, initialTechItem?: TechItem) => {
    // Cinematic compression & pulse sequence before opening detail panel
    setClickedCardId(domain.id)
    setTimeout(() => {
      setClickedCardId(null)
      setSelectedDomain(domain)
      setSelectedTech(initialTechItem || null)
    }, 220)
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

        {/* ─── Pipeline Area (Compact Laboratory Flows) ─── */}
        <div className="pipeline-grid">
          {/* Flow 1: Intelligent Systems Pipeline — Interactive Module */}
          <button
            type="button"
            onClick={() => handleOpenPipeline('intelligent')}
            className="p-[16px_18px] rounded-[16px] glass-level-1 liquid-edge min-h-[72px] h-auto flex flex-col justify-center shadow-sm w-full box-border min-w-0 text-left transition-all duration-300 hover:border-[#8B7CFF]/50 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(139,124,255,0.18)] cursor-pointer group active:scale-[0.98]"
            aria-label="Open Intelligent Systems Pipeline details"
            aria-haspopup="dialog"
          >
            <div className="flex items-center justify-between mb-2">
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
            className="p-[16px_18px] rounded-[16px] glass-level-1 liquid-edge min-h-[72px] h-auto flex flex-col justify-center shadow-sm w-full box-border min-w-0 text-left transition-all duration-300 hover:border-[#00D9FF]/50 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,217,255,0.18)] cursor-pointer group active:scale-[0.98]"
            aria-label="Open Zero-Trust Defense Pipeline details"
            aria-haspopup="dialog"
          >
            <div className="flex items-center justify-between mb-2">
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

        {/* ─── Technology Grid: Style 09 Cinematic Depth Category Cards ─── */}
        <div className="tech-grid">
          {techDomains.map((domain: TechDomain) => (
            <CinematicDepthCard
              key={domain.id}
              domain={domain}
              onOpen={handleOpenDomain}
              isOpening={clickedCardId === domain.id}
            />
          ))}
        </div>
      </div>

      {/* ─── Liquid Glass Modals (Technologies appear ONLY here when opened) ─── */}
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
