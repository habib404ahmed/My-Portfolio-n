import { motion, type Variants } from 'framer-motion'
import { profile } from '@/data/profile'
import { ProfilePhoto } from '@/components/ui/ProfilePhoto'
import { useMousePosition } from '@/hooks/useMousePosition'
import { CINEMATIC_EASE } from '@/animations/variants'

interface HeroContentProps {
  visible: boolean
}

// Phase 8 Cinematic Movie Trailer Timing & Hierarchy
// 0.0s Scene calm -> 0.5s Camera pushes -> 0.8s 3D core emerges -> 1.1s Name reveals -> 1.4s Title -> 1.8s CTA/Visual peak
const heroSceneContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
}

// Location / System Status
const metaVariants: Variants = {
  hidden: { opacity: 0, y: 6, filter: 'blur(2px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Canonical Name: Opacity + Tracking Reveal (Phase 8 Rule 8)
const nameVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(4px)', y: 6 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Primary Title: Vertical movement + sharp crisp snap
const titleVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(2px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.25, 1, 0.5, 1],
    },
  },
}

// Specializations: Staggered, extremely subtle scale/glow reveal
const specializationVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Editorial Statement: Delayed soft reveal
const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 0.92,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// CTA Pair: Appears after the main visual has settled
const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Social links metadata row
const socialVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// Portrait: Controlled cinematic entrance with brightness normalization
const portraitVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: 'brightness(0.7) blur(2px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'brightness(1) blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.4,
    },
  },
}

