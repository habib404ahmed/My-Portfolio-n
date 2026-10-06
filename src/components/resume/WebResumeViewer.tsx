import { useState } from 'react'
import { motion } from 'framer-motion'
import { resumeData } from '@/data/resume'
import { profile } from '@/data/profile'
import { CinematicButton } from '@/components/ui/CinematicButton'
import { ResumeModalViewer } from './ResumeModalViewer'

const RESUME_SECTIONS = [
  { id: 'res-summary', label: '01. Summary' },
  { id: 'res-skills', label: '02. Technical Skills' },
  { id: 'res-projects', label: '03. Projects' },
  { id: 'res-education', label: '04. Education' },
  { id: 'res-certifications', label: '05. Certifications' },
  { id: 'res-leadership', label: '06. Leadership' },
  { id: 'res-languages', label: '07. Languages' },
  { id: 'res-contact', label: '08. Contact' },
]

export function WebResumeViewer() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('res-summary')

  const scrollToSection = (id: string) => {
    setActiveNav(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div id="resume-experience" className="w-full">
      {/* Top Action Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md mb-8 no-print">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              OFFICIAL CURRICULUM VITAE
            </div>
            <div className="font-mono text-[0.625rem] text-slate-400">
              ATS-FRIENDLY &bull; VERIFIED INDUSTRY DATA
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Download PDF Button - Primary CTA */}
          <CinematicButton
            variant="primary"
            size="sm"
            href={profile.resume.path}
            download={true}
            ariaLabel="Download ATS-Friendly PDF Resume"
          >
            DOWNLOAD RESUME &rarr;
          </CinematicButton>

          {/* View Fullscreen Modal - Secondary CTA */}
          <button
            onClick={() => setModalOpen(true)}
            className="px-3.5 py-2 rounded-lg border border-cyan-500/30 bg-cyan-950/20 font-mono text-xs text-cyan-300 hover:text-white hover:border-cyan-400/50 transition-all flex items-center gap-1.5"
            aria-label="View Resume in Full-Screen Modal"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>VIEW RESUME</span>
          </button>

          {/* Print Resume Button */}
          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 font-mono text-xs text-slate-300 hover:text-white hover:border-white/25 transition-all flex items-center gap-1.5"
            aria-label="Print Resume Document"
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>PRINT</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Index (Desktop Only) */}
        <aside className="lg:col-span-3 sticky top-24 hidden lg:block no-print">
          <div className="p-5 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md">
            {/* Candidate Canonical Portrait Card */}
            <div className="mb-5 overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-900/60 p-2.5 text-center">
              <div className="relative aspect-[576/1024] max-h-[220px] mx-auto overflow-hidden rounded-lg bg-black/40">
                <img
                  src="/assets/images/profile-400.webp"
                  alt="Md Habib Munsar Ahmed — Software Engineer"
                  className="w-full h-full object-contain filter contrast-105"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (target.src.endsWith('.webp')) target.src = '/assets/images/profile.jpg'
                  }}
                />
              </div>
              <div className="mt-2.5 font-display text-xs font-bold text-white tracking-wide">
                {profile.name.full}
              </div>
              <div className="font-mono text-[0.625rem] text-cyan-400 uppercase tracking-wider font-semibold">
                Software Engineer
              </div>
            </div>

            <div className="font-mono text-[0.625rem] text-slate-400 uppercase tracking-widest mb-3">
              RESUME SECTIONS
            </div>
            <nav className="space-y-1">
              {RESUME_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                    activeNav === sec.id
                      ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href={profile.resume.path}
                download="MD_Habib_Munsar_Ahmed_Resume.pdf"
                className="w-full py-2 px-3 rounded-lg border border-cyan-500/20 bg-cyan-950/30 text-cyan-300 font-mono text-xs text-center block hover:bg-cyan-500/20 transition-all"
              >
                MD_Habib_Munsar_Ahmed_Resume.pdf (4.5 KB)
              </a>
            </div>
          </div>
        </aside>

        {/* Right: The Clean, Professional Resume Document */}
        <div className="lg:col-span-9">
          <div
            id="web-resume-document"
            className="w-full rounded-2xl border border-white/10 bg-slate-950 p-6 sm:p-12 md:p-14 shadow-2xl relative"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* 1. Header & Contact */}
            <div className="border-b border-white/15 pb-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  {resumeData.name}
                </h1>
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  {resumeData.title}
                </span>
              </div>

              <div className="font-mono text-xs text-slate-300 mb-4">
                {resumeData.positioning}
              </div>

              {/* Clickable Contact Strip */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 font-mono text-xs text-slate-400">
                <span>{resumeData.contact.location}</span>
                <span>&bull;</span>
                <a href={`tel:${resumeData.contact.phone}`} className="hover:text-cyan-300 transition-colors">
                  {resumeData.contact.phone}
                </a>
                <span>&bull;</span>
                <a href={`mailto:${resumeData.contact.email}`} className="hover:text-cyan-300 transition-colors">
                  {resumeData.contact.email}
                </a>
                <span>&bull;</span>
                <a
                  href={resumeData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  GitHub
                </a>
                <span>&bull;</span>
                <a
                  href={resumeData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* 01. Summary */}
            <section id="res-summary" className="mb-8 scroll-mt-24">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-1.5">
                01 // Professional Summary
              </h2>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                {resumeData.summary}
              </p>
            </section>

            {/* 02. Technical Skills */}
            <section id="res-skills" className="mb-8 scroll-mt-24">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-1.5">
                02 // Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {resumeData.technicalSkills.map((s) => (
                  <div key={s.category} className="p-2.5 rounded border border-white/5 bg-black/40">
                    <span className="text-slate-400 font-bold mr-2 uppercase">{s.category}:</span>
                    <span className="text-slate-200">{s.skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 03. Projects */}
            <section id="res-projects" className="mb-8 scroll-mt-24">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-1.5">
                03 // Software Engineering Projects
              </h2>
              <div className="space-y-6">
                {resumeData.projects.map((proj) => (
                  <div key={proj.title} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <h3 className="text-base font-display font-bold text-white">
                        {proj.title}
                      </h3>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        GitHub &rarr;
                      </a>
                    </div>
                    <div className="font-mono text-xs text-slate-400 mb-1">
                      {proj.subtitle}
                    </div>
                    <div className="font-mono text-[0.6875rem] text-slate-500 mb-3">
                      STACK: {proj.technologies}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-body">
                      {proj.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-mono mt-0.5">&bull;</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* 04. Education */}
            <section id="res-education" className="mb-8 scroll-mt-24">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-1.5">
                04 // Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-display font-bold text-white">
                        {edu.degree}
                      </h3>
                      <div className="text-xs text-slate-300 font-body">{edu.institution}</div>
                      <div className="font-mono text-xs text-slate-400 mt-1">
                        {edu.details.join(' | ')}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-500 shrink-0">{edu.period}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 05. Certifications */}
            <section id="res-certifications" className="mb-8 scroll-mt-24">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-1.5">
                05 // Certifications
              </h2>
              <div className="space-y-3 font-mono text-xs">
                {resumeData.certifications.map((c) => (
                  <div key={c.title} className="p-3 rounded border border-white/5 bg-black/30">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <span className="font-bold text-white">{c.title}</span>
                      <span className="text-slate-500">{c.date}</span>
                    </div>
                    <div className="text-cyan-400 mb-1">
                      {c.issuer} {c.credentialId && `| ID: ${c.credentialId}`}
                    </div>
                    <div className="text-slate-400 font-body text-xs">{c.details}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 06. Leadership */}
            <section id="res-leadership" className="mb-8 scroll-mt-24">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-1.5">
                06 // Leadership & Involvement
              </h2>
              {resumeData.leadership.map((l) => (
                <div key={l.role} className="text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <span className="font-display font-bold text-white text-sm">{l.role}</span>
                    <span className="font-mono text-slate-500">{l.date}</span>
                  </div>
                  <div className="font-mono text-cyan-400 mb-1">{l.organization}</div>
                  <p className="text-slate-300 font-body leading-relaxed">{l.description}</p>
                </div>
              ))}
            </section>

            {/* 07. Languages */}
            <section id="res-languages" className="mb-8 scroll-mt-24">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3 border-b border-white/10 pb-1.5">
                07 // Languages
              </h2>
              <div className="flex flex-wrap gap-4 font-mono text-xs text-slate-300">
                {resumeData.languages.map((lang) => (
                  <span key={lang.name} className="px-3 py-1 rounded border border-white/10 bg-black/40">
                    <strong className="text-white">{lang.name}:</strong> {lang.level}
                  </span>
                ))}
              </div>
            </section>

            {/* 08. Contact & Verification */}
            <section id="res-contact" className="pt-6 border-t border-white/15 scroll-mt-24">
              <h2 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest mb-3">
                08 // Verification & Direct Contact
              </h2>
              <p className="text-xs text-slate-400 font-body mb-4">
                This document represents verified academic milestones, independent software repositories, and industry credentials. References, transcripts, and repository access are available upon request.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${resumeData.contact.email}`}
                  className="font-mono text-xs text-cyan-300 hover:underline"
                >
                  {resumeData.contact.email}
                </a>
                <span className="text-slate-600">&bull;</span>
                <span className="font-mono text-xs text-slate-400">{resumeData.contact.phone}</span>
                <span className="text-slate-600">&bull;</span>
                <span className="font-mono text-xs text-slate-400">{resumeData.contact.location}</span>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Full-Screen PDF Modal */}
      <ResumeModalViewer isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
