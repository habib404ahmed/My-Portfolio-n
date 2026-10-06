import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

async function generateResume() {
  const pdfDoc = await PDFDocument.create()
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  // Standard Letter dimensions: 612 x 792 pt
  const page = pdfDoc.addPage([612, 792])
  const { width, height } = page.getSize()

  const margin = 36
  let y = height - margin

  const primaryColor = rgb(0.05, 0.05, 0.08)
  const secondaryColor = rgb(0.2, 0.25, 0.3)
  const accentColor = rgb(0.02, 0.45, 0.6)
  const dividerColor = rgb(0.8, 0.82, 0.85)

  // =========================================================================
  // 1. VERIFY & EMBED PROFILE PHOTO (MANDATORY ATS CANONICAL ASSET)
  // =========================================================================
  const candidateImagePaths = [
    path.resolve('public/assets/images/profile.png'),
    path.resolve('public/assets/images/profile.jpg'),
  ]

  const imagePath = candidateImagePaths.find((p) => fs.existsSync(p))
  if (!imagePath) {
    throw new Error(
      `CRITICAL: Profile photo not found on disk. Searched: ${candidateImagePaths.join(', ')}`
    )
  }

  const rawImageBytes = fs.readFileSync(imagePath)
  if (!rawImageBytes || rawImageBytes.length === 0) {
    throw new Error(`CRITICAL: Profile photo at "${imagePath}" is empty (0 bytes).`)
  }

  // Programmatically verify image dimensions
  const metadata = await sharp(rawImageBytes).metadata()
  if (!metadata.width || !metadata.height || metadata.width <= 0 || metadata.height <= 0) {
    throw new Error(
      `CRITICAL: Profile photo at "${imagePath}" has invalid dimensions: ${metadata.width}x${metadata.height}`
    )
  }

  console.log(
    `Verified profile photo asset: ${imagePath} (${metadata.width}x${metadata.height}, ${metadata.format})`
  )

  // Generate crisp, optimized high-fidelity buffer for PDF embedding
  let embeddedImage
  try {
    const optimizedJpgBuffer = await sharp(rawImageBytes)
      .resize({ width: 360, withoutEnlargement: true })
      .jpeg({ quality: 92 })
      .toBuffer()
    embeddedImage = await pdfDoc.embedJpg(optimizedJpgBuffer)
  } catch (optErr) {
    console.warn(
      'Sharp JPEG optimization fallback, embedding raw PNG directly:',
      optErr.message
    )
    embeddedImage = await pdfDoc.embedPng(rawImageBytes)
  }

  if (!embeddedImage || embeddedImage.width <= 0 || embeddedImage.height <= 0) {
    throw new Error('CRITICAL: Failed to embed profile photo into PDF document.')
  }

  // Calculate photo placement in header (top-right, preserving exact aspect ratio)
  // Native aspect ratio: 576 / 1024 (~0.5625)
  const photoWidth = 52
  const photoHeight = Math.round(photoWidth * (metadata.height / metadata.width)) // ~92 pt
  const photoX = width - margin - photoWidth
  const photoY = y - photoHeight

  // Draw subtle framing border and candidate photo
  page.drawRectangle({
    x: photoX - 0.75,
    y: photoY - 0.75,
    width: photoWidth + 1.5,
    height: photoHeight + 1.5,
    borderColor: dividerColor,
    borderWidth: 0.75,
  })
  page.drawImage(embeddedImage, {
    x: photoX,
    y: photoY,
    width: photoWidth,
    height: photoHeight,
  })

  // =========================================================================
  // 2. HEADER TEXT (Positioned cleanly to the left of the profile photo)
  // =========================================================================
  page.drawText('MD HABIB MUNSAR AHMED', {
    x: margin,
    y: y - 14,
    size: 17,
    font: helveticaBold,
    color: primaryColor,
  })
  y -= 28

  page.drawText('SOFTWARE ENGINEER  |  AI/ML • Full-Stack Development • Cybersecurity', {
    x: margin,
    y,
    size: 9.5,
    font: helveticaBold,
    color: secondaryColor,
  })
  y -= 13

  page.drawText('Bongaigaon, Assam, India  |  +91 8099321737  |  habibmunsarahmed@gmail.com', {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: secondaryColor,
  })
  y -= 12

  page.drawText('github.com/habib404ahmed  |  linkedin.com/in/habib404ahmed', {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: secondaryColor,
  })

  // Ensure next section divider begins cleanly below both text and portrait photo
  y = Math.min(y, photoY) - 8

  // Helper function to draw section header
  function drawSectionHeader(title) {
    y -= 13
    page.drawText(title.toUpperCase(), {
      x: margin,
      y,
      size: 9.5,
      font: helveticaBold,
      color: accentColor,
    })
    y -= 4
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.8,
      color: dividerColor,
    })
    y -= 10
  }

  // Helper function to wrap and draw text
  function drawWrappedText(
    text,
    fontSize = 8.5,
    font = helvetica,
    color = primaryColor,
    x = margin,
    maxWidth = width - margin * 2,
    lineSpacing = 11.5
  ) {
    const words = text.split(' ')
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const textWidth = font.widthOfTextAtSize(testLine, fontSize)

      if (textWidth > maxWidth) {
        page.drawText(currentLine, { x, y, size: fontSize, font, color })
        y -= lineSpacing
        currentLine = word
      } else {
        currentLine = testLine
      }
    }

    if (currentLine) {
      page.drawText(currentLine, { x, y, size: fontSize, font, color })
      y -= lineSpacing
    }
  }

  // 3. Summary
  drawSectionHeader('Professional Summary')
  drawWrappedText(
    'Software Engineer and BCA student with hands-on experience building full-stack applications, AI-powered systems, multi-agent solutions, and cybersecurity-focused projects. Proficient in Python, Java, JavaScript, React, Node.js, FastAPI, Spring Boot, SQL, modern databases, cloud platforms, and AI technologies. Interested in building intelligent, scalable and secure software systems.',
    8.5,
    helvetica,
    primaryColor,
    margin,
    width - margin * 2,
    11.5
  )

  // 4. Technical Skills
  drawSectionHeader('Technical Skills')
  const skills = [
    { label: 'Programming:', list: 'Python, Java, JavaScript, SQL' },
    { label: 'Frontend:', list: 'React, HTML, CSS, Tailwind CSS' },
    { label: 'Backend:', list: 'Node.js, FastAPI, Spring Boot' },
    { label: 'AI / ML:', list: 'Machine Learning, LLMs, RAG, AI Agents' },
    { label: 'Cybersecurity:', list: 'Ethical Hacking, Kali Linux, Network Security' },
    { label: 'Systems:', list: 'Linux Admin, Windows Setup, Hardware Diagnostics, Tuning' },
    { label: 'Databases:', list: 'MySQL, MongoDB, PostgreSQL, Firebase, Supabase' },
    { label: 'Tools / Cloud:', list: 'Git, GitHub, Docker, AWS, Vercel, Render' },
  ]

  for (const s of skills) {
    page.drawText(s.label, { x: margin, y, size: 8.5, font: helveticaBold, color: primaryColor })
    page.drawText(s.list, { x: margin + 85, y, size: 8.5, font: helvetica, color: primaryColor })
    y -= 10.5
  }

  // 5. Projects
  drawSectionHeader('Software Engineering Projects')

  const projects = [
    {
      title: 'SENTRA — Passive Unidirectional Cyber Threat Detection SOC',
      meta: 'FastAPI, Scapy, PostgreSQL 18, React 19, TypeScript  |  SIH 2026 Problem ID: 26145',
      bullets: [
        'Engineered passive network monitoring SOC platform for unidirectional IP data diodes with zero return path.',
        'Streamed PCAP/PCAPNG packet captures with Scapy, extracting 5-tuple directional flow metrics into PostgreSQL.',
      ],
    },
    {
      title: 'AI Multi-Agent Task & Schedule Manager',
      meta: 'Python, FastAPI, SQLite, Pydantic, Vanilla JS',
      bullets: [
        'Built multi-agent AI system with central Primary Agent router dispatching to Task, Calendar, and Notes agents.',
        'Implemented decoupled tool layers with Pydantic schema validation and transactional SQLite storage.',
      ],
    },
    {
      title: '5minhelp — Local Service Marketplace',
      meta: 'React.js, Node.js, Express, MySQL 8.0, Socket.io, JWT Authentication',
      bullets: [
        'Developed full-stack marketplace connecting local customers with verified service providers in real time.',
        'Implemented WebSocket event dispatch via Socket.io and multi-role RBAC for Customers, Workers, and Admins.',
      ],
    },
    {
      title: 'Campus Care — Real-Time Campus Safety Platform',
      meta: 'React, TypeScript, Vite, Tailwind CSS, Geolocation API  |  Engineering Day Rapid Challenge',
      bullets: [
        'Engineered 1-tap SOS emergency dispatch with non-blocking GPS capture and anti-spam safeguards.',
        'Implemented 4-tier clinical triage assessment alongside 7-role access control consoles for campus safety.',
      ],
    },
    {
      title: 'UniBox League — Box Cricket Tournament Platform',
      meta: 'JavaScript, Supabase PostgreSQL, Web Crypto API (SHA-256), Tailwind CSS v4',
      bullets: [
        'Implemented athlete registration with client-side SHA-256 salted password hashing via native Web Crypto API.',
        'Integrated real-time Supabase PostgreSQL for live coordinator verification and credential clearance management.',
      ],
    },
  ]

  for (const proj of projects) {
    page.drawText(proj.title, { x: margin, y, size: 9, font: helveticaBold, color: primaryColor })
    y -= 9.5
    page.drawText(proj.meta, { x: margin, y, size: 8, font: helveticaOblique, color: secondaryColor })
    y -= 9.5
    for (const b of proj.bullets) {
      page.drawText('•', { x: margin + 4, y, size: 8, font: helvetica, color: primaryColor })
      page.drawText(b, { x: margin + 14, y, size: 8, font: helvetica, color: primaryColor })
      y -= 9.5
    }
    y -= 2
  }

  // 6. Education
  drawSectionHeader('Education')
  page.drawText('Bachelor of Computer Applications (BCA)', {
    x: margin,
    y,
    size: 9,
    font: helveticaBold,
    color: primaryColor,
  })
  page.drawText('2025 — 2028', {
    x: width - margin - 60,
    y,
    size: 8.5,
    font: helvetica,
    color: secondaryColor,
  })
  y -= 10.5
  page.drawText(
    'Assam Down Town University  |  1st Semester SGPA: 8.05  |  2nd Semester SGPA: 8.10',
    { x: margin, y, size: 8.5, font: helvetica, color: primaryColor }
  )
  y -= 10.5
  page.drawText('Class XII: 58%  |  Class X: 72%', {
    x: margin,
    y,
    size: 8,
    font: helvetica,
    color: secondaryColor,
  })
  y -= 3

  // 7. Certifications & Leadership
  drawSectionHeader('Certifications & Leadership')
  const certs = [
    'Introduction to Modern AI — Cisco Networking Academy (2025)',
    'Ethical Hacking — Pitronix Solutions, 7 March 2026 (Certificate ID: #00102970)',
    'Certificate of Appreciation — Organizer, Orientation & Independence Day Programs, Assam Down Town University (Aug 2026)',
  ]
  for (const c of certs) {
    page.drawText('•', { x: margin + 4, y, size: 8, font: helvetica, color: primaryColor })
    page.drawText(c, { x: margin + 14, y, size: 8, font: helvetica, color: primaryColor })
    y -= 10
  }

  // 8. Languages
  y -= 2
  page.drawText('Languages: English (Professional), Hindi (Fluent), Assamese (Fluent)', {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: secondaryColor,
  })

  // Save PDF
  const pdfBytes = await pdfDoc.save()
  const publicOutputDir = path.resolve('public/assets')
  if (!fs.existsSync(publicOutputDir)) {
    fs.mkdirSync(publicOutputDir, { recursive: true })
  }

  // Write all canonical download targets
  const targetFiles = [
    path.join(publicOutputDir, 'Md-Habib-Munsar-Ahmed-Resume.pdf'),
    path.join(publicOutputDir, 'MD_Habib_Munsar_Ahmed_Resume.pdf'),
    path.join(publicOutputDir, 'resume.pdf'),
  ]

  // Also update dist/assets if dist folder exists
  const distOutputDir = path.resolve('dist/assets')
  if (fs.existsSync(distOutputDir)) {
    targetFiles.push(
      path.join(distOutputDir, 'Md-Habib-Munsar-Ahmed-Resume.pdf'),
      path.join(distOutputDir, 'MD_Habib_Munsar_Ahmed_Resume.pdf'),
      path.join(distOutputDir, 'resume.pdf')
    )
  }

  for (const targetPath of targetFiles) {
    fs.writeFileSync(targetPath, pdfBytes)
    console.log(`Generated ATS PDF with profile photo: ${targetPath} (${pdfBytes.length} bytes)`)
  }
}

generateResume().catch((err) => {
  console.error('FATAL: Resume PDF generation failed:', err)
  process.exit(1)
})
