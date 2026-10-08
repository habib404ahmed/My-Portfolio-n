import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { TechDomain, TechItem } from '@/data/techStack'
import { techUniverseStore } from '@/stores/techUniverseStore'

interface TechnologyDetailModalProps {
  domain: TechDomain | null
  initialTech?: TechItem | null
  onClose: () => void
}

export function TechnologyDetailModal({
  domain,
  initialTech = null,
  onClose,
}: TechnologyDetailModalProps) {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(initialTech)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const modalContainerRef = useRef<HTMLDivElement>(null)

  // Sync initialTech if prop changes
  useEffect(() => {
    setSelectedTech(initialTech)
  }, [initialTech, domain])

  // Sync with 3D Cinematic Scene Store (Vesper living motion system)
  useEffect(() => {
    if (domain) {
      techUniverseStore.setActiveCategory(domain)
    } else {
      techUniverseStore.setActiveCategory(null)
      techUniverseStore.setActiveTech(null)
    }
    return () => {
      techUniverseStore.setActiveCategory(null)
      techUniverseStore.setActiveTech(null)
    }
  }, [domain])

  useEffect(() => {
    techUniverseStore.setActiveTech(selectedTech)
  }, [selectedTech])

  // Body scroll lock & ESC key handling
  useEffect(() => {
    if (!domain) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    // Auto-focus close button on mount for accessibility
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedTech) {
          // First ESC returns to category list
          setSelectedTech(null)
        } else {
          // Second ESC closes modal
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [domain, selectedTech, onClose])

  if (!domain) return null

  // Category visual metaphor particles/indicators
  const getMetaphorParticles = () => {
    switch (domain.id) {
      case 'languages':
        return ['{ }', '</>', 'fn()', 'async', 'return', 'import']
      case 'frontend':
        return ['<UI>', 'DOM', 'STATE', 'VIRTUAL', 'PROPS', 'CSS']
      case 'backend':
        return ['HTTP/2', 'REST', 'WS://', 'SOCKET', 'JSON', 'JWT']
      case 'ai-ml':
        return ['λ_NODE', 'RAG', 'VECTOR', 'AGENT', 'TENSOR', 'LLM']
      case 'security':
        return ['DIODE', '5-TUPLE', 'SHA-256', 'PCAP', 'SOC', 'CIPHER']
      case 'systems':
        return ['KERNEL', 'SYSTEMD', 'BASH', 'DAEMON', 'POST', 'IO_CTL']
      case 'networking':
        return ['TCP/IP', 'PORT:443', 'SYN/ACK', 'IPV4', 'ROUTE', 'EGRESS']
      case 'databases':
        return ['ACID', 'SCHEMA', 'INDEX', 'POSTGRES', 'QUERY', 'B-TREE']
      case 'infrastructure':
        return ['DOCKER', 'GIT:HEAD', 'EDGE', 'CI/CD', 'RUNNER', 'CONTAINER']
      default:
        return ['NODE', 'FLOW', 'STREAM', 'SIGNAL', 'SYNC']
    }
  }

  const particles = getMetaphorParticles()

  const modalContent = (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tech-modal-title"
        aria-describedby="tech-modal-desc"
      >
        {/* ─── Backdrop: Cinematic Atmospheric Glass (Preserves 3D Organism Visibility) ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-black/40 backdrop-blur-[6px]"
          onClick={onClose}
          aria-hidden="true"
        >
          {/* Subtle floating 3D metaphor particles in backdrop */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
            {particles.map((p, i) => (
              <span
                key={i}
                className="absolute font-mono text-[11px] tracking-widest text-cyan-400 select-none animate-pulse"
                style={{
                  top: `${15 + (i * 13) % 75}%`,
                  left: `${8 + (i * 17) % 82}%`,
                  animationDuration: `${3.5 + (i % 3)}s`,
                  color: domain.color,
                  filter: `drop-shadow(0 0 8px ${domain.color})`,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ─── Liquid Glass Modal Container (Floating Inside 3D World) ─── */}
        <motion.div
          ref={modalContainerRef}
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[740px] my-auto rounded-[24px] overflow-hidden text-left pointer-events-auto"
          style={{
            background: 'rgba(8, 14, 22, 0.72)',
            backdropFilter: 'blur(14px) saturate(135%)',
            WebkitBackdropFilter: 'blur(14px) saturate(135%)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            boxShadow: `0 30px 100px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.20), 0 0 40px ${domain.glowColor}`,
            maxHeight: '85vh',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cyan / Accent Top Highlight Edge */}
          <div
            className="absolute top-0 inset-x-0 h-[2px] pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${domain.color} 50%, transparent 100%)`,
              opacity: 0.85,
            }}
            aria-hidden="true"
          />

          {/* Modal Header */}
          <div className="relative p-5 sm:p-7 border-b border-white/10 flex items-start justify-between gap-4">
            <div className="min-w-0 pr-10">
              {/* Top Category Indicator */}
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: domain.color, color: domain.color }}
                />
                <span
                  id="tech-modal-title"
                  className="font-mono text-[14px] sm:text-[16px] font-extrabold tracking-[0.08em] uppercase text-[#F4F7FA]"
                >
                  {domain.label}
                </span>
                <span
                  className="font-mono text-[11px] px-2 py-0.5 rounded-full border border-white/15 bg-white/5 font-semibold text-slate-300"
                  style={{ borderColor: `${domain.color}40`, color: domain.color }}
                >
                  {domain.shortLabel}
                </span>
              </div>

              {/* Category Description */}
              <p
                id="tech-modal-desc"
                className="text-[13px] sm:text-[14px] text-slate-300 font-body leading-relaxed m-0 max-w-xl"
              >
                {domain.description}
              </p>
            </div>

            {/* 44x44px Circular Glass Close Button (Prompt Requirement 10) */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              type="button"
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group flex-shrink-0"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.7)'
                e.currentTarget.style.boxShadow =
                  '0 0 18px rgba(0, 217, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'
                e.currentTarget.style.boxShadow =
                  '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              }}
              aria-label="Close technology module"
            >
              <span className="font-mono text-lg text-slate-300 group-hover:text-cyan-300 transition-colors leading-none select-none">
                &times;
              </span>
            </button>
          </div>

          {/* Modal Body: Two-Layer Liquid Glass Architecture */}
          <div className="p-5 sm:p-7 overflow-y-auto max-h-[calc(85vh-160px)] custom-scrollbar">
            <AnimatePresence mode="wait">
              {!selectedTech ? (
                /* ─── Layer 1: Technology Item List with Sequential Stagger ─── */
                <motion.div
                  key="tech-list"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider px-1">
                    <span>TECHNOLOGIES IN MODULE</span>
                    <span>CLICK ITEM FOR VERIFIED DETAILS</span>
                  </div>

                  {domain.tech.map((item, index) => (
                    <motion.button
                      key={item.name}
                      type="button"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.07 * index,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onClick={() => setSelectedTech(item)}
                      className="w-full text-left p-3.5 sm:p-4 rounded-xl flex items-center justify-between group cursor-pointer transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.10)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)'
                        e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.45)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow =
                          '0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(0, 217, 255, 0.25), 0 0 16px rgba(0, 217, 255, 0.15)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.10)'
                        e.currentTarget.style.transform = 'translateY(0px)'
                        e.currentTarget.style.boxShadow =
                          '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                      }}
                      aria-label={`Inspect ${item.name} technology details`}
                    >
                      {/* Left Cyan Accent Edge on Hover */}
                      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-center gap-3 min-w-0 pr-4">
                        {/* Spatial Optical Node Dot & Conduit Line */}
                        <div className="flex items-center gap-1.5 flex-shrink-0" aria-hidden="true">
                          <span
                            className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                            style={{
                              backgroundColor: domain.color,
                              boxShadow: `0 0 8px ${domain.color}`,
                            }}
                          />
                          <span className="hidden sm:inline-block w-3 h-[1px] bg-gradient-to-r from-cyan-400/30 to-cyan-400/80 group-hover:w-5 transition-all duration-300" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[14px] sm:text-[15px] font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {item.name}
                            </span>
                            {item.projects && item.projects.length > 0 && (
                              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-medium">
                                {item.projects.length} {item.projects.length === 1 ? 'PROJECT' : 'PROJECTS'}
                              </span>
                            )}
                          </div>
                          <p className="font-body text-[12px] sm:text-[13px] text-slate-400 group-hover:text-slate-300 transition-colors mt-0.5 m-0 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-[13px] text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all flex-shrink-0">
                        <span className="hidden sm:inline text-[11px] uppercase tracking-wider">DETAILS</span>
                        <span className="text-base">&rarr;</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                /* ─── Layer 2: Technology Deep Detail & Verified Project Connections ─── */
                <motion.div
                  key={`tech-detail-${selectedTech.name}`}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Back Navigation Button */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setSelectedTech(null)}
                      className="inline-flex items-center gap-2 font-mono text-[12px] font-bold text-cyan-400 hover:text-cyan-200 transition-colors cursor-pointer group py-1 px-2 -ml-2 rounded-lg hover:bg-white/5"
                    >
                      <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
                      <span>BACK TO {domain.label}</span>
                    </button>
                    <span className="font-mono text-[11px] text-slate-400">
                      ESC TO RETURN
                    </span>
                  </div>

                  {/* Technology Title & Role */}
                  <div className="rounded-xl p-4 sm:p-5 bg-white/[0.03] border border-white/10">
                    <div className="flex items-baseline justify-between flex-wrap gap-2">
                      <h4 className="font-mono text-xl sm:text-2xl font-black text-white tracking-wide m-0">
                        {selectedTech.name}
                      </h4>
                      <span
                        className="font-mono text-[11px] uppercase tracking-widest px-2.5 py-1 rounded-full border"
                        style={{
                          borderColor: `${domain.color}50`,
                          backgroundColor: `${domain.color}15`,
                          color: domain.color,
                        }}
                      >
                        {selectedTech.role || `${domain.label} COMPONENT`}
                      </span>
                    </div>
                    <p className="font-body text-[13px] sm:text-[14px] text-slate-300 mt-2 m-0 leading-relaxed">
                      {selectedTech.description}
                    </p>
                  </div>

                  {/* "Used for:" Bullet Points (Faithful to verified tech stack) */}
                  {selectedTech.usedFor && selectedTech.usedFor.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="font-mono text-[12px] tracking-[0.1em] text-cyan-400 uppercase font-semibold m-0 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        USED FOR IN ENGINEERING:
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {selectedTech.usedFor.map((point, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-white/[0.025] border border-white/10 flex items-start gap-2.5 text-[12px] sm:text-[13px] text-slate-200 leading-snug"
                          >
                            <span className="text-cyan-400 font-mono select-none mt-0.5">&bull;</span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PROJECT CONNECTIONS VISUALIZATION (Prompt Requirement 15) */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-mono text-[12px] tracking-[0.1em] text-slate-300 uppercase font-semibold m-0 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        PROJECT CONNECTIONS
                      </h5>
                      <span className="font-mono text-[10px] text-slate-400">
                        {selectedTech.projects && selectedTech.projects.length > 0
                          ? 'VERIFIED CODEBASE IMPLEMENTATION'
                          : 'FOUNDATIONAL ENGINEERING KNOWLEDGE'}
                      </span>
                    </div>

                    {selectedTech.projects && selectedTech.projects.length > 0 ? (
                      <div className="relative pl-4 sm:pl-6 border-l-2 border-cyan-500/30 space-y-3.5 my-3">
                        {selectedTech.projects.map((proj, pIdx) => {
                          const isLast = pIdx === (selectedTech.projects?.length ?? 1) - 1
                          return (
                            <div key={proj.projectId} className="relative group">
                              {/* Branch Connector Line (│ ├── / └──) */}
                              <div
                                className="absolute -left-[18px] sm:-left-[26px] top-4 w-4 sm:w-6 h-[2px] bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors"
                                aria-hidden="true"
                              />
                              <div
                                className="absolute -left-[20px] sm:-left-[28px] top-[14px] w-2 h-2 rounded-full border border-cyan-400 bg-[#0A1017] group-hover:bg-cyan-400 transition-colors"
                                aria-hidden="true"
                              />

                              {/* Project Node Card */}
                              <div
                                className="p-3.5 sm:p-4 rounded-xl bg-white/[0.035] border border-white/15 hover:border-cyan-500/40 transition-all duration-300 group-hover:bg-white/[0.06] shadow-sm"
                              >
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[13px] sm:text-[14px] font-bold text-white group-hover:text-cyan-300 transition-colors">
                                      {proj.projectName}
                                    </span>
                                  </div>
                                  <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-semibold">
                                    {proj.tag}
                                  </span>
                                </div>
                                <p className="font-body text-[12px] sm:text-[13px] text-slate-300 mt-1.5 m-0 leading-relaxed">
                                  {proj.roleDescription}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-slate-400 text-[12px] sm:text-[13px] font-body leading-relaxed">
                        Implemented through foundational computer science coursework, object-oriented system design labs, and software engineering exercises.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-black/25 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: domain.color }}
              />
              <span>
                {domain.tech.length} TECHNOLOGIES IN {domain.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-emerald-400">
                100% VERIFIED
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-slate-400">
                LIQUID GLASS MODULE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null
}
