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
              <span className="font-mono text-[13px] text-cyan-400 uppercase tracking-[0.12em] font-semibold">
                UNDERGRADUATE DEGREE // ONGOING
              </span>
              <span className="font-mono text-[14px] text-slate-300 font-medium">
                {primaryEdu.period}
              </span>
            </div>

            <h3 className="text-[clamp(20px,2.2vw,26px)] font-display font-extrabold text-[#F5F8FA] mb-2 leading-tight">
              {primaryEdu.degree}
            </h3>
            <p className="text-[#A8B4C2] font-body text-[16px] sm:text-[17px] mb-6 leading-relaxed">
              {primaryEdu.institution}
            </p>

            {/* Academic Performance / Semester SGPA Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {primaryEdu.semesters?.map((sem, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-between"
                >
                  <span className="font-mono text-[13px] sm:text-[14px] text-slate-300 font-medium">{sem.label}</span>
                  <span className="font-mono text-[16px] sm:text-[17px] font-bold text-cyan-300">
                    {sem.score.toFixed(2)} SGPA
                  </span>
                </div>
              ))}
            </div>

            {/* Prior Schooling Compact */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryEdus.map((edu, idx) => (
                <div key={idx} className="p-3.5 rounded-lg border border-white/10 bg-black/40">
                  <div className="flex items-center justify-between font-mono text-[13px] sm:text-[14px]">
                    <span className="text-[#F5F8FA] font-medium">{edu.degree}</span>
                    <span className="text-cyan-400 font-bold">{edu.score}</span>
                  </div>
                  <div className="text-[13px] text-slate-400 font-body mt-1 leading-normal">
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
              <div className="font-mono text-[13px] text-indigo-400 uppercase tracking-[0.12em] font-semibold mb-3">
                SCENE 07 // COMMUNICATION
              </div>
              <h3 className="text-[20px] sm:text-[22px] font-display font-bold text-[#F5F8FA] mb-2">
                Languages
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#A8B4C2] font-body mb-6 leading-[1.6]">
                Clear communication across technical documentation, code reviews, and cross-functional collaboration.
              </p>

              <div className="space-y-3">
                {profile.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-3.5 rounded-xl border border-white/10 bg-slate-950/70 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded flex items-center justify-center font-mono text-[12px] font-bold bg-white/5 text-cyan-400 border border-white/15">
                        {lang.code}
                      </span>
                      <span className="font-display text-[15px] sm:text-[16px] font-semibold text-[#F5F8FA]">
                        {lang.name}
                      </span>
                    </div>
                    <span className="font-mono text-[13px] sm:text-[14px] text-slate-300 font-medium">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[12px] text-slate-400 text-center tracking-wider font-semibold">
              GLOBAL PERSPECTIVE &bull; LOCAL INSIGHT
            </div>
          </motion.div>
        </div>
      </SceneContainer>
    </SectionTransition>
  )
}
