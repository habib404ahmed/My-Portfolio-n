import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'

const FOCUS_PILLARS = [
  {
    title: 'AI / Machine Learning',
    desc: 'Autonomous agent architectures, RAG, and intelligent reasoning systems.',
    accent: '#a78bfa',
    border: 'rgba(167, 139, 250, 0.22)',
    bg: 'rgba(167, 139, 250, 0.035)',
  },
  {
    title: 'Full-Stack Development',
    desc: 'Scalable modern web applications, reactive user interfaces, and backend microservices.',
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
    <SectionTransition
      id="about"
      ariaLabel="Engineer Identity"
      className="relative border-b border-white/5 bg-[var(--color-void,#050507)] overflow-hidden"
    >
      <SceneContainer
        badge="SCENE 02 // IDENTITY & PHILOSOPHY"
        title="ENGINEER"
        titleHighlight="PROFILE"
        subtitle="Bridging algorithmic intelligence, secure engineering fundamentals, and high-performance web architecture."
      >
        {/* ─── 12-Column Architectural Layout Grid: 2-Col on Tablet & Desktop (md+), 1-Col on Mobile ─── */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] lg:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.65fr)] gap-8 lg:gap-12 items-start w-full">
          {/* ─── Left Column: Portrait & Profile Visual Module (Cols 1-4) ─── */}
          <div className="w-full flex flex-col items-center">
            {/* Visual Frame Wrapper with Corner Markers */}
            <div className="relative w-full max-w-[340px] lg:max-w-[380px] group">
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
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 340px, 380px"
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
              className="mt-4 h-[44px] w-full max-w-[340px] lg:max-w-[380px] px-4 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-sm flex items-center justify-between select-none shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
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

          {/* ─── Right Column: Profile Information Module (Strictly contained, max-w 900px) ─── */}
          <div
            className="profile-content w-full flex flex-col box-border"
            style={{ maxWidth: 'min(100%, 880px)' }}
          >
            {/* 1. Core Statement Box (Compact, natural content height, strictly inside border) */}
            <div className="core-statement w-full p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm box-border shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
              <div className="font-mono text-[11px] sm:text-xs font-bold text-cyan-400 mb-2 uppercase tracking-[0.12em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                <span>CORE STATEMENT</span>
              </div>
              <p className="text-[19px] sm:text-[21px] lg:text-[24px] font-display font-semibold text-slate-100 leading-[1.35] max-w-[760px] m-0">
                &ldquo;Software Engineer and BCA student focused on building intelligent, scalable and secure software systems.&rdquo;
              </p>
            </div>

            {/* 2. Editorial Description Block (14px gap below statement) */}
            <div className="profile-description w-full max-w-[850px] mt-[14px]">
              <p className="text-[15px] sm:text-[16px] text-slate-300 font-body leading-[1.55] max-w-[850px] m-0">
                I enjoy turning complex problems into practical software. My engineering practice combines modern web architecture, artificial intelligence, and cybersecurity fundamentals to build systems where intelligence, reliability and security meet.
              </p>
              {/* Secondary Description (6px gap) */}
              <p className="mt-[6px] text-[14px] sm:text-[15px] text-slate-400 font-body leading-[1.5] max-w-[850px] m-0">
                Currently exploring autonomous AI multi-agent workflows, full-stack microservice communication, and network security hardening.
              </p>
            </div>

            {/* 3. Three Capability Cards (18px gap below description, compact, content-determined height) */}
            <div className="capability-grid mt-[18px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full items-stretch">
              {FOCUS_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-[14px_16px] rounded-[14px] border flex flex-col items-start justify-start min-h-0 h-auto transition-all duration-300 hover:border-white/25 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                  style={{
                    borderColor: pillar.border,
                    backgroundColor: pillar.bg,
                  }}
                >
                  <div
                    className="font-display font-semibold text-[15px] leading-[1.3]"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.title}
                  </div>
                  <p className="text-[14px] leading-[1.5] text-slate-400 font-body mt-2 m-0">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* 4. Metadata Cards Row (14px gap below capability cards, compact 58px height) */}
            <div className="metadata-grid mt-[14px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <div className="h-[58px] px-[14px] py-[9px] rounded-[12px] border border-white/10 bg-slate-900/50 backdrop-blur-sm box-border flex flex-col justify-center shadow-sm">
                <span className="text-slate-500 block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider mb-0.5 font-semibold">
                  AFFILIATION
                </span>
                <span className="text-slate-200 font-sans text-[13px] sm:text-[14px] font-medium leading-tight truncate">
                  Assam Down Town University
                </span>
              </div>
              <div className="h-[58px] px-[14px] py-[9px] rounded-[12px] border border-white/10 bg-slate-900/50 backdrop-blur-sm box-border flex flex-col justify-center shadow-sm">
                <span className="text-slate-500 block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider mb-0.5 font-semibold">
                  ACADEMIC PERIOD
                </span>
                <span className="text-slate-200 font-mono text-[13px] sm:text-[14px] font-medium leading-tight truncate">
                  2025 &mdash; 2028 (BCA)
                </span>
              </div>
              <div className="h-[58px] px-[14px] py-[9px] rounded-[12px] border border-white/10 bg-slate-900/50 backdrop-blur-sm box-border flex flex-col justify-center shadow-sm">
                <span className="text-slate-500 block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider mb-0.5 font-semibold">
                  LOCATION
                </span>
                <span className="text-slate-200 font-sans text-[13px] sm:text-[14px] font-medium leading-tight truncate">
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
