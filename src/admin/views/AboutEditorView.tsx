import React, { useState } from 'react'
import type { PortfolioContent, AboutSectionData, ImageCropConfig } from '@/types/content.ts'
import type { DeviceMode } from '../types.ts'
import { TypographyEditor } from '../components/TypographyEditor.tsx'
import { PhotoStudioModal } from '../components/PhotoStudioModal.tsx'
import { User, Camera, Plus, Trash2, Sliders } from 'lucide-react'

interface AboutEditorViewProps {
  content: PortfolioContent
  onChange: (updatedAbout: AboutSectionData) => void
  deviceMode: DeviceMode
}

export function AboutEditorView({ content, onChange, deviceMode }: AboutEditorViewProps) {
  const about = content.about
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState(false)

  const handleSaveCrop = (updatedCrop: ImageCropConfig, newImageUrl?: string) => {
    const updated = { ...about }
    updated.profileCard.photoCrop = updatedCrop
    if (newImageUrl) {
      updated.profileCard.photoPath = newImageUrl
    }
    onChange(updated)
  }

  const handleAddHighlight = () => {
    const nextId = `hl-${Date.now()}`
    onChange({
      ...about,
      experienceHighlights: [
        ...about.experienceHighlights,
        {
          id: nextId,
          title: 'New Achievement',
          subtitle: 'Assam / Systems',
          description: 'Description of key accomplishment.',
          metric: 'Top 1%',
        },
      ],
    })
  }

  const handleRemoveHighlight = (id: string) => {
    onChange({
      ...about,
      experienceHighlights: about.experienceHighlights.filter((h) => h.id !== id),
    })
  }

  const handleUpdateHighlight = (id: string, field: string, val: string) => {
    onChange({
      ...about,
      experienceHighlights: about.experienceHighlights.map((h) =>
        h.id === id ? { ...h, [field]: val } : h
      ),
    })
  }

  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs text-slate-300">
      {/* Profile Card & Avatar */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_20px_rgba(0,217,255,0.2)] flex-shrink-0">
            <img
              src={about.profileCard.photoPath}
              alt="About card avatar"
              className="w-full h-full object-cover"
              style={{
                objectPosition: `${about.profileCard.photoCrop.x}% ${about.profileCard.photoCrop.y}%`,
                transform: `scale(${about.profileCard.photoCrop.scale}) rotate(${about.profileCard.photoCrop.rotate}deg)`,
              }}
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">Profile Identity Card</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Role: {about.profileCard.role} • Status: {about.profileCard.status}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsPhotoStudioOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Edit About Portrait Crop</span>
        </button>
      </div>

      {/* Basic Section Headers */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase pb-2 border-b border-slate-800 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Section Header &amp; Location</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Section Title</label>
            <input
              type="text"
              value={about.title}
              onChange={(e) => onChange({ ...about, title: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Badge Tag</label>
            <input
              type="text"
              value={about.badge}
              onChange={(e) => onChange({ ...about, badge: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Positioning Summary</label>
            <input
              type="text"
              value={about.positioning}
              onChange={(e) => onChange({ ...about, positioning: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Location</label>
            <input
              type="text"
              value={about.location}
              onChange={(e) => onChange({ ...about, location: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>
        </div>
      </div>

      {/* Main Statement Typography */}
      <TypographyEditor
        label="About Primary Statement"
        value={about.statement}
        onChange={(statement) => onChange({ ...about, statement })}
        deviceMode={deviceMode}
        allowMultiline
      />

      {/* Sub Statement Typography */}
      <TypographyEditor
        label="About Secondary Narrative (Sub-Statement)"
        value={about.subStatement}
        onChange={(subStatement) => onChange({ ...about, subStatement })}
        deviceMode={deviceMode}
        allowMultiline
      />

      {/* Highlights List */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase">Experience Highlights</h3>
          <button
            type="button"
            onClick={handleAddHighlight}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Card</span>
          </button>
        </div>

        <div className="space-y-3">
          {about.experienceHighlights.map((hl) => (
            <div
              key={hl.id}
              className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3 relative group"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Title</label>
                  <input
                    type="text"
                    value={hl.title}
                    onChange={(e) => handleUpdateHighlight(hl.id, 'title', e.target.value)}
                    className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={hl.subtitle}
                    onChange={(e) => handleUpdateHighlight(hl.id, 'subtitle', e.target.value)}
                    className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Key Metric</label>
                  <input
                    type="text"
                    value={hl.metric || ''}
                    onChange={(e) => handleUpdateHighlight(hl.id, 'metric', e.target.value)}
                    className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={hl.description}
                  onChange={(e) => handleUpdateHighlight(hl.id, 'description', e.target.value)}
                  className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveHighlight(hl.id)}
                className="text-red-400 hover:text-red-300 text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Highlight</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Studio Modal */}
      <PhotoStudioModal
        isOpen={isPhotoStudioOpen}
        onClose={() => setIsPhotoStudioOpen(false)}
        imageSrc={about.profileCard.photoPath}
        currentCrop={about.profileCard.photoCrop}
        onSaveCrop={handleSaveCrop}
        title="About Identity Portrait Crop"
      />
    </div>
  )
}
