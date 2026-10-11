import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePortfolioContent } from '@/context/ContentContext.tsx'

interface ProfilePhotoProps {
  visible: boolean
  className?: string
  priority?: boolean
  showAura?: boolean
  interactiveParallax?: boolean
  mouseX?: number
  mouseY?: number
  size?: 'hero' | 'standard' | 'compact'
}

export function ProfilePhoto({
  visible,
  className = '',
  priority = true,
  showAura = true,
  interactiveParallax = true,
  mouseX = 0,
  mouseY = 0,
  size = 'hero',
}: ProfilePhotoProps) {
  const prefersReduced = useReducedMotion()
  const { content } = usePortfolioContent()
  const photoData = content.hero.profilePhoto
  const crop = size === 'hero' ? photoData.desktopCrop : photoData.mobileCrop

  // Calculate subtle, non-distorting parallax angles
  const tiltX = prefersReduced || !interactiveParallax ? 0 : mouseY * -6
  const tiltY = prefersReduced || !interactiveParallax ? 0 : mouseX * 8
  const translateX = prefersReduced || !interactiveParallax ? 0 : mouseX * 10
  const translateY = prefersReduced || !interactiveParallax ? 0 : mouseY * 8

  // Dimensions based on size preset (controlled max height to prevent navbar crowding)
  const sizeStyles = {
    hero: 'max-h-[min(480px,52vh)] w-auto max-w-full',
    standard: 'max-h-[min(320px,42vh)] w-auto max-w-full',
    compact: 'max-h-[min(240px,35vh)] w-auto max-w-full',
  }[size]

  const containerMaxH = {
    hero: 'max-h-[min(480px,52vh)]',
    standard: 'max-h-[min(320px,42vh)]',
    compact: 'max-h-[min(240px,35vh)]',
  }[size]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={
        visible
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: prefersReduced ? 0.4 : 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              },
            }
          : { opacity: 0, scale: 0.96, y: 20 }
      }
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(${translateX}px, ${translateY}px, 0)`,
        transition: prefersReduced ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className={`relative flex items-center justify-center select-none pt-2 ${className}`}
    >
      {/* ─── Ambient Atmospheric Aura & Lighting (Warm Person / Natural Lighting) ─── */}
      {showAura && (
        <>
          {/* Sunset Amber Glow (Preserves natural warm lighting of photograph) */}
          <div
            className="absolute -top-10 -left-10 w-64 h-64 sm:w-72 sm:h-72 rounded-full pointer-events-none -z-10 opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, transparent 70%)',
              filter: 'blur(45px)',
            }}
            aria-hidden="true"
          />

          {/* Subtle Sky Rim Light */}
          <div
            className="absolute -bottom-8 -right-8 w-60 h-60 sm:w-72 sm:h-72 rounded-full pointer-events-none -z-10 opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ─── Profile Structure: Frame + Below-Badge in Flex Column ─── */}
      <div className="relative flex flex-col items-center">
        {/* Holographic Framing Accents around Photo Container */}
        <div className="relative group">
          {/* Subtle Refined Corner Brackets (Stay inside boundary to prevent top clipping) */}
          <div
            className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t border-l border-cyan-400/30 pointer-events-none transition-colors duration-500 group-hover:border-cyan-400/60"
            aria-hidden="true"
          />
          <div
            className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t border-r border-cyan-400/30 pointer-events-none transition-colors duration-500 group-hover:border-cyan-400/60"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b border-l border-cyan-400/30 pointer-events-none transition-colors duration-500 group-hover:border-cyan-400/60"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b border-r border-cyan-400/30 pointer-events-none transition-colors duration-500 group-hover:border-cyan-400/60"
            aria-hidden="true"
          />

          {/* ─── Portrait Photo Container (Phase 9 Glass Frame) ─── */}
          <div
            className={`relative rounded-2xl overflow-hidden glass-frame liquid-edge p-1 shadow-[0_24px_70px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover:shadow-[0_28px_80px_rgba(0,217,255,0.18)] ${containerMaxH} w-auto`}
            style={{
              aspectRatio: '576 / 1024',
              borderRadius: `${crop?.borderRadius ?? 24}px`,
            }}
          >
            <img
              src={photoData.path || '/assets/images/profile.png'}
              alt={photoData.alt || 'Md Habib Munsar Ahmed — Software Engineer'}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={`block w-full h-full filter contrast-[1.01] brightness-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.012] ${sizeStyles}`}
              style={{
                aspectRatio: '576 / 1024',
                objectFit: crop?.objectFit ?? 'cover',
                objectPosition: `${crop?.x ?? 50}% ${crop?.y ?? 40}%`,
                transform: `scale(${crop?.scale ?? 1}) rotate(${crop?.rotate ?? 0}deg) scaleX(${
                  crop?.flipH ? -1 : 1
                }) scaleY(${crop?.flipV ? -1 : 1})`,
                opacity: crop?.opacity ?? 1,
              }}
              onError={(e) => {
                const target = e.currentTarget
                if (target.src.endsWith('.webp')) {
                  target.src = '/assets/images/profile.jpg'
                }
              }}
            />

            {/* Environmental Floor Blend: Soft gradient at base to merge into UI darkness */}
            <div
              className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[var(--color-void,#050507)] via-[var(--color-void,#050507)]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Subtle Filmic Edge Vignette */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-white/10"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 40%, transparent 68%, rgba(5,5,7,0.35) 100%)',
              }}
              aria-hidden="true"
            />

            {/* Cinematic Scanline Overlay (Subtle Digital Artifact) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ─── Profile Caption Badge (Deliberate cinematic profile caption, 12-14px gap below photo) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-3 sm:mt-3.5 h-[34px] sm:h-[36px] min-w-[165px] sm:min-w-[185px] px-4 sm:px-5 rounded-full border border-cyan-500/30 bg-slate-950/85 hover:border-cyan-400/50 backdrop-blur-md flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_12px_rgba(6,182,212,0.12)] whitespace-nowrap select-none"
        >
          {/* Status Dot: 7-9px, emerald glowing pulse */}
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse flex-shrink-0" />
          <span className="font-mono text-xs sm:text-[0.8125rem] text-slate-100 tracking-[0.08em] uppercase font-bold">
            SOFTWARE ENGINEER
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
