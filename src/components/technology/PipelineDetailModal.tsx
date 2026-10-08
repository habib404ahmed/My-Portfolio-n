import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { PipelineData, PipelineNode } from '@/data/techStack'

interface PipelineDetailModalProps {
  pipeline: PipelineData | null
  onClose: () => void
}

export function PipelineDetailModal({
  pipeline,
  onClose,
}: PipelineDetailModalProps) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const modalContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pipeline) return

    setSelectedNodeIndex(null)
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 50)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [pipeline, onClose])

  if (!pipeline) return null

  const modalContent = (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pipeline-modal-title"
        aria-describedby="pipeline-modal-desc"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-black/60 backdrop-blur-[10px]"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Liquid Glass Modal */}
        <motion.div
          ref={modalContainerRef}
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[740px] my-auto rounded-[24px] overflow-hidden text-left pointer-events-auto"
          style={{
            background: 'rgba(10, 16, 23, 0.78)',
            backdropFilter: 'blur(14px) saturate(135%)',
            WebkitBackdropFilter: 'blur(14px) saturate(135%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: `0 30px 100px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.22), 0 0 35px ${pipeline.color}25`,
            maxHeight: '85vh',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent Highlight Edge */}
          <div
            className="absolute top-0 inset-x-0 h-[2px] pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${pipeline.color} 50%, transparent 100%)`,
              opacity: 0.85,
            }}
            aria-hidden="true"
          />

          {/* Modal Header */}
          <div className="relative p-5 sm:p-7 border-b border-white/10 flex items-start justify-between gap-4">
            <div className="min-w-0 pr-10">
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse shadow-[0_0_10px_currentColor]"
                  style={{ backgroundColor: pipeline.color, color: pipeline.color }}
                />
                <span
                  id="pipeline-modal-title"
                  className="font-mono text-[14px] sm:text-[16px] font-extrabold tracking-[0.08em] uppercase text-[#F4F7FA]"
                >
                  {pipeline.title}
                </span>
                <span
                  className="font-mono text-[11px] px-2 py-0.5 rounded-full border border-white/15 bg-white/5 font-semibold text-slate-300"
                  style={{ borderColor: `${pipeline.color}40`, color: pipeline.color }}
                >
                  {pipeline.code}
                </span>
              </div>

              <p
                id="pipeline-modal-desc"
                className="text-[13px] sm:text-[14px] text-slate-300 font-body leading-relaxed m-0 max-w-xl"
              >
                {pipeline.description}
              </p>
            </div>

            {/* 44x44px Circular Close Button */}
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
              aria-label="Close pipeline module"
            >
              <span className="font-mono text-lg text-slate-300 group-hover:text-cyan-300 transition-colors leading-none select-none">
                &times;
              </span>
            </button>
          </div>

          {/* Modal Body: Connected Glass Pipeline Stages */}
          <div className="p-5 sm:p-7 overflow-y-auto max-h-[calc(85vh-160px)] custom-scrollbar">
            <div className="text-[11px] font-mono text-slate-400 mb-4 uppercase tracking-wider">
              PIPELINE EXECUTION NODES // CLICK ANY STAGE FOR DETAILED TELEMETRY
            </div>

            <div className="space-y-4">
              {pipeline.nodes.map((node: PipelineNode, index: number) => {
                const isExpanded = selectedNodeIndex === index
                const isLast = index === pipeline.nodes.length - 1

                return (
                  <div key={node.name} className="relative">
                    {/* Node Card */}
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * index, duration: 0.35 }}
                      onClick={() =>
                        setSelectedNodeIndex(isExpanded ? null : index)
                      }
                      className="w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
                      style={{
                        background: isExpanded
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(255, 255, 255, 0.04)',
                        border: isExpanded
                          ? `1px solid ${node.color}`
                          : '1px solid rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: isExpanded
                          ? `0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px ${node.color}30`
                          : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.45)'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isExpanded) {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                          e.currentTarget.style.transform = 'translateY(0px)'
                        }
                      }}
                      aria-expanded={isExpanded}
                      aria-label={`${node.stage}: ${node.name}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono text-[11px] font-bold px-2 py-0.5 rounded border uppercase"
                            style={{
                              borderColor: `${node.color}50`,
                              backgroundColor: `${node.color}15`,
                              color: node.color,
                            }}
                          >
                            {node.stage}
                          </span>
                          <span className="font-mono text-[15px] sm:text-[17px] font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {node.name}
                          </span>
                        </div>

                        <span className="font-mono text-[12px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                          {isExpanded ? 'LESS [-]' : 'EXPAND [+]'}
                        </span>
                      </div>

                      {/* Role */}
                      <div className="font-mono text-[12px] sm:text-[13px] text-cyan-300 mt-2 font-medium">
                        {node.role}
                      </div>

                      {/* Description */}
                      <p className="font-body text-[13px] text-slate-300 mt-2 leading-relaxed m-0">
                        {node.description}
                      </p>
                    </motion.button>

                    {/* Connecting Vertical Glass Arrow between nodes */}
                    {!isLast && (
                      <div className="flex flex-col items-center justify-center my-1.5" aria-hidden="true">
                        <div
                          className="w-[2px] h-3"
                          style={{
                            background: `linear-gradient(to bottom, ${node.color}60, ${pipeline.nodes[index + 1].color}60)`,
                          }}
                        />
                        <span
                          className="font-mono text-[11px] leading-none select-none"
                          style={{ color: pipeline.nodes[index + 1].color }}
                        >
                          &darr;
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-black/25 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <span>4 CONNECTED GLASS STAGES</span>
            <span className="text-cyan-400 font-semibold">VERIFIED ARCHITECTURE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null
}
