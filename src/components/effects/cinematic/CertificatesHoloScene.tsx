import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface CertificatesHoloSceneProps {
  activeSection: SectionId
}

export function CertificatesHoloScene({ activeSection }: CertificatesHoloSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const plaque1Ref = useRef<THREE.Mesh>(null)
  const plaque2Ref = useRef<THREE.Mesh>(null)

  const isActive = activeSection === 'certifications'

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const targetScale = isActive ? 1.0 : 0.001
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2.8)

    if (plaque1Ref.current) {
      plaque1Ref.current.rotation.y = Math.sin(performance.now() * 0.001) * 0.15 + 0.2
    }
    if (plaque2Ref.current) {
      plaque2Ref.current.rotation.y = Math.cos(performance.now() * 0.001) * 0.15 - 0.2
    }
  })

  if (!isActive && groupRef.current?.scale.x === 0.001) return null

  return (
    <group ref={groupRef} position={[0.8, -0.1, -0.7]}>
      {/* Plaque 1 (Cisco AI Certificate Frame) */}
      <mesh ref={plaque1Ref} position={[-0.6, 0.4, 0]}>
        <boxGeometry args={[0.9, 0.65, 0.02]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Plaque 2 (Pitronix Ethical Hacking Shield Frame) */}
      <mesh ref={plaque2Ref} position={[0.6, -0.4, -0.2]}>
        <boxGeometry args={[0.9, 0.65, 0.02]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}
