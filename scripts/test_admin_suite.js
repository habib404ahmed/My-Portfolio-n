// Comprehensive verification test suite for Phase 11 Admin Studio
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { apiRouter } from '../server/api.ts'
import { ensureAdminInitialized } from '../server/auth.ts'

async function runTests() {
  console.log('--- Starting Admin Studio Acceptance Tests ---')
  await ensureAdminInitialized()

  const app = express()
  app.use(cookieParser())
  app.use('/api', apiRouter)

  const server = app.listen(4567, async () => {
    try {
      const baseUrl = 'http://127.0.0.1:4567'

      // Test 1: Public content endpoint
      console.log('Testing Test A & Test I: Public content endpoint (Draft isolation)...')
      const pubRes = await fetch(`${baseUrl}/api/content`)
      if (!pubRes.ok) throw new Error(`Public content failed: ${pubRes.status}`)
      const pubData = await pubRes.json()
      if (!pubData.hero || !pubData.hero.mainHeading || !pubData.hero.mainHeading.text) {
        throw new Error('Invalid public content structure')
      }
      console.log('✓ Public content fetched successfully:', pubData.hero.mainHeading.text.replace(/\n/g, ' '))

      // Test 2: Security (Test H) - unauthorized draft access
      console.log('Testing Test H: Security check without auth...')
      const unauthDraftRes = await fetch(`${baseUrl}/api/content/draft`)
      if (unauthDraftRes.status !== 401) throw new Error(`Expected 401 on unauthorized draft access, got ${unauthDraftRes.status}`)
      console.log('✓ Unauthorized draft request successfully rejected with 401')

      const unauthPubRes = await fetch(`${baseUrl}/api/content/publish`, { method: 'POST' })
      if (unauthPubRes.status !== 401) throw new Error(`Expected 401 on unauthorized publish request, got ${unauthPubRes.status}`)
      console.log('✓ Unauthorized publish request successfully rejected with 401')

      // Test 3: Login authentication
      console.log('Testing Admin Login (/api/auth/login)...')
      const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
      })
      if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status}`)
      const loginData = await loginRes.json()
      if (!loginData.token) throw new Error('No token returned on login')
      const token = loginData.token
      console.log('✓ Admin login succeeded, JWT token received')

      // Test 4: Authenticated /api/auth/me
      const meRes = await fetch(`${baseUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!meRes.ok) throw new Error('Failed to verify token with /api/auth/me')
      console.log('✓ Token verified with /api/auth/me')

      // Test 5: Draft modification (Test A, B, C)
      console.log('Testing Draft modification (Updating Hero Heading & Spacing)...')
      const draftRes = await fetch(`${baseUrl}/api/content/draft`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const currentDraft = await draftRes.json()
      const originalHeading = currentDraft.hero.mainHeading.text
      const testHeading = 'ENGINEERING INTELLIGENCE & CINEMATIC SYSTEMS'
      currentDraft.hero.mainHeading.text = testHeading
      currentDraft.hero.mainHeading.marginBottom = {
        desktop: 48,
        tablet: 36,
        mobile: 24
      }

      const saveDraftRes = await fetch(`${baseUrl}/api/content/draft`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(currentDraft)
      })
      if (!saveDraftRes.ok) throw new Error(`Save draft failed: ${saveDraftRes.status}`)
      console.log('✓ Draft saved successfully with updated heading and spacing')

      // Test 6: Verify Draft Isolation (public site must still have original heading)
      const pubCheckRes = await fetch(`${baseUrl}/api/content`)
      const pubCheckData = await pubCheckRes.json()
      if (pubCheckData.hero.mainHeading.text === testHeading && pubCheckData.hero.mainHeading.text !== originalHeading) {
        throw new Error('Draft isolation violated! Public visitors see unpublished draft!')
      }
      console.log('✓ Draft isolation verified: Public site still shows previous version:', pubCheckData.hero.mainHeading.text.replace(/\n/g, ' '))

      // Test 7: Publish Changes (Test A & Publish)
      console.log('Testing Publish (/api/content/publish)...')
      const publishRes = await fetch(`${baseUrl}/api/content/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          versionLabel: 'v1.1 - Acceptance Test Publish',
          summary: 'Updated hero heading and responsive layout spacing'
        })
      })
      if (!publishRes.ok) throw new Error(`Publish failed: ${publishRes.status}`)
      const publishResult = await publishRes.json()
      console.log('✓ Changes published successfully. Version snapshot:', publishResult.version)

      // Test 8: Public site now reflects published change
      const pubAfterPublish = await (await fetch(`${baseUrl}/api/content`)).json()
      if (pubAfterPublish.hero.mainHeading.text !== testHeading) {
        throw new Error('Published heading does not match on public API!')
      }
      console.log('✓ Public content now serves published update:', pubAfterPublish.hero.mainHeading.text.replace(/\n/g, ' '))

      // Test 9: Rollback test (Test J)
      console.log('Testing Version History & Rollback (Test J)...')
      const versionsRes = await fetch(`${baseUrl}/api/content/versions`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const versionsList = await versionsRes.json()
      if (!Array.isArray(versionsList) || versionsList.length === 0) {
        throw new Error('No versions found in version history')
      }
      console.log(`✓ Version history contains ${versionsList.length} snapshot(s)`)

      // Rollback to previous version if available
      if (versionsList.length >= 2) {
        const targetVersion = versionsList[1].id
        console.log(`Rolling back to version ${targetVersion}...`)
        const rollbackRes = await fetch(`${baseUrl}/api/content/rollback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ versionId: targetVersion })
        })
        if (!rollbackRes.ok) throw new Error('Rollback request failed')
        console.log('✓ Successfully rolled back to target version')
      }

      // Test 10: ATS Resume generation test (Test F)
      console.log('Testing Resume ATS Generation (/api/resume/generate)...')
      const resumeGenRes = await fetch(`${baseUrl}/api/resume/generate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!resumeGenRes.ok) throw new Error(`Resume generation failed: ${resumeGenRes.status}`)
      const resumeGenData = await resumeGenRes.json()
      console.log('✓ Resume ATS generation succeeded:', resumeGenData.filename)

      console.log('\n==========================================')
      console.log('ALL ACCEPTANCE TESTS PASSED SUCCESSFULLY!')
      console.log('==========================================\n')

      server.close(() => process.exit(0))
    } catch (err) {
      console.error('Test execution failed:', err)
      server.close(() => process.exit(1))
    }
  })
}

runTests().catch(err => {
  console.error(err)
  process.exit(1)
})
