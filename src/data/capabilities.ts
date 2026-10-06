export interface CapabilityFlow {
  step: string
  label: string
}

export interface Capability {
  id: string
  title: string
  domain: string
  color: string
  description: string
  flow: CapabilityFlow[]
}

export const capabilities: Capability[] = [
  {
    id: 'ai-apps',
    title: 'AI-Powered Applications',
    domain: 'AI / ML',
    color: '#a78bfa',
    description: 'End-to-end intelligent applications using LLMs, RAG, and autonomous agents.',
    flow: [
      { step: '01', label: 'Data Input' },
      { step: '02', label: 'LLM Processing' },
      { step: '03', label: 'RAG Retrieval' },
      { step: '04', label: 'Agent Reasoning' },
      { step: '05', label: 'Action Output' },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web Applications',
    domain: 'Full-Stack',
    color: '#818cf8',
    description: 'Complete web applications from UI to database and deployment.',
    flow: [
      { step: '01', label: 'Frontend UI' },
      { step: '02', label: 'REST API' },
      { step: '03', label: 'Backend Logic' },
      { step: '04', label: 'Database Layer' },
      { step: '05', label: 'Cloud Deploy' },
    ],
  },
  {
    id: 'secure-systems',
    title: 'Secure Software Systems',
    domain: 'Cybersecurity',
    color: '#10b981',
    description: 'Applications built with security principles and tested for vulnerabilities.',
    flow: [
      { step: '01', label: 'Application' },
      { step: '02', label: 'Network Layer' },
      { step: '03', label: 'Threat Analysis' },
      { step: '04', label: 'Security Response' },
      { step: '05', label: 'Hardened System' },
    ],
  },
  {
    id: 'rest-apis',
    title: 'REST APIs',
    domain: 'Backend',
    color: '#34d399',
    description: 'Scalable and documented API services using FastAPI, Node.js, and Spring Boot.',
    flow: [
      { step: '01', label: 'Client Request' },
      { step: '02', label: 'Auth Layer' },
      { step: '03', label: 'Business Logic' },
      { step: '04', label: 'Data Store' },
      { step: '05', label: 'Response' },
    ],
  },
  {
    id: 'realtime',
    title: 'Real-Time Applications',
    domain: 'Full-Stack',
    color: '#06b6d4',
    description: 'Live-updating applications with WebSockets and real-time databases.',
    flow: [
      { step: '01', label: 'Event Trigger' },
      { step: '02', label: 'WebSocket' },
      { step: '03', label: 'Server Broadcast' },
      { step: '04', label: 'Live Update' },
      { step: '05', label: 'State Sync' },
    ],
  },
  {
    id: 'cloud-deployed',
    title: 'Cloud-Deployed Applications',
    domain: 'DevOps',
    color: '#38bdf8',
    description: 'Production applications deployed to AWS, Vercel, and Render with CI/CD.',
    flow: [
      { step: '01', label: 'Local Dev' },
      { step: '02', label: 'Containerize' },
      { step: '03', label: 'CI Pipeline' },
      { step: '04', label: 'Cloud Deploy' },
      { step: '05', label: 'Live Production' },
    ],
  },
]
