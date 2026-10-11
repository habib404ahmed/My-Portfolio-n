import React, { useState, useEffect, useCallback, useRef } from 'react'
import type { PortfolioContent } from '@/types/content.ts'
import type { AdminTab, DeviceMode, SaveStatusState } from './types.ts'
import { getDefaultContent } from '@/data/defaultContent.ts'
import { applyThemeTokens } from '@/context/ContentContext.tsx'
import { apiFetch } from './utils/api.ts'

import { AdminLogin } from './components/AdminLogin.tsx'
import { TopToolbar } from './components/TopToolbar.tsx'
import { Sidebar } from './components/Sidebar.tsx'
import { LivePreview } from './components/LivePreview.tsx'
import { PublishModal } from './components/PublishModal.tsx'

import { DashboardView } from './views/DashboardView.tsx'
import { HeroEditorView } from './views/HeroEditorView.tsx'
import { AboutEditorView } from './views/AboutEditorView.tsx'
import { ConnectedStackView } from './views/ConnectedStackView.tsx'
import { ProjectsManagerView } from './views/ProjectsManagerView.tsx'
import { AnimationStudioView } from './views/AnimationStudioView.tsx'
import { ThemeColorsView } from './views/ThemeColorsView.tsx'
import { MediaLibraryView } from './views/MediaLibraryView.tsx'
import { VersionHistoryView } from './views/VersionHistoryView.tsx'
import { PageBuilderView } from './views/PageBuilderView.tsx'
import { EducationJourneyCertsView } from './views/EducationJourneyCertsView.tsx'
import { ResumeManagerView } from './views/ResumeManagerView.tsx'
import { ContactNavView } from './views/ContactNavView.tsx'
import { SeoSettingsView } from './views/SeoSettingsView.tsx'
import { TypographySpacingView } from './views/TypographySpacingView.tsx'
import { PhotoStudioView } from './views/PhotoStudioView.tsx'
import { CapabilitiesView } from './views/CapabilitiesView.tsx'
import { VisualEditorView } from './views/VisualEditorView.tsx'

