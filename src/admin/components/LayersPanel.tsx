import React, { useState, useMemo } from 'react'
import {
  Layers,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Search,
  Edit2,
  Check,
  Compass,
  Sparkles,
  Type,
  Image as ImageIcon,
  Square,
  Box,
  Sliders,
} from 'lucide-react'
import type { SelectedElementInfo, LayerNode } from '../types.ts'
import type { PortfolioContent } from '@/types/content.ts'

interface LayersPanelProps {
  content: PortfolioContent
  selectedElement: SelectedElementInfo | null
  onSelectElement: (el: SelectedElementInfo) => void
  onUpdateContent: (updated: PortfolioContent) => void
  onToggleVisibility?: (elementId: string) => void
  onToggleLock?: (elementId: string) => void
}

const DEFAULT_LAYERS: LayerNode[] = [
  {
    id: 'navbar',
    name: 'Navbar Header',
    type: 'header',
    icon: Compass,
    children: [
      { id: 'navbar-logo', name: 'Profile Mark', type: 'image', icon: ImageIcon },
      { id: 'navbar-brand-text', name: 'Brand Name & Title', type: 'text', icon: Type },
      { id: 'navbar-nav', name: 'Navigation Links', type: 'container', icon: Sliders },
      { id: 'navbar-resume-btn', name: 'Resume Button', type: 'button', icon: Square },
    ],
  },
  {
    id: 'hero-section',
    name: 'Hero Section',
    type: 'section',
    icon: Sparkles,
    children: [
      {
        id: 'hero-text-panel',
        name: 'Hero Text Panel',
        type: 'container',
        icon: Box,
        children: [
          { id: 'hero-availability', name: 'Availability Badge', type: 'badge', icon: Square },
          { id: 'hero-heading', name: 'Full Name Heading', type: 'heading', icon: Type },
          { id: 'hero-title', name: 'Professional Title', type: 'text', icon: Type },
          { id: 'hero-specialties', name: 'Specialties Row', type: 'text', icon: Type },
          { id: 'hero-description', name: 'Hero Description', type: 'text', icon: Type },
          { id: 'hero-cta-buttons', name: 'CTA Action Buttons', type: 'container', icon: Square },
          { id: 'hero-social-links', name: 'Social Icons Row', type: 'container', icon: Sliders },
        ],
      },
      { id: 'hero-3d-core', name: '3D Core Canvas', type: 'custom', icon: Box },
      { id: 'hero-portrait', name: 'Profile Portrait Asset', type: 'image', icon: ImageIcon },
    ],
  },
  {
    id: 'section-system',
    name: 'Enter System Scene',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-profile',
    name: 'Engineer Profile Scene',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-mindset',
    name: 'How I Build Scene',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-stack',
    name: 'Connected Stack Scene',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-capabilities',
    name: 'Capabilities Matrix',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-education',
    name: 'Education & Languages',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-projects',
    name: 'Project Universe',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-journey',
    name: 'The Journey Timeline',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-certifications',
    name: 'Certifications Scene',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-resume',
    name: 'Resume Experience Scene',
    type: 'section',
    icon: Layers,
  },
  {
    id: 'section-contact',
    name: 'Contact & Connection',
    type: 'section',
    icon: Layers,
  },
]

