import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SectionTransitionProps {
  id: string
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
  amount?: number | 'some' | 'all'
}

/**
 * Phase 8 Cinematic Section Wrapper:
 * - Anticipation light beam at the threshold of the scene
 * - Optical blur-to-sharp focus reveal
 * - Physical presence with disciplined cinematic easing
 */
export function SectionTransition({
  id,
  children,
  className = '',
  style = {},
  ariaLabel,
  amount = 'some',
}: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, amount: amount as any, margin: "-40px 0px" })

  const shouldAnimate = !prefersReduced && !isInView

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full ${className}`}
      style={style}
      aria-label={ariaLabel}
    >
      {/* Anticipation Beam & Threshold Glow (Phase 8 Rule 12) */}
      <div className="anticipation-beam" aria-hidden="true" />
      <div className="anticipation-glow" aria-hidden="true" />

      <motion.div
        initial={
          prefersReduced
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20, filter: 'blur(3px)', scale: 0.992 }
        }
        animate={
          shouldAnimate
            ? { opacity: 0, y: 20, filter: 'blur(3px)', scale: 0.992 }
            : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
