import React, { useState } from 'react'
import type { PortfolioContent } from '@/types/content.ts'
import type { DeviceMode, SelectedElementInfo } from '../types.ts'
import { LayersPanel } from '../components/LayersPanel.tsx'
import { VisualEditorCanvas } from '../components/VisualEditorCanvas.tsx'
import { PropertyInspector } from '../components/PropertyInspector.tsx'
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Layers,
  Sliders,
} from 'lucide-react'

interface VisualEditorViewProps {
  content: PortfolioContent
  deviceMode: DeviceMode
  setDeviceMode: (mode: DeviceMode) => void
  onChange: (updated: PortfolioContent) => void
}

export function VisualEditorView({
  content,
  deviceMode,
  setDeviceMode,
  onChange,
}: VisualEditorViewProps) {
  const [selectedElement, setSelectedElement] = useState<SelectedElementInfo | null>({
    id: 'hero-heading',
    name: 'Full Name Heading',
    type: 'heading',
    breadcrumbs: ['Home', 'Hero Section', 'Full Name Heading'],
  })

  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true)
  const [isSelectionMode, setIsSelectionMode] = useState(true)

  // Drawer states for smaller screens
  const [mobileDrawer, setMobileDrawer] = useState<'none' | 'layers' | 'inspector'>('none')

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#030507] relative">
      {/* Mobile Drawer Bar (shown only on small screens) */}
      <div className="flex lg:hidden items-center justify-between px-3 py-2 bg-[#080B10] border-b border-slate-800 text-xs font-mono">
        <button
          type="button"
          onClick={() => setMobileDrawer(mobileDrawer === 'layers' ? 'none' : 'layers')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
            mobileDrawer === 'layers'
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
              : 'border-slate-800 text-slate-300 bg-black/40'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Layers Tree</span>
        </button>

        <span className="text-[10px] text-slate-500 uppercase">
          {selectedElement?.name || 'Visual Editor'}
        </span>

        <button
          type="button"
          onClick={() => setMobileDrawer(mobileDrawer === 'inspector' ? 'none' : 'inspector')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
            mobileDrawer === 'inspector'
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
              : 'border-slate-800 text-slate-300 bg-black/40'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Properties</span>
        </button>
      </div>

      {/* Main 3-Column Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT PANEL: Layers & Structure */}
        <aside
          className={`hidden lg:flex flex-col h-full transition-all duration-300 z-10 ${
            isLeftPanelOpen ? 'w-[280px] xl:w-[320px]' : 'w-0 overflow-hidden'
          }`}
        >
          <LayersPanel
            content={content}
            selectedElement={selectedElement}
            onSelectElement={(el) => setSelectedElement(el)}
            onUpdateContent={onChange}
          />
        </aside>

        {/* Left Panel Toggle Tab */}
        <button
          type="button"
          onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
          title={isLeftPanelOpen ? 'Collapse Layers Panel' : 'Expand Layers Panel'}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-[#080B10] border border-slate-800 rounded-r-lg text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          style={{ left: isLeftPanelOpen ? '280px' : '0' }}
        >
          {isLeftPanelOpen ? <PanelLeftClose className="w-3.5 h-3.5" /> : <PanelLeftOpen className="w-3.5 h-3.5" />}
        </button>

        {/* CENTER PANEL: Interactive Canvas Preview */}
        <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          <VisualEditorCanvas
            content={content}
            deviceMode={deviceMode}
            setDeviceMode={setDeviceMode}
            selectedElement={selectedElement}
            onSelectElement={(el) => setSelectedElement(el)}
            isSelectionMode={isSelectionMode}
            setIsSelectionMode={setIsSelectionMode}
          />
        </main>

        {/* Right Panel Toggle Tab */}
        <button
          type="button"
          onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
          title={isRightPanelOpen ? 'Collapse Property Inspector' : 'Expand Property Inspector'}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-[#080B10] border border-slate-800 rounded-l-lg text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          style={{ right: isRightPanelOpen ? '340px' : '0' }}
        >
          {isRightPanelOpen ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
        </button>

        {/* RIGHT PANEL: Universal Property Inspector */}
        <aside
          className={`hidden lg:flex flex-col h-full transition-all duration-300 z-10 ${
            isRightPanelOpen ? 'w-[340px] xl:w-[380px]' : 'w-0 overflow-hidden'
          }`}
        >
          <PropertyInspector
            content={content}
            selectedElement={selectedElement}
            activeDevice={deviceMode}
            onChangeContent={onChange}
          />
        </aside>

        {/* MOBILE DRAWER: Layers */}
        {mobileDrawer === 'layers' && (
          <div className="lg:hidden absolute inset-0 z-30 bg-[#080B10] flex flex-col">
            <div className="flex justify-end p-2 border-b border-slate-800">
              <button
                type="button"
                onClick={() => setMobileDrawer('none')}
                className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              >
                Done
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <LayersPanel
                content={content}
                selectedElement={selectedElement}
                onSelectElement={(el) => {
                  setSelectedElement(el)
                  setMobileDrawer('none')
                }}
                onUpdateContent={onChange}
              />
            </div>
          </div>
        )}

        {/* MOBILE DRAWER: Inspector */}
        {mobileDrawer === 'inspector' && (
          <div className="lg:hidden absolute inset-0 z-30 bg-[#080B10] flex flex-col">
            <div className="flex justify-end p-2 border-b border-slate-800">
              <button
                type="button"
                onClick={() => setMobileDrawer('none')}
                className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-cyan-300"
              >
                Done
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <PropertyInspector
                content={content}
                selectedElement={selectedElement}
                activeDevice={deviceMode}
                onChangeContent={onChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
