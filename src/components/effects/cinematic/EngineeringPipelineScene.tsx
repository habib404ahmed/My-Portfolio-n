import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface EngineeringPipelineSceneProps {
  activeSection: SectionId
  sectionProgress: number
}

const STAGE_COLORS = [
  '#f43f5e', // 01 Problem
  '#f59e0b', // 02 Understand
  '#06b6d4', // 03 Design
  '#10b981', // 04 Implement
  '#3b82f6', // 05 Test
  '#10b981', // 06 Secure
  '#8b5cf6', // 07 Deploy
  '#ec4899', // 08 Optimize
]

export function EngineeringPipelineScene({
  activeSection,
  sectionProgress,
}: EngineeringPipelineSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const packetsRef = useRef<THREE.Points>(null)

  const isActive = activeSection === 'mindset'

  // 8 spatial node positions along a gentle 3D curve
  const nodePositions = useMemo(() => {
    return STAGE_COLORS.map((_, i) => {
      const t = (i / 7) * 2 - 1 // -1 to 1
      const x = t * 2.6
      const y = Math.sin(t * Math.PI) * 0.45 - 0.2
      const z = Math.cos(t * Math.PI * 0.5) * 0.5 - 0.6
      return [x, y, z] as [number, number, number]
    })
  }, [])

  // Line geometry connecting all 8 nodes
  const linePoints = useMemo(() => {
    return nodePositions.map(([x, y, z]) => new THREE.Vector3(x, y, z))
  }, [nodePositions])

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints)
  }, [linePoints])

  // Data packet particles flowing along the pipeline
  const { packetPositions, packetCount } = useMemo(() => {
    const count = 32
    const pos = new Float32Array(count * 3)
    return { packetPositions: pos, packetCount: count }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const targetScale = isActive ? 1.0 : 0.001
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2.8)

    // Move data packets along line
    if (packetsRef.current) {
      const time = performance.now() * 0.0008
      const posArray = packetsRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < packetCount; i++) {
        const offset = i / packetCount
        const t = (time + offset) % 1.0
        const index = t * (nodePositions.length - 1)
        const baseIndex = Math.floor(index)
        const frac = index - baseIndex
        const nextIndex = Math.min(baseIndex + 1, nodePositions.length - 1)

        const p1 = nodePositions[baseIndex]
        const p2 = nodePositions[nextIndex]

        posArray[i * 3] = p1[0] + (p2[0] - p1[0]) * frac
        posArray[i * 3 + 1] = p1[1] + (p2[1] - p1[1]) * frac
        posArray[i * 3 + 2] = p1[2] + (p2[2] - p1[2]) * frac
      }

      packetsRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Slow atmospheric breathing roll
    groupRef.current.rotation.y = Math.sin(performance.now() * 0.0005) * 0.08
  })

  if (!isActive && groupRef.current?.scale.x === 0.001) return null

  // Active node index based on section scroll progress
  const activeIndex = Math.min(Math.floor(sectionProgress * 8), 7)

  return (
    <group ref={groupRef} position={[0, -0.15, -0.4]}>
      {/* Illuminated Backbone Pipeline Ray */}
      <primitive object={new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.35 })
      )} />

      {/* 8 Engineering Stage Spatial Nodes */}
      {nodePositions.map(([x, y, z], idx) => {
        const isCurrent = idx === activeIndex
        const nodeColor = STAGE_COLORS[idx]
        const scale = isCurrent ? 1.4 : 1.0

        return (
          <group key={idx} position={[x, y, z]} scale={scale}>
            {/* Core Node */}
            <mesh>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isCurrent ? 0.8 : 0.25}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing Ring around active node */}
            {isCurrent && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.13, 0.008, 8, 24]} />
                <meshBasicMaterial color={nodeColor} transparent opacity={0.65} />
              </mesh>
            )}
          </group>
        )
      })}

      {/* Traveling Data Packets */}
      <points ref={packetsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[packetPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.065} color="#38bdf8" transparent opacity={0.85} />
      </points>
    </group>
  )
}
