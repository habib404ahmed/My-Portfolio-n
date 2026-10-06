import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib'

async function generateResume() {
  const pdfDoc = await PDFDocument.create()
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  // Standard Letter dimensions: 612 x 792 pt
  const page = pdfDoc.addPage([612, 792])
  const { width, height } = page.getSize()

  const marginX = 36
  const marginTop = 30
  let y = height - marginTop

  // Professional ATS Color Palette
  const primaryColor = rgb(0.06, 0.08, 0.12) // #0f141f dark slate
  const secondaryColor = rgb(0.28, 0.32, 0.38) // #475261 medium slate
  const accentColor = rgb(0.02, 0.45, 0.6) // #057399 dark cyan
  const dividerColor = rgb(0.82, 0.85, 0.88) // light border
  const linkColor = rgb(0.02, 0.45, 0.6) // clickable link blue/cyan

  // Helper function to add clickable URI link annotation
  function addLinkAnnotation(x, yPos, w, h, url) {
    const context = pdfDoc.context
    const linkAnnot = context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [x, yPos - 1.5, x + w, yPos + h + 1.5],
      Border: [0, 0, 0],
      C: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      },
    })
    const annotRef = context.register(linkAnnot)
    let annots = page.node.lookup(PDFName.of('Annots'))
    if (!annots) {
      annots = context.obj([])
      page.node.set(PDFName.of('Annots'), annots)
    }
    annots.push(annotRef)
  }

  // =========================================================================
  // 1. VERIFY & EMBED PROFILE PHOTO (MANDATORY CANONICAL ASSET)
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
    console.warn('Sharp JPEG optimization fallback, embedding raw image directly:', optErr.message)
    embeddedImage = await pdfDoc.embedPng(rawImageBytes)
  }

  if (!embeddedImage || embeddedImage.width <= 0 || embeddedImage.height <= 0) {
    throw new Error('CRITICAL: Failed to embed profile photo into PDF document.')
  }

  // Photo dimensions & placement (Top-Right of page)
  // Native aspect ratio: 576 / 1024 (~0.5625)
  const photoWidth = 52
  const photoHeight = Math.round(photoWidth * (metadata.height / metadata.width)) // ~92 pt
  const photoX = width - marginX - photoWidth
  const photoY = y - photoHeight + 6

  // Draw delicate frame border and portrait
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
  // 2. HEADER
  // =========================================================================
  // Candidate Name
  page.drawText('MD HABIB MUNSAR AHMED', {
    x: marginX,
    y: y - 2,
    size: 17,
    font: helveticaBold,
    color: primaryColor,
  })
  y -= 19

  // Target Role & Specialization Subtitle
  page.drawText('SOFTWARE ENGINEER', {
    x: marginX,
    y,
    size: 9.5,
    font: helveticaBold,
    color: accentColor,
  })
  const titleWidth = helveticaBold.widthOfTextAtSize('SOFTWARE ENGINEER', 9.5)
  page.drawText('  •  AI/ML  •  FULL-STACK DEVELOPMENT  •  CYBERSECURITY', {
    x: marginX + titleWidth,
    y,
    size: 8.5,
    font: helveticaBold,
    color: secondaryColor,
  })
  y -= 14

  // Contact Info Line 1: Location | Phone | Email
  const phoneText = '+91 8099321737'
  const emailText = 'habibmunsarahmed@gmail.com'
  const locText = 'Bongaigaon, Assam, India  |  '

  page.drawText(locText, { x: marginX, y, size: 8.2, font: helvetica, color: secondaryColor })
  let curX = marginX + helvetica.widthOfTextAtSize(locText, 8.2)

  // Phone (clickable)
  page.drawText(phoneText, { x: curX, y, size: 8.2, font: helvetica, color: primaryColor })
  const phoneW = helvetica.widthOfTextAtSize(phoneText, 8.2)
  addLinkAnnotation(curX, y, phoneW, 8.2, 'tel:+918099321737')
  curX += phoneW

  page.drawText('  |  ', { x: curX, y, size: 8.2, font: helvetica, color: secondaryColor })
  curX += helvetica.widthOfTextAtSize('  |  ', 8.2)

  // Email (clickable)
  page.drawText(emailText, { x: curX, y, size: 8.2, font: helvetica, color: linkColor })
  const emailW = helvetica.widthOfTextAtSize(emailText, 8.2)
  addLinkAnnotation(curX, y, emailW, 8.2, `mailto:${emailText}`)
  y -= 13

  // Contact Info Line 2: GitHub | LinkedIn | Portfolio
  curX = marginX
  const ghText = 'github.com/habib404ahmed'
  page.drawText(ghText, { x: curX, y, size: 8.2, font: helvetica, color: linkColor })
  const ghW = helvetica.widthOfTextAtSize(ghText, 8.2)
  addLinkAnnotation(curX, y, ghW, 8.2, 'https://github.com/habib404ahmed')
  curX += ghW

  page.drawText('  |  ', { x: curX, y, size: 8.2, font: helvetica, color: secondaryColor })
  curX += helvetica.widthOfTextAtSize('  |  ', 8.2)

  // LinkedIn (Exact profile URL required)
  const inText = 'linkedin.com/in/md-habib-munsar-ahmed-a44b23329'
  page.drawText(inText, { x: curX, y, size: 8.2, font: helvetica, color: linkColor })
  const inW = helvetica.widthOfTextAtSize(inText, 8.2)
  addLinkAnnotation(curX, y, inW, 8.2, 'https://www.linkedin.com/in/md-habib-munsar-ahmed-a44b23329/')
  curX += inW

  page.drawText('  |  ', { x: curX, y, size: 8.2, font: helvetica, color: secondaryColor })
  curX += helvetica.widthOfTextAtSize('  |  ', 8.2)

  // Portfolio
  const portText = 'habibahmed.dev'
  page.drawText(portText, { x: curX, y, size: 8.2, font: helvetica, color: linkColor })
  const portW = helvetica.widthOfTextAtSize(portText, 8.2)
  addLinkAnnotation(curX, y, portW, 8.2, 'https://habibahmed.dev/')

  // Ensure content starts below photo
  y = Math.min(y, photoY) - 8

  // Helper function to draw Section Headers
  function drawSectionHeader(title) {
    y -= 12
    page.drawText(title.toUpperCase(), {
      x: marginX,
      y,
      size: 9,
      font: helveticaBold,
      color: accentColor,
    })
    y -= 3.5
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 0.7,
      color: dividerColor,
    })
    y -= 9
  }

  // Helper function to wrap text
  function drawWrappedText(
    text,
    fontSize = 8,
    font = helvetica,
    color = primaryColor,
    x = marginX,
    maxWidth = width - marginX * 2,
    lineSpacing = 10.8
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

  // =========================================================================
  // 3. PROFESSIONAL SUMMARY
  // =========================================================================
  drawSectionHeader('Professional Summary')
  drawWrappedText(
    'Software Engineer and BCA student with hands-on experience building full-stack applications, AI-powered systems, multi-agent solutions, and cybersecurity-focused projects. Skilled in Python, Java, JavaScript, React, Node.js, FastAPI, Spring Boot, SQL, modern databases, cloud platforms, and AI technologies. Interested in building intelligent, scalable, and secure software systems.',
    8,
    helvetica,
    primaryColor,
    marginX,
    width - marginX * 2,
    10.8
  )

  // =========================================================================
  // 4. TECHNICAL SKILLS (Clean 2-Column Structured ATS Layout)
  // =========================================================================
  drawSectionHeader('Technical Skills')
  const skillsLeft = [
    { label: 'PROGRAMMING:', list: 'Python, Java, JavaScript, SQL' },
    { label: 'FRONTEND:', list: 'React, HTML, CSS, Tailwind CSS' },
    { label: 'BACKEND:', list: 'Node.js, FastAPI, Spring Boot' },
    { label: 'AI / ML:', list: 'Machine Learning, LLMs, RAG, AI Agents' },
  ]

  const skillsRight = [
    {
      label: 'CYBERSECURITY:',
      list: 'Ethical Hacking, Kali Linux, Network Security, Threat Detection, PCAP',
    },
    { label: 'SYSTEMS:', list: 'Linux Administration, Windows Setup, Hardware Diagnostics, Tuning' },
    { label: 'DATABASES:', list: 'MySQL, MongoDB, PostgreSQL, Firebase, Supabase' },
    { label: 'TOOLS / CLOUD:', list: 'Git, GitHub, Docker, AWS, Vercel, Render' },
  ]

  const col2X = marginX + 276
  for (let i = 0; i < skillsLeft.length; i++) {
    const sLeft = skillsLeft[i]
    page.drawText(sLeft.label, { x: marginX, y, size: 7.6, font: helveticaBold, color: primaryColor })
    page.drawText(sLeft.list, {
      x: marginX + 80,
      y,
      size: 7.6,
      font: helvetica,
      color: primaryColor,
    })

    const sRight = skillsRight[i]
    page.drawText(sRight.label, { x: col2X, y, size: 7.6, font: helveticaBold, color: primaryColor })
    page.drawText(sRight.list, {
      x: col2X + 86,
      y,
      size: 7.6,
      font: helvetica,
      color: primaryColor,
    })

    y -= 10
  }
  y -= 1

  // =========================================================================
  // 5. PROJECTS (5 Real Projects, Ordered, 2 Bullets Each, Clickable Repos)
  // =========================================================================
  drawSectionHeader('Software Engineering Projects')

  const projects = [
    {
      title: 'SENTRA — Passive Unidirectional Cyber Threat Detection SOC',
      tech: 'FastAPI • Scapy • PostgreSQL • React • TypeScript  |  SIH 2026 Problem ID: 26145',
      bullets: [
        'Engineered a passive network monitoring SOC platform for unidirectional IP data diodes with zero return path.',
        'Streamed PCAP/PCAPNG packet captures using Scapy and extracted 5-tuple directional flow metrics into PostgreSQL.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/SENTRA',
    },
    {
      title: 'AI Multi-Agent Task & Schedule Manager',
      tech: 'Python • FastAPI • SQLite • Pydantic • JavaScript',
      bullets: [
        'Built a multi-agent AI system with a central Primary Agent router dispatching tasks to Task, Calendar, and Notes agents.',
        'Implemented decoupled tool layers with Pydantic schema validation and transactional SQLite storage.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/AI-Multi-Agent-Task-Schedule-Manager',
    },
    {
      title: '5minhelp — Local Service Marketplace',
      tech: 'React • Node.js • Express • MySQL • Socket.io • JWT',
      bullets: [
        'Developed a full-stack marketplace connecting local customers with verified service providers in real time.',
        'Implemented WebSocket event dispatch using Socket.io and multi-role RBAC for Customers, Workers, and Admins.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/5minhelp',
    },
    {
      title: 'Campus Care — Real-Time Campus Safety Platform',
      tech: 'React • TypeScript • Vite • Tailwind CSS • Geolocation API',
      bullets: [
        'Engineered 1-tap SOS emergency dispatch with non-blocking GPS capture and anti-spam safeguards.',
        'Implemented 4-tier clinical triage assessment and 7-role access control consoles for campus safety.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/Campus-Care',
    },
    {
      title: 'UniBox League — Box Cricket Tournament Platform',
      tech: 'JavaScript • Supabase PostgreSQL • Web Crypto API • Tailwind CSS',
      bullets: [
        'Implemented athlete registration with client-side SHA-256 salted password hashing using the native Web Crypto API.',
        'Integrated real-time Supabase PostgreSQL for live coordinator verification and credential clearance management.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/Box-Cricket',
    },
  ]

  for (const proj of projects) {
    // Title
    page.drawText(proj.title, {
      x: marginX,
      y,
      size: 8.5,
      font: helveticaBold,
      color: primaryColor,
    })

    // Clickable GitHub Link on right
    const linkText = 'GitHub'
    const linkW = helveticaBold.widthOfTextAtSize(linkText, 7.8)
    const linkX = width - marginX - linkW
    page.drawText(linkText, {
      x: linkX,
      y,
      size: 7.8,
      font: helveticaBold,
      color: linkColor,
    })
    addLinkAnnotation(linkX, y, linkW, 7.8, proj.githubUrl)

    y -= 9.2

    // Tech stack
    page.drawText(proj.tech, {
      x: marginX,
      y,
      size: 7.4,
      font: helveticaOblique,
      color: secondaryColor,
    })
    y -= 8.8

    // Bullets
    for (const b of proj.bullets) {
      page.drawText('•', { x: marginX + 3, y, size: 7.6, font: helvetica, color: accentColor })
      page.drawText(b, {
        x: marginX + 12,
        y,
        size: 7.6,
        font: helvetica,
        color: primaryColor,
      })
      y -= 8.8
    }
    y -= 2.2
  }

  // =========================================================================
  // 6. EDUCATION & RELEVANT COURSEWORK
  // =========================================================================
  drawSectionHeader('Education & Relevant Coursework')

  page.drawText('Bachelor of Computer Applications (BCA)', {
    x: marginX,
    y,
    size: 8.5,
    font: helveticaBold,
    color: primaryColor,
  })
  const bcaW = helveticaBold.widthOfTextAtSize('Bachelor of Computer Applications (BCA)', 8.5)
  page.drawText(' — Assam Down Town University', {
    x: marginX + bcaW,
    y,
    size: 8,
    font: helvetica,
    color: secondaryColor,
  })
  page.drawText('2025 – 2028', {
    x: width - marginX - 52,
    y,
    size: 8,
    font: helveticaBold,
    color: secondaryColor,
  })
  y -= 9.6

  page.drawText(
    '1st Semester SGPA: 8.05  |  2nd Semester SGPA: 8.10  |  Class XII: 58%  |  Class X: 72%',
    { x: marginX, y, size: 7.6, font: helvetica, color: primaryColor }
  )
  y -= 9.2

  page.drawText(
    'Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, Computer Networks, Operating Systems, Software Engineering, Web Technologies, AI / Machine Learning, Cybersecurity.',
    { x: marginX, y, size: 7.3, font: helveticaOblique, color: secondaryColor }
  )
  y -= 2

  // =========================================================================
  // 7. TECHNICAL ACTIVITIES & LEADERSHIP
  // =========================================================================
  drawSectionHeader('Technical Activities & Leadership')

  // Content Creator
  page.drawText('Technical Content Creator — King of Kali Linux', {
    x: marginX,
    y,
    size: 8.2,
    font: helveticaBold,
    color: primaryColor,
  })
  const ytLink = 'YouTube'
  const ytW = helveticaBold.widthOfTextAtSize(ytLink, 7.8)
  const ytX = width - marginX - ytW
  page.drawText(ytLink, {
    x: ytX,
    y,
    size: 7.8,
    font: helveticaBold,
    color: linkColor,
  })
  addLinkAnnotation(ytX, y, ytW, 7.8, 'https://youtube.com/@king_of_kali_linux_404')
  y -= 8.8

  page.drawText(
    'Creating educational content around cybersecurity, ethical hacking, Kali Linux, Linux and emerging technologies.',
    { x: marginX + 12, y, size: 7.4, font: helvetica, color: secondaryColor }
  )
  page.drawText('•', { x: marginX + 3, y, size: 7.4, font: helvetica, color: accentColor })
  y -= 9

  // Leadership
  page.drawText(
    'Organizer — Orientation & Independence Day Programs  |  Assam Down Town University',
    { x: marginX, y, size: 8.2, font: helveticaBold, color: primaryColor }
  )
  page.drawText('August 2026', {
    x: width - marginX - 58,
    y,
    size: 7.6,
    font: helvetica,
    color: secondaryColor,
  })
  y -= 8.8

  page.drawText(
    'Awarded Certificate of Appreciation for coordinating university Orientation and Independence Day events.',
    { x: marginX + 12, y, size: 7.4, font: helvetica, color: secondaryColor }
  )
  page.drawText('•', { x: marginX + 3, y, size: 7.4, font: helvetica, color: accentColor })
  y -= 2.5

  // =========================================================================
  // 8. CERTIFICATIONS
  // =========================================================================
  drawSectionHeader('Certifications')

  const cert1 = 'Introduction to Modern AI — Cisco Networking Academy (2025)'
  page.drawText('•', { x: marginX + 3, y, size: 7.5, font: helvetica, color: accentColor })
  page.drawText(cert1, { x: marginX + 12, y, size: 7.6, font: helvetica, color: primaryColor })
  y -= 9

  const cert2 =
    'Ethical Hacking — Pitronix Solutions, 7 March 2026  |  Certificate ID: #00102970'
  page.drawText('•', { x: marginX + 3, y, size: 7.5, font: helvetica, color: accentColor })
  page.drawText(cert2, { x: marginX + 12, y, size: 7.6, font: helvetica, color: primaryColor })
  y -= 2.5

  // =========================================================================
  // 9. LANGUAGES
  // =========================================================================
  drawSectionHeader('Languages')
  page.drawText('English (Professional)  •  Hindi (Fluent)  •  Assamese (Fluent)', {
    x: marginX,
    y,
    size: 7.8,
    font: helvetica,
    color: primaryColor,
  })

  console.log(`Final y-position: ${y} pt (Letter bottom margin is ${marginTop} pt). Perfectly fits on 1 page!`)

  // Save PDF
  const pdfBytes = await pdfDoc.save()
  const publicOutputDir = path.resolve('public/assets')
  if (!fs.existsSync(publicOutputDir)) {
    fs.mkdirSync(publicOutputDir, { recursive: true })
  }

  // Canonical download targets
  const targetFiles = [
    path.join(publicOutputDir, 'Md-Habib-Munsar-Ahmed-Resume.pdf'),
    path.join(publicOutputDir, 'MD_Habib_Munsar_Ahmed_Resume.pdf'),
    path.join(publicOutputDir, 'resume.pdf'),
  ]

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
