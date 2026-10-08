import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface EducationAxisSceneProps {
  activeSection: SectionId
}

const _eduScaleVec = new THREE.Vector3()

export function EducationAxisScene({ activeSection }: EducationAxisSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const railRef = useRef<THREE.Mesh>(null)
  const currentScale = useRef(0.001)

  const isActive = activeSection === 'education'

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
    _eduScaleVec.setScalar(currentScale.current)
    groupRef.current.scale.copy(_eduScaleVec)

    if (railRef.current) {
      railRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <group ref={groupRef} position={[-0.8, 0, -0.6]}>
      {/* Central Illuminated Axis Rail */}
      <mesh ref={railRef}>
        <cylinderGeometry args={[0.015, 0.015, 3.2, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating Milestone Rings along Axis */}
      {[
        { y: 1.1, r: 0.16, color: '#38bdf8' }, // BCA 2025
        { y: 0.35, r: 0.22, color: '#06b6d4' }, // Sem 1 SGPA 8.05
        { y: -0.35, r: 0.24, color: '#10b981' }, // Sem 2 SGPA 8.10
        { y: -1.1, r: 0.16, color: '#818cf8' }, // 2028 Target
      ].map((item, idx) => (
        <group key={idx} position={[0, item.y, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[item.r, 0.008, 8, 32]} />
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.6}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={item.color} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
