import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface CinematicLightingProps {
  activeSection: SectionId
  sectionProgress: number
}

interface LightingMood {
  ambientColor: string
  ambientIntensity: number
  keyColor: string
  keyIntensity: number
  keyPos: [number, number, number]
  fillColor: string
  fillIntensity: number
  fillPos: [number, number, number]
  fogNear: number
  fogFar: number
}

const LIGHTING_MOODS: Record<SectionId, LightingMood> = {
  // Hero: deep black + cool blue/cyan
  hero: {
    ambientColor: '#090D12',
    ambientIntensity: 0.05,
    keyColor: '#00D9FF',
    keyIntensity: 0.38,
    keyPos: [6, 6, 8],
    fillColor: '#6575FF',
    fillIntensity: 0.18,
    fillPos: [-8, -4, -6],
    fogNear: 5.0,
    fogFar: 19.0,
  },
  // Engineering System: cool blue + white technical light
  'enter-system': {
    ambientColor: '#0D131A',
    ambientIntensity: 0.08,
    keyColor: '#38E8FF',
    keyIntensity: 0.34,
    keyPos: [0, 5, 6],
    fillColor: '#FFFFFF',
    fillIntensity: 0.22,
    fillPos: [0, -5, 4],
    fogNear: 4.5,
    fogFar: 17.0,
  },
  // Profile: neutral dark + subtle cyan rim
  about: {
    ambientColor: '#090D12',
    ambientIntensity: 0.06,
    keyColor: '#00D9FF',
    keyIntensity: 0.32,
    keyPos: [8, 2, 6],
    fillColor: '#A8B4C2',
    fillIntensity: 0.16,
    fillPos: [-6, 0, 4],
    fogNear: 5.0,
    fogFar: 18.0,
  },
  // How I Build: blue + controlled electric cyan
  mindset: {
    ambientColor: '#090D12',
    ambientIntensity: 0.07,
    keyColor: '#00D9FF',
    keyIntensity: 0.40,
    keyPos: [-4, 3, 6],
    fillColor: '#6575FF',
    fillIntensity: 0.24,
    fillPos: [4, -2, 5],
    fogNear: 4.5,
    fogFar: 18.0,
  },
  // Stack: deep blue + cyan network glow
  universe: {
    ambientColor: '#0D131A',
    ambientIntensity: 0.08,
    keyColor: '#6575FF',
    keyIntensity: 0.36,
    keyPos: [0, 6, 8],
    fillColor: '#00D9FF',
    fillIntensity: 0.30,
    fillPos: [0, -6, 6],
    fogNear: 5.0,
    fogFar: 20.0,
  },
  // Capabilities: cool blue + balanced cyan
  capabilities: {
    ambientColor: '#090D12',
    ambientIntensity: 0.06,
    keyColor: '#00D9FF',
    keyIntensity: 0.32,
    keyPos: [5, -2, 6],
    fillColor: '#8B7CFF',
    fillIntensity: 0.20,
    fillPos: [-5, 2, 5],
    fogNear: 4.8,
    fogFar: 18.0,
  },
  // Education: clean technical light + cyan
  education: {
    ambientColor: '#090D12',
    ambientIntensity: 0.06,
    keyColor: '#38E8FF',
    keyIntensity: 0.30,
    keyPos: [-6, 2, 6],
    fillColor: '#FFFFFF',
    fillIntensity: 0.18,
    fillPos: [6, -2, 5],
    fogNear: 5.0,
    fogFar: 18.0,
  },
  // Projects: dark neutral + selective project accent
  projects: {
    ambientColor: '#090D12',
    ambientIntensity: 0.06,
    keyColor: '#00D9FF',
    keyIntensity: 0.35,
    keyPos: [6, 3, 6],
    fillColor: '#6575FF',
    fillIntensity: 0.20,
    fillPos: [-4, -3, 5],
    fogNear: 4.5,
    fogFar: 17.5,
  },
  // Journey: deep violet/blue atmosphere
  journey: {
    ambientColor: '#0D131A',
    ambientIntensity: 0.07,
    keyColor: '#8B7CFF',
    keyIntensity: 0.34,
    keyPos: [-5, 4, 7],
    fillColor: '#6575FF',
    fillIntensity: 0.25,
    fillPos: [5, -3, 6],
    fogNear: 5.0,
    fogFar: 19.0,
  },
  // Certifications: dark blue + clean white light
  certifications: {
    ambientColor: '#090D12',
    ambientIntensity: 0.07,
    keyColor: '#FFFFFF',
    keyIntensity: 0.26,
    keyPos: [5, 2, 6],
    fillColor: '#6575FF',
    fillIntensity: 0.20,
    fillPos: [-5, -2, 5],
    fogNear: 4.8,
    fogFar: 18.0,
  },
  // Resume: neutral dark + cyan terminal glow
  resume: {
    ambientColor: '#090D12',
    ambientIntensity: 0.05,
    keyColor: '#00D9FF',
    keyIntensity: 0.28,
    keyPos: [0, 4, 7],
    fillColor: '#A8B4C2',
    fillIntensity: 0.15,
    fillPos: [0, -4, 5],
    fogNear: 5.2,
    fogFar: 20.0,
  },
  // Contact: dark cinematic + subtle cyan communication glow
  contact: {
    ambientColor: '#090D12',
    ambientIntensity: 0.07,
    keyColor: '#00D9FF',
    keyIntensity: 0.32,
    keyPos: [0, 2, 6],
    fillColor: '#6575FF',
    fillIntensity: 0.22,
    fillPos: [0, -4, 5],
    fogNear: 5.0,
    fogFar: 19.0,
  },
}

