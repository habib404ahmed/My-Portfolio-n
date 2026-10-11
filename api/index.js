// api/handler.ts
import express2 from "express";
import cookieParser from "cookie-parser";

// server/api.ts
import express from "express";
import multer from "multer";
import path2 from "path";
import fs2 from "fs";
import { exec } from "child_process";

// server/storage.ts
import fs from "fs";
import path from "path";

// src/data/profile.ts
var profile = {
  name: {
    first: "Md Habib",
    last: "Munsar Ahmed",
    full: "Md Habib Munsar Ahmed",
    display: ["MD HABIB", "MUNSAR AHMED"]
  },
  title: "Software Engineer",
  positioning: "AI/ML Engineering \u2022 Full-Stack Development \u2022 Cybersecurity & Ethical Hacking",
  tagline: "Software Engineer building intelligent, secure and scalable digital systems across AI, full-stack development and cybersecurity.",
  statement: "Software Engineer building intelligent, secure and scalable digital systems across AI, full-stack development and cybersecurity.",
  subStatement: "My engineering foundation was built by working across software, systems and security. Alongside application development, I have explored Linux, networking, ethical hacking, hardware troubleshooting and AI/ML\u2014giving me a broader understanding of how modern systems are built, deployed and secured.",
  location: "Bongaigaon, Assam, India",
  contact: {
    email: "habibmunsarahmed@gmail.com",
    phone: "8099321737"
  },
  social: {
    github: "https://github.com/habib404ahmed",
    linkedin: "https://www.linkedin.com/in/md-habib-munsar-ahmed-a44b23329/",
    youtube: "https://youtube.com/@king_of_kali_linux_404"
  },
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Assam Down Town University",
      period: "2025\u20132028",
      semesters: [
        { label: "1st Semester SGPA", score: 8.05 },
        { label: "2nd Semester SGPA", score: 8.1 }
      ],
      highlights: ["Data Structures & Algorithms", "Database Systems", "Object-Oriented Programming"]
    },
    {
      degree: "Higher Secondary (Class XII)",
      institution: "Assam State Board",
      period: "Completed",
      score: "58%"
    },
    {
      degree: "Secondary Examination (Class X)",
      institution: "Assam State Board",
      period: "Completed",
      score: "72%"
    }
  ],
  languages: [
    { name: "English", proficiency: "Professional", code: "EN" },
    { name: "Hindi", proficiency: "Fluent", code: "HI" },
    { name: "Assamese", proficiency: "Fluent", code: "AS" }
  ],
  leadership: [
    {
      id: "orientation-2026",
      role: "Organizer",
      program: "Orientation & Independence Day Programs",
      institution: "Assam Down Town University",
      date: "August 2026",
      description: "Contributed to the organization and successful execution of university Orientation and Independence Day programs, supporting event coordination and program activities.",
      certificateAvailable: true
    }
  ],
  resume: {
    available: true,
    path: "/assets/Md-Habib-Munsar-Ahmed-Resume.pdf"
  },
  photo: {
    available: true,
    path: "/assets/images/profile.webp",
    fallback: "/assets/images/profile.jpg",
    alt: "Md Habib Munsar Ahmed \u2014 Software Engineer",
    aspectRatio: "576 / 1024"
  }
};

// src/data/projects.ts
var projectsData = [
  {
    id: "sentra",
    number: "01",
    title: "SENTRA",
    tagline: "AI-Based Detection of Cyber Threats in Unidirectional IP Traffic",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity \u2022 AI \u2022 Network Monitoring",
    shortDescription: "Passive network intrusion detection and SOC monitoring platform engineered specifically for unidirectional physical networks (optical data diodes and hardware simplex links).",
    longDescription: "Engineered for the Smart India Hackathon 2026 (Problem Statement 26145), SENTRA addresses the challenge of monitoring unidirectional IP traffic where traditional intrusion detection systems fail due to absent return ACKs and handshake suppression. SENTRA extracts high-dimensional forward flow characteristics, inter-arrival time (IAT) statistics, and payload entropy passively in real-time.",
    technologies: [
      "Python",
      "FastAPI",
      "Scapy",
      "PostgreSQL 18",
      "SQLAlchemy 2.x",
      "React 19",
      "TypeScript",
      "Tailwind CSS"
    ],
    features: [
      "Secure PCAP / PCAPNG file format ingestion with deep magic-bytes verification",
      "Non-blocking background packet streaming with Scapy (PcapReader / PcapNgReader)",
      "Strict directional 5-tuple flow isolation (Src/Dst IP & Port, Protocol) reflecting diode reality",
      "Zero-return path feature calculation: PPS, BPS, duration, and packet inter-arrival times",
      "High-density SOC console with interactive Flow Explorer and directional metadata inspection"
    ],
    contribution: "Architected the end-to-end full-stack platform, implementing the streaming packet ingestion engine in Scapy, the directional PostgreSQL flow schema with SQLAlchemy/Alembic, and the React 19 SOC command dashboard.",
    githubUrl: "https://github.com/habib404ahmed/SENTRA",
    liveUrl: void 0,
    accentColor: "#00D9FF",
    glowColor: "rgba(0, 217, 255, 0.25)",
    pipeline: [
      { step: "01", label: "Network Packet Ingestion" },
      { step: "02", label: "Streaming Scapy Parser" },
      { step: "03", label: "Directional 5-Tuple Aggregation" },
      { step: "04", label: "Flow Feature Extraction" },
      { step: "05", label: "AI Detection & SOC Telemetry" }
    ],
    metrics: [
      { label: "Capture Format", value: ".pcap / .pcapng" },
      { label: "Flow Isolation", value: "Strict 5-Tuple" },
      { label: "Database", value: "PostgreSQL 18" }
    ]
  },
  {
    id: "ai-multi-agent",
    number: "02",
    title: "AI Multi-Agent Task Schedule Manager",
    tagline: "Autonomous Multi-Agent Task, Calendar & Notes Orchestration System",
    category: "ai",
    categoryLabel: "Artificial Intelligence \u2022 LLM \u2022 Multi-Agent",
    shortDescription: "Full-stack multi-agent AI system coordinating dedicated specialized agents for task execution, calendar scheduling, and note synthesis.",
    longDescription: "An orchestration architecture built to demonstrate multi-agent coordination. A central Primary Agent acts as the intent router and reasoning controller, dispatching structured objectives to specialized domain agents (Task Agent, Calendar Agent, Notes Agent). Each agent interfaces with dedicated tools that persist operations directly into a validated SQLite database.",
    technologies: [
      "Python",
      "FastAPI",
      "SQLite",
      "Pydantic",
      "Vanilla JS",
      "CSS3",
      "HTML5"
    ],
    features: [
      "Central Primary Agent acting as the natural language intent router and task dispatcher",
      "Specialized Task Agent executing task creation, status updates, and priority queues",
      "Dedicated Calendar Agent managing date-based event scheduling and agenda queries",
      "Dedicated Notes Agent organizing information capture, retrieval, and tagging",
      "Isolated tool harness with Pydantic validation and transactional SQLite storage"
    ],
    contribution: "Designed and coded the entire multi-agent coordination architecture using FastAPI, including the NLP intent router, specialized agent logic, tool integration harness, and responsive web client.",
    githubUrl: "https://github.com/habib404ahmed/AI-Multi-Agent-Task-Schedule-Manager",
    liveUrl: void 0,
    accentColor: "#8B7CFF",
    glowColor: "rgba(139, 124, 255, 0.25)",
    pipeline: [
      { step: "01", label: "User Intent Input" },
      { step: "02", label: "Primary Agent Router" },
      { step: "03", label: "Specialized Sub-Agent Dispatch" },
      { step: "04", label: "Tool Execution Harness" },
      { step: "05", label: "Synthesized Action Output" }
    ],
    metrics: [
      { label: "Agents", value: "Primary + 3 Sub-Agents" },
      { label: "Persistence", value: "SQLite + Pydantic" },
      { label: "Architecture", value: "Decoupled Tools" }
    ]
  },
  {
    id: "5minhelp",
    number: "03",
    title: "5minhelp",
    tagline: "Real-Time Local Service Marketplace & Help Hub",
    category: "fullstack",
    categoryLabel: "Full-Stack \u2022 Real-Time Web \u2022 Microservices",
    shortDescription: "A full-stack on-demand local service marketplace connecting homeowners and businesses with verified electricians, plumbers, tutors, and mechanics.",
    longDescription: "5minhelp provides real-time service discovery and order management. Built with a React SPA frontend and a Node.js + Express backend, it features bidirectional WebSocket channels via Socket.io for immediate order dispatches and status syncing, powered by a normalized MySQL relational database.",
    technologies: [
      "React.js",
      "Node.js",
      "Express",
      "MySQL 8.0",
      "Socket.io",
      "JWT Authentication",
      "Axios"
    ],
    features: [
      "Multi-role authentication with JWT supporting Customers, Service Workers, and Administrators",
      "Instant service requests with category filtering (Electricians, Plumbers, Tutors, Mechanics)",
      "Real-time order lifecycle events and status broadcasts using Socket.io",
      "Relational MySQL schema complete with foreign keys, seed data, and transactional integrity",
      "Comprehensive 9-page React client application with responsive contextual state management"
    ],
    contribution: "Built the full-stack system from scratch, creating the Express REST endpoints, MySQL relational schema, Socket.io event architecture, and the complete React application.",
    githubUrl: "https://github.com/habib404ahmed/5minhelp",
    liveUrl: void 0,
    accentColor: "#6575FF",
    glowColor: "rgba(101, 117, 255, 0.25)",
    pipeline: [
      { step: "01", label: "Local Service Request" },
      { step: "02", label: "Category & Proximity Matching" },
      { step: "03", label: "Socket.io Event Dispatch" },
      { step: "04", label: "Worker Acceptance & Tracking" },
      { step: "05", label: "Fulfilled Service & Audit Log" }
    ],
    metrics: [
      { label: "Real-Time", value: "Socket.io WebSockets" },
      { label: "Database", value: "MySQL 8.0" },
      { label: "Security", value: "JWT Route Guards" }
    ]
  },
  {
    id: "campus-care",
    number: "04",
    title: "Campus Care",
    tagline: "Real-Time Campus Safety & Multi-Hazard Emergency Assistance",
    category: "fullstack",
    categoryLabel: "Campus Technology \u2022 Rapid Response \u2022 Incident Management",
    shortDescription: "Rapid-response campus safety web application featuring 1-tap SOS dispatch, clinical triage for medical incidents, and emergency fire hazard management.",
    longDescription: "Developed for the university Engineering Day Rapid-Coding Competition, Campus Care provides critical incident escalation across academic campuses. Includes non-blocking GPS capture, clinical symptom triaging with 4 severity levels, fire suppression response tracking, and a comprehensive 7-role access control structure.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "HTML5 Geolocation API",
      "State Management"
    ],
    features: [
      "Critical 1-Tap SOS Emergency Dispatch floating trigger with confirmation safeguards",
      "Non-blocking GPS geolocation capture with automatic fallback logic",
      "Structured medical triage (Low, Moderate, High, Critical) with clinical responder queue",
      "Fire & hazard incident console with trapped-occupants deterministic priority elevation",
      "Granular 7-role RBAC: Student, Teacher, Faculty, Security, Medical, Fire, and Chief Admin SOC"
    ],
    contribution: "Constructed the complete frontend architecture during the competition, implementing the emergency dispatch workflows, clinical triage calculations, hazard prioritizing logic, and 7 role-based dashboards.",
    githubUrl: "https://github.com/habib404ahmed/Campus-Care",
    liveUrl: void 0,
    accentColor: "#38E8FF",
    glowColor: "rgba(56, 232, 255, 0.25)",
    pipeline: [
      { step: "01", label: "1-Tap SOS / Hazard Trigger" },
      { step: "02", label: "Non-Blocking GPS Geolocation" },
      { step: "03", label: "Severity Triage & Trapped Logic" },
      { step: "04", label: "Multi-Role Responder Routing" },
      { step: "05", label: "SOC Command Center Resolution" }
    ],
    metrics: [
      { label: "Roles", value: "7 Distinct Portals" },
      { label: "Triage Levels", value: "4 Severity Tiers" },
      { label: "Dispatch", value: "1-Tap Instant SOS" }
    ]
  },
  {
    id: "box-cricket",
    number: "05",
    title: "Box Cricket (UniBox League)",
    tagline: "Enterprise Tournament Management & Athlete Credentialing Portal",
    category: "fullstack",
    categoryLabel: "Sports Tech \u2022 Database Systems \u2022 Client Cryptography",
    shortDescription: "Box cricket tournament platform integrating live Supabase PostgreSQL persistence, native client-side cryptographic salted password hashing, and athlete clearance management.",
    longDescription: "Built for inter-department university cricket leagues, UniBox League handles high-volume athlete registrations, headshot photo identification, and certificate verification proofs. Features zero-flicker profile session restoration and a dedicated Coordinator Admin Command Center for real-time approvals and branch tournament tracking.",
    technologies: [
      "JavaScript",
      "Supabase PostgreSQL",
      "Web Crypto API (SHA-256)",
      "Tailwind CSS v4",
      "HTML5"
    ],
    features: [
      "Athlete registration portal with playing roles, branch selection, and headshot previews",
      "Client-side salted SHA-256 password hashing using native browser Web Crypto API",
      "Document proof viewer modal supporting sport certificate validation and inspection",
      "Zero-flicker pre-render session hydration preventing flashes on page reload",
      "Coordinator Admin Command Center with real-time tournament KPIs and one-click approvals"
    ],
    contribution: "Developed the application architecture, implementing browser-native cryptographic password hashing, Supabase database integration, proof viewing modals, and the coordinator administration dashboard.",
    githubUrl: "https://github.com/habib404ahmed/Box-Cricket",
    liveUrl: void 0,
    accentColor: "#00D9FF",
    glowColor: "rgba(0, 217, 255, 0.25)",
    pipeline: [
      { step: "01", label: "Athlete Portal Registration" },
      { step: "02", label: "Native SHA-256 Salted Hashing" },
      { step: "03", label: "Supabase PostgreSQL Ingestion" },
      { step: "04", label: "Coordinator Proof Inspection" },
      { step: "05", label: "Verified Athlete Clearance" }
    ],
    metrics: [
      { label: "Database", value: "Supabase PostgreSQL" },
      { label: "Security", value: "Native Web Crypto API" },
      { label: "Clearing", value: "Live Coordinator Review" }
    ]
  }
];

