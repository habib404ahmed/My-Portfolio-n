import React, { useRef, useEffect, useState, useCallback } from 'react'
import type { DeviceMode, SelectedElementInfo } from '../types.ts'
import type { PortfolioContent } from '@/types/content.ts'
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  ExternalLink,
  MousePointer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
} from 'lucide-react'

interface VisualEditorCanvasProps {
  content: PortfolioContent
  deviceMode: DeviceMode
  setDeviceMode: (mode: DeviceMode) => void
  selectedElement: SelectedElementInfo | null
  onSelectElement: (el: SelectedElementInfo) => void
  isSelectionMode: boolean
  setIsSelectionMode: (enabled: boolean) => void
}

const DEVICE_WIDTHS: Record<DeviceMode, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
}

export function VisualEditorCanvas({
  content,
  deviceMode,
  setDeviceMode,
  selectedElement,
  onSelectElement,
  isSelectionMode,
  setIsSelectionMode,
}: VisualEditorCanvasProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)
  const [zoom, setZoom] = useState(100)

  // Send real-time updates to iframe on draft content changes
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow && iframeLoaded) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'PORTFOLIO_DRAFT_UPDATE',
          content,
        },
        '*'
      )
    }
  }, [content, iframeLoaded])

  // Sync selection mode with iframe
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow && iframeLoaded) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'SET_SELECTION_MODE',
          enabled: isSelectionMode,
        },
        '*'
      )
    }
  }, [isSelectionMode, iframeLoaded])

  // Sync selected element id with iframe
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow && iframeLoaded && selectedElement) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'SELECT_ELEMENT_BY_ID',
          elementId: selectedElement.id,
        },
        '*'
      )
    }
  }, [selectedElement, iframeLoaded])

  // Listen for ELEMENT_SELECTED clicks from inside iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'ELEMENT_SELECTED') {
        const { elementId, tagName, textContent } = event.data
        let readableName = elementId
          .replace(/-/g, ' ')
          .replace(/section/g, 'scene')
          .toUpperCase()

        onSelectElement({
          id: elementId,
          name: readableName,
          type: (tagName || 'custom').toLowerCase(),
          breadcrumbs: ['Home', readableName],
        })
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onSelectElement])

  const handleRefresh = () => {
    setIframeLoaded(false)
    setPreviewKey((k) => k + 1)
  }

  return (
    <div className="flex-1 h-full bg-[#030507] flex flex-col items-center justify-start overflow-hidden relative">
      {/* Canvas Top Bar */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-[rgba(255,255,255,0.02)] border-b border-slate-800 text-xs font-mono text-slate-400">
        {/* Device Mode Switcher */}
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              deviceMode === 'desktop'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(0,217,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              deviceMode === 'tablet'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(0,217,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              deviceMode === 'mobile'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(0,217,255,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* SELECT TO EDIT Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSelectionMode(!isSelectionMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isSelectionMode
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_16px_rgba(0,217,255,0.3)]'
                : 'bg-black/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <MousePointer className={`w-3.5 h-3.5 ${isSelectionMode ? 'text-cyan-400 animate-bounce' : ''}`} />
            <span className="tracking-wider uppercase text-[11px]">
              {isSelectionMode ? 'SELECT TO EDIT: ON' : 'SELECT TO EDIT: OFF'}
            </span>
          </button>
        </div>

        {/* Zoom & Utilities */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg border border-slate-800 text-[10px]">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="hover:text-white"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="w-8 text-center">{zoom}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
              className="hover:text-white"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            title="Reload preview"
            className="p-1.5 hover:text-white text-slate-400 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <a
            href="/?preview=draft"
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new window"
            className="p-1.5 hover:text-cyan-400 text-slate-400 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 w-full flex items-center justify-center p-3 sm:p-5 overflow-auto custom-scrollbar relative">
        <div
          className="h-full rounded-2xl bg-black border border-slate-800/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative transition-all duration-300 overflow-hidden flex flex-col"
          style={{
            width: DEVICE_WIDTHS[deviceMode],
            transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
            transformOrigin: 'top center',
          }}
        >
          <iframe
            key={previewKey}
            ref={iframeRef}
            src="/?preview=draft"
            title="Portfolio Live Visual Preview"
            onLoad={() => setIframeLoaded(true)}
            className="w-full flex-1 border-0 rounded-2xl bg-[#030507]"
          />

          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#030507]/90 text-cyan-400 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Loading Interactive Live Canvas...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
