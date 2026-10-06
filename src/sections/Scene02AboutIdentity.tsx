import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'
import { ProfilePhoto } from '@/components/ui/ProfilePhoto'

const FOCUS_PILLARS = [
  {
    title: 'AI / Machine Learning',
    desc: 'Autonomous agent architectures, retrieval-augmented generation (RAG), and intelligent reasoning systems.',
    accent: '#a78bfa',
    border: 'rgba(167, 139, 250, 0.2)',
    bg: 'rgba(167, 139, 250, 0.03)',
  },
  {
    title: 'Full-Stack Development',
    desc: 'Scalable modern web applications, reactive user interfaces, and robust backend microservices.',
    accent: '#38bdf8',
    border: 'rgba(56, 189, 248, 0.2)',
    bg: 'rgba(56, 189, 248, 0.03)',
  },
  {
    title: 'Cybersecurity',
    desc: 'Ethical penetration testing, secure software lifecycles, and zero-trust network defense.',
    accent: '#10b981',
    border: 'rgba(16, 185, 129, 0.2)',
    bg: 'rgba(16, 185, 129, 0.03)',
  },
]

export function Scene02AboutIdentity() {
  return (
    <SectionTransition id="about" ariaLabel="Engineer Identity" className="py-24 md:py-32 border-b border-white/5">
      <SceneContainer
        badge="SCENE 02 // IDENTITY & PHILOSOPHY"
        title="ENGINEER"
        titleHighlight="PROFILE"
        subtitle="Bridging algorithmic intelligence, secure engineering fundamentals, and high-performance web architecture."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Editorial Portrait Asset */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl border border-white/10 bg-slate-950/60 p-3.5 backdrop-blur-sm shadow-xl">
              <ProfilePhoto visible={true} size="standard" />

              {/* Editorial Caption */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-3.5 p-3 rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-md flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="font-display text-xs font-semibold text-slate-200">Md Habib Munsar Ahmed</span>
                </div>
                <span className="font-mono text-[0.6875rem] text-slate-400">
                  {profile.location.split(',')[0]}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Narrative, Human Voice, Capability Pillars & Metadata */}
          <div className="lg:col-span-7 flex flex-col space-y-7">
            {/* Core Statement Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-6 md:p-8 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="font-mono text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                CORE STATEMENT
              </div>
              <p className="text-xl md:text-2xl font-display font-medium text-slate-100 leading-snug">
                &ldquo;Software Engineer and BCA student focused on building intelligent, scalable and secure software systems.&rdquo;
              </p>
            </motion.div>

            {/* Human Engineering Philosophy Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3 text-slate-300 font-body text-base leading-relaxed"
            >
              <p>
                I enjoy turning complex problems into practical software. My engineering practice combines modern web architecture, artificial intelligence, and cybersecurity fundamentals to build systems where intelligence, reliability and security meet.
              </p>
              <p className="text-slate-400 text-sm">
                Currently exploring autonomous AI multi-agent workflows, full-stack microservice communication, and network security hardening.
              </p>
            </motion.div>

            {/* Three Capability Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {FOCUS_PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="p-5 rounded-xl border flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:border-white/25"
                  style={{
                    borderColor: pillar.border,
                    backgroundColor: pillar.bg,
                  }}
                >
                  <div
                    className="font-display font-bold text-sm mb-2"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.title}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-body">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Education Metadata Row: Strict 3-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-white/10 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                <span className="text-slate-500 block text-[0.625rem] uppercase tracking-wider mb-1 font-semibold">AFFILIATION</span>
                <span className="text-slate-200 font-medium leading-tight block">Assam Down Town University</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                <span className="text-slate-500 block text-[0.625rem] uppercase tracking-wider mb-1 font-semibold">ACADEMIC PERIOD</span>
                <span className="text-slate-200 font-medium block">2025 &mdash; 2028 (BCA)</span>
              </div>
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02]">
                <span className="text-slate-500 block text-[0.625rem] uppercase tracking-wider mb-1 font-semibold">LOCATION</span>
                <span className="text-slate-200 font-medium block">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </SceneContainer>
    </SectionTransition>
  )
}
