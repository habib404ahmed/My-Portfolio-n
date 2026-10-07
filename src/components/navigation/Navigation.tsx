import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems, profile } from '@/data/profile'
import { navReveal } from '@/animations/variants'

interface NavigationProps {
  visible: boolean
}

const DESKTOP_NAV_LINKS = [
  { id: 'about', label: 'IDENTITY', href: '#about' },
  { id: 'projects', label: 'WORK', href: '#projects' },
  { id: 'achievements', label: 'JOURNEY', href: '#achievements' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
]

export function Navigation({ visible }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          variants={navReveal}
          initial="hidden"
          animate="visible"
          role="banner"
          aria-label="Main navigation header"
          className={`site-header ${scrolled ? 'scrolled shadow-[0_8px_32px_rgba(0,0,0,0.85)]' : ''}`}
        >
          <div className="site-header-inner">
            {/* Brand block: H emblem + Title & Role */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-sm cursor-pointer select-none"
              aria-label="Habib Ahmed — Return to beginning"
            >
              {/* Profile Photo Thumbnail Brand Mark */}
              <div className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full overflow-hidden shrink-0 border border-[rgba(0,210,255,0.65)] bg-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.25)] transition-all duration-200 ease-out group-hover:scale-105 group-hover:border-[rgba(0,210,255,0.9)] group-hover:shadow-[0_0_14px_rgba(6,182,212,0.4)]">
                <picture>
                  <source type="image/webp" srcSet="/assets/images/profile-400.webp" />
                  <img
                    src={profile.photo.path}
                    alt={profile.photo.alt}
                    width={38}
                    height={38}
                    className="w-full h-full object-cover object-[center_18%] scale-[1.28] origin-[50%_22%] select-none pointer-events-none"
                    loading="eager"
                  />
                </picture>
              </div>

              {/* Text: Name & Role */}
              <div className="flex flex-col justify-center leading-none text-left">
                <span className="font-display text-sm font-bold tracking-wider text-white uppercase leading-tight group-hover:text-cyan-200 transition-colors">
                  HABIB AHMED
                </span>
                <span className="font-mono text-[0.625rem] text-slate-400 tracking-widest uppercase mt-0.5">
                  SOFTWARE ENGINEER
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links + Primary CTA */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Desktop Navigation">
              {DESKTOP_NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display text-xs font-medium tracking-[0.14em] uppercase text-slate-300 hover:text-cyan-300 transition-colors relative py-1 group focus:outline-none cursor-pointer"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}

              {/* Primary Emphasized Resume CTA Button */}
              <button
                onClick={() => handleNavClick('#resume')}
                className="ml-4 lg:ml-6 h-8 px-4 rounded-full font-display text-xs font-semibold tracking-wider uppercase glass-btn-primary hover:text-white transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer shrink-0"
              >
                RESUME
              </button>
            </nav>

            {/* Mobile Header Menu Trigger */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="h-8 px-3 rounded-full border border-white/15 bg-white/5 font-mono text-xs text-slate-200 tracking-wider hover:text-white hover:border-cyan-400/50 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
                aria-label={menuOpen ? 'Close navigation overlay' : 'Open navigation overlay'}
                aria-expanded={menuOpen}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{menuOpen ? '✕ CLOSE' : '☰ MENU'}</span>
              </button>
            </div>
          </div>

          {/* Full-Screen Mobile Navigation Overlay */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[1000] layer-modal bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden"
              >
                {/* Overlay Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                      HABIB AHMED // NAVIGATION
                    </span>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-white font-mono text-xs font-bold flex items-center gap-1"
                    aria-label="Close menu"
                  >
                    <span>✕</span>
                    <span>CLOSE</span>
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-5 my-auto">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.4 }}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left font-display text-2xl font-bold uppercase tracking-tight text-slate-200 hover:text-cyan-400 transition-colors flex items-baseline justify-between border-b border-white/5 pb-3"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-slate-500 tracking-widest">
                        0{index + 1}
                      </span>
                    </motion.button>
                  ))}

                  {/* Mobile Direct Download Resume Button */}
                  {profile.resume.available && (
                    <a
                      href="/assets/Md-Habib-Munsar-Ahmed-Resume.pdf"
                      download="Md-Habib-Munsar-Ahmed-Resume.pdf"
                      className="mt-2 w-full py-3 rounded-lg border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 font-display text-center text-sm font-bold uppercase tracking-wider block"
                    >
                      DOWNLOAD RESUME (PDF)
                    </a>
                  )}
                </div>

                {/* Overlay Bottom Contacts */}
                <div className="border-t border-white/10 pt-6">
                  <p className="font-mono text-[0.625rem] uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                    DIRECT CONTACT
                  </p>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="font-mono text-xs text-cyan-300 block truncate"
                  >
                    {profile.contact.email}
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
