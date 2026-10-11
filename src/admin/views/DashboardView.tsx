import React from 'react'
import type { PortfolioContent } from '@/types/content.ts'
import type { AdminTab } from '../types.ts'
import {
  Sparkles,
  Type,
  Camera,
  FolderGit2,
  FileText,
  Palette,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Globe,
  UploadCloud,
  Layers,
} from 'lucide-react'

interface DashboardViewProps {
  content: PortfolioContent
  setCurrentTab: (tab: AdminTab) => void
  onOpenPublishModal: () => void
  saveStatus?: { status: string; lastSaved?: string }
}

export function DashboardView({
  content,
  setCurrentTab,
  onOpenPublishModal,
  saveStatus,
}: DashboardViewProps) {
  const publishedDate = content.lastPublished
    ? new Date(content.lastPublished).toLocaleString()
    : 'Never'
  const updatedDate = content.lastUpdated
    ? new Date(content.lastUpdated).toLocaleString()
    : 'Just now'

  // Real verifiable asset checks
  const missingAssets: string[] = []
  if (!content.hero.profilePhoto?.path) {
    missingAssets.push('Hero profile image reference is missing')
  }
  if (!content.resume.path) {
    missingAssets.push('Downloadable resume PDF path is missing')
  }
  if (content.projects.length === 0) {
    missingAssets.push('No portfolio projects added')
  }

  const QUICK_ACTIONS = [
    {
      id: 'hero' as AdminTab,
      title: 'Edit Hero',
      desc: 'Name, headings, role badge, intro statement & CTAs',
      icon: Sparkles,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400',
    },
    {
      id: 'typography' as AdminTab,
      title: 'Edit Typography',
      desc: 'Font sizes, weights, line heights, letter spacing & margins',
      icon: Type,
      color: 'from-blue-500/20 to-violet-500/20 text-blue-400',
    },
    {
      id: 'photo-studio' as AdminTab,
      title: 'Manage Photos',
      desc: 'Crop, zoom, rotate & reposition portraits for all breakpoints',
      icon: Camera,
      color: 'from-violet-500/20 to-purple-500/20 text-violet-400',
    },
    {
      id: 'projects' as AdminTab,
      title: 'Manage Projects',
      desc: 'Add, reorder, feature, and edit project showcases and links',
      icon: FolderGit2,
      color: 'from-cyan-500/20 to-emerald-500/20 text-cyan-400',
    },
    {
      id: 'resume' as AdminTab,
      title: 'Update Resume',
      desc: 'Upload replacement PDF, inspect preview & trigger ATS build',
      icon: FileText,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    },
    {
      id: 'theme' as AdminTab,
      title: 'Customize Theme',
      desc: 'Backgrounds, accents, liquid glass blur & contrast checks',
      icon: Palette,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Welcome Header */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-300 uppercase tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Studio Workspace Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F8FA] tracking-tight uppercase font-mono">
              Portfolio Studio
            </h1>
            <p className="text-[#A8B4C2] text-sm mt-1.5 max-w-xl leading-relaxed">
              Manage your content, visuals, and cinematic experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCurrentTab('page-builder')}
              className="px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-[rgba(255,255,255,0.12)] text-xs font-mono text-[#F5F8FA] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Page Builder</span>
            </button>
            <button
              type="button"
              onClick={onOpenPublishModal}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,217,255,0.2)] flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Publish Changes</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-[rgba(255,255,255,0.08)] text-[#A8B4C2] hover:text-[#F5F8FA] transition-colors"
              title="Open public website"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Website Status Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Publication Status Card */}
        <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#8491A2]">
            <span>PUBLICATION STATUS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-semibold text-[#F5F8FA] font-mono">
            Live on Public Portfolio
          </div>
          <div className="text-xs text-[#8491A2] font-mono flex items-center gap-1.5 pt-1 border-t border-[rgba(255,255,255,0.06)]">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span className="truncate">Published: {publishedDate}</span>
          </div>
        </div>

        {/* Draft Synchronization Card */}
        <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#8491A2]">
            <span>DRAFT STATUS</span>
            <span
              className={`w-2 h-2 rounded-full ${
                saveStatus?.status === 'unsaved' ? 'bg-amber-400 animate-pulse' : 'bg-cyan-400'
              }`}
            />
          </div>
          <div className="text-sm font-semibold text-[#F5F8FA] font-mono">
            {saveStatus?.status === 'unsaved' ? 'Unsaved Draft Changes' : 'Draft Saved & Synchronized'}
          </div>
          <div className="text-xs text-[#8491A2] font-mono flex items-center gap-1.5 pt-1 border-t border-[rgba(255,255,255,0.06)]">
            <Clock className="w-3 h-3 text-[#8491A2]" />
            <span className="truncate">Last Saved: {updatedDate}</span>
          </div>
        </div>

        {/* System & Session Card */}
        <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#8491A2]">
            <span>SESSION & SECURITY</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-sm font-semibold text-[#F5F8FA] font-mono">
            Protected Admin Session
          </div>
          <div className="text-xs text-[#8491A2] font-mono flex items-center gap-1.5 pt-1 border-t border-[rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>HttpOnly &amp; Rate-Limiting Active</span>
          </div>
        </div>
      </div>

      {/* Asset Validation Warnings (if any) */}
      {missingAssets.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-amber-200 text-xs font-mono">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-amber-300">Validation Notice:</div>
            <ul className="list-disc list-inside space-y-0.5 text-amber-200/80">
              {missingAssets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#8491A2] font-semibold">
            Quick Actions
          </h2>
          <span className="text-[11px] font-mono text-[#8491A2]/70">
            Open dedicated functional editor
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => setCurrentTab(action.id)}
                className="p-4 rounded-xl bg-[#10151D] hover:bg-[#151C26] border border-[rgba(255,255,255,0.08)] hover:border-cyan-500/30 text-left transition-all group flex flex-col justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-lg bg-gradient-to-br ${action.color} border border-white/5 flex items-center justify-center`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8491A2] group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </div>

                <div>
                  <div className="text-xs font-mono font-bold text-[#F5F8FA] group-hover:text-cyan-300 transition-colors">
                    {action.title}
                  </div>
                  <div className="text-[11px] text-[#8491A2] font-sans mt-0.5 leading-relaxed">
                    {action.desc}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
