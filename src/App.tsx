import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InitSequence } from '@/scenes/IntroScene/InitSequence'
import { ThreeScene } from '@/scenes/HeroScene/ThreeScene'
import { HeroContent } from '@/scenes/HeroScene/HeroContent'
import { WebGLFallback } from '@/scenes/HeroScene/WebGLFallback'
import { Navigation } from '@/components/navigation/Navigation'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import { useWebGL } from '@/hooks/useWebGL'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Phase 2 Engineer Story Scenes
import { Scene01EnterSystem } from '@/sections/Scene01EnterSystem'
import { Scene02AboutIdentity } from '@/sections/Scene02AboutIdentity'
import { Scene03EngineeringMindset } from '@/sections/Scene03EngineeringMindset'
import { Scene04TechnologyUniverse } from '@/sections/Scene04TechnologyUniverse'
import { Scene05CapabilityMatrix } from '@/sections/Scene05CapabilityMatrix'
import { Scene06EducationLanguages } from '@/sections/Scene06EducationLanguages'
import { Scene07TimelineLeadership } from '@/sections/Scene07TimelineLeadership'
import { Scene08Certifications } from '@/sections/Scene08Certifications'

// Phase 3 Project Universe
import { ProjectUniverse } from '@/components/projects/ProjectUniverse'

// Phase 5 The Resume Experience
import { Phase5ResumeExperience } from '@/sections/Phase5ResumeExperience'

// Phase 6 Contact & Final Cinematic Experience
import { Phase6ContactFinal } from '@/sections/Phase6ContactFinal'

