import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  el?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  className?: string
  style?: React.CSSProperties
  delay?: number
  /** Split by words instead of whole text */
  splitWords?: boolean
}

/**
 * Cinematic text reveal component.
 * Supports whole-text fade-up or word-by-word stagger.
 */
export function AnimatedText({
  text,
  el = 'div',
  className = '',
  style = {},
  delay = 0,
  splitWords = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const renderContent = (): ReactNode => {
    if (!splitWords) {
      return (
        <motion.span
          style={{ display: 'block' }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        >
          {text}
        </motion.span>
      )
    }

    const words = text.split(' ')
    return words.map((word, i) => (
      <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
        <motion.span
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: '100%' }}
          animate={isInView ? { opacity: 1, y: '0%' } : { opacity: 0, y: '100%' }}
          transition={{
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1],
            delay: delay + i * 0.06,
          }}
        >
          {word}
        </motion.span>
      </span>
    ))
  }

  const combinedStyle: React.CSSProperties = splitWords
    ? { ...style, display: 'flex', flexWrap: 'wrap', gap: '0.25em' }
    : style

  switch (el) {
    case 'h1':
      return <h1 ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={combinedStyle}>{renderContent()}</h1>
    case 'h2':
      return <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={combinedStyle}>{renderContent()}</h2>
    case 'h3':
      return <h3 ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={combinedStyle}>{renderContent()}</h3>
    case 'h4':
      return <h4 ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={combinedStyle}>{renderContent()}</h4>
    case 'p':
      return <p ref={ref as unknown as React.RefObject<HTMLParagraphElement>} className={className} style={combinedStyle}>{renderContent()}</p>
    case 'span':
      return <span ref={ref as React.RefObject<HTMLSpanElement>} className={className} style={combinedStyle}>{renderContent()}</span>
    case 'div':
    default:
      return <div ref={ref} className={className} style={combinedStyle}>{renderContent()}</div>
  }
}
