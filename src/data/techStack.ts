export interface TechItem {
  name: string
  description: string
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

export const techDomains: TechDomain[] = [
  {
    id: 'languages',
    label: 'LANGUAGES',
    shortLabel: 'LANG',
    color: '#38bdf8',
    glowColor: 'rgba(56,189,248,0.15)',
    description: 'Core computational languages & data querying',
    visualHint: 'code-streams',
    tech: [
      { name: 'Python', description: 'AI/ML pipelines, security automation, FastAPI' },
      { name: 'Java', description: 'Object-oriented architecture, Spring Boot services' },
      { name: 'JavaScript', description: 'Modern responsive web applications & Node.js' },
      { name: 'SQL', description: 'Relational schemas, indexing & transactional queries' },
    ],
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    shortLabel: 'UI',
    color: '#818cf8',
    glowColor: 'rgba(129,140,248,0.15)',
    description: 'Modern reactive interfaces & design systems',
    visualHint: 'components',
    tech: [
      { name: 'React', description: 'Component-driven reactive UI applications' },
      { name: 'HTML', description: 'Semantic, accessible document structures' },
      { name: 'CSS', description: 'Modern responsive layouts, grid architectures & typography' },
      { name: 'Tailwind CSS', description: 'Utility-first design tokens & rapid system styling' },
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    shortLabel: 'API',
    color: '#34d399',
    glowColor: 'rgba(52,211,153,0.15)',
    description: 'High-throughput APIs & microservices',
    visualHint: 'api-flows',
    tech: [
      { name: 'Node.js', description: 'Asynchronous event-driven server runtime & Express' },
      { name: 'FastAPI', description: 'High-performance Python asynchronous APIs with Pydantic' },
      { name: 'Spring Boot', description: 'Enterprise-grade modular Java web applications' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    shortLabel: 'AI',
    color: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.18)',
    description: 'Predictive intelligence & autonomous agents',
    visualHint: 'neural-net',
    tech: [
      { name: 'Machine Learning', description: 'Hands-on predictive modeling & scikit-learn pipelines' },
      { name: 'LLMs & Chains', description: 'Large language model prompt chains & reasoning' },
      { name: 'RAG Systems', description: 'Retrieval-augmented generation & vector querying' },
      { name: 'AI Agents', description: 'Autonomous goal-driven multi-agent task orchestration' },
    ],
  },
  {
    id: 'security',
    label: 'CYBERSECURITY',
    shortLabel: 'SEC',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.15)',
    description: 'Ethical hacking & defensive architecture',
    visualHint: 'network-topology',
    tech: [
      { name: 'Ethical Hacking', description: 'Hands-on vulnerability assessment & security auditing' },
      { name: 'Penetration Testing', description: 'Working knowledge of offensive tools & attack vectors' },
      { name: 'Kali Linux Tools', description: 'Practical exposure to Metasploit, Burp Suite & Nmap' },
      { name: 'Linux Security', description: 'System hardening, permission models & audit logging' },
    ],
  },
  {
    id: 'systems',
    label: 'SYSTEMS',
    shortLabel: 'SYS',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.15)',
    description: 'Hardware, operating systems & troubleshooting',
    visualHint: 'hardware-board',
    tech: [
      { name: 'Linux Admin', description: 'Working knowledge of shell scripting & configuration' },
      { name: 'Windows Systems', description: 'OS installation, recovery & driver configuration' },
      { name: 'Hardware Diagnostics', description: 'Hands-on hardware troubleshooting & PC assembly' },
      { name: 'System Optimization', description: 'Performance tuning, resource monitoring & cleanup' },
    ],
  },
  {
    id: 'networking',
    label: 'NETWORKING',
    shortLabel: 'NET',
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.15)',
    description: 'Protocols, traffic inspection & routing',
    visualHint: 'network-mesh',
    tech: [
      { name: 'TCP/IP Architecture', description: 'Working knowledge of packet routing & 5-tuple flows' },
      { name: 'Network Scanning', description: 'Port scanning & protocol discovery using Nmap & Scapy' },
      { name: 'Firewalls & Defense', description: 'Traffic rules, port management & defense strategies' },
      { name: 'VPNs & Protocols', description: 'Practical exposure to encrypted tunnels & DNS resolution' },
    ],
  },
  {
    id: 'databases',
    label: 'DATABASES',
    shortLabel: 'DATA',
    color: '#fbbf24',
    glowColor: 'rgba(251,191,36,0.15)',
    description: 'ACID storage, caching & cloud persistence',
    visualHint: 'data-flow',
    tech: [
      { name: 'PostgreSQL', description: 'Advanced relational storage with telemetry schemas' },
      { name: 'MySQL', description: 'Relational ACID persistence with normalized models' },
      { name: 'MongoDB', description: 'NoSQL document storage for unstructured datasets' },
      { name: 'Supabase & Firebase', description: 'Real-time database, auth & Row-Level Security' },
    ],
  },
  {
    id: 'infrastructure',
    label: 'INFRASTRUCTURE',
    shortLabel: 'INFRA',
    color: '#38bdf8',
    glowColor: 'rgba(56,189,248,0.15)',
    description: 'DevOps, containerization & edge deployment',
    visualHint: 'deployment-pipeline',
    tech: [
      { name: 'Git & GitHub', description: 'Distributed version control & collaborative PR workflows' },
      { name: 'Docker', description: 'Immutable container packaging & isolated environments' },
      { name: 'AWS & Cloud Edge', description: 'Cloud compute, storage & edge deployment patterns' },
      { name: 'Vercel & Render', description: 'Production server orchestration & edge runtime' },
    ],
  },
]
