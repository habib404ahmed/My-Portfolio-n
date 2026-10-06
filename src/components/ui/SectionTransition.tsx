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
 * Reusable section wrapper that:
 * - provides a consistent reveal animation when scrolled into view
 * - applies the correct section background + border treatment
 * - anchors the section with a stable id for navigation
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
  const isInView = useInView(ref, { once: true, amount: amount as any })

  const shouldAnimate = !prefersReduced && !isInView

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full ${className}`}
      style={style}
      aria-label={ariaLabel}
    >
      <motion.div
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        animate={shouldAnimate ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
