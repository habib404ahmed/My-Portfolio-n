import { motion } from 'framer-motion'
import { SectionTransition } from '@/components/ui/SectionTransition'

const CODE_FRAGMENTS = [
  'class IntelligentAgent {',
  '  async processTask(query: QueryContext): Promise<AgentResponse> {',
  '    const context = await this.vectorStore.similaritySearch(query);',
  '    const verified = await this.securityGuard.validate(context);',
  '    return this.llmEngine.generateResponse(verified);',
  '  }',
  '}',
]

const SYSTEM_NODES = [
  { id: '01', title: 'Full-Stack Architecture', desc: 'Modular frontend interfaces & resilient backend APIs' },
  { id: '02', title: 'Applied AI & ML', desc: 'Autonomous agent pipelines, embeddings & RAG systems' },
  { id: '03', title: 'Security Hardening', desc: 'Zero-trust authentication, input hygiene & network defense' },
  { id: '04', title: 'Cloud & Database', desc: 'Relational schemas, scalable caching & continuous delivery' },
]

export function Scene01EnterSystem() {
  return (
    <SectionTransition id="enter-system" ariaLabel="Enter the Engineering System" className="border-b border-white/5">
      <div className="page-container flex flex-col items-center text-center">
        {/* Subtle Chapter Marker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/[0.03] font-mono text-[0.6875rem] tracking-widest uppercase text-slate-400"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>SCENE 01 // ARCHITECTURAL FOUNDATION</span>
        </motion.div>

        {/* Scene Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-tight mb-4"
        >
          ENTER THE{' '}
          <span className="text-cyan-400">
            ENGINEERING SYSTEM
          </span>
        </motion.h2>

        {/* Scene Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base text-slate-300 font-body max-w-2xl leading-relaxed mb-12"
        >
          Step beyond the interface. Explore the software methodology, code quality standards,
          and core technical focus areas of an engineer dedicated to building reliable digital systems.
        </motion.p>

        {/* 4 System Status Cards — Strict Clean Grid (Desktop: 4, Tablet: 2, Mobile: 1) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {SYSTEM_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-5 rounded-xl border border-white/10 bg-slate-950/40 backdrop-blur-sm text-left flex flex-col justify-between min-h-[120px] hover:border-white/20 transition-all duration-300"
            >
              <div>
                <span className="font-mono text-[0.6875rem] font-bold text-slate-500 block mb-1.5">{node.id}</span>
                <div className="font-display text-sm font-bold text-slate-100 tracking-wide mb-2">
                  {node.title}
                </div>
              </div>
              <p className="font-body text-xs text-slate-400 leading-relaxed">
                {node.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Code / Architecture Panel Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl rounded-xl border border-white/10 bg-slate-950/80 p-5 font-mono text-left mb-12 shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
            <span className="text-[0.6875rem] text-slate-400 uppercase tracking-widest font-semibold font-mono">
              agent.service.ts &mdash; AI Service Architecture
            </span>
          </div>
          <pre className="overflow-x-auto text-[0.8125rem] leading-relaxed text-cyan-300/90 font-mono py-1">
            {CODE_FRAGMENTS.map((line, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="text-slate-600 select-none w-5 text-right font-mono">{idx + 1}</span>
                <span className="whitespace-pre">{line}</span>
              </div>
            ))}
          </pre>
        </motion.div>

        {/* Proceed to Identity */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-slate-200 font-display text-xs tracking-wider uppercase hover:bg-white/[0.08] hover:text-white transition-all duration-300 group"
        >
          <span>PROCEED TO IDENTITY</span>
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </div>
    </SectionTransition>
  )
}
