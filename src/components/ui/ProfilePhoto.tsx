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

  // Dimensions based on size preset (deliberate 2:3 portrait proportions)
  const framePresets = {
    hero: {
      frame: 'w-[clamp(250px,21vw,340px)] max-h-[min(430px,48vh)]',
      aspectRatio: '2 / 3',
    },
    standard: {
      frame: 'w-[clamp(240px,24vw,320px)] max-h-[min(440px,48vh)]',
      aspectRatio: '2 / 3',
    },
    compact: {
      frame: 'w-[clamp(220px,62vw,280px)] max-h-[min(400px,46vh)]',
      aspectRatio: '2 / 3',
    },
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
          {/* Prominent High-Tech Cyan HUD Corner Brackets matching reference image */}
          <div
            className="absolute -top-3.5 -left-3.5 w-7 h-7 border-t-2 border-l-2 border-cyan-400 pointer-events-none drop-shadow-[0_0_10px_rgba(0,217,255,0.7)] transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          />
          <div
            className="absolute -top-3.5 -right-3.5 w-7 h-7 border-t-2 border-r-2 border-cyan-400 pointer-events-none drop-shadow-[0_0_10px_rgba(0,217,255,0.7)] transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-3.5 -left-3.5 w-7 h-7 border-b-2 border-l-2 border-cyan-400 pointer-events-none drop-shadow-[0_0_10px_rgba(0,217,255,0.7)] transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-3.5 -right-3.5 w-7 h-7 border-b-2 border-r-2 border-cyan-400 pointer-events-none drop-shadow-[0_0_10px_rgba(0,217,255,0.7)] transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          />

          {/* ─── Portrait Photo Container (2:3 Aspect Ratio) ─── */}
          <div
            className={`relative rounded-2xl overflow-hidden border border-cyan-400/40 p-1 shadow-[0_24px_70px_rgba(0,0,0,0.85),0_0_30px_rgba(0,217,255,0.16)] transition-all duration-500 group-hover:shadow-[0_28px_80px_rgba(0,217,255,0.3)] ${framePresets.frame}`}
            style={{
              aspectRatio:
                crop?.aspectRatio && crop.aspectRatio !== '1:1' && crop.aspectRatio !== '576 / 1024'
                  ? crop.aspectRatio
                  : framePresets.aspectRatio,
              borderRadius: `${crop?.borderRadius ?? 20}px`,
            }}
          >
            <img
              src={photoData.path || '/assets/images/profile.png'}
              alt={photoData.alt || 'Md Habib Munsar Ahmed — Software Engineer'}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="block w-full h-full object-cover filter contrast-[1.01] brightness-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.012]"
              style={{
                objectPosition: `${crop?.x ?? 50}% ${crop?.y ?? 38}%`,
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

        {/* ─── Profile Caption Badge (Deliberate cinematic profile caption, proportionate spacing) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-3.5 h-[34px] px-5 rounded-full border border-cyan-400/50 bg-[#030507]/90 hover:border-cyan-400/80 backdrop-blur-md flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(0,217,255,0.25),0_8px_24px_rgba(0,0,0,0.6)] whitespace-nowrap select-none transition-colors"
        >
          {/* Status Dot: 8px emerald glowing pulse */}
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse flex-shrink-0" />
          <span className="font-mono text-xs sm:text-[12.5px] text-white tracking-[0.14em] uppercase font-bold">
            SOFTWARE ENGINEER
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
