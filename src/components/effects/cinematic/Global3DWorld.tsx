import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr } from '@react-three/drei'
import { useCinematicScroll } from '@/hooks/useCinematicScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { qualityManager } from '@/stores/qualityManager'
import type { DeviceClass } from '@/hooks/useDeviceCapability'

// 3D Cinematic Atmosphere & Camera
import { CinematicCamera } from './CinematicCamera'
import { CinematicLighting } from './CinematicLighting'
import { AmbientParticles } from '@/components/effects/AmbientParticles'
import { GridPlane } from '@/components/effects/GridPlane'

// 12 Section 3D States
import { HeroAICoreScene } from './HeroAICoreScene'
import { SystemGatewayScene } from './SystemGatewayScene'
import { HolographicCoreScene } from './HolographicCoreScene'
import { EngineeringPipelineScene } from './EngineeringPipelineScene'
import { TechnologyConstellationScene } from './TechnologyConstellationScene'
import { CapabilityMatrixScene } from './CapabilityMatrixScene'
import { EducationAxisScene } from './EducationAxisScene'
import { ProjectHologramScene } from './ProjectHologramScene'
import { JourneyOrbitScene } from './JourneyOrbitScene'
import { CertificatesHoloScene } from './CertificatesHoloScene'
import { ResumeTerminalScene } from './ResumeTerminalScene'
import { CommunicationPortalScene } from './CommunicationPortalScene'

interface Global3DWorldProps {
  deviceClass: DeviceClass
}

export function Global3DWorld({ deviceClass }: Global3DWorldProps) {
  const { activeSection } = useCinematicScroll()
  const prefersReduced = useReducedMotion()
  const [isTabVisible, setIsTabVisible] = useState(true)

  // Pause WebGL rendering when tab is hidden or minimized (Section 3 of Phase 10.3)
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const cappedDpr = qualityManager.getCappedDpr()

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        style={{ background: 'transparent' }}
        frameloop={isTabVisible ? 'always' : 'never'}
        gl={{
          antialias: deviceClass !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={cappedDpr}
      >
        <AdaptiveDpr pixelated />
        <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={50} />

        {/* Cinematic Camera Orchestrator (Reads high-frequency values from cinematicScrollStore) */}
        <CinematicCamera
          activeSection={activeSection}
          prefersReducedMotion={prefersReduced}
        />

        {/* Dynamic Scene-Specific Cinematic Lighting & Fog Moods */}
        <CinematicLighting activeSection={activeSection} />

        <Suspense fallback={null}>
          {/* Persistent Atmospheric Digital Dust & Infinite Floor Grid */}
          <AmbientParticles deviceClass={deviceClass} />
          <GridPlane opacity={0.035} />

          {/* Section 3D States (Self-cull when dormant offscreen) */}
          <HeroAICoreScene
            activeSection={activeSection}
            sectionProgress={0}
            scrollVelocity={0}
            deviceClass={deviceClass}
            mouseX={0}
            mouseY={0}
          />

          <SystemGatewayScene activeSection={activeSection} />

          <HolographicCoreScene activeSection={activeSection} />

          <EngineeringPipelineScene
            activeSection={activeSection}
            sectionProgress={0}
          />

          <TechnologyConstellationScene activeSection={activeSection} />

          <CapabilityMatrixScene activeSection={activeSection} />

          <EducationAxisScene activeSection={activeSection} />

          <ProjectHologramScene activeSection={activeSection} />

          <JourneyOrbitScene activeSection={activeSection} />

          <CertificatesHoloScene activeSection={activeSection} />

          <ResumeTerminalScene activeSection={activeSection} />

          <CommunicationPortalScene activeSection={activeSection} />
        </Suspense>
      </Canvas>
    </div>
  )
}
