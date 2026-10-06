import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FinalSpaceCanvasProps {
  converge?: boolean
}

export function FinalSpaceCanvas({ converge = false }: FinalSpaceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }

    window.addEventListener('resize', handleResize)

    // Particle pool: 50 subtle deep-space / digital network nodes
    const count = prefersReduced ? 20 : 60
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      targetAlpha: Math.random() * 0.4 + 0.1,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2

      // Draw subtle connective filaments between nearby nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (1 - dist / 110)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const p of particles) {
        if (!prefersReduced) {
          if (converge) {
            // Convergence mode: particles pull toward center point
            p.x += (centerX - p.x) * 0.03
            p.y += (centerY - p.y) * 0.03
          } else {
            p.x += p.vx
            p.y += p.vy

            if (p.x < 0) p.x = width
            if (p.x > width) p.x = 0
            if (p.y < 0) p.y = height
            if (p.y > height) p.y = 0
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`
        ctx.fill()
      }

      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [converge, prefersReduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  )
}
