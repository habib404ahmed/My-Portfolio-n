import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { AICoreMesh } from '@/components/effects/AICoreMesh'
import type { DeviceClass } from '@/hooks/useDeviceCapability'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface HeroAICoreSceneProps {
  activeSection: SectionId
  sectionProgress: number
  scrollVelocity: number
  deviceClass: DeviceClass
  mouseX: number
  mouseY: number
}

export function HeroAICoreScene({
  activeSection,
  sectionProgress,
  scrollVelocity,
  deviceClass,
  mouseX,
  mouseY,
}: HeroAICoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport, size } = useThree()

  const isHero = activeSection === 'hero'
  const isTransitioning = activeSection === 'enter-system'
  const isVisible = isHero || isTransitioning

  const pixelsPerUnit = size.height / viewport.height

  // Responsive target core diameter in screen pixels (from Hero specs)
  const targetCorePixels = useMemo(() => {
    const w = size.width
    if (w >= 1440) return 170
    if (w >= 1280) return 150 + ((w - 1280) / (1440 - 1280)) * 20
    if (w >= 1024) return 135 + ((w - 1024) / (1280 - 1024)) * 15
    if (w >= 768) return 122 + ((w - 768) / (1024 - 768)) * 13
    if (w >= 430) return 110 + ((w - 430) / (768 - 430)) * 12
    return 105
  }, [size.width])

  const baseCoreDiameter = 1.10
  const baseScale = targetCorePixels / (baseCoreDiameter * pixelsPerUnit)

  const heroPosition: [number, number, number] = useMemo(() => {
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

  useFrame((_, delta) => {
    if (!groupRef.current) return

    let currentScaleFactor = 1.0
    let targetX = heroPosition[0]
    let targetY = heroPosition[1]
    let targetZ = 0

    // Velocity increases energy rotation & scale breathing
    const velocityEnergy = scrollVelocity * 0.4

    if (isHero) {
      currentScaleFactor = 1.0 + velocityEnergy * 0.08
      targetX = heroPosition[0]
      targetY = heroPosition[1]
      targetZ = 0
    } else if (isTransitioning) {
      // Event: Core compresses, moves to center x=0, and recedes deeper into space
      const t = sectionProgress
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

    groupRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, finalScale), lerpSpeed)
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * lerpSpeed
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * lerpSpeed
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * lerpSpeed

    // Dynamic rotational velocity: idle is calm, scroll increases energy
    const baseRotSpeed = isTransitioning ? 0.4 : 0.035
    groupRef.current.rotation.y += delta * (baseRotSpeed + velocityEnergy * 0.6)
  })

  if (!isVisible && groupRef.current?.scale.x === 0.001) return null

  return (
    <group ref={groupRef} position={heroPosition} scale={baseScale}>
      <AICoreMesh
        mouseX={mouseX}
        mouseY={mouseY}
        deviceClass={deviceClass}
        phase="active"
      />
    </group>
  )
}
