import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    let rafId: number
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const target = e.target as HTMLElement
      const cursor = window.getComputedStyle(target).cursor
      setIsPointer(cursor === 'pointer')
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }

      // Ring follows with lag
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }

      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    animate()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Dot — fast, precise */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] transition-opacity duration-200"
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#06b6d4',
          top: -2.5,
          left: -2.5,
          opacity: isHidden ? 0 : 1,
          boxShadow: '0 0 8px rgba(6,182,212,0.8)',
          willChange: 'transform',
        }}
      />

      {/* Ring — lagging */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] transition-all duration-150"
        style={{
          width: isPointer ? 40 : 28,
          height: isPointer ? 40 : 28,
          borderRadius: '50%',
          border: `1px solid rgba(6, 182, 212, ${isPointer ? 0.7 : 0.4})`,
          top: isPointer ? -20 : -14,
          left: isPointer ? -20 : -14,
          opacity: isHidden ? 0 : 1,
          background: isPointer ? 'rgba(6,182,212,0.06)' : 'transparent',
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, top 0.2s ease, left 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        }}
      />
    </>
  )
}
