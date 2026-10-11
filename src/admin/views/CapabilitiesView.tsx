import React, { useState } from 'react'
import type { PortfolioContent, CapabilityData } from '@/types/content.ts'
import {
  Workflow,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ArrowRight,
  ListPlus,
} from 'lucide-react'

interface CapabilitiesViewProps {
  content: PortfolioContent
  onChange: (updatedCapabilities: CapabilityData[]) => void
}

export function CapabilitiesView({ content, onChange }: CapabilitiesViewProps) {
  const capabilities = content.capabilities || []
  const [selectedId, setSelectedId] = useState<string>(capabilities[0]?.id || '')

  const selectedCap = capabilities.find((c) => c.id === selectedId) || capabilities[0]

  const handleAdd = () => {
    const newCap: CapabilityData = {
      id: `cap-${Date.now()}`,
      title: 'New Engineering Capability',
      domain: 'Systems & Architecture',
      color: '#00D9FF',
      description: 'Describe core architectural and technical engineering capabilities.',
      flow: [
        { step: '01', label: 'Analysis & Design' },
        { step: '02', label: 'Implementation' },
        { step: '03', label: 'Verification' },
      ],
    }
    onChange([...capabilities, newCap])
    setSelectedId(newCap.id)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this capability entry?')) {
      const next = capabilities.filter((c) => c.id !== id)
      onChange(next)
      if (selectedId === id && next.length > 0) {
        setSelectedId(next[0].id)
      }
    }
  }

  const handleUpdate = (updates: Partial<CapabilityData>) => {
    if (!selectedCap) return
    const next = capabilities.map((c) => (c.id === selectedCap.id ? { ...c, ...updates } : c))
    onChange(next)
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto font-sans text-xs text-[#A8B4C2]">
      {/* Header */}
      <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-cyan-400" />
          <div>
            <h3 className="text-xs font-bold text-[#F5F8FA] uppercase font-mono">
              Capabilities Matrix
            </h3>
            <p className="text-[11px] text-[#8491A2] font-sans">
              Manage architectural strengths, engineering workflow stages, and technical competencies.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Capability</span>
        </button>
      </div>

      {/* Two-Column Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Capability List (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              onClick={() => setSelectedId(cap.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                selectedId === cap.id
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-[#F5F8FA]'
                  : 'bg-[#10151D] border-[rgba(255,255,255,0.08)] text-[#A8B4C2] hover:bg-white/[0.03]'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs font-bold truncate text-[#F5F8FA]">
                  {cap.title}
                </div>
                <div className="text-[11px] font-mono text-cyan-400 truncate mt-0.5">
                  {cap.domain}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(cap.id)
                }}
                className="p-1 rounded text-[#8491A2] hover:text-red-400 transition-colors"
                title="Delete capability"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Selected Capability Editor (7 cols) */}
        {selectedCap && (
          <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-[#8491A2] mb-1">Title</label>
              <input
                type="text"
                value={selectedCap.title}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs text-[#F5F8FA] font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">Domain Tag</label>
                <input
                  type="text"
                  value={selectedCap.domain}
                  onChange={(e) => handleUpdate({ domain: e.target.value })}
                  className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs text-[#F5F8FA] font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-[#8491A2] mb-1">Accent Color</label>
                <input
                  type="text"
                  value={selectedCap.color}
                  onChange={(e) => handleUpdate({ color: e.target.value })}
                  className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs text-[#F5F8FA] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#8491A2] mb-1">Description</label>
              <textarea
                rows={3}
                value={selectedCap.description}
                onChange={(e) => handleUpdate({ description: e.target.value })}
                className="w-full p-2 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded-lg text-xs text-[#F5F8FA] font-sans resize-none"
              />
            </div>

            {/* Workflow Steps */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-mono text-[#8491A2]">
                  Engineering Pipeline Steps ({selectedCap.flow.length})
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const stepNum = String(selectedCap.flow.length + 1).padStart(2, '0')
                    handleUpdate({
                      flow: [...selectedCap.flow, { step: stepNum, label: 'New Step' }],
                    })
                  }}
                  className="px-2 py-0.5 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded hover:bg-cyan-500/20"
                >
                  + Add Step
                </button>
              </div>
              <div className="space-y-2">
                {selectedCap.flow.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={step.step}
                      onChange={(e) => {
                        const newFlow = [...selectedCap.flow]
                        newFlow[idx] = { ...newFlow[idx], step: e.target.value }
                        handleUpdate({ flow: newFlow })
                      }}
                      className="w-14 p-1.5 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded text-xs text-center font-mono text-cyan-400 font-bold"
                    />
                    <input
                      type="text"
                      value={step.label}
                      onChange={(e) => {
                        const newFlow = [...selectedCap.flow]
                        newFlow[idx] = { ...newFlow[idx], label: e.target.value }
                        handleUpdate({ flow: newFlow })
                      }}
                      className="flex-1 p-1.5 bg-black/40 border border-[rgba(255,255,255,0.09)] rounded text-xs text-[#F5F8FA] font-mono"
                    />
                    {selectedCap.flow.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newFlow = selectedCap.flow.filter((_, i) => i !== idx)
                          handleUpdate({ flow: newFlow })
                        }}
                        className="p-1.5 text-[#8491A2] hover:text-red-400 text-xs"
                        aria-label="Remove step"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
