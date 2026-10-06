import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr } from '@react-three/drei'
import { AmbientParticles } from '@/components/effects/AmbientParticles'
import { AICoreMesh } from '@/components/effects/AICoreMesh'
import { DataStreams } from '@/components/effects/DataStreams'
import { GridPlane } from '@/components/effects/GridPlane'
import type { DeviceClass } from '@/hooks/useDeviceCapability'

interface ThreeSceneProps {
  mouseX: number
  mouseY: number
  deviceClass: DeviceClass
  corePhase: 'forming' | 'active' | 'transitioning'
  showGrid?: boolean
}

export function ThreeScene({
  mouseX,
  mouseY,
  deviceClass,
  corePhase,
  showGrid = false,
}: ThreeSceneProps) {
  const streamCount = deviceClass === 'low' ? 3 : deviceClass === 'medium' ? 5 : 7

  // Responsive safe-zone offsets (Rule 18: Negative space between columns 6-8)
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  const corePosition: [number, number, number] = useMemo(() => {
    if (isMobile) return [0, -1.6, -3.2]
    return [0.75, 0.0, -2.8]
  }, [isMobile])

  // Reduced core scale by ~22% so Habib's identity and face remain dominant
  const coreScale = isMobile ? 0.32 : 0.48

  return (
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

      {/* Atmospheric Ambient Lighting (Restrained Cyan & Soft White) */}
      <ambientLight intensity={0.05} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.16} color="#38bdf8" />
      <pointLight position={[-10, -5, -10]} intensity={0.10} color="#818cf8" />

      <Suspense fallback={null}>
        <AmbientParticles deviceClass={deviceClass} />

        {/* 3D Core sitting strictly in background negative space (Layer 2) */}
        <group position={corePosition} scale={coreScale}>
          <AICoreMesh
            mouseX={mouseX}
            mouseY={mouseY}
            deviceClass={deviceClass}
            phase={corePhase}
          />
        </group>

        {/* Removed DataStreams to eliminate vertical cyan lines intersecting content (Rule 26) */}
        {showGrid && <GridPlane opacity={0.035} />}
      </Suspense>
    </Canvas>
  )
}
