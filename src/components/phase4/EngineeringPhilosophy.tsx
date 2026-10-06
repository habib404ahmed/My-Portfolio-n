import { motion } from 'framer-motion'

export function EngineeringPhilosophy() {
  return (
    <div className="w-full my-20 py-16 px-6 sm:px-12 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-center relative overflow-hidden">
      {/* Background radial highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Core Mantras */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm font-bold text-cyan-400 tracking-widest uppercase mb-8">
          <span>BUILD.</span>
          <span className="text-slate-600">&bull;</span>
          <span>LEARN.</span>
          <span className="text-slate-600">&bull;</span>
          <span>SECURE.</span>
          <span className="text-slate-600">&bull;</span>
          <span>IMPROVE.</span>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white leading-snug tracking-tight mb-6"
        >
          &ldquo;I believe the best software is not only functional, but thoughtful, scalable and secure.&rdquo;
        </motion.blockquote>

        <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
          MD HABIB MUNSAR AHMED &bull; ENGINEERING CREED
        </p>
      </div>
    </div>
  )
}
