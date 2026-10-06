import { motion } from 'framer-motion'
import { hackathonsData } from '@/data/hackathons'

export function HackathonsSection() {
  return (
    <div className="w-full mb-20">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
            COMPETITIONS & INITIATIVES
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Hackathons & Coding Challenges
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-500 hidden sm:block">
          NATIONAL & CAMPUS PLATFORMS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathonsData.map((hack, idx) => (
          <motion.div
            key={hack.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  {hack.statusTag}
                </span>
                <span className="font-mono text-xs text-slate-500">{hack.year}</span>
              </div>

              <h4 className="text-xl font-display font-bold text-white mb-2">
                {hack.event}
              </h4>

              {hack.problemStatement && (
                <div className="p-3 rounded-lg border border-cyan-500/15 bg-cyan-950/20 font-mono text-xs text-cyan-200 mb-3 leading-relaxed">
                  {hack.problemStatement}
                </div>
              )}

              {hack.team && (
                <div className="font-mono text-xs text-slate-400 mb-3">
                  <span className="text-slate-500 uppercase text-[0.625rem] block">TEAM</span>
                  {hack.team}
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed mb-4">
                {hack.context}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400">
                PROJECT: <strong className="text-white">{hack.project}</strong> &bull; {hack.role}
              </span>
              {hack.link && (
                <a
                  href={hack.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  SOURCE &rarr;
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
