import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { SectionId } from '@/hooks/useCinematicScroll'
import { cinematicScrollStore } from '@/stores/cinematicScrollStore'
import { techUniverseStore } from '@/stores/techUniverseStore'
import { qualityManager } from '@/stores/qualityManager'

interface CinematicCameraProps {
  activeSection: SectionId
  prefersReducedMotion?: boolean
}

// Base Camera Positions & LookAt Coordinates per Section
const CAMERA_TARGETS: Record<SectionId, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  hero: { pos: [0, 0, 6.2], lookAt: [0, 0, 0] },
  'enter-system': { pos: [0, -0.22, 5.7], lookAt: [0, -0.2, 0] },
  about: { pos: [0.72, 0.16, 5.75], lookAt: [0.28, 0.12, 0] },
  mindset: { pos: [-0.65, -0.22, 5.5], lookAt: [-0.22, -0.2, 0] },
  universe: { pos: [0, 0.02, 6.7], lookAt: [0, 0, 0] },
  capabilities: { pos: [0.52, -0.22, 5.5], lookAt: [0.22, -0.2, 0] },
  education: { pos: [-0.52, 0.12, 5.5], lookAt: [-0.2, 0.1, 0] },
  projects: { pos: [0.62, 0.02, 5.35], lookAt: [0.22, 0.0, 0] },
  journey: { pos: [-0.42, 0.22, 5.95], lookAt: [-0.12, 0.1, 0] },
  certifications: { pos: [0.52, -0.16, 5.45], lookAt: [0.2, -0.1, 0] },
  resume: { pos: [0, 0.02, 5.85], lookAt: [0, 0, 0] },
  contact: { pos: [0, -0.12, 5.5], lookAt: [0, -0.1, 0] },
}

// Pre-allocated static vectors outside animation loop (Zero GC pressure)
const _targetPos = new THREE.Vector3()
const _targetLook = new THREE.Vector3()

export function CinematicCamera({
  activeSection,
  prefersReducedMotion = false,
}: CinematicCameraProps) {
  const { camera } = useThree()
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_, delta) => {
    // 1. Automatic FPS adaptation update
    qualityManager.updateFrame(delta)

    const baseTarget = CAMERA_TARGETS[activeSection] || CAMERA_TARGETS.hero
    const scrollState = cinematicScrollStore.getState()
    const { sectionProgress, scrollVelocity, mouse } = scrollState

    // 2. Movie-Trailer Camera Progression
    let dollyZ = 0
    let panY = 0

    if (!prefersReducedMotion) {
      if (sectionProgress < 0.4) {
        const entryT = sectionProgress / 0.4
        const easeEntry = Math.sin((entryT * Math.PI) / 2)
        dollyZ = (1 - easeEntry) * 0.4
      } else if (sectionProgress > 0.75) {
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

    // 3. Velocity Momentum
    const velocityPush = prefersReducedMotion ? 0 : scrollVelocity * 0.22

    // 4. Subtle Parallax
    const parallaxWeight = prefersReducedMotion ? 0 : 0.16
    const parallaxX = mouse.x * parallaxWeight
    const parallaxY = -mouse.y * (parallaxWeight * 0.75)

    _targetPos.set(
      baseTarget.pos[0] + parallaxX,
      baseTarget.pos[1] + parallaxY + panY,
      baseTarget.pos[2] + dollyZ - velocityPush
    )

    _targetLook.set(
      baseTarget.lookAt[0] + parallaxX * 0.35,
      baseTarget.lookAt[1] + parallaxY * 0.35 + panY * 0.5,
      baseTarget.lookAt[2]
    )

    // Weighted physical lerp (smooth cinematic camera damping)
    const lerpSpeed = prefersReducedMotion ? 1.0 : Math.min(delta * 2.4, 0.12)
    camera.position.lerp(_targetPos, lerpSpeed)
    currentLookAt.current.lerp(_targetLook, lerpSpeed)

    camera.lookAt(currentLookAt.current)

    // Subtle FOV response to velocity
    if (camera instanceof THREE.PerspectiveCamera && !prefersReducedMotion) {
      const targetFov = 50 + scrollVelocity * 2.0
      camera.fov += (targetFov - camera.fov) * lerpSpeed
      camera.updateProjectionMatrix()
    }
  })

  return null
}
