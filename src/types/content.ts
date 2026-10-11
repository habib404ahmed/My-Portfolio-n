export interface ResponsiveValue<T> {
  desktop: T
  tablet?: T
  mobile?: T
}

export interface TypographyElementStyle {
  text: string
  fontFamily?: string
  fontSize: ResponsiveValue<number> // in px
  fontWeight: ResponsiveValue<number>
  lineHeight: ResponsiveValue<number> // unitless multiplier
  letterSpacing: ResponsiveValue<number> // in px
  textAlign: ResponsiveValue<'left' | 'center' | 'right' | 'justify'>
  color: string
  opacity: number // 0 - 1
  maxWidth?: ResponsiveValue<string> // e.g. "760px" or "none"
  marginTop: ResponsiveValue<number> // in px
  marginBottom: ResponsiveValue<number> // in px
  marginLeft?: ResponsiveValue<number>
  marginRight?: ResponsiveValue<number>
  paddingTop?: ResponsiveValue<number>
  paddingBottom?: ResponsiveValue<number>
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  textWrap?: 'wrap' | 'nowrap' | 'balance' | 'pretty'
  visible?: ResponsiveValue<boolean>
}

export interface ImageCropConfig {
  x: number // percentage 0-100
  y: number // percentage 0-100
  scale: number // 0.5 - 3
  rotate: number // degrees 0 - 360
  flipH: boolean
  flipV: boolean
  aspectRatio: string // "1:1" | "3:4" | "4:3" | "4:5" | "16:9" | "free"
  objectFit: 'cover' | 'contain' | 'fill'
  borderRadius: number // in px
  shadowIntensity: number // 0 - 1
  opacity: number // 0 - 1
}

export interface HeroSectionData {
  name: {
    first: string
    last: string
    full: string
    display: string[]
  }
  title: string
  roleBadge: string
  mainHeading: TypographyElementStyle
  description: TypographyElementStyle
  availability: {
    status: string
    text: string
    active: boolean
  }
  ctaPrimary: {
    label: string
    link: string
    visible: boolean
  }
  ctaSecondary: {
    label: string
    link: string
    visible: boolean
  }
  profilePhoto: {
    path: string
    fallback: string
    alt: string
    desktopCrop: ImageCropConfig
    tabletCrop: ImageCropConfig
    mobileCrop: ImageCropConfig
  }
  heroHeight: string // e.g. "100dvh"
  contentWidth: string // e.g. "1280px"
  columnProportions: string // e.g. "50/50" or "60/40"
  show3DVisual: boolean
  bgAtmosphereIntensity: number // 0 - 1
}

export interface AboutSectionData {
  title: string
  badge: string
  statement: TypographyElementStyle
  subStatement: TypographyElementStyle
  positioning: string
  location: string
  experienceHighlights: Array<{
    id: string
    title: string
    subtitle: string
    description: string
    metric?: string
  }>
  profileCard: {
    photoPath: string
    photoCrop: ImageCropConfig
    role: string
    status: string
  }
}

export interface TechItemData {
  name: string
  description: string
  role?: string
  usedFor?: string[]
  projects?: Array<{
    projectId: string
    projectName: string
    roleDescription: string
    tag: string
  }>
}

export interface TechDomainData {
  id: string
  label: string
  shortLabel: string
  color: string
  glowColor: string
  description: string
  visualHint: string
  enabled: boolean
  tech: TechItemData[]
}

export interface CapabilityData {
  id: string
  title: string
  domain: string
  color: string
  description: string
  flow: Array<{
    step: string
    label: string
  }>
}

export interface EducationData {
  degree: string
  institution: string
  period: string
  score?: string
  semesters?: Array<{ label: string; score: number }>
  highlights?: string[]
  logo?: string
}

export interface ProjectItemData {
  id: string
  number: string
  title: string
  tagline: string
  category: 'ai' | 'cybersecurity' | 'fullstack'
  categoryLabel: string
  shortDescription: string
  longDescription: string
  technologies: string[]
  features: string[]
  contribution: string
  githubUrl: string
  liveUrl?: string
  caseStudyUrl?: string
  accentColor: string
  glowColor: string
  coverImage?: string
  coverCrop?: ImageCropConfig
  featured: boolean
  status: 'active' | 'archived' | 'in-progress'
  visible: boolean
  pipeline: Array<{ step: string; label: string }>
  metrics?: Array<{ label: string; value: string }>
}

export interface TimelineItemData {
  id: string
  year: string
  period: string
  label: string
  subtitle: string
  description: string
  type: 'foundation' | 'certification' | 'projects' | 'leadership' | 'future'
  isOpenNode?: boolean
  connectedProjects?: string[]
  certificateRef?: string
  externalUrl?: string
  externalLabel?: string
  color: string
}

export interface CertificationData {
  id: string
  number: string
  index: string
  title: string
  issuer: string
  type: string
  recipient: string
  date: string
  year: number
  category: 'ai' | 'security' | 'recognition'
  categoryLabel: string
  image: string
  imageWebp: string
  downloadUrl: string
  verified: boolean
  description: string
  learningThemes?: string[]
  visible: boolean
  credentialId?: string
  certificateId?: string
  verificationUrl?: string
  fileName?: string
  fileSize?: number
  fileType?: 'image' | 'pdf'
}

