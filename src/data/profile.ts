export interface EducationItem {
  degree: string
  institution: string
  period: string
  score?: string
  semesters?: { label: string; score: number }[]
  highlights?: string[]
}

export interface LanguageItem {
  name: string
  proficiency: 'Professional' | 'Fluent' | 'Native'
  code: string
}

export interface LeadershipItem {
  id: string
  role: string
  program: string
  institution: string
  date: string
  description: string
  certificateAvailable?: boolean
}

export const profile = {
  name: {
    first: 'Md Habib',
    last: 'Munsar Ahmed',
    full: 'Md Habib Munsar Ahmed',
    display: ['MD HABIB', 'MUNSAR AHMED'],
  },
  title: 'Software Engineer',
  positioning: 'AI/ML • Full-Stack Development • Cybersecurity',
  tagline:
    'Building intelligent, scalable and secure software systems at the intersection of AI, full-stack engineering and cybersecurity.',
  statement:
    'Software Engineer and BCA student focused on building intelligent, scalable and secure software systems.',
  subStatement:
    'I enjoy turning complex problems into practical software solutions. My work combines software engineering, artificial intelligence, security, and modern web technologies.',
  location: 'Bongaigaon, Assam, India',
  contact: {
    email: 'habibmunsarahmed@gmail.com',
    phone: '8099321737',
  },
  social: {
    github: 'https://github.com/habib404ahmed',
    linkedin: 'https://www.linkedin.com/in/md-habib-munsar-ahmed-a44b23329/',
    youtube: 'https://youtube.com/@king_of_kali_linux_404',
  },
  education: [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Assam Down Town University',
      period: '2025–2028',
      semesters: [
        { label: '1st Semester SGPA', score: 8.05 },
        { label: '2nd Semester SGPA', score: 8.10 },
      ],
      highlights: ['Data Structures & Algorithms', 'Database Systems', 'Object-Oriented Programming'],
    },
    {
      degree: 'Higher Secondary (Class XII)',
      institution: 'Assam State Board',
      period: 'Completed',
      score: '58%',
    },
    {
      degree: 'Secondary Examination (Class X)',
      institution: 'Assam State Board',
      period: 'Completed',
      score: '72%',
    },
  ] as EducationItem[],
  languages: [
    { name: 'English', proficiency: 'Professional', code: 'EN' },
    { name: 'Hindi', proficiency: 'Fluent', code: 'HI' },
    { name: 'Assamese', proficiency: 'Fluent', code: 'AS' },
  ] as LanguageItem[],
  leadership: [
    {
      id: 'orientation-2026',
      role: 'Organizer',
      program: 'Orientation & Independence Day Programs',
      institution: 'Assam Down Town University',
      date: 'August 2026',
      description:
        'Contributed to the organization and successful execution of university Orientation and Independence Day programs, supporting event coordination and program activities.',
      certificateAvailable: true,
    },
  ] as LeadershipItem[],
  resume: {
    available: true,
    path: '/assets/Md-Habib-Munsar-Ahmed-Resume.pdf',
  },
  photo: {
    available: true,
    path: '/assets/images/profile.webp',
    fallback: '/assets/images/profile.jpg',
    alt: 'Md Habib Munsar Ahmed — Software Engineer',
    aspectRatio: '576 / 1024',
  },
}

export const navItems = [
  { id: 'about', label: 'Identity', href: '#about' },
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'achievements', label: 'Journey', href: '#achievements' },
  { id: 'resume', label: 'Resume', href: '#resume' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const initSequence = [
  { text: 'INITIALIZING SYSTEM...', delay: 0, duration: 1200 },
  { text: 'LOADING ENVIRONMENT...', delay: 1400, duration: 1000 },
  { text: 'ESTABLISHING CONNECTION...', delay: 2600, duration: 1000 },
  { text: 'SYSTEM ONLINE', delay: 3800, duration: 800 },
]
