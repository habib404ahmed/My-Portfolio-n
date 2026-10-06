import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations/variants'

/**
 * Phase 1 scroll transition section.
 * Acts as the entry point into Phase 2 content sections.
 */
export function ScrollTransition() {
  return (
    <section
      id="about"
      className="relative"
      style={{
        minHeight: '100vh',
        background: 'var(--color-deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid rgba(6,182,212,0.06)',
      }}
      aria-label="Enter the system"
    >
      {/* Gradient transition from hero */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 200,
          background:
            'linear-gradient(to bottom, var(--color-void), var(--color-deep))',
        }}
      />

      {/* Corner marks */}
      {[
        { style: { top: 48, left: 48 } },
        { style: { top: 48, right: 48, transform: 'scaleX(-1)' } },
      ].map((corner, i) => (
        <div
          key={i}
          className="absolute hidden md:block"
          style={{
            ...corner.style,
            width: 16,
            height: 16,
            borderTop: '1px solid rgba(6,182,212,0.25)',
            borderLeft: '1px solid rgba(6,182,212,0.25)',
          }}
        />
      ))}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 flex flex-col items-center text-center px-8"
        style={{ maxWidth: 640 }}
      >
        {/* System ID */}
        <motion.div
          variants={fadeInUp}
          className="text-label mb-10"
          style={{ color: 'rgba(6,182,212,0.5)' }}
        >
          SECTION_01 &nbsp;·&nbsp; INITIALIZATION COMPLETE
        </motion.div>

        {/* Main prompt */}
        <motion.div
          variants={fadeInUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'rgba(240,244,248,0.9)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}
        >
          Enter
          <span style={{ color: '#06b6d4' }}> the System</span>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: 'rgba(136,146,164,0.7)',
            marginBottom: '3rem',
          }}
        >
          Full portfolio sections — About, Skills, Projects, AI/ML, Cybersecurity, Achievements,
          Education, and Contact — arriving in Phase 2.
        </motion.p>

        {/* Phase 2 coming indicators */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full"
          style={{ maxWidth: 480 }}
        >
          {[
            'About',
            'Skills',
            'Projects',
            'AI / ML',
            'Cybersecurity',
            'Contact',
          ].map((label) => (
            <div
              key={label}
              style={{
                padding: '0.625rem 1rem',
                border: '1px solid rgba(6,182,212,0.1)',
                borderRadius: 2,
                background: 'rgba(6,182,212,0.025)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(136,146,164,0.5)',
                textAlign: 'center' as const,
              }}
            >
              {label}
            </div>
          ))}
        </motion.div>

        {/* Down arrow */}
        <motion.div
          variants={fadeInUp}
          style={{ marginTop: '4rem' }}
        >
          <div
            style={{
              width: 1,
              height: 60,
              background: 'linear-gradient(to bottom, rgba(6,182,212,0.4), transparent)',
              margin: '0 auto',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
