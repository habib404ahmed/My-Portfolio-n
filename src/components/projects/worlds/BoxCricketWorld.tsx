import { motion } from 'framer-motion'

const ROSTER_ENTRIES = [
  { athlete: 'Ath. 0492', role: 'All-Rounder', branch: 'BCA', status: 'VERIFIED', time: '14:22' },
  { athlete: 'Ath. 0511', role: 'Bowler', branch: 'B.Tech', status: 'APPROVED', time: '14:35' },
  { athlete: 'Ath. 0620', role: 'Batsman', branch: 'MCA', status: 'VERIFIED', time: '15:10' },
]

export function BoxCricketWorld() {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-xl border border-emerald-500/30 bg-slate-950/90 overflow-hidden flex flex-col justify-between p-6">
      {/* Stadium Turf Floor & Floodlights Simulation */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(16,185,129,0.3) 0%, transparent 60%),
            linear-gradient(to bottom, transparent 60%, rgba(16,185,129,0.1) 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-wider">
            UNIBOX LEAGUE // TOURNAMENT PORTAL
          </span>
        </div>
        <span className="font-mono text-[0.625rem] text-slate-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
          SUPABASE DB SYNCED
        </span>
      </div>

      {/* Stadium Pitch Markings & Scoreboard Center */}
      <div className="relative z-10 flex-1 my-4 flex flex-col items-center justify-center">
        {/* Animated Scoreboard KPI Panel */}
        <div className="p-4 rounded-xl border border-emerald-500/40 bg-black/60 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)] text-center w-full max-w-sm mb-4">
          <div className="font-mono text-[0.625rem] text-emerald-400 font-bold uppercase tracking-widest mb-1">
            LEAGUE CREDENTIALING KPI
          </div>
          <div className="flex items-center justify-around font-mono my-2">
            <div>
              <div className="text-xl font-bold text-white">100%</div>
              <div className="text-[0.5625rem] text-slate-400">CLIENT SHA-256</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-xl font-bold text-emerald-300">ACTIVE</div>
              <div className="text-[0.5625rem] text-slate-400">ATHLETE ROSTER</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-xl font-bold text-teal-300">0 FLASH</div>
              <div className="text-[0.5625rem] text-slate-400">HYDRATION</div>
            </div>
          </div>
        </div>

        {/* Live Athlete Clearance Stream */}
        <div className="w-full max-w-sm space-y-1.5">
          {ROSTER_ENTRIES.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="px-3 py-1.5 rounded border border-white/5 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between font-mono text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-bold">{entry.athlete}</span>
                <span className="text-[0.625rem] text-slate-500">({entry.branch} &bull; {entry.role})</span>
              </div>
              <span className="text-[0.625rem] text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                {entry.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[0.625rem] text-slate-500">
        <span>NATIVE WEB CRYPTO API (HASHED PASSWORDS)</span>
        <span className="text-emerald-400">TAILWIND CSS v4</span>
      </div>
    </div>
  )
}
