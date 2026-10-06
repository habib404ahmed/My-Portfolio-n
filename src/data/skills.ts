export interface SkillCategory {
  id: string
  label: string
  icon: string
  color: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level: number // 0-100
  years?: number
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: 'code',
    color: '#06b6d4',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'JavaScript', level: 80 },
      { name: 'SQL', level: 75 },
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks',
    icon: 'layers',
    color: '#8b5cf6',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'FastAPI', level: 75 },
      { name: 'Spring Boot', level: 65 },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    icon: 'brain',
    color: '#06b6d4',
    skills: [
      { name: 'Machine Learning', level: 75 },
      { name: 'LLMs', level: 70 },
      { name: 'RAG', level: 70 },
      { name: 'AI Agents', level: 70 },
    ],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    icon: 'shield',
    color: '#10b981',
    skills: [
      { name: 'Kali Linux', level: 80 },
      { name: 'Ethical Hacking', level: 75 },
      { name: 'Network Security', level: 70 },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: 'database',
    color: '#f59e0b',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'Firebase', level: 75 },
      { name: 'Supabase', level: 70 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps / Cloud',
    icon: 'cloud',
    color: '#3b82f6',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 85 },
      { name: 'Docker', level: 65 },
      { name: 'AWS', level: 60 },
      { name: 'Vercel', level: 80 },
      { name: 'Render', level: 75 },
    ],
  },
]
