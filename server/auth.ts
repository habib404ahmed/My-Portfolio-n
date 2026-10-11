import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { getAdminConfig, saveAdminConfig } from './storage.ts'

// Rate limiting in-memory store
interface RateLimitRecord {
  attempts: number
  resetTime: number
}
const loginAttempts = new Map<string, RateLimitRecord>()

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000 // 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()
  const record = loginAttempts.get(ip)

  if (!record) {
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (now > record.resetTime) {
    loginAttempts.delete(ip)
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfterSeconds: retryAfter }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now()
  const record = loginAttempts.get(ip)
  if (!record || now > record.resetTime) {
    loginAttempts.set(ip, { attempts: 1, resetTime: now + LOCKOUT_MS })
  } else {
    record.attempts += 1
  }
}

export function clearRateLimit(ip: string): void {
  loginAttempts.delete(ip)
}

// Initialise or fetch config
export async function ensureAdminInitialized(): Promise<{ username: string }> {
  const config = getAdminConfig()
  const envPassword = process.env.ADMIN_PASSWORD
  const envUsername = process.env.ADMIN_USERNAME

  if (envUsername && envUsername !== config.username) {
    config.username = envUsername
  }

  if (envPassword) {
    const isSame = config.passwordHash ? await bcrypt.compare(envPassword, config.passwordHash) : false
    if (!isSame) {
      const salt = await bcrypt.genSalt(10)
      config.passwordHash = await bcrypt.hash(envPassword, salt)
      saveAdminConfig(config)
      console.log(`[Admin Auth] Admin credentials updated from environment variable for "${config.username}".`)
      return { username: config.username }
    }
  }

  if (!config.passwordHash) {
    const fallbackPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const salt = await bcrypt.genSalt(10)
    config.passwordHash = await bcrypt.hash(fallbackPassword, salt)
    saveAdminConfig(config)
    console.log(`[Admin Auth] Initialized credentials for admin user "${config.username}". Set ADMIN_PASSWORD in .env or run "npm run admin:setup" to configure.`)
  }

  return { username: config.username }
}

export async function verifyCredentials(password: string): Promise<boolean> {
  const config = getAdminConfig()
  if (!config.passwordHash) {
    await ensureAdminInitialized()
    return verifyCredentials(password)
  }
  return bcrypt.compare(password, config.passwordHash)
}

export function generateToken(username: string): string {
  const config = getAdminConfig()
  return jwt.sign({ username, role: 'admin' }, config.jwtSecret, {
    expiresIn: '24h',
  })
}

export function verifyToken(token: string): { valid: boolean; username?: string } {
  const config = getAdminConfig()
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { username: string; role: string }
    return { valid: true, username: decoded.username }
  } catch {
    return { valid: false }
  }
}

// Express Auth Middleware
export interface AuthenticatedRequest extends Request {
  user?: { username: string }
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  let token = ''

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token
  }

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Authentication required' })
    return
  }

  const { valid, username } = verifyToken(token)
  if (!valid || !username) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired session' })
    return
  }

  req.user = { username }
  next()
}
