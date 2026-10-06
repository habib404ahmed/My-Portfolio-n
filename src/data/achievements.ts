export interface Achievement {
  id: string
  title: string
  organization: string
  date: string
  recognition: string
  description: string
  category: 'leadership' | 'academic' | 'competition' | 'security' | 'creator'
  verified: boolean
  certificateRef?: string
}

export const achievements: Achievement[] = [
  {
    id: 'orientation-organizer',
    title: 'Organizer — Orientation & Independence Day Programs',
    organization: 'Assam Down Town University / Sunstone',
    date: 'August 2026',
    recognition: 'Certificate of Appreciation',
    description:
      'Contributed to the organization and successful execution of university Orientation and Independence Day programs, supporting event coordination and program activities.',
    category: 'leadership',
    verified: true,
    certificateRef: 'adtu-sunstone-appreciation',
  },
  {
    id: 'ethical-hacking-cert',
    title: 'Ethical Hacking Certified Assessment',
    organization: 'Pitronix Solutions',
    date: '7 March 2026',
    recognition: 'Certificate ID: #00102970',
    description:
      'Formally assessed and certified in ethical penetration testing standards, perimeter defenses, zero-trust validation, and security auditing.',
    category: 'security',
    verified: true,
    certificateRef: 'ethical-hacking',
  },
  {
    id: 'cisco-ai-cert',
    title: 'Introduction to Modern AI Certification',
    organization: 'Cisco Networking Academy',
    date: '2025',
    recognition: 'Verified Cisco Credential',
    description:
      'Certified in artificial intelligence foundations, machine learning mechanisms, multimodal systems, and practical agent applications.',
    category: 'academic',
    verified: true,
    certificateRef: 'cisco-modern-ai',
  },
  {
    id: 'sih-2026-participant',
    title: 'Smart India Hackathon 2026 Participant',
    organization: 'Smart India Hackathon (Problem ID: 26145)',
    date: '2026',
    recognition: 'Engineering Innovation',
    description:
      'Engineered SENTRA: an AI-driven SOC platform for unidirectional physical networks with zero-return paths using Scapy and PostgreSQL.',
    category: 'competition',
    verified: true,
  },
  {
    id: 'content-creator',
    title: 'Technical Content Creator — King of Kali Linux',
    organization: 'YouTube Technical Community',
    date: '2024 — Present',
    recognition: 'Practical Security Outreach',
    description:
      'Authoring hands-on educational guides around ethical hacking, Kali Linux, and security architecture to empower developers.',
    category: 'creator',
    verified: true,
  },
]
