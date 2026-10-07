import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr } from '@react-three/drei'
import { useCinematicScroll } from '@/hooks/useCinematicScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'
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
  const { activeSection, sectionProgress, scrollProgress, scrollVelocity, mouse } = useCinematicScroll()
  const prefersReduced = useReducedMotion()

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        style={{ background: 'transparent' }}
        gl={{
          antialias: deviceClass !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={deviceClass === 'low' ? [1, 1] : [1, 1.5]}
      >
        <AdaptiveDpr pixelated />
        <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={50} />

        {/* Cinematic Camera Orchestrator */}
        <CinematicCamera
          activeSection={activeSection}
          sectionProgress={sectionProgress}
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          mouseX={mouse.x}
          mouseY={mouse.y}
          prefersReducedMotion={prefersReduced}
        />

        {/* Dynamic Scene-Specific Cinematic Lighting & Fog Moods */}
        <CinematicLighting
          activeSection={activeSection}
          sectionProgress={sectionProgress}
        />

        <Suspense fallback={null}>
          {/* Persistent Atmospheric Digital Dust & Infinite Floor Grid */}
          <AmbientParticles deviceClass={deviceClass} />
          <GridPlane opacity={0.035} />

          {/* Section 3D States */}
          <HeroAICoreScene
            activeSection={activeSection}
            sectionProgress={sectionProgress}
            scrollVelocity={scrollVelocity}
            deviceClass={deviceClass}
            mouseX={mouse.x}
            mouseY={mouse.y}
          />

          <SystemGatewayScene
            activeSection={activeSection}
            sectionProgress={sectionProgress}
          />

          <HolographicCoreScene activeSection={activeSection} />

          <EngineeringPipelineScene
            activeSection={activeSection}
            sectionProgress={sectionProgress}
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
