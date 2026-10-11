import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ContentProvider, usePortfolioContent } from '@/context/ContentContext.tsx'
import { AdminStudio } from '@/admin/AdminStudio.tsx'

import { InitSequence } from '@/scenes/IntroScene/InitSequence'
import { Global3DWorld } from '@/components/effects/cinematic/Global3DWorld'
import { HeroCinematicBackground } from '@/components/effects/cinematic/HeroCinematicBackground'
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

function PortfolioWebsite() {
  const { content, isDraftPreview } = usePortfolioContent()
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

  // Fast skip if reduced motion, already seen in this session, or in draft preview frame
  useEffect(() => {
    let hasSeenIntro = false
    try {
      hasSeenIntro = sessionStorage.getItem('portfolio_intro_seen') === 'true'
    } catch (e) {}

    if (prefersReduced || isDraftPreview || hasSeenIntro) {
      setPhase('ready')
      setHeroContentVisible(true)
      setNavVisible(true)
      setCorePhase('active')
    } else {
      // Start with brief darkness
      phase1Timer.current = setTimeout(() => {
        setPhase('init')
      }, 250)
    }

    return () => {
      if (phase1Timer.current) clearTimeout(phase1Timer.current)
      if (phase2Timer.current) clearTimeout(phase2Timer.current)
    }
  }, [prefersReduced, isDraftPreview])

  // Phase 12: Visual Editor Live Preview Integration (Selection Mode & Element Selection)
  useEffect(() => {
    if (!isDraftPreview) return

    let selectionMode = true

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'SET_SELECTION_MODE') {
        selectionMode = Boolean(e.data.enabled)
        if (selectionMode) {
          document.body.classList.add('selection-mode-active')
        } else {
          document.body.classList.remove('selection-mode-active')
          document.querySelectorAll('.is-editor-selected').forEach((el) => {
            el.classList.remove('is-editor-selected')
          })
        }
      } else if (e.data?.type === 'SELECT_ELEMENT_BY_ID') {
        const id = e.data.elementId
        document.querySelectorAll('.is-editor-selected').forEach((el) => {
          el.classList.remove('is-editor-selected')
        })
        if (id) {
          const target = document.querySelector(`[data-editable-id="${id}"]`)
          if (target) {
            target.classList.add('is-editor-selected')
            target.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!selectionMode) return
      const target = (e.target as HTMLElement).closest('[data-editable-id]') as HTMLElement | null
      if (target) {
        e.preventDefault()
        e.stopPropagation()
        const id = target.getAttribute('data-editable-id')
        if (id) {
          document.querySelectorAll('.is-editor-selected').forEach((el) => {
            el.classList.remove('is-editor-selected')
          })
          target.classList.add('is-editor-selected')

          window.parent.postMessage(
            {
              type: 'ELEMENT_SELECTED',
              elementId: id,
              tagName: target.tagName,
              textContent: target.innerText?.slice(0, 100),
            },
            '*'
          )
        }
      }
    }

    document.body.classList.add('selection-mode-active')
    window.addEventListener('message', handleMessage)
    document.addEventListener('click', handleClick, true)

    return () => {
      document.body.classList.remove('selection-mode-active')
      window.removeEventListener('message', handleMessage)
      document.removeEventListener('click', handleClick, true)
    }
  }, [isDraftPreview])

  const handleInitComplete = useCallback(() => {
    try {
      sessionStorage.setItem('portfolio_intro_seen', 'true')
    } catch (e) {}

    setPhase('core')
    setCorePhase('forming')

    // AI core forms quickly & smoothly
    phase1Timer.current = setTimeout(() => {
      setCorePhase('active')
      setPhase('hero')

      // Reveal hero content and navigation in synchronized sequence
      phase2Timer.current = setTimeout(() => {
        setHeroContentVisible(true)
        setNavVisible(true)
        setPhase('ready')
      }, 350)
    }, 450)
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

  // Dynamic active sections
  const enabledSections = [...content.sections]
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order)

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Persistent Global Cinematic Background Layer (Phase 13.4) */}
      <HeroCinematicBackground visible={true} />

      {/* Subtle film grain noise */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Cinematic Vignette & Global Color Grade */}
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="cinematic-grade" aria-hidden="true" />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation visible={navVisible} />

      {/* Global 3D World Canvas */}
      <AnimatePresence>
        {showScene && content.animation.enableCinematic3D && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="fixed inset-0 pointer-events-none z-[2]"
            aria-hidden="true"
          >
            {webGLSupported ? (
              <Global3DWorld deviceClass={deviceClass} />
            ) : (
              <WebGLFallback visible={heroContentVisible} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="hero"
        data-editable-id="hero-section"
        className="relative w-full overflow-visible flex flex-col items-center justify-center"
        aria-label="Hero — Introduction"
      >
        {/* Hero Ambient Horizon Glow - z-[3] */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at 50% 60%, rgba(0,217,255,${
              content.hero.bgAtmosphereIntensity * 0.08
            }) 0%, transparent 60%)`,
          }}
        />

        {/* Hero content overlay - z-[10] */}
        <div className="relative z-10 layer-content w-full flex flex-col items-center justify-center flex-1 py-0">
          <HeroContent visible={heroContentVisible} />
        </div>

        {/* Subtle, interactive scroll indicator */}
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.75, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              onClick={() => {
                const target = document.querySelector('#about') || document.querySelector('#main-content')
                if (target) target.scrollIntoView({ behavior: 'smooth' })
              }}
              className="hidden lg:flex absolute bottom-2.5 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors z-20 cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm py-1 px-3 select-none"
              aria-label="Scroll to explore next section"
            >
              <span className="font-mono text-[9px] text-slate-400 group-hover:text-cyan-300 tracking-[0.25em] uppercase transition-colors">
                SCROLL TO EXPLORE
              </span>
              <div
                className="w-[1px] h-4 bg-gradient-to-b from-cyan-400/60 to-transparent group-hover:h-5 group-hover:from-cyan-300 transition-all duration-300"
              />
            </motion.button>
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
      </section>

      {/* Init Sequence Overlay */}
      <AnimatePresence>
        {!isDraftPreview && (phase === 'black' || phase === 'init') && (
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

      {/* Main Content Sections Hierarchy */}
      <main id="main-content" className="relative z-10 layer-content bg-transparent">
        {enabledSections.map((sec) => {
          let Component: React.ReactNode = null
          switch (sec.id) {
            case 'system':
              Component = <Scene01EnterSystem />
              break
            case 'profile':
              Component = <Scene02AboutIdentity />
              break
            case 'mindset':
              Component = <Scene03EngineeringMindset />
              break
            case 'stack':
              Component = <Scene04TechnologyUniverse />
              break
            case 'capabilities':
              Component = <Scene05CapabilityMatrix />
              break
            case 'education':
              Component = <Scene06EducationLanguages />
              break
            case 'projects':
              Component = <ProjectUniverse />
              break
            case 'journey':
              Component = <Scene07TimelineLeadership />
              break
            case 'certifications':
              Component = <Scene08Certifications />
              break
            case 'resume':
              Component = <Phase5ResumeExperience />
              break
            case 'contact':
              Component = <Phase6ContactFinal onRestart={handleRestartExperience} />
              break
            default:
              Component = null
          }

          return (
            <div key={sec.id} data-editable-id={`section-${sec.id}`}>
              {Component}
            </div>
          )
        })}
      </main>
    </div>
  )
}

export default function App() {
  const isAdminRoute =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <AdminStudio />
  }

  return (
    <ContentProvider>
      <PortfolioWebsite />
    </ContentProvider>
  )
}