// src/data/techStack.ts
var techDomains = [
  {
    id: "languages",
    label: "LANGUAGES",
    shortLabel: "LANG",
    color: "#00D9FF",
    glowColor: "rgba(0, 217, 255, 0.16)",
    description: "Core computational languages & data querying",
    visualHint: "code-streams",
    tech: [
      {
        name: "Python",
        description: "AI/ML pipelines, security automation, FastAPI",
        role: "High-Level Systems & AI Programming Language",
        usedFor: [
          "High-throughput asynchronous FastAPI service development",
          "AI / ML inference pipelines & statistical feature extraction",
          "Autonomous multi-agent orchestration & NLP intent routing",
          "Low-level packet streaming & Scapy network automation"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Streaming Scapy packet parser, directional 5-tuple extraction & FastAPI telemetry core",
            tag: "Core Engine & Ingestion"
          },
          {
            projectId: "ai-multi-agent",
            projectName: "AI Multi-Agent Task Schedule Manager",
            roleDescription: "Multi-agent controller architecture, intent router & Pydantic tool execution harness",
            tag: "Agent Coordination"
          }
        ]
      },
      {
        name: "Java",
        description: "Object-oriented architecture, Spring Boot services",
        role: "Enterprise Object-Oriented Language",
        usedFor: [
          "Object-oriented system modeling & clean software patterns",
          "Modular enterprise architectures & inversion of control",
          "Type-safe data manipulation & foundational data structures",
          "Production-grade backend engineering paradigms"
        ],
        projects: []
      },
      {
        name: "JavaScript",
        description: "Modern responsive web applications & Node.js",
        role: "Dynamic Full-Stack Web & Scripting Language",
        usedFor: [
          "Interactive reactive interfaces & custom browser state management",
          "Asynchronous event loops & WebSocket real-time communication",
          "Client-side cryptographic salted password hashing",
          "DOM lifecycle management & modern Single Page Applications"
        ],
        projects: [
          {
            projectId: "5minhelp",
            projectName: "5minhelp",
            roleDescription: "Full-stack client SPA state management & real-time Socket.io lifecycle events",
            tag: "Full-Stack Runtime"
          },
          {
            projectId: "box-cricket",
            projectName: "Box Cricket (UniBox League)",
            roleDescription: "Interactive athlete portal, session hydration & client-side cryptographic hashing",
            tag: "Client Systems"
          }
        ]
      },
      {
        name: "SQL",
        description: "Relational schemas, indexing & transactional queries",
        role: "Declarative Relational Database Query Language",
        usedFor: [
          "ACID transactional schema design & data normalization",
          "Directional network telemetry queries & composite indexing",
          "Complex multi-table joins & relational constraint modeling",
          "Database migrations, schema versioning & query optimization"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "PostgreSQL directional flow tables indexed by 5-tuple (Src/Dst IP & Port, Protocol)",
            tag: "Flow Schema & Indexing"
          },
          {
            projectId: "5minhelp",
            projectName: "5minhelp",
            roleDescription: "MySQL relational schema with foreign key cascades, seed data & order logs",
            tag: "Transactional Storage"
          },
          {
            projectId: "box-cricket",
            projectName: "Box Cricket (UniBox League)",
            roleDescription: "Supabase PostgreSQL athlete registrations, team structures & approval status",
            tag: "Relational Store"
          }
        ]
      }
    ]
  },
  {
    id: "frontend",
    label: "FRONTEND",
    shortLabel: "UI",
    color: "#6575FF",
    glowColor: "rgba(101, 117, 255, 0.16)",
    description: "Modern reactive interfaces & design systems",
    visualHint: "components",
    tech: [
      {
        name: "React",
        description: "Component-driven reactive UI applications",
        role: "Component-Driven Reactive UI Library",
        usedFor: [
          "Declarative component hierarchies & reusable UI design systems",
          "High-density real-time operational consoles & telemetry explorer",
          "Contextual state orchestration & unidirectional data flow",
          "Accessible, keyboard-navigable interactive glass modules"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "React 19 SOC command console with real-time Flow Explorer & directional inspection",
            tag: "SOC Console"
          },
          {
            projectId: "5minhelp",
            projectName: "5minhelp",
            roleDescription: "Comprehensive 9-page responsive marketplace with role-based dashboard views",
            tag: "Marketplace SPA"
          },
          {
            projectId: "campus-care",
            projectName: "Campus Care",
            roleDescription: "Rapid emergency response interface featuring 1-tap SOS trigger & 7 role portals",
            tag: "Emergency UI"
          }
        ]
      },
      {
        name: "HTML",
        description: "Semantic, accessible document structures",
        role: "Semantic Web Markup Standard",
        usedFor: [
          "WCAG-compliant semantic element hierarchies (nav, main, section, dialog)",
          "Accessible ARIA state management (aria-modal, aria-expanded, aria-controls)",
          "High-reliability emergency forms with fallback input mechanisms",
          "Multi-viewport responsiveness & document meta optimization"
        ],
        projects: [
          {
            projectId: "campus-care",
            projectName: "Campus Care",
            roleDescription: "Accessible emergency dispatch forms & clinical severity triage controls",
            tag: "Accessible Forms"
          },
          {
            projectId: "box-cricket",
            projectName: "Box Cricket (UniBox League)",
            roleDescription: "Structured credentialing forms with proof modal inspection layouts",
            tag: "Proof Modals"
          },
          {
            projectId: "ai-multi-agent",
            projectName: "AI Multi-Agent Task Schedule Manager",
            roleDescription: "Lightweight semantic frontend client layout for multi-agent intent input",
            tag: "Agent Interface"
          }
        ]
      },
      {
        name: "CSS",
        description: "Modern responsive layouts, grid architectures & typography",
        role: "Cascading Style Sheets & Visual Presentation",
        usedFor: [
          "Fluid viewport typography using CSS clamp() mathematics",
          "Spatial CSS Grid and Flexbox alignment systems",
          "Hardware-accelerated transforms & Liquid Glass blur/reflection filters",
          "Theme tokens, dark mode elevation & cinematic color grading"
        ],
        projects: [
          {
            projectId: "ai-multi-agent",
            projectName: "AI Multi-Agent Task Schedule Manager",
            roleDescription: "Custom CSS3 responsive dashboard layout with dark theme typography",
            tag: "Dashboard Theme"
          }
        ]
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first design tokens & rapid system styling",
        role: "Utility-First Design Token Engine",
        usedFor: [
          "Consistent architectural design token application across components",
          "Responsive breakpoint optimization (mobile, tablet, desktop)",
          "State variants (hover, active, focus-visible) with zero stylesheet bloat",
          "Rapid production-ready UI development in competitive hackathons"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Cybersecurity SOC color hierarchy, directional flow chips & telemetry layout",
            tag: "SOC System"
          },
          {
            projectId: "campus-care",
            projectName: "Campus Care",
            roleDescription: "High-visibility emergency priority badges & clinical triage color tiers",
            tag: "Emergency Styling"
          },
          {
            projectId: "box-cricket",
            projectName: "Box Cricket (UniBox League)",
            roleDescription: "Coordinator command center dashboard layouts and athlete badges",
            tag: "Coordinator Dashboard"
          }
        ]
      }
    ]
  },
  {
    id: "backend",
    label: "BACKEND",
    shortLabel: "API",
    color: "#00D9FF",
    glowColor: "rgba(0, 217, 255, 0.16)",
    description: "High-throughput APIs & microservices",
    visualHint: "api-flows",
    tech: [
      {
        name: "Node.js",
        description: "Asynchronous event-driven server runtime & Express",
        role: "Asynchronous Event-Driven JavaScript Runtime",
        usedFor: [
          "High-concurrency RESTful microservices with Express routing",
          "Bidirectional real-time WebSocket communication via Socket.io",
          "JWT authentication middleware & route protection gates",
          "Asynchronous database connectivity with connection pooling"
        ],
        projects: [
          {
            projectId: "5minhelp",
            projectName: "5minhelp",
            roleDescription: "Express REST backend API, Socket.io event dispatch & MySQL database integration",
            tag: "Express & Socket.io"
          }
        ]
      },
      {
        name: "FastAPI",
        description: "High-performance Python asynchronous APIs with Pydantic",
        role: "High-Performance Asynchronous Python Web Framework",
        usedFor: [
          "Non-blocking async endpoints capable of streaming telemetry",
          "Strict data validation & serialization using Pydantic schemas",
          "Automatic interactive OpenAPI / Swagger documentation",
          "Integration with streaming packet parsers & AI agent loops"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Real-time telemetry endpoints, streaming PCAP ingestion & flow feature querying",
            tag: "Streaming Ingestion"
          },
          {
            projectId: "ai-multi-agent",
            projectName: "AI Multi-Agent Task Schedule Manager",
            roleDescription: "Multi-agent orchestration server, NLP intent routing & tool execution APIs",
            tag: "Agent Dispatcher"
          }
        ]
      },
      {
        name: "Spring Boot",
        description: "Enterprise-grade modular Java web applications",
        role: "Enterprise Modular Java Application Framework",
        usedFor: [
          "Enterprise layered backend microservice design",
          "Dependency injection & modular architecture separation",
          "Enterprise security standards & transaction management",
          "Robust production-ready application scaffolding"
        ],
        projects: []
      }
    ]
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    shortLabel: "AI",
    color: "#38E8FF",
    glowColor: "rgba(56, 232, 255, 0.16)",
    description: "Predictive intelligence & autonomous agents",
    visualHint: "neural-net",
    tech: [
      {
        name: "Machine Learning",
        description: "Hands-on predictive modeling & scikit-learn pipelines",
        role: "Statistical Learning & Anomaly Modeling",
        usedFor: [
          "High-dimensional network traffic feature vector extraction",
          "Inter-arrival time (IAT) distribution & burst rate statistical modeling",
          "Passive unidirectional packet payload entropy calculation",
          "Anomaly scoring algorithms without bidirectional feedback"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Unidirectional flow feature extraction: PPS, BPS, duration, and packet inter-arrival times",
            tag: "Anomaly Feature Core"
          }
        ]
      },
      {
        name: "LLMs & Chains",
        description: "Large language model prompt chains & reasoning",
        role: "Large Language Model Prompt & Reasoning Chains",
        usedFor: [
          "Structured prompt chains for multi-step task decomposition",
          "Natural language user intent parsing & parameter extraction",
          "Context-grounded reasoning & instruction-following synthesis",
          "Deterministic schema output generation from open-ended prompts"
        ],
        projects: [
          {
            projectId: "ai-multi-agent",
            projectName: "AI Multi-Agent Task Schedule Manager",
            roleDescription: "Natural language intent classification routing commands to specialized domain agents",
            tag: "Intent Reasoning"
          }
        ]
      },
      {
        name: "RAG Systems",
        description: "Retrieval-augmented generation & vector querying",
        role: "Retrieval-Augmented Generation Architecture",
        usedFor: [
          "Grounding generative outputs in validated persistent databases",
          "Context retrieval pipelines preventing model hallucinations",
          "Query-based document synthesis & structured note retrieval",
          "Domain-specific knowledge representation and recall"
        ],
        projects: [
          {
            projectId: "ai-multi-agent",
            projectName: "AI Multi-Agent Task Schedule Manager",
            roleDescription: "Context-grounded notes retrieval & knowledge synthesis across user requests",
            tag: "Knowledge Retrieval"
          }
        ]
      },
      {
        name: "AI Agents",
        description: "Autonomous goal-driven multi-agent task orchestration",
        role: "Autonomous Goal-Driven Multi-Agent Systems",
        usedFor: [
          "Central Primary Agent orchestrating specialized domain sub-agents",
          "Isolated tool execution harnesses with strict input validation",
          "Asynchronous task scheduling & agenda queue coordination",
          "Stateful agent memory persistence in validated databases"
        ],
        projects: [
          {
            projectId: "ai-multi-agent",
            projectName: "AI Multi-Agent Task Schedule Manager",
            roleDescription: "Primary router dispatching to Task Agent, Calendar Agent & Notes Agent with SQLite tools",
            tag: "Multi-Agent Network"
          }
        ]
      }
    ]
  },
  {
    id: "security",
    label: "CYBERSECURITY",
    shortLabel: "SEC",
    color: "#00D9FF",
    glowColor: "rgba(0, 217, 255, 0.16)",
    description: "Ethical hacking & defensive architecture",
    visualHint: "network-topology",
    tech: [
      {
        name: "Ethical Hacking",
        description: "Hands-on vulnerability assessment & security auditing",
        role: "Offensive Security & Threat Modeling",
        usedFor: [
          "Passive network threat reconnaissance & attack path analysis",
          "Simulated penetration modeling on unidirectional physical links",
          "Security posture evaluation & perimeter defense validation",
          "Vulnerability classification aligned with CVSS standards"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Threat analysis for optical data diodes & unidirectional hardware simplex links (SIH 2026)",
            tag: "Diode Threat Model"
          }
        ]
      },
      {
        name: "Penetration Testing",
        description: "Working knowledge of offensive tools & attack vectors",
        role: "Vulnerability Assessment & Attack Surface Testing",
        usedFor: [
          "Active port scanning & service fingerprinting methodologies",
          "Exploit surface identification & security verification",
          "Network packet manipulation & header spoofing analysis",
          "Comprehensive security audit reporting & remediation advice"
        ],
        projects: []
      },
      {
        name: "Kali Linux Tools",
        description: "Practical exposure to Metasploit, Burp Suite & Nmap",
        role: "Specialized Security & Forensics Toolset",
        usedFor: [
          "Network mapping & port enumeration using Nmap",
          "Deep packet inspection & protocol analysis via Wireshark",
          "Hands-on vulnerability assessment with Metasploit & Burp Suite",
          "Traffic capture validation against optical diode constraints"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "PCAP / PCAPNG capture file format ingestion with deep magic-bytes verification",
            tag: "PCAP Ingestion & Audit"
          }
        ]
      },
      {
        name: "Linux Security",
        description: "System hardening, permission models & audit logging",
        role: "Operating System Hardening & Access Governance",
        usedFor: [
          "POSIX permission structures & least-privilege service execution",
          "System audit logging & process monitoring under isolated users",
          "Hardened network socket configurations & buffer tuning",
          "Defense-in-depth isolation for real-time telemetry daemons"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Hardened Linux host environment for streaming packet captures & isolated worker processes",
            tag: "Hardened Runtime"
          }
        ]
      }
    ]
  },
  {
    id: "systems",
    label: "SYSTEMS",
    shortLabel: "SYS",
    color: "#6575FF",
    glowColor: "rgba(101, 117, 255, 0.16)",
    description: "Hardware, operating systems & troubleshooting",
    visualHint: "hardware-board",
    tech: [
      {
        name: "Linux Admin",
        description: "Working knowledge of shell scripting & configuration",
        role: "Operating System Administration & Shell Automation",
        usedFor: [
          "Bash shell automation for service orchestration & maintenance",
          "Systemd daemon management, service isolation & auto-recovery",
          "Performance metrics profiling (htop, iostat, vmstat, netstat)",
          "Kernel networking parameters & buffer tuning for packet streams"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Automated background packet streaming worker daemon configuration & systemd integration",
            tag: "Worker Daemons"
          }
        ]
      },
      {
        name: "Windows Systems",
        description: "OS installation, recovery & driver configuration",
        role: "Desktop & OS Architecture Management",
        usedFor: [
          "OS installation, environment recovery & driver configuration",
          "System registry diagnostics & policy management",
          "PowerShell scripting for environment automation",
          "Peripheral hardware diagnostic benchmarking"
        ],
        projects: []
      },
      {
        name: "Hardware Diagnostics",
        description: "Hands-on hardware troubleshooting & PC assembly",
        role: "Physical Computing & Hardware Diagnostics",
        usedFor: [
          "Hardware assembly, component validation & POST diagnostics",
          "Thermal management, voltage profiling & bottleneck isolation",
          "Physical network interfaces & optical fiber transceiver handling",
          "Hardware simplex links & optical data diode characteristics"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Analysis of physical optical data diodes and hardware simplex links with zero return paths",
            tag: "Physical Diode Analysis"
          }
        ]
      },
      {
        name: "System Optimization",
        description: "Performance tuning, resource monitoring & cleanup",
        role: "System Resource Profiling & Performance Tuning",
        usedFor: [
          "Memory allocation tuning & memory leak elimination",
          "CPU scheduling optimization & thread pool calibration",
          "Disk I/O serialization & buffering for high-throughput feeds",
          "Zero-copy data ingestion pipelines reducing CPU overhead"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Low-latency streaming packet parsing using Scapy PcapReader with memory-bounded buffers",
            tag: "Stream Optimization"
          }
        ]
      }
    ]
  },
  {
    id: "networking",
    label: "NETWORKING",
    shortLabel: "NET",
    color: "#38E8FF",
    glowColor: "rgba(56, 232, 255, 0.16)",
    description: "Protocols, traffic inspection & routing",
    visualHint: "network-mesh",
    tech: [
      {
        name: "TCP/IP Architecture",
        description: "Working knowledge of packet routing & 5-tuple flows",
        role: "Core Internet Protocol Suite Architecture",
        usedFor: [
          "Strict directional 5-tuple flow isolation (Src/Dst IP & Port, Protocol)",
          "Header dissection (Ethernet, IPv4, IPv6, TCP, UDP, ICMP)",
          "Zero-return path behavior where ACKs & handshakes are absent",
          "Packet inter-arrival time (IAT) and flow duration analysis"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Strict directional 5-tuple flow isolation reflecting optical diode reality without reverse handshakes",
            tag: "5-Tuple Flow Engine"
          }
        ]
      },
      {
        name: "Network Scanning",
        description: "Port scanning & protocol discovery using Nmap & Scapy",
        role: "Packet Parsing & Network Protocol Discovery",
        usedFor: [
          "Non-blocking background packet streaming with Scapy",
          "PcapReader and PcapNgReader streaming file extraction",
          "Active & passive port scanning with protocol discovery",
          "Traffic inspection across high-dimensional directional flows"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Streaming Scapy parser passively processing PCAP/PCAPNG packet streams in real-time",
            tag: "Scapy Stream Parser"
          }
        ]
      },
      {
        name: "Firewalls & Defense",
        description: "Traffic rules, port management & defense strategies",
        role: "Perimeter Network Security & Traffic Control",
        usedFor: [
          "Ingress/egress rule design & defensive perimeter policies",
          "Unidirectional traffic enforcement preventing reverse data leaks",
          "Packet filtering architectures & port security configurations",
          "Air-gapped network segment protection paradigms"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Architected for air-gapped critical infrastructure networks protected by physical data diodes",
            tag: "Perimeter Defense"
          }
        ]
      },
      {
        name: "VPNs & Protocols",
        description: "Practical exposure to encrypted tunnels & DNS resolution",
        role: "Encrypted Tunnels & Protocol Mechanics",
        usedFor: [
          "Encrypted virtual private network tunneling protocols",
          "Transport Layer Security (TLS) cryptographic handshake principles",
          "DNS resolution mechanisms & DNS spoofing countermeasures",
          "Secure routing architectures across distributed nodes"
        ],
        projects: []
      }
    ]
  },
  {
    id: "databases",
    label: "DATABASES",
    shortLabel: "DATA",
    color: "#6575FF",
    glowColor: "rgba(101, 117, 255, 0.16)",
    description: "ACID storage, caching & cloud persistence",
    visualHint: "data-flow",
    tech: [
      {
        name: "PostgreSQL",
        description: "Advanced relational storage with telemetry schemas",
        role: "Advanced Open-Source Relational Database",
        usedFor: [
          "High-throughput telemetry storage & composite 5-tuple indexing",
          "Relational schema modeling with SQLAlchemy 2.x and Alembic",
          "Transactional integrity & high-frequency bulk insert pipelines",
          "Analytical time-series flow aggregation and query performance"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "PostgreSQL 18 database storing high-dimensional directional flow records with composite indexes",
            tag: "Flow Database (PG 18)"
          }
        ]
      },
      {
        name: "MySQL",
        description: "Relational ACID persistence with normalized models",
        role: "ACID-Compliant Relational Database Management System",
        usedFor: [
          "Normalized relational schema design with foreign key constraints",
          "ACID transaction guarantees for marketplace service orders",
          "Connection pooling & query optimization for Express APIs",
          "User credential storage & audit log persistence"
        ],
        projects: [
          {
            projectId: "5minhelp",
            projectName: "5minhelp",
            roleDescription: "MySQL 8.0 normalized database for service orders, providers, users & audit logs",
            tag: "Order Database (MySQL 8)"
          }
        ]
      },
      {
        name: "MongoDB",
        description: "NoSQL document storage for unstructured datasets",
        role: "Document-Oriented NoSQL Database",
        usedFor: [
          "Flexible document modeling for unstructured telemetry payloads",
          "High-velocity write throughput for dynamic log events",
          "Nested JSON document indexing & aggregation pipelines",
          "Rapid prototyping for schemaless application datasets"
        ],
        projects: []
      },
      {
        name: "Supabase & Firebase",
        description: "Real-time database, auth & Row-Level Security",
        role: "Cloud Database & Real-Time Backend-as-a-Service",
        usedFor: [
          "Managed PostgreSQL with granular Row-Level Security (RLS)",
          "Real-time database subscriptions syncing across clients",
          "Client-side authentication integration & session hydration",
          "Secure document and certificate storage bucket management"
        ],
        projects: [
          {
            projectId: "box-cricket",
            projectName: "Box Cricket (UniBox League)",
            roleDescription: "Supabase PostgreSQL database persisting athlete registrations, proof documents & approvals",
            tag: "Cloud DB & Storage"
          }
        ]
      }
    ]
  },
  {
    id: "infrastructure",
    label: "INFRASTRUCTURE",
    shortLabel: "INFRA",
    color: "#8B7CFF",
    glowColor: "rgba(139, 124, 255, 0.16)",
    description: "DevOps, containerization & edge deployment",
    visualHint: "deployment-pipeline",
    tech: [
      {
        name: "Git & GitHub",
        description: "Distributed version control & collaborative PR workflows",
        role: "Distributed Version Control & Collaboration Platform",
        usedFor: [
          "Branch management workflows (Gitflow) & semantic versioning",
          "Atomic commit hygiene & detailed technical change logs",
          "Collaborative pull request reviews & conflict resolution",
          "Open-source repository governance & issue tracking"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Complete version-controlled repository with CI guidelines & architectural documentation",
            tag: "GitHub Repository"
          },
          {
            projectId: "ai-multi-agent",
            projectName: "AI Multi-Agent Task Schedule Manager",
            roleDescription: "Modular codebase repository with clear multi-agent architecture and installation steps",
            tag: "GitHub Repository"
          },
          {
            projectId: "5minhelp",
            projectName: "5minhelp",
            roleDescription: "Full-stack monorepo containing React frontend and Node.js backend services",
            tag: "GitHub Repository"
          },
          {
            projectId: "campus-care",
            projectName: "Campus Care",
            roleDescription: "Hackathon competition repository with rapid commits and triage logic",
            tag: "GitHub Repository"
          },
          {
            projectId: "box-cricket",
            projectName: "Box Cricket (UniBox League)",
            roleDescription: "Tournament management system with client-side crypto hashing algorithms",
            tag: "GitHub Repository"
          }
        ]
      },
      {
        name: "Docker",
        description: "Immutable container packaging & isolated environments",
        role: "Containerization & Environment Isolation Platform",
        usedFor: [
          "Multi-stage Dockerfile builds for optimized production images",
          "Multi-container service orchestration using Docker Compose",
          "Isolated local development environments for PostgreSQL & APIs",
          "Consistent deployment artifacts eliminating environment drift"
        ],
        projects: [
          {
            projectId: "sentra",
            projectName: "SENTRA",
            roleDescription: "Containerized PostgreSQL database and backend worker execution environments",
            tag: "Service Containers"
          }
        ]
      },
      {
        name: "AWS & Cloud Edge",
        description: "Cloud compute, storage & edge deployment patterns",
        role: "Cloud Infrastructure & Edge Services",
        usedFor: [
          "Cloud virtual machine compute provisioning (EC2)",
          "Scalable object storage bucket management (S3)",
          "Serverless edge function execution and API routing",
          "Cloud network architecture & VPC security group configuration"
        ],
        projects: []
      },
      {
        name: "Vercel & Render",
        description: "Production server orchestration & edge runtime",
        role: "Modern Edge & Production Hosting Platforms",
        usedFor: [
          "Continuous deployment (CI/CD) pipelines triggered on git push",
          "Global CDN edge caching & sub-millisecond static delivery",
          "Zero-downtime serverless function execution and API hosting",
          "Production environment management & preview deployments"
        ],
        projects: [
          {
            projectId: "portfolio",
            projectName: "Portfolio Website",
            roleDescription: "Production edge deployment on Vercel with global CDN acceleration and custom domain routing",
            tag: "Edge CDN & CI/CD"
          }
        ]
      }
    ]
  }
];

