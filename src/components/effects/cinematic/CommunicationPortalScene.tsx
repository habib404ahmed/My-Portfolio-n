import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface CommunicationPortalSceneProps {
  activeSection: SectionId
}

const BEACONS = [
  { name: 'EMAIL', color: '#06b6d4', pos: [-1.4, 0.4, 0] as [number, number, number] },
  { name: 'GITHUB', color: '#38bdf8', pos: [1.4, 0.4, 0] as [number, number, number] },
  { name: 'LINKEDIN', color: '#0077b5', pos: [-1.4, -0.4, 0] as [number, number, number] },
  { name: 'YOUTUBE', color: '#f43f5e', pos: [1.4, -0.4, 0] as [number, number, number] },
]

export function CommunicationPortalScene({ activeSection }: CommunicationPortalSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const wave1Ref = useRef<THREE.Mesh>(null)
  const wave2Ref = useRef<THREE.Mesh>(null)

  const isActive = activeSection === 'contact'

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const targetScale = isActive ? 1.0 : 0.001
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2.8)

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25
      coreRef.current.rotation.x += delta * 0.15
    }

    // Concentric expanding communication wave pulses
    if (wave1Ref.current) {
      const scale = ((performance.now() * 0.0008) % 1.0) * 1.6 + 0.6
      wave1Ref.current.scale.set(scale, scale, 1)
      const mat = wave1Ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(1.0 - (scale - 0.6) / 1.6, 0) * 0.35
    }

    if (wave2Ref.current) {
      const scale = (((performance.now() * 0.0008) + 0.5) % 1.0) * 1.6 + 0.6
      wave2Ref.current.scale.set(scale, scale, 1)
      const mat = wave2Ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(1.0 - (scale - 0.6) / 1.6, 0) * 0.35
    }
  })

  if (!isActive && groupRef.current?.scale.x === 0.001) return null

  return (
    <group ref={groupRef} position={[0, -0.1, -0.7]}>
      {/* Central Communication Core */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Radiating Signal Wave 1 */}
      <mesh ref={wave1Ref}>
        <ringGeometry args={[0.5, 0.52, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Radiating Signal Wave 2 */}
      <mesh ref={wave2Ref}>
        <ringGeometry args={[0.5, 0.52, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbital Communication Satellite Beacons & Beam Rays */}
      {BEACONS.map((beacon, idx) => (
        <group key={idx}>
          {/* Laser ray to central core */}
          <primitive object={new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(...beacon.pos),
            ]),
            new THREE.LineBasicMaterial({ color: beacon.color, transparent: true, opacity: 0.3 })
          )} />

          {/* Satellite Beacon */}
          <mesh position={beacon.pos}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color={beacon.color}
              emissive={beacon.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
