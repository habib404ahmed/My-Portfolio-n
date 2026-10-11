// Admin Credential Provisioning Script
// Usage: node scripts/setup_admin.js [username] [password]
// Example: node scripts/setup_admin.js admin MySecurePass123!

import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const DATA_DIR = path.resolve(process.cwd(), 'data')
const CONFIG_FILE = path.resolve(DATA_DIR, 'admin-config.json')

async function setupAdmin() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  const args = process.argv.slice(2)
  const username = args[0] || process.env.ADMIN_USERNAME || 'admin'
  const password = args[1] || process.env.ADMIN_PASSWORD

  if (!password) {
    console.error('Error: Password is required.')
    console.log('\nUsage:')
    console.log('  node scripts/setup_admin.js <username> <new_password>')
    console.log('  or set ADMIN_PASSWORD in your .env file.\n')
    process.exit(1)
  }

  if (password.length < 8) {
    console.error('Error: Password must be at least 8 characters long for security.')
    process.exit(1)
  }

  console.log(`Hashing password with bcrypt for user "${username}"...`)
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  let existingConfig = {}
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      existingConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
    } catch {
      // Ignore
    }
  }

  const jwtSecret = existingConfig.jwtSecret || process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex')

  const updatedConfig = {
    username,
    passwordHash,
    jwtSecret,
  }

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(updatedConfig, null, 2), 'utf-8')
  console.log(`✓ Admin user "${username}" successfully configured!`)
  console.log(`✓ Credentials securely stored in data/admin-config.json (excluded from Git).`)
}

setupAdmin().catch((err) => {
  console.error('Failed to setup admin:', err)
  process.exit(1)
})
