import fs from 'fs'
import path from 'path'
import { getDefaultContent } from '../src/data/defaultContent.ts'
import type { PortfolioContent, ContentVersion } from '../src/types/content.ts'

const DATA_DIR = path.resolve(process.cwd(), 'data')
const VERSIONS_DIR = path.resolve(DATA_DIR, 'versions')
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads')
const PUBLISHED_FILE = path.resolve(DATA_DIR, 'published-content.json')
const DRAFT_FILE = path.resolve(DATA_DIR, 'draft-content.json')
const CONFIG_FILE = path.resolve(DATA_DIR, 'admin-config.json')

// Ensure directories exist
function ensureDirs() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(VERSIONS_DIR)) fs.mkdirSync(VERSIONS_DIR, { recursive: true })
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

export function getPublishedContent(): PortfolioContent {
  ensureDirs()
  if (fs.existsSync(PUBLISHED_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(PUBLISHED_FILE, 'utf-8'))
      return data
    } catch (err) {
      console.error('Error reading published content, resetting to default:', err)
    }
  }
  const defaultContent = getDefaultContent()
  savePublishedContent(defaultContent)
  return defaultContent
}

export function savePublishedContent(content: PortfolioContent): void {
  ensureDirs()
  content.lastPublished = new Date().toISOString()
  fs.writeFileSync(PUBLISHED_FILE, JSON.stringify(content, null, 2), 'utf-8')
}

export function getDraftContent(): PortfolioContent {
  ensureDirs()
  if (fs.existsSync(DRAFT_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DRAFT_FILE, 'utf-8'))
      return data
    } catch (err) {
      console.error('Error reading draft content:', err)
    }
  }
  const published = getPublishedContent()
  saveDraftContent(published)
  return published
}

export function saveDraftContent(content: PortfolioContent): void {
  ensureDirs()
  content.lastUpdated = new Date().toISOString()
  fs.writeFileSync(DRAFT_FILE, JSON.stringify(content, null, 2), 'utf-8')
}

export function publishDraft(versionLabel?: string, author: string = 'Admin'): { success: boolean; versionId: string } {
  ensureDirs()
  const draft = getDraftContent()
  savePublishedContent(draft)

  // Create version snapshot
  const versionId = `v-${Date.now()}`
  const version: ContentVersion = {
    id: versionId,
    timestamp: new Date().toISOString(),
    label: versionLabel || `Published on ${new Date().toLocaleString()}`,
    author,
    content: draft,
  }

  const versionPath = path.resolve(VERSIONS_DIR, `${versionId}.json`)
  fs.writeFileSync(versionPath, JSON.stringify(version, null, 2), 'utf-8')

  return { success: true, versionId }
}

export function getVersions(): ContentVersion[] {
  ensureDirs()
  const files = fs.readdirSync(VERSIONS_DIR)
  const versions: ContentVersion[] = []

  for (const file of files) {
    if (file.endsWith('.json')) {
      try {
        const fullPath = path.resolve(VERSIONS_DIR, file)
        const v = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
        versions.push({
          id: v.id,
          timestamp: v.timestamp,
          label: v.label,
          author: v.author,
          content: v.content,
        })
      } catch (err) {
        console.error(`Error reading version file ${file}:`, err)
      }
    }
  }

  // Sort descending by timestamp
  return versions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function rollbackToVersion(versionId: string): { success: boolean; content?: PortfolioContent } {
  ensureDirs()
  const versionPath = path.resolve(VERSIONS_DIR, `${versionId}.json`)
  if (!fs.existsSync(versionPath)) {
    return { success: false }
  }

  const v: ContentVersion = JSON.parse(fs.readFileSync(versionPath, 'utf-8'))
  saveDraftContent(v.content)
  savePublishedContent(v.content)

  // Create rollback entry
  const newVersionId = `v-${Date.now()}`
  const rollbackEntry: ContentVersion = {
    id: newVersionId,
    timestamp: new Date().toISOString(),
    label: `Restored version: ${v.label}`,
    author: 'Admin (Rollback)',
    content: v.content,
  }
  fs.writeFileSync(path.resolve(VERSIONS_DIR, `${newVersionId}.json`), JSON.stringify(rollbackEntry, null, 2), 'utf-8')

  return { success: true, content: v.content }
}

export interface AdminConfig {
  passwordHash: string
  jwtSecret: string
  username: string
}

export function getAdminConfig(): AdminConfig {
  ensureDirs()
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
    } catch {
      // Fall through
    }
  }

  // Default setup: username: "admin", password: default hashed or from env
  const defaultSecret = process.env.JWT_SECRET || 'habib-cinematic-portfolio-admin-secret-key-2026'
  // Default password hash for 'admin123' if not configured
  // $2a$10$wKqK6L88XoG0H0sD5Z8q1e8E0Kq6K0L88XoG0H0sD5Z8q1e8E0Kq6 (placeholder)
  const config: AdminConfig = {
    username: process.env.ADMIN_USERNAME || 'admin',
    passwordHash: '',
    jwtSecret: defaultSecret,
  }
  return config
}

export function saveAdminConfig(config: AdminConfig): void {
  ensureDirs()
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8')
}
