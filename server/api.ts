import express, { type Request, type Response } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { exec } from 'child_process'
import {
  getPublishedContent,
  getDraftContent,
  saveDraftContent,
  publishDraft,
  getVersions,
  rollbackToVersion,
} from './storage.ts'
import {
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  verifyCredentials,
  generateToken,
  requireAuth,
  ensureAdminInitialized,
  type AuthenticatedRequest,
} from './auth.ts'

export const apiRouter = express.Router()

// CORS Middleware
apiRouter.use((req: Request, res: Response, next) => {
  const origin = req.headers.origin
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS
  const allowedOrigins = allowedOriginsEnv
    ? allowedOriginsEnv.split(',').map((o) => o.trim())
    : []

  const isDev = process.env.NODE_ENV !== 'production'
  const isAllowed =
    !origin ||
    allowedOrigins.includes(origin) ||
    (isDev && (origin.includes('localhost') || origin.includes('127.0.0.1')))

  if (isAllowed && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
    return
  }

  next()
})

// Body parsers
apiRouter.use(express.json({ limit: '10mb' }))
apiRouter.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Configure Multer for Uploads
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads')
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR)
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const baseName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`
    cb(null, `${baseName}-${uniqueSuffix}${ext}`)
  },
})

export const MAX_UPLOAD_SIZE_MB = parseInt(process.env.MAX_UPLOAD_SIZE_MB || '10', 10)
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.avif', '.svg']
  const ext = path.extname(file.originalname).toLowerCase()

  const allowedMime = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/svg+xml',
    'application/pdf',
  ]

  if (allowedExts.includes(ext) && allowedMime.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Unsupported file format. Please upload PDF, PNG, JPG, or WebP.'))
  }
}

const upload = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_BYTES },
  fileFilter,
})

export function validateFileContents(filePath: string, ext: string): { valid: boolean; reason?: string } {
  try {
    const buffer = Buffer.alloc(16)
    const fd = fs.openSync(filePath, 'r')
    fs.readSync(fd, buffer, 0, 16, 0)
    fs.closeSync(fd)

    // Check executable binary magic numbers
    // Windows PE executable: MZ (0x4D 0x5A)
    if (buffer[0] === 0x4d && buffer[1] === 0x5a) {
      return { valid: false, reason: 'Executable files are strictly rejected.' }
    }
    // ELF executable binary: 0x7F 'E' 'L' 'F'
    if (buffer[0] === 0x7f && buffer[1] === 0x45 && buffer[2] === 0x4c && buffer[3] === 0x46) {
      return { valid: false, reason: 'Executable binaries are strictly rejected.' }
    }

    const firstStr = buffer.toString('utf8').toLowerCase()
    if (
      firstStr.includes('<!doct') ||
      firstStr.includes('<html') ||
      firstStr.includes('<script') ||
      firstStr.includes('<?php')
    ) {
      return { valid: false, reason: 'HTML and executable script files are strictly rejected.' }
    }

    if (ext === '.pdf') {
      // PDF must begin with %PDF- (0x25 0x50 0x44 0x46 0x2D)
      if (
        buffer[0] === 0x25 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x44 &&
        buffer[3] === 0x46 &&
        buffer[4] === 0x2d
      ) {
        return { valid: true }
      }
      return { valid: false, reason: 'Invalid or corrupt PDF header.' }
    }

    if (ext === '.png') {
      // PNG header: 0x89 0x50 0x4E 0x47
      if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
        return { valid: true }
      }
      return { valid: false, reason: 'Invalid PNG image header.' }
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      // JPEG header: 0xFF 0xD8 0xFF
      if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        return { valid: true }
      }
      return { valid: false, reason: 'Invalid JPEG image header.' }
    }

    if (ext === '.webp') {
      // WebP header: 'RIFF' .... 'WEBP'
      const riff = buffer.subarray(0, 4).toString('utf8')
      const webp = buffer.subarray(8, 12).toString('utf8')
      if (riff === 'RIFF' && webp === 'WEBP') {
        return { valid: true }
      }
      return { valid: false, reason: 'Invalid WebP image header.' }
    }

    return { valid: true }
  } catch (err: any) {
    return { valid: false, reason: err?.message || 'Failed to inspect file contents.' }
  }
}

// ==========================================
// AUTH ENDPOINTS
// ==========================================

apiRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || 'unknown'
    const rate = checkRateLimit(ip)

    if (!rate.allowed) {
      res.status(429).json({
        error: `Too many failed attempts. Please wait ${rate.retryAfterSeconds} seconds before trying again.`,
      })
      return
    }

    const { username, password } = req.body || {}

    if (!username || typeof username !== 'string' || !username.trim()) {
      res.status(400).json({ error: 'Username is required' })
      return
    }

    if (!password || typeof password !== 'string' || !password.trim()) {
      res.status(400).json({ error: 'Password is required' })
      return
    }

    const cleanUsername = username.trim()
    const { username: configuredUsername } = await ensureAdminInitialized()
    if (cleanUsername !== configuredUsername) {
      recordFailedAttempt(ip)
      res.status(401).json({ error: 'Invalid username or password' })
      return
    }

    const valid = await verifyCredentials(password)
    if (!valid) {
      recordFailedAttempt(ip)
      res.status(401).json({ error: 'Invalid username or password' })
      return
    }

    clearRateLimit(ip)
    const token = generateToken(configuredUsername)

    // Set secure HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.json({
      success: true,
      token,
      user: { username: configuredUsername },
    })
  } catch (err: any) {
    console.error('[Auth Login Error]', err?.message || err)
    res.status(500).json({ error: 'Authentication server error. Please try again later.' })
  }
})

apiRouter.post('/auth/logout', (_req: Request, res: Response) => {
  res.clearCookie('admin_token')
  res.json({ success: true, message: 'Logged out successfully' })
})

apiRouter.get('/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    authenticated: true,
    user: req.user,
  })
})

// ==========================================
// CONTENT ENDPOINTS
// ==========================================

// Public: GET published content
apiRouter.get('/content', (_req: Request, res: Response) => {
  try {
    const content = getPublishedContent()
    res.json(content)
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve published content', details: err.message })
  }
})

// Protected: GET draft content
apiRouter.get('/content/draft', requireAuth, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const draft = getDraftContent()
    res.json(draft)
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve draft content', details: err.message })
  }
})

// Protected: PUT or POST save draft content
const handleSaveDraft = (req: AuthenticatedRequest, res: Response) => {
  try {
    const newContent = req.body
    if (!newContent || typeof newContent !== 'object') {
      res.status(400).json({ error: 'Invalid content payload' })
      return
    }
    saveDraftContent(newContent)
    res.json({ success: true, message: 'Draft saved successfully', lastUpdated: newContent.lastUpdated })
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save draft content', details: err.message })
  }
}
apiRouter.put('/content/draft', requireAuth, handleSaveDraft)
apiRouter.post('/content/draft', requireAuth, handleSaveDraft)

// Protected: POST publish draft
apiRouter.post('/content/publish', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { label } = req.body || {}
    const author = req.user?.username || 'Admin'
    const result = publishDraft(label, author)
    res.json({
      success: true,
      message: 'Portfolio published successfully!',
      versionId: result.versionId,
      publishedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to publish changes', details: err.message })
  }
})

// Protected: GET version history
apiRouter.get('/content/versions', requireAuth, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const versions = getVersions()
    res.json(versions)
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve versions', details: err.message })
  }
})

// Protected: POST rollback to version
apiRouter.post('/content/rollback', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const { versionId } = req.body
    if (!versionId) {
      res.status(400).json({ error: 'Version ID is required' })
      return
    }
    const result = rollbackToVersion(versionId)
    if (!result.success) {
      res.status(404).json({ error: 'Version not found' })
      return
    }
    res.json({
      success: true,
      message: `Successfully rolled back to version ${versionId}`,
      content: result.content,
    })
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to rollback version', details: err.message })
  }
})

// ==========================================
// MEDIA UPLOAD & LIBRARY ENDPOINTS
// ==========================================

apiRouter.post(
  '/upload',
  requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    upload.single('file')(req as any, res as any, (err: any) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({
            error: `File size exceeds maximum limit of ${MAX_UPLOAD_SIZE_MB} MB. Please upload a smaller document.`,
          })
          return
        }
        res.status(400).json({
          error: err.message || 'File upload rejected. Supported types: PDF, PNG, JPG, WebP.',
        })
        return
      }

      if (!req.file) {
        res.status(400).json({ error: 'No file received or file rejected' })
        return
      }

      const ext = path.extname(req.file.originalname).toLowerCase()
      const inspection = validateFileContents(req.file.path, ext)

      if (!inspection.valid) {
        // Safe cleanup: remove unsafe or invalid file immediately
        try {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path)
          }
        } catch {}

        res.status(400).json({
          error: inspection.reason || 'File validation failed: content does not match expected format.',
        })
        return
      }

      const publicUrl = `/uploads/${req.file.filename}`
      res.json({
        success: true,
        url: publicUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      })
    })
  }
)

// List media and find section usage
apiRouter.get('/media', requireAuth, (_req: AuthenticatedRequest, res: Response) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR)
    const content = getDraftContent()
    const contentStr = JSON.stringify(content)

    const mediaList = files.map((filename) => {
      const fullPath = path.resolve(UPLOADS_DIR, filename)
      const stats = fs.statSync(fullPath)
      const url = `/uploads/${filename}`

      // Scan content for usage
      const usedBy: string[] = []
      if (contentStr.includes(url) || contentStr.includes(filename)) {
        if (JSON.stringify(content.hero).includes(url)) usedBy.push('Hero')
        if (JSON.stringify(content.about).includes(url)) usedBy.push('About')
        if (JSON.stringify(content.projects).includes(url)) usedBy.push('Projects')
        if (JSON.stringify(content.certifications).includes(url)) usedBy.push('Certifications')
        if (JSON.stringify(content.navigation).includes(url)) usedBy.push('Navigation')
        if (JSON.stringify(content.resume).includes(url)) usedBy.push('Resume')
      }

      return {
        filename,
        url,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        isImage: /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(filename),
        isPdf: /\.pdf$/i.test(filename),
        usedBy,
      }
    })

    res.json(mediaList)
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to list media files', details: err.message })
  }
})

// Delete media
apiRouter.delete('/media/:filename', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  try {
    const filename = req.params.filename
    // Prevent path traversal
    const safeName = path.basename(String(filename))
    const filePath = path.resolve(UPLOADS_DIR, safeName)

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'File not found' })
      return
    }

    // Safety check if force not specified
    const content = getDraftContent()
    const contentStr = JSON.stringify(content)
    const inUse = contentStr.includes(safeName)

    if (inUse && req.query.force !== 'true') {
      res.status(400).json({
        error: 'File is currently in use across portfolio sections. Pass force=true to delete.',
        inUse: true,
      })
      return
    }

    fs.unlinkSync(filePath)
    res.json({ success: true, message: `Deleted ${safeName}` })
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete file', details: err.message })
  }
})

// ==========================================
// RESUME GENERATION ENDPOINT
// ==========================================

apiRouter.post('/resume/generate', requireAuth, (_req: AuthenticatedRequest, res: Response) => {
  const scriptPath = path.resolve(process.cwd(), 'scripts', 'generate_resume_pdf.js')
  exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error generating resume:', error, stderr)
      res.status(500).json({ error: 'Failed to generate resume PDF', details: stderr || error.message })
      return
    }

    res.json({
      success: true,
      message: 'Resume PDF regenerated successfully!',
      output: stdout,
    })
  })
})
