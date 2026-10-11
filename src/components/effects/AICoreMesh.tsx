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
      // Particle orbit radius scaled to reach 2.06x core diameter (core r=0.55, outer r~1.15-1.25)
      const radius = 0.85 + orbitLayer * 0.14 + Math.random() * 0.12
      const yOffset = (Math.random() - 0.5) * 0.35

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
      {/* 1. Inner energy core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={isForming ? 0.3 : 0.85}
          transparent
          opacity={isForming ? 0.3 : 0.7}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Geodesic wireframe overlay with cyan nodes */}
      <mesh>
        <icosahedronGeometry args={[0.57, 1]} />
        <meshBasicMaterial color="#00D9FF" wireframe transparent opacity={0.45} />
      </mesh>

      {/* 3. Secondary subtle inner lattice */}
      <mesh>
        <icosahedronGeometry args={[0.59, 1]} />
        <meshBasicMaterial color="#E0F7FA" wireframe transparent opacity={0.25} />
      </mesh>

      {/* 4. Outer octagonal lattice shell */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[0.78, 2]} />
        <meshStandardMaterial
          color="#38E8FF"
          emissive="#00D9FF"
          emissiveIntensity={0.25}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* 5. Orbiting Ring 1 (Primary tilted ring) */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.96, 0.005, 8, 128]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.65} />
      </mesh>

      {/* 6. Orbiting Ring 2 (Cross tilted orbit) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.15, 0.004, 8, 128]} />
        <meshBasicMaterial color="#38E8FF" transparent opacity={0.5} />
      </mesh>

      {/* 7. Orbiting Ring 3 (Outer ambient boundary) */}
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.35, 0.003, 8, 128]} />
        <meshBasicMaterial color="#0284c7" transparent opacity={0.35} />
      </mesh>

      {/* 8. Orbital particles — energetic floating digital dust */}
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
          size={0.035}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Core illumination lights */}
      <pointLight color="#00D9FF" intensity={isForming ? 0.4 : 1.2} distance={6} decay={2} />
      <pointLight color="#38E8FF" intensity={0.5} distance={4} decay={2} position={[0, 1, 0]} />
    </group>
  )
}
