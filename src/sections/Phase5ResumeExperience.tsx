import { motion } from 'framer-motion'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'
import { WebResumeViewer } from '@/components/resume/WebResumeViewer'
import { ResumeCTA } from '@/components/resume/ResumeCTA'

export function Phase5ResumeExperience() {
  return (
    <SectionTransition id="resume" ariaLabel="Phase 5 The Resume Experience" className="border-b border-[rgba(140,190,210,0.16)]">
      {/* Intro Header */}
      <div className="relative pb-8 text-center no-print">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full border border-[rgba(0,217,255,0.25)] bg-[#00D9FF]/[0.05] text-[#00D9FF] font-mono text-[13px] tracking-[0.12em] uppercase font-semibold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
          PHASE 05 // THE RESUME EXPERIENCE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(32px,5vw,56px)] font-display font-extrabold text-[#F5F8FA] tracking-tight leading-[1.1] mb-3 uppercase"
        >
          ENGINEERING <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#38E8FF] to-[#F4F7FA]">
            CURRICULUM VITAE
          </span>
        </motion.h2>

        <p className="text-[clamp(16px,1.2vw,18px)] text-[#A8B4C2] font-body max-w-[65ch] mx-auto px-6 mb-3 leading-[1.65]">
          &ldquo;Building intelligent, scalable and secure software systems.&rdquo;
        </p>

        <p className="font-mono text-[13px] sm:text-[14px] text-slate-400 tracking-wider font-medium">
          PROFESSIONAL &bull; RECRUITER-FRIENDLY &bull; ATS COMPLIANT
        </p>
      </div>

      <SceneContainer maxWidth={1280}>
        {/* Interactive Web Resume & Print Document */}
        <WebResumeViewer />
      </SceneContainer>

      {/* Resume CTA & Phase 6 Transition */}
      <ResumeCTA />
    </SectionTransition>
  )
}