type AppPhase =
  | 'black'        // Initial darkness
  | 'init'         // System init sequence
  | 'core'         // AI core forming
  | 'hero'         // Full hero reveal
  | 'ready'        // Navigation visible, scroll enabled

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('black')
  const [corePhase, setCorePhase] = useState<'forming' | 'active' | 'transitioning'>('forming')
  const [heroContentVisible, setHeroContentVisible] = useState(false)
  const [navVisible, setNavVisible] = useState(false)

  const { normalized } = useMousePosition()
  const deviceClass = useDeviceCapability()
  const webGLSupported = useWebGL()
  const prefersReduced = useReducedMotion()

  const phase1Timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const phase2Timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // If reduced motion, jump straight to hero
  useEffect(() => {
    if (prefersReduced) {
      setPhase('ready')
      setHeroContentVisible(true)
      setNavVisible(true)
      setCorePhase('active')
    } else {
      // Start with brief darkness
      phase1Timer.current = setTimeout(() => {
        setPhase('init')
      }, 400)
    }

    return () => {
      if (phase1Timer.current) clearTimeout(phase1Timer.current)
      if (phase2Timer.current) clearTimeout(phase2Timer.current)
    }
  }, [prefersReduced])

  const handleInitComplete = useCallback(() => {
    setPhase('core')
    setCorePhase('forming')

    // AI core forms
    phase1Timer.current = setTimeout(() => {
      setCorePhase('active')
      setPhase('hero')

      // Stagger hero content
      phase2Timer.current = setTimeout(() => {
        setHeroContentVisible(true)

        // Nav appears last
        setTimeout(() => {
          setNavVisible(true)
          setPhase('ready')
        }, 700)
      }, 800)
    }, 1800)
  }, [])

  const handleRestartExperience = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
    if (!prefersReduced) {
      setHeroContentVisible(false)
      setCorePhase('forming')
      setTimeout(() => {
        setCorePhase('active')
        setHeroContentVisible(true)
      }, 700)
    }
  }, [prefersReduced])

  const showScene = phase !== 'black' && phase !== 'init'

  return (
    <div className="relative min-h-screen bg-[var(--color-void)] text-slate-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Subtle film grain noise */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation visible={navVisible} />

      {/* ──────────────────────────────────────────
          HERO SECTION — pinned full viewport
          ────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col items-center justify-start md:justify-center layer-content"
        style={{ paddingTop: 'var(--nav-height, 72px)' }}
        aria-label="Hero — Introduction"
      >
        {/* 3D Canvas — strictly background layer (Layer 2) inside Hero boundary */}
        <AnimatePresence>
          {showScene && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none z-[2]"
              aria-hidden="true"
            >
              {webGLSupported ? (
                <ThreeScene
                  mouseX={normalized.x}
                  mouseY={normalized.y}
                  deviceClass={deviceClass}
                  corePhase={corePhase}
                  showGrid={phase === 'ready'}
                />
              ) : (
                <WebGLFallback visible={heroContentVisible} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Ambient Dual Lighting: Cool Technology (Left) / Warm Person (Right) — Layer 3 */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 22% 48%, rgba(6,182,212,0.05) 0%, transparent 55%), radial-gradient(circle at 78% 45%, rgba(245,158,11,0.04) 0%, transparent 55%)',
          }}
        />

        {/* Hero content overlay with balanced cinematic vertical center */}
        {webGLSupported && (
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-start md:justify-center flex-1 py-4">
            <HeroContent visible={heroContentVisible} />
          </div>
        )}

        {/* Scroll indicator (Subtle, desktop only to avoid mobile overlapping) */}
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 pointer-events-none z-10"
              aria-hidden="true"
            >
              <span className="font-mono text-[0.5625rem] text-slate-400 tracking-[0.25em] uppercase">
                SCROLL TO EXPLORE
              </span>
              <div
                style={{
                  width: 1,
                  height: 24,
                  background: 'linear-gradient(to bottom, rgba(6,182,212,0.5), transparent)',
                  animation: 'pulse-glow 3s ease-in-out infinite',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vignette edge fade */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 45%, rgba(5,5,7,0.7) 100%)',
          }}
        />

        {/* Hero Bottom Cinematic Exit: ensures zero collision with following section */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-void,#050507)] to-transparent pointer-events-none z-[4]"
          aria-hidden="true"
        />
      </section>

      {/* ──────────────────────────────────────────
          INIT SEQUENCE OVERLAY
          ────────────────────────────────────────── */}
      <AnimatePresence>
        {(phase === 'black' || phase === 'init') && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-[1000] layer-modal"
          >
            {phase === 'black' && (
              <div
                className="fixed inset-0 z-[1000]"
                style={{ background: 'var(--color-void)' }}
              />
            )}

            {phase === 'init' && (
              <InitSequence onComplete={handleInitComplete} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────
          MAIN CONTENT HIERARCHY (Section 30 Architecture)
          ────────────────────────────────────────── */}
      <main id="main-content" className="relative z-10 layer-content">
        {/* Scene 01: Enter the Engineering System */}
        <Scene01EnterSystem />

        {/* Scene 02: About / Engineer Profile */}
        <Scene02AboutIdentity />

        {/* Scene 03: How I Build (Engineering Mindset & Pipeline) */}
        <Scene03EngineeringMindset />

        {/* Scene 04: Connected Stack (Technology Universe) */}
        <Scene04TechnologyUniverse />

        {/* Scene 05: What I Can Build (System Capabilities) */}
        <Scene05CapabilityMatrix />

        {/* Scene 06: Academic Foundation (Education & Languages) */}
        <Scene06EducationLanguages />

        {/* Phase 3: Project Universe */}
        <ProjectUniverse />

        {/* Scene 07: The Journey (Timeline & Leadership) */}
        <Scene07TimelineLeadership />

        {/* Scene 08: Verified Certifications */}
        <Scene08Certifications />

        {/* Phase 5: The Resume Experience (ATS & Web) */}
        <Phase5ResumeExperience />

        {/* Phase 6: Contact & Final Connection */}
        <Phase6ContactFinal onRestart={handleRestartExperience} />
      </main>
    </div>
  )
}
