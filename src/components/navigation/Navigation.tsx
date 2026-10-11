import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Download } from 'lucide-react'
import { navReveal } from '@/animations/variants'
import { usePortfolioContent } from '@/context/ContentContext.tsx'

interface NavigationProps {
  visible: boolean
}

function formatNavLabel(label: string): string {
  const normalized = label.trim().toUpperCase()
  const mapping: Record<string, string> = {
    'PROFILE': 'Profile',
    'HOW I BUILD': 'How I Build',
    'STACK': 'Stack',
    'CAPABILITIES': 'Capabilities',
    'PROJECTS': 'Projects',
    'JOURNEY': 'Journey',
    'CERTS': 'Certs',
    'CERTIFICATIONS': 'Certs',
    'CONTACT': 'Contact',
    'RESUME': 'Resume',
  }
  return mapping[normalized] || label
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

      // 1. Scrolled state (for glass surface opacity / background adjustment)
      const isNowScrolled = currentY > 20
      if (scrolledRef.current !== isNowScrolled) {
        scrolledRef.current = isNowScrolled
        setScrolled(isNowScrolled)
      }

      // 2. Active section detection (Top of page maps to hero/profile)
      if (currentY <= 120) {
        setActiveSection('hero')
      } else {
        const sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]
        const scrollPos = currentY + 160
        for (let i = sections.length - 1; i >= 0; i--) {
          const sec = sections[i]
          const secTop = sec.getBoundingClientRect().top + currentY
          if (secTop <= scrollPos) {
            setActiveSection(sec.id)
            break
          }
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
    if (!el && href === '#mindset') el = document.querySelector('#how-i-build')
    if (!el && href === '#how-i-build') el = document.querySelector('#mindset')
    if (!el && href === '#stack') el = document.querySelector('#universe')
    if (!el && href === '#universe') el = document.querySelector('#stack')
    if (!el && href === '#work') el = document.querySelector('#projects')
    if (!el && href === '#projects') el = document.querySelector('#work')
    if (!el && href === '#journey') el = document.querySelector('#achievements')
    if (!el && href === '#achievements') el = document.querySelector('#journey')
    if (!el && href === '#certs') el = document.querySelector('#certifications')
    if (!el && href === '#certifications') el = document.querySelector('#certs')

    if (el) {
      const navOffset = 84
      const targetPos = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top: Math.max(0, targetPos), behavior: 'smooth' })
    }
  }

  const isLinkActive = (href: string) => {
    const targetId = href.replace('#', '')
    if (targetId === activeSection) return true
    if ((targetId === 'profile' || targetId === 'about') && (activeSection === 'hero' || activeSection === 'about' || activeSection === 'profile' || activeSection === 'enter-system')) return true
    if (targetId === 'how-i-build' && (activeSection === 'mindset' || activeSection === 'how-i-build')) return true
    if (targetId === 'mindset' && (activeSection === 'how-i-build' || activeSection === 'mindset')) return true
    if (targetId === 'stack' && (activeSection === 'universe' || activeSection === 'stack')) return true
    if (targetId === 'universe' && (activeSection === 'stack' || activeSection === 'universe')) return true
    if (targetId === 'capabilities' && activeSection === 'capabilities') return true
    if (targetId === 'projects' && (activeSection === 'projects' || activeSection === 'work' || activeSection === 'projects-cta')) return true
    if (targetId === 'work' && (activeSection === 'projects' || activeSection === 'work' || activeSection === 'projects-cta')) return true
    if (targetId === 'journey' && (activeSection === 'achievements' || activeSection === 'journey')) return true
    if (targetId === 'achievements' && (activeSection === 'journey' || activeSection === 'achievements')) return true
    if (targetId === 'certs' && (activeSection === 'certifications' || activeSection === 'certs')) return true
    if (targetId === 'certifications' && (activeSection === 'certs' || activeSection === 'certifications')) return true
    if (targetId === 'contact' && activeSection === 'contact') return true
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
          <div className="site-header-inner">
            {/* 1. Left: Brand block (Profile thumbnail + Name & Role) */}
            <div className="header-brand-area">
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
                className="header-brand-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Habib Ahmed — Return to top"
              >
                {/* Profile Photo Thumbnail Brand Mark with Glowing Cyan Outline */}
                <div className="header-brand-avatar">
                  <img
                    src={profilePhoto}
                    alt={nav.logoText || 'Profile avatar'}
                    width={42}
                    height={42}
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
                <div className="header-brand-text" data-editable-id="navbar-brand-text" data-editable-name="Brand Text">
                  <span className="header-brand-name">
                    {nav.logoText || 'HABIB AHMED'}
                  </span>
                  <span className="header-brand-title">
                    {content.hero.title || 'SOFTWARE ENGINEER'}
                  </span>
                </div>
              </a>
            </div>

            {/* 2. Center: Floating Liquid Glass Navigation Capsule (Design 05) */}
            <nav
              className="header-nav-area hidden lg:flex"
              aria-label="Desktop Navigation"
              data-editable-id="navbar-nav"
              data-editable-name="Navigation Links"
            >
              <div className="nav-floating-pill">
                {nav.links.filter((l) => l.enabled && l.id !== 'resume' && l.href !== '#resume').map((link) => {
                  const active = isLinkActive(link.href)
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.href)}
                      className={`nav-pill-link ${active ? 'active' : ''} group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="nav-pill-label">{formatNavLabel(link.label)}</span>
                      <span className={`nav-pill-dot ${active ? 'visible' : ''}`} aria-hidden="true" />
                    </button>
                  )
                })}
              </div>
            </nav>

            {/* 3. Right: Resume CTA Button & Mobile Trigger */}
            <div className="header-actions-area">
              {/* Primary Emphasized Resume CTA Button (Capsule with Download Icon) */}
              <button
                onClick={() => handleNavClick('#resume')}
                data-editable-id="navbar-resume-btn"
                data-editable-name="Resume Button"
                className="header-resume-pill hidden sm:inline-flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                aria-label="View or download Resume"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400 stroke-[2.2] transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
                <span>{formatNavLabel(nav.resumeButtonText || 'Resume')}</span>
              </button>

              {/* Mobile / Tablet Compact Hamburger Trigger */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="header-mobile-toggle flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
                  aria-label={menuOpen ? 'Close navigation drawer' : 'Open navigation menu'}
                  aria-expanded={menuOpen}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{menuOpen ? '✕ CLOSE' : '☰ MENU'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full-Screen Mobile / Tablet Navigation Overlay (Rendered directly to body via portal) */}
          {typeof document !== 'undefined' && createPortal(
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[1000] layer-modal bg-[#030507]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto"
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
                    {nav.links.filter((l) => l.enabled && l.id !== 'resume' && l.href !== '#resume').map((item, index) => {
                      const active = isLinkActive(item.href)
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.25 }}
                          onClick={() => handleNavClick(item.href)}
                          className={`text-left font-display text-lg sm:text-xl font-bold tracking-tight transition-colors flex items-baseline justify-between border-b border-white/5 pb-2.5 cursor-pointer ${
                            active ? 'text-cyan-400' : 'text-slate-200 hover:text-cyan-300'
                          }`}
                        >
                          <span>{formatNavLabel(item.label)}</span>
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
                        className="mt-4 w-full h-[50px] rounded-full border border-cyan-500/50 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 font-display flex items-center justify-center gap-2 text-[15px] font-bold tracking-wider transition-colors"
                      >
                        <Download className="w-4 h-4 text-cyan-400" />
                        <span>{content.resume.downloadButtonText || 'DOWNLOAD RESUME (PDF)'}</span>
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
            </AnimatePresence>,
            document.body
          )}
        </motion.header>
      )}
    </AnimatePresence>
  )
}

