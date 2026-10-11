import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navReveal } from '@/animations/variants'
import { usePortfolioContent } from '@/context/ContentContext.tsx'

interface NavigationProps {
  visible: boolean
}

export function Navigation({ visible }: NavigationProps) {
  const { content } = usePortfolioContent()
  const nav = content.navigation
  const profilePhoto = nav.profileImage || content.hero.profilePhoto.path
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')

  const isHiddenRef = useRef(false)
  const scrolledRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const isNavigatingRef = useRef(false)
  const navigatingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    lastScrollYRef.current = Math.max(0, window.scrollY)

    let ticking = false
    const handleScroll = () => {
      const currentY = Math.max(0, window.scrollY)
      const prevY = lastScrollYRef.current
      const delta = currentY - prevY

      // 1. Scrolled state (for glass surface opacity / border adjustment)
      const isNowScrolled = currentY > 20
      if (scrolledRef.current !== isNowScrolled) {
        scrolledRef.current = isNowScrolled
        setScrolled(isNowScrolled)
      }

      // 2. Active section detection
      const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]
      const scrollPos = currentY + 140
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(sec.id)
          break
        }
      }

      // 3. Smart Hide/Reveal Logic
      // Check if modal/dialog is open, mobile drawer open, or header has active focus
      const modalActive = Boolean(
        menuOpen ||
        document.querySelector('[role="dialog"]') ||
        (headerRef.current && headerRef.current.contains(document.activeElement))
      )

      if (isNavigatingRef.current || modalActive) {
        lastScrollYRef.current = currentY
        if (isHiddenRef.current) {
          isHiddenRef.current = false
          setIsHidden(false)
        }
        return
      }

      // Near top of page (<= 100px), always reveal
      if (currentY <= 100) {
        lastScrollYRef.current = currentY
        if (isHiddenRef.current) {
          isHiddenRef.current = false
          setIsHidden(false)
        }
        return
      }

      // Filter out tiny scroll noise / trackpad jitter (< 8px)
      if (Math.abs(delta) < 8) {
        return
      }

      if (delta > 0 && currentY > 100) {
        // Deliberate downward scroll -> hide
        if (!isHiddenRef.current) {
          isHiddenRef.current = true
          setIsHidden(true)
        }
      } else if (delta < 0) {
        // Deliberate upward scroll -> reveal
        if (isHiddenRef.current) {
          isHiddenRef.current = false
          setIsHidden(false)
        }
      }

      lastScrollYRef.current = currentY
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (navigatingTimerRef.current) clearTimeout(navigatingTimerRef.current)
    }
  }, [menuOpen])

  // Lock body scroll when mobile full-screen overlay is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Support Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (!href) return

    // Immediately reveal header and pause hide detection during programmatic scroll
    if (isHiddenRef.current) {
      isHiddenRef.current = false
      setIsHidden(false)
    }
    isNavigatingRef.current = true
    if (navigatingTimerRef.current) clearTimeout(navigatingTimerRef.current)
    navigatingTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false
      lastScrollYRef.current = Math.max(0, window.scrollY)
    }, 850)

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    let el = document.querySelector(href)
    // Alias fallbacks for section anchors
    if (!el && href === '#profile') el = document.querySelector('#about')
    if (!el && href === '#about') el = document.querySelector('#profile')
    if (!el && href === '#work') el = document.querySelector('#projects')
    if (!el && href === '#journey') el = document.querySelector('#achievements')

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isLinkActive = (href: string) => {
    const targetId = href.replace('#', '')
    if (targetId === activeSection) return true
    if (targetId === 'profile' && activeSection === 'about') return true
    if (targetId === 'about' && activeSection === 'profile') return true
    if (targetId === 'work' && activeSection === 'projects') return true
    if (targetId === 'journey' && activeSection === 'achievements') return true
    return false
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          ref={headerRef}
          variants={navReveal}
          initial="hidden"
          animate="visible"
          role="banner"
          aria-label="Main navigation header"
          data-editable-id="navbar"
          data-editable-name="Navbar"
          className={`site-header ${scrolled ? 'scrolled' : ''} ${isHidden ? 'is-hidden' : ''}`}
        >
          <div className="site-header-inner h-full flex items-center justify-between max-w-[1360px] mx-auto px-6 sm:px-8 w-full">
            {/* Brand block: Profile thumbnail + Name & Role */}
            <a
              href="#hero"
              data-editable-id="navbar-logo"
              data-editable-name="Navbar Logo"
              onClick={(e) => {
                e.preventDefault()
                if (isHiddenRef.current) {
                  isHiddenRef.current = false
                  setIsHidden(false)
                }
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg cursor-pointer select-none py-1"
              aria-label="Habib Ahmed — Return to top"
            >
              {/* Profile Photo Thumbnail Brand Mark */}
              <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] rounded-full overflow-hidden shrink-0 border border-cyan-400/60 bg-slate-900 shadow-[0_0_12px_rgba(0,217,255,0.25)] transition-all duration-200 ease-out group-hover:scale-105 group-hover:border-cyan-300 group-hover:shadow-[0_0_16px_rgba(0,217,255,0.45)]">
                <img
                  src={profilePhoto}
                  alt={nav.logoText || 'Profile avatar'}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (target.src.endsWith('.webp')) {
                      target.src = '/assets/images/profile.jpg'
                    }
                  }}
                />
              </div>

              {/* Text: Name & Role */}
              <div className="flex flex-col justify-center leading-none text-left" data-editable-id="navbar-brand-text" data-editable-name="Brand Text">
                <span className="font-display text-[15px] sm:text-[16px] font-bold tracking-wider text-white uppercase leading-tight group-hover:text-cyan-200 transition-colors whitespace-nowrap">
                  {nav.logoText || 'HABIB AHMED'}
                </span>
                <span className="font-mono text-[11px] sm:text-[12px] text-slate-400 tracking-widest uppercase mt-0.5 whitespace-nowrap">
                  {content.hero.title || 'SOFTWARE ENGINEER'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links + Primary CTA (Hidden on screens < 1120px to prevent cramped rows) */}
            <nav className="hidden xl:flex items-center gap-5 xl:gap-7" aria-label="Desktop Navigation" data-editable-id="navbar-nav" data-editable-name="Navigation Links">
              {nav.links.filter((l) => l.enabled).map((link) => {
                const active = isLinkActive(link.href)
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.href)}
                    className={`font-display text-[13.5px] xl:text-[14px] font-semibold tracking-[0.12em] uppercase transition-colors relative py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-sm cursor-pointer whitespace-nowrap select-none group ${
                      active ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-cyan-400 transition-transform duration-300 origin-left ${
                        active ? 'scale-x-100 shadow-[0_0_8px_rgba(0,217,255,0.6)]' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                )
              })}

              {/* Primary Emphasized Resume CTA Button */}
              <button
                onClick={() => handleNavClick('#resume')}
                data-editable-id="navbar-resume-btn"
                data-editable-name="Resume Button"
                className="ml-2 h-10 px-5 rounded-full font-display text-[13.5px] font-bold tracking-wider uppercase glass-btn-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer shrink-0 whitespace-nowrap shadow-[0_4px_16px_rgba(0,217,255,0.2)]"
              >
                {nav.resumeButtonText || 'RESUME'}
              </button>
            </nav>

            {/* Mobile / Tablet Compact Hamburger Trigger */}
            <div className="flex xl:hidden items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="h-10 px-4 rounded-full border border-white/15 bg-white/5 font-mono text-[13px] text-slate-200 tracking-wider hover:text-white hover:border-cyan-400/50 transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 cursor-pointer select-none"
                aria-label={menuOpen ? 'Close navigation drawer' : 'Open navigation menu'}
                aria-expanded={menuOpen}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{menuOpen ? '✕ CLOSE' : '☰ MENU'}</span>
              </button>
            </div>
          </div>

          {/* Full-Screen Mobile / Tablet Navigation Overlay */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[1000] layer-modal bg-[#030507]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 xl:hidden overflow-y-auto"
              >
                {/* Overlay Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-mono text-[13px] font-bold text-white tracking-widest uppercase">
                      HABIB AHMED // NAVIGATION
                    </span>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 text-slate-300 hover:text-white font-mono text-[13px] font-bold flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded"
                    aria-label="Close menu"
                  >
                    <span>✕</span>
                    <span>CLOSE</span>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-4 my-auto py-6">
                  {nav.links.filter((l) => l.enabled).map((item, index) => {
                    const active = isLinkActive(item.href)
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        onClick={() => handleNavClick(item.href)}
                        className={`text-left font-display text-xl sm:text-2xl font-bold uppercase tracking-tight transition-colors flex items-baseline justify-between border-b border-white/5 pb-2.5 cursor-pointer ${
                          active ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono text-xs sm:text-sm text-slate-500 tracking-widest">
                          0{index + 1}
                        </span>
                      </motion.button>
                    )
                  })}

                  {/* Mobile Direct Download Resume Button */}
                  {content.resume.available && (
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      href={content.resume.path || '/assets/Md-Habib-Munsar-Ahmed-Resume.pdf'}
                      download={content.resume.filename || 'Md-Habib-Munsar-Ahmed-Resume.pdf'}
                      className="mt-4 w-full h-[50px] rounded-xl border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 font-display flex items-center justify-center text-[15px] font-bold uppercase tracking-wider transition-colors"
                    >
                      {content.resume.downloadButtonText || 'DOWNLOAD RESUME (PDF)'}
                    </motion.a>
                  )}
                </div>

                {/* Overlay Bottom Contacts */}
                <div className="border-t border-white/10 pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400 mb-1.5 font-semibold">
                    DIRECT CONTACT
                  </p>
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="font-mono text-[14px] text-cyan-300 block truncate hover:underline"
                  >
                    {content.contact.email}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
