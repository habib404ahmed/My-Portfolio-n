import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'
import { cinematicScrollStore } from '@/stores/cinematicScrollStore'
import { techUniverseStore } from '@/stores/techUniverseStore'
import { qualityManager } from '@/stores/qualityManager'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TechnologyConstellationSceneProps {
  activeSection: SectionId
}

// 9 Category spatial anchors in 3D space
const CATEGORY_NODES = [
  { id: 'languages', name: 'LANGUAGES', color: '#00D9FF', r: 2.2, angle: 0 },
  { id: 'frontend', name: 'FRONTEND', color: '#6575FF', r: 2.35, angle: Math.PI / 4 },
  { id: 'backend', name: 'BACKEND', color: '#00D9FF', r: 2.15, angle: Math.PI / 2 },
  { id: 'ai-ml', name: 'AI / ML', color: '#38E8FF', r: 2.45, angle: (3 * Math.PI) / 4 },
  { id: 'security', name: 'CYBERSECURITY', color: '#00D9FF', r: 2.25, angle: Math.PI },
  { id: 'systems', name: 'SYSTEMS', color: '#6575FF', r: 2.15, angle: (5 * Math.PI) / 4 },
  { id: 'networking', name: 'NETWORKING', color: '#38E8FF', r: 2.3, angle: (3 * Math.PI) / 2 },
  { id: 'databases', name: 'DATABASES', color: '#6575FF', r: 2.2, angle: (7 * Math.PI) / 4 },
  { id: 'infrastructure', name: 'INFRASTRUCTURE', color: '#8B7CFF', r: 2.4, angle: 1.95 * Math.PI },
]

// ─── GPU GLSL SHADERS (Parallel Particle Simulation on Hardware) ───
const OrganismVertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uBreath;
  uniform float uDwell;
  uniform float uVelocity;
  uniform float uHoveredCluster;
  uniform vec3 uClusterTarget;
  uniform vec3 uClusterColor;
  uniform float uActiveCategory;

  attribute float aCluster;
  attribute vec3 aBaseColor;

  varying vec3 vColor;

  void main() {
    vec3 pos = position;

    // 1. Organic Curl Wave Displacement
    float wave = sin(pos.x * 2.8 + uTime * 1.3) * cos(pos.y * 2.4 + uTime * 1.1) * 0.16;
    float waveZ = cos(pos.z * 2.6 + uTime * 1.2) * 0.12;

    // 2. Mouse Field Disturbance
    vec2 pDiff = pos.xy - uPointer * vec2(1.8, 1.4);
    float pDist = length(pDiff);
    float mouseRepulse = max(0.0, 1.2 - pDist) * 0.18;

    vec3 deformed = pos + vec3(pDiff * mouseRepulse, waveZ);
    deformed.xy *= uBreath;
    deformed.z *= (uBreath * (1.0 + min(uVelocity * 0.35, 0.3)));

    // 3. Hovered Category Streamline
    if (uHoveredCluster >= 0.0 && abs(aCluster - uHoveredCluster) < 0.5) {
      deformed = mix(deformed, uClusterTarget * 0.75 + vec3(0.0, 0.0, wave), 0.45);
      vColor = mix(aBaseColor, uClusterColor, 0.75);
    } else {
      vColor = aBaseColor;
    }

    if (uActiveCategory > 0.5) {
      deformed.z -= 0.6;
    }

    vec4 mvPosition = modelViewMatrix * vec4(deformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation based on depth and dwell
    gl_PointSize = (48.0 / -mvPosition.z) * (1.0 + uDwell * 0.22);
  }
`

const OrganismFragmentShader = `
  varying vec3 vColor;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, dist) * 0.85;
    gl_FragColor = vec4(vColor, alpha);
  }
