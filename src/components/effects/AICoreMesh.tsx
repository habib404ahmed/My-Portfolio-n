import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { DeviceClass } from '@/hooks/useDeviceCapability'

interface AICoreMeshProps {
  mouseX?: number
  mouseY?: number
  deviceClass: DeviceClass
  phase: 'forming' | 'active' | 'transitioning'
}

export function AICoreMesh({
  mouseX = 0,
  mouseY = 0,
  deviceClass,
  phase,
}: AICoreMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const orbitalRef = useRef<THREE.Points>(null)

  const orbitCount = useMemo(() => {
    switch (deviceClass) {
      case 'low': return 60
      case 'medium': return 120
      case 'high': return 220
    }
  }, [deviceClass])

  const { orbitalPositions, orbitalColors } = useMemo(() => {
    const positions = new Float32Array(orbitCount * 3)
    const colors = new Float32Array(orbitCount * 3)

    for (let i = 0; i < orbitCount; i++) {
      const i3 = i * 3
      const angle = (i / orbitCount) * Math.PI * 2
      const orbitLayer = Math.floor(i / (orbitCount / 3))
      const radius = 1.2 + orbitLayer * 0.35 + Math.random() * 0.3
      const yOffset = (Math.random() - 0.5) * 0.4

      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = yOffset
      positions[i3 + 2] = Math.sin(angle) * radius

      const t = Math.random()
      colors[i3] = 0.023 + t * 0.23
      colors[i3 + 1] = 0.714 - t * 0.3
      colors[i3 + 2] = 0.831 + t * 0.1
    }

    return { orbitalPositions: positions, orbitalColors: colors }
  }, [orbitCount])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const time = performance.now() * 0.001
    const targetRotY = mouseX * 0.3
    const targetRotX = -mouseY * 0.2

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.015
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.015
    groupRef.current.rotation.y += delta * 0.015

    if (innerRef.current) {
      const pulse = 1 + Math.sin(time * 0.5) * 0.012
      innerRef.current.scale.setScalar(pulse)
    }

    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.01
      outerRef.current.rotation.z += delta * 0.008
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.025
      ringRef.current.rotation.x = Math.sin(time * 0.15) * 0.15 + 0.5
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.02
      ring2Ref.current.rotation.y = Math.cos(time * 0.1) * 0.2
    }

    if (orbitalRef.current) {
      orbitalRef.current.rotation.y += delta * 0.02
      orbitalRef.current.rotation.x += delta * 0.008
    }
  })

  const isForming = phase === 'forming'

  return (
    <group ref={groupRef}>
      {/* Inner energy core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={isForming ? 0.15 : 0.35}
          transparent
          opacity={isForming ? 0.2 : 0.45}
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[0.57, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Outer shell */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[0.82, 2]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.12} wireframe transparent opacity={0.035} />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.1, 0.003, 6, 128]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[0.9, 0.002, 6, 96]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.16} />
      </mesh>

      {/* Ring 3 */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.35, 0.002, 6, 128]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.12} />
      </mesh>

      {/* Orbital particles — subtle digital dust */}
      <points ref={orbitalRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[orbitalPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[orbitalColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.24}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <pointLight color="#06b6d4" intensity={isForming ? 0.2 : 0.45} distance={5} decay={2} />
      <pointLight color="#3b82f6" intensity={0.2} distance={3} decay={2} position={[0, 1, 0]} />
    </group>
  )
}
