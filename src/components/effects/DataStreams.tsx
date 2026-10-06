import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DataStreamProps {
  count?: number
}

export function DataStreams({ count = 8 }: DataStreamProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Build all stream objects once with useMemo
  const streamObjects = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      const radius = 2 + (i % 3) * 0.5
      const len = 1.5 + Math.random() * 2
      const speed = 0.3 + Math.random() * 0.4
      const offset = Math.random()
      const color = i % 2 === 0 ? '#06b6d4' : '#7c3aed'

      // Build geometry
      const points = [
        new THREE.Vector3(0, -len / 2, 0),
        new THREE.Vector3(0, len / 2, 0),
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const line = new THREE.Line(geometry, material)
      line.position.x = Math.cos(angle) * radius
      line.position.z = Math.sin(angle) * radius

      return { line, angle, radius, len, speed, offset }
    })
  }, [count])

  useFrame(() => {
    if (!groupRef.current) return
    const time = performance.now() * 0.001

    streamObjects.forEach(({ line, speed, offset, len }) => {
      const progress = ((time * speed + offset) % 1.5) / 1.5
      line.position.y = (progress - 0.5) * len * 2
      const mat = line.material as THREE.LineBasicMaterial
      mat.opacity = Math.sin(progress * Math.PI) * 0.3
    })
  })

  return (
    <group ref={groupRef}>
      {streamObjects.map(({ line }, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  )
}
