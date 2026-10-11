import React, { useState } from 'react'
import type { PortfolioContent, HeroSectionData, ImageCropConfig } from '@/types/content.ts'
import type { DeviceMode } from '../types.ts'
import { TypographyEditor } from '../components/TypographyEditor.tsx'
import { PhotoStudioModal } from '../components/PhotoStudioModal.tsx'
import {
  Sparkles,
  Camera,
  Layers,
  Sliders,
  ExternalLink,
  Check,
  Box,
} from 'lucide-react'

interface HeroEditorViewProps {
  content: PortfolioContent
  onChange: (updatedHero: HeroSectionData) => void
  deviceMode: DeviceMode
}

export function HeroEditorView({ content, onChange, deviceMode }: HeroEditorViewProps) {
  const hero = content.hero
  const [isPhotoStudioOpen, setIsPhotoStudioOpen] = useState(false)
  const [activeCropDevice, setActiveCropDevice] = useState<DeviceMode>(deviceMode)

  const currentCrop: ImageCropConfig =
    activeCropDevice === 'mobile'
      ? hero.profilePhoto.mobileCrop
      : activeCropDevice === 'tablet'
      ? hero.profilePhoto.tabletCrop
      : hero.profilePhoto.desktopCrop

  const handleSaveCrop = (updatedCrop: ImageCropConfig, newImageUrl?: string) => {
    const updated = { ...hero }
    if (activeCropDevice === 'mobile') {
      updated.profilePhoto.mobileCrop = updatedCrop
    } else if (activeCropDevice === 'tablet') {
      updated.profilePhoto.tabletCrop = updatedCrop
    } else {
      updated.profilePhoto.desktopCrop = updatedCrop
    }

    if (newImageUrl) {
      updated.profilePhoto.path = newImageUrl
    }
    onChange(updated)
  }

  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs text-slate-300">
      {/* Photo Studio Trigger Card */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_20px_rgba(0,217,255,0.2)] flex-shrink-0">
            <img
              src={hero.profilePhoto.path}
              alt="Profile avatar"
              className="w-full h-full object-cover"
              style={{
                objectPosition: `${currentCrop.x}% ${currentCrop.y}%`,
                transform: `scale(${currentCrop.scale}) rotate(${currentCrop.rotate}deg)`,
              }}
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">Profile Photograph</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Crop preset: {currentCrop.aspectRatio} • Zoom: {currentCrop.scale}x • Position: ({currentCrop.x}%, {currentCrop.y}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={activeCropDevice}
            onChange={(e) => setActiveCropDevice(e.target.value as DeviceMode)}
            className="p-2 bg-black/50 border border-slate-700 rounded-xl text-white text-xs"
          >
            <option value="desktop">Desktop Crop</option>
            <option value="tablet">Tablet Crop</option>
            <option value="mobile">Mobile Crop</option>
          </select>
          <button
            type="button"
            onClick={() => setIsPhotoStudioOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Open Photo Studio</span>
          </button>
        </div>
      </div>

      {/* Basic Hero Text Elements */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase pb-2 border-b border-slate-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Identity &amp; Role Identity</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Full Name</label>
            <input
              type="text"
              value={hero.name.full}
              onChange={(e) =>
                onChange({
                  ...hero,
                  name: {
                    ...hero.name,
                    full: e.target.value,
                    display: [e.target.value.split(' ')[0] || '', e.target.value.split(' ').slice(1).join(' ') || ''],
                  },
                })
              }
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Professional Title</label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => onChange({ ...hero, title: e.target.value })}
              className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Role Badge / Location Line</label>
          <input
            type="text"
            value={hero.roleBadge}
            onChange={(e) => onChange({ ...hero, roleBadge: e.target.value })}
            className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
          />
        </div>

        {/* Availability Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Availability Status</label>
            <input
              type="text"
              value={hero.availability.status}
              onChange={(e) =>
                onChange({
                  ...hero,
                  availability: { ...hero.availability, status: e.target.value },
                })
              }
              className="w-full p-2 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] text-slate-400 block mb-1">Availability Text</label>
            <input
              type="text"
              value={hero.availability.text}
              onChange={(e) =>
                onChange({
                  ...hero,
                  availability: { ...hero.availability, text: e.target.value },
                })
              }
              className="w-full p-2 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>
        </div>
      </div>

      {/* Main Heading Typography */}
      <TypographyEditor
        label="Hero Canonical Heading"
        value={hero.mainHeading}
        onChange={(mainHeading) => onChange({ ...hero, mainHeading })}
        deviceMode={deviceMode}
        allowMultiline
      />

      {/* Editorial Description Typography */}
      <TypographyEditor
        label="Hero Positioning Statement (Description)"
        value={hero.description}
        onChange={(description) => onChange({ ...hero, description })}
        deviceMode={deviceMode}
        allowMultiline
      />

      {/* Call to Action Buttons */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase pb-2 border-b border-slate-800">
          Call-to-Action Buttons
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-black/40 border border-slate-850 rounded-xl space-y-2">
            <span className="text-cyan-400 text-[11px] font-bold uppercase">Primary CTA</span>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Button Label</label>
              <input
                type="text"
                value={hero.ctaPrimary.label}
                onChange={(e) =>
                  onChange({
                    ...hero,
                    ctaPrimary: { ...hero.ctaPrimary, label: e.target.value },
                  })
                }
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Destination Link</label>
              <input
                type="text"
                value={hero.ctaPrimary.link}
                onChange={(e) =>
                  onChange({
                    ...hero,
                    ctaPrimary: { ...hero.ctaPrimary, link: e.target.value },
                  })
                }
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          <div className="p-3 bg-black/40 border border-slate-850 rounded-xl space-y-2">
            <span className="text-blue-400 text-[11px] font-bold uppercase">Secondary CTA</span>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Button Label</label>
              <input
                type="text"
                value={hero.ctaSecondary.label}
                onChange={(e) =>
                  onChange({
                    ...hero,
                    ctaSecondary: { ...hero.ctaSecondary, label: e.target.value },
                  })
                }
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-1">Destination Link</label>
              <input
                type="text"
                value={hero.ctaSecondary.link}
                onChange={(e) =>
                  onChange({
                    ...hero,
                    ctaSecondary: { ...hero.ctaSecondary, link: e.target.value },
                  })
                }
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout & 3D Environment Controls */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase pb-2 border-b border-slate-800 flex items-center gap-2">
          <Box className="w-4 h-4 text-cyan-400" />
          <span>Hero Layout &amp; Atmosphere</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Hero Section Height</label>
            <input
              type="text"
              value={hero.heroHeight}
              onChange={(e) => onChange({ ...hero, heroHeight: e.target.value })}
              className="w-full p-2 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Content Max Width</label>
            <input
              type="text"
              value={hero.contentWidth}
              onChange={(e) => onChange({ ...hero, contentWidth: e.target.value })}
              className="w-full p-2 bg-black/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Column Proportions</label>
            <select
              value={hero.columnProportions}
              onChange={(e) => onChange({ ...hero, columnProportions: e.target.value })}
              className="w-full p-2 bg-black/50 border border-slate-700 rounded-xl text-white"
            >
              <option value="50/50">50% Left / 50% Right</option>
              <option value="60/40">60% Left / 40% Right</option>
              <option value="70/30">70% Left / 30% Right</option>
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="show3DVisual"
              checked={hero.show3DVisual}
              onChange={(e) => onChange({ ...hero, show3DVisual: e.target.checked })}
              className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
            />
            <label htmlFor="show3DVisual" className="text-white cursor-pointer">
              Enable 3D Cinematic Core Visualization in Hero
            </label>
          </div>

          <div className="w-full sm:w-64">
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Atmosphere Fog:</span>
              <span className="text-cyan-400 font-bold">
                {Math.round(hero.bgAtmosphereIntensity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={hero.bgAtmosphereIntensity}
              onChange={(e) =>
                onChange({ ...hero, bgAtmosphereIntensity: parseFloat(e.target.value) })
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Photo Studio Modal */}
      <PhotoStudioModal
        isOpen={isPhotoStudioOpen}
        onClose={() => setIsPhotoStudioOpen(false)}
        imageSrc={hero.profilePhoto.path}
        currentCrop={currentCrop}
        onSaveCrop={handleSaveCrop}
        title={`Hero Portrait Crop (${activeCropDevice})`}
      />
    </div>
  )
}
