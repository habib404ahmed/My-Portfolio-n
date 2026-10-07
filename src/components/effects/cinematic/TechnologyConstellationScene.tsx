import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'
import { useCinematicScroll } from '@/hooks/useCinematicScroll'
import { techUniverseStore } from '@/stores/techUniverseStore'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TechnologyConstellationSceneProps {
  activeSection: SectionId
}

// 9 Category spatial anchors in 3D space (radians & radius)
const CATEGORY_NODES = [
  { id: 'languages', name: 'LANGUAGES', color: '#00D9FF', r: 2.2, angle: 0 },
  { id: 'frontend', name: 'FRONTEND', color: '#6575FF', r: 2.35, angle: (Math.PI / 4) },
  { id: 'backend', name: 'BACKEND', color: '#00D9FF', r: 2.15, angle: (Math.PI / 2) },
  { id: 'ai-ml', name: 'AI / ML', color: '#38E8FF', r: 2.45, angle: (3 * Math.PI / 4) },
  { id: 'security', name: 'CYBERSECURITY', color: '#00D9FF', r: 2.25, angle: Math.PI },
  { id: 'systems', name: 'SYSTEMS', color: '#6575FF', r: 2.15, angle: (5 * Math.PI / 4) },
  { id: 'networking', name: 'NETWORKING', color: '#38E8FF', r: 2.3, angle: (3 * Math.PI / 2) },
  { id: 'databases', name: 'DATABASES', color: '#6575FF', r: 2.2, angle: (7 * Math.PI / 4) },
  { id: 'infrastructure', name: 'INFRASTRUCTURE', color: '#8B7CFF', r: 2.4, angle: (1.95 * Math.PI) },
]

