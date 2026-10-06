import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionTransition } from '@/components/ui/SectionTransition'
import { SceneContainer } from '@/components/ui/SceneContainer'

interface PipelineStage {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  visualState: string
  color: string
  heuristic: string
  metrics: { label: string; value: string }[]
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'problem',
    number: '01',
    title: 'PROBLEM',
    tagline: 'Deconstruct complexity into foundational constraints',
    description:
      'Begin by isolating root causes, user bottlenecks, and performance limits rather than jumping straight to code.',
    visualState: 'Constraint Isolation & Entropy State',
    color: '#f43f5e',
    heuristic: '"Don\'t solve the wrong problem faster. Isolate constraints first."',
    metrics: [
      { label: 'Entropy', value: 'High' },
      { label: 'Uncertainty', value: 'Max' },
      { label: 'Constraints', value: 'Isolated' },
    ],
  },
  {
    id: 'understand',
    number: '02',
    title: 'UNDERSTAND',
    tagline: 'Synthesize data structures & operational requirements',
    description:
      'Map domain entities, data lifecycle, interface contracts, and boundary conditions.',
    visualState: 'Entity Graph & Relationship Mapping',
    color: '#fb923c',
    heuristic: '"If you cannot model the data transitions on paper, code won\'t help."',
    metrics: [
      { label: 'Domain Spec', value: 'Synthesized' },
      { label: 'Data Model', value: 'Mapped' },
      { label: 'Edge Cases', value: 'Cataloged' },
    ],
  },
  {
    id: 'design',
    number: '03',
    title: 'DESIGN',
    tagline: 'Architect resilient, scalable, decoupled systems',
    description:
      'Establish clean separation of concerns, API schemas, database indexing strategies, and component trees.',
    visualState: 'Decoupled Topology & Microservice Mesh',
    color: '#eab308',
    heuristic: '"Systems should be composed of single-responsibility, stateless units."',
    metrics: [
      { label: 'Modularity', value: 'High' },
      { label: 'Coupling', value: 'Loose' },
      { label: 'Schema Rigor', value: 'Enforced' },
    ],
  },
  {
    id: 'build',
    number: '04',
    title: 'BUILD',
    tagline: 'Write idiomatic, maintainable, typed software',
    description:
      'Implement features with strong static typing, declarative state flows, and modular abstraction layers.',
    visualState: 'Strict Type Verification & Clean State Flow',
    color: '#06b6d4',
    heuristic: '"Types are not bureaucracy; they are mathematically verified guarantees."',
    metrics: [
      { label: 'Type Safety', value: '100% Strict' },
      { label: 'Reusability', value: 'Modular' },
      { label: 'Clean Code', value: 'Pass' },
    ],
  },
  {
    id: 'test',
    number: '05',
    title: 'TEST',
    tagline: 'Automated verification & boundary fuzzing',
    description:
      'Validate system behavior through automated unit suites, integration tests, and simulated network latency.',
    visualState: 'Automated Test Matrix & Fuzzing Pass',
    color: '#3b82f6',
    heuristic: '"Untested code is simply broken code that hasn\'t been discovered yet."',
    metrics: [
      { label: 'Coverage', value: 'Comprehensive' },
      { label: 'Regression Check', value: '0 Breaches' },
      { label: 'Stress Latency', value: '< 20ms' },
    ],
  },
  {
    id: 'secure',
    number: '06',
    title: 'SECURE',
    tagline: 'Zero-trust defense & vulnerability hardening',
    description:
      'Incorporate ethical hacking mindset: sanitization, JWT/OAuth validation, role guards, and least-privilege scoping.',
    visualState: 'Cryptographic Hardening & Zero-Trust Perimeter',
    color: '#10b981',
    heuristic: '"Treat all perimeter inputs as hostile. Enforce least privilege."',
    metrics: [
      { label: 'Threat Vector', value: 'Mitigated' },
      { label: 'Auth Guard', value: 'Zero Trust' },
      { label: 'Sanitization', value: 'Enforced' },
    ],
  },
  {
    id: 'deploy',
    number: '07',
    title: 'DEPLOY',
    tagline: 'Reproducible containers & global edge delivery',
    description:
      'Package microservices into Docker containers and orchestrate reliable zero-downtime deployment pipelines.',
    visualState: 'Container Registry & Global Edge Runtime',
    color: '#8b5cf6',
    heuristic: '"If deployment requires manual intervention, it is not reliable."',
    metrics: [
      { label: 'Containers', value: 'Multi-stage' },
      { label: 'Edge CDN', value: 'Active' },
      { label: 'Health Status', value: '200 OK' },
    ],
  },
  {
    id: 'improve',
    number: '08',
    title: 'IMPROVE',
    tagline: 'Continuous telemetry, profiling, and feedback loops',
    description:
      'Profile memory, inspect query plans, and evolve system capabilities with iterative optimizations.',
    visualState: 'Real-Time Profiling & Feedback Equilibrium',
    color: '#ec4899',
    heuristic: '"Measure before optimizing. Use telemetry to drive evolution."',
    metrics: [
      { label: 'Telemetry', value: 'Real-time' },
      { label: 'Performance', value: 'Optimized' },
      { label: 'Iteration', value: 'Continuous' },
    ],
  },
]

