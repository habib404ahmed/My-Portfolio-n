import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface ProjectHologramSceneProps {
  activeSection: SectionId
}

export function ProjectHologramScene({ activeSection }: ProjectHologramSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const radarRef = useRef<THREE.Mesh>(null)
  const agentRingRef = useRef<THREE.Mesh>(null)
  const beaconRef = useRef<THREE.Mesh>(null)

  const isActive = activeSection === 'projects'

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const targetScale = isActive ? 1.0 : 0.001
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2.8)

    if (radarRef.current) {
      radarRef.current.rotation.y += delta * 0.2
      radarRef.current.rotation.x += delta * 0.1
    }

    if (agentRingRef.current) {
      agentRingRef.current.rotation.z -= delta * 0.25
    }

    if (beaconRef.current) {
      const pulse = 1.0 + Math.sin(performance.now() * 0.003) * 0.08
      beaconRef.current.scale.setScalar(pulse)
    }
  })

  if (!isActive && groupRef.current?.scale.x === 0.001) return null

  return (
    <group ref={groupRef} position={[0.85, 0.0, -0.6]}>
      {/* Sentra Threat Detection Radar Sphere */}
      <mesh ref={radarRef}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Multi-Agent Orchestration Ring */}
      <mesh ref={agentRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.15, 0.008, 8, 48]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </mesh>

      {/* Campus Care Central Emergency SOS Beacon */}
      <mesh ref={beaconRef}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      {/* 5minhelp & UniBox Real-Time Matrix Grid Nodes */}
      {[
        [-0.7, 0.5, 0.4],
        [0.8, -0.4, 0.2],
        [-0.4, -0.7, -0.3],
        [0.6, 0.7, -0.4],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      ))}
    </group>
  )
}