// src/data/capabilities.ts
var capabilities = [
  {
    id: "ai-apps",
    title: "AI-Powered Applications",
    domain: "AI / ML",
    color: "#a78bfa",
    description: "End-to-end intelligent applications using LLMs, RAG, and autonomous agents.",
    flow: [
      { step: "01", label: "Data Input" },
      { step: "02", label: "LLM Processing" },
      { step: "03", label: "RAG Retrieval" },
      { step: "04", label: "Agent Reasoning" },
      { step: "05", label: "Action Output" }
    ]
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Applications",
    domain: "Full-Stack",
    color: "#818cf8",
    description: "Complete web applications from UI to database and deployment.",
    flow: [
      { step: "01", label: "Frontend UI" },
      { step: "02", label: "REST API" },
      { step: "03", label: "Backend Logic" },
      { step: "04", label: "Database Layer" },
      { step: "05", label: "Cloud Deploy" }
    ]
  },
  {
    id: "secure-systems",
    title: "Secure Software Systems",
    domain: "Cybersecurity",
    color: "#10b981",
    description: "Applications built with security principles and tested for vulnerabilities.",
    flow: [
      { step: "01", label: "Application" },
      { step: "02", label: "Network Layer" },
      { step: "03", label: "Threat Analysis" },
      { step: "04", label: "Security Response" },
      { step: "05", label: "Hardened System" }
    ]
  },
  {
    id: "rest-apis",
    title: "REST APIs",
    domain: "Backend",
    color: "#34d399",
    description: "Scalable and documented API services using FastAPI, Node.js, and Spring Boot.",
    flow: [
      { step: "01", label: "Client Request" },
      { step: "02", label: "Auth Layer" },
      { step: "03", label: "Business Logic" },
      { step: "04", label: "Data Store" },
      { step: "05", label: "Response" }
    ]
  },
  {
    id: "realtime",
    title: "Real-Time Applications",
    domain: "Full-Stack",
    color: "#06b6d4",
    description: "Live-updating applications with WebSockets and real-time databases.",
    flow: [
      { step: "01", label: "Event Trigger" },
      { step: "02", label: "WebSocket" },
      { step: "03", label: "Server Broadcast" },
      { step: "04", label: "Live Update" },
      { step: "05", label: "State Sync" }
    ]
  },
  {
    id: "cloud-deployed",
    title: "Cloud-Deployed Applications",
    domain: "DevOps",
    color: "#38bdf8",
    description: "Production applications deployed to AWS, Vercel, and Render with CI/CD.",
    flow: [
      { step: "01", label: "Local Dev" },
      { step: "02", label: "Containerize" },
      { step: "03", label: "CI Pipeline" },
      { step: "04", label: "Cloud Deploy" },
      { step: "05", label: "Live Production" }
    ]
  },
  {
    id: "systems-support",
    title: "Systems & Technical Support",
    domain: "Systems",
    color: "#f59e0b",
    description: "Hands-on systems administration, hardware diagnostics, Windows & Linux setup, driver installation, network troubleshooting, and system optimization.",
    flow: [
      { step: "01", label: "Diagnostic Scan" },
      { step: "02", label: "Hardware/OS Setup" },
      { step: "03", label: "Driver Config" },
      { step: "04", label: "Tuning & Recovery" },
      { step: "05", label: "Verified System" }
    ]
  }
];

