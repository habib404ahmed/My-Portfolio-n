import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { apiRouter } from './api.ts'
import { ensureAdminInitialized } from './auth.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cookieParser())
app.use('/api', apiRouter)

// Serve uploads
const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads')
app.use('/uploads', express.static(uploadsDir))

// Serve production client build
const distDir = path.resolve(process.cwd(), 'dist')
app.use(express.static(distDir))

// Fallback all SPA routes to index.html
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(distDir, 'index.html'))
})

ensureAdminInitialized()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Production Server] Portfolio & Admin Studio running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to initialize server:', err)
  })
