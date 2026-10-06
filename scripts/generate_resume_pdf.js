import fs from 'fs'
import path from 'path'
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

  // Helper function to draw section header
  function drawSectionHeader(title) {
    y -= 14
    page.drawText(title.toUpperCase(), {
      x: margin,
      y,
      size: 10,
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
  function drawWrappedText(text, fontSize = 9, font = helvetica, color = primaryColor, x = margin, maxWidth = width - margin * 2, lineSpacing = 12) {
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

  // 1. Header
  page.drawText('MD HABIB MUNSAR AHMED', {
    x: margin,
    y,
    size: 18,
    font: helveticaBold,
    color: primaryColor,
  })
  y -= 15

  page.drawText('SOFTWARE ENGINEER  |  AI/ML • Full-Stack Development • Cybersecurity', {
    x: margin,
    y,
    size: 10,
    font: helveticaBold,
    color: secondaryColor,
  })
  y -= 14

  const contactLine = 'Bongaigaon, Assam, India  |  +91 8099321737  |  habibmunsarahmed@gmail.com  |  github.com/habib404ahmed'
  page.drawText(contactLine, {
    x: margin,
    y,
    size: 8.5,
    font: helvetica,
    color: secondaryColor,
  })
  y -= 10

  // 2. Summary
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

  // 3. Technical Skills
  drawSectionHeader('Technical Skills')
  const skills = [
    { label: 'Programming:', list: 'Python, Java, JavaScript, SQL' },
    { label: 'Frontend:', list: 'React, HTML, CSS, Tailwind CSS' },
    { label: 'Backend:', list: 'Node.js, FastAPI, Spring Boot' },
    { label: 'AI / ML:', list: 'Machine Learning, LLMs, RAG, AI Agents' },
    { label: 'Cybersecurity:', list: 'Kali Linux, Ethical Hacking, Network Security' },
    { label: 'Databases:', list: 'MySQL, MongoDB, PostgreSQL, Firebase, Supabase' },
    { label: 'Tools / Cloud:', list: 'Git, GitHub, Docker, AWS, Vercel, Render' },
  ]

  for (const s of skills) {
    page.drawText(s.label, { x: margin, y, size: 8.5, font: helveticaBold, color: primaryColor })
    page.drawText(s.list, { x: margin + 85, y, size: 8.5, font: helvetica, color: primaryColor })
    y -= 11
  }

  // 4. Projects
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
    y -= 10
    page.drawText(proj.meta, { x: margin, y, size: 8, font: helveticaOblique, color: secondaryColor })
    y -= 10
    for (const b of proj.bullets) {
      page.drawText('•', { x: margin + 4, y, size: 8, font: helvetica, color: primaryColor })
      page.drawText(b, { x: margin + 14, y, size: 8, font: helvetica, color: primaryColor })
      y -= 10
    }
    y -= 2
  }

  // 5. Education
  drawSectionHeader('Education')
  page.drawText('Bachelor of Computer Applications (BCA)', { x: margin, y, size: 9, font: helveticaBold, color: primaryColor })
  page.drawText('2025 — 2028', { x: width - margin - 60, y, size: 8.5, font: helvetica, color: secondaryColor })
  y -= 11
  page.drawText('Assam Down Town University  |  1st Semester SGPA: 8.05  |  2nd Semester SGPA: 8.10', { x: margin, y, size: 8.5, font: helvetica, color: primaryColor })
  y -= 11
  page.drawText('Class XII: 58%  |  Class X: 72%', { x: margin, y, size: 8, font: helvetica, color: secondaryColor })
  y -= 4

  // 6. Certifications & Leadership
  drawSectionHeader('Certifications & Leadership')
  const certs = [
    'Introduction to Modern AI — Cisco Networking Academy (2025)',
    'Ethical Hacking — Pitronix Solutions, 7 March 2026 (Certificate ID: #00102970)',
    'Certificate of Appreciation — Organizer, Orientation & Independence Day Programs, Assam Down Town University (Aug 2026)',
  ]
  for (const c of certs) {
    page.drawText('•', { x: margin + 4, y, size: 8, font: helvetica, color: primaryColor })
    page.drawText(c, { x: margin + 14, y, size: 8, font: helvetica, color: primaryColor })
    y -= 10.5
  }

  // 7. Languages
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
  const outputDir = path.resolve('public/assets')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const primaryPath = path.join(outputDir, 'MD_Habib_Munsar_Ahmed_Resume.pdf')
  const aliasPath = path.join(outputDir, 'resume.pdf')

  fs.writeFileSync(primaryPath, pdfBytes)
  fs.writeFileSync(aliasPath, pdfBytes)
  console.log(`Generated ATS PDF: ${primaryPath} (${pdfBytes.length} bytes)`)
}

generateResume().catch(console.error)
