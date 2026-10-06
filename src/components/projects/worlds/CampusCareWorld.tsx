import { motion } from 'framer-motion'

const DISPATCH_ROLES = [
  { role: 'STUDENT PORTAL', action: '1-Tap SOS Dispatch', color: '#f59e0b' },
  { role: 'SECURITY COMMAND', action: 'Perimeter Alert Sync', color: '#38bdf8' },
  { role: 'CLINICAL TRIAGE', action: '4-Tier Severity Scoring', color: '#10b981' },
  { role: 'FIRE SAFETY', action: 'Trapped Occupant Logic', color: '#f43f5e' },
]

export function CampusCareWorld() {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-xl border border-amber-500/20 bg-slate-950/90 overflow-hidden flex flex-col justify-between p-6">
      {/* Background Campus Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(245,158,11,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(245,158,11,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="font-mono text-xs text-amber-300 font-bold uppercase tracking-wider">
            CAMPUS CARE // EMERGENCY DISPATCH SOC
          </span>
        </div>
        <span className="font-mono text-[0.625rem] text-slate-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
          7-ROLE RBAC ACTIVE
        </span>
      </div>

      {/* SOS Signal Radar & Role Console Grid */}
      <div className="relative z-10 flex-1 my-4 flex flex-col items-center justify-center">
        {/* Pulsing SOS Beacon Graphic */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/50 backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.2)] text-center max-w-sm mb-6"
        >
          <div className="font-mono text-[0.625rem] text-amber-300 font-bold uppercase tracking-widest mb-1">
            CRITICAL SOS DISPATCH BEACON
          </div>
          <div className="font-display font-bold text-sm text-white">
            1-TAP GEOLOCATED EMERGENCY ACTIVATION
          </div>
          <div className="font-mono text-[0.5625rem] text-slate-400 mt-1">
            HTML5 Geolocation + Non-blocking Fallback
          </div>
        </motion.div>

        {/* Dispatch Roles Array */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-lg">
          {DISPATCH_ROLES.map((r, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border border-white/10 bg-slate-900/80 backdrop-blur-sm text-left shadow-lg"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.color }} />
                <span className="font-mono text-[0.5625rem] font-bold text-slate-200">{r.role}</span>
              </div>
              <div className="font-mono text-[0.625rem] text-slate-400 leading-snug">{r.action}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[0.625rem] text-slate-500">
        <span>ENGINEERING DAY RAPID-BUILD WINNER</span>
        <span className="text-amber-400/90">REACT + TAILWIND CSS</span>
      </div>
    </div>
  )
}
