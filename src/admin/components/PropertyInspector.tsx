import React, { useState } from 'react'
import {
  Type,
  Layout,
  Palette,
  Sparkles,
  Maximize2,
  Box,
  Layers,
  Sliders,
  RotateCcw,
  Link2,
  Unlink2,
  Image as ImageIcon,
  ChevronDown,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  AlertCircle,
  Code,
  Shield,
  HelpCircle,
} from 'lucide-react'
import type { SelectedElementInfo, InspectorTab, DeviceMode } from '../types.ts'
import type { PortfolioContent, BoxSpacing, ElementCustomStyle } from '@/types/content.ts'

interface PropertyInspectorProps {
  content: PortfolioContent
  selectedElement: SelectedElementInfo | null
  activeDevice: DeviceMode
  onChangeContent: (updated: PortfolioContent) => void
  onSelectTab?: (tab: InspectorTab) => void
}

const TABS: { id: InspectorTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'content', label: 'Content', icon: Type },
  { id: 'layout', label: 'Layout', icon: Layout },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'background', label: 'Background', icon: Box },
  { id: 'border', label: 'Border', icon: Layers },
  { id: 'shadow', label: 'Shadow', icon: Sliders },
  { id: 'animation', label: 'Animation', icon: Sparkles },
  { id: 'responsive', label: 'Responsive', icon: Monitor },
  { id: 'advanced', label: 'Advanced', icon: Code },
]

