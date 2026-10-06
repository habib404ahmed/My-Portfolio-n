import { useState } from 'react'
import { motion } from 'framer-motion'
import { certifications, type Certification } from '@/data/certifications'
import { CertificateViewer } from '@/components/ui/cert/CertificateViewer'
import { SectionTransition } from '@/components/ui/SectionTransition'

interface NodeTheme {
  color: string
  subtleGlow: string
  environmentBg: string
  nodeType: string
}

const THEMES: Record<string, NodeTheme> = {
  ai: {
    color: '#38bdf8',
    subtleGlow: 'rgba(56, 189, 248, 0.25)',
    environmentBg: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
    nodeType: 'AI_NETWORK_NODE',
  },
  security: {
    color: '#10b981',
    subtleGlow: 'rgba(16, 185, 129, 0.25)',
    environmentBg: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
    nodeType: 'SECURITY_PERIMETER',
  },
  recognition: {
    color: '#f59e0b',
    subtleGlow: 'rgba(245, 158, 11, 0.25)',
    environmentBg: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.09) 0%, transparent 70%)',
    nodeType: 'HONOR_DOCUMENT',
  },
}

export function Scene08Certifications() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null)
  const [focusedId, setFocusedId] = useState<string>('cisco-modern-ai')

  const currentTheme = THEMES[
    certifications.find((c) => c.id === focusedId)?.category || 'ai'
  ] || THEMES.ai

  return (
    <SectionTransition id="certifications" ariaLabel="Verified Certifications" className="border-b border-white/5">
      <div className="page-container relative">
        {/* Dynamic Spatial Environment Backdrop (Rule 08) */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 -z-10"
          style={{ background: currentTheme.environmentBg }}
          aria-hidden="true"
        />

        {/* ─── RULE 07: CONTROLLED HIERARCHY & VERIFIED COUNTER ─── */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {/* Small Scene Label */}
          <div className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-cyan-400 mb-3 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SCENE 10 // CREDENTIAL CONSTELLATION</span>
          </div>

          {/* Controlled heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight uppercase mb-3">
            CERTIFICATIONS
          </h2>

          {/* Small supporting text */}
          <p className="font-mono text-xs sm:text-sm text-slate-400 tracking-wide">
            Technical learning that shaped my engineering journey.
          </p>
        </div>

        {/* ─── CREDENTIAL CONSTELLATION NODES ─── */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {certifications.map((cert, index) => {
            const theme = THEMES[cert.category] || THEMES.ai
            const isFocused = focusedId === cert.id

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setFocusedId(cert.id)}
                onFocus={() => setFocusedId(cert.id)}
                onClick={() => setActiveCert(cert)}
                className={`relative group rounded-2xl border transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none ${
                  isFocused
                    ? 'border-white/40 bg-slate-900/90 shadow-xl'
                    : 'border-white/10 bg-slate-950/60 hover:border-white/25'
                }`}
                style={{
                  boxShadow: isFocused ? `0 0 35px ${theme.subtleGlow}` : 'none',
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveCert(cert)
                  }
                }}
                aria-label={`Inspect ${cert.title}`}
              >
                <div>
                  {/* Node Identity Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: theme.color }}
                      />
                      <span className="font-mono text-[0.625rem] text-slate-400 tracking-widest uppercase font-semibold">
                        {cert.number} &bull; {theme.nodeType}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-slate-400 font-bold">
                      {cert.date.toUpperCase()}
                    </span>
                  </div>

                  {/* Real Document Thumbnail Preview */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-black/60 mb-5 group-hover:border-white/20 transition-all">
                    <picture className="block w-full h-full">
                      <source type="image/webp" srcSet={cert.imageWebp} />
                      <img
                        src={cert.image}
                        alt={`${cert.title} thumbnail`}
                        className="w-full h-full object-contain filter contrast-[1.01] transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Title & Issuer */}
                  <div className="font-mono text-[0.6875rem] text-cyan-300 font-semibold tracking-wider uppercase mb-1">
                    {cert.categoryLabel}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="font-mono text-xs text-slate-300 mb-4 font-medium">
                    {cert.issuer}
                  </div>
                </div>

                {/* Inspect Action Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-300 group-hover:text-white transition-colors font-medium">
                    VIEW CERTIFICATE
                  </span>
                  <span
                    className="font-mono text-sm transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: theme.color }}
                  >
                    &rarr;
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Cinematic Full-Screen Modal Viewer */}
        <CertificateViewer
          cert={activeCert}
          onClose={() => setActiveCert(null)}
          onSelectCert={(next) => setActiveCert(next)}
        />
      </div>
    </SectionTransition>
  )
}
