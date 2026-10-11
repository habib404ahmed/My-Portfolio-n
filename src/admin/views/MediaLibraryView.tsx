import React, { useState, useEffect } from 'react'
import type { MediaItem } from '../types.ts'
import {
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { apiFetch } from '../utils/api.ts'

export function MediaLibraryView() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'images' | 'pdfs'>('all')
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const fetchMedia = async () => {
    setIsLoading(true)
    try {
      const res = await apiFetch('/api/media')
      if (res.ok) {
        const data = await res.json()
        setMediaList(data)
      }
    } catch (err) {
      console.error('Error fetching media:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)

      try {
        await apiFetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
      } catch (err) {
        console.error('Upload error:', err)
      }
    }
    setIsUploading(false)
    fetchMedia()
  }

  const handleDelete = async (filename: string, inUse: boolean) => {
    if (inUse) {
      const proceed = confirm(
        `WARNING: "${filename}" is actively referenced by portfolio sections. Deleting it will create broken assets on your portfolio. Delete anyway?`
      )
      if (!proceed) return
    } else {
      if (!confirm(`Delete asset "${filename}"?`)) return
    }

    try {
      const res = await apiFetch(`/api/media/${filename}?force=true`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.filename !== filename))
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch = item.filename.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false
    if (filterType === 'images') return item.isImage
    if (filterType === 'pdfs') return item.isPdf
    return true
  })

  return (
    <div className="space-y-6 max-w-5xl font-mono text-xs text-slate-300">
      {/* Top Action Bar */}
      <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-black/50 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center bg-black/40 border border-slate-800 rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg ${
                filterType === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterType('images')}
              className={`px-2.5 py-1 rounded-lg ${
                filterType === 'images' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
              }`}
            >
              Images
            </button>
            <button
              type="button"
              onClick={() => setFilterType('pdfs')}
              className={`px-2.5 py-1 rounded-lg ${
                filterType === 'pdfs' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400'
              }`}
            >
              PDFs
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchMedia}
            title="Refresh assets list"
            className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <label className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(0,217,255,0.25)]">
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Uploading...' : 'Upload Media'}</span>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml,application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Media Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading media library...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center text-slate-500 border border-slate-800/80 rounded-2xl">
          No assets found matching query.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedia.map((m) => {
            const inUse = m.usedBy.length > 0

            return (
              <div
                key={m.filename}
                className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 flex flex-col justify-between space-y-3 group"
              >
                {/* Preview Box */}
                <div className="w-full h-36 rounded-xl bg-black/60 border border-slate-850 overflow-hidden flex items-center justify-center relative">
                  {m.isImage ? (
                    <img
                      src={m.url}
                      alt={m.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                      <FileText className="w-10 h-10 text-cyan-400" />
                      <span className="text-[11px] font-mono">PDF Document</span>
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {inUse ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[9px] uppercase font-bold">
                        In Use ({m.usedBy.join(', ')})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 text-[9px] uppercase font-bold">
                        Unused
                      </span>
                    )}
                  </div>
                </div>

                {/* Info & Metadata */}
                <div>
                  <div className="font-bold text-white truncate text-xs" title={m.filename}>
                    {m.filename}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span>{(m.size / 1024).toFixed(1)} KB</span>
                    <span>{new Date(m.modifiedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(m.url)}
                      className="p-1.5 rounded-lg bg-black/40 border border-slate-800 hover:text-cyan-300 text-slate-400 transition-colors"
                      title="Copy Public URL"
                    >
                      {copiedUrl === m.url ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-black/40 border border-slate-800 hover:text-cyan-300 text-slate-400 transition-colors"
                      title="View Asset in Tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(m.filename, inUse)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title={inUse ? 'Asset in use! Confirm before delete' : 'Delete Asset'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