// src/data/timeline.ts
var timelineEvents = [
  {
    id: "bca-foundation",
    year: "2025",
    period: "2025 \u2014 2028",
    label: "EDUCATION",
    subtitle: "Bachelor of Computer Applications (BCA) \u2014 AI & ML Focus",
    description: "Pursuing BCA at Assam Down Town University with a dedicated academic and practical focus on Artificial Intelligence, Machine Learning, and core algorithm design. Achieved 8.05 SGPA (1st Sem) and 8.10 SGPA (2nd Sem).",
    type: "foundation",
    color: "#6575FF"
  },
  {
    id: "systems-experience",
    year: "2024",
    period: "2024 \u2014 Present",
    label: "SYSTEMS EXPERIENCE",
    subtitle: "Hardware Diagnostics & Systems Engineering",
    description: "Hands-on practical experience diagnosing hardware faults, assembling and configuring PC builds, performing clean dual-boot OS installations (Windows/Linux), driver management, and system-level performance optimization.",
    type: "foundation",
    color: "#6575FF"
  },
  {
    id: "cybersecurity-learning",
    year: "2024",
    period: "2024 \u2014 Present",
    label: "CYBERSECURITY",
    subtitle: "Self-Directed Ethical Hacking & Kali Linux Mastery",
    description: "Independent exploration into penetration testing, Kali Linux terminal tools, network scanning, firewall defense, and vulnerability auditing across legal practice labs and security challenges.",
    type: "foundation",
    color: "#00D9FF"
  },
  {
    id: "ai-exploration",
    year: "2025",
    period: "Late 2025",
    label: "AI FOUNDATION",
    subtitle: "Introduction to Modern AI \u2014 Cisco Networking Academy",
    description: "Earned Cisco certification exploring modern artificial intelligence foundations, machine learning mechanisms, multimodal systems, and practical agent applications.",
    type: "certification",
    certificateRef: "cisco-modern-ai",
    color: "#38E8FF"
  },
  {
    id: "technical-growth",
    year: "2025",
    period: "2025 \u2014 2026",
    label: "PROJECT SYSTEMS",
    subtitle: "System Architecture & Production Engineering",
    description: "Engineered five comprehensive software systems spanning AI threat detection (SENTRA), multi-agent frameworks, local service hubs, campus emergency dispatch, and athletic management.",
    type: "projects",
    connectedProjects: [
      "SENTRA",
      "AI Multi-Agent",
      "5minhelp",
      "Campus Care",
      "Box Cricket"
    ],
    color: "#00D9FF"
  },
  {
    id: "content-creator",
    year: "2025",
    period: "2024 \u2014 Present",
    label: "CONTENT CREATOR",
    subtitle: "Technical Content Creator \u2014 King of Kali Linux",
    description: "Creating educational content around cybersecurity, ethical hacking, Kali Linux, Linux and emerging technologies, with a focus on making technical concepts accessible and practical.",
    externalUrl: "https://youtube.com/@king_of_kali_linux_404",
    externalLabel: "Visit YouTube Channel",
    type: "leadership",
    color: "#8B7CFF"
  },
  {
    id: "ethical-hacking",
    year: "2026",
    period: "7 March 2026",
    label: "CERTIFIED DEFENSE",
    subtitle: "Ethical Hacking \u2014 Pitronix Solutions (#00102970)",
    description: "Formally assessed and certified in ethical penetration testing standards, perimeter defenses, zero-trust validation, and security auditing.",
    type: "certification",
    certificateRef: "ethical-hacking",
    color: "#00D9FF"
  },
  {
    id: "university-leadership",
    year: "2026",
    period: "August 2026",
    label: "LEADERSHIP",
    subtitle: "Event Organizer \u2014 Orientation & Independence Day",
    description: "Recognized with a Certificate of Appreciation by Sunstone / Assam Down Town University for organizing university programs, managing event logistics, and supporting campus activities.",
    type: "leadership",
    certificateRef: "adtu-sunstone-appreciation",
    color: "#6575FF"
  },
  {
    id: "future-chapter",
    year: "2028",
    period: "Looking Ahead",
    label: "NEXT CHAPTER",
    subtitle: "Expected BCA Graduation & Beyond",
    description: "The engineering path remains open and forward-looking. Continuing to build scalable software, contribute to impactful teams, and master cutting-edge systems.",
    type: "future",
    isOpenNode: true,
    color: "#F4F7FA"
  }
];

