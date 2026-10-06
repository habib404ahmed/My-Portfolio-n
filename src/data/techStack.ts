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
    description: 'Core computational languages',
    visualHint: 'code-streams',
    tech: [
      { name: 'Python', description: 'AI/ML, scripting, backend automation' },
      { name: 'Java', description: 'Object-oriented applications, Spring Boot' },
      { name: 'JavaScript', description: 'Full-stack web & real-time systems' },
      { name: 'SQL', description: 'Complex relational querying & schema design' },
    ],
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    shortLabel: 'UI',
    color: '#818cf8',
    glowColor: 'rgba(129,140,248,0.15)',
    description: 'Modern reactive web interfaces',
    visualHint: 'components',
    tech: [
      { name: 'React', description: 'Component-driven interactive UI applications' },
      { name: 'HTML', description: 'Semantic, accessible document structuring' },
      { name: 'CSS', description: 'Responsive layouts, modern animations, typography' },
      { name: 'Tailwind', description: 'Utility-first rapid design system styling' },
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    shortLabel: 'API',
    color: '#34d399',
    glowColor: 'rgba(52,211,153,0.15)',
    description: 'Server architectures & business logic',
    visualHint: 'api-flows',
    tech: [
      { name: 'Node.js', description: 'Asynchronous event-driven server runtime' },
      { name: 'FastAPI', description: 'High-performance Python asynchronous APIs' },
      { name: 'Spring Boot', description: 'Robust enterprise-grade Java web backend' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    shortLabel: 'AI',
    color: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.18)',
    description: 'Intelligent inference & autonomous agents',
    visualHint: 'neural-net',
    tech: [
      { name: 'Machine Learning', description: 'Predictive models & statistical data pipelines' },
      { name: 'LLMs', description: 'Large language model integration & prompt chains' },
      { name: 'RAG', description: 'Retrieval-augmented vector knowledge retrieval' },
      { name: 'AI Agents', description: 'Autonomous goal-driven multi-agent task execution' },
    ],
  },
  {
    id: 'security',
    label: 'SECURITY',
    shortLabel: 'SEC',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.15)',
    description: 'Defensive architecture & vulnerability testing',
    visualHint: 'network-topology',
    tech: [
      { name: 'Kali Linux', description: 'Security assessment & penetration testing' },
      { name: 'Ethical Hacking', description: 'Certified vulnerability testing & perimeter audit' },
      { name: 'Network Security', description: 'Protocol inspection, firewalls & traffic hardening' },
    ],
  },
  {
    id: 'databases',
    label: 'DATABASES',
    shortLabel: 'DATA',
    color: '#fbbf24',
    glowColor: 'rgba(251,191,36,0.15)',
    description: 'High-integrity persistence & caching',
    visualHint: 'data-flow',
    tech: [
      { name: 'MySQL', description: 'Relational ACID persistence with indexed schemas' },
      { name: 'MongoDB', description: 'Flexible NoSQL document storage' },
      { name: 'PostgreSQL', description: 'Advanced relational database with vector support' },
      { name: 'Firebase', description: 'Real-time database & managed backend services' },
      { name: 'Supabase', description: 'PostgreSQL with instant APIs & row-level security' },
    ],
  },
  {
    id: 'infrastructure',
    label: 'INFRASTRUCTURE',
    shortLabel: 'INFRA',
    color: '#38bdf8',
    glowColor: 'rgba(56,189,248,0.15)',
    description: 'DevOps, containerization & cloud deployment',
    visualHint: 'deployment-pipeline',
    tech: [
      { name: 'Git', description: 'Distributed version control & branch strategy' },
      { name: 'GitHub', description: 'CI/CD workflows, releases & collaborative code review' },
      { name: 'Docker', description: 'Immutable container packaging & isolation' },
      { name: 'AWS', description: 'Cloud compute, storage & network services' },
      { name: 'Vercel', description: 'Edge functions & optimized frontend delivery' },
      { name: 'Render', description: 'Production full-stack service orchestration' },
    ],
  },
]
