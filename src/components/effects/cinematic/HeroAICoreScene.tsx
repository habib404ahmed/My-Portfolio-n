import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { AICoreMesh } from '@/components/effects/AICoreMesh'
import type { DeviceClass } from '@/hooks/useDeviceCapability'
import type { SectionId } from '@/hooks/useCinematicScroll'
import { cinematicScrollStore } from '@/stores/cinematicScrollStore'

interface HeroAICoreSceneProps {
  activeSection: SectionId
  sectionProgress?: number
  scrollVelocity?: number
  deviceClass: DeviceClass
  mouseX?: number
  mouseY?: number
}

const _heroScaleVec = new THREE.Vector3()

export function HeroAICoreScene({
  activeSection,
  deviceClass,
}: HeroAICoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport, size } = useThree()

  const isHero = activeSection === 'hero'
  const isTransitioning = activeSection === 'enter-system'
  const isVisible = isHero || isTransitioning

  const pixelsPerUnit = size.height / viewport.height

  // Responsive target core diameter in screen pixels (Centered in middle region)
  const targetCorePixels = useMemo(() => {
    const w = size.width
    if (w >= 1440) return 175
    if (w >= 1280) return 155
    if (w >= 1024) return 130
    if (w >= 768) return 100
    return 72
  }, [size.width])

  const baseCoreDiameter = 1.10
  const baseScale = targetCorePixels / (baseCoreDiameter * pixelsPerUnit)

  const heroPosition: [number, number, number] = useMemo(() => {
    const w = size.width
    if (w < 768) {
      // Mobile: subtle ambient core in background negative space
      return [0, 0.2, -2.2]
    }
    const offsetPx =
      w >= 1440 ? 68 :
      w >= 1280 ? 58 :
      w >= 1024 ? 48 :
      36
    const xUnits = offsetPx / pixelsPerUnit
    return [xUnits, 0.0, 0]
  }, [size.width, pixelsPerUnit])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const scrollState = cinematicScrollStore.getState()
    const currentVelocity = scrollState.scrollVelocity
    const currentProg = scrollState.sectionProgress

    let currentScaleFactor = 1.0
    let targetX = heroPosition[0]
    let targetY = heroPosition[1]
    let targetZ = 0

    // Velocity increases energy rotation & scale breathing
    const velocityEnergy = currentVelocity * 0.4

    if (isHero) {
      currentScaleFactor = 1.0 + velocityEnergy * 0.08
      targetX = heroPosition[0]
      targetY = heroPosition[1]
      targetZ = 0
    } else if (isTransitioning) {
      // Event: Core compresses, moves to center x=0, and recedes deeper into space
      const t = currentProg
      currentScaleFactor = Math.max(1.0 - t * 0.75, 0.18)
      targetX = heroPosition[0] * (1.0 - t)
      targetY = heroPosition[1] * (1.0 - t) - t * 0.2
      targetZ = -t * 4.6
    } else {
      currentScaleFactor = 0.001
      targetZ = -10
    }

    const finalScale = baseScale * currentScaleFactor
    const lerpSpeed = Math.min(delta * 3.5, 0.18)

    // Off-screen dormant culling
    if (!isVisible && currentScaleFactor < 0.005) {
      if (groupRef.current.visible) groupRef.current.visible = false
      return
    }
    groupRef.current.visible = true

    _heroScaleVec.setScalar(finalScale)
    groupRef.current.scale.lerp(_heroScaleVec, lerpSpeed)
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * lerpSpeed
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * lerpSpeed
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * lerpSpeed

    // Dynamic rotational velocity: idle is calm, scroll increases energy
    const baseRotSpeed = isTransitioning ? 0.4 : 0.035
    groupRef.current.rotation.y += delta * (baseRotSpeed + velocityEnergy * 0.6)
  })

  const currentMouse = cinematicScrollStore.getState().mouse

  return (
    <group ref={groupRef} position={heroPosition} scale={baseScale}>
      <AICoreMesh
        mouseX={currentMouse.x}
        mouseY={currentMouse.y}
        deviceClass={deviceClass}
        phase="active"
      />
    </group>
  )
}
