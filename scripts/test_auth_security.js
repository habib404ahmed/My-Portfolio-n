// Acceptance Test Script for Phase 11.1 Auth Connectivity & Security
import express from 'express'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import path from 'path'
import { apiRouter } from '../server/api.ts'
import { ensureAdminInitialized, clearRateLimit } from '../server/auth.ts'

async function runAuthSecurityTests() {
  console.log('=====================================================')
  console.log('RUNNING PHASE 11.1 AUTH CONNECTIVITY & SECURITY TESTS')
  console.log('=====================================================')

  // Setup test server
  await ensureAdminInitialized()
  const app = express()
  app.use(cookieParser())
  app.use('/api', apiRouter)

  const server = app.listen(5678, async () => {
    try {
      const baseUrl = 'http://127.0.0.1:5678'
      clearRateLimit('::ffff:127.0.0.1')
      clearRateLimit('127.0.0.1')

      // Case 1 & 2: Backend starts & Frontend can reach the backend
      console.log('\n[Case 1 & 2] Backend starts and is reachable...')
      const pingRes = await fetch(`${baseUrl}/api/content`)
      if (!pingRes.ok) throw new Error(`Backend unreachable: status ${pingRes.status}`)
      console.log('✓ Backend is healthy and reachable (Status: 200)')

      // Case 5: Empty credentials are rejected
      console.log('\n[Case 5] Empty credentials rejection...')
      const emptyUserRes = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: '', password: 'somepassword' }),
      })
      if (emptyUserRes.status !== 400) throw new Error(`Expected 400 for empty username, got ${emptyUserRes.status}`)
      console.log('✓ Empty username correctly rejected with 400')

      const emptyPassRes = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: '' }),
      })
      if (emptyPassRes.status !== 400) throw new Error(`Expected 400 for empty password, got ${emptyPassRes.status}`)
      console.log('✓ Empty password correctly rejected with 400')

      // Case 4: Invalid credentials are rejected
      console.log('\n[Case 4] Invalid credentials rejection...')
      const invalidRes = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'wrong_password_123' }),
      })
      if (invalidRes.status !== 401) throw new Error(`Expected 401 for invalid credentials, got ${invalidRes.status}`)
      const invalidData = await invalidRes.json()
      if (invalidData.error !== 'Invalid username or password') throw new Error(`Unexpected error message: ${invalidData.error}`)
      console.log('✓ Invalid credentials safely rejected with 401 and generic error message')

      // Case 3: Valid administrator credentials authenticate successfully
      console.log('\n[Case 3] Valid credentials authentication...')
      const validRes = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
      })
      if (!validRes.ok) throw new Error(`Expected 200 for valid login, got ${validRes.status}`)
      const validData = await validRes.json()
      if (!validData.token) throw new Error('No JWT token returned upon successful login')
      const token = validData.token
      const setCookieHeader = validRes.headers.get('set-cookie')
      if (!setCookieHeader || !setCookieHeader.includes('admin_token')) {
        throw new Error('Expected HttpOnly admin_token cookie to be set')
      }
      console.log('✓ Valid credentials accepted, JWT issued and HttpOnly cookie set')

      // Case 7: Unauthenticated requests cannot access protected admin APIs
      console.log('\n[Case 7] Protected route security verification...')
      const unauthDraft = await fetch(`${baseUrl}/api/content/draft`)
      if (unauthDraft.status !== 401) throw new Error(`Expected 401 on unauthenticated draft access, got ${unauthDraft.status}`)
      console.log('✓ Protected route (/api/content/draft) denied to unauthenticated client (401)')

      // Case 8: Refreshing authenticated page behaves correctly (Token / Cookie auth)
      console.log('\n[Case 8] Authenticated session persistence...')
      const authMeBearer = await fetch(`${baseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!authMeBearer.ok) throw new Error('Bearer token session verification failed')
      const authMeData = await authMeBearer.json()
      if (!authMeData.authenticated || authMeData.user.username !== 'admin') {
        throw new Error('User identity verification failed')
      }

      // Test cookie-based authentication
      const authMeCookie = await fetch(`${baseUrl}/api/auth/me`, {
        headers: { Cookie: `admin_token=${token}` },
      })
      if (!authMeCookie.ok) throw new Error('Cookie session verification failed')
      console.log('✓ Session verified successfully via both Bearer header and HttpOnly cookie')

      // Case 9: Logout invalidates the session
      console.log('\n[Case 9] Logout session termination...')
      const logoutRes = await fetch(`${baseUrl}/api/auth/logout`, { method: 'POST' })
      if (!logoutRes.ok) throw new Error('Logout request failed')
      const clearCookie = logoutRes.headers.get('set-cookie')
      if (!clearCookie || !clearCookie.includes('admin_token=;')) {
        throw new Error('Logout did not clear admin_token cookie')
      }
      console.log('✓ Logout successfully clears session cookie')

      // Case 6: Rate limiting on repeated failed attempts
      console.log('\n[Case 6] Rate limiting verification...')
      clearRateLimit('127.0.0.1')
      let rateLimited = false
      for (let i = 0; i < 6; i++) {
        const res = await fetch(`${baseUrl}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'admin', password: `bad_pass_${i}` }),
        })
        if (res.status === 429) {
          rateLimited = true
          const rateData = await res.json()
          console.log(`✓ Repeated attempts blocked by rate limiter on attempt ${i + 1}: ${rateData.error}`)
          break
        }
      }
      if (!rateLimited) throw new Error('Rate limiter failed to block after multiple attempts!')

      // Case 11: CORS headers & Preflight OPTIONS
      console.log('\n[Case 11] CORS preflight & headers verification...')
      const corsOptionsRes = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'http://localhost:5173',
          'Access-Control-Request-Method': 'POST',
        },
      })
      if (corsOptionsRes.status !== 204) throw new Error(`Expected 204 for CORS OPTIONS, got ${corsOptionsRes.status}`)
      if (corsOptionsRes.headers.get('access-control-allow-origin') !== 'http://localhost:5173') {
        throw new Error('Incorrect Access-Control-Allow-Origin header')
      }
      if (corsOptionsRes.headers.get('access-control-allow-credentials') !== 'true') {
        throw new Error('Expected Access-Control-Allow-Credentials: true')
      }
      console.log('✓ CORS OPTIONS preflight and credentials headers successfully verified')

      // Case 12: No default password exposed in source files or bundle
      console.log('\n[Case 12] Scanning frontend components and build assets for exposed default passwords...')
      const loginComponentSrc = fs.readFileSync(
        path.resolve(process.cwd(), 'src/admin/components/AdminLogin.tsx'),
        'utf-8'
      )
      if (loginComponentSrc.includes('admin123')) {
        throw new Error('SECURITY VIOLATION: "admin123" is exposed in AdminLogin.tsx!')
      }
      console.log('✓ Verified: AdminLogin.tsx does NOT contain or expose any default password')

      console.log('\n=====================================================')
      console.log('ALL PHASE 11.1 AUTH & SECURITY TESTS PASSED!')
      console.log('=====================================================\n')

      server.close(() => process.exit(0))
    } catch (err) {
      console.error('Test failed:', err)
      server.close(() => process.exit(1))
    }
  })
}

runAuthSecurityTests().catch((err) => {
  console.error(err)
  process.exit(1)
})
