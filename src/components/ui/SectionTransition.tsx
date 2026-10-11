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
}: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px', amount: 0.05 })

  const isRevealed = prefersReduced || isInView

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
            ? false
            : { opacity: 0, y: 24, filter: 'blur(4px)', scale: 0.99 }
        }
        animate={
          isRevealed
            ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
            : { opacity: 0, y: 24, filter: 'blur(4px)', scale: 0.99 }
        }
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
