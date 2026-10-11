import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface HeroCinematicBackgroundProps {
  visible?: boolean
}

export function HeroCinematicBackground({ visible = true }: HeroCinematicBackgroundProps) {
  const prefersReduced = useReducedMotion()
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  // Subtle desktop mouse parallax (clamped to max ±6px horizontally, ±4px vertically)
  useEffect(() => {
    if (prefersReduced) return

    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2
        const ny = (e.clientY / window.innerHeight - 0.5) * 2
        setMouseOffset({
          x: Math.max(-6, Math.min(6, nx * -6)),
          y: Math.max(-4, Math.min(4, ny * -4)),
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [prefersReduced])

  return (
    <div
      className="global-cinematic-background hero-cinematic-env"
      aria-hidden="true"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* 1. Base Fallback Background Color */}
      <div className="hero-env-fallback" />

      {/* 2. Attached Cinematic Cyberpunk Background Image Layer */}
      <motion.div
        className="hero-env-image"
        animate={
          prefersReduced
            ? undefined
            : {
                x: mouseOffset.x,
                y: mouseOffset.y,
              }
        }
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 80,
          mass: 0.8,
        }}
      />

      {/* 3. Dark Cinematic Gradient Overlay (Preserving Readability Across All Sections) */}
      <div className="hero-env-overlay-desktop hidden md:block" />
      <div className="hero-env-overlay-mobile block md:hidden" />

      {/* 4. Subtle Cyan Atmospheric Horizon Glow (Directly Behind 3D Core) */}
      <div className="hero-env-horizon-glow" />

      {/* 5. Top Navbar Shadow Blending */}
      <div className="hero-env-top-blend" />
    </div>
  )
}
