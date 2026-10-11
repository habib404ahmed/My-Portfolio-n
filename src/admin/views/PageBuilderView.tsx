import React from 'react'
import type { PortfolioContent, SectionMeta } from '@/types/content.ts'
import type { AdminTab } from '../types.ts'
import {
  Layers,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Hash,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

interface PageBuilderViewProps {
  content: PortfolioContent
  onChange: (updatedSections: SectionMeta[]) => void
  onNavigateTab?: (tab: AdminTab) => void
}

const SECTION_TO_TAB: Record<string, AdminTab> = {
  hero: 'hero',
  profile: 'about',
  about: 'about',
  capabilities: 'capabilities',
  'tech-stack': 'tech-stack',
  projects: 'projects',
  education: 'education',
  journey: 'journey',
  certifications: 'certifications',
  contact: 'contact',
  resume: 'resume',
  navigation: 'navigation',
}

export function PageBuilderView({
  content,
  onChange,
  onNavigateTab,
}: PageBuilderViewProps) {
  const sections = content.sections || []

  const handleToggle = (id: string) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= sections.length) return
    const next = [...sections]
    const temp = next[index]
    next[index] = next[targetIndex]
    next[targetIndex] = temp
    onChange(next.map((s, i) => ({ ...s, order: i })))
  }

  const handleUpdate = (id: string, updates: Partial<SectionMeta>) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto font-sans text-xs text-[#A8B4C2]">
      <div className="p-4 sm:p-5 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.07)]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-[#F5F8FA] uppercase font-mono">
              Portfolio Structure &amp; Sections Hierarchy
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cyan-300">
            {sections.filter((s) => s.enabled).length} of {sections.length} Sections Active
          </span>
        </div>

        <p className="text-[11px] text-[#8491A2] font-sans leading-relaxed">
          Manage the sequence of cinematic sections, toggle visibility, and configure navigation anchors.
          Disabled sections are removed without leaving layout gaps. Click &quot;Configure&quot; on any section to jump directly into its editor.
        </p>

        <div className="space-y-2 pt-1">
          {sections.map((sec, idx) => {
            const mappedTab = SECTION_TO_TAB[sec.id]

            return (
              <div
                key={sec.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  sec.enabled
                    ? 'bg-black/40 border-[rgba(255,255,255,0.08)] text-[#F5F8FA]'
                    : 'bg-black/20 border-white/[0.04] text-[#8491A2] opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className="text-[#8491A2] font-mono font-bold w-5 text-center">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <input
                    type="text"
                    value={sec.label}
                    onChange={(e) => handleUpdate(sec.id, { label: e.target.value })}
                    className="p-1.5 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded text-xs text-[#F5F8FA] font-mono font-bold max-w-[200px]"
                  />
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#8491A2] font-mono">
                    <Hash className="w-3 h-3 text-cyan-400" />
                    <span>{sec.navAnchor}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {mappedTab && onNavigateTab && (
                    <button
                      type="button"
                      onClick={() => onNavigateTab(mappedTab)}
                      className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[#F5F8FA] font-mono text-[11px] transition-colors cursor-pointer"
                    >
                      <span>Configure</span>
                      <ChevronRight className="w-3 h-3 text-cyan-400" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleToggle(sec.id)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      sec.enabled
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-black/40 text-[#8491A2] border-[rgba(255,255,255,0.06)]'
                    }`}
                    title={sec.enabled ? 'Section Enabled' : 'Section Hidden'}
                  >
                    {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex items-center gap-0.5 border-l border-[rgba(255,255,255,0.08)] pl-1.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 text-[#8491A2] hover:text-[#F5F8FA] disabled:opacity-20 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sections.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 text-[#8491A2] hover:text-[#F5F8FA] disabled:opacity-20 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
