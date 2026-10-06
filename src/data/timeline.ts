export interface TimelineEvent {
  id: string
  year: string
  period: string
  label: string
  subtitle: string
  description: string
  type: 'foundation' | 'certification' | 'projects' | 'leadership' | 'future'
  isOpenNode?: boolean
  connectedProjects?: string[]
  certificateRef?: string
  color: string
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'bca-foundation',
    year: '2025',
    period: '2025 — 2028',
    label: 'FOUNDATION',
    subtitle: 'Bachelor of Computer Applications (BCA)',
    description:
      'Enrolled in the Bachelor of Computer Applications program at Assam Down Town University. Achieved 8.05 SGPA in 1st Semester with deep focus on core algorithms and data systems.',
    type: 'foundation',
    color: '#38bdf8',
  },
  {
    id: 'ai-foundation',
    year: '2025',
    period: 'Late 2025',
    label: 'AI FOUNDATION',
    subtitle: 'Introduction to Modern AI — Cisco Networking Academy',
    description:
      'Earned Cisco certification exploring modern artificial intelligence foundations, machine learning mechanisms, multimodal systems, and practical agent applications.',
    type: 'certification',
    certificateRef: 'cisco-modern-ai',
    color: '#a78bfa',
  },
  {
    id: 'technical-growth',
    year: '2026',
    period: '2025 — 2026',
    label: 'TECHNICAL DEVELOPMENT',
    subtitle: 'System Architecture & Production Engineering',
    description:
      'Engineered five comprehensive software systems spanning AI threat detection, multi-agent frameworks, local service hubs, campus emergency dispatch, and athletic management.',
    type: 'projects',
    connectedProjects: [
      'SENTRA',
      'AI Multi-Agent',
      '5minhelp',
      'Campus Care',
      'Box Cricket',
    ],
    color: '#06b6d4',
  },
  {
    id: 'ethical-hacking',
    year: '2026',
    period: '7 March 2026',
    label: 'CYBERSECURITY',
    subtitle: 'Ethical Hacking — Pitronix Solutions (#00102970)',
    description:
      'Formally assessed and certified in ethical penetration testing standards, perimeter defenses, zero-trust validation, and security auditing.',
    type: 'certification',
    certificateRef: 'ethical-hacking',
    color: '#10b981',
  },
  {
    id: 'university-leadership',
    year: '2026',
    period: 'August 2026',
    label: 'UNIVERSITY LEADERSHIP',
    subtitle: 'Event Organizer — Orientation & Independence Day',
    description:
      'Recognized with a Certificate of Appreciation by Sunstone / Assam Down Town University for organizing university programs and coordinating campus logistics.',
    type: 'leadership',
    certificateRef: 'adtu-sunstone-appreciation',
    color: '#f59e0b',
  },
  {
    id: 'future-chapter',
    year: '2028',
    period: 'Looking Ahead',
    label: 'NEXT CHAPTER',
    subtitle: 'Expected BCA Graduation & Beyond',
    description:
      'The engineering path remains open and forward-looking. Continuing to build scalable software, contribute to impactful teams, and master cutting-edge systems.',
    type: 'future',
    isOpenNode: true,
    color: '#e2e8f0',
  },
]
