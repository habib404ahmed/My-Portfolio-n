import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'
import { techUniverseStore } from '@/stores/techUniverseStore'

interface CinematicCameraProps {
  activeSection: SectionId
  sectionProgress: number
  scrollProgress: number
  scrollVelocity: number
  mouseX: number
  mouseY: number
  prefersReducedMotion?: boolean
}

// Base Camera Positions & LookAt Coordinates per Section
// Foreground/Midground/Background alignment
const CAMERA_TARGETS: Record<SectionId, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  hero: {
    pos: [0, 0, 6.2],
    lookAt: [0, 0, 0],
  },
  'enter-system': {
    pos: [0, -0.22, 5.7],
    lookAt: [0, -0.2, 0],
  },
  about: {
    pos: [0.72, 0.16, 5.75],
    lookAt: [0.28, 0.12, 0],
  },
  mindset: {
    pos: [-0.65, -0.22, 5.5],
    lookAt: [-0.22, -0.2, 0],
  },
  universe: {
    pos: [0, 0.02, 6.7],
    lookAt: [0, 0, 0],
  },
  capabilities: {
    pos: [0.52, -0.22, 5.5],
    lookAt: [0.22, -0.2, 0],
  },
  education: {
    pos: [-0.52, 0.12, 5.5],
    lookAt: [-0.2, 0.1, 0],
  },
  projects: {
    pos: [0.62, 0.02, 5.35],
    lookAt: [0.22, 0.0, 0],
  },
  journey: {
    pos: [-0.42, 0.22, 5.95],
    lookAt: [-0.12, 0.1, 0],
  },
  certifications: {
    pos: [0.52, -0.16, 5.45],
    lookAt: [0.2, -0.1, 0],
  },
  resume: {
    pos: [0, 0.02, 5.85],
    lookAt: [0, 0, 0],
  },
  contact: {
    pos: [0, -0.12, 5.5],
    lookAt: [0, -0.1, 0],
  },
}

export function CinematicCamera({
  activeSection,
  sectionProgress,
  scrollVelocity,
  mouseX,
  mouseY,
  prefersReducedMotion = false,
}: CinematicCameraProps) {
  const { camera } = useThree()
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_, delta) => {
    const baseTarget = CAMERA_TARGETS[activeSection] || CAMERA_TARGETS.hero

    // 1. Movie-Trailer Camera Progression (Dolly in on entry, hold, move through on exit)
    // SectionProgress: 0.0 (entry) -> 0.5 (apex) -> 1.0 (exit transition)
    let dollyZ = 0
    let panY = 0

    if (!prefersReducedMotion) {
      if (sectionProgress < 0.4) {
        // Dolly in: starts slightly back, moves into focal depth
        const entryT = sectionProgress / 0.4
        const easeEntry = Math.sin((entryT * Math.PI) / 2) // smooth ease-out
        dollyZ = (1 - easeEntry) * 0.4
      } else if (sectionProgress > 0.75) {
        // Exit transition: moves through/past scene anticipating next shot
        const exitT = (sectionProgress - 0.75) / 0.25
        dollyZ = -exitT * 0.35
        panY = exitT * 0.1
      }

      // Vesper Motion System: Camera pushes forward into the living scene when category opens
      if (activeSection === 'universe') {
        const universeState = techUniverseStore.getState()
        if (universeState.activeCategory) {
          dollyZ -= 1.15
          if (universeState.activeTech) {
            dollyZ -= 0.3
          }
        }
      }
    }

    // 2. Velocity Momentum: High scroll speed creates subtle lens compression
    const velocityPush = prefersReducedMotion ? 0 : scrollVelocity * 0.22

    // 3. Subtle Parallax (weighted, organic physical camera movement)
    const parallaxWeight = prefersReducedMotion ? 0 : 0.16
    const parallaxX = mouseX * parallaxWeight
    const parallaxY = -mouseY * (parallaxWeight * 0.75)

    const targetPos = new THREE.Vector3(
      baseTarget.pos[0] + parallaxX,
      baseTarget.pos[1] + parallaxY + panY,
      baseTarget.pos[2] + dollyZ - velocityPush
    )

    const targetLook = new THREE.Vector3(
      baseTarget.lookAt[0] + parallaxX * 0.35,
      baseTarget.lookAt[1] + parallaxY * 0.35 + panY * 0.5,
      baseTarget.lookAt[2]
    )

    // Weighted physical lerp (smooth cinematic camera damping)
    const lerpSpeed = prefersReducedMotion ? 1.0 : Math.min(delta * 2.4, 0.12)
    camera.position.lerp(targetPos, lerpSpeed)
    currentLookAt.current.lerp(targetLook, lerpSpeed)

    camera.lookAt(currentLookAt.current)

    // Subtle FOV response to velocity (movie camera lens breathing)
    if (camera instanceof THREE.PerspectiveCamera && !prefersReducedMotion) {
      const targetFov = 50 + scrollVelocity * 2.0
      camera.fov += (targetFov - camera.fov) * lerpSpeed
      camera.updateProjectionMatrix()
    }
  })

  return null
}
