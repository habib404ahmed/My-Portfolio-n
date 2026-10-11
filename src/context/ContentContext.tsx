import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import type { PortfolioContent, HeroSectionData, AboutSectionData, ProjectItemData, ElementCustomStyle } from '@/types/content.ts'
import { getDefaultContent } from '@/data/defaultContent.ts'
import { qualityManager } from '@/stores/qualityManager.ts'

interface ContentContextType {
  content: PortfolioContent
  isLoading: boolean
  isDraftPreview: boolean
  updateContentLocal: (updater: (prev: PortfolioContent) => PortfolioContent) => void
  refreshContent: () => Promise<void>
}

const ContentContext = createContext<ContentContextType | null>(null)

import { generateCustomStylesCss } from '@/utils/customStylesCss.ts'

// Helper to apply theme colors and nav tokens to CSS variables on :root
export function applyThemeTokens(theme: PortfolioContent['theme'], nav?: PortfolioContent['navigation']) {
  if (typeof document === 'undefined') return
  const root = document.documentElement

  if (theme.voidColor) root.style.setProperty('--color-void', theme.voidColor)
  if (theme.deepColor) root.style.setProperty('--color-deep', theme.deepColor)
  if (theme.surfaceColor) root.style.setProperty('--color-surface', theme.surfaceColor)
  if (theme.elevatedColor) root.style.setProperty('--color-elevated', theme.elevatedColor)
  if (theme.cyanColor) {
    root.style.setProperty('--color-cyan', theme.cyanColor)
    root.style.setProperty('--color-border-accent', `${theme.cyanColor}47`)
    root.style.setProperty('--color-cyan-glow', `${theme.cyanColor}59`)
  }
  if (theme.blueColor) root.style.setProperty('--color-blue', theme.blueColor)
  if (theme.violetColor) root.style.setProperty('--color-violet', theme.violetColor)
  if (theme.textPrimary) root.style.setProperty('--color-text-primary', theme.textPrimary)
  if (theme.textSecondary) root.style.setProperty('--color-text-secondary', theme.textSecondary)
  if (theme.textMuted) root.style.setProperty('--color-text-muted', theme.textMuted)

  if (theme.glassBg) root.style.setProperty('--glass-bg', theme.glassBg)
  if (theme.glassBorder) root.style.setProperty('--glass-border', theme.glassBorder)
  if (theme.glassBlur) root.style.setProperty('--glass-blur', `${theme.glassBlur}px`)
  if (theme.glassRadius) root.style.setProperty('--glass-radius', `${theme.glassRadius}px`)

  if (nav?.navbarHeight) {
    root.style.setProperty('--nav-height', `${nav.navbarHeight}px`)
  }
}

export function applyCustomElementStyles(elementStyles?: Record<string, ElementCustomStyle>) {
  if (typeof document === 'undefined') return
  let styleEl = document.getElementById('dynamic-element-styles') as HTMLStyleElement | null
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = 'dynamic-element-styles'
    document.head.appendChild(styleEl)
  }
  styleEl.textContent = generateCustomStylesCss(elementStyles)
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(() => getDefaultContent())
  const [isLoading, setIsLoading] = useState(true)

  const isDraftPreview = useMemo(() => {
    if (typeof window === 'undefined') return false
    const params = new URLSearchParams(window.location.search)
    return params.get('preview') === 'draft' || window.self !== window.top
  }, [])

  const fetchContent = useCallback(async () => {
    try {
      const endpoint = isDraftPreview ? '/api/content/draft' : '/api/content'
      const res = await fetch(endpoint)
      if (res.ok) {
        const data = await res.json()
        setContent(data)
        applyThemeTokens(data.theme, data.navigation)
        applyCustomElementStyles(data.elementStyles)
      } else {
        // Fallback to default
        applyThemeTokens(content.theme, content.navigation)
        applyCustomElementStyles(content.elementStyles)
      }
    } catch {
      // Offline fallback
      applyThemeTokens(content.theme, content.navigation)
      applyCustomElementStyles(content.elementStyles)
    } finally {
      setIsLoading(false)
    }
  }, [isDraftPreview, content.theme, content.navigation, content.elementStyles])

  useEffect(() => {
    fetchContent()

    // Listen for live postMessage updates from Admin Studio in live preview mode
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PORTFOLIO_DRAFT_UPDATE') {
        const updated = event.data.content as PortfolioContent
        setContent(updated)
        applyThemeTokens(updated.theme, updated.navigation)
        applyCustomElementStyles(updated.elementStyles)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [fetchContent])

  const updateContentLocal = useCallback((updater: (prev: PortfolioContent) => PortfolioContent) => {
    setContent((prev) => {
      const next = updater(prev)
      applyThemeTokens(next.theme, next.navigation)
      applyCustomElementStyles(next.elementStyles)
      return next
    })
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content,
        isLoading,
        isDraftPreview,
        updateContentLocal,
        refreshContent: fetchContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function usePortfolioContent() {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('usePortfolioContent must be used within a ContentProvider')
  }
  return context
}
