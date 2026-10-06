import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData, type ProjectData } from '@/data/projects'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'
import { CinematicButton } from '@/components/ui/CinematicButton'
import { ProjectConstellationNav } from './ProjectConstellationNav'
import { ProjectFilter } from './ProjectFilter'
import { ProjectDetailModal } from './ProjectDetailModal'

// Dynamic Project Worlds
import { SentraWorld } from './worlds/SentraWorld'
import { MultiAgentWorld } from './worlds/MultiAgentWorld'
import { HelpHubWorld } from './worlds/HelpHubWorld'
import { CampusCareWorld } from './worlds/CampusCareWorld'
import { BoxCricketWorld } from './worlds/BoxCricketWorld'

export function ProjectUniverse() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeProjectId, setActiveProjectId] = useState<string>('sentra')
  const [modalProject, setModalProject] = useState<ProjectData | null>(null)

  const filteredProjects = projectsData.filter((p) => {
    if (selectedCategory === 'all') return true
    if (selectedCategory === 'ai') return p.category === 'ai'
    if (selectedCategory === 'cybersecurity') return p.category === 'cybersecurity'
    if (selectedCategory === 'fullstack') return p.category === 'fullstack'
    return true
  })

  // Ensure active project is part of filtered list or fallback
  const currentProject =
    filteredProjects.find((p) => p.id === activeProjectId) ||
    filteredProjects[0] ||
    projectsData[0]

  const renderWorld = (id: string) => {
    switch (id) {
      case 'sentra':
        return <SentraWorld />
      case 'ai-multi-agent':
        return <MultiAgentWorld />
      case '5minhelp':
        return <HelpHubWorld />
      case 'campus-care':
        return <CampusCareWorld />
      case 'box-cricket':
        return <BoxCricketWorld />
      default:
        return <SentraWorld />
    }
  }

  return (
    <SectionTransition id="projects" ariaLabel="Project Universe" className="border-b border-white/5">
      <SceneContainer
        maxWidth={1320}
        badge="PHASE 03 // PROJECT UNIVERSE"
        title="BUILT FROM"
        titleHighlight="FIRST PRINCIPLES"
        subtitle="Five distinct production-grade systems engineered with rigorous architecture, security safeguards, and verified source code."
      >
        {/* Domain Filter */}
        <ProjectFilter
          currentCategory={selectedCategory}
          onCategoryChange={(cat) => setSelectedCategory(cat)}
        />

        {/* Project Constellation Map */}
        <ProjectConstellationNav
          projects={filteredProjects}
          activeProjectId={currentProject.id}
          onSelectProject={(id) => setActiveProjectId(id)}
        />

        {/* Active Project World & Architecture Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-6"
          >
            {/* Left: Dynamic 3D / Simulated Environment World */}
            <div className="lg:col-span-7 flex flex-col">
              {renderWorld(currentProject.id)}
            </div>

            {/* Right: Technical Dossier & Immediate Actions */}
            <div className="lg:col-span-5 rounded-xl border border-white/10 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
              <div>
                {/* Meta Counter & Category */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      color: currentProject.accentColor,
                      background: `${currentProject.accentColor}18`,
                    }}
                  >
                    PROJECT {currentProject.number} / 05
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {currentProject.categoryLabel.split('•')[0].trim()}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                  {currentProject.title}
                </h3>
                <p className="text-sm font-body font-medium text-cyan-300 mb-4">
                  {currentProject.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed mb-6">
                  {currentProject.shortDescription}
                </p>

                {/* Tech Chips */}
                <div className="mb-6">
                  <div className="font-mono text-[0.625rem] text-slate-400 uppercase tracking-widest mb-2">
                    TECHNOLOGY STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded border border-white/10 bg-black/40 font-mono text-[0.6875rem] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {currentProject.technologies.length > 6 && (
                      <span className="px-2 py-1 rounded font-mono text-[0.6875rem] text-slate-500">
                        +{currentProject.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* My Contribution Block (Rule 21) */}
                <div className="mb-6 p-3.5 rounded-lg border border-cyan-500/20 bg-cyan-950/25">
                  <div className="font-mono text-[0.625rem] text-cyan-300 uppercase tracking-widest mb-1 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>MY CONTRIBUTION</span>
                  </div>
                  <p className="text-xs text-slate-300 font-body leading-relaxed">
                    {currentProject.contribution}
                  </p>
                </div>

                {/* Metrics Bar */}
                {currentProject.metrics && (
                  <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    {currentProject.metrics.map((m, i) => (
                      <div key={i}>
                        <div className="font-mono text-[0.5625rem] text-slate-500 uppercase">{m.label}</div>
                        <div className="font-mono text-xs text-slate-200 font-semibold mt-0.5 truncate">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons (Rule 21) */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <CinematicButton
                  variant="primary"
                  size="md"
                  onClick={() => setModalProject(currentProject)}
                  ariaLabel={`Inspect architecture for ${currentProject.title}`}
                >
                  INSPECT ARCHITECTURE &rarr;
                </CinematicButton>

                <CinematicButton
                  variant="secondary"
                  size="md"
                  href={currentProject.githubUrl}
                  target="_blank"
                  ariaLabel={`View source on GitHub for ${currentProject.title}`}
                >
                  GITHUB SOURCE
                </CinematicButton>

                {currentProject.liveUrl && (
                  <CinematicButton
                    variant="ghost"
                    size="md"
                    href={currentProject.liveUrl}
                    target="_blank"
                    ariaLabel={`Open live demo for ${currentProject.title}`}
                  >
                    LIVE DEMO &nearr;
                  </CinematicButton>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Deep Project Inspection Modal */}
        <ProjectDetailModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      </SceneContainer>
    </SectionTransition>
  )
}
