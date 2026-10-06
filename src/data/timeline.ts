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
  externalUrl?: string
  externalLabel?: string
  color: string
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'bca-foundation',
    year: '2025',
    period: '2025 — 2028',
    label: 'EDUCATION',
    subtitle: 'Bachelor of Computer Applications (BCA) — AI & ML Focus',
    description:
      'Pursuing BCA at Assam Down Town University with a dedicated academic and practical focus on Artificial Intelligence, Machine Learning, and core algorithm design. Achieved 8.05 SGPA (1st Sem) and 8.10 SGPA (2nd Sem).',
    type: 'foundation',
    color: '#38bdf8',
  },
  {
    id: 'systems-experience',
    year: '2024',
    period: '2024 — Present',
    label: 'SYSTEMS EXPERIENCE',
    subtitle: 'Hardware Diagnostics & Systems Engineering',
    description:
      'Hands-on practical experience diagnosing hardware faults, assembling and configuring PC builds, performing clean dual-boot OS installations (Windows/Linux), driver management, and system-level performance optimization.',
    type: 'foundation',
    color: '#f59e0b',
  },
  {
    id: 'cybersecurity-learning',
    year: '2024',
    period: '2024 — Present',
    label: 'CYBERSECURITY',
    subtitle: 'Self-Directed Ethical Hacking & Kali Linux Mastery',
    description:
      'Independent exploration into penetration testing, Kali Linux terminal tools, network scanning, firewall defense, and vulnerability auditing across legal practice labs and security challenges.',
    type: 'foundation',
    color: '#10b981',
  },
  {
    id: 'ai-exploration',
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
    year: '2025',
    period: '2025 — 2026',
    label: 'PROJECT SYSTEMS',
    subtitle: 'System Architecture & Production Engineering',
    description:
      'Engineered five comprehensive software systems spanning AI threat detection (SENTRA), multi-agent frameworks, local service hubs, campus emergency dispatch, and athletic management.',
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
    id: 'content-creator',
    year: '2025',
    period: '2024 — Present',
    label: 'CONTENT CREATOR',
    subtitle: 'Technical Content Creator — King of Kali Linux',
    description:
      'Creating educational content around cybersecurity, ethical hacking, Kali Linux, Linux and emerging technologies, with a focus on making technical concepts accessible and practical.',
    externalUrl: 'https://youtube.com/@king_of_kali_linux_404',
    externalLabel: 'Visit YouTube Channel',
    type: 'leadership',
    color: '#f43f5e',
  },
  {
    id: 'ethical-hacking',
    year: '2026',
    period: '7 March 2026',
    label: 'CERTIFIED DEFENSE',
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
    label: 'LEADERSHIP',
    subtitle: 'Event Organizer — Orientation & Independence Day',
    description:
      'Recognized with a Certificate of Appreciation by Sunstone / Assam Down Town University for organizing university programs, managing event logistics, and supporting campus activities.',
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
