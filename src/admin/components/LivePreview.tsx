import React, { useRef, useEffect, useState } from 'react'
import type { DeviceMode } from '../types.ts'
import type { PortfolioContent } from '@/types/content.ts'
import { ExternalLink, RefreshCw, Smartphone, Tablet, Monitor } from 'lucide-react'

interface LivePreviewProps {
  deviceMode: DeviceMode
  content: PortfolioContent
  onSelectSection?: (sectionId: string) => void
}

const DEVICE_WIDTHS: Record<DeviceMode, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
}

export function LivePreview({ deviceMode, content, onSelectSection }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)

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

  const handleRefresh = () => {
    setIframeLoaded(false)
    setPreviewKey((k) => k + 1)
  }

  return (
    <div className="flex-1 h-full bg-[#030507] flex flex-col items-center justify-start p-2 sm:p-4 overflow-hidden relative">
      {/* Device frame header bar */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 mb-2 bg-[rgba(255,255,255,0.03)] border border-slate-800 rounded-xl text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          {deviceMode === 'desktop' && <Monitor className="w-3.5 h-3.5 text-cyan-400" />}
          {deviceMode === 'tablet' && <Tablet className="w-3.5 h-3.5 text-cyan-400" />}
          {deviceMode === 'mobile' && <Smartphone className="w-3.5 h-3.5 text-cyan-400" />}
          <span className="text-slate-300 font-semibold uppercase">{deviceMode} Preview</span>
          <span className="text-slate-500">({DEVICE_WIDTHS[deviceMode]})</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            title="Reload preview iframe"
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <a
            href="/?preview=draft"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Draft in Full Window"
            className="p-1 hover:text-cyan-400 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div
        className="flex-1 w-full flex items-center justify-center overflow-auto rounded-2xl bg-black border border-slate-800/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative transition-all duration-300"
        style={{
          maxWidth: DEVICE_WIDTHS[deviceMode],
        }}
      >
        <iframe
          key={previewKey}
          ref={iframeRef}
          src="/?preview=draft"
          title="Portfolio Live Preview"
          onLoad={() => setIframeLoaded(true)}
          className="w-full h-full border-0 rounded-2xl transition-all bg-[#030507]"
        />

        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#030507]/90 text-cyan-400 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Initializing Live Cinematic Preview...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
