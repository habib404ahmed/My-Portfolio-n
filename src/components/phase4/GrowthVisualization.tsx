import { motion } from 'framer-motion'

const DIMENSIONS = [
  {
    name: 'SOFTWARE ENGINEERING',
    desc: 'Modular architectures, type safety, database design, and algorithmic clarity.',
    connectionCount: 'Connected System Layer',
    color: '#06b6d4',
  },
  {
    name: 'AI / ML',
    desc: 'Multi-agent orchestration, intent routers, LLM tool harnesses, and RAG retrieval pipelines.',
    connectionCount: 'Active Reasoning Engines',
    color: '#a78bfa',
  },
  {
    name: 'CYBERSECURITY',
    desc: 'Unidirectional diode analysis, packet inspection, ethical hacking, and perimeter hardening.',
    connectionCount: 'Defensive Integrity Matrix',
    color: '#10b981',
  },
  {
    name: 'PRODUCT BUILDING',
    desc: 'Turning complex problems into human-centric, responsive platforms with end-to-end UX.',
    connectionCount: 'Shipped User Ecosystems',
    color: '#f59e0b',
  },
]

export function GrowthVisualization() {
  return (
    <div className="w-full mb-20 p-6 sm:p-10 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md relative overflow-hidden">
      {/* Background network grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 relative z-10">
        <div>
          <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest block mb-1">
            EVOLVING CAPABILITIES // TOPOLOGY
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Growth Dimensions
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-500 mt-2 sm:mt-0">
          NON-LINEAR REINFORCING FEEDBACK LOOPS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {DIMENSIONS.map((dim, idx) => (
          <motion.div
            key={dim.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: dim.color }} />
                <h4 className="font-mono text-xs font-bold text-white tracking-wide">
                  {dim.name}
                </h4>
              </div>

              <p className="text-xs text-slate-300 font-body leading-relaxed mb-4">
                {dim.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 font-mono text-[0.625rem] text-slate-400 flex items-center justify-between">
              <span>STATUS:</span>
              <span className="font-bold text-white" style={{ color: dim.color }}>
                {dim.connectionCount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
