import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface SystemGatewaySceneProps {
  activeSection: SectionId
  sectionProgress?: number
}

const _gateScaleVec = new THREE.Vector3()

export function SystemGatewayScene({ activeSection }: SystemGatewaySceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)
  const nodesRef = useRef<THREE.Points>(null)
  const currentScale = useRef(0.001)

  const isActive = activeSection === 'enter-system' || activeSection === 'hero'

  // Generate orbital network nodes around gateway
  const { nodePositions, nodeColors } = useMemo(() => {
    const count = 48
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 1.8 + Math.sin(i * 3) * 0.35
      const z = (Math.random() - 0.5) * 0.8

      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = z

      col[i * 3] = 0.02
      col[i * 3 + 1] = 0.71
      col[i * 3 + 2] = 0.83
    }
    return { nodePositions: pos, nodeColors: col }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Off-screen dormant culling
    if (!isActive && currentScale.current < 0.005) {
      if (groupRef.current.visible) groupRef.current.visible = false
      return
    }
    groupRef.current.visible = true

    const targetScale = activeSection === 'enter-system' ? 1.0 : activeSection === 'hero' ? 0.35 : 0.001
    const targetZ = activeSection === 'enter-system' ? -1.0 : -4.0

    currentScale.current += (targetScale - currentScale.current) * Math.min(delta * 3.0, 0.2)
    _gateScaleVec.setScalar(currentScale.current)
    groupRef.current.scale.copy(_gateScaleVec)
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * Math.min(delta * 2.5, 0.2)

    // Counter-rotating engineering gateway data rings
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.25
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.18
    if (ring3Ref.current) ring3Ref.current.rotation.x += delta * 0.12

    if (nodesRef.current) nodesRef.current.rotation.z += delta * 0.08
  })

  return (
    <group ref={groupRef} position={[0, -0.2, -1.0]}>
      {/* Outer Segmented Chassis Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Middle Rotating HUD Data Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.65, 0.012, 12, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} wireframe />
      </mesh>

      {/* Inner Tilted Energy Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.35, 0.01, 8, 36]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.25} />
      </mesh>

      {/* Sweeping Vertical Scan Line Laser */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 3.8, 8]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.15} />
      </mesh>

      {/* Network Nodes Orbiting Gateway */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={0.65} />
      </points>
    </group>
  )
}
