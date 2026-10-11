import React, { useState } from 'react'
import type { TypographyElementStyle, ResponsiveValue } from '@/types/content.ts'
import type { DeviceMode } from '../types.ts'
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  CornerDownLeft,
  Maximize2,
  Sliders,
  Type,
} from 'lucide-react'

interface TypographyEditorProps {
  label: string
  value: TypographyElementStyle
  onChange: (updated: TypographyElementStyle) => void
  deviceMode?: DeviceMode
  allowMultiline?: boolean
}

export function TypographyEditor({
  label,
  value,
  onChange,
  deviceMode = 'desktop',
  allowMultiline = true,
}: TypographyEditorProps) {
  const [activeScreen, setActiveScreen] = useState<DeviceMode>(deviceMode)

  const currentFontSize =
    value.fontSize[activeScreen] ?? value.fontSize.desktop ?? 16
  const currentFontWeight =
    value.fontWeight[activeScreen] ?? value.fontWeight.desktop ?? 400
  const currentLineHeight =
    value.lineHeight[activeScreen] ?? value.lineHeight.desktop ?? 1.5
  const currentLetterSpacing =
    value.letterSpacing[activeScreen] ?? value.letterSpacing.desktop ?? 0
  const currentTextAlign =
    value.textAlign[activeScreen] ?? value.textAlign.desktop ?? 'left'
  const currentMarginTop =
    value.marginTop[activeScreen] ?? value.marginTop.desktop ?? 0
  const currentMarginBottom =
    value.marginBottom[activeScreen] ?? value.marginBottom.desktop ?? 0
  const currentMaxWidth =
    value.maxWidth?.[activeScreen] ?? value.maxWidth?.desktop ?? '100%'

  const updateResponsive = <T,>(
    obj: ResponsiveValue<T> | undefined,
    field: keyof ResponsiveValue<T>,
    val: T
  ): ResponsiveValue<T> => {
    const next: ResponsiveValue<T> = { ...(obj || { desktop: val }) }
    next[field] = val
    return next
  }

  const handleTextChange = (text: string) => {
    onChange({ ...value, text })
  }

  const handleFontSizeChange = (num: number) => {
    onChange({
      ...value,
      fontSize: updateResponsive(value.fontSize, activeScreen, num),
    })
  }

  const handleFontWeightChange = (weight: number) => {
    onChange({
      ...value,
      fontWeight: updateResponsive(value.fontWeight, activeScreen, weight),
    })
  }

  const handleLineHeightChange = (lh: number) => {
    onChange({
      ...value,
      lineHeight: updateResponsive(value.lineHeight, activeScreen, lh),
    })
  }

  const handleLetterSpacingChange = (ls: number) => {
    onChange({
      ...value,
      letterSpacing: updateResponsive(value.letterSpacing, activeScreen, ls),
    })
  }

  const handleTextAlignChange = (align: 'left' | 'center' | 'right' | 'justify') => {
    onChange({
      ...value,
      textAlign: updateResponsive(value.textAlign, activeScreen, align),
    })
  }

  const handleMarginTopChange = (mt: number) => {
    onChange({
      ...value,
      marginTop: updateResponsive(value.marginTop, activeScreen, mt),
    })
  }

  const handleMarginBottomChange = (mb: number) => {
    onChange({
      ...value,
      marginBottom: updateResponsive(value.marginBottom, activeScreen, mb),
    })
  }

  const handleInsertBreak = () => {
    onChange({ ...value, text: `${value.text}\n` })
  }

  return (
    <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-slate-800 space-y-4 text-xs font-mono text-slate-300">
      {/* Header and Screen Switcher */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white uppercase">{label}</span>
        </div>
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-slate-800">
          {(['desktop', 'tablet', 'mobile'] as DeviceMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setActiveScreen(mode)}
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                activeScreen === mode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {mode[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Text Area */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] text-slate-400 uppercase">Text Content</label>
          {allowMultiline && (
            <button
              type="button"
              onClick={handleInsertBreak}
              title="Insert new line"
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <CornerDownLeft className="w-3 h-3" />
              <span>Insert Line Break</span>
            </button>
          )}
        </div>
        {allowMultiline ? (
          <textarea
            rows={3}
            value={value.text}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full p-2.5 bg-black/50 border border-slate-700/70 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-cyan-500 resize-y"
          />
        ) : (
          <input
            type="text"
            value={value.text}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full p-2.5 bg-black/50 border border-slate-700/70 rounded-xl text-white font-sans text-xs focus:outline-none focus:border-cyan-500"
          />
        )}
      </div>

      {/* Font Family & Transform */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Font Family</label>
          <select
            value={value.fontFamily || "'Space Grotesk', 'Inter', sans-serif"}
            onChange={(e) => onChange({ ...value, fontFamily: e.target.value })}
            className="w-full p-2 bg-black/50 border border-slate-700/70 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="'Space Grotesk', 'Inter', sans-serif">Space Grotesk</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="'Space Mono', monospace">Space Mono</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Transform</label>
          <select
            value={value.textTransform || 'none'}
            onChange={(e) => onChange({ ...value, textTransform: e.target.value as any })}
            className="w-full p-2 bg-black/50 border border-slate-700/70 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value="none">None</option>
            <option value="uppercase">UPPERCASE</option>
            <option value="lowercase">lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </div>
      </div>

      {/* Font Size: Slider & Numeric Input */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] text-slate-400 uppercase">
            Font Size ({activeScreen}): <span className="text-cyan-400 font-bold">{currentFontSize}px</span>
          </label>
          <input
            type="number"
            min={10}
            max={120}
            value={currentFontSize}
            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
            className="w-16 p-1 bg-black/50 border border-slate-700 rounded text-right text-white font-bold"
          />
        </div>
        <input
          type="range"
          min={10}
          max={120}
          value={currentFontSize}
          onChange={(e) => handleFontSizeChange(Number(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
        />
      </div>

      {/* Font Weight & Line Height */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Weight: {currentFontWeight}</label>
          <select
            value={currentFontWeight}
            onChange={(e) => handleFontWeightChange(Number(e.target.value))}
            className="w-full p-2 bg-black/50 border border-slate-700/70 rounded-xl text-slate-200 text-xs"
          >
            <option value={300}>300 Light</option>
            <option value={400}>400 Regular</option>
            <option value={500}>500 Medium</option>
            <option value={600}>600 SemiBold</option>
            <option value={700}>700 Bold</option>
            <option value={800}>800 ExtraBold</option>
            <option value={900}>900 Black</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Line Height: {currentLineHeight}</label>
          <input
            type="number"
            step={0.05}
            min={0.8}
            max={2.5}
            value={currentLineHeight}
            onChange={(e) => handleLineHeightChange(Number(e.target.value))}
            className="w-full p-2 bg-black/50 border border-slate-700/70 rounded-xl text-white"
          />
        </div>
      </div>

      {/* Letter Spacing & Text Align */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Letter Spacing: {currentLetterSpacing}px</label>
          <input
            type="range"
            min={-3}
            max={10}
            step={0.5}
            value={currentLetterSpacing}
            onChange={(e) => handleLetterSpacingChange(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Text Alignment</label>
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-slate-800">
            {(['left', 'center', 'right', 'justify'] as const).map((align) => (
              <button
                key={align}
                type="button"
                onClick={() => handleTextAlignChange(align)}
                className={`p-1.5 rounded flex-1 flex justify-center ${
                  currentTextAlign === align ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-white'
                }`}
              >
                {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                {align === 'justify' && <AlignJustify className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Margins: Top & Bottom */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Margin Top: {currentMarginTop}px</label>
          <input
            type="number"
            value={currentMarginTop}
            onChange={(e) => handleMarginTopChange(Number(e.target.value))}
            className="w-full p-2 bg-black/50 border border-slate-700/70 rounded-xl text-white"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Margin Bottom: {currentMarginBottom}px</label>
          <input
            type="number"
            value={currentMarginBottom}
            onChange={(e) => handleMarginBottomChange(Number(e.target.value))}
            className="w-full p-2 bg-black/50 border border-slate-700/70 rounded-xl text-white"
          />
        </div>
      </div>

      {/* Color & Opacity */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Text Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.color.startsWith('#') ? value.color : '#F5F8FA'}
              onChange={(e) => onChange({ ...value, color: e.target.value })}
              className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
            />
            <input
              type="text"
              value={value.color}
              onChange={(e) => onChange({ ...value, color: e.target.value })}
              className="flex-1 p-1.5 bg-black/50 border border-slate-700/70 rounded-lg text-white text-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Opacity: {Math.round((value.opacity ?? 1) * 100)}%</label>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={value.opacity ?? 1}
            onChange={(e) => onChange({ ...value, opacity: Number(e.target.value) })}
            className="w-full accent-cyan-400 cursor-pointer mt-2"
          />
        </div>
      </div>
    </div>
  )
}
