import React, { useState, useRef, useEffect } from 'react'
import type { ImageCropConfig } from '@/types/content.ts'
import type { DeviceMode } from '../types.ts'
import {
  Upload,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  ZoomIn,
  Crop,
  Check,
  X,
  RefreshCcw,
  Sliders,
  Image as ImageIcon,
} from 'lucide-react'
import { apiFetch } from '../utils/api.ts'

interface PhotoStudioModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  currentCrop: ImageCropConfig
  onSaveCrop: (updatedCrop: ImageCropConfig, newImageUrl?: string) => void
  title?: string
}

const ASPECT_RATIOS: Array<{ label: string; value: string; ratio: number | null }> = [
  { label: '1:1 Square', value: '1:1', ratio: 1 },
  { label: '3:4 Portrait', value: '3:4', ratio: 3 / 4 },
  { label: '4:5 Social', value: '4:5', ratio: 4 / 5 },
  { label: '4:3 Standard', value: '4:3', ratio: 4 / 3 },
  { label: '16:9 Cinematic', value: '16:9', ratio: 16 / 9 },
  { label: 'Free Crop', value: 'free', ratio: null },
]

export function PhotoStudioModal({
  isOpen,
  onClose,
  imageSrc,
  currentCrop,
  onSaveCrop,
  title = 'Photo Studio — Crop & Position',
}: PhotoStudioModalProps) {
  const [crop, setCrop] = useState<ImageCropConfig>({ ...currentCrop })
  const [imagePath, setImagePath] = useState(imageSrc)
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState<'crop' | 'styling'>('crop')

  // Dragging state
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0, cropX: 50, cropY: 50 })

  useEffect(() => {
    setCrop({ ...currentCrop })
    setImagePath(imageSrc)
  }, [currentCrop, imageSrc, isOpen])

  if (!isOpen) return null

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      cropX: crop.x,
      cropY: crop.y,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y

    // Scale sensitivity
    const nextX = Math.min(100, Math.max(0, dragStart.current.cropX + dx * 0.2))
    const nextY = Math.min(100, Math.max(0, dragStart.current.cropY + dy * 0.2))

    setCrop((prev) => ({ ...prev, x: Math.round(nextX), y: Math.round(nextY) }))
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

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
        setImagePath(data.url)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleReset = () => {
    setCrop({
      x: 50,
      y: 50,
      scale: 1,
      rotate: 0,
      flipH: false,
      flipV: false,
      aspectRatio: '1:1',
      objectFit: 'cover',
      borderRadius: 24,
      shadowIntensity: 0.4,
      opacity: 1,
    })
  }

  const handleApply = () => {
    onSaveCrop(crop, imagePath !== imageSrc ? imagePath : undefined)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none font-mono text-slate-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#060A10] border border-slate-700/80 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Crop className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
          {/* Left / Center: Interactive Preview Canvas (col-span-7) */}
          <div className="md:col-span-7 flex flex-col items-center justify-center bg-black/60 border border-slate-800 rounded-xl p-4 min-h-[360px] relative overflow-hidden">
            {/* Visual Crop Box Container */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative overflow-hidden cursor-grab active:cursor-grabbing border-2 border-cyan-500/80 shadow-[0_0_24px_rgba(0,217,255,0.25)] flex items-center justify-center"
              style={{
                width:
                  crop.aspectRatio === '16:9'
                    ? '320px'
                    : crop.aspectRatio === '3:4'
                    ? '240px'
                    : crop.aspectRatio === '4:5'
                    ? '240px'
                    : '280px',
                height:
                  crop.aspectRatio === '16:9'
                    ? '180px'
                    : crop.aspectRatio === '3:4'
                    ? '320px'
                    : crop.aspectRatio === '4:5'
                    ? '300px'
                    : '280px',
                borderRadius: `${crop.borderRadius}px`,
                opacity: crop.opacity,
                boxShadow: `0 20px 40px rgba(0, 0, 0, ${crop.shadowIntensity})`,
              }}
            >
              <img
                src={imagePath}
                alt="Crop preview"
                className="w-full h-full pointer-events-none select-none transition-transform duration-75"
                style={{
                  objectFit: crop.objectFit,
                  objectPosition: `${crop.x}% ${crop.y}%`,
                  transform: `scale(${crop.scale}) rotate(${crop.rotate}deg) scaleX(${
                    crop.flipH ? -1 : 1
                  }) scaleY(${crop.flipV ? -1 : 1})`,
                }}
              />

              {/* Composition Grid Lines Overlay */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-cyan-400/20">
                <div className="border-r border-b border-cyan-400/20" />
                <div className="border-r border-b border-cyan-400/20" />
                <div className="border-b border-cyan-400/20" />
                <div className="border-r border-b border-cyan-400/20" />
                <div className="border-r border-b border-cyan-400/20" />
                <div className="border-b border-cyan-400/20" />
                <div className="border-r border-cyan-400/20" />
                <div className="border-r border-cyan-400/20" />
                <div />
              </div>
            </div>

            <div className="text-[11px] text-slate-400 mt-4 flex items-center gap-2">
              <span>Drag inside image to adjust focus point ({crop.x}%, {crop.y}%)</span>
            </div>
          </div>

          {/* Right: Controls Panel (col-span-5) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            {/* Upload Replacement Image */}
            <div className="p-3 bg-white/[0.02] border border-slate-800 rounded-xl">
              <label className="text-[11px] text-slate-400 uppercase block mb-2">
                Replace Source Image
              </label>
              <label className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-white cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isUploading ? 'Uploading...' : 'Upload New Image'}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Presets Selection */}
            <div>
              <label className="text-[11px] text-slate-400 uppercase block mb-1.5">
                Aspect Ratio Preset
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {ASPECT_RATIOS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setCrop({ ...crop, aspectRatio: preset.value })}
                    className={`py-1.5 px-2 rounded-lg text-[10px] text-center uppercase font-bold transition-all ${
                      crop.aspectRatio === preset.value
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-black/40 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                  >
                    {preset.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Zoom Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">Zoom / Scale</span>
                <span className="text-cyan-400 font-bold">{crop.scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.05}
                value={crop.scale}
                onChange={(e) => setCrop({ ...crop, scale: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Rotate Slider & Quick Flips */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">Rotation</span>
                <span className="text-cyan-400 font-bold">{crop.rotate}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={1}
                value={crop.rotate}
                onChange={(e) => setCrop({ ...crop, rotate: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setCrop({ ...crop, rotate: (crop.rotate + 90) % 360 })}
                  className="flex-1 py-1 px-2 rounded-lg bg-black/40 border border-slate-800 text-[11px] text-slate-300 hover:text-white flex items-center justify-center gap-1.5"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>+90°</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCrop({ ...crop, flipH: !crop.flipH })}
                  className={`flex-1 py-1 px-2 rounded-lg border text-[11px] flex items-center justify-center gap-1.5 ${
                    crop.flipH
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-black/40 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  <FlipHorizontal className="w-3 h-3" />
                  <span>Flip H</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCrop({ ...crop, flipV: !crop.flipV })}
                  className={`flex-1 py-1 px-2 rounded-lg border text-[11px] flex items-center justify-center gap-1.5 ${
                    crop.flipV
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-black/40 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  <FlipVertical className="w-3 h-3" />
                  <span>Flip V</span>
                </button>
              </div>
            </div>

            {/* Styling Properties: Border Radius, Object Fit, Shadow */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400">Border Radius</span>
                  <span className="text-cyan-400 font-bold">{crop.borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={140}
                  step={2}
                  value={crop.borderRadius}
                  onChange={(e) => setCrop({ ...crop, borderRadius: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Object Fit</label>
                  <select
                    value={crop.objectFit}
                    onChange={(e) => setCrop({ ...crop, objectFit: e.target.value as any })}
                    className="w-full p-1.5 bg-black/50 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    <option value="cover">Cover (Fill &amp; Clip)</option>
                    <option value="contain">Contain (Fit inside)</option>
                    <option value="fill">Fill (Stretch)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Shadow Intensity</label>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={crop.shadowIntensity}
                    onChange={(e) => setCrop({ ...crop, shadowIntensity: parseFloat(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-black/40 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-slate-800 hover:border-slate-700 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset Crop</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply &amp; Save Crop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
