import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface CapabilityMatrixSceneProps {
  activeSection: SectionId
}

const MODULES = [
  { type: 'ai', color: '#a78bfa', pos: [-1.4, 0.6, -0.4] as [number, number, number] },
  { type: 'fullstack', color: '#38bdf8', pos: [1.4, 0.6, -0.4] as [number, number, number] },
  { type: 'security', color: '#10b981', pos: [-1.4, -0.6, -0.4] as [number, number, number] },
  { type: 'systems', color: '#06b6d4', pos: [1.4, -0.6, -0.4] as [number, number, number] },
]

export function CapabilityMatrixScene({ activeSection }: CapabilityMatrixSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const m1Ref = useRef<THREE.Mesh>(null)
  const m2Ref = useRef<THREE.Mesh>(null)
  const m3Ref = useRef<THREE.Mesh>(null)
  const m4Ref = useRef<THREE.Mesh>(null)

  const isActive = activeSection === 'capabilities'

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const targetScale = isActive ? 1.0 : 0.001
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2.8)

    const refs = [m1Ref, m2Ref, m3Ref, m4Ref]
    refs.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.rotation.x += delta * (0.15 + idx * 0.05)
        ref.current.rotation.y += delta * (0.2 + idx * 0.05)
        // Subtle floating bob
        ref.current.position.y += Math.sin(performance.now() * 0.001 + idx) * 0.001
      }
    })
  })

  if (!isActive && groupRef.current?.scale.x === 0.001) return null

  return (
    <group ref={groupRef} position={[0, -0.1, -0.4]}>
      {/* AI Module (Octahedron) */}
      <mesh ref={m1Ref} position={MODULES[0].pos}>
        <octahedronGeometry args={[0.28, 1]} />
        <meshStandardMaterial
          color={MODULES[0].color}
          emissive={MODULES[0].color}
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Full-Stack Module (Icosahedron) */}
      <mesh ref={m2Ref} position={MODULES[1].pos}>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshStandardMaterial
          color={MODULES[1].color}
          emissive={MODULES[1].color}
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Security Module (Dodecahedron) */}
      <mesh ref={m3Ref} position={MODULES[2].pos}>
        <dodecahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={MODULES[2].color}
          emissive={MODULES[2].color}
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Systems Module (Tetrahedron / Cube) */}
      <mesh ref={m4Ref} position={MODULES[3].pos}>
        <boxGeometry args={[0.38, 0.38, 0.38]} />
        <meshStandardMaterial
          color={MODULES[3].color}
          emissive={MODULES[3].color}
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  )
}
