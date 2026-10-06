import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { fadeInUp, staggerContainer } from '@/animations/variants'

/**
 * CSS-only fallback when WebGL is unavailable.
 * Preserves all cinematic typography and layout.
 */
export function WebGLFallback({ visible }: { visible: boolean }) {
  return (
    <div
      className="fixed inset-0 flex items-center"
      style={{
        background: 'radial-gradient(ellipse at 60% 50%, rgba(6,182,212,0.04) 0%, var(--color-void) 70%)',
      }}
    >
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: '50%',
          right: '10%',
          transform: 'translate(0, -50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={staggerContainer}
        style={{ maxWidth: 720, padding: '0 2rem', margin: '0 auto', width: '100%' }}
      >
        <motion.div variants={fadeInUp} className="text-label mb-6">
          <span style={{ color: '#06b6d4' }}>◈</span>
          &nbsp; Software Engineer &nbsp; · &nbsp; Bongaigaon, India
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            marginBottom: '0.2rem',
          }}
        >
          <span style={{ color: 'rgba(240,244,248,0.97)' }}>
            {profile.name.display[0]}
          </span>
          <br />
          <span style={{ color: '#06b6d4', textShadow: '0 0 60px rgba(6,182,212,0.25)' }}>
            {profile.name.display[1]}
          </span>
        </motion.h1>

        <motion.div
          variants={fadeInUp}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(136,146,164,0.7)',
            margin: '1.5rem 0 1.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.5)', display: 'inline-block' }} />
          {profile.positioning}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            lineHeight: 1.7,
            color: 'rgba(136,146,164,0.8)',
            maxWidth: 480,
            marginBottom: '2.5rem',
          }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
          <button
            className="btn-primary"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore My Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="btn-secondary" disabled style={{ opacity: 0.5 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v9M3 7l4 4 4-4M1 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Resume
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
