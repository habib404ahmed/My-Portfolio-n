import { motion, type Variants } from 'framer-motion'
import { ProfilePhoto } from '@/components/ui/ProfilePhoto'
import { useMousePosition } from '@/hooks/useMousePosition'
import { usePortfolioContent } from '@/context/ContentContext.tsx'

interface HeroContentProps {
  visible: boolean
}

// Cinematic timing variants
const heroSceneContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const metaVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const nameVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(3px)', y: 8 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const specializationVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 0.95,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const socialVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const portraitVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25,
    },
  },
}

export function HeroContent({ visible }: HeroContentProps) {
  const { normalized } = useMousePosition()
  const { content } = usePortfolioContent()
  const hero = content.hero

  const handleExplore = () => {
    const target = hero.ctaPrimary.link || '#projects'
    let el = document.querySelector(target)
    if (!el && target === '#projects') el = document.querySelector('#work')
    if (!el) el = document.querySelector('#about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResume = () => {
    const target = hero.ctaSecondary.link || '#resume'
    const el = document.querySelector(target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      const a = document.createElement('a')
      a.href = content.resume.path || '/assets/Md-Habib-Munsar-Ahmed-Resume.pdf'
      a.download = content.resume.filename || 'Md-Habib-Munsar-Ahmed-Resume.pdf'
      a.click()
    }
  }

  const nameLine1 = hero.name?.display?.[0] || 'MD HABIB'
  const nameLine2 = hero.name?.display?.[1] || 'MUNSAR AHMED'

  const primaryCtaLabel = hero.ctaPrimary.label || 'EXPLORE PROJECTS'
  const secondaryCtaLabel = hero.ctaSecondary.label || 'VIEW RESUME'

  const socialLinks = [
    {
      label: 'GitHub',
      href: content.contact.social.github,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="21" height="21" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: content.contact.social.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="21" height="21" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: content.contact.social.youtube,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="21" height="21" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: `mailto:${content.contact.email}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="21" height="21" aria-hidden="true">
          <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  // Shared Desktop/Tablet Content Component
  const renderTextPanel = () => (
    <motion.div
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={heroSceneContainer}
      className="hero-text-panel"
      data-editable-id="hero-text-panel"
      data-editable-name="Hero Text Panel"
    >
      {/* 1. Availability Status Badge */}
      <motion.div variants={metaVariants} className="hero-availability" data-editable-id="hero-availability" data-editable-name="Availability Badge">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse flex-shrink-0" />
        <span className="max-w-full">{hero.roleBadge || 'AVAILABLE FOR SOFTWARE ENGINEERING ROLES'}</span>
      </motion.div>

      {/* 2. Full Name Heading */}
      <motion.h1
        variants={nameVariants}
        aria-label={hero.name?.full || 'Md Habib Munsar Ahmed'}
        className="hero-heading"
        data-editable-id="hero-heading"
        data-editable-name="Name Heading"
      >
        <span className="block font-display font-extrabold text-[#FFFFFF] uppercase leading-[0.98]">
          {nameLine1}
        </span>
        {nameLine2 && (
          <span className="block font-display font-extrabold text-[#00D9FF] uppercase leading-[0.98] drop-shadow-[0_0_24px_rgba(0,217,255,0.45)]">
            {nameLine2}
          </span>
        )}
      </motion.h1>

      {/* 3. Professional Title */}
      <motion.div variants={titleVariants} className="hero-title" data-editable-id="hero-title" data-editable-name="Professional Title">
        {hero.title ? hero.title.toUpperCase() : 'SOFTWARE ENGINEER'}
      </motion.div>

      {/* 4. Specialties */}
      <motion.div variants={specializationVariants} className="hero-specialties" data-editable-id="hero-specialties" data-editable-name="Specialties">
        <span className="text-[#00D9FF] font-semibold">&mdash;</span>
        <span>AI/ML ENGINEERING</span>
        <span className="text-[#00D9FF] font-bold">&bull;</span>
        <span>FULL-STACK DEVELOPMENT</span>
        <span className="text-[#00D9FF] font-bold">&bull;</span>
        <span>CYBERSECURITY</span>
      </motion.div>

      {/* 5. Description */}
      <motion.p variants={descriptionVariants} className="hero-description" data-editable-id="hero-description" data-editable-name="Description">
        {hero.description?.text ||
          'Software Engineer building intelligent, secure and scalable digital systems across AI, full-stack development and cybersecurity.'}
      </motion.p>

      {/* 6. CTA Action Buttons */}
      <motion.div variants={ctaVariants} className="hero-actions" data-editable-id="hero-cta-buttons" data-editable-name="CTA Buttons">
        {hero.ctaPrimary.visible && (
          <button
            onClick={handleExplore}
            className="hero-btn hero-btn-primary h-[50px] sm:h-[56px] lg:h-[60px] min-w-[180px] sm:min-w-[200px] lg:min-w-[216px] px-5 sm:px-6 rounded-xl glass-btn-primary font-display text-[14px] sm:text-[15px] font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 group cursor-pointer shadow-[0_4px_20px_rgba(0,217,255,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={primaryCtaLabel}
          >
            <span>{primaryCtaLabel}</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 14 14"
              fill="none"
              className="flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            >
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {hero.ctaSecondary.visible && (
          <button
            onClick={handleResume}
            className="hero-btn hero-btn-secondary h-[50px] sm:h-[56px] lg:h-[60px] min-w-[170px] sm:min-w-[185px] lg:min-w-[202px] px-5 sm:px-6 rounded-xl glass-btn-secondary font-display text-[14px] sm:text-[15px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={secondaryCtaLabel}
          >
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none" className="flex-shrink-0" aria-hidden="true">
              <path d="M7 1v9M3 7l4 4 4-4M1 12h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{secondaryCtaLabel}</span>
          </button>
        )}
      </motion.div>

      {/* 7. Social Links */}
      <motion.div variants={socialVariants} className="hero-socials" data-editable-id="hero-social-links" data-editable-name="Social Links">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px] rounded-xl flex items-center justify-center text-[#A8B4C2] hover:text-[#00D9FF] hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              {icon}
            </a>
          ))}
        </div>
        <div className="w-[1px] h-4 bg-white/15 hidden lg:block" />
        <a
          href={`mailto:${content.contact.email}`}
          className="font-mono text-[13px] sm:text-[13.5px] lg:text-[14.5px] text-[#A8B4C2] hover:text-[#00D9FF] transition-colors tracking-wide truncate max-w-[280px]"
        >
          {content.contact.email}
        </a>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="relative z-10 w-full">
      {/* ─────────────────────────────────────────────────────────────
          1. WIDE DESKTOP LAYOUT (>= 1140px)
          3 Dedicated Regions: Left Text Panel | Center 3D Space | Right Portrait
          ───────────────────────────────────────────────────────────── */}
      <div className="hero-view-desktop hero-layout">
        {/* Left Region: Text Panel */}
        {renderTextPanel()}

        {/* Center Region: Reserved 3D Core Clearance Space */}
        <div className="hero-visual-3d" data-editable-id="hero-3d-core" data-editable-name="3D Core Canvas" aria-hidden="true" />

        {/* Right Region: Portrait Asset & Role Badge */}
        <motion.div
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          variants={portraitVariants}
          className="hero-portrait-col"
          data-editable-id="hero-portrait"
          data-editable-name="Profile Portrait"
        >
          <ProfilePhoto
            visible={visible}
            size="hero"
            mouseX={normalized.x}
            mouseY={normalized.y}
          />
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MEDIUM DESKTOP & TABLET LAYOUT (768px - 1139px)
          2 Dedicated Columns: Left Text Panel | Right Portrait
          ───────────────────────────────────────────────────────────── */}
      <div className="hero-view-tablet hero-layout-tablet">
        {/* Left Column: Text Panel */}
        {renderTextPanel()}

        {/* Right Column: Portrait Asset & Role Badge */}
        <motion.div
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          variants={portraitVariants}
          className="hero-portrait-col"
        >
          <ProfilePhoto
            visible={visible}
            size="standard"
            mouseX={normalized.x}
            mouseY={normalized.y}
          />
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MOBILE LAYOUT (< 768px)
          Single Column in Exact Sequence:
          1. Availability label
          2. Name
          3. Professional title
          4. Specialties
          5. Description
          6. CTA buttons
          7. Social links
          8. Portrait and role badge
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={heroSceneContainer}
        className="hero-view-mobile hero-layout-mobile"
      >
        {/* Mobile Glass Panel enclosing items 1 through 7 */}
        <div className="hero-mobile-panel">
          {/* 1. Availability Status */}
          <motion.div variants={metaVariants} className="hero-availability justify-center mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse flex-shrink-0" />
            <span className="max-w-full text-center">{hero.roleBadge || 'AVAILABLE FOR SOFTWARE ENGINEERING ROLES'}</span>
          </motion.div>

          {/* 2. Full Name */}
          <motion.h1
            variants={nameVariants}
            aria-label={hero.name?.full || 'Md Habib Munsar Ahmed'}
            className="hero-heading text-center mb-3.5 text-[clamp(32px,7.5vw,50px)]"
          >
            <span className="block font-display font-extrabold text-[#F4F7FA] uppercase leading-[1.05]">
              {nameLine1}
            </span>
            {nameLine2 && (
              <span className="block font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#38E8FF] to-[#F4F7FA] uppercase leading-[1.05] drop-shadow-[0_0_20px_rgba(0,217,255,0.22)]">
                {nameLine2}
              </span>
            )}
          </motion.h1>

          {/* 3. Professional Title */}
          <motion.div variants={titleVariants} className="hero-title text-center mb-3 text-[20px] sm:text-[23px]">
            {hero.title ? hero.title.toUpperCase() : 'SOFTWARE ENGINEER'}
          </motion.div>

          {/* 4. Specialties */}
          <motion.div variants={specializationVariants} className="hero-specialties justify-center mb-4 text-[13px] sm:text-[14px]">
            <span>AI/ML</span>
            <span className="text-[#007C99] font-bold">&bull;</span>
            <span>FULL-STACK</span>
            <span className="text-[#007C99] font-bold">&bull;</span>
            <span>CYBERSECURITY</span>
          </motion.div>

          {/* 5. Description */}
          <motion.p variants={descriptionVariants} className="hero-description text-center mx-auto mb-6 text-[15px] sm:text-[16px] max-w-md">
            {hero.description?.text ||
              'Software Engineer building intelligent, secure and scalable digital systems across AI, full-stack development and cybersecurity.'}
          </motion.p>

          {/* 6. CTA Action Buttons */}
          <motion.div variants={ctaVariants} className="hero-actions justify-center mb-6 flex-col sm:flex-row w-full max-w-xs sm:max-w-sm mx-auto">
            {hero.ctaPrimary.visible && (
              <button
                onClick={handleExplore}
                className="w-full sm:w-auto min-w-[200px] h-[50px] px-6 rounded-xl glass-btn-primary font-display text-[15px] font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_16px_rgba(0,217,255,0.2)]"
                aria-label={primaryCtaLabel}
              >
                <span>{primaryCtaLabel}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {hero.ctaSecondary.visible && (
              <button
                onClick={handleResume}
                className="w-full sm:w-auto min-w-[180px] h-[50px] px-6 rounded-xl glass-btn-secondary font-display text-[15px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 cursor-pointer"
                aria-label={secondaryCtaLabel}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1v9M3 7l4 4 4-4M1 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{secondaryCtaLabel}</span>
              </button>
            )}
          </motion.div>

          {/* 7. Social Links & Email */}
          <motion.div variants={socialVariants} className="hero-socials justify-center flex-col items-center gap-2.5">
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
              href={`mailto:${content.contact.email}`}
              className="font-mono text-[13px] text-[#A8B4C2] hover:text-[#00D9FF] transition-colors tracking-wide"
            >
              {content.contact.email}
            </a>
          </motion.div>
        </div>

        {/* 8. Portrait Asset & Role Badge (Cleanly placed below the panel on mobile) */}
        <motion.div variants={portraitVariants} className="hero-portrait-col w-full flex justify-center pt-2">
          <ProfilePhoto
            visible={visible}
            size="compact"
            interactiveParallax={false}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
