import express, { type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'
import { apiRouter } from '../server/api.ts'
import { ensureAdminInitialized } from '../server/auth.ts'
import { UPLOADS_DIR } from '../server/storage.ts'

const app = express()

app.use(cookieParser())

// Serve uploads if requested via API
app.use('/uploads', express.static(UPLOADS_DIR))
app.use('/api/uploads', express.static(UPLOADS_DIR))

// Mount API router on both /api prefix and root
app.use('/api', apiRouter)
app.use(apiRouter)

let isInitialized = false
let initPromise: Promise<any> | null = null

export async function handleRequest(req: Request, res: Response) {
  if (!isInitialized) {
    if (!initPromise) {
      initPromise = ensureAdminInitialized()
        .then(() => {
          isInitialized = true
        })
        .catch((err) => {
          console.error('[Vercel Serverless] Admin initialization error:', err)
        })
    }
    await initPromise
  }

  return app(req, res)
}

export default handleRequest
