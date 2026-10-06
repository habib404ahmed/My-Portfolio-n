import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionTransitionProps {
  id: string
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
  amount?: number
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
  amount = 0.15,
}: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount })

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full ${className}`}
      style={style}
      aria-label={ariaLabel}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
