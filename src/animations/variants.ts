import type { Variants, BezierDefinition } from 'framer-motion'

export const CINEMATIC_EASE: BezierDefinition = [0.16, 1, 0.3, 1]
export const EXPO_EASE: BezierDefinition = [0.19, 1, 0.22, 1]

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: CINEMATIC_EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.7, ease: EXPO_EASE },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: CINEMATIC_EASE },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: CINEMATIC_EASE },
  },
}

export const navReveal: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: CINEMATIC_EASE },
  },
}
