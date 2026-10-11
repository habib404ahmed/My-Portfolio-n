import type { Plugin } from 'vite'
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { apiRouter } from './api.ts'
import { ensureAdminInitialized } from './auth.ts'

export function adminApiPlugin(): Plugin {
  return {
    name: 'admin-api-plugin',
    configureServer(server) {
      ensureAdminInitialized().catch(console.error)

      const app = express()
      app.use(cookieParser())
      // Mount /api routes
      app.use('/api', apiRouter)
      // Serve /uploads statically in dev if not picked up by public
      const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads')
      app.use('/uploads', express.static(uploadsDir))

      // Connect express app into Vite server middlewares
      server.middlewares.use(app)
    },
    configurePreviewServer(server) {
      ensureAdminInitialized().catch(console.error)

      const app = express()
      app.use(cookieParser())
      app.use('/api', apiRouter)
      const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads')
      app.use('/uploads', express.static(uploadsDir))

      server.middlewares.use(app)
    },
  }
}
