import type { BoxSpacing, ElementCustomStyle } from '@/types/content.ts'

function formatSpacing(spacing?: BoxSpacing): string {
  if (!spacing) return ''
  const t = spacing.top || '0px'
  const r = spacing.right || '0px'
  const b = spacing.bottom || '0px'
  const l = spacing.left || '0px'
  return `${t} ${r} ${b} ${l}`
}

function generateStyleDeclarations(style: ElementCustomStyle): string[] {
  const decs: string[] = []

  // Spacing
  if (style.margin) {
    decs.push(`margin: ${formatSpacing(style.margin)} !important;`)
  }
  if (style.padding) {
    decs.push(`padding: ${formatSpacing(style.padding)} !important;`)
  }

  // Dimensions
  if (style.width) decs.push(`width: ${style.width} !important;`)
  if (style.height) decs.push(`height: ${style.height} !important;`)
  if (style.minWidth) decs.push(`min-width: ${style.minWidth} !important;`)
  if (style.maxWidth) decs.push(`max-width: ${style.maxWidth} !important;`)
  if (style.minHeight) decs.push(`min-height: ${style.minHeight} !important;`)
  if (style.maxHeight) decs.push(`max-height: ${style.maxHeight} !important;`)

  // Layout
  if (style.display) decs.push(`display: ${style.display} !important;`)
  if (style.flexDirection) decs.push(`flex-direction: ${style.flexDirection} !important;`)
  if (style.justifyContent) decs.push(`justify-content: ${style.justifyContent} !important;`)
  if (style.alignItems) decs.push(`align-items: ${style.alignItems} !important;`)
  if (style.gap) decs.push(`gap: ${style.gap} !important;`)
  if (style.rowGap) decs.push(`row-gap: ${style.rowGap} !important;`)
  if (style.columnGap) decs.push(`column-gap: ${style.columnGap} !important;`)
  if (style.gridTemplateColumns) decs.push(`grid-template-columns: ${style.gridTemplateColumns} !important;`)
  if (style.overflow) decs.push(`overflow: ${style.overflow} !important;`)

  // Position
  if (style.position) decs.push(`position: ${style.position} !important;`)
  if (style.top) decs.push(`top: ${style.top} !important;`)
  if (style.bottom) decs.push(`bottom: ${style.bottom} !important;`)
  if (style.left) decs.push(`left: ${style.left} !important;`)
  if (style.right) decs.push(`right: ${style.right} !important;`)
  if (typeof style.zIndex === 'number') decs.push(`z-index: ${style.zIndex} !important;`)

  // Typography
  if (style.fontFamily) decs.push(`font-family: ${style.fontFamily} !important;`)
  if (style.fontSize) decs.push(`font-size: ${style.fontSize} !important;`)
  if (style.fontWeight) decs.push(`font-weight: ${style.fontWeight} !important;`)
  if (style.lineHeight) decs.push(`line-height: ${style.lineHeight} !important;`)
  if (style.letterSpacing) decs.push(`letter-spacing: ${style.letterSpacing} !important;`)
  if (style.textAlign) decs.push(`text-align: ${style.textAlign} !important;`)
  if (style.textColor) decs.push(`color: ${style.textColor} !important;`)
  if (style.textTransform) decs.push(`text-transform: ${style.textTransform} !important;`)
  if (style.textDecoration) decs.push(`text-decoration: ${style.textDecoration} !important;`)

  // Appearance & Background
  if (style.backgroundColor) decs.push(`background-color: ${style.backgroundColor} !important;`)
  if (style.backgroundGradient) decs.push(`background: ${style.backgroundGradient} !important;`)
  if (style.backgroundImage) decs.push(`background-image: url('${style.backgroundImage}') !important;`)
  if (typeof style.opacity === 'number') decs.push(`opacity: ${style.opacity} !important;`)
  if (style.borderRadius) decs.push(`border-radius: ${style.borderRadius} !important;`)
  if (style.borderColor) decs.push(`border-color: ${style.borderColor} !important;`)
  if (style.borderWidth) decs.push(`border-width: ${style.borderWidth} !important;`)
  if (style.borderStyle) decs.push(`border-style: ${style.borderStyle} !important;`)
  if (style.boxShadow) decs.push(`box-shadow: ${style.boxShadow} !important;`)
  if (style.backdropFilter) {
    decs.push(`backdrop-filter: ${style.backdropFilter} !important;`)
    decs.push(`-webkit-backdrop-filter: ${style.backdropFilter} !important;`)
  }

  // Animation & Transforms
  if (style.transition) decs.push(`transition: ${style.transition} !important;`)
  if (style.transform) decs.push(`transform: ${style.transform} !important;`)

  return decs
}

export function generateCustomStylesCss(elementStyles?: Record<string, ElementCustomStyle>): string {
  if (!elementStyles) return ''

  const baseRules: string[] = []
  const tabletRules: string[] = []
  const mobileRules: string[] = []

  for (const [id, style] of Object.entries(elementStyles)) {
    if (!style) continue
    const selector = `[data-editable-id="${id}"]`

    const baseDecs = generateStyleDeclarations(style)
    if (baseDecs.length > 0) {
      baseRules.push(`${selector} {\n  ${baseDecs.join('\n  ')}\n}`)
    }

    if (style.tablet) {
      const tabletDecs = generateStyleDeclarations(style.tablet as ElementCustomStyle)
      if (tabletDecs.length > 0) {
        tabletRules.push(`  ${selector} {\n    ${tabletDecs.join('\n    ')}\n  }`)
      }
    }

    if (style.mobile) {
      const mobileDecs = generateStyleDeclarations(style.mobile as ElementCustomStyle)
      if (mobileDecs.length > 0) {
        mobileRules.push(`  ${selector} {\n    ${mobileDecs.join('\n    ')}\n  }`)
      }
    }
  }

  let css = baseRules.join('\n\n')

  if (tabletRules.length > 0) {
    css += `\n\n@media (max-width: 1024px) {\n${tabletRules.join('\n\n')}\n}`
  }

  if (mobileRules.length > 0) {
    css += `\n\n@media (max-width: 768px) {\n${mobileRules.join('\n\n')}\n}`
  }

  return css
}
