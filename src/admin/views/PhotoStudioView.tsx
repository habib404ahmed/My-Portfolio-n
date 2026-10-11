import React, { useState, useRef, useEffect } from 'react'
import type { PortfolioContent, ImageCropConfig } from '@/types/content.ts'
import type { DeviceMode } from '../types.ts'
import { apiFetch } from '../utils/api.ts'
import {
  Camera,
  Upload,
  ZoomIn,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
  User,
  Compass,
  FileText,
  Monitor,
  Smartphone,
  Eye,
  AlertCircle,
  Loader2,
} from 'lucide-react'

interface PhotoStudioViewProps {
  content: PortfolioContent
  deviceMode: DeviceMode
  onChange: (updatedContent: PortfolioContent) => void
}

type PhotoPlacement = 'hero' | 'navbar' | 'about' | 'resume'

const ASPECT_RATIOS: Array<{ label: string; ratio: number | null }> = [
  { label: '1:1', ratio: 1 },
  { label: '3:4', ratio: 3 / 4 },
  { label: '4:3', ratio: 4 / 3 },
  { label: '4:5', ratio: 4 / 5 },
  { label: '16:9', ratio: 16 / 9 },
  { label: 'Free', ratio: null },
]

export function PhotoStudioView({ content, deviceMode, onChange }: PhotoStudioViewProps) {
  const [placement, setPlacement] = useState<PhotoPlacement>('hero')

  // Get source image and crop based on selected placement
  const getPlacementData = (p: PhotoPlacement): { src: string; crop: ImageCropConfig } => {
    switch (p) {
      case 'hero':
        return {
          src: content.hero.profilePhoto?.path || '',
          crop: { ...content.hero.profilePhoto?.desktopCrop },
        }
      case 'about':
        return {
          src: content.about.profileCard?.photoPath || '',
          crop: { ...content.about.profileCard?.photoCrop },
        }
      case 'navbar':
        return {
          src: content.navigation?.profileImage || '',
          crop: { ...content.navigation?.profileCrop },
        }
      case 'resume':
        return {
          src: content.hero.profilePhoto?.path || '',
          crop: { ...content.hero.profilePhoto?.desktopCrop },
        }
    }
  }

  const initial = getPlacementData(placement)
  const [imageSrc, setImageSrc] = useState(initial.src)
  const [crop, setCrop] = useState<ImageCropConfig>(initial.crop)
  const [activeAspect, setActiveAspect] = useState<number | null>(3 / 4)
  const [isBeforeAfter, setIsBeforeAfter] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [isUploading, setIsUploading] = useState(false)
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null)

  // Sync state when placement changes
  useEffect(() => {
    const data = getPlacementData(placement)
    setImageSrc(data.src)
    setCrop({ ...data.crop })
    setSaveSuccessMessage(null)
  }, [placement])

  // Dragging to reposition state
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number }>({
    x: 0,
    y: 0,
    posX: 50,
    posY: 50,
  })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: crop.x ?? 50,
      posY: crop.y ?? 50,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    const newX = Math.max(0, Math.min(100, dragStartRef.current.posX - dx * 0.15))
    const newY = Math.max(0, Math.min(100, dragStartRef.current.posY - dy * 0.15))
    setCrop((prev) => ({
      ...prev,
      x: Math.round(newX),
      y: Math.round(newY),
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Upload image handler
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
        setImageSrc(data.url)
        setSaveSuccessMessage('Image uploaded! Click "Apply & Save Crop" to persist.')
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message)
    } finally {
      setIsUploading(false)
    }
  }

  // Apply crop to Content
  const handleApplyCrop = () => {
    let nextContent = { ...content }
    if (placement === 'hero') {
      nextContent = {
        ...nextContent,
        hero: {
          ...nextContent.hero,
          profilePhoto: {
            ...nextContent.hero.profilePhoto,
            path: imageSrc,
            desktopCrop: { ...crop },
          },
        },
      }
    } else if (placement === 'about') {
      nextContent = {
        ...nextContent,
        about: {
          ...nextContent.about,
          profileCard: {
            ...nextContent.about.profileCard,
            photoPath: imageSrc,
            photoCrop: { ...crop },
          },
        },
      }
    } else if (placement === 'navbar') {
      nextContent = {
        ...nextContent,
        navigation: {
          ...nextContent.navigation,
          profileImage: imageSrc,
          profileCrop: { ...crop },
        },
      }
    } else if (placement === 'resume') {
      nextContent = {
        ...nextContent,
        hero: {
          ...nextContent.hero,
          profilePhoto: {
            ...nextContent.hero.profilePhoto,
            path: imageSrc,
            desktopCrop: { ...crop },
          },
        },
      }
    }

    onChange(nextContent)
    setSaveSuccessMessage('Crop and image placement successfully applied to draft!')
    setTimeout(() => setSaveSuccessMessage(null), 3000)
  }

  const handleResetCrop = () => {
    setCrop({
      objectFit: 'cover',
      x: 50,
      y: 50,
      scale: 1,
      rotate: 0,
      flipH: false,
      flipV: false,
      aspectRatio: '3:4',
      borderRadius: 24,
      shadowIntensity: 0.3,
      opacity: 1,
    })
  }

  return (
    <div className="h-full flex flex-col font-sans text-xs text-[#A8B4C2] space-y-4">
      {/* Placement Selection Bar */}
      <div className="p-3.5 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs font-bold text-[#F5F8FA] uppercase">
            Photo Studio &amp; Placement Manager
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-[#8491A2] mr-1 hidden sm:inline">
            Placement:
          </span>
          <button
            type="button"
            onClick={() => setPlacement('hero')}
            className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              placement === 'hero'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'bg-black/30 border-[rgba(255,255,255,0.07)] text-[#A8B4C2] hover:text-[#F5F8FA]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Hero Portrait</span>
          </button>
          <button
            type="button"
            onClick={() => setPlacement('about')}
            className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              placement === 'about'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'bg-black/30 border-[rgba(255,255,255,0.07)] text-[#A8B4C2] hover:text-[#F5F8FA]'
            }`}
          >
            <User className="w-3 h-3 text-cyan-400" />
            <span>About Profile</span>
          </button>
          <button
            type="button"
            onClick={() => setPlacement('navbar')}
            className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              placement === 'navbar'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                : 'bg-black/30 border-[rgba(255,255,255,0.07)] text-[#A8B4C2] hover:text-[#F5F8FA]'
            }`}
          >
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>Navbar Avatar</span>
          </button>
        </div>
      </div>

      {saveSuccessMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Main 3-Column Studio Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        {/* Left Column: Media Upload & Presets (3 cols) */}
        <div className="lg:col-span-3 space-y-3.5 overflow-y-auto custom-scrollbar">
          {/* Upload Card */}
          <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#F5F8FA] uppercase">Source Asset</h4>
            <div className="p-2.5 rounded-lg bg-black/40 border border-[rgba(255,255,255,0.07)] flex items-center gap-3">
              <img
                src={imageSrc}
                alt="Original source"
                className="w-12 h-12 object-cover rounded-md border border-white/10"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-mono text-[#F5F8FA] truncate">
                  {imageSrc.split('/').pop()}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">Original Asset Safe</div>
              </div>
            </div>

            <label className="w-full py-2.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-[rgba(255,255,255,0.12)] text-xs font-mono text-[#F5F8FA] flex items-center justify-center gap-2 transition-colors cursor-pointer block text-center">
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload Replacement</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>

          {/* Aspect Ratio Presets */}
          <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#F5F8FA] uppercase">
              Aspect Ratio Presets
            </h4>
            <div className="grid grid-cols-3 gap-1.5">
              {ASPECT_RATIOS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveAspect(item.ratio)}
                  className={`py-1.5 px-2 rounded-lg font-mono text-xs text-center border transition-all cursor-pointer ${
                    activeAspect === item.ratio
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                      : 'bg-black/30 border-[rgba(255,255,255,0.07)] text-[#A8B4C2] hover:text-[#F5F8FA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-2">
            <button
              type="button"
              onClick={handleApplyCrop}
              className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,217,255,0.2)] cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply &amp; Save Crop</span>
            </button>
            <button
              type="button"
              onClick={handleResetCrop}
              className="w-full py-2 px-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-[rgba(255,255,255,0.08)] text-xs font-mono text-[#8491A2] hover:text-[#F5F8FA] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </div>

        {/* Center Column: Large Interactive Crop Canvas (6 cols) */}
        <div className="lg:col-span-6 flex flex-col rounded-xl bg-[#0A0D12] border border-[rgba(255,255,255,0.09)] overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="h-10 px-3 border-b border-[rgba(255,255,255,0.07)] flex items-center justify-between text-xs font-mono bg-[#10151D]">
            <div className="flex items-center gap-2">
              <span className="text-[#F5F8FA] font-bold">Interactive Crop Canvas</span>
              <span className="text-[10px] text-cyan-400">• Drag to Reposition</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Device Preview Toggle */}
              <button
                type="button"
                onClick={() => setPreviewDevice((d) => (d === 'desktop' ? 'mobile' : 'desktop'))}
                title="Switch Preview Viewport"
                className="px-2 py-0.5 rounded bg-white/[0.04] text-[#A8B4C2] hover:text-[#F5F8FA] flex items-center gap-1 cursor-pointer"
              >
                {previewDevice === 'desktop' ? (
                  <Monitor className="w-3 h-3 text-cyan-400" />
                ) : (
                  <Smartphone className="w-3 h-3 text-cyan-400" />
                )}
                <span className="text-[10px] capitalize">{previewDevice}</span>
              </button>

              {/* Before/After Toggle */}
              <button
                type="button"
                onClick={() => setIsBeforeAfter((b) => !b)}
                title="Compare with original uncropped image"
                className={`px-2 py-0.5 rounded text-[10px] cursor-pointer ${
                  isBeforeAfter
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                    : 'bg-white/[0.04] text-[#A8B4C2] hover:text-[#F5F8FA]'
                }`}
              >
                {isBeforeAfter ? 'Original Asset' : 'Cropped Preview'}
              </button>
            </div>
          </div>

          {/* Interactive Canvas */}
          <div
            className="flex-1 flex items-center justify-center p-6 bg-[#07090D] overflow-hidden relative select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Viewport Box */}
            <div
              className={`relative overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all cursor-move ${
                previewDevice === 'mobile' ? 'max-w-[260px]' : 'max-w-[360px]'
              }`}
              style={{
                width: '100%',
                aspectRatio: isBeforeAfter ? 'auto' : activeAspect ? `${activeAspect}` : '3/4',
                maxHeight: '440px',
                borderRadius: crop.borderRadius || '20px',
              }}
              onMouseDown={handleMouseDown}
            >
              <img
                src={imageSrc}
                alt="Crop preview"
                className="w-full h-full pointer-events-none select-none transition-transform duration-75"
                style={{
                  objectFit: isBeforeAfter ? 'contain' : crop.objectFit || 'cover',
                  objectPosition: isBeforeAfter
                    ? 'center'
                    : `${crop.x ?? 50}% ${crop.y ?? 50}%`,
                  transform: isBeforeAfter
                    ? 'none'
                    : `scale(${crop.scale ?? 1}) rotate(${crop.rotate ?? 0}deg) scaleX(${
                        crop.flipH ? -1 : 1
                      }) scaleY(${crop.flipV ? -1 : 1})`,
                }}
              />

              {/* Overlay Crosshair Grid when dragging */}
              {isDragging && (
                <div className="absolute inset-0 border border-cyan-400/30 pointer-events-none grid grid-cols-3 grid-rows-3">
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
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Properties & Transformations (3 cols) */}
        <div className="lg:col-span-3 space-y-3.5 overflow-y-auto custom-scrollbar">
          {/* Zoom Slider */}
          <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#F5F8FA] font-bold">Zoom Scale</span>
              <span className="text-cyan-300 font-semibold">{crop.scale?.toFixed(2) ?? '1.00'}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={crop.scale ?? 1}
              onChange={(e) =>
                setCrop((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Rotation Dial */}
          <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#F5F8FA] font-bold">Rotation</span>
              <span className="text-cyan-300 font-semibold">{crop.rotate ?? 0}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="5"
              value={crop.rotate ?? 0}
              onChange={(e) =>
                setCrop((prev) => ({ ...prev, rotate: parseInt(e.target.value) }))
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Position Coordinates */}
          <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-[#F5F8FA] uppercase">Position Center</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono text-[#8491A2] block mb-1">X Axis (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={crop.x ?? 50}
                  onChange={(e) =>
                    setCrop((prev) => ({ ...prev, x: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full p-1.5 rounded bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-[#F5F8FA] font-mono text-center"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[#8491A2] block mb-1">Y Axis (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={crop.y ?? 50}
                  onChange={(e) =>
                    setCrop((prev) => ({ ...prev, y: parseInt(e.target.value) || 0 }))
                  }
                  className="w-full p-1.5 rounded bg-black/40 border border-[rgba(255,255,255,0.09)] text-xs text-[#F5F8FA] font-mono text-center"
                />
              </div>
            </div>
          </div>

          {/* Orientation Flips */}
          <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-2">
            <h4 className="text-xs font-mono font-bold text-[#F5F8FA] uppercase">Flip Axes</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setCrop((prev) => ({ ...prev, flipH: !prev.flipH }))
                }
                className={`py-1.5 px-2 rounded-lg font-mono text-xs border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  crop.flipH
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-black/30 border-[rgba(255,255,255,0.07)] text-[#A8B4C2] hover:text-[#F5F8FA]'
                }`}
              >
                <FlipHorizontal className="w-3.5 h-3.5" />
                <span>Flip H</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setCrop((prev) => ({ ...prev, flipV: !prev.flipV }))
                }
                className={`py-1.5 px-2 rounded-lg font-mono text-xs border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  crop.flipV
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-black/30 border-[rgba(255,255,255,0.07)] text-[#A8B4C2] hover:text-[#F5F8FA]'
                }`}
              >
                <FlipVertical className="w-3.5 h-3.5" />
                <span>Flip V</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
