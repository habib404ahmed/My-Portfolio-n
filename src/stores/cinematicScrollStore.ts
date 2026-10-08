import type { SectionId } from '@/hooks/useCinematicScroll'

export interface CinematicScrollSnapshot {
  activeSection: SectionId
  scrollProgress: number
  sectionProgress: number
  scrollY: number
  scrollVelocity: number
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

// Mutable high-frequency state — Zero garbage collection, zero React re-renders on frame
class CinematicScrollStore {
  private activeSection: SectionId = 'hero'
  private scrollProgress = 0
  private sectionProgress = 0
  private scrollY = 0
  private scrollVelocity = 0
  private mouse = { x: 0, y: 0 }
  private targetMouse = { x: 0, y: 0 }

  private lastScrollY = 0
  private lastTime = performance.now()
  private rafId: number | null = null
  private decayTimeout: ReturnType<typeof setTimeout> | null = null
  private isInitialized = false

  // Cached section bounding offsets to avoid layout thrashing in animation loops
  private sectionOffsets: { id: SectionId; top: number; height: number }[] = []
  private resizeObserver: ResizeObserver | null = null

  // Subscriptions ONLY for section change (low frequency, e.g. once every few seconds)
  private sectionListeners = new Set<(section: SectionId) => void>()

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return
    this.isInitialized = true

    this.cacheSectionOffsets()

    // 1. Single global passive pointer listener — updates target coordinates without React renders
    const onPointerMove = (e: MouseEvent) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      // Immediate rough tracking for fallback
      this.mouse.x = this.targetMouse.x
      this.mouse.y = this.targetMouse.y
    }
    window.addEventListener('mousemove', onPointerMove, { passive: true })

    // 2. Single global passive scroll listener with RAF throttling
    const onScroll = () => {
      if (this.rafId) return
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null
        this.processScroll()
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // 3. Cache offsets on resize / layout change
    window.addEventListener('resize', () => this.cacheSectionOffsets(), { passive: true })

    // Initial pass
    this.processScroll()
  }

  public cacheSectionOffsets() {
    if (typeof document === 'undefined') return
    this.sectionOffsets = SECTION_ORDER.map((id) => {
      const el = document.getElementById(id)
      if (!el) return { id, top: 0, height: 0 }
      return {
        id,
        top: el.offsetTop,
        height: el.offsetHeight,
      }
    })
  }

  private processScroll() {
    const y = window.scrollY
    const now = performance.now()
    const dt = Math.max(now - this.lastTime, 8)
    const dy = Math.abs(y - this.lastScrollY)

    // Velocity calculation with smooth clamping
    const rawVel = dy / dt
    const targetVel = Math.min(rawVel / 2.8, 1.0)
    this.scrollVelocity = this.scrollVelocity * 0.55 + targetVel * 0.45

    this.lastScrollY = y
    this.lastTime = now
    this.scrollY = y

    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    this.scrollProgress = docHeight > 0 ? Math.min(Math.max(y / docHeight, 0), 1) : 0

    // Determine current active section using cached offsets (NO getBoundingClientRect layout thrashing)
    const middleY = y + window.innerHeight * 0.45
    let currentSec: SectionId = 'hero'
    let secProg = 0

    for (let i = 0; i < this.sectionOffsets.length; i++) {
      const sec = this.sectionOffsets[i]
      if (sec.height <= 0) continue
      if (middleY >= sec.top && middleY <= sec.top + sec.height) {
        currentSec = sec.id
        secProg = Math.min(Math.max((middleY - sec.top) / sec.height, 0), 1)
        break
      } else if (i === this.sectionOffsets.length - 1 && middleY > sec.top) {
        currentSec = sec.id
        secProg = 1
      }
    }

    this.sectionProgress = secProg

    // Notify React listeners ONLY when section actually transitions
    if (currentSec !== this.activeSection) {
      this.activeSection = currentSec
      this.sectionListeners.forEach((fn) => fn(currentSec))
    }

    // Schedule velocity decay
    if (this.decayTimeout) clearTimeout(this.decayTimeout)
    this.decayTimeout = setTimeout(() => {
      this.scrollVelocity = 0
    }, 120)
  }

  public getState(): CinematicScrollSnapshot {
    return {
      activeSection: this.activeSection,
      scrollProgress: this.scrollProgress,
      sectionProgress: this.sectionProgress,
      scrollY: this.scrollY,
      scrollVelocity: this.scrollVelocity,
      mouse: this.mouse,
    }
  }

  public getActiveSection(): SectionId {
    return this.activeSection
  }

  public subscribeSection(fn: (section: SectionId) => void): () => void {
    this.sectionListeners.add(fn)
    return () => this.sectionListeners.delete(fn)
  }
}

export const cinematicScrollStore = new CinematicScrollStore()
if (typeof window !== 'undefined') {
  cinematicScrollStore.init()
}
