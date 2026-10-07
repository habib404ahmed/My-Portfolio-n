import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { TechDomain } from '@/data/techStack'
import { CinematicGlassObject } from './CinematicGlassObject'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CinematicDepthCardProps {
  domain: TechDomain
  onOpen: (domain: TechDomain) => void
  isOpening: boolean
}

export function CinematicDepthCard({
  domain,
  onOpen,
  isOpening,
}: CinematicDepthCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  // High-performance Framer Motion coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth cinematic springs with natural damping (no re-renders)
  const springX = useSpring(mouseX, { stiffness: 180, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 180, damping: 22 })

  // 3D Card Tilt (Strictly clamped: rotateX ±2.5deg, rotateY ±3.0deg)
  const rotateX = useTransform(springY, [-0.5, 0.5], prefersReduced ? ['0deg', '0deg'] : ['2.5deg', '-2.5deg'])
  const rotateY = useTransform(springX, [-0.5, 0.5], prefersReduced ? ['0deg', '0deg'] : ['-3.0deg', '3.0deg'])

  // Parallax Layer 1: Background Grid & Atmospheric Fog (Moves ±2px)
  const bgX = useTransform(springX, [-0.5, 0.5], prefersReduced ? [0, 0] : [-3, 3])
  const bgY = useTransform(springY, [-0.5, 0.5], prefersReduced ? [0, 0] : [-2, 2])

  // Parallax Layer 2: Floating Glass Object (Moves ±6px, slight rotate ±3deg)
  const midX = useTransform(springX, [-0.5, 0.5], prefersReduced ? [0, 0] : [-7, 7])
  const midY = useTransform(springY, [-0.5, 0.5], prefersReduced ? [0, 0] : [-5, 5])
  const midRotate = useTransform(springX, [-0.5, 0.5], prefersReduced ? [0, 0] : [-3.5, 3.5])

  // Parallax Layer 3: Foreground Particles & Specular Caustics (Moves ±10px)
  const fgX = useTransform(springX, [-0.5, 0.5], prefersReduced ? [0, 0] : [-11, 11])
  const fgY = useTransform(springY, [-0.5, 0.5], prefersReduced ? [0, 0] : [-8, 8])

  // Specular Reflection Spotlight tracking cursor
  const reflectionX = useTransform(springX, [-0.5, 0.5], ['15%', '85%'])
  const reflectionY = useTransform(springY, [-0.5, 0.5], ['15%', '85%'])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (prefersReduced || !cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const xPct = (e.clientX - rect.left) / rect.width - 0.5
      const yPct = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(xPct)
      mouseY.set(yPct)
    },
    [mouseX, mouseY, prefersReduced]
  )

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(domain)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        outline: 'none',
      }}
      animate={{
        y: isOpening ? 2 : isHovered ? -5 : 0,
        scale: isOpening ? 0.98 : 1,
      }}
      transition={{
        duration: isOpening ? 0.15 : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`w-full min-w-0 box-border p-[18px_20px] rounded-2xl flex flex-col justify-between text-left transition-colors duration-400 cursor-pointer group relative overflow-hidden select-none ${
        isOpening ? 'ring-2 ring-cyan-400/80 shadow-[0_0_35px_rgba(0,217,255,0.4)]' : ''
      }`}
      aria-label={`Inspect ${domain.label} technology category containing ${domain.tech.length} verified technologies`}
      aria-haspopup="dialog"
      aria-expanded={isOpening}
    >
      {/* ─── Physical Liquid Glass Shell ─── */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-400"
        style={{
          background: isHovered
            ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.075) 0%, rgba(10, 16, 26, 0.88) 100%)'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.045) 0%, rgba(8, 12, 20, 0.82) 100%)',
          backdropFilter: 'blur(24px) saturate(145%)',
          WebkitBackdropFilter: 'blur(24px) saturate(145%)',
          border: isHovered
            ? `1px solid ${domain.color}80`
            : '1px solid rgba(150, 210, 255, 0.18)',
          boxShadow: isHovered
            ? `0 20px 50px rgba(0, 0, 0, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 0 28px ${domain.glowColor}`
            : '0 10px 30px rgba(0, 0, 0, 0.38), inset 0 1px 1px rgba(255, 255, 255, 0.16)',
        }}
      />

      {/* ─── Cursor-Following Specular Glare (Desktop Only) ─── */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [reflectionX, reflectionY],
              ([rx, ry]) =>
                `radial-gradient(circle 180px at ${rx} ${ry}, rgba(255, 255, 255, 0.14) 0%, transparent 70%)`
            ),
          }}
          aria-hidden="true"
        />
      )}

      {/* ─── Top Edge Refraction Highlight ─── */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] pointer-events-none transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${domain.color} 50%, transparent 100%)`,
          opacity: isHovered ? 0.95 : 0.45,
        }}
        aria-hidden="true"
      />

      {/* ─── Card Header: Category Indicator, Title & Badge ─── */}
      <div className="relative z-10 w-full mb-1.5">
        <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Luminous Category Indicator Dot */}
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
              style={{
                background: domain.color,
                boxShadow: `0 0 10px ${domain.color}`,
              }}
            />
            <h3 className="font-mono text-[14px] sm:text-[15px] font-extrabold tracking-[0.06em] text-[#F4F7FA] group-hover:text-cyan-300 transition-colors m-0 truncate">
              {domain.label}
            </h3>
          </div>

          {/* Category Code Badge */}
          <span
            className="font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-white/15 uppercase font-semibold flex-shrink-0 ml-2 transition-all duration-300"
            style={{
              color: domain.color,
              backgroundColor: isHovered ? `${domain.color}20` : 'rgba(255, 255, 255, 0.04)',
              borderColor: isHovered ? `${domain.color}60` : 'rgba(255, 255, 255, 0.12)',
            }}
          >
            {domain.shortLabel}
          </span>
        </div>

        {/* Short Category Description */}
        <p className="font-body text-[12px] sm:text-[13px] text-[#A8B4C2] leading-[1.45] mt-1 mb-2 m-0 line-clamp-2">
          {domain.description}
        </p>
      </div>

      {/* ─── Section 2, 3, 4: Miniature 3D Cinematic Depth Scene Container ─── */}
      <div className="relative z-10 my-2 h-[96px] sm:h-[104px] w-full rounded-[14px] overflow-hidden border border-white/[0.08] group-hover:border-white/[0.18] transition-colors duration-400 bg-[#05080E]/70">
        {/* Depth Layer 1: Background Coordinate Grid & Atmospheric Fog */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ x: bgX, y: bgY }}
        >
          {/* Technical Subtle Background Grid */}
          <div
            className="absolute inset-0 opacity-[0.14] group-hover:opacity-[0.24] transition-opacity duration-500"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Deep Blue/Void Radial Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${domain.color}18 0%, rgba(4, 7, 14, 0.95) 75%)`,
            }}
          />
        </motion.div>

        {/* Depth Layer 2: Midground Floating Translucent Glass Geometry */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-2"
          style={{ x: midX, y: midY, rotateZ: midRotate }}
        >
          <CinematicGlassObject
            domainId={domain.id}
            accentColor={domain.color}
            isHovered={isHovered}
            isClicked={isOpening}
          />
        </motion.div>

        {/* Depth Layer 3: Foreground Orbital Dust & Specular Streaks */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ x: fgX, y: fgY }}
        >
          {/* Micro Orbital Particle 1 */}
          <div
            className="absolute w-1.5 h-1.5 rounded-full transition-opacity duration-300"
            style={{
              top: '22%',
              left: '26%',
              background: domain.color,
              boxShadow: `0 0 6px ${domain.color}`,
              opacity: isHovered ? 0.9 : 0.45,
            }}
          />

          {/* Micro Orbital Particle 2 */}
          <div
            className="absolute w-1 h-1 rounded-full transition-opacity duration-300"
            style={{
              bottom: '24%',
              right: '24%',
              background: '#ffffff',
              boxShadow: '0 0 4px #ffffff',
              opacity: isHovered ? 0.8 : 0.35,
            }}
          />

          {/* Micro Orbital Particle 3 */}
          <div
            className="absolute w-1 h-1 rounded-full transition-opacity duration-300"
            style={{
              top: '68%',
              left: '32%',
              background: domain.color,
              opacity: isHovered ? 0.75 : 0.25,
            }}
          />

          {/* Subtle Horizontal Lens Reflection Streak */}
          <div
            className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] pointer-events-none transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${domain.color}40 50%, transparent 100%)`,
              opacity: isHovered ? 0.8 : 0.25,
            }}
          />
        </motion.div>

        {/* Internal Vignette Edge Falloff */}
        <div
          className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(3,5,10,0.85)]"
          aria-hidden="true"
        />
      </div>

      {/* ─── Section 8: Card Footer with Technology Count & Premium Glass EXPLORE Button ─── */}
      <div className="relative z-10 mt-auto pt-3 border-t border-[rgba(140,190,210,0.12)] flex items-center justify-between font-mono text-[11px] text-[#687687] w-full">
        {/* Count & Verified Status */}
        <span className="flex items-center gap-1.5">
          <span className="text-[#A8B4C2] font-medium">{domain.tech.length} Technologies</span>
          <span className="text-slate-600">&bull;</span>
          <span className="font-semibold tracking-wider" style={{ color: domain.color }}>
            VERIFIED
          </span>
        </span>

        {/* Premium Glass Action Button: EXPLORE → (Section 8 Specification) */}
        <div
          className="px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300 border relative overflow-hidden"
          style={{
            background: isHovered ? 'rgba(0, 217, 255, 0.16)' : 'rgba(255, 255, 255, 0.05)',
            borderColor: isHovered ? 'rgba(0, 217, 255, 0.6)' : 'rgba(255, 255, 255, 0.14)',
            boxShadow: isHovered
              ? '0 0 16px rgba(0, 217, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
              : '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Light Sweep Passing Across on Hover */}
          <div
            className={`absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-transform duration-700 pointer-events-none ${
              isHovered ? 'translate-x-[250%]' : '-translate-x-[150%]'
            }`}
          />

          <span className="font-mono text-[11px] font-bold text-white tracking-wider uppercase">
            EXPLORE
          </span>
          <span
            className="font-mono text-cyan-400 font-bold text-xs transition-transform duration-300"
            style={{
              transform: isHovered ? 'translateX(5px)' : 'translateX(0px)',
            }}
          >
            &rarr;
          </span>
        </div>
      </div>
    </motion.button>
  )
}
