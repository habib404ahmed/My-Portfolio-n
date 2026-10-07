export interface ProjectConnection {
  projectId: string
  projectName: string
  roleDescription: string
  tag: string
}

export interface TechItem {
  name: string
  description: string
  role?: string
  usedFor?: string[]
  projects?: ProjectConnection[]
}

export interface TechDomain {
  id: string
  label: string
  shortLabel: string
  color: string
  glowColor: string
  description: string
  tech: TechItem[]
  visualHint: string
}

export interface PipelineNode {
  name: string
  stage: string
  description: string
  role: string
  color: string
}

export interface PipelineData {
  id: 'intelligent' | 'zero-trust'
  title: string
  code: string
  color: string
  description: string
  nodes: PipelineNode[]
}

export const techDomains: TechDomain[] = [
  {
    id: 'languages',
    label: 'LANGUAGES',
    shortLabel: 'LANG',
    color: '#00D9FF',
    glowColor: 'rgba(0, 217, 255, 0.16)',
    description: 'Core computational languages & data querying',
    visualHint: 'code-streams',
    tech: [
      {
        name: 'Python',
        description: 'AI/ML pipelines, security automation, FastAPI',
        role: 'High-Level Systems & AI Programming Language',
        usedFor: [
          'High-throughput asynchronous FastAPI service development',
          'AI / ML inference pipelines & statistical feature extraction',
          'Autonomous multi-agent orchestration & NLP intent routing',
          'Low-level packet streaming & Scapy network automation',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Streaming Scapy packet parser, directional 5-tuple extraction & FastAPI telemetry core',
            tag: 'Core Engine & Ingestion',
          },
          {
            projectId: 'ai-multi-agent',
            projectName: 'AI Multi-Agent Task Schedule Manager',
            roleDescription: 'Multi-agent controller architecture, intent router & Pydantic tool execution harness',
            tag: 'Agent Coordination',
          },
        ],
      },
      {
        name: 'Java',
        description: 'Object-oriented architecture, Spring Boot services',
        role: 'Enterprise Object-Oriented Language',
        usedFor: [
          'Object-oriented system modeling & clean software patterns',
          'Modular enterprise architectures & inversion of control',
          'Type-safe data manipulation & foundational data structures',
          'Production-grade backend engineering paradigms',
        ],
        projects: [],
      },
      {
        name: 'JavaScript',
        description: 'Modern responsive web applications & Node.js',
        role: 'Dynamic Full-Stack Web & Scripting Language',
        usedFor: [
          'Interactive reactive interfaces & custom browser state management',
          'Asynchronous event loops & WebSocket real-time communication',
          'Client-side cryptographic salted password hashing',
          'DOM lifecycle management & modern Single Page Applications',
        ],
        projects: [
          {
            projectId: '5minhelp',
            projectName: '5minhelp',
            roleDescription: 'Full-stack client SPA state management & real-time Socket.io lifecycle events',
            tag: 'Full-Stack Runtime',
          },
          {
            projectId: 'box-cricket',
            projectName: 'Box Cricket (UniBox League)',
            roleDescription: 'Interactive athlete portal, session hydration & client-side cryptographic hashing',
            tag: 'Client Systems',
          },
        ],
      },
      {
        name: 'SQL',
        description: 'Relational schemas, indexing & transactional queries',
        role: 'Declarative Relational Database Query Language',
        usedFor: [
          'ACID transactional schema design & data normalization',
          'Directional network telemetry queries & composite indexing',
          'Complex multi-table joins & relational constraint modeling',
          'Database migrations, schema versioning & query optimization',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'PostgreSQL directional flow tables indexed by 5-tuple (Src/Dst IP & Port, Protocol)',
            tag: 'Flow Schema & Indexing',
          },
          {
            projectId: '5minhelp',
            projectName: '5minhelp',
            roleDescription: 'MySQL relational schema with foreign key cascades, seed data & order logs',
            tag: 'Transactional Storage',
          },
          {
            projectId: 'box-cricket',
            projectName: 'Box Cricket (UniBox League)',
            roleDescription: 'Supabase PostgreSQL athlete registrations, team structures & approval status',
            tag: 'Relational Store',
          },
        ],
      },
    ],
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    shortLabel: 'UI',
    color: '#6575FF',
    glowColor: 'rgba(101, 117, 255, 0.16)',
    description: 'Modern reactive interfaces & design systems',
    visualHint: 'components',
    tech: [
      {
        name: 'React',
        description: 'Component-driven reactive UI applications',
        role: 'Component-Driven Reactive UI Library',
        usedFor: [
          'Declarative component hierarchies & reusable UI design systems',
          'High-density real-time operational consoles & telemetry explorer',
          'Contextual state orchestration & unidirectional data flow',
          'Accessible, keyboard-navigable interactive glass modules',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'React 19 SOC command console with real-time Flow Explorer & directional inspection',
            tag: 'SOC Console',
          },
          {
            projectId: '5minhelp',
            projectName: '5minhelp',
            roleDescription: 'Comprehensive 9-page responsive marketplace with role-based dashboard views',
            tag: 'Marketplace SPA',
          },
          {
            projectId: 'campus-care',
            projectName: 'Campus Care',
            roleDescription: 'Rapid emergency response interface featuring 1-tap SOS trigger & 7 role portals',
            tag: 'Emergency UI',
          },
        ],
      },
      {
        name: 'HTML',
        description: 'Semantic, accessible document structures',
        role: 'Semantic Web Markup Standard',
        usedFor: [
          'WCAG-compliant semantic element hierarchies (nav, main, section, dialog)',
          'Accessible ARIA state management (aria-modal, aria-expanded, aria-controls)',
          'High-reliability emergency forms with fallback input mechanisms',
          'Multi-viewport responsiveness & document meta optimization',
        ],
        projects: [
          {
            projectId: 'campus-care',
            projectName: 'Campus Care',
            roleDescription: 'Accessible emergency dispatch forms & clinical severity triage controls',
            tag: 'Accessible Forms',
          },
          {
            projectId: 'box-cricket',
            projectName: 'Box Cricket (UniBox League)',
            roleDescription: 'Structured credentialing forms with proof modal inspection layouts',
            tag: 'Proof Modals',
          },
          {
            projectId: 'ai-multi-agent',
            projectName: 'AI Multi-Agent Task Schedule Manager',
            roleDescription: 'Lightweight semantic frontend client layout for multi-agent intent input',
            tag: 'Agent Interface',
          },
        ],
      },
      {
        name: 'CSS',
        description: 'Modern responsive layouts, grid architectures & typography',
        role: 'Cascading Style Sheets & Visual Presentation',
        usedFor: [
          'Fluid viewport typography using CSS clamp() mathematics',
          'Spatial CSS Grid and Flexbox alignment systems',
          'Hardware-accelerated transforms & Liquid Glass blur/reflection filters',
          'Theme tokens, dark mode elevation & cinematic color grading',
        ],
        projects: [
          {
            projectId: 'ai-multi-agent',
            projectName: 'AI Multi-Agent Task Schedule Manager',
            roleDescription: 'Custom CSS3 responsive dashboard layout with dark theme typography',
            tag: 'Dashboard Theme',
          },
        ],
      },
      {
        name: 'Tailwind CSS',
        description: 'Utility-first design tokens & rapid system styling',
        role: 'Utility-First Design Token Engine',
        usedFor: [
          'Consistent architectural design token application across components',
          'Responsive breakpoint optimization (mobile, tablet, desktop)',
          'State variants (hover, active, focus-visible) with zero stylesheet bloat',
          'Rapid production-ready UI development in competitive hackathons',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Cybersecurity SOC color hierarchy, directional flow chips & telemetry layout',
            tag: 'SOC System',
          },
          {
            projectId: 'campus-care',
            projectName: 'Campus Care',
            roleDescription: 'High-visibility emergency priority badges & clinical triage color tiers',
            tag: 'Emergency Styling',
          },
          {
            projectId: 'box-cricket',
            projectName: 'Box Cricket (UniBox League)',
            roleDescription: 'Coordinator command center dashboard layouts and athlete badges',
            tag: 'Coordinator Dashboard',
          },
        ],
      },
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    shortLabel: 'API',
    color: '#00D9FF',
    glowColor: 'rgba(0, 217, 255, 0.16)',
    description: 'High-throughput APIs & microservices',
    visualHint: 'api-flows',
    tech: [
      {
        name: 'Node.js',
        description: 'Asynchronous event-driven server runtime & Express',
        role: 'Asynchronous Event-Driven JavaScript Runtime',
        usedFor: [
          'High-concurrency RESTful microservices with Express routing',
          'Bidirectional real-time WebSocket communication via Socket.io',
          'JWT authentication middleware & route protection gates',
          'Asynchronous database connectivity with connection pooling',
        ],
        projects: [
          {
            projectId: '5minhelp',
            projectName: '5minhelp',
            roleDescription: 'Express REST backend API, Socket.io event dispatch & MySQL database integration',
            tag: 'Express & Socket.io',
          },
        ],
      },
      {
        name: 'FastAPI',
        description: 'High-performance Python asynchronous APIs with Pydantic',
        role: 'High-Performance Asynchronous Python Web Framework',
        usedFor: [
          'Non-blocking async endpoints capable of streaming telemetry',
          'Strict data validation & serialization using Pydantic schemas',
          'Automatic interactive OpenAPI / Swagger documentation',
          'Integration with streaming packet parsers & AI agent loops',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Real-time telemetry endpoints, streaming PCAP ingestion & flow feature querying',
            tag: 'Streaming Ingestion',
          },
          {
            projectId: 'ai-multi-agent',
            projectName: 'AI Multi-Agent Task Schedule Manager',
            roleDescription: 'Multi-agent orchestration server, NLP intent routing & tool execution APIs',
            tag: 'Agent Dispatcher',
          },
        ],
      },
      {
        name: 'Spring Boot',
        description: 'Enterprise-grade modular Java web applications',
        role: 'Enterprise Modular Java Application Framework',
        usedFor: [
          'Enterprise layered backend microservice design',
          'Dependency injection & modular architecture separation',
          'Enterprise security standards & transaction management',
          'Robust production-ready application scaffolding',
        ],
        projects: [],
      },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    shortLabel: 'AI',
    color: '#38E8FF',
    glowColor: 'rgba(56, 232, 255, 0.16)',
    description: 'Predictive intelligence & autonomous agents',
    visualHint: 'neural-net',
    tech: [
      {
        name: 'Machine Learning',
        description: 'Hands-on predictive modeling & scikit-learn pipelines',
        role: 'Statistical Learning & Anomaly Modeling',
        usedFor: [
          'High-dimensional network traffic feature vector extraction',
          'Inter-arrival time (IAT) distribution & burst rate statistical modeling',
          'Passive unidirectional packet payload entropy calculation',
          'Anomaly scoring algorithms without bidirectional feedback',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Unidirectional flow feature extraction: PPS, BPS, duration, and packet inter-arrival times',
            tag: 'Anomaly Feature Core',
          },
        ],
      },
      {
        name: 'LLMs & Chains',
        description: 'Large language model prompt chains & reasoning',
        role: 'Large Language Model Prompt & Reasoning Chains',
        usedFor: [
          'Structured prompt chains for multi-step task decomposition',
          'Natural language user intent parsing & parameter extraction',
          'Context-grounded reasoning & instruction-following synthesis',
          'Deterministic schema output generation from open-ended prompts',
        ],
        projects: [
          {
            projectId: 'ai-multi-agent',
            projectName: 'AI Multi-Agent Task Schedule Manager',
            roleDescription: 'Natural language intent classification routing commands to specialized domain agents',
            tag: 'Intent Reasoning',
          },
        ],
      },
      {
        name: 'RAG Systems',
        description: 'Retrieval-augmented generation & vector querying',
        role: 'Retrieval-Augmented Generation Architecture',
        usedFor: [
          'Grounding generative outputs in validated persistent databases',
          'Context retrieval pipelines preventing model hallucinations',
          'Query-based document synthesis & structured note retrieval',
          'Domain-specific knowledge representation and recall',
        ],
        projects: [
          {
            projectId: 'ai-multi-agent',
            projectName: 'AI Multi-Agent Task Schedule Manager',
            roleDescription: 'Context-grounded notes retrieval & knowledge synthesis across user requests',
            tag: 'Knowledge Retrieval',
          },
        ],
      },
      {
        name: 'AI Agents',
        description: 'Autonomous goal-driven multi-agent task orchestration',
        role: 'Autonomous Goal-Driven Multi-Agent Systems',
        usedFor: [
          'Central Primary Agent orchestrating specialized domain sub-agents',
          'Isolated tool execution harnesses with strict input validation',
          'Asynchronous task scheduling & agenda queue coordination',
          'Stateful agent memory persistence in validated databases',
        ],
        projects: [
          {
            projectId: 'ai-multi-agent',
            projectName: 'AI Multi-Agent Task Schedule Manager',
            roleDescription: 'Primary router dispatching to Task Agent, Calendar Agent & Notes Agent with SQLite tools',
            tag: 'Multi-Agent Network',
          },
        ],
      },
    ],
  },
  {
    id: 'security',
    label: 'CYBERSECURITY',
    shortLabel: 'SEC',
    color: '#00D9FF',
    glowColor: 'rgba(0, 217, 255, 0.16)',
    description: 'Ethical hacking & defensive architecture',
    visualHint: 'network-topology',
    tech: [
      {
        name: 'Ethical Hacking',
        description: 'Hands-on vulnerability assessment & security auditing',
        role: 'Offensive Security & Threat Modeling',
        usedFor: [
          'Passive network threat reconnaissance & attack path analysis',
          'Simulated penetration modeling on unidirectional physical links',
          'Security posture evaluation & perimeter defense validation',
          'Vulnerability classification aligned with CVSS standards',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Threat analysis for optical data diodes & unidirectional hardware simplex links (SIH 2026)',
            tag: 'Diode Threat Model',
          },
        ],
      },
      {
        name: 'Penetration Testing',
        description: 'Working knowledge of offensive tools & attack vectors',
        role: 'Vulnerability Assessment & Attack Surface Testing',
        usedFor: [
          'Active port scanning & service fingerprinting methodologies',
          'Exploit surface identification & security verification',
          'Network packet manipulation & header spoofing analysis',
          'Comprehensive security audit reporting & remediation advice',
        ],
        projects: [],
      },
      {
        name: 'Kali Linux Tools',
        description: 'Practical exposure to Metasploit, Burp Suite & Nmap',
        role: 'Specialized Security & Forensics Toolset',
        usedFor: [
          'Network mapping & port enumeration using Nmap',
          'Deep packet inspection & protocol analysis via Wireshark',
          'Hands-on vulnerability assessment with Metasploit & Burp Suite',
          'Traffic capture validation against optical diode constraints',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'PCAP / PCAPNG capture file format ingestion with deep magic-bytes verification',
            tag: 'PCAP Ingestion & Audit',
          },
        ],
      },
      {
        name: 'Linux Security',
        description: 'System hardening, permission models & audit logging',
        role: 'Operating System Hardening & Access Governance',
        usedFor: [
          'POSIX permission structures & least-privilege service execution',
          'System audit logging & process monitoring under isolated users',
          'Hardened network socket configurations & buffer tuning',
          'Defense-in-depth isolation for real-time telemetry daemons',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Hardened Linux host environment for streaming packet captures & isolated worker processes',
            tag: 'Hardened Runtime',
          },
        ],
      },
    ],
  },
  {
    id: 'systems',
    label: 'SYSTEMS',
    shortLabel: 'SYS',
    color: '#6575FF',
    glowColor: 'rgba(101, 117, 255, 0.16)',
    description: 'Hardware, operating systems & troubleshooting',
    visualHint: 'hardware-board',
    tech: [
      {
        name: 'Linux Admin',
        description: 'Working knowledge of shell scripting & configuration',
        role: 'Operating System Administration & Shell Automation',
        usedFor: [
          'Bash shell automation for service orchestration & maintenance',
          'Systemd daemon management, service isolation & auto-recovery',
          'Performance metrics profiling (htop, iostat, vmstat, netstat)',
          'Kernel networking parameters & buffer tuning for packet streams',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Automated background packet streaming worker daemon configuration & systemd integration',
            tag: 'Worker Daemons',
          },
        ],
      },
      {
        name: 'Windows Systems',
        description: 'OS installation, recovery & driver configuration',
        role: 'Desktop & OS Architecture Management',
        usedFor: [
          'OS installation, environment recovery & driver configuration',
          'System registry diagnostics & policy management',
          'PowerShell scripting for environment automation',
          'Peripheral hardware diagnostic benchmarking',
        ],
        projects: [],
      },
      {
        name: 'Hardware Diagnostics',
        description: 'Hands-on hardware troubleshooting & PC assembly',
        role: 'Physical Computing & Hardware Diagnostics',
        usedFor: [
          'Hardware assembly, component validation & POST diagnostics',
          'Thermal management, voltage profiling & bottleneck isolation',
          'Physical network interfaces & optical fiber transceiver handling',
          'Hardware simplex links & optical data diode characteristics',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Analysis of physical optical data diodes and hardware simplex links with zero return paths',
            tag: 'Physical Diode Analysis',
          },
        ],
      },
      {
        name: 'System Optimization',
        description: 'Performance tuning, resource monitoring & cleanup',
        role: 'System Resource Profiling & Performance Tuning',
        usedFor: [
          'Memory allocation tuning & memory leak elimination',
          'CPU scheduling optimization & thread pool calibration',
          'Disk I/O serialization & buffering for high-throughput feeds',
          'Zero-copy data ingestion pipelines reducing CPU overhead',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Low-latency streaming packet parsing using Scapy PcapReader with memory-bounded buffers',
            tag: 'Stream Optimization',
          },
        ],
      },
    ],
  },
  {
    id: 'networking',
    label: 'NETWORKING',
    shortLabel: 'NET',
    color: '#38E8FF',
    glowColor: 'rgba(56, 232, 255, 0.16)',
    description: 'Protocols, traffic inspection & routing',
    visualHint: 'network-mesh',
    tech: [
      {
        name: 'TCP/IP Architecture',
        description: 'Working knowledge of packet routing & 5-tuple flows',
        role: 'Core Internet Protocol Suite Architecture',
        usedFor: [
          'Strict directional 5-tuple flow isolation (Src/Dst IP & Port, Protocol)',
          'Header dissection (Ethernet, IPv4, IPv6, TCP, UDP, ICMP)',
          'Zero-return path behavior where ACKs & handshakes are absent',
          'Packet inter-arrival time (IAT) and flow duration analysis',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Strict directional 5-tuple flow isolation reflecting optical diode reality without reverse handshakes',
            tag: '5-Tuple Flow Engine',
          },
        ],
      },
      {
        name: 'Network Scanning',
        description: 'Port scanning & protocol discovery using Nmap & Scapy',
        role: 'Packet Parsing & Network Protocol Discovery',
        usedFor: [
          'Non-blocking background packet streaming with Scapy',
          'PcapReader and PcapNgReader streaming file extraction',
          'Active & passive port scanning with protocol discovery',
          'Traffic inspection across high-dimensional directional flows',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Streaming Scapy parser passively processing PCAP/PCAPNG packet streams in real-time',
            tag: 'Scapy Stream Parser',
          },
        ],
      },
      {
        name: 'Firewalls & Defense',
        description: 'Traffic rules, port management & defense strategies',
        role: 'Perimeter Network Security & Traffic Control',
        usedFor: [
          'Ingress/egress rule design & defensive perimeter policies',
          'Unidirectional traffic enforcement preventing reverse data leaks',
          'Packet filtering architectures & port security configurations',
          'Air-gapped network segment protection paradigms',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Architected for air-gapped critical infrastructure networks protected by physical data diodes',
            tag: 'Perimeter Defense',
          },
        ],
      },
      {
        name: 'VPNs & Protocols',
        description: 'Practical exposure to encrypted tunnels & DNS resolution',
        role: 'Encrypted Tunnels & Protocol Mechanics',
        usedFor: [
          'Encrypted virtual private network tunneling protocols',
          'Transport Layer Security (TLS) cryptographic handshake principles',
          'DNS resolution mechanisms & DNS spoofing countermeasures',
          'Secure routing architectures across distributed nodes',
        ],
        projects: [],
      },
    ],
  },
  {
    id: 'databases',
    label: 'DATABASES',
    shortLabel: 'DATA',
    color: '#6575FF',
    glowColor: 'rgba(101, 117, 255, 0.16)',
    description: 'ACID storage, caching & cloud persistence',
    visualHint: 'data-flow',
    tech: [
      {
        name: 'PostgreSQL',
        description: 'Advanced relational storage with telemetry schemas',
        role: 'Advanced Open-Source Relational Database',
        usedFor: [
          'High-throughput telemetry storage & composite 5-tuple indexing',
          'Relational schema modeling with SQLAlchemy 2.x and Alembic',
          'Transactional integrity & high-frequency bulk insert pipelines',
          'Analytical time-series flow aggregation and query performance',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'PostgreSQL 18 database storing high-dimensional directional flow records with composite indexes',
            tag: 'Flow Database (PG 18)',
          },
        ],
      },
      {
        name: 'MySQL',
        description: 'Relational ACID persistence with normalized models',
        role: 'ACID-Compliant Relational Database Management System',
        usedFor: [
          'Normalized relational schema design with foreign key constraints',
          'ACID transaction guarantees for marketplace service orders',
          'Connection pooling & query optimization for Express APIs',
          'User credential storage & audit log persistence',
        ],
        projects: [
          {
            projectId: '5minhelp',
            projectName: '5minhelp',
            roleDescription: 'MySQL 8.0 normalized database for service orders, providers, users & audit logs',
            tag: 'Order Database (MySQL 8)',
          },
        ],
      },
      {
        name: 'MongoDB',
        description: 'NoSQL document storage for unstructured datasets',
        role: 'Document-Oriented NoSQL Database',
        usedFor: [
          'Flexible document modeling for unstructured telemetry payloads',
          'High-velocity write throughput for dynamic log events',
          'Nested JSON document indexing & aggregation pipelines',
          'Rapid prototyping for schemaless application datasets',
        ],
        projects: [],
      },
      {
        name: 'Supabase & Firebase',
        description: 'Real-time database, auth & Row-Level Security',
        role: 'Cloud Database & Real-Time Backend-as-a-Service',
        usedFor: [
          'Managed PostgreSQL with granular Row-Level Security (RLS)',
          'Real-time database subscriptions syncing across clients',
          'Client-side authentication integration & session hydration',
          'Secure document and certificate storage bucket management',
        ],
        projects: [
          {
            projectId: 'box-cricket',
            projectName: 'Box Cricket (UniBox League)',
            roleDescription: 'Supabase PostgreSQL database persisting athlete registrations, proof documents & approvals',
            tag: 'Cloud DB & Storage',
          },
        ],
      },
    ],
  },
  {
    id: 'infrastructure',
    label: 'INFRASTRUCTURE',
    shortLabel: 'INFRA',
    color: '#8B7CFF',
    glowColor: 'rgba(139, 124, 255, 0.16)',
    description: 'DevOps, containerization & edge deployment',
    visualHint: 'deployment-pipeline',
    tech: [
      {
        name: 'Git & GitHub',
        description: 'Distributed version control & collaborative PR workflows',
        role: 'Distributed Version Control & Collaboration Platform',
        usedFor: [
          'Branch management workflows (Gitflow) & semantic versioning',
          'Atomic commit hygiene & detailed technical change logs',
          'Collaborative pull request reviews & conflict resolution',
          'Open-source repository governance & issue tracking',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Complete version-controlled repository with CI guidelines & architectural documentation',
            tag: 'GitHub Repository',
          },
          {
            projectId: 'ai-multi-agent',
            projectName: 'AI Multi-Agent Task Schedule Manager',
            roleDescription: 'Modular codebase repository with clear multi-agent architecture and installation steps',
            tag: 'GitHub Repository',
          },
          {
            projectId: '5minhelp',
            projectName: '5minhelp',
            roleDescription: 'Full-stack monorepo containing React frontend and Node.js backend services',
            tag: 'GitHub Repository',
          },
          {
            projectId: 'campus-care',
            projectName: 'Campus Care',
            roleDescription: 'Hackathon competition repository with rapid commits and triage logic',
            tag: 'GitHub Repository',
          },
          {
            projectId: 'box-cricket',
            projectName: 'Box Cricket (UniBox League)',
            roleDescription: 'Tournament management system with client-side crypto hashing algorithms',
            tag: 'GitHub Repository',
          },
        ],
      },
      {
        name: 'Docker',
        description: 'Immutable container packaging & isolated environments',
        role: 'Containerization & Environment Isolation Platform',
        usedFor: [
          'Multi-stage Dockerfile builds for optimized production images',
          'Multi-container service orchestration using Docker Compose',
          'Isolated local development environments for PostgreSQL & APIs',
          'Consistent deployment artifacts eliminating environment drift',
        ],
        projects: [
          {
            projectId: 'sentra',
            projectName: 'SENTRA',
            roleDescription: 'Containerized PostgreSQL database and backend worker execution environments',
            tag: 'Service Containers',
          },
        ],
      },
      {
        name: 'AWS & Cloud Edge',
        description: 'Cloud compute, storage & edge deployment patterns',
        role: 'Cloud Infrastructure & Edge Services',
        usedFor: [
          'Cloud virtual machine compute provisioning (EC2)',
          'Scalable object storage bucket management (S3)',
          'Serverless edge function execution and API routing',
          'Cloud network architecture & VPC security group configuration',
        ],
        projects: [],
      },
      {
        name: 'Vercel & Render',
        description: 'Production server orchestration & edge runtime',
        role: 'Modern Edge & Production Hosting Platforms',
        usedFor: [
          'Continuous deployment (CI/CD) pipelines triggered on git push',
          'Global CDN edge caching & sub-millisecond static delivery',
          'Zero-downtime serverless function execution and API hosting',
          'Production environment management & preview deployments',
        ],
        projects: [
          {
            projectId: 'portfolio',
            projectName: 'Portfolio Website',
            roleDescription: 'Production edge deployment on Vercel with global CDN acceleration and custom domain routing',
            tag: 'Edge CDN & CI/CD',
          },
        ],
      },
    ],
  },
]

