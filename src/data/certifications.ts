export interface Certification {
  id: string
  number: string
  index: string
  title: string
  issuer: string
  type: string
  recipient: string
  date: string
  year: number
  certificateId?: string
  category: 'ai' | 'security' | 'recognition'
  categoryLabel: string
  image: string
  imagePath?: string // backward compatibility
  imageWebp: string
  downloadUrl: string
  verified: boolean
  description: string
  learningThemes?: string[]
}

export const certifications: Certification[] = [
  {
    id: 'cisco-modern-ai',
    number: '01',
    index: '01',
    title: 'Introduction to Modern AI',
    issuer: 'Cisco Networking Academy',
    type: 'Certificate of Course Completion',
    recipient: 'Habib Munsar Ahmed',
    date: '27 September 2025',
    year: 2025,
    category: 'ai',
    categoryLabel: 'AI / Machine Learning',
    image: '/assets/certificates/01-cisco-modern-ai.jpg',
    imagePath: '/assets/certificates/01-cisco-modern-ai.jpg',
    imageWebp: '/assets/certificates/01-cisco-modern-ai.webp',
    downloadUrl: '/assets/certificates/01-cisco-modern-ai.jpg',
    verified: true,
    description:
      'Certificate of Course Completion issued by Cisco Networking Academy certifying completion of the Introduction to Modern AI curriculum, covering AI/ML fundamentals, object detection, image segmentation, language translation, LLMs, prompt engineering, LLM chatbots, tool-using LLMs, and multimodal prompting.',
    learningThemes: [
      'AI & Machine Learning Fundamentals',
      'Object Detection & Image Segmentation',
      'Language Translation Mechanisms',
      'Large Language Models (LLMs)',
      'Prompt Engineering & Multimodal Prompts',
      'LLM-Enabled Chatbots & Tool Integrations',
    ],
  },
  {
    id: 'ethical-hacking',
    number: '02',
    index: '02',
    title: 'Ethical Hacking Certification',
    issuer: 'Pitronix Solutions',
    type: 'Certificate of Completion',
    recipient: 'Md Habib Munsar Ahmed',
    date: '07 March 2026',
    year: 2026,
    certificateId: '#00102970',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    image: '/assets/certificates/02-ethical-hacking.jpg',
    imagePath: '/assets/certificates/02-ethical-hacking.jpg',
    imageWebp: '/assets/certificates/02-ethical-hacking.webp',
    downloadUrl: '/assets/certificates/02-ethical-hacking.jpg',
    verified: true,
    description:
      'Certificate of Completion issued by Pitronix Solutions (#00102970) certifying successful completion of the Ethical Hacking Certification, establishing verified competencies in ethical penetration testing, vulnerability discovery, perimeter network defenses, and defensive auditing.',
    learningThemes: [
      'Penetration Testing Workflows',
      'Vulnerability Assessment & Exploitation Control',
      'Network Security Auditing',
      'Defensive Monitoring & Packet Inspection',
      'Zero-Trust Architectural Hardening',
    ],
  },
  {
    id: 'adtu-sunstone-appreciation',
    number: '03',
    index: '03',
    title: 'Certificate of Appreciation',
    issuer: 'Sunstone / Assam Down Town University',
    type: 'Certificate of Appreciation',
    recipient: 'Md Habib Munsar Ahmed',
    date: '03 August 2026 – 19 August 2026',
    year: 2026,
    category: 'recognition',
    categoryLabel: 'Leadership & Involvement',
    image: '/assets/certificates/03-adtu-sunstone-appreciation.jpg',
    imagePath: '/assets/certificates/03-adtu-sunstone-appreciation.jpg',
    imageWebp: '/assets/certificates/03-adtu-sunstone-appreciation.webp',
    downloadUrl: '/assets/certificates/03-adtu-sunstone-appreciation.jpg',
    verified: true,
    description:
      'Certificate of Appreciation conferred by Sunstone and Assam Down Town University in recognition of dedicated efforts, valuable contribution, and active involvement as Organizer of Orientation and Independence Day Programs at ADTU campus from 3 August 2026 to 19 August 2026.',
    learningThemes: [
      'University Orientation Staging',
      'Independence Day Program Coordination',
      'Campus Logistics & Operational Execution',
      'Student Leadership & Public Event Stewardship',
    ],
  },
]
