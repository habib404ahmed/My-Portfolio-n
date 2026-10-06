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

  // Responsive safe-zone offsets (Rule 19: 20-30% reduction, deeper in background)
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  const corePosition: [number, number, number] = useMemo(() => {
    if (isMobile) return [0, -1.4, -3.0]
    return [0.4, 0.0, -2.4]
  }, [isMobile])

  // Reduced core scale so Habib's face and identity remain primary
  const coreScale = isMobile ? 0.42 : 0.62

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
      <pointLight position={[10, 10, 10]} intensity={0.18} color="#38bdf8" />
      <pointLight position={[-10, -5, -10]} intensity={0.12} color="#818cf8" />

      <Suspense fallback={null}>
        <AmbientParticles deviceClass={deviceClass} />

        {/* 3D Core sitting strictly in background layer (Layer 2) */}
        <group position={corePosition} scale={coreScale}>
          <AICoreMesh
            mouseX={mouseX}
            mouseY={mouseY}
            deviceClass={deviceClass}
            phase={corePhase}
          />
        </group>

        {deviceClass !== 'low' && <DataStreams count={streamCount} />}
        {showGrid && <GridPlane opacity={0.045} />}
      </Suspense>
    </Canvas>
  )
}
