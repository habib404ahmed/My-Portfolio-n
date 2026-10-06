import { Suspense, useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr } from '@react-three/drei'
import { AmbientParticles } from '@/components/effects/AmbientParticles'
import { AICoreMesh } from '@/components/effects/AICoreMesh'
import { GridPlane } from '@/components/effects/GridPlane'
import type { DeviceClass } from '@/hooks/useDeviceCapability'

interface ResponsiveAICoreProps {
  mouseX: number
  mouseY: number
  deviceClass: DeviceClass
  corePhase: 'forming' | 'active' | 'transitioning'
}

function ResponsiveAICore({
  mouseX,
  mouseY,
  deviceClass,
  corePhase,
}: ResponsiveAICoreProps) {
  const { viewport, size } = useThree()

  // Calculate pixels per 3D world unit at focal plane (z = 0)
  const pixelsPerUnit = size.height / viewport.height

  // Responsive target core diameter in screen pixels (Per Phase 6.9.3 specs):
  // 1440px+: Core ≈ 170px (Orbit ≈ 350px)
  // 1280px:  Core ≈ 150px (Orbit ≈ 310px)
  // 1024px:  Core ≈ 135px (Orbit ≈ 280px)
  // 768px:   Core ≈ 122px (Orbit ≈ 255px)
  // 390px-430px: Core ≈ 105px (Orbit ≈ 215px)
  const targetCorePixels = useMemo(() => {
    const w = size.width
    if (w >= 1440) return 170
    if (w >= 1280) {
      const t = (w - 1280) / (1440 - 1280)
      return 150 + t * 20
    }
    if (w >= 1024) {
      const t = (w - 1024) / (1280 - 1024)
      return 135 + t * 15
    }
    if (w >= 768) {
      const t = (w - 768) / (1024 - 768)
      return 122 + t * 13
    }
    if (w >= 430) {
      const t = (w - 430) / (768 - 430)
      return 110 + t * 12
    }
    return 105
  }, [size.width])

  // Base inner icosahedron geometry diameter is 2 * 0.55 = 1.10 units
  const baseCoreDiameter = 1.10
  const coreScale = targetCorePixels / (baseCoreDiameter * pixelsPerUnit)

  // Position:
  // Desktop/Tablet: Centered inside negative space between left text and right portrait
  // At 1440px: offset is +110px from center (+0.79 units)
  // At 1280px: offset is +115px from center (+0.83 units)
  // At 1024px: offset is +85px from center (+0.62 units)
  // At 768px: offset is +60px from center (+0.45 units)
  // Mobile (<768px): Centered horizontally (x = 0), slightly above center
  const corePosition: [number, number, number] = useMemo(() => {
    const w = size.width
    if (w < 768) {
      return [0, 0.15, 0]
    }
    const offsetPx =
      w >= 1440 ? 110 :
      w >= 1280 ? 115 :
      w >= 1024 ? 85 :
      60
    const xUnits = offsetPx / pixelsPerUnit
    return [xUnits, 0.0, 0]
  }, [size.width, pixelsPerUnit])

  return (
    <group position={corePosition} scale={coreScale}>
      <AICoreMesh
        mouseX={mouseX}
        mouseY={mouseY}
        deviceClass={deviceClass}
        phase={corePhase}
      />
    </group>
  )
}

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
      <ambientLight intensity={0.06} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.20} color="#38bdf8" />
      <pointLight position={[-10, -5, -10]} intensity={0.12} color="#818cf8" />

      <Suspense fallback={null}>
        <AmbientParticles deviceClass={deviceClass} />

        {/* 3D Core sitting strictly in background negative space (Layer 2) */}
        <ResponsiveAICore
          mouseX={mouseX}
          mouseY={mouseY}
          deviceClass={deviceClass}
          corePhase={corePhase}
        />

        {showGrid && <GridPlane opacity={0.035} />}
      </Suspense>
    </Canvas>
  )
}
