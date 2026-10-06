import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'

// Phase 4 Modular Components
import { CareerTimeline } from '@/components/phase4/CareerTimeline'
import { CertificationVault } from '@/components/phase4/CertificationVault'
import { HackathonsSection } from '@/components/phase4/HackathonsSection'
import { BeyondDevelopment } from '@/components/phase4/BeyondDevelopment'
import { GrowthVisualization } from '@/components/phase4/GrowthVisualization'
import { EngineeringPhilosophy } from '@/components/phase4/EngineeringPhilosophy'
import { RecruiterMoment } from '@/components/phase4/RecruiterMoment'
import { JourneySummary } from '@/components/phase4/JourneySummary'
import { ResumeTransitionPhase5 } from '@/components/phase4/ResumeTransitionPhase5'

export function Phase4Journey() {
  const [activeCertRef, setActiveCertRef] = useState<string | null>(null)

  return (
    <SectionTransition id="achievements" ariaLabel="Phase 4 Engineering Journey and Achievements">
      {/* Intro Gateway: THE JOURNEY BEHIND THE BUILDER */}
      <div className="relative py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-amber-500/20 bg-amber-950/20 text-amber-300 font-mono text-[0.6875rem] tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          PHASE 04 // THE BUILDER'S ODYSSEY
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight"
        >
          THE JOURNEY BEHIND <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-indigo-300">
            THE BUILDER
          </span>
        </motion.h2>

        <p className="mt-4 text-sm sm:text-base text-slate-400 font-body max-w-xl mx-auto px-6">
          Tracing foundational computer science studies, verified industry credentials, competitive hackathon sprints, and university leadership.
        </p>
      </div>

      <SceneContainer maxWidth={1280}>
        {/* Scene 01: Career Timeline */}
        <CareerTimeline
          onSelectCertificate={(certRef) => {
            setActiveCertRef(certRef)
            const vaultEl = document.getElementById('certification-vault')
            if (vaultEl) {
              vaultEl.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        />

        {/* Scene 02: Certification Vault */}
        <div id="certification-vault">
          <CertificationVault
            externalSelectedId={activeCertRef}
            onClearExternal={() => setActiveCertRef(null)}
          />
        </div>

        {/* Scene 03: Hackathons & Competitions */}
        <HackathonsSection />

        {/* Scene 04: Beyond Development (Leadership & Initiative) */}
        <BeyondDevelopment />

        {/* Scene 05: Growth Dimensions */}
        <GrowthVisualization />

        {/* Scene 06: Engineering Philosophy */}
        <EngineeringPhilosophy />

        {/* Scene 07: Recruiter Moment */}
        <RecruiterMoment />

        {/* Scene 08: Journey Summary Arc */}
        <JourneySummary />
      </SceneContainer>

      {/* Phase 5 Transition Bridge: Resume Experience */}
      <ResumeTransitionPhase5 />
    </SectionTransition>
  )
}