export function Scene03EngineeringMindset() {
  const [activeStageId, setActiveStageId] = useState('design')
  const currentStage = PIPELINE_STAGES.find((s) => s.id === activeStageId) || PIPELINE_STAGES[2]

  return (
    <SectionTransition id="mindset" ariaLabel="Engineering Mindset & Pipeline" className="py-24 md:py-32 border-b border-white/5">
      <SceneContainer
        badge="SCENE 03 // ARCHITECTURAL DISCIPLINE"
        title="HOW I"
        titleHighlight="BUILD"
        subtitle="Great software isn't written by accident. It is systematically engineered through an 8-stage feedback pipeline."
      >
        {/* 8-Stage Process Navigation (Horizontal scroll on mobile, 8 equal cols on desktop) */}
        <div className="relative mb-10">
          <div className="flex md:grid md:grid-cols-8 gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
            {PIPELINE_STAGES.map((stage) => {
              const isActive = stage.id === activeStageId
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`flex-shrink-0 min-w-[120px] md:min-w-0 snap-start flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-300 ${
                    isActive
                      ? 'border-white/40 bg-slate-900/90 shadow-md'
                      : 'border-white/5 bg-slate-950/40 hover:border-white/20'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 16px ${stage.color}25` : 'none',
                  }}
                  aria-pressed={isActive}
                >
                  <span
                    className="font-mono text-[0.6875rem] font-bold mb-1"
                    style={{ color: isActive ? stage.color : '#94a3b8' }}
                  >
                    {stage.number}
                  </span>
                  <span
                    className={`font-display text-xs font-bold tracking-wider ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {stage.title}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 transition-all"
                    style={{
                      background: isActive ? stage.color : 'transparent',
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Stage Area: Left (Visualization) & Right (Rationale) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          {/* Left Column: Visual Simulation */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-950/80 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: currentStage.color }}
                />
                <span className="font-mono text-xs font-bold tracking-wider text-slate-200 uppercase">
                  PHASE {currentStage.number} &bull; {currentStage.title}
                </span>
              </div>
              <span className="font-mono text-[0.6875rem] text-slate-500 uppercase tracking-widest">
                METHODOLOGY
              </span>
            </div>

            {/* Dynamic Stage Representation Box */}
            <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-6 rounded-xl border border-white/5 bg-black/40 mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 border shadow-sm"
                    style={{
                      borderColor: `${currentStage.color}30`,
                      background: `${currentStage.color}10`,
                    }}
                  >
                    <span className="font-mono text-xl font-bold" style={{ color: currentStage.color }}>
                      {currentStage.number}
                    </span>
                  </div>
                  <div className="font-display text-sm font-semibold text-slate-200 uppercase tracking-wider mb-1">
                    {currentStage.visualState}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-body max-w-sm">
                    {currentStage.tagline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Focus Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
              {currentStage.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="font-mono text-[0.625rem] text-slate-500 uppercase tracking-wider">{m.label}</div>
                  <div className="font-mono text-xs text-white font-bold mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Approach */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <div className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                ARCHITECTURAL APPROACH
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">
                {currentStage.title}
              </h3>
              <p className="text-slate-300 font-body text-sm leading-relaxed mb-6">
                {currentStage.description}
              </p>
            </div>

            {/* Objective Callout */}
            <div className="p-4 rounded-xl border border-white/10 bg-black/40">
              <span className="font-mono text-[0.625rem] text-slate-400 uppercase tracking-wider block mb-1 font-semibold">
                CORE OBJECTIVE
              </span>
              <p className="font-body text-xs text-slate-300 leading-normal">
                {currentStage.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Guiding Principle Banner */}
        <motion.div
          key={`heuristic-${currentStage.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-5 rounded-xl border border-white/10 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
        >
          <div>
            <span className="font-mono text-[0.6875rem] text-cyan-400 uppercase tracking-wider font-bold block mb-1">
              GUIDING PRINCIPLE // STAGE {currentStage.number}
            </span>
            <p className="font-body text-xs sm:text-sm text-slate-200 italic">
              {currentStage.heuristic}
            </p>
          </div>
          <span className="font-mono text-[0.6875rem] text-slate-500 self-start sm:self-center uppercase flex-shrink-0">
            ENGINEERING DISCIPLINE
          </span>
        </motion.div>
      </SceneContainer>
    </SectionTransition>
  )
}
