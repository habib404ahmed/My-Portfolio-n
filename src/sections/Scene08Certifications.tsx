import { useState } from 'react'
import { motion } from 'framer-motion'
import { certifications as staticCertifications, type Certification } from '@/data/certifications'
import { CertificateViewer } from '@/components/ui/cert/CertificateViewer'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { usePortfolioContent } from '@/context/ContentContext'
import { FileText } from 'lucide-react'

interface NodeTheme {
  color: string
  subtleGlow: string
  environmentBg: string
  nodeType: string
}

const THEMES: Record<string, NodeTheme> = {
  ai: {
    color: '#38E8FF',
    subtleGlow: 'rgba(56, 232, 255, 0.22)',
    environmentBg: 'radial-gradient(circle at 50% 50%, rgba(56, 232, 255, 0.08) 0%, transparent 70%)',
    nodeType: 'AI_NETWORK_NODE',
  },
  security: {
    color: '#00D9FF',
    subtleGlow: 'rgba(0, 217, 255, 0.22)',
    environmentBg: 'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.08) 0%, transparent 70%)',
    nodeType: 'SECURITY_PERIMETER',
  },
  recognition: {
    color: '#6575FF',
    subtleGlow: 'rgba(101, 117, 255, 0.22)',
    environmentBg: 'radial-gradient(circle at 50% 50%, rgba(101, 117, 255, 0.08) 0%, transparent 70%)',
    nodeType: 'HONOR_DOCUMENT',
  },
}

export function Scene08Certifications() {
  const { content } = usePortfolioContent()
  const certList = (Array.isArray(content?.certifications)
    ? (content.certifications as unknown as Certification[])
    : staticCertifications
  ).filter((c) => c.visible !== false)

  const [activeCert, setActiveCert] = useState<Certification | null>(null)
  const [focusedId, setFocusedId] = useState<string>(
    certList[0]?.id || ''
  )

  const currentTheme = THEMES[
    certList.find((c) => c.id === focusedId)?.category || 'ai'
  ] || THEMES.ai

  return (
    <SectionTransition id="certifications" ariaLabel="Verified Certifications" className="border-b border-[rgba(140,190,210,0.16)]">
      <div className="page-container relative">
        {/* Dynamic Spatial Environment Backdrop (Rule 08) */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700 -z-10"
          style={{ background: currentTheme.environmentBg }}
          aria-hidden="true"
        />

        {/* ─── CONTROLLED HIERARCHY & VERIFIED COUNTER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Small Scene Label */}
          <div className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-[#00D9FF] mb-3 px-3.5 py-1.5 rounded-full border border-[rgba(0,217,255,0.25)] bg-[#00D9FF]/[0.05] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span>SCENE 10 // CREDENTIAL CONSTELLATION</span>
          </div>

          {/* Controlled heading */}
          <h2 className="text-[clamp(32px,4vw,56px)] font-display font-extrabold text-[#F5F8FA] tracking-tight uppercase leading-[1.1] mb-3">
            CERTIFICATIONS
          </h2>

          {/* Small supporting text */}
          <p className="font-body text-[clamp(16px,1.2vw,18px)] text-[#A8B4C2] leading-[1.65] max-w-[65ch] mx-auto">
            Technical learning that shaped my engineering journey.
          </p>
        </div>

        {/* ─── CREDENTIAL CONSTELLATION NODES ─── */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {certList.length === 0 ? (
            <div className="col-span-full py-16 text-center rounded-2xl border border-white/5 bg-slate-950/40 p-8">
              <p className="font-mono text-sm text-slate-400">
                No certificates currently listed in this category.
              </p>
            </div>
          ) : (
            certList.map((cert, index) => {
            const theme = THEMES[cert.category] || THEMES.ai
            const isFocused = focusedId === cert.id
            const docPath = cert.downloadUrl || cert.image || ''
            const isPdf = /\.pdf$/i.test(docPath)

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
                className={`relative group rounded-2xl glass-card liquid-edge glass-reflection-sweep transition-all duration-400 p-6 sm:p-7 flex flex-col justify-between cursor-pointer select-none ${
                  isFocused
                    ? 'glass-focus border-[#00D9FF]/70 shadow-2xl'
                    : 'hover:border-[rgba(0,217,255,0.4)]'
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
                      <span className="font-mono text-[12px] sm:text-[13px] text-slate-300 tracking-widest uppercase font-semibold">
                        {cert.number} &bull; {theme.nodeType}
                      </span>
                    </div>
                    <span className="font-mono text-[13px] sm:text-[14px] text-slate-300 font-bold">
                      {cert.date.toUpperCase()}
                    </span>
                  </div>

                  {/* Real Document Thumbnail Preview — Glass Frame */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass-frame liquid-edge p-1 mb-5 transition-all">
                    {isPdf ? (
                      <div className="w-full h-full rounded-lg bg-black/60 border border-red-500/20 flex flex-col items-center justify-center p-4 text-center group-hover:border-cyan-400/50 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-2">
                          <FileText className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-red-300 uppercase tracking-wider">
                          PDF Document
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 mt-0.5 truncate max-w-[90%]">
                          {cert.fileName || 'Verified Document'}
                        </span>
                      </div>
                    ) : (
                      <picture className="block w-full h-full rounded-lg overflow-hidden">
                        <source type="image/webp" srcSet={cert.imageWebp || cert.image} />
                        <img
                          src={cert.image}
                          alt={`${cert.title} thumbnail`}
                          className="w-full h-full object-contain filter contrast-[1.01] transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </picture>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>

                  {/* Title & Issuer */}
                  <div className="font-mono text-[12px] sm:text-[13px] text-cyan-300 font-semibold tracking-wider uppercase mb-1.5">
                    {cert.categoryLabel}
                  </div>
                  <h3 className="font-display text-[18px] sm:text-[21px] font-bold text-[#F5F8FA] mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="font-body text-[15px] sm:text-[16px] text-slate-300 mb-4 font-medium">
                    {cert.issuer}
                  </div>
                </div>

                {/* Inspect Action Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[13px] sm:text-[14px] text-slate-300 group-hover:text-white transition-colors font-semibold">
                    VIEW CERTIFICATE
                  </span>
                  <span
                    className="font-mono text-base transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: theme.color }}
                  >
                    &rarr;
                  </span>
                </div>
              </motion.div>
            )
            })
          )}
        </div>

        {/* Cinematic Full-Screen Modal Viewer */}
        <CertificateViewer
          cert={activeCert}
          onClose={() => setActiveCert(null)}
          onSelectCert={(next) => setActiveCert(next)}
          certificates={certList}
        />
      </div>
    </SectionTransition>
  )
}
