import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const trailRef1 = useRef<HTMLDivElement>(null)
  const trailRef2 = useRef<HTMLDivElement>(null)

  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Only enable on devices with fine pointer and hover capability (Desktop / Mouse)
    const mediaFine = window.matchMedia('(pointer: fine) and (hover: hover)')
    if (!mediaFine.matches) return
    setIsSupported(true)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafId: number
    let mouseX = -100
    let mouseY = -100
    let currX = -100
    let currY = -100

    // Short micro-trail coordinates
    let trail1X = -100
    let trail1Y = -100
    let trail2X = -100
    let trail2Y = -100

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (isHidden) setIsHidden(false)

      const target = e.target as HTMLElement | null
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input, select, textarea, .project-card, .clickable, .nav-link') ||
          window.getComputedStyle(target).cursor === 'pointer'
        )
        setIsPointer(isInteractive)
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      // Trigger subtle pulse ring animation at current position
      if (pulseRef.current && !prefersReducedMotion) {
        pulseRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(0.2)`
        pulseRef.current.style.opacity = '0.9'
        pulseRef.current.style.transition = 'none'

        requestAnimationFrame(() => {
          if (pulseRef.current) {
            pulseRef.current.style.transition = 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease-out'
            pulseRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.6)`
            pulseRef.current.style.opacity = '0'
          }
        })
      }
    }

    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    const animate = () => {
      if (prefersReducedMotion) {
        currX = mouseX
        currY = mouseY
      } else {
        // High-precision smooth follow (fast lerp: 0.55 for responsive 3-6ms visual feel)
        currX += (mouseX - currX) * 0.55
        currY += (mouseY - currY) * 0.55

        // Micro-trail 1 (subtle, 2-3 tiny fading particles)
        trail1X += (currX - trail1X) * 0.35
        trail1Y += (currY - trail1Y) * 0.35

        // Micro-trail 2
        trail2X += (trail1X - trail2X) * 0.28
        trail2Y += (trail1Y - trail2Y) * 0.28
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currX}px, ${currY}px)`
      }

      if (trailRef1.current && !prefersReducedMotion) {
        trailRef1.current.style.transform = `translate(${trail1X}px, ${trail1Y}px)`
      }
      if (trailRef2.current && !prefersReducedMotion) {
        trailRef2.current.style.transform = `translate(${trail2X}px, ${trail2Y}px)`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [isHidden])

  if (!isSupported) return null

  // State calculations
  const scale = isClicking ? 0.85 : isPointer ? 1.15 : 1
  const arrowColor = isClicking ? '#22d3ee' : isPointer ? '#38bdf8' : '#ffffff'
  const strokeColor = isClicking ? '#06b6d4' : isPointer ? '#06b6d4' : 'rgba(6, 182, 212, 0.7)'

  const dropShadow = isClicking
    ? 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.95)) drop-shadow(0 0 18px rgba(6, 182, 212, 0.6))'
    : isPointer
    ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 14px rgba(6, 182, 212, 0.35))'
    : 'drop-shadow(0 0 3px rgba(6, 182, 212, 0.5)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8))'

  return (
    <>
      {/* Hide native cursor ONLY on devices where fine mouse pointer is active */}
      <style>{`
        @media (pointer: fine) and (hover: hover) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Subtle Click Pulse Activation Ring */}
      <div
        id="custom-cursor-pulse"
        ref={pulseRef}
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          width: 24,
          height: 24,
          top: -12,
          left: -12,
          border: '1.5px solid rgba(6, 182, 212, 0.85)',
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.7)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
        aria-hidden="true"
      />

      {/* Subtle Micro-Trail Particle 2 (Older) */}
      <div
        ref={trailRef2}
        className="fixed pointer-events-none z-[9997]"
        style={{
          width: 2.5,
          height: 2.5,
          top: -1.25,
          left: -1.25,
          borderRadius: '50%',
          background: 'rgba(6, 182, 212, 0.25)',
          boxShadow: '0 0 4px rgba(6, 182, 212, 0.4)',
          opacity: isHidden ? 0 : 0.4,
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />

      {/* Subtle Micro-Trail Particle 1 (Fresher) */}
      <div
        ref={trailRef1}
        className="fixed pointer-events-none z-[9997]"
        style={{
          width: 3,
          height: 3,
          top: -1.5,
          left: -1.5,
          borderRadius: '50%',
          background: 'rgba(56, 189, 248, 0.4)',
          boxShadow: '0 0 5px rgba(6, 182, 212, 0.6)',
          opacity: isHidden ? 0 : 0.65,
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />

      {/* ─── Main Arrow Glow Pointer ─── */}
      <div
        id="custom-cursor-pointer"
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          top: 0,
          left: 0,
          opacity: isHidden ? 0 : 1,
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), filter 180ms ease-out',
            filter: dropShadow,
          }}
        >
          {/* Custom Sleek Tech Arrow Pointer (Tip precisely at [0, 0]) */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', overflow: 'visible' }}
          >
            {/* Outer Geometric Arrow Body */}
            <path
              d="M0.5 0.5L7.2 21.5L10.8 13.8L18.5 10.2L0.5 0.5Z"
              fill={arrowColor}
              stroke={strokeColor}
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                transition: 'fill 180ms ease, stroke 180ms ease',
              }}
            />

            {/* Inner Tech Core Accent Line */}
            <path
              d="M3 3.5L9.5 12.8"
              stroke={isPointer || isClicking ? 'rgba(255, 255, 255, 0.9)' : 'rgba(6, 182, 212, 0.5)'}
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </>
  )
}

