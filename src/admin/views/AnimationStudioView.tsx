import React from 'react'
import type { PortfolioContent, AnimationSettingsData } from '@/types/content.ts'
import { Box, Sparkles, Sliders, Zap, Check, Eye } from 'lucide-react'

interface AnimationStudioViewProps {
  content: PortfolioContent
  onChange: (updatedAnimation: AnimationSettingsData) => void
}

const PRESETS: Record<
  AnimationSettingsData['preset'],
  { label: string; desc: string; values: Partial<AnimationSettingsData> }
> = {
  cinematic: {
    label: 'Cinematic (Default)',
    desc: 'Full cinematic 3D fidelity, volumetric particle field, deep atmospheric fog and dynamic camera.',
    values: {
      enableCinematic3D: true,
      animationIntensity: 1.0,
      cameraMovementIntensity: 1.0,
      particleDensity: 4000,
      particleSpeed: 1.0,
      atmosphericFog: 0.75,
      glowIntensity: 1.0,
      liquidGlassIntensity: 1.0,
      preset: 'cinematic',
    },
  },
  balanced: {
    label: 'Balanced Smooth',
    desc: 'Optimized particle count with preserved camera curves. Ideal for mid-range laptops and tablets.',
    values: {
      enableCinematic3D: true,
      animationIntensity: 0.85,
      cameraMovementIntensity: 0.8,
      particleDensity: 2400,
      particleSpeed: 0.85,
      atmosphericFog: 0.6,
      glowIntensity: 0.8,
      liquidGlassIntensity: 0.85,
      preset: 'balanced',
    },
  },
  minimal: {
    label: 'Minimal Clean',
    desc: 'Subtle motion, reduced particles, low bloom. Focuses directly on crisp text typography.',
    values: {
      enableCinematic3D: true,
      animationIntensity: 0.5,
      cameraMovementIntensity: 0.4,
      particleDensity: 1200,
      particleSpeed: 0.5,
      atmosphericFog: 0.4,
      glowIntensity: 0.5,
      liquidGlassIntensity: 0.6,
      preset: 'minimal',
    },
  },
  performance: {
    label: 'Maximum Performance',
    desc: 'Zero heavy particle compute, static 3D camera, maximum battery life and frame rate.',
    values: {
      enableCinematic3D: false,
      animationIntensity: 0.3,
      cameraMovementIntensity: 0.1,
      particleDensity: 500,
      particleSpeed: 0.3,
      atmosphericFog: 0.2,
      glowIntensity: 0.4,
      liquidGlassIntensity: 0.4,
      preset: 'performance',
    },
  },
}

export function AnimationStudioView({ content, onChange }: AnimationStudioViewProps) {
  const anim = content.animation

  const handleApplyPreset = (key: AnimationSettingsData['preset']) => {
    const presetData = PRESETS[key]
    onChange({
      ...anim,
      ...presetData.values,
    })
  }

  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs text-slate-300">
      {/* Presets Grid */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Zap className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase">Experience Presets</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(PRESETS) as AnimationSettingsData['preset'][]).map((key) => {
            const p = PRESETS[key]
            const isSelected = anim.preset === key

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleApplyPreset(key)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(0,217,255,0.2)]'
                    : 'bg-black/40 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-xs">{p.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <p className="text-[10px] text-slate-400 leading-snug">{p.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Global 3D Master Switch */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Box className="w-4 h-4 text-cyan-400" />
            <span>Enable Unified 3D WebGL Canvas</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Persistent Three.js world behind portfolio layers with adaptive frame rate.
          </p>
        </div>
        <input
          type="checkbox"
          checked={anim.enableCinematic3D}
          onChange={(e) => onChange({ ...anim, enableCinematic3D: e.target.checked })}
          className="w-5 h-5 accent-cyan-400 rounded cursor-pointer"
        />
      </div>

      {/* Real Animation Parameter Sliders */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase">Atmospheric &amp; Motion Sliders</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Particle Density */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Particle Density (Dust Count)</span>
              <span className="text-cyan-400 font-bold">{anim.particleDensity}</span>
            </div>
            <input
              type="range"
              min={500}
              max={10000}
              step={200}
              value={anim.particleDensity}
              onChange={(e) =>
                onChange({ ...anim, particleDensity: parseInt(e.target.value, 10) })
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Particle Speed */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Particle Float Speed</span>
              <span className="text-cyan-400 font-bold">{anim.particleSpeed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={2.0}
              step={0.05}
              value={anim.particleSpeed}
              onChange={(e) =>
                onChange({ ...anim, particleSpeed: parseFloat(e.target.value) })
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Camera Movement Intensity */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Camera Parallax Movement</span>
              <span className="text-cyan-400 font-bold">
                {anim.cameraMovementIntensity.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={2.0}
              step={0.05}
              value={anim.cameraMovementIntensity}
              onChange={(e) =>
                onChange({ ...anim, cameraMovementIntensity: parseFloat(e.target.value) })
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Atmospheric Fog */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Atmospheric Fog Depth</span>
              <span className="text-cyan-400 font-bold">
                {Math.round(anim.atmosphericFog * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={anim.atmosphericFog}
              onChange={(e) =>
                onChange({ ...anim, atmosphericFog: parseFloat(e.target.value) })
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Liquid Glass Intensity */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Liquid Glass Sheen Intensity</span>
              <span className="text-cyan-400 font-bold">
                {anim.liquidGlassIntensity.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={2.0}
              step={0.05}
              value={anim.liquidGlassIntensity}
              onChange={(e) =>
                onChange({ ...anim, liquidGlassIntensity: parseFloat(e.target.value) })
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Glow & Lighting Intensity */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Cyan Cyber Glow Intensity</span>
              <span className="text-cyan-400 font-bold">{anim.glowIntensity.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={2.0}
              step={0.05}
              value={anim.glowIntensity}
              onChange={(e) =>
                onChange({ ...anim, glowIntensity: parseFloat(e.target.value) })
              }
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
