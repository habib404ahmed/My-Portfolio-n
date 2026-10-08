import { useRef, useMemo, useEffect } from 'react'
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

const _pipeScaleVec = new THREE.Vector3()

export function EngineeringPipelineScene({
  activeSection,
  sectionProgress,
}: EngineeringPipelineSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const packetsRef = useRef<THREE.Points>(null)
  const currentScale = useRef(0.001)

  const isActive = activeSection === 'mindset'

  // 8 spatial node positions along a gentle 3D curve
  const nodePositions = useMemo(() => {
    return STAGE_COLORS.map((_, i) => {
      const t = (i / 7) * 2 - 1
      const x = t * 2.6
      const y = Math.sin(t * Math.PI) * 0.45 - 0.2
      const z = Math.cos(t * Math.PI * 0.5) * 0.5 - 0.6
      return [x, y, z] as [number, number, number]
    })
  }, [])

  // Line object created ONCE via useMemo
  const { lineObject, lineGeometry, lineMaterial } = useMemo(() => {
    const points = nodePositions.map(([x, y, z]) => new THREE.Vector3(x, y, z))
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    const mat = new THREE.LineBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.35 })
    const line = new THREE.Line(geo, mat)
    return { lineObject: line, lineGeometry: geo, lineMaterial: mat }
  }, [nodePositions])

  // Data packet particles flowing along the pipeline
  const { packetPositions, packetCount } = useMemo(() => {
    const count = 24
    const pos = new Float32Array(count * 3)
    return { packetPositions: pos, packetCount: count }
  }, [])

  useEffect(() => {
    return () => {
      lineGeometry.dispose()
      lineMaterial.dispose()
    }
  }, [lineGeometry, lineMaterial])

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
    _pipeScaleVec.setScalar(currentScale.current)
    groupRef.current.scale.copy(_pipeScaleVec)

    // Move data packets along line only when active
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

    groupRef.current.rotation.y = Math.sin(performance.now() * 0.0005) * 0.08
  })

  const activeIndex = Math.min(Math.floor(sectionProgress * 8), 7)

  return (
    <group ref={groupRef} position={[0, -0.15, -0.4]}>
      {/* Pre-instantiated Line Object */}
      <primitive object={lineObject} />

      {/* 8 Engineering Stage Spatial Nodes */}
      {nodePositions.map(([x, y, z], idx) => {
        const isCurrent = idx === activeIndex
        const nodeColor = STAGE_COLORS[idx]
        const scale = isCurrent ? 1.4 : 1.0

        return (
          <group key={idx} position={[x, y, z]} scale={scale}>
            <mesh>
              <sphereGeometry args={[0.075, 12, 12]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isCurrent ? 0.8 : 0.25}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {isCurrent && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.13, 0.008, 6, 18]} />
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
