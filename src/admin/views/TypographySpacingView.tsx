import React, { useState, useEffect } from 'react'
import type { PortfolioContent, TypographyElementStyle } from '@/types/content.ts'
import type { DeviceMode } from '../types.ts'
import { TypographyEditor } from '../components/TypographyEditor.tsx'
import {
  Type,
  Sparkles,
  Layers,
  Monitor,
  Tablet,
  Smartphone,
  Sliders,
  RotateCcw,
  AlignLeft,
  Check,
} from 'lucide-react'

interface TypographySpacingViewProps {
  content: PortfolioContent
  deviceMode: DeviceMode
  onChange: (updatedContent: PortfolioContent) => void
}

type TypographyTargetKey =
  | 'hero-heading'
  | 'hero-description'
  | 'about-statement'
  | 'role-badge'

export function TypographySpacingView({
  content,
  deviceMode,
  onChange,
}: TypographySpacingViewProps) {
  const [target, setTarget] = useState<TypographyTargetKey>('hero-heading')

  const TARGETS: Array<{
    id: TypographyTargetKey
    label: string
    description: string
    getStyle: (c: PortfolioContent) => TypographyElementStyle
    setStyle: (c: PortfolioContent, style: TypographyElementStyle) => PortfolioContent
  }> = [
    {
      id: 'hero-heading',
      label: 'Hero Main Heading',
      description: 'The high-impact primary headline displayed in the hero section',
      getStyle: (c) => c.hero.mainHeading,
      setStyle: (c, s) => ({
        ...c,
        hero: {
          ...c.hero,
          mainHeading: s,
        },
      }),
    },
    {
      id: 'hero-description',
      label: 'Hero Description',
      description: 'Supporting narrative text beneath the main headline',
      getStyle: (c) => c.hero.description,
      setStyle: (c, s) => ({
        ...c,
        hero: {
          ...c.hero,
          description: s,
        },
      }),
    },
    {
      id: 'about-statement',
      label: 'Profile Lead Statement',
      description: 'Primary philosophical and technical statement in About section',
      getStyle: (c) => c.about.statement,
      setStyle: (c, s) => ({
        ...c,
        about: {
          ...c.about,
          statement: s,
        },
      }),
    },
    {
      id: 'role-badge',
      label: 'Role Status Badge',
      description: 'Availability and role badge text above hero title',
      getStyle: (c) => ({
        text: c.hero.roleBadge,
        fontFamily: "'Space Grotesk', monospace",
        fontSize: { desktop: 11, tablet: 11, mobile: 10 },
        fontWeight: { desktop: 700, tablet: 700, mobile: 700 },
        lineHeight: { desktop: 1, tablet: 1, mobile: 1 },
        letterSpacing: { desktop: 1.5, tablet: 1, mobile: 0.5 },
        textAlign: { desktop: 'left', tablet: 'left', mobile: 'left' },
        color: '#00D9FF',
        opacity: 1,
        maxWidth: { desktop: '100%', tablet: '100%', mobile: '100%' },
        marginTop: { desktop: 0, tablet: 0, mobile: 0 },
        marginBottom: { desktop: 8, tablet: 8, mobile: 6 },
        textTransform: 'uppercase',
        textWrap: 'nowrap',
      }),
      setStyle: (c, s) => ({
        ...c,
        hero: {
          ...c.hero,
          roleBadge: s.text,
        },
      }),
    },
  ]

  const activeTargetConfig = TARGETS.find((t) => t.id === target) || TARGETS[0]
  const currentStyle = activeTargetConfig.getStyle(content)

  const handleStyleChange = (updatedStyle: TypographyElementStyle) => {
    const updatedContent = activeTargetConfig.setStyle(content, updatedStyle)
    onChange(updatedContent)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans text-xs text-[#A8B4C2]">
      {/* Target Selector Header */}
      <div className="p-4 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-[#F5F8FA] uppercase font-mono">
              Typography &amp; Spacing System
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cyan-300">
            Responsive Unit Mode: PX / REM
          </span>
        </div>

        <p className="text-[11px] text-[#8491A2] font-sans">
          Select a typography element across the portfolio to calibrate font size, weights, line heights,
          letter spacings, and layout margins across Desktop, Tablet, and Mobile breakpoints.
        </p>

        {/* Element Selection Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {TARGETS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTarget(item.id)}
              className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                target === item.id
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,217,255,0.1)]'
                  : 'bg-black/30 border-[rgba(255,255,255,0.07)] text-[#A8B4C2] hover:text-[#F5F8FA] hover:bg-white/[0.03]'
              }`}
            >
              <div className="font-mono text-[11px] truncate">{item.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Editor Form */}
      <div className="p-5 rounded-xl bg-[#10151D] border border-[rgba(255,255,255,0.09)] space-y-4">
        <div className="border-b border-[rgba(255,255,255,0.07)] pb-3 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#F5F8FA] font-mono">
              {activeTargetConfig.label}
            </h4>
            <p className="text-[11px] text-[#8491A2] font-sans mt-0.5">
              {activeTargetConfig.description}
            </p>
          </div>
        </div>

        <TypographyEditor
          label={activeTargetConfig.label}
          value={currentStyle}
          onChange={handleStyleChange}
          deviceMode={deviceMode}
          allowMultiline={target === 'hero-heading'}
        />
      </div>
    </div>
  )
}
