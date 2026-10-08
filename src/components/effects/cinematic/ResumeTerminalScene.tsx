import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface ResumeTerminalSceneProps {
  activeSection: SectionId
}

const _resScaleVec = new THREE.Vector3()

export function ResumeTerminalScene({ activeSection }: ResumeTerminalSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const laserRef = useRef<THREE.Mesh>(null)
  const currentScale = useRef(0.001)

  const isActive = activeSection === 'resume'

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
    _resScaleVec.setScalar(currentScale.current)
    groupRef.current.scale.copy(_resScaleVec)

    // Sweeping laser scan line
    if (laserRef.current) {
      const time = performance.now() * 0.001
      laserRef.current.position.y = Math.sin(time * 1.5) * 1.4
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -1.0]}>
      {/* 3D Digital Terminal Bounding HUD Wireframe */}
      <mesh>
        <boxGeometry args={[3.2, 4.2, 0.02]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Sweeping Cyan Scanning Laser Plane */}
      <mesh ref={laserRef} position={[0, 0, 0.02]}>
        <planeGeometry args={[3.1, 0.03]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} />
      </mesh>

      {/* Corner Bracket Markers */}
      {[
        [-1.6, 2.1, 0],
        [1.6, 2.1, 0],
        [-1.6, -2.1, 0],
        [1.6, -2.1, 0],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}
    </group>
  )
}
