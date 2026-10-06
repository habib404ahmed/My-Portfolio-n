export interface ProjectPipelineStep {
  step: string
  label: string
}

export interface ProjectData {
  id: string
  number: string
  title: string
  tagline: string
  category: 'ai' | 'cybersecurity' | 'fullstack'
  categoryLabel: string
  shortDescription: string
  longDescription: string
  technologies: string[]
  features: string[]
  contribution: string
  githubUrl: string
  liveUrl?: string
  accentColor: string
  glowColor: string
  pipeline: ProjectPipelineStep[]
  metrics?: { label: string; value: string }[]
}

export const projectsData: ProjectData[] = [
  {
    id: 'sentra',
    number: '01',
    title: 'SENTRA',
    tagline: 'AI-Based Detection of Cyber Threats in Unidirectional IP Traffic',
    category: 'cybersecurity',
    categoryLabel: 'Cybersecurity • AI • Network Monitoring',
    shortDescription:
      'Passive network intrusion detection and SOC monitoring platform engineered specifically for unidirectional physical networks (optical data diodes and hardware simplex links).',
    longDescription:
      'Engineered for the Smart India Hackathon 2026 (Problem Statement 26145), SENTRA addresses the challenge of monitoring unidirectional IP traffic where traditional intrusion detection systems fail due to absent return ACKs and handshake suppression. SENTRA extracts high-dimensional forward flow characteristics, inter-arrival time (IAT) statistics, and payload entropy passively in real-time.',
    technologies: [
      'Python',
      'FastAPI',
      'Scapy',
      'PostgreSQL 18',
      'SQLAlchemy 2.x',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
    ],
    features: [
      'Secure PCAP / PCAPNG file format ingestion with deep magic-bytes verification',
      'Non-blocking background packet streaming with Scapy (PcapReader / PcapNgReader)',
      'Strict directional 5-tuple flow isolation (Src/Dst IP & Port, Protocol) reflecting diode reality',
      'Zero-return path feature calculation: PPS, BPS, duration, and packet inter-arrival times',
      'High-density SOC console with interactive Flow Explorer and directional metadata inspection',
    ],
    contribution:
      'Architected the end-to-end full-stack platform, implementing the streaming packet ingestion engine in Scapy, the directional PostgreSQL flow schema with SQLAlchemy/Alembic, and the React 19 SOC command dashboard.',
    githubUrl: 'https://github.com/habib404ahmed/SENTRA',
    liveUrl: undefined,
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    pipeline: [
      { step: '01', label: 'Network Packet Ingestion' },
      { step: '02', label: 'Streaming Scapy Parser' },
      { step: '03', label: 'Directional 5-Tuple Aggregation' },
      { step: '04', label: 'Flow Feature Extraction' },
      { step: '05', label: 'AI Detection & SOC Telemetry' },
    ],
    metrics: [
      { label: 'Capture Format', value: '.pcap / .pcapng' },
      { label: 'Flow Isolation', value: 'Strict 5-Tuple' },
      { label: 'Database', value: 'PostgreSQL 18' },
    ],
  },
  {
    id: 'ai-multi-agent',
    number: '02',
    title: 'AI Multi-Agent Task Schedule Manager',
    tagline: 'Autonomous Multi-Agent Task, Calendar & Notes Orchestration System',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence • LLM • Multi-Agent',
    shortDescription:
      'Full-stack multi-agent AI system coordinating dedicated specialized agents for task execution, calendar scheduling, and note synthesis.',
    longDescription:
      'An orchestration architecture built to demonstrate multi-agent coordination. A central Primary Agent acts as the intent router and reasoning controller, dispatching structured objectives to specialized domain agents (Task Agent, Calendar Agent, Notes Agent). Each agent interfaces with dedicated tools that persist operations directly into a validated SQLite database.',
    technologies: [
      'Python',
      'FastAPI',
      'SQLite',
      'Pydantic',
      'Vanilla JS',
      'CSS3',
      'HTML5',
    ],
    features: [
      'Central Primary Agent acting as the natural language intent router and task dispatcher',
      'Specialized Task Agent executing task creation, status updates, and priority queues',
      'Dedicated Calendar Agent managing date-based event scheduling and agenda queries',
      'Dedicated Notes Agent organizing information capture, retrieval, and tagging',
      'Isolated tool harness with Pydantic validation and transactional SQLite storage',
    ],
    contribution:
      'Designed and coded the entire multi-agent coordination architecture using FastAPI, including the NLP intent router, specialized agent logic, tool integration harness, and responsive web client.',
    githubUrl: 'https://github.com/habib404ahmed/AI-Multi-Agent-Task-Schedule-Manager',
    liveUrl: undefined,
    accentColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.25)',
    pipeline: [
      { step: '01', label: 'User Intent Input' },
      { step: '02', label: 'Primary Agent Router' },
      { step: '03', label: 'Specialized Sub-Agent Dispatch' },
      { step: '04', label: 'Tool Execution Harness' },
      { step: '05', label: 'Synthesized Action Output' },
    ],
    metrics: [
      { label: 'Agents', value: 'Primary + 3 Sub-Agents' },
      { label: 'Persistence', value: 'SQLite + Pydantic' },
      { label: 'Architecture', value: 'Decoupled Tools' },
    ],
  },
  {
    id: '5minhelp',
    number: '03',
    title: '5minhelp',
    tagline: 'Real-Time Local Service Marketplace & Help Hub',
    category: 'fullstack',
    categoryLabel: 'Full-Stack • Real-Time Web • Microservices',
    shortDescription:
      'A full-stack on-demand local service marketplace connecting homeowners and businesses with verified electricians, plumbers, tutors, and mechanics.',
    longDescription:
      '5minhelp provides real-time service discovery and order management. Built with a React SPA frontend and a Node.js + Express backend, it features bidirectional WebSocket channels via Socket.io for immediate order dispatches and status syncing, powered by a normalized MySQL relational database.',
    technologies: [
      'React.js',
      'Node.js',
      'Express',
      'MySQL 8.0',
      'Socket.io',
      'JWT Authentication',
      'Axios',
    ],
    features: [
      'Multi-role authentication with JWT supporting Customers, Service Workers, and Administrators',
      'Instant service requests with category filtering (Electricians, Plumbers, Tutors, Mechanics)',
      'Real-time order lifecycle events and status broadcasts using Socket.io',
      'Relational MySQL schema complete with foreign keys, seed data, and transactional integrity',
      'Comprehensive 9-page React client application with responsive contextual state management',
    ],
    contribution:
      'Built the full-stack system from scratch, creating the Express REST endpoints, MySQL relational schema, Socket.io event architecture, and the complete React application.',
    githubUrl: 'https://github.com/habib404ahmed/5minhelp',
    liveUrl: undefined,
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.25)',
    pipeline: [
      { step: '01', label: 'Local Service Request' },
      { step: '02', label: 'Category & Proximity Matching' },
      { step: '03', label: 'Socket.io Event Dispatch' },
      { step: '04', label: 'Worker Acceptance & Tracking' },
      { step: '05', label: 'Fulfilled Service & Audit Log' },
    ],
    metrics: [
      { label: 'Real-Time', value: 'Socket.io WebSockets' },
      { label: 'Database', value: 'MySQL 8.0' },
      { label: 'Security', value: 'JWT Route Guards' },
    ],
  },
  {
    id: 'campus-care',
    number: '04',
    title: 'Campus Care',
    tagline: 'Real-Time Campus Safety & Multi-Hazard Emergency Assistance',
    category: 'fullstack',
    categoryLabel: 'Campus Technology • Rapid Response • Incident Management',
    shortDescription:
      'Rapid-response campus safety web application featuring 1-tap SOS dispatch, clinical triage for medical incidents, and emergency fire hazard management.',
    longDescription:
      'Developed for the university Engineering Day Rapid-Coding Competition, Campus Care provides critical incident escalation across academic campuses. Includes non-blocking GPS capture, clinical symptom triaging with 4 severity levels, fire suppression response tracking, and a comprehensive 7-role access control structure.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'HTML5 Geolocation API',
      'State Management',
    ],
    features: [
      'Critical 1-Tap SOS Emergency Dispatch floating trigger with confirmation safeguards',
      'Non-blocking GPS geolocation capture with automatic fallback logic',
      'Structured medical triage (Low, Moderate, High, Critical) with clinical responder queue',
      'Fire & hazard incident console with trapped-occupants deterministic priority elevation',
      'Granular 7-role RBAC: Student, Teacher, Faculty, Security, Medical, Fire, and Chief Admin SOC',
    ],
    contribution:
      'Constructed the complete frontend architecture during the competition, implementing the emergency dispatch workflows, clinical triage calculations, hazard prioritizing logic, and 7 role-based dashboards.',
    githubUrl: 'https://github.com/habib404ahmed/Campus-Care',
    liveUrl: undefined,
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    pipeline: [
      { step: '01', label: '1-Tap SOS / Hazard Trigger' },
      { step: '02', label: 'Non-Blocking GPS Geolocation' },
      { step: '03', label: 'Severity Triage & Trapped Logic' },
      { step: '04', label: 'Multi-Role Responder Routing' },
      { step: '05', label: 'SOC Command Center Resolution' },
    ],
    metrics: [
      { label: 'Roles', value: '7 Distinct Portals' },
      { label: 'Triage Levels', value: '4 Severity Tiers' },
      { label: 'Dispatch', value: '1-Tap Instant SOS' },
    ],
  },
  {
    id: 'box-cricket',
    number: '05',
    title: 'Box Cricket (UniBox League)',
    tagline: 'Enterprise Tournament Management & Athlete Credentialing Portal',
    category: 'fullstack',
    categoryLabel: 'Sports Tech • Database Systems • Client Cryptography',
    shortDescription:
      'Box cricket tournament platform integrating live Supabase PostgreSQL persistence, native client-side cryptographic salted password hashing, and athlete clearance management.',
    longDescription:
      'Built for inter-department university cricket leagues, UniBox League handles high-volume athlete registrations, headshot photo identification, and certificate verification proofs. Features zero-flicker profile session restoration and a dedicated Coordinator Admin Command Center for real-time approvals and branch tournament tracking.',
    technologies: [
      'JavaScript',
      'Supabase PostgreSQL',
      'Web Crypto API (SHA-256)',
      'Tailwind CSS v4',
      'HTML5',
    ],
    features: [
      'Athlete registration portal with playing roles, branch selection, and headshot previews',
      'Client-side salted SHA-256 password hashing using native browser Web Crypto API',
      'Document proof viewer modal supporting sport certificate validation and inspection',
      'Zero-flicker pre-render session hydration preventing flashes on page reload',
      'Coordinator Admin Command Center with real-time tournament KPIs and one-click approvals',
    ],
    contribution:
      'Developed the application architecture, implementing browser-native cryptographic password hashing, Supabase database integration, proof viewing modals, and the coordinator administration dashboard.',
    githubUrl: 'https://github.com/habib404ahmed/Box-Cricket',
    liveUrl: undefined,
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    pipeline: [
      { step: '01', label: 'Athlete Portal Registration' },
      { step: '02', label: 'Native SHA-256 Salted Hashing' },
      { step: '03', label: 'Supabase PostgreSQL Ingestion' },
      { step: '04', label: 'Coordinator Proof Inspection' },
      { step: '05', label: 'Verified Athlete Clearance' },
    ],
    metrics: [
      { label: 'Database', value: 'Supabase PostgreSQL' },
      { label: 'Security', value: 'Native Web Crypto API' },
      { label: 'Clearing', value: 'Live Coordinator Review' },
    ],
  },
]