// src/data/certifications.ts
var certifications = [
  {
    id: "cisco-modern-ai",
    number: "01",
    index: "01",
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    type: "Certificate of Course Completion",
    recipient: "Habib Munsar Ahmed",
    date: "27 September 2025",
    year: 2025,
    category: "ai",
    categoryLabel: "AI / Machine Learning",
    image: "/assets/certificates/01-cisco-modern-ai.jpg",
    imagePath: "/assets/certificates/01-cisco-modern-ai.jpg",
    imageWebp: "/assets/certificates/01-cisco-modern-ai.webp",
    downloadUrl: "/assets/certificates/01-cisco-modern-ai.jpg",
    verified: true,
    description: "Certificate of Course Completion issued by Cisco Networking Academy certifying completion of the Introduction to Modern AI curriculum, covering AI/ML fundamentals, object detection, image segmentation, language translation, LLMs, prompt engineering, LLM chatbots, tool-using LLMs, and multimodal prompting.",
    learningThemes: [
      "AI & Machine Learning Fundamentals",
      "Object Detection & Image Segmentation",
      "Language Translation Mechanisms",
      "Large Language Models (LLMs)",
      "Prompt Engineering & Multimodal Prompts",
      "LLM-Enabled Chatbots & Tool Integrations"
    ]
  },
  {
    id: "ethical-hacking",
    number: "02",
    index: "02",
    title: "Ethical Hacking Certification",
    issuer: "Pitronix Solutions",
    type: "Certificate of Completion",
    recipient: "Md Habib Munsar Ahmed",
    date: "07 March 2026",
    year: 2026,
    certificateId: "#00102970",
    category: "security",
    categoryLabel: "Cybersecurity",
    image: "/assets/certificates/02-ethical-hacking.jpg",
    imagePath: "/assets/certificates/02-ethical-hacking.jpg",
    imageWebp: "/assets/certificates/02-ethical-hacking.webp",
    downloadUrl: "/assets/certificates/02-ethical-hacking.jpg",
    verified: true,
    description: "Certificate of Completion issued by Pitronix Solutions (#00102970) certifying successful completion of the Ethical Hacking Certification, establishing verified competencies in ethical penetration testing, vulnerability discovery, perimeter network defenses, and defensive auditing.",
    learningThemes: [
      "Penetration Testing Workflows",
      "Vulnerability Assessment & Exploitation Control",
      "Network Security Auditing",
      "Defensive Monitoring & Packet Inspection",
      "Zero-Trust Architectural Hardening"
    ]
  },
  {
    id: "adtu-sunstone-appreciation",
    number: "03",
    index: "03",
    title: "Certificate of Appreciation",
    issuer: "Sunstone / Assam Down Town University",
    type: "Certificate of Appreciation",
    recipient: "Md Habib Munsar Ahmed",
    date: "03 August 2026 \u2013 19 August 2026",
    year: 2026,
    category: "recognition",
    categoryLabel: "Leadership & Involvement",
    image: "/assets/certificates/03-adtu-sunstone-appreciation.jpg",
    imagePath: "/assets/certificates/03-adtu-sunstone-appreciation.jpg",
    imageWebp: "/assets/certificates/03-adtu-sunstone-appreciation.webp",
    downloadUrl: "/assets/certificates/03-adtu-sunstone-appreciation.jpg",
    verified: true,
    description: "Certificate of Appreciation conferred by Sunstone and Assam Down Town University in recognition of dedicated efforts, valuable contribution, and active involvement as Organizer of Orientation and Independence Day Programs at ADTU campus from 3 August 2026 to 19 August 2026.",
    learningThemes: [
      "University Orientation Staging",
      "Independence Day Program Coordination",
      "Campus Logistics & Operational Execution",
      "Student Leadership & Public Event Stewardship"
    ]
  }
];

