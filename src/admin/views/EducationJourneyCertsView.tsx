import React, { useState } from 'react'
import type {
  PortfolioContent,
  EducationData,
  TimelineItemData,
  CertificationData,
} from '@/types/content.ts'
import {
  GraduationCap,
  Milestone,
  Award,
  Plus,
  Trash2,
  ExternalLink,
  Check,
  ShieldCheck,
  Upload,
  Search,
  Eye,
  X,
  Edit2,
  FileText,
  Download,
} from 'lucide-react'
import { CertificateEditModal } from '../components/CertificateEditModal.tsx'

interface EducationJourneyCertsViewProps {
  content: PortfolioContent
  mode: 'education' | 'journey' | 'certifications'
  onUpdateEducation: (edu: EducationData[]) => void
  onUpdateTimeline: (time: TimelineItemData[]) => void
  onUpdateCertifications: (certs: CertificationData[]) => void
}

export function EducationJourneyCertsView({
  content,
  mode,
  onUpdateEducation,
  onUpdateTimeline,
  onUpdateCertifications,
}: EducationJourneyCertsViewProps) {
  const [certSearch, setCertSearch] = useState('')
  const [previewCert, setPreviewCert] = useState<CertificationData | null>(null)
  const [editingCert, setEditingCert] = useState<CertificationData | null>(null)
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)

  // Education Handlers
  const handleAddEducation = () => {
    const newEdu: EducationData = {
      degree: 'BCA (Artificial Intelligence & Machine Learning)',
      institution: 'Assam Down Town University',
      period: '2024 — 2027',
      score: '8.10 SGPA',
      highlights: ['Consistent 8+ SGPA across foundational semesters'],
    }
    onUpdateEducation([...content.education, newEdu])
  }

  const handleUpdateEdu = (idx: number, updates: Partial<EducationData>) => {
    const next = [...content.education]
    next[idx] = { ...next[idx], ...updates }
    onUpdateEducation(next)
  }

  const handleRemoveEdu = (idx: number) => {
    onUpdateEducation(content.education.filter((_, i) => i !== idx))
  }

  // Journey Handlers
  const handleAddTimeline = () => {
    const nextId = `node-${Date.now()}`
    const newItem: TimelineItemData = {
      id: nextId,
      year: '2026',
      period: 'Q1 2026',
      label: 'New Milestone',
      subtitle: 'Technical Innovation',
      description: 'Milestone description and achievements.',
      type: 'projects',
      color: '#00D9FF',
    }
    onUpdateTimeline([...content.timeline, newItem])
  }

  const handleUpdateTimeline = (idx: number, updates: Partial<TimelineItemData>) => {
    const next = [...content.timeline]
    next[idx] = { ...next[idx], ...updates }
    onUpdateTimeline(next)
  }

  const handleRemoveTimeline = (idx: number) => {
    onUpdateTimeline(content.timeline.filter((_, i) => i !== idx))
  }

  // Certification Handlers
  const handleOpenAddCert = () => {
    setEditingCert(null)
    setIsCertModalOpen(true)
  }

  const handleOpenEditCert = (cert: CertificationData) => {
    setEditingCert(cert)
    setIsCertModalOpen(true)
  }

  const handleSaveCert = (savedCert: CertificationData) => {
    const existingIdx = content.certifications.findIndex((c) => c.id === savedCert.id)
    if (existingIdx >= 0) {
      const next = [...content.certifications]
      next[existingIdx] = savedCert
      onUpdateCertifications(next)
    } else {
      onUpdateCertifications([...content.certifications, savedCert])
    }
  }

  const handleRemoveCert = (id: string) => {
    if (confirm('Delete this certificate record from your portfolio?')) {
      onUpdateCertifications(content.certifications.filter((c) => c.id !== id))
    }
  }

  const handleToggleCertVisibility = (idx: number, visible: boolean) => {
    const next = [...content.certifications]
    next[idx] = { ...next[idx], visible }
    onUpdateCertifications(next)
  }

  const filteredCerts = content.certifications.filter((c) => {
    const q = certSearch.toLowerCase()
    return (
      c.title.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q) ||
      c.date.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-4 max-w-5xl mx-auto font-sans text-xs text-[#A8B4C2]">
      {/* Education Mode */}
      {mode === 'education' && (
        <div className="p-5 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-[#F5F8FA] uppercase font-mono">
                Academic Foundation ({content.education.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAddEducation}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>

          <div className="space-y-3">
            {content.education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/40 border border-[rgba(255,255,255,0.08)] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#8491A2] block mb-1">Degree Title</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleUpdateEdu(idx, { degree: e.target.value })}
                      className="w-full p-2 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded-lg text-[#F5F8FA] font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#8491A2] block mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleUpdateEdu(idx, { institution: e.target.value })}
                      className="w-full p-2 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded-lg text-[#F5F8FA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#8491A2] block mb-1">Academic Period</label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => handleUpdateEdu(idx, { period: e.target.value })}
                      className="w-full p-2 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded-lg text-cyan-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#8491A2] block mb-1">GPA / Score</label>
                    <input
                      type="text"
                      value={edu.score}
                      onChange={(e) => handleUpdateEdu(idx, { score: e.target.value })}
                      className="w-full p-2 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded-lg text-emerald-400 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveEdu(idx)}
                    className="text-red-400 hover:text-red-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Entry</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Journey Mode */}
      {mode === 'journey' && (
        <div className="p-5 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2">
              <Milestone className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-[#F5F8FA] uppercase font-mono">
                Career Journey &amp; Milestones ({content.timeline.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAddTimeline}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Milestone</span>
            </button>
          </div>

          <div className="space-y-3">
            {content.timeline.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-xl bg-black/40 border border-[rgba(255,255,255,0.08)] space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-[#8491A2] block mb-1">Milestone Title</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleUpdateTimeline(idx, { label: e.target.value })}
                      className="w-full p-2 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded-lg text-[#F5F8FA] font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#8491A2] block mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => handleUpdateTimeline(idx, { subtitle: e.target.value })}
                      className="w-full p-2 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded-lg text-[#F5F8FA]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#8491A2] block mb-1">Year / Period</label>
                    <input
                      type="text"
                      value={item.period || item.year}
                      onChange={(e) => handleUpdateTimeline(idx, { period: e.target.value, year: e.target.value })}
                      className="w-full p-2 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded-lg text-cyan-300 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8491A2] block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => handleUpdateTimeline(idx, { description: e.target.value })}
                    className="w-full p-2 bg-black/50 border border-[rgba(255,255,255,0.09)] rounded-lg text-[#F5F8FA] resize-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeline(idx)}
                    className="text-red-400 hover:text-red-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Milestone</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Mode */}
      {mode === 'certifications' && (
        <div className="p-5 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-[#F5F8FA] uppercase font-mono">
                Verified Certifications Vault ({content.certifications.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8491A2] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.08)] text-xs text-[#F5F8FA] placeholder-slate-600 font-mono w-44"
                />
              </div>

              <button
                type="button"
                onClick={handleOpenAddCert}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,217,255,0.25)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certificate</span>
              </button>
            </div>
          </div>

          {/* Certificate Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredCerts.map((c, idx) => {
              const docUrl = c.downloadUrl || c.image || ''
              const isPdf = /\.pdf$/i.test(docUrl)

              return (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-black/40 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,217,255,0.3)] transition-all flex flex-col justify-between gap-3 relative group"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail / PDF Document Indicator with Click to Preview */}
                    <div
                      onClick={() => setPreviewCert(c)}
                      className="w-16 h-14 bg-black/80 rounded-lg border border-white/10 overflow-hidden flex-shrink-0 cursor-pointer relative group flex items-center justify-center"
                      title="Click to view large preview"
                    >
                      {isPdf ? (
                        <div className="flex flex-col items-center justify-center text-center p-1">
                          <FileText className="w-6 h-6 text-red-400" />
                          <span className="text-[9px] font-mono text-red-300 font-bold uppercase mt-0.5">
                            PDF
                          </span>
                        </div>
                      ) : (
                        <img
                          src={docUrl || '/assets/images/certifications/python.png'}
                          alt={c.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#F5F8FA] truncate font-sans">
                          {c.title}
                        </h4>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-semibold bg-white/[0.06] text-[#A8B4C2] flex-shrink-0">
                          {c.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8491A2]">
                        <span className="truncate">{c.issuer}</span>
                        <span>•</span>
                        <span className="text-cyan-300 font-mono flex-shrink-0">{c.date}</span>
                      </div>

                      {/* Credential ID or Verification URL */}
                      {(c.credentialId || c.certificateId || c.verificationUrl) && (
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-cyan-400">
                          {(c.credentialId || c.certificateId) && (
                            <span className="truncate">ID: {c.credentialId || c.certificateId}</span>
                          )}
                          {c.verificationUrl && (
                            <a
                              href={c.verificationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
                              title="External Verification Link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-2.5 h-2.5" />
                              <span>Verify</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Toggles & Actions */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-[rgba(255,255,255,0.06)] text-[11px]">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer text-[#8491A2]">
                        <input
                          type="checkbox"
                          checked={c.verified}
                          onChange={(e) => {
                            const next = [...content.certifications]
                            next[idx] = { ...next[idx], verified: e.target.checked }
                            onUpdateCertifications(next)
                          }}
                          className="w-3.5 h-3.5 accent-cyan-400 rounded"
                        />
                        <span>Verified</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer text-[#8491A2]">
                        <input
                          type="checkbox"
                          checked={c.visible !== false}
                          onChange={(e) => handleToggleCertVisibility(idx, e.target.checked)}
                          className="w-3.5 h-3.5 accent-cyan-400 rounded"
                        />
                        <span>Visible</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditCert(c)}
                        className="px-2 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-[#F5F8FA] flex items-center gap-1 transition-colors cursor-pointer text-[11px]"
                        title="Edit metadata & upload document"
                      >
                        <Edit2 className="w-3 h-3 text-cyan-400" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPreviewCert(c)}
                        className="p-1 rounded text-[#8491A2] hover:text-cyan-300 transition-colors cursor-pointer"
                        title="Inspect Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveCert(c.id)}
                        className="p-1 rounded text-[#8491A2] hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete Certificate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── Add / Edit Certificate Modal with File Upload ─── */}
      <CertificateEditModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={editingCert}
        onSave={handleSaveCert}
        totalCount={content.certifications.length}
      />

      {/* ─── Large Certificate Preview Modal (Image & PDF Safe Viewer, z-50) ─── */}
      {previewCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#10151D] border border-[rgba(255,255,255,0.12)] rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Actions & Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.09)] flex-shrink-0">
              <div>
                <h4 className="text-sm font-bold text-[#F5F8FA] font-mono">
                  {previewCert.title}
                </h4>
                <p className="text-[11px] text-cyan-400 font-mono mt-0.5">
                  {previewCert.issuer} • {previewCert.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {previewCert.verificationUrl && (
                  <a
                    href={previewCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 transition-colors flex items-center gap-1 font-mono text-[11px]"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Verify Credential</span>
                  </a>
                )}

                <a
                  href={previewCert.downloadUrl || previewCert.image}
                  download={`${previewCert.id || 'certificate'}`}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 transition-colors flex items-center gap-1 font-mono text-[11px]"
                >
                  <Download className="w-3 h-3 text-cyan-400" />
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  aria-label="Close certificate preview"
                  className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[#F5F8FA] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body (Safe PDF iframe or High-Res Image) */}
            <div className="flex-1 min-h-[50vh] max-h-[70vh] rounded-xl overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center p-2">
              {/\.pdf$/i.test(previewCert.downloadUrl || previewCert.image || '') ? (
                <iframe
                  src={`${previewCert.downloadUrl || previewCert.image}#toolbar=0`}
                  title={previewCert.title}
                  className="w-full h-full min-h-[55vh] rounded border-0"
                />
              ) : (
                <img
                  src={previewCert.downloadUrl || previewCert.image}
                  alt={previewCert.title}
                  className="max-h-[65vh] max-w-full object-contain rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
