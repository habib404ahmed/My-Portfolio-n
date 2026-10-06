import { motion } from 'framer-motion'

const CITY_NODES = [
  { id: 'usr-1', label: 'USER (Customer)', type: 'REQUEST', x: '18%', y: '35%', color: '#38bdf8' },
  { id: 'hub-0', label: '5MINHELP CORE', type: 'MATCH ENGINE', x: '50%', y: '50%', color: '#34d399' },
  { id: 'srv-1', label: 'ELECTRICIAN', type: 'ACTIVE WORKER', x: '78%', y: '28%', color: '#f59e0b' },
  { id: 'srv-2', label: 'PLUMBER', type: 'ACTIVE WORKER', x: '82%', y: '70%', color: '#10b981' },
]

export function HelpHubWorld() {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-xl border border-emerald-500/20 bg-slate-950/90 overflow-hidden flex flex-col justify-between p-6">
      {/* Background City Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(52,211,153,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(52,211,153,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-wider">
            5MINHELP // LOCAL SERVICE MARKETPLACE
          </span>
        </div>
        <span className="font-mono text-[0.625rem] text-slate-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
          SOCKET.IO BROADCAST ACTIVE
        </span>
      </div>

      {/* Futuristic Map Hub Simulation */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
        <div className="relative w-full max-w-md h-52 sm:h-60 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm p-4 overflow-hidden">
          {/* Connecting Animated Route Vectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <line x1="22%" y1="38%" x2="50%" y2="50%" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="78%" y2="30%" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="80%" y2="68%" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {CITY_NODES.map((node) => (
            <motion.div
              key={node.id}
              whileHover={{ scale: 1.08 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-lg border border-white/10 bg-slate-900/90 text-left backdrop-blur-md shadow-lg"
              style={{ left: node.x, top: node.y }}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: node.color }} />
                <span className="font-mono text-[0.5625rem] text-slate-400 font-bold">{node.type}</span>
              </div>
              <div className="font-display font-semibold text-[0.6875rem] text-white">{node.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[0.625rem] text-slate-500">
        <span>ORDER LIFECYCLE: REQUEST &rarr; MATCH &rarr; DISPATCH</span>
        <span className="text-emerald-400/90">MYSQL 8.0 RELATIONAL DB</span>
      </div>
    </div>
  )
}
