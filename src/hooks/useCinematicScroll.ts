import { useState, useEffect, useRef, useCallback } from 'react'

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
  scrollProgress: number // Overall 0 -> 1
  sectionProgress: number // 0 -> 1 within active section
  scrollY: number
  scrollVelocity: number // Clamped 0 -> 1 for subtle cinematic momentum
  mouse: { x: number; y: number }
}

const SECTION_ORDER: SectionId[] = [
  'hero',
  'enter-system',
  'about',
  'mindset',
  'universe',
  'capabilities',
  'education',
  'projects',
  'journey',
  'certifications',
  'resume',
  'contact',
]

export function useCinematicScroll(): CinematicScrollState {
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [sectionProgress, setSectionProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const rafId = useRef<number | null>(null)
  const lastScrollY = useRef(0)
  const lastTime = useRef(performance.now())
  const decayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mouse parallax handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Optimized scroll & velocity calculations
  const calculateScroll = useCallback(() => {
    const y = window.scrollY
    const now = performance.now()
    const dt = Math.max(now - lastTime.current, 8)
    const dy = Math.abs(y - lastScrollY.current)

    // Calculate normalized velocity (clamped to 0..1)
    const rawVel = dy / dt // px/ms
    const targetVel = Math.min(rawVel / 3.0, 1.0)
    setScrollVelocity((prev) => prev * 0.6 + targetVel * 0.4)

    lastScrollY.current = y
    lastTime.current = now
    setScrollY(y)

    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const globalProgress = docHeight > 0 ? Math.min(Math.max(y / docHeight, 0), 1) : 0
    setScrollProgress(globalProgress)

    // Determine current section by viewport intersection
    const middleY = y + window.innerHeight * 0.45
    let currentSec: SectionId = 'hero'
    let secProg = 0

    for (let i = 0; i < SECTION_ORDER.length; i++) {
      const id = SECTION_ORDER[i]
      const el = document.getElementById(id)
      if (el) {
        const top = el.offsetTop
        const height = el.offsetHeight
        if (middleY >= top && middleY <= top + height) {
          currentSec = id
          secProg = Math.min(Math.max((middleY - top) / height, 0), 1)
          break
        } else if (i === SECTION_ORDER.length - 1 && middleY > top) {
          currentSec = id
          secProg = 1
        }
      }
    }

    setActiveSection(currentSec)
    setSectionProgress(secProg)

    // Schedule smooth decay to zero when scroll ceases
    if (decayTimeout.current) clearTimeout(decayTimeout.current)
    decayTimeout.current = setTimeout(() => {
      setScrollVelocity(0)
    }, 150)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(calculateScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    calculateScroll() // Initial run

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      if (decayTimeout.current) clearTimeout(decayTimeout.current)
    }
  }, [calculateScroll])

  return {
    activeSection,
    scrollProgress,
    sectionProgress,
    scrollY,
    scrollVelocity,
    mouse,
  }
}
