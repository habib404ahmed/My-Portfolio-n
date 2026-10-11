import React, { useState } from 'react'
import { UploadCloud, CheckCircle2, AlertCircle, X, Loader2 } from 'lucide-react'

interface PublishModalProps {
  isOpen: boolean
  onClose: () => void
  onPublish: (versionLabel: string) => Promise<{ success: boolean; message?: string; error?: string }>
}

export function PublishModal({ isOpen, onClose, onPublish }: PublishModalProps) {
  const [label, setLabel] = useState(`Production Release — ${new Date().toLocaleDateString()}`)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  if (!isOpen) return null

  const handleConfirm = async () => {
    setIsPublishing(true)
    setError(null)
    setSuccess(null)

    const res = await onPublish(label)
    setIsPublishing(false)

    if (res.success) {
      setSuccess(res.message || 'Portfolio published successfully!')
      setTimeout(() => {
        onClose()
        setSuccess(null)
      }, 1500)
    } else {
      setError(res.error || 'Failed to publish changes.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-mono text-slate-200">
      <div className="relative w-full max-w-lg bg-[#060A10] border border-cyan-500/40 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase">Publish Draft to Public Site</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Publishing makes all your draft edits immediately visible to live visitors on the public portfolio.
          An immutable version snapshot will be archived in the Version History for instant rollback if ever needed.
        </p>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div>
          <label className="text-[11px] text-slate-400 uppercase block mb-1.5">
            Version Snapshot Label / Release Note
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Hero overhaul and new AI project"
            className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isPublishing}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPublishing}
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Live...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>Confirm &amp; Publish Live</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
