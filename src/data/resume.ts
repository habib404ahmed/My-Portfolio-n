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
    portfolio: string
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
  relevantCoursework: string[]
  technicalActivities: {
    role: string
    platform: string
    url: string
    description: string
  }[]
  certifications: {
    title: string
    issuer: string
    date: string
    credentialId?: string
    details: string
    verifyUrl?: string
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
  positioning: 'AI/ML • Full-Stack Development • Cybersecurity',
  contact: {
    email: 'habibmunsarahmed@gmail.com',
    phone: '+91 8099321737',
    location: 'Bongaigaon, Assam, India',
    github: 'https://github.com/habib404ahmed',
    linkedin: 'https://www.linkedin.com/in/md-habib-munsar-ahmed-a44b23329/',
    portfolio: 'https://habibahmed.dev/',
    youtube: 'https://youtube.com/@king_of_kali_linux_404',
  },
  summary:
    'Software Engineer and BCA student with hands-on experience building full-stack applications, AI-powered systems, multi-agent solutions, and cybersecurity-focused projects. Skilled in Python, Java, JavaScript, React, Node.js, FastAPI, Spring Boot, SQL, modern databases, cloud platforms, and AI technologies. Interested in building intelligent, scalable, and secure software systems.',
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
      skills: [
        'Ethical Hacking',
        'Kali Linux',
        'Network Security',
        'Network Traffic Analysis',
        'Threat Detection',
        'PCAP Analysis',
      ],
    },
    {
      category: 'Systems',
      skills: ['Linux Administration', 'Windows Setup', 'Hardware Diagnostics', 'System Tuning'],
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
      subtitle: 'Smart India Hackathon 2026 (Problem ID: 26145)',
      technologies: 'FastAPI • Scapy • PostgreSQL • React • TypeScript',
      points: [
        'Engineered a passive network monitoring SOC platform for unidirectional IP data diodes with zero return path.',
        'Streamed PCAP/PCAPNG packet captures using Scapy and extracted 5-tuple directional flow metrics into PostgreSQL.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/SENTRA',
    },
    {
      title: 'AI Multi-Agent Task & Schedule Manager',
      subtitle: 'Autonomous Multi-Agent Orchestration System',
      technologies: 'Python • FastAPI • SQLite • Pydantic • JavaScript',
      points: [
        'Built a multi-agent AI system with a central Primary Agent router dispatching tasks to Task, Calendar, and Notes agents.',
        'Implemented decoupled tool layers with Pydantic schema validation and transactional SQLite storage.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/AI-Multi-Agent-Task-Schedule-Manager',
    },
    {
      title: '5minhelp — Local Service Marketplace',
      subtitle: 'On-Demand Service Platform & Real-Time Help Hub',
      technologies: 'React • Node.js • Express • MySQL • Socket.io • JWT',
      points: [
        'Developed a full-stack marketplace connecting local customers with verified service providers in real time.',
        'Implemented WebSocket event dispatch using Socket.io and multi-role RBAC for Customers, Workers, and Admins.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/5minhelp',
    },
    {
      title: 'Campus Care — Real-Time Campus Safety Platform',
      subtitle: 'Engineering Day Rapid-Coding Competition Entry',
      technologies: 'React • TypeScript • Vite • Tailwind CSS • Geolocation API',
      points: [
        'Engineered 1-tap SOS emergency dispatch with non-blocking GPS capture and anti-spam safeguards.',
        'Implemented 4-tier clinical triage assessment and 7-role access control consoles for campus safety.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/Campus-Care',
    },
    {
      title: 'UniBox League — Box Cricket Tournament Platform',
      subtitle: 'Sports Credentialing & Administration System',
      technologies: 'JavaScript • Supabase PostgreSQL • Web Crypto API • Tailwind CSS',
      points: [
        'Implemented athlete registration with client-side SHA-256 salted password hashing using the native Web Crypto API.',
        'Integrated real-time Supabase PostgreSQL for live coordinator verification and credential clearance management.',
      ],
      githubUrl: 'https://github.com/habib404ahmed/Box-Cricket',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Assam Down Town University',
      period: '2025–2028',
      details: ['1st Semester SGPA: 8.05', '2nd Semester SGPA: 8.10'],
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
  relevantCoursework: [
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Object-Oriented Programming',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
    'Web Technologies',
    'Artificial Intelligence / Machine Learning',
    'Cybersecurity',
  ],
  technicalActivities: [
    {
      role: 'Technical Content Creator',
      platform: 'King of Kali Linux',
      url: 'https://youtube.com/@king_of_kali_linux_404',
      description:
        'Creating educational content around cybersecurity, ethical hacking, Kali Linux, Linux and emerging technologies.',
    },
  ],
  certifications: [
    {
      title: 'Introduction to Modern AI',
      issuer: 'Cisco Networking Academy',
      date: '2025',
      details:
        'Foundations of artificial intelligence, machine learning, large language models, prompt engineering, and agent systems.',
    },
    {
      title: 'Ethical Hacking',
      issuer: 'Pitronix Solutions',
      date: '7 March 2026',
      credentialId: '#00102970',
      details:
        'Penetration testing methodologies, vulnerability discovery, perimeter network defenses, and zero-trust security practices.',
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
        'Recognized with a Certificate of Appreciation for organizing university Orientation and Independence Day programs with active student and faculty coordination.',
    },
  ],
  languages: [
    { name: 'English', level: 'Professional' },
    { name: 'Hindi', level: 'Fluent' },
    { name: 'Assamese', level: 'Fluent' },
  ],
}