export function AdminStudio() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [username, setUsername] = useState('admin')
  const [token, setToken] = useState<string>('')

  const [currentTab, setCurrentTab] = useState<AdminTab>('visual-editor')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isInspectorOpen, setIsInspectorOpen] = useState(true)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const [content, setContent] = useState<PortfolioContent>(() => getDefaultContent())
  const [saveStatus, setSaveStatus] = useState<SaveStatusState>({ status: 'clean' })
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  // Undo / Redo History Stack
  const historyRef = useRef<PortfolioContent[]>([])
  const historyIndexRef = useRef<number>(-1)
  const [historyVersion, setHistoryVersion] = useState(0)

  // Check auth session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          setIsAuthenticated(true)
          setUsername(data.user?.username || 'admin')
          setToken(sessionStorage.getItem('admin_token') || '')
        } else {
          setIsAuthenticated(false)
        }
      } catch {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  // Load draft content once authenticated
  const loadDraftContent = useCallback(async () => {
    try {
      const res = await apiFetch('/api/content/draft')
      if (res.ok) {
        const data = await res.json()
        setContent(data)
        applyThemeTokens(data.theme)
        historyRef.current = [JSON.parse(JSON.stringify(data))]
        historyIndexRef.current = 0
        setHistoryVersion((v) => v + 1)
        setSaveStatus({ status: 'clean', lastSaved: data.lastUpdated })
      }
    } catch (err) {
      console.error('Error loading draft content:', err)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadDraftContent()
    }
  }, [isAuthenticated, loadDraftContent])

  // Update content with undo snapshot
  const updateContent = useCallback((updated: PortfolioContent, recordHistory = true) => {
    setContent(updated)
    applyThemeTokens(updated.theme)
    setSaveStatus({ status: 'unsaved' })

    if (recordHistory) {
      // Truncate future branch if in middle of stack
      const currentIndex = historyIndexRef.current
      const nextHistory = historyRef.current.slice(0, currentIndex + 1)
      nextHistory.push(JSON.parse(JSON.stringify(updated)))
      // Cap history at 50 snapshots
      if (nextHistory.length > 50) nextHistory.shift()
      historyRef.current = nextHistory
      historyIndexRef.current = nextHistory.length - 1
      setHistoryVersion((v) => v + 1)
    }
  }, [])

  // Undo
  const handleUndo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current -= 1
      const target = historyRef.current[historyIndexRef.current]
      if (target) {
        setContent(JSON.parse(JSON.stringify(target)))
        applyThemeTokens(target.theme)
        setSaveStatus({ status: 'unsaved' })
        setHistoryVersion((v) => v + 1)
      }
    }
  }, [])

  // Redo
  const handleRedo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current += 1
      const target = historyRef.current[historyIndexRef.current]
      if (target) {
        setContent(JSON.parse(JSON.stringify(target)))
        applyThemeTokens(target.theme)
        setSaveStatus({ status: 'unsaved' })
        setHistoryVersion((v) => v + 1)
      }
    }
  }, [])

  // Save Draft to Backend
  const handleSaveDraft = useCallback(async () => {
    setSaveStatus({ status: 'saving' })
    try {
      const res = await apiFetch('/api/content/draft', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      if (res.ok) {
        const data = await res.json()
        setSaveStatus({ status: 'saved', lastSaved: data.lastUpdated })
      } else {
        const errorData = await res.json().catch(() => ({}))
        setSaveStatus({ status: 'error', message: errorData.error || 'Failed to save draft' })
      }
    } catch (err: any) {
      setSaveStatus({ status: 'error', message: err.message })
    }
  }, [content])

  // Publish Draft
  const handlePublish = async (versionLabel: string) => {
    try {
      const res = await apiFetch('/api/content/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label: versionLabel }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setSaveStatus({ status: 'published', lastSaved: data.publishedAt })
        return { success: true, message: data.message }
      } else {
        return { success: false, error: data.error || 'Failed to publish changes' }
      }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  // Logout
  const handleLogout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // Fall through
    }
    sessionStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setToken('')
  }

  // Keyboard Shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          handleRedo()
        } else {
          handleUndo()
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault()
        handleRedo()
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSaveDraft()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleUndo, handleRedo, handleSaveDraft])

  // If loading auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#030507] text-cyan-400 font-mono text-sm">
        Verifying Admin Credentials...
      </div>
    )
  }

  // If unauthenticated, render login view
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={(authToken, user) => {
          setToken(authToken)
          setUsername(user.username)
          setIsAuthenticated(true)
        }}
      />
    )
  }

  const canUndo = historyIndexRef.current > 0
  const canRedo = historyIndexRef.current < historyRef.current.length - 1

  // Full-width workspace tools that need maximum canvas space
  const isFullWidthView =
    currentTab === 'dashboard' ||
    currentTab === 'typography' ||
    currentTab === 'photo-studio' ||
    currentTab === 'capabilities' ||
    currentTab === 'projects' ||
    currentTab === 'education' ||
    currentTab === 'journey' ||
    currentTab === 'certifications' ||
    currentTab === 'resume' ||
    currentTab === 'media-library' ||
    currentTab === 'versions' ||
    currentTab === 'settings'

  return (
    <div className="min-h-screen w-full bg-[#07090D] text-[#F5F8FA] flex flex-col overflow-hidden font-sans select-none">
      {/* Top Toolbar */}
      <TopToolbar
        currentTab={currentTab}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        saveStatus={saveStatus}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSaveDraft={handleSaveDraft}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        onRefreshPreview={() => {
          // trigger reload by momentarily bumping key
        }}
        onToggleInspector={() => setIsInspectorOpen((open) => !open)}
        isInspectorOpen={isInspectorOpen}
        onLogout={handleLogout}
        username={username}
        onToggleMobileNav={() => setIsMobileNavOpen(true)}
        isFullWidthView={isFullWidthView}
      />

      {/* Main Workspace: Left Sidebar + Center Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Desktop + Mobile Drawer) */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isMobileOpen={isMobileNavOpen}
          setIsMobileOpen={setIsMobileNavOpen}
          onLogout={handleLogout}
          username={username}
        />

        {/* Center & Right Workspaces */}
        <main className="flex-1 flex overflow-hidden bg-[#07090D]">
          {currentTab === 'visual-editor' ? (
            <VisualEditorView
              content={content}
              deviceMode={deviceMode}
              setDeviceMode={setDeviceMode}
              onChange={(updated) => updateContent(updated)}
            />
          ) : isFullWidthView ? (
            /* Full-width standalone view */
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 custom-scrollbar">
              {currentTab === 'dashboard' && (
                <DashboardView
                  content={content}
                  setCurrentTab={setCurrentTab}
                  onOpenPublishModal={() => setIsPublishModalOpen(true)}
                  saveStatus={saveStatus}
                />
              )}
              {currentTab === 'typography' && (
                <TypographySpacingView
                  content={content}
                  deviceMode={deviceMode}
                  onChange={(updated) => updateContent(updated)}
                />
              )}
              {currentTab === 'photo-studio' && (
                <PhotoStudioView
                  content={content}
                  deviceMode={deviceMode}
                  onChange={(updated) => updateContent(updated)}
                />
              )}
              {currentTab === 'capabilities' && (
                <CapabilitiesView
                  content={content}
                  onChange={(updated) =>
                    updateContent({ ...content, capabilities: updated })
                  }
                />
              )}
              {currentTab === 'projects' && (
                <ProjectsManagerView
                  content={content}
                  onChange={(updatedProjects) =>
                    updateContent({ ...content, projects: updatedProjects })
                  }
                />
              )}
              {currentTab === 'education' && (
                <EducationJourneyCertsView
                  content={content}
                  mode="education"
                  onUpdateEducation={(edu) =>
                    updateContent({ ...content, education: edu })
                  }
                  onUpdateTimeline={() => {}}
                  onUpdateCertifications={() => {}}
                />
              )}
              {currentTab === 'journey' && (
                <EducationJourneyCertsView
                  content={content}
                  mode="journey"
                  onUpdateEducation={() => {}}
                  onUpdateTimeline={(time) =>
                    updateContent({ ...content, timeline: time })
                  }
                  onUpdateCertifications={() => {}}
                />
              )}
              {currentTab === 'certifications' && (
                <EducationJourneyCertsView
                  content={content}
                  mode="certifications"
                  onUpdateEducation={() => {}}
                  onUpdateTimeline={() => {}}
                  onUpdateCertifications={(certs) =>
                    updateContent({ ...content, certifications: certs })
                  }
                />
              )}
              {currentTab === 'resume' && (
                <ResumeManagerView
                  content={content}
                  onChange={(updatedResume) =>
                    updateContent({ ...content, resume: updatedResume })
                  }
                />
              )}
              {currentTab === 'media-library' && <MediaLibraryView />}
              {currentTab === 'versions' && (
                <VersionHistoryView
                  onRollbackSuccess={(restored) => {
                    setContent(restored)
                    applyThemeTokens(restored.theme)
                  }}
                />
              )}
              {currentTab === 'settings' && (
                <SeoSettingsView
                  content={content}
                  mode="settings"
                  onUpdateSeo={() => {}}
                  username={username}
                />
              )}
            </div>
          ) : (
            /* Split View: Live Preview + Contextual Editor */
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Live Preview Workspace */}
              <div
                className={`transition-all duration-200 flex flex-col h-full overflow-hidden ${
                  isInspectorOpen ? 'lg:w-[58%] xl:w-[62%]' : 'w-full'
                }`}
              >
                <LivePreview deviceMode={deviceMode} content={content} />
              </div>

              {/* Contextual Editor Panel (Right) */}
              {isInspectorOpen && (
                <aside className="lg:w-[42%] xl:w-[38%] h-full bg-[#10151D] border-t lg:border-t-0 lg:border-l border-[rgba(255,255,255,0.09)] flex flex-col overflow-hidden z-20">
                  <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F5F8FA] uppercase tracking-wider">
                      Properties Inspector
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">LIVE PREVIEW SYNC</span>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar">
                    {currentTab === 'page-builder' && (
                      <PageBuilderView
                        content={content}
                        onChange={(updatedSections) =>
                          updateContent({ ...content, sections: updatedSections })
                        }
                        onNavigateTab={(tab) => setCurrentTab(tab)}
                      />
                    )}

                    {currentTab === 'hero' && (
                      <HeroEditorView
                        content={content}
                        deviceMode={deviceMode}
                        onChange={(updatedHero) =>
                          updateContent({ ...content, hero: updatedHero })
                        }
                      />
                    )}

                    {currentTab === 'about' && (
                      <AboutEditorView
                        content={content}
                        deviceMode={deviceMode}
                        onChange={(updatedAbout) =>
                          updateContent({ ...content, about: updatedAbout })
                        }
                      />
                    )}

                    {currentTab === 'tech-stack' && (
                      <ConnectedStackView
                        content={content}
                        onChange={(updatedCats) =>
                          updateContent({
                            ...content,
                            techStack: { categories: updatedCats },
                          })
                        }
                      />
                    )}

                    {currentTab === 'contact' && (
                      <ContactNavView
                        content={content}
                        mode="contact"
                        onUpdateContact={(updatedContact) =>
                          updateContent({ ...content, contact: updatedContact })
                        }
                        onUpdateNav={() => {}}
                      />
                    )}

                    {currentTab === 'navigation' && (
                      <ContactNavView
                        content={content}
                        mode="navigation"
                        onUpdateContact={() => {}}
                        onUpdateNav={(updatedNav) =>
                          updateContent({ ...content, navigation: updatedNav })
                        }
                      />
                    )}

                    {currentTab === 'animation' && (
                      <AnimationStudioView
                        content={content}
                        onChange={(updatedAnim) =>
                          updateContent({ ...content, animation: updatedAnim })
                        }
                      />
                    )}

                    {currentTab === 'theme' && (
                      <ThemeColorsView
                        content={content}
                        onChange={(updatedTheme) =>
                          updateContent({ ...content, theme: updatedTheme })
                        }
                      />
                    )}

                    {currentTab === 'seo' && (
                      <SeoSettingsView
                        content={content}
                        mode="seo"
                        onUpdateSeo={(updatedSeo) =>
                          updateContent({ ...content, seo: updatedSeo })
                        }
                        username={username}
                      />
                    )}
                  </div>
                </aside>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Publish Changes Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  )
}
