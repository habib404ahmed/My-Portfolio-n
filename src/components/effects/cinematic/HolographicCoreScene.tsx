import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface HolographicCoreSceneProps {
  activeSection: SectionId
}

export function HolographicCoreScene({ activeSection }: HolographicCoreSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const orbit1Ref = useRef<THREE.Mesh>(null)
  const orbit2Ref = useRef<THREE.Mesh>(null)

  const isActive = activeSection === 'about'

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const targetScale = isActive ? 1.0 : 0.001
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2.8)

    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.12
      sphereRef.current.rotation.x += delta * 0.08
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.18
    }

    if (orbit1Ref.current) {
      orbit1Ref.current.rotation.z += delta * 0.22
    }

    if (orbit2Ref.current) {
      orbit2Ref.current.rotation.x += delta * 0.16
    }
  })

  if (!isActive && groupRef.current?.scale.x === 0.001) return null

  return (
    <group ref={groupRef} position={[0.95, 0.1, -0.6]}>
      {/* Outer Rotating Geodesic Wireframe Sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.16} />
      </mesh>

      {/* Inner Crystalline Octahedron Energy Matrix */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#06b6d4"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Horizontal Holographic Meridian Orbit */}
      <mesh ref={orbit1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.006, 8, 64]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
      </mesh>

      {/* Vertical Holographic Polar Orbit */}
      <mesh ref={orbit2Ref} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.62, 0.005, 8, 64]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.25} />
      </mesh>

      {/* Floating Spatial Technical Data Nodes */}
      {[
        [-1.1, 0.4, 0.5],
        [1.2, -0.3, -0.4],
        [0.2, 1.3, -0.6],
        [-0.4, -1.2, 0.3],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
      ))}
    </group>
  )
}
