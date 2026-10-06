import { useState } from 'react'
import { motion } from 'framer-motion'
import { certifications, type Certification } from '@/data/certifications'
import { CertificateViewer } from '@/components/ui/cert/CertificateViewer'

interface CertificationVaultProps {
  externalSelectedId?: string | null
  onClearExternal?: () => void
}

export function CertificationVault({ externalSelectedId, onClearExternal }: CertificationVaultProps) {
  const [activeCert, setActiveCert] = useState<Certification | null>(null)

  // Handle external selection from timeline
  const selectedCert = externalSelectedId
    ? certifications.find((c) => c.id === externalSelectedId) || activeCert
    : activeCert

  const handleClose = () => {
    setActiveCert(null)
    if (onClearExternal) onClearExternal()
  }

  return (
    <div className="w-full mb-20">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-1">
            DIGITAL VAULT // CREDENTIAL ARCHIVE
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Verified Certifications
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-500 hidden sm:block">
          ENCRYPTED DIGITAL RECORDS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            onClick={() => setActiveCert(cert)}
            className="group relative p-6 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-cyan-500/40 hover:-translate-y-1.5 flex flex-col justify-between"
            style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActiveCert(cert)
              }
            }}
            aria-label={`Open certificate: ${cert.title}`}
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  VAULT RECORD // 0{idx + 1}
                </span>
                <span className="font-mono text-xs text-slate-500">{cert.year}</span>
              </div>

              {/* Certificate Image or Scanner Thumbnail */}
              {cert.imagePath ? (
                <div className="w-full h-36 rounded-lg overflow-hidden mb-4 border border-white/10 bg-black/60 relative group-hover:border-cyan-500/50 transition-colors">
                  <img
                    src={cert.imagePath}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2.5 font-mono text-[0.625rem] text-cyan-300 bg-black/70 px-2 py-0.5 rounded border border-cyan-500/30">
                    ORIGINAL SCANNED DOCUMENT
                  </span>
                </div>
              ) : (
                <div className="w-full h-24 rounded-lg border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-slate-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-mono text-[0.625rem] text-slate-500">DIGITAL CREDENTIAL RECORD</span>
                </div>
              )}

              <h4 className="text-lg font-display font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {cert.title}
              </h4>
              <div className="font-mono text-xs text-slate-400 mb-3">
                {cert.issuer} &bull; {cert.date}
              </div>

              {cert.certificateId && (
                <div className="inline-block font-mono text-[0.6875rem] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 mb-3">
                  ID: {cert.certificateId}
                </div>
              )}

              <p className="text-xs text-slate-400 font-body leading-relaxed mb-4 line-clamp-2">
                {cert.description}
              </p>

              {/* Learning Themes */}
              {cert.learningThemes && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.learningThemes.slice(0, 3).map((theme) => (
                    <span
                      key={theme}
                      className="font-mono text-[0.5625rem] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Inspect Button Footer */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs text-cyan-400 group-hover:text-cyan-300">
              <span>INSPECT FULL CERTIFICATE</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Inspector */}
      <CertificateViewer
        cert={selectedCert}
        onClose={handleClose}
        onSelectCert={(next) => setActiveCert(next)}
      />
    </div>
  )
}