// src/data/defaultContent.ts
function getDefaultContent() {
  return {
    schemaVersion: 1,
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    lastPublished: (/* @__PURE__ */ new Date()).toISOString(),
    hero: {
      name: {
        first: profile.name.first,
        last: profile.name.last,
        full: profile.name.full,
        display: profile.name.display
      },
      title: profile.title,
      roleBadge: "AVAILABLE FOR SOFTWARE ENGINEERING ROLES",
      mainHeading: {
        text: "MD HABIB\nMUNSAR AHMED",
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        fontSize: { desktop: 76, tablet: 56, mobile: 40 },
        fontWeight: { desktop: 800, tablet: 800, mobile: 800 },
        lineHeight: { desktop: 0.98, tablet: 1.05, mobile: 1.1 },
        letterSpacing: { desktop: -1.5, tablet: -1, mobile: -0.5 },
        textAlign: { desktop: "left", tablet: "left", mobile: "left" },
        color: "#F5F8FA",
        opacity: 1,
        maxWidth: { desktop: "780px", tablet: "100%", mobile: "100%" },
        marginTop: { desktop: 0, tablet: 0, mobile: 0 },
        marginBottom: { desktop: 16, tablet: 14, mobile: 12 },
        textTransform: "uppercase",
        textWrap: "balance"
      },
      description: {
        text: profile.statement,
        fontFamily: "'Inter', sans-serif",
        fontSize: { desktop: 18, tablet: 16, mobile: 15 },
        fontWeight: { desktop: 400, tablet: 400, mobile: 400 },
        lineHeight: { desktop: 1.65, tablet: 1.6, mobile: 1.55 },
        letterSpacing: { desktop: 0, tablet: 0, mobile: 0 },
        textAlign: { desktop: "left", tablet: "left", mobile: "left" },
        color: "#A8B4C2",
        opacity: 0.95,
        maxWidth: { desktop: "620px", tablet: "100%", mobile: "100%" },
        marginTop: { desktop: 0, tablet: 0, mobile: 0 },
        marginBottom: { desktop: 28, tablet: 24, mobile: 20 },
        textWrap: "pretty"
      },
      availability: {
        status: "Available",
        text: "Actively interviewing for Software Engineering, Full-Stack & AI Roles",
        active: true
      },
      ctaPrimary: {
        label: "EXPLORE PROJECTS",
        link: "#projects",
        visible: true
      },
      ctaSecondary: {
        label: "VIEW RESUME",
        link: "#resume",
        visible: true
      },
      profilePhoto: {
        path: profile.photo.path,
        fallback: profile.photo.fallback,
        alt: profile.photo.alt,
        desktopCrop: {
          x: 50,
          y: 40,
          scale: 1,
          rotate: 0,
          flipH: false,
          flipV: false,
          aspectRatio: "1:1",
          objectFit: "cover",
          borderRadius: 24,
          shadowIntensity: 0.4,
          opacity: 1
        },
        tabletCrop: {
          x: 50,
          y: 40,
          scale: 1,
          rotate: 0,
          flipH: false,
          flipV: false,
          aspectRatio: "1:1",
          objectFit: "cover",
          borderRadius: 20,
          shadowIntensity: 0.4,
          opacity: 1
        },
        mobileCrop: {
          x: 50,
          y: 40,
          scale: 1,
          rotate: 0,
          flipH: false,
          flipV: false,
          aspectRatio: "1:1",
          objectFit: "cover",
          borderRadius: 16,
          shadowIntensity: 0.4,
          opacity: 1
        }
      },
      heroHeight: "100dvh",
      contentWidth: "1280px",
      columnProportions: "50/50",
      show3DVisual: true,
      bgAtmosphereIntensity: 0.85
    },
    about: {
      title: "ENGINEER PROFILE",
      badge: "ARCHITECTURAL PROFILE",
      positioning: profile.positioning,
      location: profile.location,
      statement: {
        text: profile.statement,
        fontSize: { desktop: 20, tablet: 18, mobile: 16 },
        fontWeight: { desktop: 500, tablet: 500, mobile: 500 },
        lineHeight: { desktop: 1.6, tablet: 1.55, mobile: 1.5 },
        letterSpacing: { desktop: 0, tablet: 0, mobile: 0 },
        textAlign: { desktop: "left", tablet: "left", mobile: "left" },
        color: "#F5F8FA",
        opacity: 1,
        marginTop: { desktop: 0, tablet: 0, mobile: 0 },
        marginBottom: { desktop: 16, tablet: 14, mobile: 12 }
      },
      subStatement: {
        text: profile.subStatement,
        fontSize: { desktop: 16, tablet: 15, mobile: 14 },
        fontWeight: { desktop: 400, tablet: 400, mobile: 400 },
        lineHeight: { desktop: 1.65, tablet: 1.6, mobile: 1.55 },
        letterSpacing: { desktop: 0, tablet: 0, mobile: 0 },
        textAlign: { desktop: "left", tablet: "left", mobile: "left" },
        color: "#A8B4C2",
        opacity: 0.9,
        marginTop: { desktop: 0, tablet: 0, mobile: 0 },
        marginBottom: { desktop: 24, tablet: 20, mobile: 16 }
      },
      experienceHighlights: [
        {
          id: "bca",
          title: "BCA (AI & ML Focus)",
          subtitle: "Assam Down Town University",
          description: "1st Sem: 8.05 SGPA \u2022 2nd Sem: 8.10 SGPA",
          metric: "8.10 SGPA"
        },
        {
          id: "systems",
          title: "Systems & Hardware",
          subtitle: "Diagnostics & Kernel Optimization",
          description: "Hands-on troubleshooting, dual-boot setups, and driver optimization.",
          metric: "2+ Yrs"
        },
        {
          id: "security",
          title: "Cybersecurity",
          subtitle: "Kali Linux & Defensive Systems",
          description: "Independent vulnerability analysis and unidirectional diode research.",
          metric: "SIH Finalist"
        }
      ],
      profileCard: {
        photoPath: profile.photo.path,
        photoCrop: {
          x: 50,
          y: 45,
          scale: 1,
          rotate: 0,
          flipH: false,
          flipV: false,
          aspectRatio: "3:4",
          objectFit: "cover",
          borderRadius: 24,
          shadowIntensity: 0.5,
          opacity: 1
        },
        role: "Software Engineer",
        status: "Active Systems Developer"
      }
    },
    techStack: {
      categories: techDomains.map((domain) => ({
        id: domain.id,
        label: domain.label,
        shortLabel: domain.shortLabel,
        color: domain.color,
        glowColor: domain.glowColor,
        description: domain.description,
        visualHint: domain.visualHint,
        enabled: true,
        tech: domain.tech.map((t) => ({
          name: t.name,
          description: t.description,
          role: t.role,
          usedFor: t.usedFor,
          projects: t.projects
        }))
      }))
    },
    capabilities: capabilities.map((cap) => ({
      id: cap.id,
      title: cap.title,
      domain: cap.domain,
      color: cap.color,
      description: cap.description,
      flow: cap.flow.map((f) => ({ step: f.step, label: f.label }))
    })),
    education: profile.education.map((edu) => ({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      score: edu.score,
      semesters: edu.semesters,
      highlights: edu.highlights
    })),
    projects: projectsData.map((p) => ({
      id: p.id,
      number: p.number,
      title: p.title,
      tagline: p.tagline,
      category: p.category,
      categoryLabel: p.categoryLabel,
      shortDescription: p.shortDescription,
      longDescription: p.longDescription,
      technologies: p.technologies,
      features: p.features,
      contribution: p.contribution,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      accentColor: p.accentColor,
      glowColor: p.glowColor,
      featured: true,
      status: "active",
      visible: true,
      pipeline: p.pipeline.map((step) => ({ step: step.step, label: step.label })),
      metrics: p.metrics
    })),
    timeline: timelineEvents.map((t) => ({
      id: t.id,
      year: t.year,
      period: t.period,
      label: t.label,
      subtitle: t.subtitle,
      description: t.description,
      type: t.type,
      isOpenNode: t.isOpenNode,
      connectedProjects: t.connectedProjects,
      certificateRef: t.certificateRef,
      externalUrl: t.externalUrl,
      externalLabel: t.externalLabel,
      color: t.color
    })),
    certifications: certifications.map((c) => ({
      id: c.id,
      number: c.number,
      index: c.index,
      title: c.title,
      issuer: c.issuer,
      type: c.type,
      recipient: c.recipient,
      date: c.date,
      year: c.year,
      category: c.category,
      categoryLabel: c.categoryLabel,
      image: c.image,
      imageWebp: c.imageWebp,
      downloadUrl: c.downloadUrl,
      verified: c.verified,
      description: c.description,
      learningThemes: c.learningThemes,
      visible: true,
      credentialId: c.certificateId
    })),
    resume: {
      available: true,
      path: "/assets/Md-Habib-Munsar-Ahmed-Resume.pdf",
      filename: "Md-Habib-Munsar-Ahmed-Resume.pdf",
      downloadButtonText: "DOWNLOAD RESUME (PDF)",
      supportingText: "ATS-Friendly & Comprehensive 2-Page Technical Resume",
      lastGenerated: "2026-03-01"
    },
    contact: {
      email: profile.contact.email,
      phone: profile.contact.phone,
      location: profile.location,
      social: {
        github: profile.social.github,
        linkedin: profile.social.linkedin,
        youtube: profile.social.youtube
      },
      statusText: "Systems Online \u2022 Ready for Direct Engagement",
      responseTimeText: "Typically responds within 24 hours",
      ctaHeading: "LET'S BUILD SOMETHING EXTRAORDINARY",
      ctaDescription: "Open to full-time Software Engineering roles, AI/ML development initiatives, and mission-critical systems challenges."
    },
    navigation: {
      logoText: "HABIB",
      profileImage: profile.photo.path,
      profileCrop: {
        x: 50,
        y: 40,
        scale: 1,
        rotate: 0,
        flipH: false,
        flipV: false,
        aspectRatio: "1:1",
        objectFit: "cover",
        borderRadius: 999,
        shadowIntensity: 0.3,
        opacity: 1
      },
      links: [
        { id: "about", label: "PROFILE", href: "#profile", enabled: true },
        { id: "mindset", label: "HOW I BUILD", href: "#mindset", enabled: true },
        { id: "stack", label: "STACK", href: "#stack", enabled: true },
        { id: "capabilities", label: "CAPABILITIES", href: "#capabilities", enabled: true },
        { id: "projects", label: "PROJECTS", href: "#projects", enabled: true },
        { id: "journey", label: "JOURNEY", href: "#journey", enabled: true },
        { id: "certifications", label: "CERTS", href: "#certifications", enabled: true },
        { id: "resume", label: "RESUME", href: "#resume", enabled: true },
        { id: "contact", label: "CONTACT", href: "#contact", enabled: true }
      ],
      resumeButtonText: "RESUME",
      contactCtaText: "GET IN TOUCH"
    },
    theme: {
      voidColor: "#030507",
      deepColor: "#060A10",
      surfaceColor: "#090E16",
      elevatedColor: "#0E1622",
      cyanColor: "#00D9FF",
      blueColor: "#5577FF",
      violetColor: "#8175FF",
      textPrimary: "#F5F8FA",
      textSecondary: "#A8B4C2",
      textMuted: "#7F8B99",
      glassBg: "rgba(255, 255, 255, 0.045)",
      glassBorder: "rgba(255, 255, 255, 0.12)",
      glassBlur: 14,
      glassRadius: 24,
      borderOpacity: 0.12,
      shadowIntensity: 0.4
    },
    animation: {
      enableCinematic3D: true,
      animationIntensity: 1,
      cameraMovementIntensity: 1,
      scrollResponse: 1,
      pointerResponse: 1,
      particleDensity: 4e3,
      particleSpeed: 1,
      atmosphericFog: 0.75,
      glowIntensity: 1,
      bloomIntensity: 0.3,
      backgroundDepth: 1,
      liquidGlassIntensity: 1,
      reflectionIntensity: 0.5,
      transitionDuration: 0.8,
      preset: "cinematic",
      reducedMotionFallback: true
    },
    sections: [
      { id: "hero", label: "Hero / Launch", navAnchor: "#hero", enabled: true, order: 0 },
      { id: "system", label: "Enter System", navAnchor: "#system", enabled: true, order: 1 },
      { id: "profile", label: "Engineer Profile", navAnchor: "#profile", enabled: true, order: 2 },
      { id: "mindset", label: "How I Build", navAnchor: "#mindset", enabled: true, order: 3 },
      { id: "stack", label: "Connected Stack", navAnchor: "#stack", enabled: true, order: 4 },
      { id: "capabilities", label: "Capabilities", navAnchor: "#capabilities", enabled: true, order: 5 },
      { id: "education", label: "Education", navAnchor: "#education", enabled: true, order: 6 },
      { id: "projects", label: "Project Universe", navAnchor: "#projects", enabled: true, order: 7 },
      { id: "journey", label: "The Journey", navAnchor: "#journey", enabled: true, order: 8 },
      { id: "certifications", label: "Certifications", navAnchor: "#certifications", enabled: true, order: 9 },
      { id: "resume", label: "Resume Experience", navAnchor: "#resume", enabled: true, order: 10 },
      { id: "contact", label: "Contact & Connection", navAnchor: "#contact", enabled: true, order: 11 }
    ],
    seo: {
      title: "Md Habib Munsar Ahmed | Software Engineer Portfolio",
      description: "Software Engineer building intelligent, secure and scalable digital systems across AI, full-stack development and cybersecurity.",
      keywords: "Software Engineer, Full Stack, AI, Machine Learning, Cybersecurity, React, Python, Three.js, Liquid Glass, Portfolio",
      ogImage: "/assets/images/profile.webp",
      canonicalUrl: "https://habib404ahmed.github.io/",
      author: "Md Habib Munsar Ahmed"
    },
    elementStyles: {}
  };
}

