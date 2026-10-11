export type AdminTab =
  | 'visual-editor'
  | 'dashboard'
  | 'page-builder'
  | 'hero'
  | 'about'
  | 'typography'
  | 'photo-studio'
  | 'animation'
  | 'tech-stack'
  | 'capabilities'
  | 'education'
  | 'projects'
  | 'journey'
  | 'certifications'
  | 'resume'
  | 'contact'
  | 'navigation'
  | 'theme'
  | 'seo'
  | 'media-library'
  | 'versions'
  | 'settings'

export type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export type InspectorTab =
  | 'content'
  | 'layout'
  | 'typography'
  | 'appearance'
  | 'background'
  | 'border'
  | 'shadow'
  | 'animation'
  | 'responsive'
  | 'advanced'

export interface SelectedElementInfo {
  id: string
  label?: string
  name?: string
  type:
    | 'section'
    | 'text'
    | 'heading'
    | 'badge'
    | 'image'
    | 'button'
    | 'navbar'
    | 'header'
    | '3d'
    | 'card'
    | 'grid'
    | 'social'
    | 'container'
    | 'custom'
    | string
  sectionId?: string
  breadcrumb?: string[]
  breadcrumbs?: string[]
  canHide?: boolean
  canDuplicate?: boolean
  canDelete?: boolean
  canReorder?: boolean
  locked?: boolean
}

export interface LayerNode {
  id: string
  label?: string
  name: string
  type: SelectedElementInfo['type']
  sectionId?: string
  visible?: boolean
  locked?: boolean
  icon?: any
  children?: LayerNode[]
}

export interface SaveStatusState {
  status: 'clean' | 'unsaved' | 'saving' | 'saved' | 'publishing' | 'published' | 'error'
  message?: string
  lastSaved?: string
}

export interface MediaItem {
  filename: string
  url: string
  size: number
  createdAt: string
  modifiedAt: string
  isImage: boolean
  isPdf: boolean
  usedBy: string[]
}
