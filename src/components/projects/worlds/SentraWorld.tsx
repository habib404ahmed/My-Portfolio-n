import { motion } from 'framer-motion'

const TOPOLOGY_NODES = [
  { id: '10.0.1.4', label: 'OPTICAL DIODE TX', x: '15%', y: '30%', status: 'STREAMING', color: '#06b6d4' },
  { id: '10.0.1.5', label: 'UNIDIRECTIONAL RX', x: '45%', y: '25%', status: 'LOCKED', color: '#38bdf8' },
  { id: '10.0.2.18', label: 'SCAPY STREAM PARSER', x: '45%', y: '65%', status: 'PARSING', color: '#818cf8' },
  { id: '10.0.3.99', label: 'ANOMALY DETECTOR', x: '80%', y: '45%', status: 'ANALYZING', color: '#f43f5e' },
]

const SIMULATED_PACKETS = [
  { pcap: '0x0A0D0D0A', proto: 'TCP', port: '443', iat: '0.0024s', threat: 'CLEAN' },
  { pcap: '0x00000000', proto: 'UDP', port: '53', iat: '0.0011s', threat: 'CLEAN' },
  { pcap: '0xFF01A4B2', proto: 'TCP SYN', port: '8080', iat: '0.0001s', threat: 'SUSPICIOUS_BURST' },
]

export function SentraWorld() {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-xl border border-cyan-500/20 bg-slate-950/90 overflow-hidden flex flex-col justify-between p-6">
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6,182,212,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6,182,212,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Radial scanning beam simulation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{
          background: 'conic-gradient(from 0deg, rgba(6,182,212,0.4) 0deg, transparent 60deg, transparent 360deg)',
        }}
        aria-hidden="true"
      />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-wider">
            SENTRA // UNIDIRECTIONAL SOC RADAR
          </span>
        </div>
        <span className="font-mono text-[0.625rem] text-slate-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
          PASSIVE MONITORING ACTIVE
        </span>
      </div>

      {/* Network Topology Visualizer */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center">
        <div className="relative w-full max-w-md h-52 sm:h-60 border border-white/5 rounded-lg bg-black/40 backdrop-blur-sm p-4">
          {/* Animated Bus Stream Line */}
          <div className="absolute top-1/2 left-8 right-8 h-px bg-cyan-500/30 -translate-y-1/2 pointer-events-none">
            <motion.div
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
          </div>

          {/* Interactive Topology Nodes */}
          {TOPOLOGY_NODES.map((node) => (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded border border-white/10 bg-slate-900/90 text-left backdrop-blur-md shadow-lg"
              style={{ left: node.x, top: node.y }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: node.color }} />
                <span className="font-mono text-[0.5625rem] text-slate-300 font-bold">{node.id}</span>
              </div>
              <div className="font-mono text-[0.5rem] text-slate-400">{node.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packet Stream & Ingestion Ticker */}
      <div className="relative z-10 border-t border-white/10 pt-3">
        <div className="font-mono text-[0.625rem] text-slate-500 mb-1.5 uppercase tracking-widest flex items-center justify-between">
          <span>REAL-TIME STREAMING PACKET AGGREGATION</span>
          <span>STRICT 5-TUPLE NO-ACK MODE</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SIMULATED_PACKETS.map((pkt, i) => (
            <div
              key={i}
              className="p-2 rounded border border-white/5 bg-black/50 font-mono text-[0.6875rem] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">{pkt.proto}</span>
                <span className="text-slate-500">:{pkt.port}</span>
              </div>
              <span
                className={`text-[0.625rem] font-bold ${
                  pkt.threat.includes('SUSPICIOUS') ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {pkt.threat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
