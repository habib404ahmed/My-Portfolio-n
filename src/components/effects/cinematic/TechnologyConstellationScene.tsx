import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface TechnologyConstellationSceneProps {
  activeSection: SectionId
}

const CATEGORIES = [
  { name: 'LANGUAGES', color: '#38bdf8', r: 1.7, angle: 0 },
  { name: 'FRONTEND', color: '#06b6d4', r: 1.9, angle: (Math.PI / 4) },
  { name: 'BACKEND', color: '#10b981', r: 1.6, angle: (Math.PI / 2) },
  { name: 'AI / ML', color: '#a78bfa', r: 2.0, angle: (3 * Math.PI / 4) },
  { name: 'CYBERSECURITY', color: '#f43f5e', r: 1.8, angle: Math.PI },
  { name: 'DATABASES', color: '#f59e0b', r: 1.7, angle: (5 * Math.PI / 4) },
  { name: 'INFRASTRUCTURE', color: '#818cf8', r: 1.9, angle: (3 * Math.PI / 2) },
  { name: 'SYSTEMS', color: '#06b6d4', r: 1.6, angle: (7 * Math.PI / 4) },
]

export function TechnologyConstellationScene({
  activeSection,
}: TechnologyConstellationSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  const isActive = activeSection === 'universe'

  // Precompute category node coordinates
  const clusterPositions = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const x = Math.cos(cat.angle) * cat.r
      const y = Math.sin(cat.angle) * cat.r * 0.75
      const z = (Math.sin(cat.angle * 2) * 0.4) - 0.2
      return [x, y, z] as [number, number, number]
    })
  }, [])

  // Create connecting laser line geometry connecting each node to center
  const laserLines = useMemo(() => {
    const lines: THREE.Line[] = []
    clusterPositions.forEach(([x, y, z], idx) => {
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]
      const geom = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({
        color: CATEGORIES[idx].color,
        transparent: true,
        opacity: 0.35,
      })
      lines.push(new THREE.Line(geom, mat))
    })
    return lines
  }, [clusterPositions])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const targetScale = isActive ? 1.0 : 0.001
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 2.8)

    // Slow orbital rotation of constellation
    groupRef.current.rotation.z += delta * 0.05
    groupRef.current.rotation.y = Math.sin(performance.now() * 0.0006) * 0.12

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.2
      coreRef.current.rotation.y += delta * 0.3
    }
  })

  if (!isActive && groupRef.current?.scale.x === 0.001) return null

  return (
    <group ref={groupRef} position={[0, 0, -0.6]}>
      {/* Central Engineering Core Node */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbit Rings around core */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.45, 0.005, 8, 36]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
      </mesh>

      {/* Connecting Laser Beams to Categories */}
      {laserLines.map((line, idx) => (
        <primitive key={idx} object={line} />
      ))}

      {/* Floating 3D Category Nodes */}
      {clusterPositions.map(([x, y, z], idx) => {
        const cat = CATEGORIES[idx]
        return (
          <group key={idx} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial
                color={cat.color}
                emissive={cat.color}
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.11, 0.004, 6, 16]} />
              <meshBasicMaterial color={cat.color} transparent opacity={0.4} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
