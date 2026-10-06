import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initSequence } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface InitSequenceProps {
  onComplete: () => void
}

export function InitSequence({ onComplete }: InitSequenceProps) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [progressWidth, setProgressWidth] = useState(0)
  const prefersReduced = useReducedMotion()
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (prefersReduced) {
      // Skip sequence immediately
      onComplete()
      return
    }

    const totalDuration =
      initSequence[initSequence.length - 1].delay +
      initSequence[initSequence.length - 1].duration

    // Schedule each step
    initSequence.forEach((step, i) => {
      const t1 = setTimeout(() => {
        setCurrentStep(i)
        setProgressWidth(((i + 1) / initSequence.length) * 100)
      }, step.delay)

      const t2 = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, i])
      }, step.delay + step.duration * 0.7)

      timerRef.current.push(t1, t2)
    })

    // Complete sequence
    const tDone = setTimeout(() => {
      onComplete()
    }, totalDuration + 600)

    timerRef.current.push(tDone)

    return () => {
      timerRef.current.forEach(clearTimeout)
    }
  }, [onComplete, prefersReduced])

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{ background: 'var(--color-void)' }}
      role="status"
      aria-live="polite"
      aria-label="System initializing"
    >
      {/* Scanline effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.01) 2px, rgba(6,182,212,0.01) 4px)',
        }}
      />

      {/* Corner decorations */}
      {[
        { style: { top: 24, left: 24 } },
        { style: { top: 24, right: 24, transform: 'scaleX(-1)' } },
        { style: { bottom: 24, left: 24, transform: 'scaleY(-1)' } },
        { style: { bottom: 24, right: 24, transform: 'scale(-1,-1)' } },
      ].map((corner, i) => (
        <div
          key={i}
          className="fixed"
          style={{
            ...corner.style,
            width: 20,
            height: 20,
            borderTop: '1px solid rgba(6,182,212,0.4)',
            borderLeft: '1px solid rgba(6,182,212,0.4)',
          }}
        />
      ))}

      <div className="flex flex-col items-start gap-3" style={{ minWidth: 280 }}>
        {/* System tag */}
        <div
          className="text-label mb-4"
          style={{ color: 'rgba(6,182,212,0.5)', fontSize: '0.55rem' }}
        >
          SYS_INIT_v2.4.1
        </div>

        {/* Sequence lines */}
        <AnimatePresence>
          {initSequence.map((step, i) =>
            i <= currentStep ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: completedSteps.includes(i) ? 0.4 : 1, x: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-center gap-3"
              >
                {/* Status indicator */}
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: completedSteps.includes(i)
                      ? 'rgba(6,182,212,0.5)'
                      : '#06b6d4',
                    boxShadow: completedSteps.includes(i)
                      ? 'none'
                      : '0 0 8px rgba(6,182,212,0.8)',
                    flexShrink: 0,
                    transition: 'all 0.4s ease',
                  }}
                />

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.15em',
                    color:
                      i === currentStep && !completedSteps.includes(i)
                        ? 'rgba(240,244,248,0.95)'
                        : 'rgba(136,146,164,0.5)',
                    transition: 'color 0.4s ease',
                  }}
                >
                  {step.text}
                  {i === currentStep && !completedSteps.includes(i) && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '0.5em',
                        height: '1em',
                        background: '#06b6d4',
                        marginLeft: '0.3em',
                        verticalAlign: 'middle',
                        animation: 'cursor-blink 1s step-end infinite',
                      }}
                    />
                  )}
                </span>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div
          className="mt-6"
          style={{
            width: 280,
            height: 1,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressWidth}%`,
              background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 8px rgba(6,182,212,0.6)',
            }}
          />
        </div>

        {/* Progress label */}
        <div
          className="text-label"
          style={{ color: 'rgba(6,182,212,0.4)', fontSize: '0.55rem' }}
        >
          {Math.round(progressWidth)}% COMPLETE
        </div>
      </div>
    </div>
  )
}
