import type { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface SceneContainerProps {
  id?: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxWidth?: number | string
  badge?: string
  title?: string
  titleHighlight?: string
  subtitle?: string
  align?: 'left' | 'center'
}

/**
 * SceneContainer provides the cinematic cyber-architectural framing
 * with controlled typographic hierarchy and clean breathing room (Rule 11 & 28).
 */
export function SceneContainer({
  id,
  children,
  className = '',
  style = {},
  maxWidth = 1200,
  badge,
  title,
  titleHighlight,
  subtitle,
  align = 'left',
}: SceneContainerProps) {
  return (
    <div
      id={id}
      className={`page-container relative w-full ${className}`}
      style={style}
    >
      {/* Subtle HUD Corner Tech Accents (Desktop) */}
      <div
        className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-500/20 pointer-events-none hidden md:block"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyan-500/20 pointer-events-none hidden md:block"
        aria-hidden="true"
      />

      {/* Header if supplied */}
      {(badge || title) && (
        <div
          className={`mb-12 md:mb-16 ${
            align === 'center' ? 'text-center mx-auto' : ''
          }`}
          style={{ maxWidth: 800 }}
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-3.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 font-mono text-[0.6875rem] tracking-widest uppercase font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {badge}
            </motion.div>
          )}

          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight uppercase"
            >
              {title}{' '}
              {titleHighlight && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                  {titleHighlight}
                </span>
              )}
            </motion.h2>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-sm sm:text-base text-slate-400 font-body leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}

      {children}
    </div>
  )
}
