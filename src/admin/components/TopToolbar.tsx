import React from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Save,
  Globe,
  UploadCloud,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sliders,
  Menu,
} from 'lucide-react'
import type { DeviceMode, SaveStatusState, AdminTab } from '../types.ts'

interface TopToolbarProps {
  currentTab: AdminTab
  deviceMode: DeviceMode
  setDeviceMode: (mode: DeviceMode) => void
  saveStatus: SaveStatusState
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onSaveDraft: () => void
  onOpenPublishModal: () => void
  onRefreshPreview: () => void
  onToggleInspector: () => void
  isInspectorOpen: boolean
  onLogout: () => void
  username: string
  onToggleMobileNav?: () => void
  isFullWidthView?: boolean
}

const TAB_TITLES: Record<AdminTab, string> = {
  'visual-editor': 'Universal Visual Editor',
  dashboard: 'Dashboard',
  'page-builder': 'Page Builder',
  hero: 'Hero Section',
  about: 'About & Profile',
  typography: 'Typography & Spacing',
  'photo-studio': 'Photo Studio',
  animation: '3D & Animation',
  'tech-stack': 'Tech Stack',
  capabilities: 'Capabilities Matrix',
  education: 'Education',
  projects: 'Projects Manager',
  journey: 'Journey & Milestones',
  certifications: 'Certifications',
  resume: 'Resume Manager',
  contact: 'Contact & Socials',
  navigation: 'Navigation Bar',
  theme: 'Theme & Colors',
  seo: 'SEO & Metadata',
  'media-library': 'Media Library',
  versions: 'Version History',
  settings: 'Settings',
}

export function TopToolbar({
  currentTab,
  deviceMode,
  setDeviceMode,
  saveStatus,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSaveDraft,
  onOpenPublishModal,
  onRefreshPreview,
  onToggleInspector,
  isInspectorOpen,
  onLogout,
  username,
  onToggleMobileNav,
  isFullWidthView = false,
}: TopToolbarProps) {
  const currentTitle = TAB_TITLES[currentTab] || currentTab

  return (
    <header className="h-14 w-full bg-[#0A0D12]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.09)] px-3 sm:px-5 flex items-center justify-between gap-3 z-40 select-none text-[#F5F8FA] sticky top-0">
      {/* Left: Mobile Menu + Breadcrumb Identifier */}
      <div className="flex items-center gap-2.5 min-w-0">
        {onToggleMobileNav && (
          <button
            type="button"
            onClick={onToggleMobileNav}
            aria-label="Open navigation menu"
            className="lg:hidden p-1.5 rounded-lg text-[#8491A2] hover:text-[#F5F8FA] hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2 min-w-0">
          <span className="hidden sm:inline text-xs font-mono text-[#8491A2]">Studio</span>
          <span className="hidden sm:inline text-xs font-mono text-[#8491A2]/60">/</span>
          <h2 className="text-xs sm:text-sm font-semibold tracking-wide text-[#F5F8FA] uppercase font-mono truncate">
            {currentTitle}
          </h2>
        </div>
      </div>

      {/* Center: Device Viewport Switcher & History Undo/Redo (Hidden in full-width tools) */}
      {!isFullWidthView && (
        <div className="hidden md:flex items-center gap-2">
          {/* Device Switcher */}
          <div className="flex items-center bg-white/[0.03] border border-[rgba(255,255,255,0.08)] rounded-lg p-0.5 gap-0.5">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              title="Desktop View (100% / 1440px)"
              aria-label="Desktop preview"
              className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceMode === 'desktop'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-[#8491A2] hover:text-[#F5F8FA]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('tablet')}
              title="Tablet View (768px)"
              aria-label="Tablet preview"
              className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceMode === 'tablet'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-[#8491A2] hover:text-[#F5F8FA]'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              title="Mobile View (390px)"
              aria-label="Mobile preview"
              className={`px-2 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                deviceMode === 'mobile'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-[#8491A2] hover:text-[#F5F8FA]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px]">Mobile</span>
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center bg-white/[0.03] border border-[rgba(255,255,255,0.08)] rounded-lg p-0.5 gap-0.5">
            <button
              type="button"
              disabled={!canUndo}
              onClick={onUndo}
              title="Undo edit (Ctrl+Z)"
              aria-label="Undo"
              className="p-1.5 rounded text-[#8491A2] hover:text-[#F5F8FA] disabled:opacity-25 disabled:hover:text-[#8491A2] transition-colors cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={!canRedo}
              onClick={onRedo}
              title="Redo edit (Ctrl+Y)"
              aria-label="Redo"
              className="p-1.5 rounded text-[#8491A2] hover:text-[#F5F8FA] disabled:opacity-25 disabled:hover:text-[#8491A2] transition-colors cursor-pointer"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Refresh Preview */}
          <button
            type="button"
            onClick={onRefreshPreview}
            title="Refresh preview canvas"
            aria-label="Refresh preview"
            className="p-1.5 rounded-lg bg-white/[0.03] border border-[rgba(255,255,255,0.08)] text-[#8491A2] hover:text-[#F5F8FA] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Inspector Panel Toggle */}
          <button
            type="button"
            onClick={onToggleInspector}
            title="Toggle Right Properties Inspector"
            aria-label="Toggle properties inspector"
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isInspectorOpen
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                : 'bg-white/[0.03] border-[rgba(255,255,255,0.08)] text-[#8491A2] hover:text-[#F5F8FA]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Right: Save Status, Actions & Links */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Save Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-[rgba(255,255,255,0.08)] text-xs font-mono">
          {saveStatus.status === 'saving' && (
            <>
              <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
              <span className="text-cyan-300 text-[11px]">Saving...</span>
            </>
          )}
          {saveStatus.status === 'unsaved' && (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 text-[11px]">Unsaved</span>
            </>
          )}
          {saveStatus.status === 'saved' && (
            <>
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300 text-[11px]">Saved</span>
            </>
          )}
          {saveStatus.status === 'publishing' && (
            <>
              <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
              <span className="text-cyan-300 text-[11px]">Publishing...</span>
            </>
          )}
          {saveStatus.status === 'published' && (
            <>
              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-300 text-[11px]">Published</span>
            </>
          )}
          {saveStatus.status === 'error' && (
            <>
              <AlertCircle className="w-3 h-3 text-red-400" />
              <span className="text-red-300 text-[11px]">Save Failed</span>
            </>
          )}
          {saveStatus.status === 'clean' && (
            <>
              <CheckCircle2 className="w-3 h-3 text-[#8491A2]" />
              <span className="text-[#8491A2] text-[11px]">Synced</span>
            </>
          )}
        </div>

        {/* Save Draft Button */}
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={saveStatus.status === 'saving'}
          title="Save current draft (Ctrl+S)"
          className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-[rgba(255,255,255,0.12)] text-xs font-mono text-[#F5F8FA] flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40"
        >
          <Save className="w-3.5 h-3.5 text-[#A8B4C2]" />
          <span className="hidden md:inline">Save Draft</span>
        </button>

        {/* Publish Changes Button */}
        <button
          type="button"
          onClick={onOpenPublishModal}
          title="Publish current draft live to public visitors"
          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,217,255,0.2)] cursor-pointer"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Publish</span>
        </button>

        {/* View Public Live Site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="Open live public portfolio in new tab"
          className="p-1.5 rounded-lg bg-white/[0.03] border border-[rgba(255,255,255,0.08)] text-[#8491A2] hover:text-cyan-300 transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  )
}
