import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'

interface CinematicCameraProps {
  activeSection: SectionId
  sectionProgress: number
  scrollProgress: number
  mouseX: number
  mouseY: number
  prefersReducedMotion?: boolean
}

// Target Camera Positions & LookAt Coordinates per Section
// Designed to position 3D objects in negative space while respecting readability
const CAMERA_TARGETS: Record<SectionId, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  hero: {
    pos: [0, 0, 6.2],
    lookAt: [0, 0, 0],
  },
  'enter-system': {
    pos: [0, -0.2, 5.8],
    lookAt: [0, -0.2, 0],
  },
  about: {
    pos: [0.7, 0.15, 5.8],
    lookAt: [0.3, 0.1, 0],
  },
  mindset: {
    pos: [-0.6, -0.2, 5.6],
    lookAt: [-0.2, -0.2, 0],
  },
  universe: {
    pos: [0, 0, 6.6],
    lookAt: [0, 0, 0],
  },
  capabilities: {
    pos: [0.5, -0.2, 5.6],
    lookAt: [0.2, -0.2, 0],
  },
  education: {
    pos: [-0.5, 0.1, 5.6],
    lookAt: [-0.2, 0.1, 0],
  },
  projects: {
    pos: [0.6, 0.0, 5.4],
    lookAt: [0.2, 0.0, 0],
  },
  journey: {
    pos: [-0.4, 0.2, 6.0],
    lookAt: [-0.1, 0.1, 0],
  },
  certifications: {
    pos: [0.5, -0.15, 5.5],
    lookAt: [0.2, -0.1, 0],
  },
  resume: {
    pos: [0, 0, 5.9],
    lookAt: [0, 0, 0],
  },
  contact: {
    pos: [0, -0.1, 5.6],
    lookAt: [0, -0.1, 0],
  },
}

export function CinematicCamera({
  activeSection,
  mouseX,
  mouseY,
  prefersReducedMotion = false,
}: CinematicCameraProps) {
  const { camera } = useThree()
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_, delta) => {
    const target = CAMERA_TARGETS[activeSection] || CAMERA_TARGETS.hero

    // Subtle parallax offset (clamped and weighted)
    const parallaxWeight = prefersReducedMotion ? 0 : 0.18
    const parallaxX = mouseX * parallaxWeight
    const parallaxY = -mouseY * (parallaxWeight * 0.75)

    const targetPos = new THREE.Vector3(
      target.pos[0] + parallaxX,
      target.pos[1] + parallaxY,
      target.pos[2]
    )

    const targetLook = new THREE.Vector3(
      target.lookAt[0] + parallaxX * 0.4,
      target.lookAt[1] + parallaxY * 0.4,
      target.lookAt[2]
    )

    // Smooth cinematic lerp (weighted damping for fluid physical camera feel)
    const lerpSpeed = prefersReducedMotion ? 1.0 : Math.min(delta * 2.2, 0.1)
    camera.position.lerp(targetPos, lerpSpeed)
    currentLookAt.current.lerp(targetLook, lerpSpeed)

    camera.lookAt(currentLookAt.current)
  })

  return null
}
