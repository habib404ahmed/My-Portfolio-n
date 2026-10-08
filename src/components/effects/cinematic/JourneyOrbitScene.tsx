import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface JourneyOrbitSceneProps {
  activeSection: SectionId
}

const _journeyScaleVec = new THREE.Vector3()

export function JourneyOrbitScene({ activeSection }: JourneyOrbitSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const currentScale = useRef(0.001)

  const isActive = activeSection === 'journey'

  // Precompute 3D spiral trajectory of memory nodes
  const memoryNodes = useMemo(() => {
    const count = 9
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1)
      const angle = t * Math.PI * 2.5
      const radius = 0.9 + t * 0.8
      const x = Math.cos(angle) * radius
      const y = (t - 0.5) * 2.2
      const z = Math.sin(angle) * radius * 0.5 - 0.5
      return { x, y, z, color: i % 2 === 0 ? '#06b6d4' : '#818cf8' }
    })
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Off-screen dormant culling
    if (!isActive && currentScale.current < 0.005) {
      if (groupRef.current.visible) groupRef.current.visible = false
      return
    }
    groupRef.current.visible = true

    const targetScale = isActive ? 1.0 : 0.001
    currentScale.current += (targetScale - currentScale.current) * Math.min(delta * 2.8, 0.2)
    _journeyScaleVec.setScalar(currentScale.current)
    groupRef.current.scale.copy(_journeyScaleVec)

    // Gentle trajectory rotation
    groupRef.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={groupRef} position={[-0.8, 0, -0.6]}>
      {/* Curved 3D Trajectory Tube / Path */}
      {memoryNodes.map((node, idx) => (
        <group key={idx} position={[node.x, node.y, node.z]}>
          <mesh>
            <octahedronGeometry args={[0.075, 0]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.12, 0.004, 6, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
