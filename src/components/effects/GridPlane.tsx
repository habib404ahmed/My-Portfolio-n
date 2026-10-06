import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GridPlaneProps {
  opacity?: number
}

export function GridPlane({ opacity = 0.04 }: GridPlaneProps) {
  const gridRef = useRef<THREE.GridHelper>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const mat = gridRef.current.material as THREE.LineBasicMaterial
    mat.transparent = true
    mat.opacity = opacity
    mat.depthWrite = false
  }, [opacity])

  useFrame(() => {
    if (!gridRef.current) return
    gridRef.current.position.z += 0.002
    if (gridRef.current.position.z > 2) {
      gridRef.current.position.z = 0
    }
  })

  return (
    <group>
      <gridHelper
        ref={gridRef}
        args={[40, 40, '#0369a1', '#020b18']}
        position={[0, -3.8, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}
