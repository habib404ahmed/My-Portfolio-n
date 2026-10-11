import React, { useState, useEffect } from 'react'
import type { ContentVersion } from '@/types/content.ts'
import { History, RotateCcw, Clock, Check, User, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react'
import { apiFetch } from '../utils/api.ts'

interface VersionHistoryViewProps {
  onRollbackSuccess: (restoredContent: any) => void
}

export function VersionHistoryView({ onRollbackSuccess }: VersionHistoryViewProps) {
  const [versions, setVersions] = useState<ContentVersion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVersion, setSelectedVersion] = useState<ContentVersion | null>(null)
  const [isRollingBack, setIsRollingBack] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const fetchVersions = async () => {
    setIsLoading(true)
    try {
      const res = await apiFetch('/api/content/versions')
      if (res.ok) {
        const data = await res.json()
        setVersions(data)
        if (data.length > 0 && !selectedVersion) {
          setSelectedVersion(data[0])
        }
      }
    } catch (err) {
      console.error('Error fetching versions:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVersions()
  }, [])

  const handleRollback = async (v: ContentVersion) => {
    const confirmed = confirm(
      `Are you sure you want to restore "${v.label}" published on ${new Date(
        v.timestamp
      ).toLocaleString()}? This will update both draft and live versions.`
    )
    if (!confirmed) return

    setIsRollingBack(true)
    setMessage(null)

    try {
      const res = await apiFetch('/api/content/rollback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ versionId: v.id }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setMessage(`Successfully restored "${v.label}"!`)
        onRollbackSuccess(data.content)
        fetchVersions()
      } else {
        alert(data.error || 'Rollback failed')
      }
    } catch (err: any) {
      alert('Rollback error: ' + err.message)
    } finally {
      setIsRollingBack(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl font-mono text-xs text-slate-300">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase">Publication Version History</h3>
        </div>
        <button
          type="button"
          onClick={fetchVersions}
          className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
          title="Refresh versions"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading version snapshots...</div>
      ) : versions.length === 0 ? (
        <div className="p-12 text-center text-slate-500 border border-slate-800 rounded-2xl">
          No previous publication versions recorded yet. Publish changes to create snapshot archives.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Snapshots List (col-span-5) */}
          <div className="md:col-span-5 space-y-2 max-h-[70vh] overflow-y-auto custom-scrollbar pr-1">
            {versions.map((v) => {
              const isSelected = selectedVersion?.id === v.id
              const dateStr = new Date(v.timestamp).toLocaleString()

              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVersion(v)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-[0_0_15px_rgba(0,217,255,0.15)]'
                      : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-xs truncate">{v.label}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">{v.id}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-600" />
                      <span>{dateStr}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-600" />
                      <span>{v.author}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: Snapshot Detail & Rollback Action (col-span-7) */}
          {selectedVersion ? (
            <div className="md:col-span-7 p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">{selectedVersion.label}</h4>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    ID: {selectedVersion.id} • Created: {new Date(selectedVersion.timestamp).toLocaleString()}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isRollingBack}
                  onClick={() => handleRollback(selectedVersion)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore This Version</span>
                </button>
              </div>

              {/* Version Snapshot Summary */}
              <div className="space-y-3">
                <div className="text-xs text-slate-400">Snapshot Content Overview:</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-black/40 border border-slate-850">
                    <div className="text-slate-500 text-[10px]">HERO TITLE</div>
                    <div className="text-white font-bold mt-0.5 truncate">
                      {selectedVersion.content.hero.name.full}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-slate-850">
                    <div className="text-slate-500 text-[10px]">PROJECTS COUNT</div>
                    <div className="text-white font-bold mt-0.5">
                      {selectedVersion.content.projects.length} Projects
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-slate-850">
                    <div className="text-slate-500 text-[10px]">THEME ACCENT</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: selectedVersion.content.theme.cyanColor }}
                      />
                      <span className="text-white font-bold">
                        {selectedVersion.content.theme.cyanColor}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-slate-850">
                    <div className="text-slate-500 text-[10px]">ANIMATION PRESET</div>
                    <div className="text-white font-bold mt-0.5 uppercase">
                      {selectedVersion.content.animation.preset}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-span-7 p-12 text-center text-slate-500">
              Select a version snapshot to preview details.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
