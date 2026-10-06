export type SkillProficiency =
  | 'Proficient'
  | 'Hands-on'
  | 'Working Knowledge'
  | 'Practical Exposure'

export interface Skill {
  name: string
  proficiency: SkillProficiency
  domain?: string
}

export interface SkillCategory {
  id: string
  label: string
  icon: string
  color: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: 'code',
    color: '#06b6d4',
    skills: [
      { name: 'Python', proficiency: 'Proficient' },
      { name: 'Java', proficiency: 'Hands-on' },
      { name: 'JavaScript', proficiency: 'Proficient' },
      { name: 'SQL', proficiency: 'Hands-on' },
      { name: 'HTML5', proficiency: 'Proficient' },
      { name: 'CSS3', proficiency: 'Proficient' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Web',
    icon: 'layers',
    color: '#8b5cf6',
    skills: [
      { name: 'React', proficiency: 'Proficient' },
      { name: 'Tailwind CSS', proficiency: 'Proficient' },
      { name: 'Node.js', proficiency: 'Hands-on' },
      { name: 'FastAPI', proficiency: 'Hands-on' },
      { name: 'Spring Boot', proficiency: 'Working Knowledge' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    icon: 'brain',
    color: '#06b6d4',
    skills: [
      { name: 'Machine Learning', proficiency: 'Hands-on' },
      { name: 'LLM Orchestration', proficiency: 'Hands-on' },
      { name: 'RAG Architectures', proficiency: 'Hands-on' },
      { name: 'AI Multi-Agent Systems', proficiency: 'Hands-on' },
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity & Ethical Hacking',
    icon: 'shield',
    color: '#10b981',
    skills: [
      { name: 'Ethical Hacking', proficiency: 'Hands-on' },
      { name: 'Kali Linux Tools', proficiency: 'Hands-on' },
      { name: 'Network Security', proficiency: 'Hands-on' },
      { name: 'Vulnerability Assessment', proficiency: 'Working Knowledge' },
      { name: 'Linux System Hardening', proficiency: 'Working Knowledge' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems & Troubleshooting',
    icon: 'cpu',
    color: '#f59e0b',
    skills: [
      { name: 'Hardware Troubleshooting', proficiency: 'Hands-on' },
      { name: 'Linux Administration', proficiency: 'Working Knowledge' },
      { name: 'Windows Systems Setup', proficiency: 'Hands-on' },
      { name: 'System Optimization', proficiency: 'Hands-on' },
      { name: 'Driver & OS Recovery', proficiency: 'Hands-on' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases & Persistence',
    icon: 'database',
    color: '#f59e0b',
    skills: [
      { name: 'PostgreSQL', proficiency: 'Hands-on' },
      { name: 'MySQL', proficiency: 'Hands-on' },
      { name: 'MongoDB', proficiency: 'Hands-on' },
      { name: 'Firebase', proficiency: 'Hands-on' },
      { name: 'Supabase', proficiency: 'Hands-on' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    icon: 'cloud',
    color: '#3b82f6',
    skills: [
      { name: 'Git & GitHub', proficiency: 'Proficient' },
      { name: 'Docker', proficiency: 'Working Knowledge' },
      { name: 'AWS', proficiency: 'Working Knowledge' },
      { name: 'Vercel', proficiency: 'Hands-on' },
      { name: 'Render', proficiency: 'Hands-on' },
    ],
  },
]
