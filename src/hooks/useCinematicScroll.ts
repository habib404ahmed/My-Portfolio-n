import { useState, useEffect } from 'react'
import { cinematicScrollStore } from '@/stores/cinematicScrollStore'

export type SectionId =
  | 'hero'
  | 'enter-system'
  | 'about'
  | 'mindset'
  | 'universe'
  | 'capabilities'
  | 'education'
  | 'projects'
  | 'journey'
  | 'certifications'
  | 'resume'
  | 'contact'

export interface CinematicScrollState {
  activeSection: SectionId
  scrollProgress: number
  sectionProgress: number
  scrollY: number
  scrollVelocity: number
  mouse: { x: number; y: number }
}

/**
 * High-performance hook for cinematic scrolling.
 * React state ONLY updates on section transition (e.g. from 'hero' to 'about'),
 * completely eliminating 60fps React re-renders from mouse and scroll movements.
 */
export function useCinematicScroll(): CinematicScrollState {
  const [activeSection, setActiveSection] = useState<SectionId>(() =>
    cinematicScrollStore.getActiveSection()
  )

  useEffect(() => {
    // Only triggers a re-render when the active section changes
    const unsubscribe = cinematicScrollStore.subscribeSection((newSection) => {
      setActiveSection(newSection)
    })
    return unsubscribe
  }, [])

  const snap = cinematicScrollStore.getState()

  return {
    activeSection,
    scrollProgress: snap.scrollProgress,
    sectionProgress: snap.sectionProgress,
    scrollY: snap.scrollY,
    scrollVelocity: snap.scrollVelocity,
    mouse: snap.mouse,
  }
}

export { cinematicScrollStore }
