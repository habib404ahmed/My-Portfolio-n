import React from 'react'

/**
 * Phase 13.5 Global Stationary Cinematic Background
 * Permanently fixed viewport wallpaper behind all page content.
 * Does not move, zoom, rotate, parallax, or animate on scroll or mouse move.
 */
export function GlobalCinematicBackground() {
  return (
    <div
      className="global-cinematic-background hero-cinematic-env"
      aria-hidden="true"
    >
      {/* 1. Base Fallback Background Color */}
      <div className="global-bg-fallback hero-env-fallback" />

      {/* 2. Completely Stationary Global Cinematic Cyberpunk Background Image */}
      <div className="global-bg-image hero-env-image" />

      {/* 3. Dark Cinematic Gradient Overlay (Preserving Readability Across All Sections) */}
      <div className="global-bg-overlay-desktop hero-env-overlay-desktop hidden md:block" />
      <div className="global-bg-overlay-mobile hero-env-overlay-mobile block md:hidden" />

      {/* 4. Subtle Cyan Atmospheric Horizon Glow */}
      <div className="global-bg-horizon-glow hero-env-horizon-glow" />

      {/* 5. Top Navbar Shadow Blending */}
      <div className="global-bg-top-blend hero-env-top-blend" />
    </div>
  )
}

// Backwards compatibility alias
export const HeroCinematicBackground = GlobalCinematicBackground
