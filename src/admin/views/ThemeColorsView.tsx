import React from 'react'
import type { PortfolioContent, ThemeColorsData } from '@/types/content.ts'
import { Palette, Check, AlertTriangle, RefreshCcw, Sparkles } from 'lucide-react'

interface ThemeColorsViewProps {
  content: PortfolioContent
  onChange: (updatedTheme: ThemeColorsData) => void
}

// Calculate relative luminance for WCAG contrast ratio
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '')
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255

  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  )
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const l1 = getLuminance(hex1)
    const l2 = getLuminance(hex2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  } catch {
    return 10
  }
}

const THEME_PRESETS: Record<string, { label: string; theme: Partial<ThemeColorsData> }> = {
  cinematicVoid: {
    label: 'Cinematic Void (Default)',
    theme: {
      voidColor: '#030507',
      deepColor: '#060A10',
      surfaceColor: '#090E16',
      elevatedColor: '#0E1622',
      cyanColor: '#00D9FF',
      blueColor: '#5577FF',
      violetColor: '#8175FF',
      textPrimary: '#F5F8FA',
      textSecondary: '#A8B4C2',
      glassBlur: 14,
      glassRadius: 24,
    },
  },
  deepCyber: {
    label: 'Deep Neon Cyber',
    theme: {
      voidColor: '#02070D',
      deepColor: '#040E1A',
      surfaceColor: '#07172A',
      elevatedColor: '#0A223D',
      cyanColor: '#00F0FF',
      blueColor: '#3B82F6',
      violetColor: '#8B5CF6',
      textPrimary: '#FFFFFF',
      textSecondary: '#93C5FD',
      glassBlur: 16,
      glassRadius: 20,
    },
  },
  midnightViolet: {
    label: 'Midnight Nebula',
    theme: {
      voidColor: '#06040A',
      deepColor: '#0D0814',
      surfaceColor: '#160E22',
      elevatedColor: '#201530',
      cyanColor: '#38BDF8',
      blueColor: '#6366F1',
      violetColor: '#A855F7',
      textPrimary: '#FAF5FF',
      textSecondary: '#D8B4FE',
      glassBlur: 18,
      glassRadius: 28,
    },
  },
  obsidianEmerald: {
    label: 'Obsidian Security',
    theme: {
      voidColor: '#030806',
      deepColor: '#06120D',
      surfaceColor: '#0A1E16',
      elevatedColor: '#0F2C20',
      cyanColor: '#10B981',
      blueColor: '#06B6D4',
      violetColor: '#3B82F6',
      textPrimary: '#F0FDF4',
      textSecondary: '#86EFAC',
      glassBlur: 12,
      glassRadius: 20,
    },
  },
}

export function ThemeColorsView({ content, onChange }: ThemeColorsViewProps) {
  const theme = content.theme

  const contrast = getContrastRatio(theme.textPrimary, theme.voidColor)
  const isAccessible = contrast >= 4.5

  const handleUpdate = (field: keyof ThemeColorsData, val: any) => {
    onChange({ ...theme, [field]: val })
  }

  const handleApplyPreset = (presetKey: string) => {
    const p = THEME_PRESETS[presetKey]
    if (p) {
      onChange({ ...theme, ...p.theme })
    }
  }

  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs text-slate-300">
      {/* Presets */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Palette className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase">Curated Theme Presets</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(THEME_PRESETS).map(([key, p]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleApplyPreset(key)}
              className="p-3 rounded-xl bg-black/40 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer"
            >
              <span className="font-bold text-white block mb-2">{p.label}</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: p.theme.voidColor }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: p.theme.cyanColor }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: p.theme.blueColor }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20"
                  style={{ backgroundColor: p.theme.violetColor }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* WCAG Contrast Validator */}
      <div
        className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
          isAccessible
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-950/20 border-amber-500/40 text-amber-300'
        }`}
      >
        <div className="flex items-center gap-3">
          {isAccessible ? (
            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          )}
          <div>
            <div className="font-bold">
              WCAG Text Contrast Ratio: {contrast.toFixed(1)}:1 ({isAccessible ? 'PASSED AA' : 'WARNING'})
            </div>
            <div className="text-[11px] opacity-80 mt-0.5">
              {isAccessible
                ? 'High readability achieved across primary headings and background void.'
                : 'Contrast ratio is below 4.5:1. Text may be hard to read against the dark void.'}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Palette Colors */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase pb-2 border-b border-slate-800">
          Color Hierarchy &amp; Brand Accents
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Page Void (#030507)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.voidColor}
                onChange={(e) => handleUpdate('voidColor', e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={theme.voidColor}
                onChange={(e) => handleUpdate('voidColor', e.target.value)}
                className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Deep Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.deepColor}
                onChange={(e) => handleUpdate('deepColor', e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={theme.deepColor}
                onChange={(e) => handleUpdate('deepColor', e.target.value)}
                className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Surface Layer</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.surfaceColor}
                onChange={(e) => handleUpdate('surfaceColor', e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={theme.surfaceColor}
                onChange={(e) => handleUpdate('surfaceColor', e.target.value)}
                className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Accent Electric Cyan</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.cyanColor}
                onChange={(e) => handleUpdate('cyanColor', e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={theme.cyanColor}
                onChange={(e) => handleUpdate('cyanColor', e.target.value)}
                className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-cyan-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Secondary Atmosphere Blue</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.blueColor}
                onChange={(e) => handleUpdate('blueColor', e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={theme.blueColor}
                onChange={(e) => handleUpdate('blueColor', e.target.value)}
                className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-blue-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Subtle Violet Accent</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.violetColor}
                onChange={(e) => handleUpdate('violetColor', e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={theme.violetColor}
                onChange={(e) => handleUpdate('violetColor', e.target.value)}
                className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-violet-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Primary Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.textPrimary}
                onChange={(e) => handleUpdate('textPrimary', e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={theme.textPrimary}
                onChange={(e) => handleUpdate('textPrimary', e.target.value)}
                className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-400 block mb-1">Secondary Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.textSecondary}
                onChange={(e) => handleUpdate('textSecondary', e.target.value)}
                className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
              />
              <input
                type="text"
                value={theme.textSecondary}
                onChange={(e) => handleUpdate('textSecondary', e.target.value)}
                className="flex-1 p-1.5 bg-black/50 border border-slate-700 rounded-lg text-slate-300 font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Liquid Glass Sliders */}
      <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase pb-2 border-b border-slate-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Liquid Glass Material Properties</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Backdrop Blur:</span>
              <span className="text-cyan-400 font-bold">{theme.glassBlur}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={36}
              step={1}
              value={theme.glassBlur}
              onChange={(e) => handleUpdate('glassBlur', parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-400">Glass Panel Radius:</span>
              <span className="text-cyan-400 font-bold">{theme.glassRadius}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={2}
              value={theme.glassRadius}
              onChange={(e) => handleUpdate('glassRadius', parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