export const pipelinesData: PipelineData[] = [
  {
    id: 'intelligent',
    title: 'INTELLIGENT SYSTEMS PIPELINE',
    code: 'AUTO-AI',
    color: '#8B7CFF',
    description: 'Autonomous reasoning loop connecting neural models, asynchronous APIs, vector memory, and cloud edge runtime.',
    nodes: [
      {
        name: 'AI / ML',
        stage: 'Stage 01',
        role: 'Intent Recognition & Multi-Agent Reasoning',
        description: 'Large language model prompt chains and predictive algorithms parse objectives, decompose intents, and generate structured actions.',
        color: '#8B7CFF',
      },
      {
        name: 'Backend API',
        stage: 'Stage 02',
        role: 'Asynchronous Service Orchestration',
        description: 'FastAPI and Node.js microservices execute non-blocking endpoints, validate parameters with Pydantic, and dispatch to worker tools.',
        color: '#6575FF',
      },
      {
        name: 'Vector DB',
        stage: 'Stage 03',
        role: 'Semantic Context & State Persistence',
        description: 'Vector-indexed memory stores high-dimensional embeddings for retrieval-augmented generation and deterministic database grounding.',
        color: '#00D9FF',
      },
      {
        name: 'Cloud',
        stage: 'Stage 04',
        role: 'Production Edge Delivery & Scaling',
        description: 'Containerized deployment across edge nodes ensures low-latency execution, real-time telemetry, and resilient continuous availability.',
        color: '#6575FF',
      },
    ],
  },
  {
    id: 'zero-trust',
    title: 'ZERO-TRUST DEFENSE PIPELINE',
    code: 'NET-SEC',
    color: '#00D9FF',
    description: 'Defensive architecture engineered for unidirectional physical networks, traffic inspection, and strict cryptographic authentication.',
    nodes: [
      {
        name: 'Cybersecurity',
        stage: 'Stage 01',
        role: 'Passive Perimeter Threat Modeling',
        description: 'Optical data diode isolation and hardware simplex link modeling to prevent unauthorized reverse-channel exfiltration in critical enclaves.',
        color: '#00D9FF',
      },
      {
        name: 'Packet Inspector',
        stage: 'Stage 02',
        role: 'Streaming 5-Tuple Flow Dissection',
        description: 'Scapy packet streaming parser calculating packet inter-arrival times (IAT), entropy, and packets-per-second without return ACKs.',
        color: '#6575FF',
      },
      {
        name: 'Auth Guard',
        stage: 'Stage 03',
        role: 'Cryptographic Hashing & Route Guards',
        description: 'Client-side salted SHA-256 password hashing (Web Crypto API), JWT access tokens, and strict role-based access control (RBAC).',
        color: '#00D9FF',
      },
      {
        name: 'Encrypted Edge',
        stage: 'Stage 04',
        role: 'Hardened Runtime & Audit Logging',
        description: 'Hardened Linux daemon runtimes, TLS encrypted transport, and tamper-evident PostgreSQL 18 directional telemetry logging.',
        color: '#6575FF',
      },
    ],
  },
]