export function TechnologyConstellationScene({
  activeSection,
}: TechnologyConstellationSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const organismPointsRef = useRef<THREE.Points>(null)
  const ambientPointsRef = useRef<THREE.Points>(null)
  const organismCoreRef = useRef<THREE.Mesh>(null)

  const { sectionProgress, scrollVelocity } = useCinematicScroll()
  const prefersReduced = useReducedMotion()

  const isActive = activeSection === 'universe'

  // Smoothed physics vectors
  const smoothMouse = useRef(new THREE.Vector2(0, 0))
  const smoothDwell = useRef(0)
  const targetScale = useRef(0.001)

  // ─── 1. BUILD LIVING COMPUTATIONAL ORGANISM (2,200 GPU PARTICLES) ───
  const { organismGeometry, originalPositions, clusterIndices, baseColors } = useMemo(() => {
    const count = 2200
    const positions = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const baseColors = new Float32Array(count * 3)
    const clusterIndices = new Float32Array(count)

    const cyan = new THREE.Color('#00D9FF')
    const blue = new THREE.Color('#5577FF')
    const violet = new THREE.Color('#8175FF')
    const white = new THREE.Color('#F5F8FA')

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      const cluster = i % 9
      clusterIndices[i] = cluster

      // Complex organic shell: spherical harmonics + toroidal shell
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 0.55 + Math.pow(Math.random(), 2.2) * 1.15 + (Math.sin(theta * 3) * Math.cos(phi * 2) * 0.22)

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = (r * Math.sin(phi) * Math.sin(theta)) * 0.72
      const z = (r * Math.cos(phi)) * 0.65

      positions[idx] = x
      positions[idx + 1] = y
      positions[idx + 2] = z

      originalPositions[idx] = x
      originalPositions[idx + 1] = y
      originalPositions[idx + 2] = z

      // Luminous color distribution (70% deep blue/neutral, 20% blue, 7% cyan, 3% violet)
      const colRand = Math.random()
      let c: THREE.Color
      if (colRand > 0.88) c = cyan
      else if (colRand > 0.6) c = blue
      else if (colRand > 0.45) c = violet
      else if (colRand > 0.4) c = white
      else c = blue.clone().multiplyScalar(0.4)

      colors[idx] = c.r
      colors[idx + 1] = c.g
      colors[idx + 2] = c.b

      baseColors[idx] = c.r
      baseColors[idx + 1] = c.g
      baseColors[idx + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return {
      organismGeometry: geo,
      originalPositions,
      clusterIndices,
      baseColors,
    }
  }, [])

  // ─── 2. BUILD AMBIENT VOLUMETRIC ATMOSPHERE (800 PARTICLES) ───
  const ambientGeometry = useMemo(() => {
    const count = 750
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const cyan = new THREE.Color('#00D9FF')
    const deepBlue = new THREE.Color('#101D38')

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      positions[idx] = (Math.random() - 0.5) * 8.5
      positions[idx + 1] = (Math.random() - 0.5) * 6.5
      positions[idx + 2] = (Math.random() - 0.5) * 4.5 - 1.0

      const c = Math.random() > 0.7 ? cyan : deepBlue
      colors[idx] = c.r
      colors[idx + 1] = c.g
      colors[idx + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  // ─── 3. SPATIAL CATEGORY HUB NODES ───
  const categoryPositions = useMemo(() => {
    return CATEGORY_NODES.map((cat) => {
      const x = Math.cos(cat.angle) * cat.r
      const y = Math.sin(cat.angle) * cat.r * 0.68
      const z = Math.sin(cat.angle * 2) * 0.35 - 0.2
      return [x, y, z] as [number, number, number]
    })
  }, [])

  // ─── 4. CONNECTING OPTICAL CONDUIT LINES ───
  const opticalLines = useMemo(() => {
    const lines: THREE.Line[] = []
    categoryPositions.forEach(([x, y, z], idx) => {
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]
      const geom = new THREE.BufferGeometry().setFromPoints(points)
      const mat = new THREE.LineBasicMaterial({
        color: CATEGORY_NODES[idx].color,
        transparent: true,
        opacity: 0.28,
      })
      lines.push(new THREE.Line(geom, mat))
    })
    return lines
  }, [categoryPositions])

  // Track pointer movements globally inside the section
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isActive) return
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      techUniverseStore.updatePointer(x, y)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [isActive])

  // ─── 5. 60FPS LIVING DEFORMATION & VESPER MOTION DIRECTING ───
  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Idle optimization: sleep when offscreen
    if (!isActive && groupRef.current.scale.x < 0.005) {
      groupRef.current.visible = false
      return
    }
    groupRef.current.visible = true

    const time = state.clock.getElapsedTime()
    const store = techUniverseStore.getState()
    const { hoveredCategory, activeCategory, pointer, isDwell } = store

    // Transition scale based on section active state
    targetScale.current = isActive ? 1.0 : 0.001
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
      delta * 3.2
    )

    // Smooth pointer physics with spring damping
    smoothMouse.current.x += (pointer.x - smoothMouse.current.x) * delta * 4.5
    smoothMouse.current.y += (pointer.y - smoothMouse.current.y) * delta * 4.5

    // Dwell breathing state
    const targetDwell = isDwell ? 1.0 : 0.0
    smoothDwell.current += (targetDwell - smoothDwell.current) * delta * 2.0

    // Organic organism breathing (slow rhythmic expansion)
    const baseBreath = Math.sin(time * 0.9) * 0.08
    const dwellBreath = smoothDwell.current * Math.sin(time * 1.5) * 0.14
    const totalBreath = 1.0 + baseBreath + dwellBreath

    // Subtle organism rotation & pointer inclination
    groupRef.current.rotation.y = time * 0.04 + smoothMouse.current.x * 0.22
    groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.06 - smoothMouse.current.y * 0.18

    // Active Category Metamorphosis: Camera / Object pushes forward
    const activeIndex = activeCategory
      ? CATEGORY_NODES.findIndex((c) => c.id === activeCategory.id)
      : -1
    const hoveredIndex = hoveredCategory
      ? CATEGORY_NODES.findIndex((c) => c.id === hoveredCategory)
      : -1

    // Update Living Computational Organism Particles
    if (organismPointsRef.current && !prefersReduced) {
      const posAttr = organismGeometry.attributes.position as THREE.BufferAttribute
      const colAttr = organismGeometry.attributes.color as THREE.BufferAttribute
      const pos = posAttr.array as Float32Array
      const cols = colAttr.array as Float32Array

      // Velocity trail stretch factor
      const velocityStretch = 1.0 + Math.min(scrollVelocity * 0.4, 0.35)

      for (let i = 0; i < 2200; i++) {
        const idx = i * 3
        const ox = originalPositions[idx]
        const oy = originalPositions[idx + 1]
        const oz = originalPositions[idx + 2]
        const cluster = clusterIndices[i]

        // Curl-like organic wave deformation
        const wave = Math.sin(ox * 3.0 + time * 1.4) * Math.cos(oy * 2.5 + time * 1.1) * 0.16
        const waveZ = Math.cos(oz * 2.8 + time * 1.2) * 0.12

        // Mouse displacement: particles gently bend toward cursor
        const dx = ox - smoothMouse.current.x * 1.8
        const dy = oy - smoothMouse.current.y * 1.4
        const dist = Math.sqrt(dx * dx + dy * dy)
        const mouseRepulse = Math.max(0, 1.2 - dist) * 0.18

        let targetX = (ox + dx * mouseRepulse) * totalBreath
        let targetY = (oy + dy * mouseRepulse) * totalBreath
        let targetZ = (oz + waveZ) * totalBreath * velocityStretch

        // If hovered category: streamline particles belonging to that sector toward the category hub
        if (hoveredIndex !== -1 && cluster === hoveredIndex) {
          const [hx, hy, hz] = categoryPositions[hoveredIndex]
          targetX = THREE.MathUtils.lerp(targetX, hx * 0.75, 0.45)
          targetY = THREE.MathUtils.lerp(targetY, hy * 0.75, 0.45)
          targetZ = THREE.MathUtils.lerp(targetZ, hz * 0.75 + wave, 0.45)

          // Illuminate particles in category accent color
          const catCol = new THREE.Color(CATEGORY_NODES[hoveredIndex].color)
          cols[idx] = THREE.MathUtils.lerp(cols[idx], catCol.r, 0.15)
          cols[idx + 1] = THREE.MathUtils.lerp(cols[idx + 1], catCol.g, 0.15)
          cols[idx + 2] = THREE.MathUtils.lerp(cols[idx + 2], catCol.b, 0.15)
        } else {
          // Revert to natural base color
          cols[idx] = THREE.MathUtils.lerp(cols[idx], baseColors[idx], 0.08)
          cols[idx + 1] = THREE.MathUtils.lerp(cols[idx + 1], baseColors[idx + 1], 0.08)
          cols[idx + 2] = THREE.MathUtils.lerp(cols[idx + 2], baseColors[idx + 2], 0.08)
        }

        // Active Category Metamorphosis: Frame center when modal is open
        if (activeIndex !== -1) {
          targetZ -= 0.6 // deeper backdrop recession to keep focal clarity
        }

        pos[idx] = targetX
        pos[idx + 1] = targetY
        pos[idx + 2] = targetZ
      }

      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
    }

    // Central Nucleus Mesh deformation
    if (organismCoreRef.current) {
      organismCoreRef.current.rotation.x += delta * 0.35
      organismCoreRef.current.rotation.z += delta * 0.25
      const coreScale = totalBreath * 0.26
      organismCoreRef.current.scale.set(coreScale, coreScale, coreScale)
    }

    // Ambient dust drift
    if (ambientPointsRef.current) {
      ambientPointsRef.current.rotation.y = time * 0.015
    }
  })

  if (!isActive && targetScale.current < 0.005) return null

  return (
    <group ref={groupRef} position={[0, -0.05, -0.7]}>
      {/* ─── LAYER 1: AMBIENT VOLUMETRIC ATMOSPHERE ─── */}
      <points ref={ambientPointsRef} geometry={ambientGeometry}>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* ─── LAYER 2: CENTRAL LIVING COMPUTATIONAL ORGANISM ─── */}
      <points ref={organismPointsRef} geometry={organismGeometry}>
        <pointsMaterial
          size={0.048}
          vertexColors
          transparent
          opacity={0.78}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Central Luminous Organism Nucleus */}
      <mesh ref={organismCoreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Resonant Gyroscopic Orbit Rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.55, 0.006, 12, 48]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.38} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[0.75, 0.004, 12, 48]} />
        <meshBasicMaterial color="#6575FF" transparent opacity={0.25} />
      </mesh>

      {/* ─── LAYER 3: OPTICAL CONDUIT LASERS TO 9 CATEGORY HUBS ─── */}
      {opticalLines.map((line, idx) => (
        <primitive key={idx} object={line} />
      ))}

      {/* ─── LAYER 4: 9 SPATIAL CATEGORY GLASS HUBS ─── */}
      {categoryPositions.map(([x, y, z], idx) => {
        const cat = CATEGORY_NODES[idx]
        return (
          <group key={cat.id} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.075, 20, 20]} />
              <meshStandardMaterial
                color={cat.color}
                emissive={cat.color}
                emissiveIntensity={0.65}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
            {/* Luminous Glass Halo Ring */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.13, 0.005, 8, 24]} />
              <meshBasicMaterial color={cat.color} transparent opacity={0.5} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
