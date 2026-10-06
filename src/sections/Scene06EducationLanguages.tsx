import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'

export function Scene06EducationLanguages() {
  const primaryEdu = profile.education[0]
  const secondaryEdus = profile.education.slice(1)

  return (
    <SectionTransition id="education" ariaLabel="Education and Languages" className="border-b border-white/5">
      <SceneContainer
        badge="SCENE 06 // ACADEMIC FOUNDATION"
        title="EDUCATION &"
        titleHighlight="LANGUAGES"
        subtitle="Rigorous foundational computer science coursework coupled with multilingual communication."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Degree Card (BCA) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-8 p-6 md:p-8 rounded-xl border border-cyan-500/20 bg-slate-950/70 backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">
                UNDERGRADUATE DEGREE // ONGOING
              </span>
              <span className="font-mono text-xs text-slate-400">
                {primaryEdu.period}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              {primaryEdu.degree}
            </h3>
            <p className="text-slate-300 font-body text-base mb-6">
              {primaryEdu.institution}
            </p>

            {/* Academic Performance / Semester SGPA Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {primaryEdu.semesters?.map((sem, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-between"
                >
                  <span className="font-mono text-xs text-slate-400">{sem.label}</span>
                  <span className="font-mono text-base font-bold text-cyan-300">
                    {sem.score.toFixed(2)} SGPA
                  </span>
                </div>
              ))}
            </div>

            {/* Prior Schooling Compact */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryEdus.map((edu, idx) => (
                <div key={idx} className="p-3 rounded border border-white/5 bg-black/30">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-300 font-medium">{edu.degree}</span>
                    <span className="text-slate-400 font-bold">{edu.score}</span>
                  </div>
                  <div className="text-[0.6875rem] text-slate-500 font-mono mt-1">
                    {edu.institution}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages Sidebar (Subtle & Elegant) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 p-6 md:p-8 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-xs text-indigo-400 uppercase tracking-widest mb-3">
                SCENE 07 // COMMUNICATION
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Languages
              </h3>
              <p className="text-xs text-slate-400 font-body mb-6 leading-relaxed">
                Clear communication across technical documentation, code reviews, and cross-functional collaboration.
              </p>

              <div className="space-y-3">
                {profile.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-3.5 rounded-lg border border-white/5 bg-slate-950/60 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded flex items-center justify-center font-mono text-[0.625rem] font-bold bg-white/5 text-cyan-400 border border-white/10">
                        {lang.code}
                      </span>
                      <span className="font-display text-sm font-semibold text-white">
                        {lang.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[0.625rem] text-slate-500 text-center">
              GLOBAL PERSPECTIVE &bull; LOCAL INSIGHT
            </div>
          </motion.div>
        </div>
      </SceneContainer>
    </SectionTransition>
  )
}
