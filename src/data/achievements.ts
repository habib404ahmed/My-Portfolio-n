export interface Achievement {
  id: string
  title: string
  organization: string
  date: string
  recognition: string
  description: string
  category: 'leadership' | 'academic' | 'competition'
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
    certificateRef: 'appreciation-orientation',
  },
]
