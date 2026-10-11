import React, { useState } from 'react'
import type { PortfolioContent, TechDomainData, TechItemData } from '@/types/content.ts'
import { Cpu, Plus, Trash2, ArrowUp, ArrowDown, Check, Sliders } from 'lucide-react'

interface ConnectedStackViewProps {
  content: PortfolioContent
  onChange: (updatedCategories: TechDomainData[]) => void
}

export function ConnectedStackView({ content, onChange }: ConnectedStackViewProps) {
  const categories = content.techStack.categories
  const [selectedCatId, setSelectedCatId] = useState<string>(categories[0]?.id || '')

  const selectedCategory =
    categories.find((c) => c.id === selectedCatId) || categories[0]

  const handleUpdateCategory = (id: string, updates: Partial<TechDomainData>) => {
    onChange(categories.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const handleAddCategory = () => {
    const newId = `domain-${Date.now()}`
    const newCat: TechDomainData = {
      id: newId,
      label: 'New Domain',
      shortLabel: 'NEW',
      color: '#00D9FF',
      glowColor: 'rgba(0, 217, 255, 0.35)',
      description: 'Domain description and architectural purpose.',
      visualHint: 'CORE ARCHITECTURE',
      enabled: true,
      tech: [],
    }
    onChange([...categories, newCat])
    setSelectedCatId(newId)
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm('Delete this technology domain?')) {
      const remaining = categories.filter((c) => c.id !== id)
      onChange(remaining)
      if (selectedCatId === id) {
        setSelectedCatId(remaining[0]?.id || '')
      }
    }
  }

  const handleAddTech = (catId: string) => {
    if (!selectedCategory) return
    const newTech: TechItemData = {
      name: 'New Technology',
      description: 'Core framework / tool description.',
      role: 'Core Stack',
      usedFor: ['System Integration'],
    }
    handleUpdateCategory(catId, {
      tech: [...selectedCategory.tech, newTech],
    })
  }

  const handleUpdateTech = (catId: string, techIndex: number, updates: Partial<TechItemData>) => {
    if (!selectedCategory) return
    const nextTech = [...selectedCategory.tech]
    nextTech[techIndex] = { ...nextTech[techIndex], ...updates }
    handleUpdateCategory(catId, { tech: nextTech })
  }

  const handleRemoveTech = (catId: string, techIndex: number) => {
    if (!selectedCategory) return
    const nextTech = selectedCategory.tech.filter((_, i) => i !== techIndex)
    handleUpdateCategory(catId, { tech: nextTech })
  }

  return (
    <div className="space-y-6 max-w-5xl font-mono text-xs text-slate-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Domain Categories List (col-span-4) */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Domains ({categories.length})</span>
            </h3>
            <button
              type="button"
              onClick={handleAddCategory}
              className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 cursor-pointer"
              title="Add New Category"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 max-h-[70vh] overflow-y-auto custom-scrollbar pr-1">
            {categories.map((cat) => {
              const isSelected = cat.id === selectedCatId

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(0,217,255,0.15)]'
                      : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-semibold text-white truncate">{cat.label}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {cat.tech.length} Technologies
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={cat.enabled}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleUpdateCategory(cat.id, { enabled: e.target.checked })
                    }}
                    className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                    title={cat.enabled ? 'Enabled' : 'Disabled'}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Selected Category Details & Technologies (col-span-8) */}
        {selectedCategory ? (
          <div className="md:col-span-8 p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedCategory.color }}
                />
                <span>{selectedCategory.label}</span>
              </h4>

              <button
                type="button"
                onClick={() => handleDeleteCategory(selectedCategory.id)}
                className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 cursor-pointer"
                title="Delete Domain"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Category Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Domain Label</label>
                <input
                  type="text"
                  value={selectedCategory.label}
                  onChange={(e) =>
                    handleUpdateCategory(selectedCategory.id, { label: e.target.value })
                  }
                  className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Short Label</label>
                <input
                  type="text"
                  value={selectedCategory.shortLabel}
                  onChange={(e) =>
                    handleUpdateCategory(selectedCategory.id, { shortLabel: e.target.value })
                  }
                  className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedCategory.color}
                    onChange={(e) =>
                      handleUpdateCategory(selectedCategory.id, { color: e.target.value })
                    }
                    className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedCategory.color}
                    onChange={(e) =>
                      handleUpdateCategory(selectedCategory.id, { color: e.target.value })
                    }
                    className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Domain Description</label>
              <textarea
                rows={2}
                value={selectedCategory.description}
                onChange={(e) =>
                  handleUpdateCategory(selectedCategory.id, { description: e.target.value })
                }
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>

            {/* Technologies List */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase">
                  Technologies in {selectedCategory.label} ({selectedCategory.tech.length})
                </span>
                <button
                  type="button"
                  onClick={() => handleAddTech(selectedCategory.id)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Tech</span>
                </button>
              </div>

              <div className="space-y-2">
                {selectedCategory.tech.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/40 border border-slate-800/80 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={t.name}
                        placeholder="Technology name"
                        onChange={(e) =>
                          handleUpdateTech(selectedCategory.id, idx, { name: e.target.value })
                        }
                        className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-white font-bold"
                      />
                      <input
                        type="text"
                        value={t.role || ''}
                        placeholder="Role / Tag"
                        onChange={(e) =>
                          handleUpdateTech(selectedCategory.id, idx, { role: e.target.value })
                        }
                        className="w-36 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-slate-300 text-[11px]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(selectedCategory.id, idx)}
                        className="p-1 text-red-400 hover:text-red-300 cursor-pointer"
                        title="Remove Tech"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={t.description}
                      placeholder="Concise technical description"
                      onChange={(e) =>
                        handleUpdateTech(selectedCategory.id, idx, { description: e.target.value })
                      }
                      className="w-full p-1.5 bg-black/50 border border-slate-700 rounded-lg text-slate-300 text-[11px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="md:col-span-8 p-12 text-center text-slate-500">
            Select or create a technology domain.
          </div>
        )}
      </div>
    </div>
  )
}
