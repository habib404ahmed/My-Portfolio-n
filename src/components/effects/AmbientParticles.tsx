import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { DeviceClass } from '@/hooks/useDeviceCapability'

interface AmbientParticlesProps {
  deviceClass: DeviceClass
  intensity?: number
}

export function AmbientParticles({ deviceClass, intensity = 1 }: AmbientParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)

  // Calibrated counts for subtle, filmic energy/dust (subtle atmospheric digital dust)
  const particleCount = useMemo(() => {
    switch (deviceClass) {
      case 'low': return 50
      case 'medium': return 110
      case 'high': return 180
    }
  }, [deviceClass])

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 32
      positions[i3 + 1] = (Math.random() - 0.5) * 22
      positions[i3 + 2] = (Math.random() - 0.5) * 16 - 4

      velocities[i3] = (Math.random() - 0.5) * 0.0008
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.0008
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0005
    }

    return { positions, velocities }
  }, [particleCount])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y += delta * 0.006
    meshRef.current.rotation.x += delta * 0.003
    meshRef.current.position.y = Math.sin(time * 0.2) * 0.15
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#38bdf8"
        transparent
        opacity={0.05 * intensity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
