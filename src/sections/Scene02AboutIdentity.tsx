import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'

const FOCUS_PILLARS = [
  {
    title: 'AI / Machine Learning',
    desc: 'Autonomous agent architectures, retrieval-augmented generation (RAG), and intelligent reasoning systems.',
    accent: '#a78bfa',
    border: 'rgba(167, 139, 250, 0.22)',
    bg: 'rgba(167, 139, 250, 0.035)',
  },
  {
    title: 'Full-Stack Development',
    desc: 'Scalable modern web applications, reactive user interfaces, and robust backend microservices.',
    accent: '#38bdf8',
    border: 'rgba(56, 189, 248, 0.22)',
    bg: 'rgba(56, 189, 248, 0.035)',
  },
  {
    title: 'Cybersecurity',
    desc: 'Ethical penetration testing, secure software lifecycles, and zero-trust network defense.',
    accent: '#10b981',
    border: 'rgba(16, 185, 129, 0.22)',
    bg: 'rgba(16, 185, 129, 0.035)',
  },
]

export function Scene02AboutIdentity() {
  return (
    <SectionTransition id="about" ariaLabel="Engineer Identity" className="py-24 md:py-32 border-b border-white/5">
      <SceneContainer
        badge="SCENE 02 // IDENTITY & PHILOSOPHY"
        title="ENGINEER"
        titleHighlight="PROFILE"
        subtitle="Bridging algorithmic intelligence, secure engineering fundamentals, and high-performance web architecture."
      >
        {/* ─── 12-Column Architectural Layout Grid: 2-Col on Tablet & Desktop (md+), 1-Col on Mobile ─── */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.65fr)] gap-8 lg:gap-12 items-start w-full">
          {/* ─── Left Column: Portrait & Profile Visual Module (Cols 1-4) ─── */}
          <div className="w-full flex flex-col items-center">
            {/* Visual Frame Wrapper with Corner Markers */}
            <div className="relative w-full max-w-[340px] lg:max-w-[390px] group">
              {/* Subtle Refined Corner Markers */}
              <div
                className="absolute -top-2 -left-2 w-3.5 h-3.5 border-t border-l border-cyan-400/40 pointer-events-none transition-colors duration-500 group-hover:border-cyan-400/70 z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -top-2 -right-2 w-3.5 h-3.5 border-t border-r border-cyan-400/40 pointer-events-none transition-colors duration-500 group-hover:border-cyan-400/70 z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-2 -left-2 w-3.5 h-3.5 border-b border-l border-cyan-400/40 pointer-events-none transition-colors duration-500 group-hover:border-cyan-400/70 z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-2 -right-2 w-3.5 h-3.5 border-b border-r border-cyan-400/40 pointer-events-none transition-colors duration-500 group-hover:border-cyan-400/70 z-10"
                aria-hidden="true"
              />

              {/* Portrait Frame: Exactly 3/4 aspect ratio, rounded corners, tightly wrapped */}
              <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden border border-white/10 bg-slate-950/70 shadow-[0_16px_40px_rgba(0,0,0,0.65)] transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(6,182,212,0.12)]">
                <picture className="block w-full h-full">
                  <source
                    type="image/webp"
                    srcSet="/assets/images/profile-400.webp 400w, /assets/images/profile-600.webp 600w, /assets/images/profile.webp 576w"
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 340px, 390px"
                  />
                  <img
                    src="/assets/images/profile.webp"
                    alt={profile.photo.alt || 'Md Habib Munsar Ahmed — Software Engineer'}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_12%] block filter contrast-[1.01] brightness-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    onError={(e) => {
                      const target = e.currentTarget
                      if (target.src.endsWith('.webp')) {
                        target.src = '/assets/images/profile.jpg'
                      }
                    }}
                  />
                </picture>

                {/* Subtle Filmic Edge Vignette */}
                <div
                  className="absolute inset-0 rounded-[20px] pointer-events-none ring-1 ring-inset ring-white/10"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 35%, transparent 68%, rgba(5,5,7,0.3) 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Role Badge: Normal document flow, exactly 12-14px gap */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-3.5 h-[38px] min-w-[190px] px-5 rounded-full border border-cyan-500/25 bg-slate-950/85 backdrop-blur-md flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_12px_rgba(6,182,212,0.1)] whitespace-nowrap select-none"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse flex-shrink-0" />
              <span className="font-mono text-xs text-slate-100 tracking-[0.08em] uppercase font-bold">
                SOFTWARE ENGINEER
              </span>
            </motion.div>

            {/* Profile Meta Footer Strip: Exactly 14-16px gap below badge */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 h-[44px] w-full max-w-[340px] lg:max-w-[390px] px-4 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-sm flex items-center justify-between select-none shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                <span className="font-display text-xs font-semibold text-slate-200 truncate">
                  Md Habib Munsar Ahmed
                </span>
              </div>
              <span className="font-mono text-[0.6875rem] text-slate-400 tracking-wide flex-shrink-0 ml-2">
                {profile.location.split(',')[0]}
              </span>
            </motion.div>
          </div>

          {/* ─── Right Column: Profile Information Module (Cols 5-12) ─── */}
          <div className="w-full flex flex-col">
            {/* 1. Core Statement Box (Compact, natural height, strictly inside border) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="w-full p-5 sm:p-6 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm relative overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              <div className="font-mono text-xs font-bold text-cyan-400 mb-2.5 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 rotate-45 bg-cyan-400/90 inline-block flex-shrink-0" />
                <span>CORE STATEMENT</span>
              </div>
              <p className="text-xl sm:text-2xl lg:text-[1.55rem] font-display font-bold text-slate-100 leading-[1.3] m-0">
                &ldquo;Software Engineer and BCA student focused on building intelligent, scalable and secure software systems.&rdquo;
              </p>
            </motion.div>

            {/* 2. Editorial Description Paragraphs (14-18px gap below statement) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-4 max-w-[820px] text-slate-300 font-body text-[0.9375rem] sm:text-base leading-[1.6]"
            >
              <p className="m-0">
                I enjoy turning complex problems into practical software. My engineering practice combines modern web architecture, artificial intelligence, and cybersecurity fundamentals to build systems where intelligence, reliability and security meet.
              </p>
              {/* Secondary Description (10-14px gap) */}
              <p className="mt-3 m-0 text-slate-400 text-sm sm:text-[0.9375rem] leading-[1.6]">
                Currently exploring autonomous AI multi-agent workflows, full-stack microservice communication, and network security hardening.
              </p>
            </motion.div>

            {/* 3. Three Capability Cards (18-24px gap below description) */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18px] items-stretch">
              {FOCUS_PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.08 }}
                  className="p-4 sm:p-[18px] rounded-2xl border flex flex-col justify-start min-h-[165px] transition-all duration-300 hover:border-white/25 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  style={{
                    borderColor: pillar.border,
                    backgroundColor: pillar.bg,
                  }}
                >
                  <div
                    className="font-display font-bold text-[0.9375rem] sm:text-base mb-2 leading-snug"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.title}
                  </div>
                  <p className="text-xs sm:text-[0.875rem] text-slate-400 leading-[1.55] font-body m-0">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 4. Metadata Cards Row (16-18px gap below capability cards) */}
            <div className="mt-4 sm:mt-[18px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[18px]">
              <div className="h-[60px] px-3.5 py-2.5 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm flex flex-col justify-center shadow-sm">
                <span className="text-slate-500 block font-mono text-[0.625rem] uppercase tracking-wider mb-0.5 font-semibold">
                  AFFILIATION
                </span>
                <span className="text-slate-200 font-sans text-xs sm:text-[0.8125rem] font-medium leading-tight truncate">
                  Assam Down Town University
                </span>
              </div>
              <div className="h-[60px] px-3.5 py-2.5 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm flex flex-col justify-center shadow-sm">
                <span className="text-slate-500 block font-mono text-[0.625rem] uppercase tracking-wider mb-0.5 font-semibold">
                  ACADEMIC PERIOD
                </span>
                <span className="text-slate-200 font-mono text-xs sm:text-[0.8125rem] font-medium leading-tight truncate">
                  2025 &mdash; 2028 (BCA)
                </span>
              </div>
              <div className="h-[60px] px-3.5 py-2.5 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm flex flex-col justify-center shadow-sm">
                <span className="text-slate-500 block font-mono text-[0.625rem] uppercase tracking-wider mb-0.5 font-semibold">
                  LOCATION
                </span>
                <span className="text-slate-200 font-sans text-xs sm:text-[0.8125rem] font-medium leading-tight truncate">
                  {profile.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SceneContainer>
    </SectionTransition>
  )
}