// server/storage.ts
var isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
var BASE_DATA_DIR = path.resolve(process.cwd(), "data");
var DATA_DIR = isServerless ? path.resolve("/tmp", "portfolio_data") : BASE_DATA_DIR;
var VERSIONS_DIR = path.resolve(DATA_DIR, "versions");
var UPLOADS_DIR = isServerless ? path.resolve("/tmp", "portfolio_uploads") : path.resolve(process.cwd(), "public", "uploads");
var PUBLISHED_FILE = path.resolve(DATA_DIR, "published-content.json");
var DRAFT_FILE = path.resolve(DATA_DIR, "draft-content.json");
var CONFIG_FILE = path.resolve(DATA_DIR, "admin-config.json");
function ensureDirs() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(VERSIONS_DIR)) fs.mkdirSync(VERSIONS_DIR, { recursive: true });
    if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    if (isServerless && fs.existsSync(BASE_DATA_DIR)) {
      const files = ["published-content.json", "draft-content.json", "admin-config.json"];
      for (const file of files) {
        const src = path.resolve(BASE_DATA_DIR, file);
        const dest = path.resolve(DATA_DIR, file);
        if (fs.existsSync(src) && !fs.existsSync(dest)) {
          try {
            fs.copyFileSync(src, dest);
          } catch {
          }
        }
      }
    }
  } catch (err) {
    console.warn("[Storage] Directory check warning:", err);
  }
}
function getPublishedContent() {
  ensureDirs();
  if (fs.existsSync(PUBLISHED_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(PUBLISHED_FILE, "utf-8"));
      return data;
    } catch (err) {
      console.error("Error reading published content, resetting to default:", err);
    }
  }
  const defaultContent = getDefaultContent();
  savePublishedContent(defaultContent);
  return defaultContent;
}
function savePublishedContent(content) {
  ensureDirs();
  content.lastPublished = (/* @__PURE__ */ new Date()).toISOString();
  fs.writeFileSync(PUBLISHED_FILE, JSON.stringify(content, null, 2), "utf-8");
}
function getDraftContent() {
  ensureDirs();
  if (fs.existsSync(DRAFT_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DRAFT_FILE, "utf-8"));
      return data;
    } catch (err) {
      console.error("Error reading draft content:", err);
    }
  }
  const published = getPublishedContent();
  saveDraftContent(published);
  return published;
}
function saveDraftContent(content) {
  ensureDirs();
  content.lastUpdated = (/* @__PURE__ */ new Date()).toISOString();
  fs.writeFileSync(DRAFT_FILE, JSON.stringify(content, null, 2), "utf-8");
}
function publishDraft(versionLabel, author = "Admin") {
  ensureDirs();
  const draft = getDraftContent();
  savePublishedContent(draft);
  const versionId = `v-${Date.now()}`;
  const version = {
    id: versionId,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    label: versionLabel || `Published on ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
    author,
    content: draft
  };
  const versionPath = path.resolve(VERSIONS_DIR, `${versionId}.json`);
  fs.writeFileSync(versionPath, JSON.stringify(version, null, 2), "utf-8");
  return { success: true, versionId };
}
function getVersions() {
  ensureDirs();
  const files = fs.readdirSync(VERSIONS_DIR);
  const versions = [];
  for (const file of files) {
    if (file.endsWith(".json")) {
      try {
        const fullPath = path.resolve(VERSIONS_DIR, file);
        const v = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
        versions.push({
          id: v.id,
          timestamp: v.timestamp,
          label: v.label,
          author: v.author,
          content: v.content
        });
      } catch (err) {
        console.error(`Error reading version file ${file}:`, err);
      }
    }
  }
  return versions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
function rollbackToVersion(versionId) {
  ensureDirs();
  const versionPath = path.resolve(VERSIONS_DIR, `${versionId}.json`);
  if (!fs.existsSync(versionPath)) {
    return { success: false };
  }
  const v = JSON.parse(fs.readFileSync(versionPath, "utf-8"));
  saveDraftContent(v.content);
  savePublishedContent(v.content);
  const newVersionId = `v-${Date.now()}`;
  const rollbackEntry = {
    id: newVersionId,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    label: `Restored version: ${v.label}`,
    author: "Admin (Rollback)",
    content: v.content
  };
  fs.writeFileSync(path.resolve(VERSIONS_DIR, `${newVersionId}.json`), JSON.stringify(rollbackEntry, null, 2), "utf-8");
  return { success: true, content: v.content };
}
function getAdminConfig() {
  ensureDirs();
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    } catch {
    }
  }
  const defaultSecret = process.env.JWT_SECRET || "habib-cinematic-portfolio-admin-secret-key-2026";
  const config = {
    username: process.env.ADMIN_USERNAME || "admin",
    passwordHash: "",
    jwtSecret: defaultSecret
  };
  return config;
}
function saveAdminConfig(config) {
  ensureDirs();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
}

// server/auth.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
var loginAttempts = /* @__PURE__ */ new Map();
var MAX_ATTEMPTS = 5;
var LOCKOUT_MS = 15 * 60 * 1e3;
function checkRateLimit(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) {
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (now > record.resetTime) {
    loginAttempts.delete(ip);
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1e3);
    return { allowed: false, retryAfterSeconds: retryAfter };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
function recordFailedAttempt(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now > record.resetTime) {
    loginAttempts.set(ip, { attempts: 1, resetTime: now + LOCKOUT_MS });
  } else {
    record.attempts += 1;
  }
}
function clearRateLimit(ip) {
  loginAttempts.delete(ip);
}
async function ensureAdminInitialized() {
  const config = getAdminConfig();
  const envPassword = process.env.ADMIN_PASSWORD;
  const envUsername = process.env.ADMIN_USERNAME;
  if (envUsername && envUsername !== config.username) {
    config.username = envUsername;
  }
  if (envPassword) {
    const isSame = config.passwordHash ? await bcrypt.compare(envPassword, config.passwordHash) : false;
    if (!isSame) {
      const salt = await bcrypt.genSalt(10);
      config.passwordHash = await bcrypt.hash(envPassword, salt);
      saveAdminConfig(config);
      console.log(`[Admin Auth] Admin credentials updated from environment variable for "${config.username}".`);
      return { username: config.username };
    }
  }
  if (!config.passwordHash) {
    const fallbackPassword = process.env.ADMIN_PASSWORD || "admin123";
    const salt = await bcrypt.genSalt(10);
    config.passwordHash = await bcrypt.hash(fallbackPassword, salt);
    saveAdminConfig(config);
    console.log(`[Admin Auth] Initialized credentials for admin user "${config.username}". Set ADMIN_PASSWORD in .env or run "npm run admin:setup" to configure.`);
  }
  return { username: config.username };
}
async function verifyCredentials(password) {
  const config = getAdminConfig();
  if (!config.passwordHash) {
    await ensureAdminInitialized();
    return verifyCredentials(password);
  }
  return bcrypt.compare(password, config.passwordHash);
}
function generateToken(username) {
  const config = getAdminConfig();
  return jwt.sign({ username, role: "admin" }, config.jwtSecret, {
    expiresIn: "24h"
  });
}
function verifyToken(token) {
  const config = getAdminConfig();
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return { valid: true, username: decoded.username };
  } catch {
    return { valid: false };
  }
}
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  let token = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }
  if (!token) {
    res.status(401).json({ error: "Unauthorized: Authentication required" });
    return;
  }
  const { valid, username } = verifyToken(token);
  if (!valid || !username) {
    res.status(401).json({ error: "Unauthorized: Invalid or expired session" });
    return;
  }
  req.user = { username };
  next();
}

// server/api.ts
var apiRouter = express.Router();
apiRouter.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
  const allowedOrigins = allowedOriginsEnv ? allowedOriginsEnv.split(",").map((o) => o.trim()) : [];
  const isDev = process.env.NODE_ENV !== "production";
  const isAllowed = !origin || allowedOrigins.includes(origin) || isDev && (origin.includes("localhost") || origin.includes("127.0.0.1"));
  if (isAllowed && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});
apiRouter.use(express.json({ limit: "10mb" }));
apiRouter.use(express.urlencoded({ extended: true, limit: "10mb" }));
try {
  if (!fs2.existsSync(UPLOADS_DIR)) {
    fs2.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch {
}
var storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path2.extname(file.originalname).toLowerCase();
    const baseName = path2.basename(file.originalname, ext).toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});
var MAX_UPLOAD_SIZE_MB = parseInt(process.env.MAX_UPLOAD_SIZE_MB || "10", 10);
var MAX_UPLOAD_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;
var fileFilter = (_req, file, cb) => {
  const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".avif", ".svg"];
  const ext = path2.extname(file.originalname).toLowerCase();
  const allowedMime = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/svg+xml",
    "application/pdf"
  ];
  if (allowedExts.includes(ext) && allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format. Please upload PDF, PNG, JPG, or WebP."));
  }
};
var upload = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_BYTES },
  fileFilter
});
function validateFileContents(filePath, ext) {
  try {
    const buffer = Buffer.alloc(16);
    const fd = fs2.openSync(filePath, "r");
    fs2.readSync(fd, buffer, 0, 16, 0);
    fs2.closeSync(fd);
    if (buffer[0] === 77 && buffer[1] === 90) {
      return { valid: false, reason: "Executable files are strictly rejected." };
    }
    if (buffer[0] === 127 && buffer[1] === 69 && buffer[2] === 76 && buffer[3] === 70) {
      return { valid: false, reason: "Executable binaries are strictly rejected." };
    }
    const firstStr = buffer.toString("utf8").toLowerCase();
    if (firstStr.includes("<!doct") || firstStr.includes("<html") || firstStr.includes("<script") || firstStr.includes("<?php")) {
      return { valid: false, reason: "HTML and executable script files are strictly rejected." };
    }
    if (ext === ".pdf") {
      if (buffer[0] === 37 && buffer[1] === 80 && buffer[2] === 68 && buffer[3] === 70 && buffer[4] === 45) {
        return { valid: true };
      }
      return { valid: false, reason: "Invalid or corrupt PDF header." };
    }
    if (ext === ".png") {
      if (buffer[0] === 137 && buffer[1] === 80 && buffer[2] === 78 && buffer[3] === 71) {
        return { valid: true };
      }
      return { valid: false, reason: "Invalid PNG image header." };
    }
    if (ext === ".jpg" || ext === ".jpeg") {
      if (buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) {
        return { valid: true };
      }
      return { valid: false, reason: "Invalid JPEG image header." };
    }
    if (ext === ".webp") {
      const riff = buffer.subarray(0, 4).toString("utf8");
      const webp = buffer.subarray(8, 12).toString("utf8");
      if (riff === "RIFF" && webp === "WEBP") {
        return { valid: true };
      }
      return { valid: false, reason: "Invalid WebP image header." };
    }
    return { valid: true };
  } catch (err) {
    return { valid: false, reason: err?.message || "Failed to inspect file contents." };
  }
}
apiRouter.post("/auth/login", async (req, res) => {
  try {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      res.status(429).json({
        error: `Too many failed attempts. Please wait ${rate.retryAfterSeconds} seconds before trying again.`
      });
      return;
    }
    const { username, password } = req.body || {};
    if (!username || typeof username !== "string" || !username.trim()) {
      res.status(400).json({ error: "Username is required" });
      return;
    }
    if (!password || typeof password !== "string" || !password.trim()) {
      res.status(400).json({ error: "Password is required" });
      return;
    }
    const cleanUsername = username.trim();
    const { username: configuredUsername } = await ensureAdminInitialized();
    if (cleanUsername !== configuredUsername) {
      recordFailedAttempt(ip);
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    const valid = await verifyCredentials(password);
    if (!valid) {
      recordFailedAttempt(ip);
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }
    clearRateLimit(ip);
    const token = generateToken(configuredUsername);
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1e3
    });
    res.json({
      success: true,
      token,
      user: { username: configuredUsername }
    });
  } catch (err) {
    console.error("[Auth Login Error]", err?.message || err);
    res.status(500).json({ error: "Authentication server error. Please try again later." });
  }
});
apiRouter.post("/auth/logout", (_req, res) => {
  res.clearCookie("admin_token");
  res.json({ success: true, message: "Logged out successfully" });
});
apiRouter.get("/auth/me", requireAuth, (req, res) => {
  res.json({
    authenticated: true,
    user: req.user
  });
});
apiRouter.get("/content", (_req, res) => {
  try {
    const content = getPublishedContent();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve published content", details: err.message });
  }
});
apiRouter.get("/content/draft", requireAuth, (_req, res) => {
  try {
    const draft = getDraftContent();
    res.json(draft);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve draft content", details: err.message });
  }
});
var handleSaveDraft = (req, res) => {
  try {
    const newContent = req.body;
    if (!newContent || typeof newContent !== "object") {
      res.status(400).json({ error: "Invalid content payload" });
      return;
    }
    saveDraftContent(newContent);
    res.json({ success: true, message: "Draft saved successfully", lastUpdated: newContent.lastUpdated });
  } catch (err) {
    res.status(500).json({ error: "Failed to save draft content", details: err.message });
  }
};
apiRouter.put("/content/draft", requireAuth, handleSaveDraft);
apiRouter.post("/content/draft", requireAuth, handleSaveDraft);
apiRouter.post("/content/publish", requireAuth, (req, res) => {
  try {
    const { label } = req.body || {};
    const author = req.user?.username || "Admin";
    const result = publishDraft(label, author);
    res.json({
      success: true,
      message: "Portfolio published successfully!",
      versionId: result.versionId,
      publishedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to publish changes", details: err.message });
  }
});
apiRouter.get("/content/versions", requireAuth, (_req, res) => {
  try {
    const versions = getVersions();
    res.json(versions);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve versions", details: err.message });
  }
});
apiRouter.post("/content/rollback", requireAuth, (req, res) => {
  try {
    const { versionId } = req.body;
    if (!versionId) {
      res.status(400).json({ error: "Version ID is required" });
      return;
    }
    const result = rollbackToVersion(versionId);
    if (!result.success) {
      res.status(404).json({ error: "Version not found" });
      return;
    }
    res.json({
      success: true,
      message: `Successfully rolled back to version ${versionId}`,
      content: result.content
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to rollback version", details: err.message });
  }
});
apiRouter.post(
  "/upload",
  requireAuth,
  (req, res) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          res.status(400).json({
            error: `File size exceeds maximum limit of ${MAX_UPLOAD_SIZE_MB} MB. Please upload a smaller document.`
          });
          return;
        }
        res.status(400).json({
          error: err.message || "File upload rejected. Supported types: PDF, PNG, JPG, WebP."
        });
        return;
      }
      if (!req.file) {
        res.status(400).json({ error: "No file received or file rejected" });
        return;
      }
      const ext = path2.extname(req.file.originalname).toLowerCase();
      const inspection = validateFileContents(req.file.path, ext);
      if (!inspection.valid) {
        try {
          if (fs2.existsSync(req.file.path)) {
            fs2.unlinkSync(req.file.path);
          }
        } catch {
        }
        res.status(400).json({
          error: inspection.reason || "File validation failed: content does not match expected format."
        });
        return;
      }
      const publicUrl = `/uploads/${req.file.filename}`;
      res.json({
        success: true,
        url: publicUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    });
  }
);
apiRouter.get("/media", requireAuth, (_req, res) => {
  try {
    const files = fs2.readdirSync(UPLOADS_DIR);
    const content = getDraftContent();
    const contentStr = JSON.stringify(content);
    const mediaList = files.map((filename) => {
      const fullPath = path2.resolve(UPLOADS_DIR, filename);
      const stats = fs2.statSync(fullPath);
      const url = `/uploads/${filename}`;
      const usedBy = [];
      if (contentStr.includes(url) || contentStr.includes(filename)) {
        if (JSON.stringify(content.hero).includes(url)) usedBy.push("Hero");
        if (JSON.stringify(content.about).includes(url)) usedBy.push("About");
        if (JSON.stringify(content.projects).includes(url)) usedBy.push("Projects");
        if (JSON.stringify(content.certifications).includes(url)) usedBy.push("Certifications");
        if (JSON.stringify(content.navigation).includes(url)) usedBy.push("Navigation");
        if (JSON.stringify(content.resume).includes(url)) usedBy.push("Resume");
      }
      return {
        filename,
        url,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        isImage: /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(filename),
        isPdf: /\.pdf$/i.test(filename),
        usedBy
      };
    });
    res.json(mediaList);
  } catch (err) {
    res.status(500).json({ error: "Failed to list media files", details: err.message });
  }
});
apiRouter.delete("/media/:filename", requireAuth, (req, res) => {
  try {
    const filename = req.params.filename;
    const safeName = path2.basename(String(filename));
    const filePath = path2.resolve(UPLOADS_DIR, safeName);
    if (!fs2.existsSync(filePath)) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    const content = getDraftContent();
    const contentStr = JSON.stringify(content);
    const inUse = contentStr.includes(safeName);
    if (inUse && req.query.force !== "true") {
      res.status(400).json({
        error: "File is currently in use across portfolio sections. Pass force=true to delete.",
        inUse: true
      });
      return;
    }
    fs2.unlinkSync(filePath);
    res.json({ success: true, message: `Deleted ${safeName}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete file", details: err.message });
  }
});
apiRouter.post("/resume/generate", requireAuth, (_req, res) => {
  const scriptPath = path2.resolve(process.cwd(), "scripts", "generate_resume_pdf.js");
  exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error generating resume:", error, stderr);
      res.status(500).json({ error: "Failed to generate resume PDF", details: stderr || error.message });
      return;
    }
    res.json({
      success: true,
      message: "Resume PDF regenerated successfully!",
      output: stdout
    });
  });
});

// api/handler.ts
var app = express2();
app.use(cookieParser());
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.use("/uploads", express2.static(UPLOADS_DIR));
app.use("/api/uploads", express2.static(UPLOADS_DIR));
app.use("/api", apiRouter);
app.use(apiRouter);
var isInitialized = false;
var initPromise = null;
async function handleRequest(req, res) {
  const matchedPath = req.headers["x-matched-path"] || req.headers["x-now-route-matches"];
  if (matchedPath && matchedPath.startsWith("/api") && req.url !== matchedPath) {
    req.url = matchedPath;
  }
  if (!isInitialized) {
    if (!initPromise) {
      initPromise = ensureAdminInitialized().then(() => {
        isInitialized = true;
      }).catch((err) => {
        console.error("[Vercel Serverless] Admin initialization error:", err);
      });
    }
    await initPromise;
  }
  return app(req, res);
}
var handler_default = handleRequest;
export {
  handler_default as default,
  handleRequest
};
