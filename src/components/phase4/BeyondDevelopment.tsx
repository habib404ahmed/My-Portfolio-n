import { motion } from 'framer-motion'

const LEADERSHIP_PILLARS = [
  {
    title: 'EVENT ORGANIZATION',
    subtitle: 'University Programs & Logistics',
    description:
      'Coordinated program activities, scheduling, and staging for university Orientation and Independence Day events with faculty and student teams.',
    highlight: 'Assam Down Town University / Sunstone',
    color: '#f59e0b',
  },
  {
    title: 'TEAM COLLABORATION',
    subtitle: 'Hackathon & Engineering Sprints',
    description:
      'Partnered in multi-disciplinary developer sprints (Smart India Hackathon Team Sentra 1), aligning backend architectures with security specifications.',
    highlight: 'Multi-Role Team Dynamic',
    color: '#06b6d4',
  },
  {
    title: 'TECHNICAL INITIATIVE',
    subtitle: 'Autonomous Systems & Open Source',
    description:
      'Self-driven architecture of 5 complete software repositories exploring passive unidirectional networking, multi-agent frameworks, and local marketplaces.',
    highlight: '5 Production Codebases',
    color: '#a78bfa',
  },
  {
    title: 'CONTINUOUS LEARNING',
    subtitle: 'Institutional & Industry Curricula',
    description:
      'Actively pursuing verified certifications across modern AI architectures and ethical hacking while maintaining high academic performance (8.05 & 8.10 SGPA).',
    highlight: 'Rigorous Academic Record',
    color: '#10b981',
  },
]

export function BeyondDevelopment() {
  return (
    <div className="w-full mb-20">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-1">
            LEADERSHIP & INVOLVEMENT
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Beyond Development
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-500 hidden sm:block">
          CHARACTER & EXECUTION
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {LEADERSHIP_PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-6 rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ background: pillar.color }} />
                <span className="font-mono text-[0.625rem] font-bold text-slate-400 tracking-wider">
                  {pillar.title}
                </span>
              </div>

              <h4 className="text-base font-display font-bold text-white mb-2">
                {pillar.subtitle}
              </h4>

              <p className="text-xs text-slate-400 font-body leading-relaxed mb-4">
                {pillar.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 font-mono text-[0.6875rem] text-slate-300">
              {pillar.highlight}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
