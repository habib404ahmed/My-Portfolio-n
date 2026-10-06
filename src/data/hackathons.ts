export interface HackathonEntry {
  id: string
  event: string
  year: string
  team?: string
  problemStatement?: string
  project: string
  role: string
  statusTag: string
  context: string
  link?: string
}

export const hackathonsData: HackathonEntry[] = [
  {
    id: 'sih-2026',
    event: 'Smart India Hackathon 2026',
    year: '2026',
    team: 'Sentra 1 (Team ID: 191970)',
    problemStatement: 'Problem ID 26145: AI-Based Detection of Cyber Threats in Unidirectional IP Traffic',
    project: 'SENTRA',
    role: 'Full-Stack & Ingestion Architecture',
    statusTag: 'Smart India Hackathon Project',
    context:
      'Engineered an enterprise-grade passive network SOC monitoring system designed specifically for optical data diodes and simplex fiber links.',
    link: 'https://github.com/habib404ahmed/SENTRA',
  },
  {
    id: 'engineering-day',
    event: 'Engineering Day Rapid-Coding Competition',
    year: '2026',
    project: 'Campus Care',
    role: 'Frontend & Incident Logic Engineering',
    statusTag: 'Rapid-Coding Challenge Entry',
    context:
      'Designed and coded a real-time campus safety and multi-hazard emergency triage application under intense competition timeframes.',
    link: 'https://github.com/habib404ahmed/Campus-Care',
  },
]