`

// Pre-allocated static vectors outside animation loop (Zero GC pressure)
const _scaleVec = new THREE.Vector3()
const _clusterTargetVec = new THREE.Vector3()
const _clusterColorVec = new THREE.Color()

export function TechnologyConstellationScene({
  activeSection,
}: TechnologyConstellationSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const organismCoreRef = useRef<THREE.Mesh>(null)
  const ambientPointsRef = useRef<THREE.Points>(null)

  const prefersReduced = useReducedMotion()
  const isActive = activeSection === 'universe'

  // Smoothed physics refs
  const smoothMouse = useRef(new THREE.Vector2(0, 0))
  const smoothDwell = useRef(0)
  const currentScale = useRef(0.001)

  // ─── 1. BUILD GPU-FRIENDLY ORGANISM GEOMETRY (Uploaded Once) ───
  const { organismGeometry, organismMaterial, categoryPositions } = useMemo(() => {
    const config = qualityManager.getConfig()
    const count = prefersReduced ? 800 : config.maxOrganismParticles

    const positions = new Float32Array(count * 3)
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

      // Organic spherical harmonic shell
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 0.55 + Math.pow(Math.random(), 2.2) * 1.15 + Math.sin(theta * 3) * Math.cos(phi * 2) * 0.22

      positions[idx] = r * Math.sin(phi) * Math.cos(theta)
      positions[idx + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72
      positions[idx + 2] = r * Math.cos(phi) * 0.65

      const colRand = Math.random()
      let c: THREE.Color
      if (colRand > 0.88) c = cyan
      else if (colRand > 0.6) c = blue
      else if (colRand > 0.45) c = violet
      else if (colRand > 0.4) c = white
      else c = blue.clone().multiplyScalar(0.4)

      baseColors[idx] = c.r
      baseColors[idx + 1] = c.g
      baseColors[idx + 2] = c.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aBaseColor', new THREE.BufferAttribute(baseColors, 3))
    geo.setAttribute('aCluster', new THREE.BufferAttribute(clusterIndices, 1))

    // Pre-calculated category positions
    const catPositions = CATEGORY_NODES.map((cat) => {
      const x = Math.cos(cat.angle) * cat.r
      const y = Math.sin(cat.angle) * cat.r * 0.68
      const z = Math.sin(cat.angle * 2) * 0.35 - 0.2
      return new THREE.Vector3(x, y, z)
    })

    // Custom GPU ShaderMaterial
    const mat = new THREE.ShaderMaterial({
      vertexShader: OrganismVertexShader,
      fragmentShader: OrganismFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uBreath: { value: 1.0 },
        uDwell: { value: 0.0 },
        uVelocity: { value: 0.0 },
        uHoveredCluster: { value: -1.0 },
        uClusterTarget: { value: new THREE.Vector3(0, 0, 0) },
        uClusterColor: { value: new THREE.Color(0, 0, 0) },
        uActiveCategory: { value: 0.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    return {
      organismGeometry: geo,
      organismMaterial: mat,
      categoryPositions: catPositions,
    }
  }, [prefersReduced])

  // ─── 2. BUILD AMBIENT VOLUMETRIC ATMOSPHERE ───
  const ambientGeometry = useMemo(() => {
    const config = qualityManager.getConfig()
    const count = prefersReduced ? 250 : Math.min(config.maxAmbientParticles, 600)
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
  }, [prefersReduced])

  // ─── 3. CLEAN RESOURCE DISPOSAL ───
  useEffect(() => {
    return () => {
      organismGeometry.dispose()
      organismMaterial.dispose()
      ambientGeometry.dispose()
    }
  }, [organismGeometry, organismMaterial, ambientGeometry])

  // ─── 4. ULTRA-FAST 60FPS SHADER UNIFORM UPDATES (ZERO CPU LOOPS) ───
  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Off-screen Culling: Sleep completely when offscreen and scaled out
    if (!isActive && currentScale.current < 0.005) {
      if (groupRef.current.visible) groupRef.current.visible = false
      return
    }
    groupRef.current.visible = true

    const time = state.clock.getElapsedTime()
    const scrollState = cinematicScrollStore.getState()
    const universeStore = techUniverseStore.getState()
    const { hoveredCategory, activeCategory, isDwell } = universeStore

    // Smooth transition scale
    const targetScale = isActive ? 1.0 : 0.001
    currentScale.current += (targetScale - currentScale.current) * Math.min(delta * 3.5, 0.2)
    _scaleVec.setScalar(currentScale.current)
    groupRef.current.scale.copy(_scaleVec)

    // Smooth pointer damping
    smoothMouse.current.x += (scrollState.mouse.x - smoothMouse.current.x) * Math.min(delta * 4.5, 0.25)
    smoothMouse.current.y += (scrollState.mouse.y - smoothMouse.current.y) * Math.min(delta * 4.5, 0.25)

    // Dwell breathing state
    const targetDwell = isDwell ? 1.0 : 0.0
    smoothDwell.current += (targetDwell - smoothDwell.current) * Math.min(delta * 2.0, 0.15)

    const baseBreath = Math.sin(time * 0.9) * 0.08
    const dwellBreath = smoothDwell.current * Math.sin(time * 1.5) * 0.14
    const totalBreath = 1.0 + baseBreath + dwellBreath

    // Rotational inclination
    groupRef.current.rotation.y = time * 0.04 + smoothMouse.current.x * 0.22
    groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.06 - smoothMouse.current.y * 0.18

    // Active & Hovered category indices
    const hoveredIndex = hoveredCategory
      ? CATEGORY_NODES.findIndex((c) => c.id === hoveredCategory)
      : -1

    // Update GPU Shader Uniforms (Constant-time O(1) CPU operations)
    const uniforms = organismMaterial.uniforms
    uniforms.uTime.value = time
    uniforms.uPointer.value.copy(smoothMouse.current)
    uniforms.uBreath.value = totalBreath
    uniforms.uDwell.value = smoothDwell.current
    uniforms.uVelocity.value = scrollState.scrollVelocity
    uniforms.uHoveredCluster.value = hoveredIndex
    uniforms.uActiveCategory.value = activeCategory ? 1.0 : 0.0

    if (hoveredIndex !== -1) {
      _clusterTargetVec.copy(categoryPositions[hoveredIndex])
      _clusterColorVec.set(CATEGORY_NODES[hoveredIndex].color)
      uniforms.uClusterTarget.value.copy(_clusterTargetVec)
      uniforms.uClusterColor.value.copy(_clusterColorVec)
    }

    // Organism Core Mesh rotation
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

  return (
    <group ref={groupRef} position={[0, -0.05, -0.7]}>
      {/* ─── LAYER 1: AMBIENT VOLUMETRIC ATMOSPHERE ─── */}
      <points ref={ambientPointsRef} geometry={ambientGeometry}>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* ─── LAYER 2: GPU-ACCELERATED LIVING COMPUTATIONAL ORGANISM ─── */}
      <points geometry={organismGeometry} material={organismMaterial} />

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
        <torusGeometry args={[0.55, 0.006, 12, 40]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.38} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[0.75, 0.004, 12, 40]} />
        <meshBasicMaterial color="#6575FF" transparent opacity={0.25} />
      </mesh>

      {/* ─── LAYER 3: 9 SPATIAL CATEGORY GLASS HUBS ─── */}
      {categoryPositions.map((pos, idx) => {
        const cat = CATEGORY_NODES[idx]
        return (
          <group key={cat.id} position={[pos.x, pos.y, pos.z]}>
            <mesh>
              <sphereGeometry args={[0.075, 14, 14]} />
              <meshStandardMaterial
                color={cat.color}
                emissive={cat.color}
                emissiveIntensity={0.65}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
            <mesh rotation={[Math.PI / 4, 0, 0]}>
              <torusGeometry args={[0.13, 0.005, 6, 20]} />
              <meshBasicMaterial color={cat.color} transparent opacity={0.5} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
