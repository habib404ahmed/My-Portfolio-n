export interface ResumeData {
  name: string
  title: string
  positioning: string
  contact: {
    email: string
    phone: string
    location: string
    github: string
    linkedin: string
    youtube: string
  }
  summary: string
  technicalSkills: {
    category: string
    skills: string[]
  }[]
  projects: {
    title: string
    subtitle: string
    technologies: string
    points: string[]
    githubUrl: string
  }[]
  education: {
    degree: string
    institution: string
    period: string
    details: string[]
  }[]
  certifications: {
    title: string
    issuer: string
    date: string
    credentialId?: string
    details: string
  }[]
  leadership: {
    role: string
    program?: string
    organization: string
    date: string
    description: string
    recognition?: string
  }[]
  languages: {
    name: string
    level: string
  }[]
}

export const resumeData: ResumeData = {
  name: 'Md Habib Munsar Ahmed',
  title: 'Software Engineer',
  positioning: 'AI/ML Engineering • Full-Stack Development • Cybersecurity & Ethical Hacking',
  contact: {
    email: 'habibmunsarahmed@gmail.com',
    phone: '8099321737',
    location: 'Bongaigaon, Assam, India',
    github: 'https://github.com/habib404ahmed',
    linkedin: 'https://www.linkedin.com/in/md-habib-munsar-ahmed-a44b23329/',
    youtube: 'https://youtube.com/@king_of_kali_linux_404',
  },
  summary:
    'Software Engineer and BCA student with hands-on experience building full-stack applications, AI-powered systems, multi-agent solutions, and cybersecurity-focused projects. Proficient in Python, Java, JavaScript, React, Node.js, FastAPI, Spring Boot, SQL, modern databases, cloud platforms, and AI technologies. Interested in building intelligent, scalable and secure software systems.',
  technicalSkills: [
    {
      category: 'Programming',
      skills: ['Python', 'Java', 'JavaScript', 'SQL'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'HTML', 'CSS', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'FastAPI', 'Spring Boot'],
    },
    {
      category: 'AI / ML',
      skills: ['Machine Learning', 'LLMs', 'RAG', 'AI Agents'],
    },
    {
      category: 'Cybersecurity',
      skills: ['Ethical Hacking', 'Kali Linux', 'Network Security', 'Vulnerability Assessment'],
    },
    {
      category: 'Systems',
      skills: ['Linux Admin', 'Windows Setup', 'Hardware Diagnostics', 'Optimization'],
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'Supabase'],
    },
    {
      category: 'Tools / Cloud',
      skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'Render'],
    },
  ],
  projects: [
    {
      title: 'SENTRA — Passive Unidirectional Cyber Threat Detection SOC',
      subtitle: 'Smart India Hackathon 2026 (Problem Statement 26145)',
      technologies: 'Python, FastAPI, Scapy, PostgreSQL 18, SQLAlchemy 2.x, React 19, TypeScript, Tailwind CSS',
      points: [
        'Engineered a passive network security monitoring SOC platform tailored for unidirectional IP links and hardware data diodes where return transmission is physically suppressed.',
        'Implemented streaming PCAP / PCAPNG packet ingestion using Scapy without loading entire multi-megabyte captures into memory.',
        'Extracted high-dimensional 5-tuple directional flow features (IAT, PPS, BPS, and payload entropy) stored in indexed PostgreSQL tables.',
        'Built a real-time React 19 Flow Explorer dashboard with multi-factor search and deep directional metadata inspection.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/SENTRA',
    },
    {
      title: 'AI Multi-Agent Task & Schedule Manager',
      subtitle: 'Autonomous Orchestration System',
      technologies: 'Python, FastAPI, SQLite, Pydantic, Vanilla JS, CSS3, HTML5',
      points: [
        'Architected a multi-agent AI system featuring a central Primary Agent router that dispatches natural language user requests to specialized domain agents.',
        'Designed autonomous sub-agents: Task Agent (priorities & queues), Calendar Agent (agendas), and Notes Agent (semantic tagging).',
        'Implemented decoupled tool layers backed by transactional SQLite storage and strict Pydantic model validation.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/AI-Multi-Agent-Task-Schedule-Manager',
    },
    {
      title: '5minhelp — Local Service Marketplace',
      subtitle: 'On-Demand Service Platform & Help Hub',
      technologies: 'React.js, Node.js, Express, MySQL 8.0, Socket.io, JWT Authentication',
      points: [
        'Developed a full-stack local service marketplace connecting customers with verified electricians, plumbers, tutors, and mechanics.',
        'Implemented real-time bidirectional WebSocket event channels with Socket.io for immediate order dispatches and status updates.',
        'Enforced role-based access control with JWT authentication for Customers, Service Workers, and Administrators over a relational MySQL 8.0 schema.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/5minhelp',
    },
    {
      title: 'Campus Care — Real-Time Campus Safety Platform',
      subtitle: 'Engineering Day Rapid-Coding Competition Entry',
      technologies: 'React, TypeScript, Vite, Tailwind CSS, HTML5 Geolocation API',
      points: [
        'Built a 1-tap SOS emergency dispatch application featuring non-blocking GPS capture and anti-spam duplicate request safeguards.',
        'Engineered a 4-tier clinical triage assessment system (Low, Moderate, High, Critical) with dedicated medical responder consoles.',
        'Designed fire hazard dispatch logic with automated priority escalation when trapped occupants are confirmed, supported by a 7-role RBAC architecture.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/Campus-Care',
    },
    {
      title: 'UniBox League (Box Cricket Tournament Portal)',
      subtitle: 'Sports Credentialing & Administration System',
      technologies: 'JavaScript, Supabase PostgreSQL, Web Crypto API (SHA-256), Tailwind CSS v4',
      points: [
        'Engineered an athlete registration portal with live photo headshots, document proof viewers, and inter-branch roster management.',
        'Implemented client-side cryptographic salted SHA-256 password hashing via native browser Web Crypto API before database persistence.',
        'Integrated Supabase PostgreSQL for real-time clearance tracking, zero-flicker hydration, and coordinator approval command controls.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/Box-Cricket',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Assam Down Town University',
      period: '2025 — 2028',
      details: [
        '1st Semester SGPA: 8.05 | 2nd Semester SGPA: 8.10',
        'Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks.',
      ],
    },
    {
      degree: 'Higher Secondary (Class XII)',
      institution: 'Assam State Board',
      period: 'Completed',
      details: ['Score: 58%'],
    },
    {
      degree: 'Secondary Examination (Class X)',
      institution: 'Assam State Board',
      period: 'Completed',
      details: ['Score: 72%'],
    },
  ],
  certifications: [
    {
      title: 'Introduction to Modern AI',
      issuer: 'Cisco Networking Academy',
      date: '2025',
      details: 'Foundations of artificial intelligence, machine learning, large language models, prompt engineering, and agent systems.',
    },
    {
      title: 'Ethical Hacking Certification',
      issuer: 'Pitronix Solutions',
      date: '7 March 2026',
      credentialId: '#00102970',
      details: 'Penetration testing methodologies, vulnerability discovery, perimeter network defenses, and zero-trust security practices.',
    },
    {
      title: 'Certificate of Appreciation',
      issuer: 'Sunstone / Assam Down Town University',
      date: 'August 2026',
      details: 'Recognized for program execution, student coordination, and event staging during university Orientation and Independence Day events.',
    },
  ],
  leadership: [
    {
      role: 'Organizer',
      program: 'Orientation & Independence Day Programs',
      organization: 'Assam Down Town University',
      date: 'August 2026',
      recognition: 'Certificate of Appreciation',
      description:
        'Recognized with a Certificate of Appreciation for dedicated efforts, valuable contribution, and active involvement in organizing Orientation and Independence Day Programs.',
    },
  ],
  languages: [
    { name: 'English', level: 'Professional' },
    { name: 'Hindi', level: 'Fluent' },
    { name: 'Assamese', level: 'Fluent' },
  ],
}
