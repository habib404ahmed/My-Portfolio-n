import React from 'react'
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  User,
  Type,
  Camera,
  Box,
  Cpu,
  Workflow,
  GraduationCap,
  FolderGit2,
  Milestone,
  Award,
  FileText,
  Mail,
  Compass,
  Palette,
  Search,
  Image as ImageIcon,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from 'lucide-react'
import type { AdminTab } from '../types.ts'

interface SidebarProps {
  currentTab: AdminTab
  setCurrentTab: (tab: AdminTab) => void
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  isMobileOpen?: boolean
  setIsMobileOpen?: (open: boolean) => void
  onLogout: () => void
  username: string
}

interface NavItem {
  id: AdminTab
  label: string
  icon: React.ComponentType<{ className?: string }>
  group: 'Core' | 'Structure' | 'Sections' | 'Design' | 'Content' | 'System'
}

const NAV_ITEMS: NavItem[] = [
  { id: 'visual-editor', label: 'Visual Editor', icon: Sparkles, group: 'Core' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Core' },
  { id: 'page-builder', label: 'Page Builder', icon: Layers, group: 'Structure' },
  { id: 'navigation', label: 'Navigation', icon: Compass, group: 'Structure' },
  { id: 'hero', label: 'Hero Section', icon: Sparkles, group: 'Sections' },
  { id: 'about', label: 'About & Profile', icon: User, group: 'Sections' },
  { id: 'typography', label: 'Typography & Spacing', icon: Type, group: 'Design' },
  { id: 'photo-studio', label: 'Photo Studio', icon: Camera, group: 'Design' },
  { id: 'animation', label: '3D & Animation', icon: Box, group: 'Design' },
  { id: 'theme', label: 'Theme & Colors', icon: Palette, group: 'Design' },
  { id: 'tech-stack', label: 'Tech Stack', icon: Cpu, group: 'Content' },
  { id: 'capabilities', label: 'Capabilities', icon: Workflow, group: 'Content' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, group: 'Content' },
  { id: 'education', label: 'Education', icon: GraduationCap, group: 'Content' },
  { id: 'journey', label: 'Journey', icon: Milestone, group: 'Content' },
  { id: 'certifications', label: 'Certifications', icon: Award, group: 'Content' },
  { id: 'resume', label: 'Resume Manager', icon: FileText, group: 'Content' },
  { id: 'contact', label: 'Contact & Socials', icon: Mail, group: 'Content' },
  { id: 'media-library', label: 'Media Library', icon: ImageIcon, group: 'System' },
  { id: 'versions', label: 'Version History', icon: History, group: 'System' },
  { id: 'seo', label: 'SEO & Metadata', icon: Search, group: 'System' },
  { id: 'settings', label: 'Settings', icon: Settings, group: 'System' },
]

export function Sidebar({
  currentTab,
  setCurrentTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen = false,
  setIsMobileOpen,
  onLogout,
  username,
}: SidebarProps) {
  const handleNavClick = (tabId: AdminTab) => {
    setCurrentTab(tabId)
    if (setIsMobileOpen) {
      setIsMobileOpen(false)
    }
  }

  const handleLogoutClick = () => {
    if (confirm('Are you sure you want to log out of Portfolio Admin Studio?')) {
      onLogout()
    }
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0A0D12] border-r border-[rgba(255,255,255,0.09)] select-none">
      {/* Brand Header */}
      <div className="h-14 px-3.5 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold font-mono text-xs flex-shrink-0 shadow-[0_0_10px_rgba(0,217,255,0.15)]">
            PS
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <span className="font-mono text-xs font-bold text-[#F5F8FA] tracking-wider uppercase block truncate">
                Portfolio Studio
              </span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-tight block">
                ADMIN WORKSPACE
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:flex items-center">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="p-1 rounded-md text-[#8491A2] hover:text-[#F5F8FA] hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Close Button */}
        {setIsMobileOpen && (
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close navigation"
              className="p-1.5 rounded-lg text-[#8491A2] hover:text-[#F5F8FA] hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Nav Items List */}
      <nav
        className="flex-1 overflow-y-auto py-2.5 px-2 space-y-0.5 custom-scrollbar"
        aria-label="Admin Navigation"
      >
        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon
          const isActive = currentTab === item.id
          const showGroup =
            !isCollapsed &&
            item.group &&
            (index === 0 || NAV_ITEMS[index - 1]?.group !== item.group)

          return (
            <React.Fragment key={item.id}>
              {showGroup && (
                <div className="px-2.5 pt-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-[#8491A2]/70 font-semibold">
                  {item.group}
                </div>
              )}
              <button
                type="button"
                onClick={() => handleNavClick(item.id)}
                title={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30 shadow-[0_0_12px_rgba(0,217,255,0.1)]'
                    : 'text-[#A8B4C2] hover:text-[#F5F8FA] hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-[#8491A2]'
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            </React.Fragment>
          )
        })}
      </nav>

      {/* Bottom User & Logout Area */}
      <div className="p-2.5 border-t border-[rgba(255,255,255,0.07)] flex-shrink-0 bg-[#07090D]/50">
        {!isCollapsed ? (
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white/[0.02]">
            <div className="min-w-0 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700/60 flex items-center justify-center text-[11px] font-mono text-cyan-400 flex-shrink-0">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="truncate">
                <div className="text-xs font-mono text-[#F5F8FA] font-medium truncate">
                  {username}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono">Authenticated</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogoutClick}
              title="Logout from Admin Studio"
              aria-label="Logout"
              className="p-1.5 rounded-md text-[#8491A2] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleLogoutClick}
              title={`Logged in as ${username} — Click to Logout`}
              aria-label="Logout"
              className="p-2 rounded-lg text-[#8491A2] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block h-[calc(100vh-56px)] transition-all duration-200 z-30 ${
          isCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen?.(false)}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
