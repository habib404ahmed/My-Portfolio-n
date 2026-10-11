import React, { useState } from 'react'
import type { PortfolioContent, ResumeData } from '@/types/content.ts'
import {
  FileText,
  Upload,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Loader2,
} from 'lucide-react'
import { apiFetch } from '../utils/api.ts'

interface ResumeManagerViewProps {
  content: PortfolioContent
  onChange: (updatedResume: ResumeData) => void
}

export function ResumeManagerView({ content, onChange }: ResumeManagerViewProps) {
  const resume = content.resume
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generateOutput, setGenerateOutput] = useState<string | null>(null)
  const [generateError, setGenerateError] = useState<string | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      alert('Only PDF files are supported.')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await apiFetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (res.ok && data.url) {
        onChange({
          ...resume,
          path: data.url,
          filename: file.name,
          lastGenerated: new Date().toISOString().split('T')[0],
        })
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRegenerateAtsPdf = async () => {
    setIsGenerating(true)
    setGenerateOutput(null)
    setGenerateError(null)

    try {
      const res = await apiFetch('/api/resume/generate', {
        method: 'POST',
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setGenerateOutput(data.output || 'Resume generated successfully!')
        onChange({
          ...resume,
          lastGenerated: new Date().toISOString().split('T')[0],
        })
      } else {
        setGenerateError(data.error || 'Generation failed.')
      }
    } catch (err: any) {
      setGenerateError(err.message || 'Network error triggering generator.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs text-slate-300">
      {/* ATS PDF Engine Generator Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/20 border border-cyan-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase">
              ATS Resume Compilation Engine
            </h3>
          </div>
          <span className="text-[11px] text-cyan-400 font-bold">
            Last Built: {resume.lastGenerated || '2026-03-01'}
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
          This runs the verified <code className="text-cyan-300">scripts/generate_resume_pdf.js</code> engine
          powered by <code className="text-cyan-300">pdf-lib</code> and <code className="text-cyan-300">sharp</code>.
          It compiles the ATS-compliant 1-page resume with embedded profile photo, exact margins, and clickable metadata links.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleRegenerateAtsPdf}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,217,255,0.25)] cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Compiling ATS PDF...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate ATS Resume PDF</span>
              </>
            )}
          </button>

          <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all">
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>{isUploading ? 'Uploading...' : 'Upload Replacement PDF'}</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <a
            href={resume.path}
            download={resume.filename}
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-slate-700 text-slate-300 uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Test Download Link</span>
          </a>
        </div>

        {generateOutput && (
          <div className="mt-4 p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono whitespace-pre-wrap">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Compilation Successful</span>
            </div>
            {generateOutput}
          </div>
        )}

        {generateError && (
          <div className="mt-4 p-3 rounded-xl bg-black/60 border border-red-500/30 text-red-300 text-[11px] font-mono whitespace-pre-wrap">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>Compilation Error</span>
            </div>
            {generateError}
          </div>
        )}
      </div>

      {/* Configuration Fields */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase pb-2 border-b border-slate-800">
          Resume Action Button &amp; Metadata
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Download Button Label</label>
            <input
              type="text"
              value={resume.downloadButtonText}
              onChange={(e) => onChange({ ...resume, downloadButtonText: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Saved Download Filename</label>
            <input
              type="text"
              value={resume.filename}
              onChange={(e) => onChange({ ...resume, filename: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] text-slate-400 block mb-1">Supporting Description Text</label>
            <input
              type="text"
              value={resume.supportingText}
              onChange={(e) => onChange({ ...resume, supportingText: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] text-slate-400 block mb-1">Public Asset URL</label>
            <input
              type="text"
              value={resume.path}
              onChange={(e) => onChange({ ...resume, path: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-cyan-300 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Embedded PDF Viewer Preview */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>PDF Document Live Viewer</span>
          </h3>
          <a
            href={resume.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px]"
          >
            <span>Open in Full Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="w-full h-[550px] bg-black/80 rounded-xl overflow-hidden border border-slate-800">
          <iframe
            src={resume.path}
            title="Resume PDF Viewer"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  )
}