export interface ResumeData {
  available: boolean
  path: string
  filename: string
  downloadButtonText: string
  supportingText: string
  lastGenerated?: string
}

export interface ContactData {
  email: string
  phone: string
  location: string
  social: {
    github: string
    linkedin: string
    youtube: string
    twitter?: string
    discord?: string
  }
  statusText: string
  responseTimeText: string
  ctaHeading: string
  ctaDescription: string
}

export interface BoxSpacing {
  top?: string | number
  right?: string | number
  bottom?: string | number
  left?: string | number
  linked?: boolean
}

export interface ElementCustomStyle {
  margin?: BoxSpacing
  padding?: BoxSpacing
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  display?: string
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
  gap?: string | number
  rowGap?: string | number
  columnGap?: string | number
  gridColumns?: string
  gridTemplateColumns?: string
  overflow?: string
  position?: 'static' | 'relative' | 'sticky' | 'fixed' | 'absolute' | string
  top?: string
  bottom?: string
  left?: string
  right?: string
  zIndex?: number
  // typography
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  letterSpacing?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify' | string
  textColor?: string
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize' | string
  textDecoration?: string
  // appearance
  backgroundColor?: string
  backgroundOpacity?: number
  backgroundImage?: string
  backgroundGradient?: string
  opacity?: number
  borderRadius?: string | number
  borderColor?: string
  borderWidth?: string | number
  borderStyle?: string
  boxShadow?: string
  backdropFilter?: string
  // animation
  transition?: string
  transform?: string
  // responsive overrides
  mobile?: Partial<ElementCustomStyle>
  tablet?: Partial<ElementCustomStyle>
  customCss?: string
}

export interface NavigationLinkData {
  id: string
  label: string
  href: string
  enabled: boolean
}

export interface NavigationData {
  logoText: string
  logoImage?: string
  profileImage: string
  profileCrop: ImageCropConfig
  links: NavigationLinkData[]
  resumeButtonText: string
  contactCtaText: string
  navbarHeight?: number
  height?: ResponsiveValue<number>
  paddingX?: ResponsiveValue<number>
  paddingY?: ResponsiveValue<number>
  gap?: ResponsiveValue<number>
  itemPadding?: ResponsiveValue<number>
  resumeBtnHeight?: ResponsiveValue<number>
  resumeBtnWidth?: ResponsiveValue<number>
  hideOnScroll?: boolean
  scrollThreshold?: number
  transitionDuration?: number
  fontSize?: ResponsiveValue<number>
  fontWeight?: ResponsiveValue<number>
  letterSpacing?: ResponsiveValue<number>
  textTransform?: 'uppercase' | 'none' | 'lowercase' | 'capitalize'
  backgroundColor?: string
  backgroundOpacity?: number
  glassBlur?: number
  borderColor?: string
  borderOpacity?: number
}

export interface ThemeColorsData {
  voidColor: string
  deepColor: string
  surfaceColor: string
  elevatedColor: string
  cyanColor: string
  blueColor: string
  violetColor: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  glassBg: string
  glassBorder: string
  glassBlur: number // px
  glassRadius: number // px
  borderOpacity: number // 0-1
  shadowIntensity: number // 0-1
}

export interface AnimationSettingsData {
  enableCinematic3D: boolean
  animationIntensity: number // 0.1 - 2.0
  cameraMovementIntensity: number // 0.1 - 2.0
  scrollResponse: number // 0.1 - 2.0
  pointerResponse: number // 0.1 - 2.0
  particleDensity: number // 500 - 10000
  particleSpeed: number // 0.1 - 2.0
  atmosphericFog: number // 0 - 1
  glowIntensity: number // 0.1 - 2.0
  bloomIntensity: number // 0 - 1
  backgroundDepth: number // 0.1 - 2.0
  liquidGlassIntensity: number // 0.1 - 2.0
  reflectionIntensity: number // 0 - 1
  transitionDuration: number // seconds 0.2 - 2.0
  preset: 'cinematic' | 'balanced' | 'minimal' | 'performance'
  reducedMotionFallback: boolean
}

export interface SectionMeta {
  id: string
  label: string
  navAnchor: string
  enabled: boolean
  order: number
  minHeight?: string
  paddingTop?: number
  paddingBottom?: number
}

export interface SeoData {
  title: string
  description: string
  keywords: string
  ogImage: string
  canonicalUrl: string
  author: string
}

export interface PortfolioContent {
  schemaVersion: number
  lastUpdated: string
  lastPublished: string
  hero: HeroSectionData
  about: AboutSectionData
  techStack: {
    categories: TechDomainData[]
  }
  capabilities: CapabilityData[]
  education: EducationData[]
  projects: ProjectItemData[]
  timeline: TimelineItemData[]
  certifications: CertificationData[]
  resume: ResumeData
  contact: ContactData
  navigation: NavigationData
  theme: ThemeColorsData
  animation: AnimationSettingsData
  sections: SectionMeta[]
  seo: SeoData
  elementStyles?: Record<string, ElementCustomStyle>
}

export interface ContentVersion {
  id: string
  timestamp: string
  label: string
  author: string
  content: PortfolioContent
}
