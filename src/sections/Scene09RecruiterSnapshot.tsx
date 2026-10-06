import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { CinematicButton } from '@/components/ui/CinematicButton'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'

const STAT_BLOCKS = [
  { label: 'Role Focus', value: 'Software Engineer', detail: 'Systems & Architecture' },
  { label: 'Academic Base', value: 'BCA (2025–2028)', detail: 'Assam Down Town University' },
  { label: 'Completed Projects', value: '5+ Built', detail: 'End-to-End Production Systems' },
  { label: 'Core Domains', value: '3 Pillars', detail: 'AI/ML • Full-Stack • Security' },
]

const KEY_HIGHLIGHTS = [
  {
    category: 'AI / AGENT SYSTEMS',
    title: 'Multi-Agent & RAG Architectures',
    description: 'Developed autonomous agent workflows, context retrieval pipelines, and conversational LLM integrations.',
  },
  {
    category: 'FULL-STACK SYSTEMS',
    title: 'Modern Web & Microservice Delivery',
    description: 'Engineered high-performance React frontends backed by FastAPI and Node.js REST services with relational & NoSQL persistence.',
  },
  {
    category: 'CYBER DEFENSE',
    title: 'Ethical Hacking & Network Hardening',
    description: 'Trained in penetration testing methodologies, Kali Linux environments, zero-trust validation, and security auditing.',
  },
]

export function Scene09RecruiterSnapshot() {
  return (
    <SectionTransition id="recruiter" ariaLabel="Recruiter Snapshot and Overview">
      <SceneContainer
        badge="SCENE 11 // RECRUITER SNAPSHOT"
        title="AT A"
        titleHighlight="GLANCE"
        subtitle="Key engineering data, verified milestones, and technical capabilities synthesized for engineering leaders and hiring teams."
      >
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STAT_BLOCKS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-5 rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur-md"
            >
              <div className="font-mono text-[0.6875rem] text-slate-500 uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-xl md:text-2xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-cyan-400">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Core Highlight Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {KEY_HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[0.625rem] font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                  {item.category}
                </span>
                <h4 className="text-lg font-display font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 font-mono text-[0.6875rem] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                PRODUCTION READY
              </div>
            </motion.div>
          ))}
        </div>

        {/* Direct Action Hub for Recruiters */}
        <div className="p-6 md:p-8 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-display font-bold text-white mb-1">
              Interested in collaborating or discussing opportunities?
            </h4>
            <p className="font-mono text-xs text-slate-400">
              {profile.contact.email} &bull; {profile.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CinematicButton
              variant="primary"
              size="md"
              href={`mailto:${profile.contact.email}`}
              ariaLabel="Email Md Habib Munsar Ahmed"
            >
              INITIATE CONTACT
            </CinematicButton>

            <CinematicButton
              variant="secondary"
              size="md"
              href={profile.social.linkedin}
              target="_blank"
              ariaLabel="View LinkedIn Profile"
            >
              LINKEDIN
            </CinematicButton>
          </div>
        </div>
      </SceneContainer>
    </SectionTransition>
  )
}
