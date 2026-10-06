import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import type { TechDomain, TechItem } from '@/data/techStack'

interface TechNodeProps {
  item: TechItem
  color: string
  delay: number
  index: number
}

function TechNodeBadge({ item, color, delay, index }: TechNodeProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`${item.name}: ${item.description}`}
      style={{ cursor: 'default' }}
    >
      {/* Node */}
      <div
        style={{
          padding: '0.5rem 0.875rem',
          borderRadius: 2,
          border: `1px solid ${hovered ? color : 'rgba(255,255,255,0.06)'}`,
          background: hovered ? `${color}10` : 'rgba(13,17,23,0.8)',
          transition: 'all 0.3s ease',
          boxShadow: hovered ? `0 0 16px ${color}25` : 'none',
          position: 'relative',
        }}
      >
        {/* Index dot */}
        <span
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: hovered ? color : 'rgba(255,255,255,0.1)',
            transition: 'background 0.3s ease',
          }}
        />

        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: hovered ? color : 'rgba(240,244,248,0.75)',
            letterSpacing: '0.02em',
            transition: 'color 0.3s ease',
            display: 'block',
          }}
        >
          {item.name}
        </span>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(8,10,15,0.97)',
              border: `1px solid ${color}30`,
              borderRadius: 3,
              padding: '0.5rem 0.75rem',
              minWidth: 180,
              zIndex: 50,
              pointerEvents: 'none',
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${color}15`,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                fontWeight: 600,
                color,
                marginBottom: 3,
                letterSpacing: '0.05em',
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.6875rem',
                color: 'rgba(136,146,164,0.9)',
                lineHeight: 1.5,
              }}
            >
              {item.description}
            </div>
            {/* Arrow */}
            <div
              style={{
                position: 'absolute',
                bottom: -5,
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: 8,
                height: 8,
                background: 'rgba(8,10,15,0.97)',
                border: `1px solid ${color}30`,
                borderTop: 'none',
                borderLeft: 'none',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection node indicator - visible on hover */}
      <motion.div
        animate={{ scale: hovered ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: -2,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: hovered ? color : 'transparent',
          boxShadow: hovered ? `0 0 8px ${color}` : 'none',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      />
      {/* suppress unused index warning */}
      <span className="sr-only">{index}</span>
    </motion.div>
  )
}

interface TechClusterProps {
  domain: TechDomain
  isActive: boolean
  onSelect: (id: string | null) => void
}

export function TechCluster({ domain, isActive, onSelect }: TechClusterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(isActive ? null : domain.id)}
      style={{
        padding: '1.5rem',
        borderRadius: 4,
        border: `1px solid ${isActive ? domain.color + '40' : 'rgba(255,255,255,0.06)'}`,
        background: isActive ? domain.glowColor : 'rgba(8,10,15,0.6)',
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        boxShadow: isActive ? `0 0 40px ${domain.color}15` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-expanded={isActive}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(isActive ? null : domain.id) }}
      aria-label={`${domain.label} technology cluster`}
    >
      {/* Background glow */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${domain.glowColor} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Domain header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Color dot */}
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: domain.color,
              boxShadow: `0 0 8px ${domain.color}`,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: domain.color,
            }}
          >
            {domain.shortLabel}
          </span>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 16,
            height: 16,
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.3)', transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.3)', transform: 'translateX(-50%)' }} />
        </motion.div>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'rgba(240,244,248,0.9)',
          marginBottom: '0.35rem',
          letterSpacing: '-0.01em',
        }}
      >
        {domain.label}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'rgba(136,146,164,0.65)',
          marginBottom: isActive ? '1.25rem' : 0,
          transition: 'margin 0.3s ease',
        }}
      >
        {domain.description} · {domain.tech.length} technologies
      </div>

      {/* Tech nodes — expanded */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {domain.tech.map((item, i) => (
                <TechNodeBadge
                  key={item.name}
                  item={item}
                  color={domain.color}
                  delay={i * 0.06}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