export function CinematicLighting({ activeSection }: CinematicLightingProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const keyRef = useRef<THREE.PointLight>(null)
  const fillRef = useRef<THREE.PointLight>(null)

  const curAmbientColor = useRef(new THREE.Color('#090D12'))
  const curKeyColor = useRef(new THREE.Color('#00D9FF'))
  const curFillColor = useRef(new THREE.Color('#6575FF'))

  useFrame((state, delta) => {
    const mood = LIGHTING_MOODS[activeSection] || LIGHTING_MOODS.hero
    const lerpSpeed = Math.min(delta * 2.8, 0.12)

    // Smooth lighting color transitions
    curAmbientColor.current.lerp(new THREE.Color(mood.ambientColor), lerpSpeed)
    curKeyColor.current.lerp(new THREE.Color(mood.keyColor), lerpSpeed)
    curFillColor.current.lerp(new THREE.Color(mood.fillColor), lerpSpeed)

    if (ambientRef.current) {
      ambientRef.current.color.copy(curAmbientColor.current)
      ambientRef.current.intensity += (mood.ambientIntensity - ambientRef.current.intensity) * lerpSpeed
    }

    if (keyRef.current) {
      keyRef.current.color.copy(curKeyColor.current)
      keyRef.current.intensity += (mood.keyIntensity - keyRef.current.intensity) * lerpSpeed
      keyRef.current.position.lerp(new THREE.Vector3(...mood.keyPos), lerpSpeed)
    }

    if (fillRef.current) {
      fillRef.current.color.copy(curFillColor.current)
      fillRef.current.intensity += (mood.fillIntensity - fillRef.current.intensity) * lerpSpeed
      fillRef.current.position.lerp(new THREE.Vector3(...mood.fillPos), lerpSpeed)
    }

    // Dynamic Fog modulation
    if (state.scene.fog && state.scene.fog instanceof THREE.Fog) {
      state.scene.fog.near += (mood.fogNear - state.scene.fog.near) * lerpSpeed
      state.scene.fog.far += (mood.fogFar - state.scene.fog.far) * lerpSpeed
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.06} color="#090D12" />
      <pointLight ref={keyRef} position={[6, 6, 8]} intensity={0.35} color="#00D9FF" />
      <pointLight ref={fillRef} position={[-8, -4, -6]} intensity={0.18} color="#6575FF" />
      <fog attach="fog" args={['#050608', 5, 19]} />
    </>
  )
}
