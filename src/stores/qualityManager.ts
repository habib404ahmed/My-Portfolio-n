export type QualityTier = 'high' | 'medium' | 'low' | 'very-low'

export interface QualityConfig {
  tier: QualityTier
  maxOrganismParticles: number
  maxAmbientParticles: number
  dpr: number
  enablePostProcessing: boolean
  enableDetailedShadows: boolean
  enableSecondaryReflections: boolean
}

const TIER_CONFIGS: Record<QualityTier, Omit<QualityConfig, 'dpr' | 'tier'>> = {
  high: {
    maxOrganismParticles: 3000,
    maxAmbientParticles: 9000,
    enablePostProcessing: true,
    enableDetailedShadows: true,
    enableSecondaryReflections: true,
  },
  medium: {
    maxOrganismParticles: 2200,
    maxAmbientParticles: 4800,
    enablePostProcessing: true,
    enableDetailedShadows: false,
    enableSecondaryReflections: false,
  },
  low: {
    maxOrganismParticles: 1400,
    maxAmbientParticles: 1600,
    enablePostProcessing: false,
    enableDetailedShadows: false,
    enableSecondaryReflections: false,
  },
  'very-low': {
    maxOrganismParticles: 800,
    maxAmbientParticles: 700,
    enablePostProcessing: false,
    enableDetailedShadows: false,
    enableSecondaryReflections: false,
  },
}

class QualityManager {
  private currentTier: QualityTier = 'high'
  private isMobile = false
  private currentFps = 60
  private frameCount = 0
  private lastFpsCheck = performance.now()
  private lowFpsDuration = 0
  private highFpsDuration = 0

  private listeners = new Set<(tier: QualityTier) => void>()

  constructor() {
    if (typeof window !== 'undefined') {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmall = window.innerWidth < 768
      this.isMobile = isTouch || isSmall

      // Mobile starts on medium or low
      if (this.isMobile) {
        this.currentTier = isSmall ? 'low' : 'medium'
      }
    }
  }

  public getCappedDpr(): number {
    if (typeof window === 'undefined') return 1.0
    const rawDpr = window.devicePixelRatio || 1.0

    if (this.currentTier === 'low' || this.currentTier === 'very-low') {
      return 1.0
    }
    if (this.isMobile) {
      return Math.min(rawDpr, 1.25)
    }
    return Math.min(rawDpr, 1.5)
  }

  public getConfig(): QualityConfig {
    const tierData = TIER_CONFIGS[this.currentTier]
    return {
      tier: this.currentTier,
      dpr: this.getCappedDpr(),
      ...tierData,
    }
  }

  public getTier(): QualityTier {
    return this.currentTier
  }

  public updateFrame(delta: number) {
    this.frameCount++
    const now = performance.now()
    const elapsed = now - this.lastFpsCheck

    if (elapsed >= 1000) {
      this.currentFps = (this.frameCount * 1000) / elapsed
      this.frameCount = 0
      this.lastFpsCheck = now

      // Automatic FPS Adaptation with Hysteresis
      if (this.currentFps < 48) {
        this.lowFpsDuration += elapsed / 1000
        this.highFpsDuration = 0

        // If below 48 FPS for > 2.5s, downgrade
        if (this.lowFpsDuration >= 2.5) {
          this.lowFpsDuration = 0
          this.stepDown()
        }
      } else if (this.currentFps > 58) {
        this.highFpsDuration += elapsed / 1000
        this.lowFpsDuration = 0

        // If stable above 58 FPS for > 6s, allow controlled upgrade
        if (this.highFpsDuration >= 6.0) {
          this.highFpsDuration = 0
          this.stepUp()
        }
      } else {
        // In stable zone (48 - 58 FPS)
        this.lowFpsDuration = 0
        this.highFpsDuration = 0
      }
    }
  }

  private stepDown() {
    let next: QualityTier | null = null
    if (this.currentTier === 'high') next = 'medium'
    else if (this.currentTier === 'medium') next = 'low'
    else if (this.currentTier === 'low') next = 'very-low'

    if (next) {
      this.currentTier = next
      this.notify()
    }
  }

  private stepUp() {
    // Only upgrade if desktop or powerful device
    if (this.isMobile && this.currentTier === 'medium') return

    let next: QualityTier | null = null
    if (this.currentTier === 'very-low') next = 'low'
    else if (this.currentTier === 'low') next = 'medium'
    else if (this.currentTier === 'medium' && !this.isMobile) next = 'high'

    if (next) {
      this.currentTier = next
      this.notify()
    }
  }

  public subscribe(fn: (tier: QualityTier) => void): () => void {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.currentTier))
  }
}

export const qualityManager = new QualityManager()
