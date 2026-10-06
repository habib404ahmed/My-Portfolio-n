import { motion } from 'framer-motion'

const SUB_AGENTS = [
  { id: 'task-agent', label: 'TASK AGENT', desc: 'Priority queues & state updates', color: '#38bdf8' },
  { id: 'calendar-agent', label: 'CALENDAR AGENT', desc: 'Date parsing & agenda scheduling', color: '#a78bfa' },
  { id: 'notes-agent', label: 'NOTES AGENT', desc: 'Context capture & semantic tagging', color: '#34d399' },
]

export function MultiAgentWorld() {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-xl border border-purple-500/20 bg-slate-950/90 overflow-hidden flex flex-col justify-between p-6">
      {/* Background Neural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(167,139,250,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-purple-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="font-mono text-xs text-purple-300 font-bold uppercase tracking-wider">
            AI AGENT ORCHESTRATION // RUNTIME MATRIX
          </span>
        </div>
        <span className="font-mono text-[0.625rem] text-slate-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/30">
          ROUTER: ACTIVE
        </span>
      </div>

      {/* Central Primary Agent & Dispatched Sub-Agents Constellation */}
      <div className="relative z-10 flex-1 my-4 flex flex-col items-center justify-center">
        {/* Primary Agent Hub */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 p-4 rounded-xl border border-purple-400/40 bg-purple-950/60 backdrop-blur-md shadow-[0_0_30px_rgba(167,139,250,0.2)] text-center max-w-xs mb-8"
        >
          <div className="font-mono text-[0.625rem] text-purple-300 font-bold uppercase tracking-widest mb-1">
            CORE CONTROLLER
          </div>
          <div className="font-display font-bold text-sm text-white">
            PRIMARY AGENT ROUTER
          </div>
          <div className="font-mono text-[0.5625rem] text-slate-400 mt-1">
            Natural Language Intent Parsing
          </div>
        </motion.div>

        {/* Radiating Sub-Agents */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg">
          {SUB_AGENTS.map((agent) => (
            <motion.div
              key={agent.id}
              whileHover={{ y: -3 }}
              className="p-3 rounded-lg border border-white/10 bg-slate-900/80 backdrop-blur-sm text-left shadow-lg relative group transition-all"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: agent.color }} />
                <span className="font-mono text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                  {agent.label}
                </span>
              </div>
              <div className="font-mono text-[0.625rem] text-slate-400 leading-snug">
                {agent.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Execution Channel Footer */}
      <div className="relative z-10 border-t border-white/10 pt-3">
        <div className="flex items-center justify-between font-mono text-[0.625rem] text-slate-500">
          <span>INTENT DISPATCH LOOP</span>
          <span className="text-purple-400/80">SQLITE + PYDANTIC VALIDATION</span>
        </div>
      </div>
    </div>
  )
}