export function PropertyInspector({
  content,
  selectedElement,
  activeDevice,
  onChangeContent,
}: PropertyInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>('content')
  const [linkedMargin, setLinkedMargin] = useState(false)
  const [linkedPadding, setLinkedPadding] = useState(false)
  const [activeBoxModelSide, setActiveBoxModelSide] = useState<'margin' | 'padding'>('padding')

  if (!selectedElement) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-500 bg-[#080B10]">
        <Box className="w-10 h-10 mb-3 text-slate-600 animate-pulse" />
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
          No Element Selected
        </h4>
        <p className="text-xs text-slate-500 max-w-xs">
          Click an element in the live preview or select a layer from the left panel to inspect and customize its properties.
        </p>
      </div>
    )
  }

  const elementId = selectedElement.id
  const currentStyles: ElementCustomStyle = content.elementStyles?.[elementId] || {}
  const targetStyles: ElementCustomStyle =
    activeDevice === 'mobile'
      ? (currentStyles.mobile as ElementCustomStyle) || {}
      : activeDevice === 'tablet'
      ? (currentStyles.tablet as ElementCustomStyle) || {}
      : currentStyles

  const updateStyle = (key: keyof ElementCustomStyle, value: any) => {
    let nextElementStyles = { ...content.elementStyles }
    let base = { ...(nextElementStyles[elementId] || {}) }

    if (activeDevice === 'desktop') {
      base[key] = value
    } else if (activeDevice === 'tablet') {
      base.tablet = {
        ...(base.tablet || {}),
        [key]: value,
      }
    } else if (activeDevice === 'mobile') {
      base.mobile = {
        ...(base.mobile || {}),
        [key]: value,
      }
    }

    nextElementStyles[elementId] = base
    onChangeContent({
      ...content,
      elementStyles: nextElementStyles,
    })
  }

  const updateSpacing = (type: 'margin' | 'padding', side: keyof BoxSpacing, value: string) => {
    const prev = targetStyles[type] || { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    const isLinked = type === 'margin' ? linkedMargin : linkedPadding

    let updated: BoxSpacing
    if (isLinked) {
      updated = { top: value, right: value, bottom: value, left: value }
    } else {
      updated = { ...prev, [side]: value }
    }
    updateStyle(type, updated)
  }

  const resetElementStyles = () => {
    if (!content.elementStyles?.[elementId]) return
    const nextStyles = { ...content.elementStyles }
    delete nextStyles[elementId]
    onChangeContent({ ...content, elementStyles: nextStyles })
  }

  // Helper for text elements
  const isTextElement =
    selectedElement.type === 'text' ||
    selectedElement.type === 'heading' ||
    selectedElement.id.includes('heading') ||
    selectedElement.id.includes('title') ||
    selectedElement.id.includes('description')

  const isPhotoElement =
    selectedElement.type === 'image' ||
    selectedElement.id === 'hero-portrait' ||
    selectedElement.id === 'navbar-logo'

  const isNavbarElement = selectedElement.id === 'navbar'

  return (
    <div className="flex flex-col h-full bg-[#080B10] border-l border-slate-800/80 w-full overflow-hidden">
      {/* Header Info */}
      <div className="p-3 border-b border-slate-800/80 bg-[rgba(255,255,255,0.02)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100 truncate">
              {selectedElement.name}
            </span>
          </div>
          <button
            type="button"
            onClick={resetElementStyles}
            title="Reset to default design"
            className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>RESET</span>
          </button>
        </div>
        <div className="text-[10px] font-mono text-slate-500 mt-0.5 flex items-center justify-between">
          <span>ID: {selectedElement.id}</span>
          <span className="uppercase text-cyan-400/80">Device: {activeDevice}</span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center overflow-x-auto border-b border-slate-800/80 bg-[#040609] custom-scrollbar px-1">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono font-medium tracking-wider uppercase whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-xs">
        {/* TAB 1: CONTENT */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            {/* If Navbar */}
            {isNavbarElement && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-300 mb-1 block">
                    Navbar Height (px)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="50"
                      max="140"
                      value={content.navigation.navbarHeight || 80}
                      onChange={(e) =>
                        onChangeContent({
                          ...content,
                          navigation: { ...content.navigation, navbarHeight: Number(e.target.value) },
                        })
                      }
                      className="flex-1 accent-cyan-400"
                    />
                    <input
                      type="number"
                      value={content.navigation.navbarHeight || 80}
                      onChange={(e) =>
                        onChangeContent({
                          ...content,
                          navigation: { ...content.navigation, navbarHeight: Number(e.target.value) },
                        })
                      }
                      className="w-16 bg-[#030507] border border-slate-800 rounded px-2 py-1 text-center font-mono text-cyan-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-300 mb-1 block">
                    Brand Logo Text
                  </label>
                  <input
                    type="text"
                    value={content.navigation.logoText || ''}
                    onChange={(e) =>
                      onChangeContent({
                        ...content,
                        navigation: { ...content.navigation, logoText: e.target.value },
                      })
                    }
                    className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200 focus:border-cyan-500/60"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-300 mb-1 block">
                    Resume Button Label
                  </label>
                  <input
                    type="text"
                    value={content.navigation.resumeButtonText || ''}
                    onChange={(e) =>
                      onChangeContent({
                        ...content,
                        navigation: { ...content.navigation, resumeButtonText: e.target.value },
                      })
                    }
                    className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200 focus:border-cyan-500/60"
                  />
                </div>
              </div>
            )}

            {/* If Text Element */}
            {isTextElement && (
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono text-slate-300">Text Content</label>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedElement.id === 'hero-heading') {
                          onChangeContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              name: {
                                ...content.hero.name,
                                display: [...content.hero.name.display, 'NEW LINE'],
                              },
                            },
                          })
                        }
                      }}
                      className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/30 px-1.5 py-0.5 rounded border border-cyan-800/40"
                    >
                      + Line Break
                    </button>
                  </div>

                  {selectedElement.id === 'hero-heading' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={content.hero.name.display[0] || ''}
                        onChange={(e) => {
                          const updated = [...content.hero.name.display]
                          updated[0] = e.target.value
                          onChangeContent({
                            ...content,
                            hero: { ...content.hero, name: { ...content.hero.name, display: updated } },
                          })
                        }}
                        className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                        placeholder="Line 1 (e.g. MD HABIB)"
                      />
                      <input
                        type="text"
                        value={content.hero.name.display[1] || ''}
                        onChange={(e) => {
                          const updated = [...content.hero.name.display]
                          updated[1] = e.target.value
                          onChangeContent({
                            ...content,
                            hero: { ...content.hero, name: { ...content.hero.name, display: updated } },
                          })
                        }}
                        className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                        placeholder="Line 2 (e.g. MUNSAR AHMED)"
                      />
                    </div>
                  )}

                  {selectedElement.id === 'hero-title' && (
                    <input
                      type="text"
                      value={content.hero.title || ''}
                      onChange={(e) =>
                        onChangeContent({
                          ...content,
                          hero: { ...content.hero, title: e.target.value },
                        })
                      }
                      className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                    />
                  )}

                  {selectedElement.id === 'hero-description' && (
                    <textarea
                      rows={4}
                      value={content.hero.description.text || ''}
                      onChange={(e) =>
                        onChangeContent({
                          ...content,
                          hero: {
                            ...content.hero,
                            description: { ...content.hero.description, text: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-sans text-slate-200"
                    />
                  )}
                </div>
              </div>
            )}

            {/* If Photo Element */}
            {isPhotoElement && (() => {
              const cropKey = activeDevice === 'mobile' ? 'mobileCrop' : activeDevice === 'tablet' ? 'tabletCrop' : 'desktopCrop'
              const currentCrop = content.hero.profilePhoto[cropKey] || content.hero.profilePhoto.desktopCrop

              return (
                <div className="space-y-4">
                  <div className="p-3 bg-[#030507] border border-slate-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase block">
                        Photo Controls ({activeDevice})
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{cropKey}</span>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 mb-1 block">
                        Image Path / URL
                      </label>
                      <input
                        type="text"
                        value={content.hero.profilePhoto.path || ''}
                        onChange={(e) =>
                          onChangeContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              profilePhoto: { ...content.hero.profilePhoto, path: e.target.value },
                            },
                          })
                        }
                        className="w-full bg-[#080B10] border border-slate-800 rounded px-2 py-1 text-slate-300 font-mono text-[11px]"
                      />
                    </div>

                    {/* Zoom Scale */}
                    <div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>Zoom / Scale</span>
                        <span className="text-cyan-300">{currentCrop?.scale || 1}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.05"
                        value={currentCrop?.scale || 1}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value)
                          onChangeContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              profilePhoto: {
                                ...content.hero.profilePhoto,
                                [cropKey]: {
                                  ...currentCrop,
                                  scale: val,
                                },
                              },
                            },
                          })
                        }}
                        className="w-full accent-cyan-400"
                      />
                    </div>

                    {/* X and Y Crop Positioning */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block mb-1">
                          X Offset ({currentCrop?.x ?? 50}%)
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={currentCrop?.x ?? 50}
                          onChange={(e) => {
                            const val = parseInt(e.target.value)
                            onChangeContent({
                              ...content,
                              hero: {
                                ...content.hero,
                                profilePhoto: {
                                  ...content.hero.profilePhoto,
                                  [cropKey]: {
                                    ...currentCrop,
                                    x: val,
                                  },
                                },
                              },
                            })
                          }}
                          className="w-full accent-cyan-400"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block mb-1">
                          Y Offset ({currentCrop?.y ?? 45}%)
                        </span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={currentCrop?.y ?? 45}
                          onChange={(e) => {
                            const val = parseInt(e.target.value)
                            onChangeContent({
                              ...content,
                              hero: {
                                ...content.hero,
                                profilePhoto: {
                                  ...content.hero.profilePhoto,
                                  [cropKey]: {
                                    ...currentCrop,
                                    y: val,
                                  },
                                },
                              },
                            })
                          }}
                          className="w-full accent-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* General Custom Attribute Tag */}
            <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-slate-800 rounded-xl space-y-2">
              <span className="text-[11px] font-mono text-slate-300 font-bold block">
                Visual State Overview
              </span>
              <p className="text-slate-400 text-[11px]">
                Currently editing in <strong className="text-cyan-400">{activeDevice}</strong> mode. All changes update the preview immediately.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: LAYOUT & UNIVERSAL SPACING */}
        {activeTab === 'layout' && (
          <div className="space-y-5">
            {/* Box Model Diagram */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                  Visual Box Model
                </span>
                <span className="text-[10px] font-mono text-cyan-400">MARGIN &rarr; BORDER &rarr; PADDING</span>
              </div>

              {/* Interactive SVG / Styled Box Diagram */}
              <div className="p-3 bg-[#030507] border border-slate-800 rounded-2xl flex flex-col items-center">
                {/* Margin layer (Outer) */}
                <div className="w-full max-w-[280px] bg-amber-500/10 border border-amber-500/30 rounded-xl p-2 relative">
                  <span className="absolute top-1 left-2 text-[9px] font-mono text-amber-400 font-bold uppercase">
                    Margin
                  </span>

                  {/* Top Margin Input */}
                  <div className="flex justify-center mb-1">
                    <input
                      type="text"
                      value={targetStyles.margin?.top || '0px'}
                      onChange={(e) => updateSpacing('margin', 'top', e.target.value)}
                      className="w-14 bg-black/80 border border-amber-500/40 rounded px-1 text-center font-mono text-[10px] text-amber-300"
                    />
                  </div>

                  {/* Middle row: Left Margin, Padding Container, Right Margin */}
                  <div className="flex items-center justify-between gap-1">
                    <input
                      type="text"
                      value={targetStyles.margin?.left || '0px'}
                      onChange={(e) => updateSpacing('margin', 'left', e.target.value)}
                      className="w-12 bg-black/80 border border-amber-500/40 rounded px-1 text-center font-mono text-[10px] text-amber-300"
                    />

                    {/* Padding layer (Inner) */}
                    <div className="flex-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-2 relative mx-1">
                      <span className="absolute top-1 left-2 text-[9px] font-mono text-cyan-400 font-bold uppercase">
                        Padding
                      </span>

                      {/* Top Padding */}
                      <div className="flex justify-center mb-1">
                        <input
                          type="text"
                          value={targetStyles.padding?.top || '0px'}
                          onChange={(e) => updateSpacing('padding', 'top', e.target.value)}
                          className="w-12 bg-black/80 border border-cyan-500/40 rounded px-1 text-center font-mono text-[10px] text-cyan-300"
                        />
                      </div>

                      {/* Middle row: Left, Center Content, Right */}
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={targetStyles.padding?.left || '0px'}
                          onChange={(e) => updateSpacing('padding', 'left', e.target.value)}
                          className="w-10 bg-black/80 border border-cyan-500/40 rounded px-1 text-center font-mono text-[10px] text-cyan-300"
                        />
                        <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-slate-300">
                          Content
                        </div>
                        <input
                          type="text"
                          value={targetStyles.padding?.right || '0px'}
                          onChange={(e) => updateSpacing('padding', 'right', e.target.value)}
                          className="w-10 bg-black/80 border border-cyan-500/40 rounded px-1 text-center font-mono text-[10px] text-cyan-300"
                        />
                      </div>

                      {/* Bottom Padding */}
                      <div className="flex justify-center mt-1">
                        <input
                          type="text"
                          value={targetStyles.padding?.bottom || '0px'}
                          onChange={(e) => updateSpacing('padding', 'bottom', e.target.value)}
                          className="w-12 bg-black/80 border border-cyan-500/40 rounded px-1 text-center font-mono text-[10px] text-cyan-300"
                        />
                      </div>
                    </div>

                    <input
                      type="text"
                      value={targetStyles.margin?.right || '0px'}
                      onChange={(e) => updateSpacing('margin', 'right', e.target.value)}
                      className="w-12 bg-black/80 border border-amber-500/40 rounded px-1 text-center font-mono text-[10px] text-amber-300"
                    />
                  </div>

                  {/* Bottom Margin */}
                  <div className="flex justify-center mt-1">
                    <input
                      type="text"
                      value={targetStyles.margin?.bottom || '0px'}
                      onChange={(e) => updateSpacing('margin', 'bottom', e.target.value)}
                      className="w-14 bg-black/80 border border-amber-500/40 rounded px-1 text-center font-mono text-[10px] text-amber-300"
                    />
                  </div>
                </div>

                {/* Linked controls toggles */}
                <div className="flex items-center gap-4 mt-3 text-[11px] font-mono text-slate-400">
                  <button
                    type="button"
                    onClick={() => setLinkedMargin(!linkedMargin)}
                    className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {linkedMargin ? <Link2 className="w-3.5 h-3.5 text-amber-400" /> : <Unlink2 className="w-3.5 h-3.5" />}
                    <span>Link Margin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLinkedPadding(!linkedPadding)}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {linkedPadding ? <Link2 className="w-3.5 h-3.5 text-cyan-400" /> : <Unlink2 className="w-3.5 h-3.5" />}
                    <span>Link Padding</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sizing: Width & Height */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-300 font-bold uppercase block">
                Dimensions & Constraints
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Width</label>
                  <input
                    type="text"
                    value={targetStyles.width || ''}
                    placeholder="e.g. 100%, 480px, auto"
                    onChange={(e) => updateStyle('width', e.target.value)}
                    className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Height</label>
                  <input
                    type="text"
                    value={targetStyles.height || ''}
                    placeholder="e.g. 80px, 100vh, auto"
                    onChange={(e) => updateStyle('height', e.target.value)}
                    className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Max Width</label>
                  <input
                    type="text"
                    value={targetStyles.maxWidth || ''}
                    placeholder="e.g. 1360px"
                    onChange={(e) => updateStyle('maxWidth', e.target.value)}
                    className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Min Height</label>
                  <input
                    type="text"
                    value={targetStyles.minHeight || ''}
                    placeholder="e.g. 100vh"
                    onChange={(e) => updateStyle('minHeight', e.target.value)}
                    className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Layout Display & Flex / Grid */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-300 font-bold uppercase block">
                Display & Flow
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Display</label>
                  <select
                    value={targetStyles.display || 'inherit'}
                    onChange={(e) => updateStyle('display', e.target.value)}
                    className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                  >
                    <option value="inherit">Inherit</option>
                    <option value="block">Block</option>
                    <option value="flex">Flex</option>
                    <option value="grid">Grid</option>
                    <option value="inline-block">Inline Block</option>
                    <option value="none">None (Hidden)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-0.5">Gap</label>
                  <input
                    type="text"
                    value={targetStyles.gap || ''}
                    placeholder="e.g. 16px, 1.5rem"
                    onChange={(e) => updateStyle('gap', e.target.value)}
                    className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">Font Family</label>
              <select
                value={targetStyles.fontFamily || ''}
                onChange={(e) => updateStyle('fontFamily', e.target.value)}
                className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              >
                <option value="">Default Theme Font</option>
                <option value="'Space Grotesk', sans-serif">Space Grotesk (Display)</option>
                <option value="'Inter', sans-serif">Inter (Modern Clean)</option>
                <option value="'Space Mono', monospace">Space Mono (Terminal)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">Font Size</label>
                <input
                  type="text"
                  value={targetStyles.fontSize || ''}
                  placeholder="e.g. 32px, 2rem"
                  onChange={(e) => updateStyle('fontSize', e.target.value)}
                  className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">Font Weight</label>
                <select
                  value={targetStyles.fontWeight || ''}
                  onChange={(e) => updateStyle('fontWeight', e.target.value)}
                  className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                >
                  <option value="">Default</option>
                  <option value="300">300 (Light)</option>
                  <option value="400">400 (Regular)</option>
                  <option value="500">500 (Medium)</option>
                  <option value="600">600 (Semibold)</option>
                  <option value="700">700 (Bold)</option>
                  <option value="800">800 (Extrabold)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">Letter Spacing</label>
                <input
                  type="text"
                  value={targetStyles.letterSpacing || ''}
                  placeholder="e.g. 0.08em"
                  onChange={(e) => updateStyle('letterSpacing', e.target.value)}
                  className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">Line Height</label>
                <input
                  type="text"
                  value={targetStyles.lineHeight || ''}
                  placeholder="e.g. 1.2, 1.5"
                  onChange={(e) => updateStyle('lineHeight', e.target.value)}
                  className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={targetStyles.textColor || '#F5F8FA'}
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                  className="w-8 h-8 rounded border border-slate-800 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={targetStyles.textColor || ''}
                  placeholder="e.g. #00D9FF, rgba(...)"
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                  className="flex-1 bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: APPEARANCE */}
        {activeTab === 'appearance' && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                <span>Opacity</span>
                <span className="text-cyan-400">{targetStyles.opacity ?? 1}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={targetStyles.opacity ?? 1}
                onChange={(e) => updateStyle('opacity', parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">Corner Radius</label>
              <input
                type="text"
                value={targetStyles.borderRadius || ''}
                placeholder="e.g. 16px, 9999px"
                onChange={(e) => updateStyle('borderRadius', e.target.value)}
                className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">Backdrop Blur / Glass</label>
              <input
                type="text"
                value={targetStyles.backdropFilter || ''}
                placeholder="e.g. blur(16px) saturate(140%)"
                onChange={(e) => updateStyle('backdropFilter', e.target.value)}
                className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
              />
            </div>
          </div>
        )}

        {/* TAB 5: BACKGROUND */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">Solid Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={targetStyles.backgroundColor || '#060A10'}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="w-8 h-8 rounded border border-slate-800 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={targetStyles.backgroundColor || ''}
                  placeholder="e.g. rgba(6, 10, 16, 0.85)"
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="flex-1 bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">Gradient Background</label>
              <input
                type="text"
                value={targetStyles.backgroundGradient || ''}
                placeholder="e.g. linear-gradient(135deg, rgba(0,217,255,0.1), transparent)"
                onChange={(e) => updateStyle('backgroundGradient', e.target.value)}
                className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
              />
            </div>
          </div>
        )}

        {/* TAB 6: BORDER */}
        {activeTab === 'border' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">Border Width</label>
                <input
                  type="text"
                  value={targetStyles.borderWidth || ''}
                  placeholder="e.g. 1px, 2px"
                  onChange={(e) => updateStyle('borderWidth', e.target.value)}
                  className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-slate-400 mb-0.5 block">Border Style</label>
                <select
                  value={targetStyles.borderStyle || 'solid'}
                  onChange={(e) => updateStyle('borderStyle', e.target.value)}
                  className="w-full bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">Border Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={targetStyles.borderColor || '#00D9FF'}
                  onChange={(e) => updateStyle('borderColor', e.target.value)}
                  className="w-8 h-8 rounded border border-slate-800 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={targetStyles.borderColor || ''}
                  placeholder="e.g. rgba(0, 217, 255, 0.3)"
                  onChange={(e) => updateStyle('borderColor', e.target.value)}
                  className="flex-1 bg-[#030507] border border-slate-800 rounded px-2 py-1 font-mono text-slate-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SHADOW */}
        {activeTab === 'shadow' && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">Box Shadow</label>
              <textarea
                rows={3}
                value={targetStyles.boxShadow || ''}
                placeholder="e.g. 0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 217, 255, 0.2)"
                onChange={(e) => updateStyle('boxShadow', e.target.value)}
                className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 block">Presets</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'None', val: 'none' },
                  { label: 'Cyan Glow', val: '0 0 24px rgba(0, 217, 255, 0.4)' },
                  { label: 'Cinematic Void', val: '0 24px 60px rgba(0, 0, 0, 0.8)' },
                  { label: 'Subtle Glass', val: '0 8px 32px rgba(0, 0, 0, 0.35)' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => updateStyle('boxShadow', preset.val)}
                    className="text-[10px] font-mono px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: ANIMATION & 3D */}
        {activeTab === 'animation' && (
          <div className="space-y-4">
            <div className="p-3 bg-[#030507] border border-slate-800 rounded-xl space-y-3">
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase block">
                3D World & Cinematic Presets
              </span>

              <div className="grid grid-cols-2 gap-1.5">
                {(['cinematic', 'balanced', 'minimal', 'performance'] as const).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() =>
                      onChangeContent({
                        ...content,
                        animation: { ...content.animation, preset },
                      })
                    }
                    className={`p-2 rounded border font-mono text-[10px] uppercase font-bold transition-all cursor-pointer ${
                      content.animation.preset === preset
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                        : 'border-slate-800 bg-black/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Particle Density</span>
                  <span className="text-cyan-300">{content.animation.particleDensity}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="8000"
                  step="250"
                  value={content.animation.particleDensity}
                  onChange={(e) =>
                    onChangeContent({
                      ...content,
                      animation: { ...content.animation, particleDensity: parseInt(e.target.value) },
                    })
                  }
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Glow Intensity</span>
                  <span className="text-cyan-300">{content.animation.glowIntensity}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.1"
                  value={content.animation.glowIntensity}
                  onChange={(e) =>
                    onChangeContent({
                      ...content,
                      animation: { ...content.animation, glowIntensity: parseFloat(e.target.value) },
                    })
                  }
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: RESPONSIVE */}
        {activeTab === 'responsive' && (
          <div className="space-y-4">
            <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-slate-800 rounded-xl space-y-2">
              <span className="text-[11px] font-mono text-slate-300 font-bold uppercase block">
                Breakpoint Overrides
              </span>
              <p className="text-slate-400 text-[11px]">
                Currently previewing on <strong className="text-cyan-400">{activeDevice}</strong>.
                Styles set while in tablet or mobile mode create specific media query overrides without breaking desktop layout.
              </p>
            </div>
          </div>
        )}

        {/* TAB 10: ADVANCED */}
        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">CSS Transform</label>
              <input
                type="text"
                value={targetStyles.transform || ''}
                placeholder="e.g. translateY(-4px) scale(1.02)"
                onChange={(e) => updateStyle('transform', e.target.value)}
                className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-300 mb-1 block">CSS Transition</label>
              <input
                type="text"
                value={targetStyles.transition || ''}
                placeholder="e.g. all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                onChange={(e) => updateStyle('transition', e.target.value)}
                className="w-full bg-[#030507] border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
              />
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={resetElementStyles}
                className="w-full py-2 px-3 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Custom Styles on This Element</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