export function HeroContent({ visible }: HeroContentProps) {
  const { normalized } = useMousePosition()

  const handleExplore = () => {
    const el = document.querySelector('#about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResume = () => {
    if (profile.resume.available) {
      const a = document.createElement('a')
      a.href = '/assets/Md-Habib-Munsar-Ahmed-Resume.pdf'
      a.download = 'Md-Habib-Munsar-Ahmed-Resume.pdf'
      a.click()
    }
  }

  const socialLinks = [
    {
      label: 'GitHub',
      href: profile.social.github,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: profile.social.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: profile.social.youtube,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: `mailto:${profile.contact.email}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
          <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <div className="page-container relative z-10 w-full">
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP & TABLET LAYOUT (CSS Grid: 12-Column Architectural System)
          Columns 1–7: Left Text Column (hard max-width: 600px)
          Negative Space between 600px text and right column: 3D Core Layer
          Columns 8–12: Portrait Column (Right aligned, max-width: 380px)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full min-h-[calc(100svh-72px)] py-6">
        {/* Left Column: Exactly aligned x-coordinate stack (Rules 3, 4, 8, 34) */}
        {/* Left Column: Liquid Glass Control Room Panel (Phase 9 Section 10) */}
        <motion.div
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          variants={heroSceneContainer}
          className="hero-copy col-span-12 md:col-span-7 lg:col-span-7 flex flex-col items-start text-left w-full max-w-[680px] p-6 sm:p-8 md:p-9 rounded-[28px] glass-level-1 liquid-edge glass-reflection-sweep shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        >
          {/* 1. Location / Role Line (Phase 10.4: 13px font-mono) */}
          <motion.div
            variants={metaVariants}
            className="w-full flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[13px] text-[#A8B4C2] tracking-[0.14em] uppercase mb-4"
          >
            <span className="w-1.5 h-1.5 rotate-45 bg-[#00D9FF] inline-block flex-shrink-0" />
            <span className="whitespace-nowrap">SOFTWARE ENGINEER</span>
            <span className="text-[#7F8B99]">&bull;</span>
            <span className="whitespace-nowrap">BONGAIGAON, ASSAM, INDIA</span>
          </motion.div>

          {/* 2. Canonical Name (Phase 10.4: clamp(48px, 6vw, 88px)) */}
          <motion.h1
            variants={nameVariants}
            aria-label={profile.name.full}
            className="w-full tracking-tight select-none mb-3"
          >
            <span className="block font-display text-[clamp(48px,6vw,88px)] font-black text-[#F4F7FA] uppercase leading-[0.95] tracking-cinematic">
              {profile.name.display[0]}
            </span>
            <span className="block font-display text-[clamp(48px,6vw,88px)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#38E8FF] to-[#F4F7FA] uppercase leading-[0.95] drop-shadow-[0_0_24px_rgba(0,217,255,0.22)]">
              {profile.name.display[1]}
            </span>
          </motion.h1>

          {/* 3. Primary Professional Title (Phase 10.4: clamp(22px, 2.2vw, 30px)) */}
          <motion.div
            variants={titleVariants}
            className="w-full font-mono text-[clamp(22px,2.2vw,30px)] font-bold text-[#F4F7FA] tracking-[0.18em] uppercase mb-3"
          >
            {profile.title.toUpperCase()}
          </motion.div>

          {/* 4. Specialization Line (Phase 10.4: 14-15px font-mono) */}
          <motion.div
            variants={specializationVariants}
            className="w-full flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[14px] sm:text-[15px] tracking-wider uppercase text-[#38E8FF]/95 mb-5"
          >
            <span className="w-6 h-[1.5px] bg-gradient-to-r from-[#00D9FF] to-transparent flex-shrink-0" />
            <span>AI/ML ENGINEERING</span>
            <span className="text-[#007C99]">&bull;</span>
            <span>FULL-STACK DEVELOPMENT</span>
            <span className="text-[#007C99]">&bull;</span>
            <span>CYBERSECURITY &amp; ETHICAL HACKING</span>
          </motion.div>

          {/* 5. Editorial Positioning Statement (Phase 10.4: clamp(17px, 1.2vw, 19px), line-height 1.65) */}
          <motion.p
            variants={descriptionVariants}
            className="w-full max-w-[65ch] font-body text-[clamp(17px,1.2vw,19px)] text-[#A8B4C2] leading-[1.65] mb-7"
          >
            {profile.tagline}
          </motion.p>

          {/* 6. CTA Container (Phase 10.4: 15-16px Buttons, 52px height) */}
          <motion.div variants={ctaVariants} className="hero-actions w-full flex flex-wrap items-center gap-3.5 mb-5">
            <button
              onClick={handleExplore}
              className="h-[52px] min-w-[195px] px-6 rounded-xl glass-btn-primary font-display text-[15px] sm:text-[16px] font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer"
              aria-label="Explore engineering work"
            >
              <span>Explore My Work</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={handleResume}
              className="h-[52px] min-w-[195px] px-6 rounded-xl glass-btn-secondary font-display text-[15px] sm:text-[16px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer"
              aria-label="Download resume PDF"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <path d="M7 1v9M3 7l4 4 4-4M1 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Download Resume</span>
            </button>
          </motion.div>

          {/* 7. Clean Metadata Social Row */}
          <motion.div variants={socialVariants} className="hero-socials w-full flex items-center gap-4 pt-1">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-8 h-8 rounded flex items-center justify-center text-[#A8B4C2] hover:text-[#00D9FF] hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {icon}
                </a>
              ))}
            </div>
            <div className="w-[1px] h-3.5 bg-white/15" />
            <a
              href={`mailto:${profile.contact.email}`}
              className="font-mono text-xs text-[#A8B4C2] hover:text-[#00D9FF] transition-colors tracking-wide"
            >
              {profile.contact.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Portrait Asset */}
        <motion.div
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          variants={portraitVariants}
          className="col-span-12 md:col-span-5 lg:col-span-5 flex justify-center md:justify-end items-center w-full"
        >
          <div className="w-full max-w-[360px] lg:max-w-[380px] flex justify-center md:justify-end">
            <ProfilePhoto
              visible={visible}
              size="hero"
              mouseX={normalized.x}
              mouseY={normalized.y}
            />
          </div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE LAYOUT (Rules 29, 30, 31: Single Linear Column)
          Order: Location -> Name -> Title -> Specialization -> Description -> Portrait -> CTAs -> Socials
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={heroSceneContainer}
        className="flex md:hidden flex-col items-center text-center pt-4 pb-12 space-y-3 w-full"
      >
        {/* 1. Location Line (Phase 10.4: 13px font-mono) */}
        <motion.div
          variants={metaVariants}
          className="w-full flex items-center justify-center gap-1.5 font-mono text-[13px] text-[#A8B4C2] tracking-[0.12em] uppercase whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rotate-45 bg-[#00D9FF] inline-block flex-shrink-0" />
          <span>SOFTWARE ENGINEER</span>
          <span className="text-[#7F8B99]">&bull;</span>
          <span>BONGAIGAON, ASSAM, INDIA</span>
        </motion.div>

        {/* 2. Name (Phase 10.4: 40-52px) */}
        <motion.h1
          variants={nameVariants}
          aria-label={profile.name.full}
          className="w-full tracking-tight select-none"
        >
          <span className="block font-display text-[clamp(40px,9vw,52px)] font-black text-[#F4F7FA] uppercase leading-[0.95]">
            {profile.name.display[0]}
          </span>
          <span className="block font-display text-[clamp(40px,9vw,52px)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#38E8FF] to-[#F4F7FA] uppercase leading-[0.95] drop-shadow-[0_0_20px_rgba(0,217,255,0.22)]">
            {profile.name.display[1]}
          </span>
        </motion.h1>

        {/* 3. Title (Phase 10.4: 20-22px) */}
        <motion.div
          variants={titleVariants}
          className="w-full font-mono text-[20px] sm:text-[22px] font-bold text-[#F4F7FA] tracking-[0.16em] uppercase"
        >
          {profile.title.toUpperCase()}
        </motion.div>

        {/* 4. Specialization Line (Phase 10.4: 13-14px) */}
        <motion.div
          variants={specializationVariants}
          className="w-full font-mono text-[13px] sm:text-[14px] tracking-wider uppercase text-[#38E8FF]/90 flex flex-wrap items-center justify-center gap-2 max-w-sm"
        >
          <span>AI/ML</span>
          <span className="text-[#007C99]">&bull;</span>
          <span>FULL-STACK</span>
          <span className="text-[#007C99]">&bull;</span>
          <span>CYBERSECURITY</span>
        </motion.div>

        {/* 5. Description (Phase 10.4: 16-17px, line-height 1.65) */}
        <motion.p
          variants={descriptionVariants}
          className="w-full font-body text-[16px] sm:text-[17px] text-[#A8B4C2] leading-[1.65] max-w-md px-3"
        >
          {profile.tagline}
        </motion.p>

        {/* 6. Portrait */}
        <motion.div variants={portraitVariants} className="w-full flex justify-center py-2 max-w-[280px]">
          <ProfilePhoto
            visible={visible}
            size="standard"
            interactiveParallax={false}
          />
        </motion.div>

        {/* 7 & 8. Matched CTA Buttons (Phase 10.4: 15px font, 50px height) */}
        <motion.div variants={ctaVariants} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm pt-1 px-3">
          <button
            onClick={handleExplore}
            className="w-full h-[50px] px-6 rounded-xl glass-btn-primary font-display text-[15px] font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer"
            aria-label="Explore engineering work"
          >
            <span>Explore My Work</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={handleResume}
            className="w-full h-[50px] px-6 rounded-xl glass-btn-secondary font-display text-[15px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer"
            aria-label="Download resume PDF"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v9M3 7l4 4 4-4M1 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Download Resume</span>
          </button>
        </motion.div>

        {/* 9. Social Links + Email */}
        <motion.div variants={socialVariants} className="flex flex-col items-center gap-2 pt-2">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#A8B4C2] hover:text-[#00D9FF] hover:bg-white/5 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${profile.contact.email}`}
            className="font-mono text-[14px] text-[#A8B4C2] hover:text-[#00D9FF] transition-colors tracking-wide"
          >
            {profile.contact.email}
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
