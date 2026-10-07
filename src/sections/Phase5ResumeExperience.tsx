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
          className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full border border-[rgba(0,217,255,0.25)] bg-[#00D9FF]/[0.05] text-[#00D9FF] font-mono text-[0.6875rem] tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
          PHASE 05 // THE RESUME EXPERIENCE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#F4F7FA] tracking-tight leading-tight mb-3"
        >
          ENGINEERING <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] via-[#38E8FF] to-[#F4F7FA]">
            CURRICULUM VITAE
          </span>
        </motion.h2>

        <p className="text-sm sm:text-base text-[#A8B4C2] font-body max-w-xl mx-auto px-6 mb-2">
          &ldquo;Building intelligent, scalable and secure software systems.&rdquo;
        </p>

        <p className="font-mono text-xs text-[#687687] tracking-wider">
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