export function LayersPanel({
  content,
  selectedElement,
  onSelectElement,
  onUpdateContent,
}: LayersPanelProps) {
  const [search, setSearch] = useState('')
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    navbar: true,
    'hero-section': true,
    'hero-text-panel': true,
  })
  const [lockedNodes, setLockedNodes] = useState<Record<string, boolean>>({})
  const [hiddenNodes, setHiddenNodes] = useState<Record<string, boolean>>({})
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null)
  const [customLabels, setCustomLabels] = useState<Record<string, string>>({})
  const [tempLabel, setTempLabel] = useState('')

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleLock = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLockedNodes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleVisibility = (node: LayerNode, e: React.MouseEvent) => {
    e.stopPropagation()
    const isNowHidden = !hiddenNodes[node.id]
    setHiddenNodes((prev) => ({ ...prev, [node.id]: isNowHidden }))

    // If section node, update enabled on content.sections
    if (node.id.startsWith('section-')) {
      const sectionKey = node.id.replace('section-', '')
      const updated = content.sections.map((s) =>
        s.id === sectionKey ? { ...s, enabled: !isNowHidden } : s
      )
      onUpdateContent({ ...content, sections: updated })
      return
    }

    // Otherwise update elementStyles
    const prevStyle = content.elementStyles?.[node.id] || {}
    const updatedStyles = {
      ...content.elementStyles,
      [node.id]: {
        ...prevStyle,
        display: isNowHidden ? 'none' : 'inherit',
      },
    }
    onUpdateContent({ ...content, elementStyles: updatedStyles })
  }

  const startRename = (id: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingLabelId(id)
    setTempLabel(customLabels[id] || currentName)
  }

  const saveRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (tempLabel.trim()) {
      setCustomLabels((prev) => ({ ...prev, [id]: tempLabel.trim() }))
    }
    setEditingLabelId(null)
  }

  const findBreadcrumbs = (nodes: LayerNode[], targetId: string, currentPath: string[] = ['Home']): string[] | null => {
    for (const node of nodes) {
      const nodeName = customLabels[node.id] || node.name
      if (node.id === targetId) {
        return [...currentPath, nodeName]
      }
      if (node.children) {
        const found = findBreadcrumbs(node.children, targetId, [...currentPath, nodeName])
        if (found) return found
      }
    }
    return null
  }

  const handleSelect = (node: LayerNode) => {
    if (lockedNodes[node.id]) return
    const breadcrumbs = findBreadcrumbs(DEFAULT_LAYERS, node.id) || ['Home', node.name]
    onSelectElement({
      id: node.id,
      name: customLabels[node.id] || node.name,
      type: node.type,
      breadcrumbs,
    })
  }

  const filterTree = (nodes: LayerNode[]): LayerNode[] => {
    if (!search.trim()) return nodes
    const q = search.toLowerCase()

    return nodes.reduce<LayerNode[]>((acc, node) => {
      const name = (customLabels[node.id] || node.name).toLowerCase()
      const matchesSelf = name.includes(q) || node.id.toLowerCase().includes(q)
      const matchingChildren = node.children ? filterTree(node.children) : []

      if (matchesSelf || matchingChildren.length > 0) {
        acc.push({
          ...node,
          children: matchingChildren.length > 0 ? matchingChildren : node.children,
        })
      }
      return acc
    }, [])
  }

  const filteredLayers = useMemo(() => filterTree(DEFAULT_LAYERS), [search, customLabels])

  const renderNode = (node: LayerNode, depth = 0) => {
    const isSelected = selectedElement?.id === node.id
    const isExpanded = expandedNodes[node.id]
    const isLocked = lockedNodes[node.id]
    const isHidden = hiddenNodes[node.id]
    const displayName = customLabels[node.id] || node.name
    const hasChildren = node.children && node.children.length > 0
    const IconComponent = node.icon || Box

    return (
      <div key={node.id} className="select-none">
        <div
          onClick={() => handleSelect(node)}
          style={{ paddingLeft: `${depth * 14 + 10}px` }}
          className={`group flex items-center justify-between pr-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer border ${
            isSelected
              ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200 font-medium shadow-[0_0_12px_rgba(0,217,255,0.12)]'
              : 'border-transparent text-slate-300 hover:bg-white/[0.04] hover:text-slate-100'
          } ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {/* Left: Expand icon + Node icon + Title */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => toggleExpand(node.id, e)}
                className="p-0.5 text-slate-400 hover:text-white transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
            ) : (
              <span className="w-4" />
            )}

            <IconComponent
              className={`w-3.5 h-3.5 shrink-0 ${
                isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
              }`}
            />

            {editingLabelId === node.id ? (
              <div
                className="flex items-center gap-1 flex-1"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={tempLabel}
                  onChange={(e) => setTempLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveRename(node.id, e as unknown as React.MouseEvent)
                    if (e.key === 'Escape') setEditingLabelId(null)
                  }}
                  autoFocus
                  className="bg-black border border-cyan-500/50 rounded px-1.5 py-0.5 text-xs text-cyan-200 outline-none w-full"
                />
                <button
                  type="button"
                  onClick={(e) => saveRename(node.id, e)}
                  className="p-1 text-cyan-400 hover:text-cyan-200"
                >
                  <Check className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <span className="truncate font-sans tracking-wide text-xs">
                {displayName}
              </span>
            )}
          </div>

          {/* Right: Quick Actions (Rename, Lock, Visibility) */}
          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            {editingLabelId !== node.id && (
              <button
                type="button"
                title="Rename Label"
                onClick={(e) => startRename(node.id, node.name, e)}
                className="p-1 text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            )}

            <button
              type="button"
              title={isLocked ? 'Unlock Element' : 'Lock Element'}
              onClick={(e) => toggleLock(node.id, e)}
              className={`p-1 transition-colors ${
                isLocked ? 'text-amber-400 opacity-100' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </button>

            <button
              type="button"
              title={isHidden ? 'Show Element' : 'Hide Element'}
              onClick={(e) => toggleVisibility(node, e)}
              className={`p-1 transition-colors ${
                isHidden ? 'text-rose-400 opacity-100' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Children Recursion */}
        {hasChildren && isExpanded && (
          <div className="space-y-0.5 mt-0.5">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#080B10] border-r border-slate-800/80 w-full overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-slate-800/80 bg-[rgba(255,255,255,0.02)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Layers & Structure
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
            TREE
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search layers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#030507] border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Layer Tree List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {filteredLayers.map((node) => renderNode(node, 0))}
      </div>

      {/* Breadcrumb Footer */}
      {selectedElement && (
        <div className="p-2.5 border-t border-slate-800/80 bg-[#040609] text-[11px] font-mono text-slate-400 truncate">
          <span className="text-slate-500 mr-1.5">Selected:</span>
          <span className="text-cyan-400 font-semibold">
            {(selectedElement.breadcrumbs || selectedElement.breadcrumb || [selectedElement.name || selectedElement.id]).join(' > ')}
          </span>
        </div>
      )}
    </div>
  )
}
