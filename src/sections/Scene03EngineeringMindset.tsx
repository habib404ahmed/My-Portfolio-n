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
    id: 'discover',
    number: '01',
    title: 'DISCOVER',
    tagline: 'Deconstruct complexity into foundational constraints',
    description:
      'Begin by isolating root causes, user bottlenecks, and operational performance limits rather than jumping straight to code.',
    visualState: 'Constraint Isolation & Boundary State',
    color: '#6575FF',
    heuristic: '"Don\'t solve the wrong problem faster. Isolate constraints first."',
    metrics: [
      { label: 'Entropy', value: 'Isolated' },
      { label: 'Uncertainty', value: 'Resolved' },
      { label: 'Constraints', value: 'Cataloged' },
    ],
  },
  {
    id: 'architect',
    number: '02',
    title: 'ARCHITECT',
    tagline: 'Synthesize data structures & decoupled system topology',
    description:
      'Map domain entities, data lifecycles, microservice interfaces, database schemas, and clean separation of concerns.',
    visualState: 'Decoupled Topology & Microservice Mesh',
    color: '#00D9FF',
    heuristic: '"Systems should be composed of single-responsibility, stateless units."',
    metrics: [
      { label: 'Modularity', value: 'High' },
      { label: 'Coupling', value: 'Loose' },
      { label: 'Schema Rigor', value: 'Enforced' },
    ],
  },
  {
    id: 'build',
    number: '03',
    title: 'BUILD',
    tagline: 'Strict type verification & modular software implementation',
    description:
      'Implement core logic with strict static typing, robust error handling, and clean software engineering patterns.',
    visualState: 'Type-Safe Architecture & Logic Implementation',
    color: '#00D9FF',
    heuristic: '"Write software that is readable, statically verified, and modular."',
    metrics: [
      { label: 'Type Safety', value: '100% Strict' },
      { label: 'Maintainability', value: 'A+' },
      { label: 'Code Quality', value: 'Verified' },
    ],
  },
  {
    id: 'integrate',
    number: '04',
    title: 'INTEGRATE',
    tagline: 'Autonomous AI pipelines & external service orchestration',
    description:
      'Orchestrate multi-agent workflows, vector retrieval pipelines (RAG), and resilient external API integrations.',
    visualState: 'Intelligent Agent Flow & Vector Embeddings',
    color: '#38E8FF',
    heuristic: '"Integrate intelligence where it creates measurable architectural leverage."',
    metrics: [
      { label: 'Agent Pipeline', value: 'Active' },
      { label: 'Vector Stores', value: 'Connected' },
      { label: 'Latency', value: 'Optimized' },
    ],
  },
  {
    id: 'secure',
    number: '05',
    title: 'SECURE',
    tagline: 'Zero-trust perimeter & ethical hacking verification',
    description:
      'Apply an ethical hacker\'s defense: input sanitization, penetration testing, network packet inspection, JWT guards, and least privilege.',
    visualState: 'Cryptographic Hardening & Zero-Trust Perimeter',
    color: '#00D9FF',
    heuristic: '"Treat all perimeter inputs as hostile. Design defense directly into the code."',
    metrics: [
      { label: 'Threat Vector', value: 'Mitigated' },
      { label: 'Auth Guard', value: 'Zero Trust' },
      { label: 'Audit Rigor', value: 'Enforced' },
    ],
  },
  {
    id: 'test',
    number: '06',
    title: 'TEST',
    tagline: 'Automated verification, regression defense & boundary fuzzing',
    description:
      'Validate system behavior through automated unit suites, integration tests, and simulated network latency.',
    visualState: 'Automated Test Matrix & Fuzzing Pass',
    color: '#6575FF',
    heuristic: '"Untested code is simply broken code that hasn\'t been discovered yet."',
    metrics: [
      { label: 'Coverage', value: 'Comprehensive' },
      { label: 'Regression Check', value: '0 Breaches' },
      { label: 'Stress Latency', value: '< 20ms' },
    ],
  },
  {
    id: 'deploy',
    number: '07',
    title: 'DEPLOY',
    tagline: 'Reproducible containers & global edge delivery',
    description:
      'Package services into containerized multi-stage builds and deploy via automated zero-downtime CI/CD pipelines.',
    visualState: 'Container Registry & Global Edge Runtime',
    color: '#8B7CFF',
    heuristic: '"If deployment requires manual intervention, it is not reliable."',
    metrics: [
      { label: 'Containers', value: 'Multi-stage' },
      { label: 'Edge CDN', value: 'Active' },
      { label: 'Health Status', value: '200 OK' },
    ],
  },
  {
    id: 'iterate',
    number: '08',
    title: 'ITERATE',
    tagline: 'System profiling, hardware efficiency & continuous telemetry',
    description:
      'Profile memory, inspect query plans, optimize OS/hardware throughput, and evolve capabilities through telemetry loops.',
    visualState: 'Real-Time Telemetry & Performance Optimization',
    color: '#6575FF',
    heuristic: '"Measure before optimizing. Use telemetry to drive continuous evolution."',
    metrics: [
      { label: 'Telemetry', value: 'Real-time' },
      { label: 'Performance', value: 'Optimized' },
      { label: 'Iteration', value: 'Continuous' },
    ],
  },
]

export function Scene03EngineeringMindset() {
  const [activeStageId, setActiveStageId] = useState('discover')
  const currentStage = PIPELINE_STAGES.find((s) => s.id === activeStageId) || PIPELINE_STAGES[0]

  return (
    <SectionTransition id="mindset" ariaLabel="Engineering Mindset & Pipeline" className="border-b border-[rgba(140,190,210,0.16)]">
      <SceneContainer
        badge="SCENE 03 // ARCHITECTURAL DISCIPLINE"
        title="HOW I"
        titleHighlight="BUILD"
        subtitle="Great software isn't written by accident. It is systematically engineered through an 8-stage lifecycle: Discover → Architect → Build → Integrate → Secure → Test → Deploy → Iterate."
      >
        {/* 8-Stage Process Navigation — Floating Glass Pipeline (Phase 9 Section 16) */}
        <div className="relative mb-10">
          {/* Luminous Glass Energy Line */}
          <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-gradient-to-r from-[#5577FF]/30 via-[#00D9FF]/50 to-[#8175FF]/30 -translate-y-1/2 -z-0 hidden md:block pointer-events-none rounded-full shadow-[0_0_10px_rgba(0,217,255,0.4)]" />

          <div className="flex md:grid md:grid-cols-8 gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x relative z-10">
            {PIPELINE_STAGES.map((stage) => {
              const isActive = stage.id === activeStageId
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`flex-shrink-0 min-w-[120px] md:min-w-0 snap-start flex flex-col items-center p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'glass-focus liquid-edge border-[#00D9FF] shadow-[0_0_22px_rgba(0,217,255,0.35)] scale-102'
                      : 'glass-card hover:border-[rgba(0,217,255,0.3)]'
                  }`}
                  aria-pressed={isActive}
                >
                  <span
                    className="font-mono text-[0.6875rem] font-bold mb-1"
                    style={{ color: isActive ? stage.color : '#687687' }}
                  >
                    {stage.number}
                  </span>
                  <span
                    className={`font-display text-xs font-bold tracking-wider ${
                      isActive ? 'text-[#F4F7FA]' : 'text-[#A8B4C2]'
                    }`}
                  >
                    {stage.title}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 transition-all"
                    style={{
                      background: isActive ? stage.color : 'transparent',
                      boxShadow: isActive ? `0 0 8px ${stage.color}` : 'none',
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Stage Area: Left (Visualization) & Right (Rationale) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          {/* Left Column: Visual Simulation (Glass Card) */}
          <div className="lg:col-span-7 rounded-2xl glass-card liquid-edge p-6 sm:p-8 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[rgba(140,190,210,0.16)] pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: currentStage.color }}
                />
                <span className="font-mono text-xs font-bold tracking-wider text-[#F4F7FA] uppercase">
                  PHASE {currentStage.number} &bull; {currentStage.title}
                </span>
              </div>
              <span className="font-mono text-[0.6875rem] text-[#687687] uppercase tracking-widest">
                METHODOLOGY
              </span>
            </div>

            {/* Dynamic Stage Representation Box */}
            <div className="min-h-[200px] flex flex-col items-center justify-center text-center p-6 rounded-xl border border-[rgba(140,190,210,0.16)] bg-[#090D12]/70 mb-6">
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
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[rgba(140,190,210,0.16)]">
              {currentStage.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#090D12]/80 border border-[rgba(140,190,210,0.16)]">
                  <div className="font-mono text-[0.625rem] text-[#687687] uppercase tracking-wider">{m.label}</div>
                  <div className="font-mono text-xs text-[#F4F7FA] font-bold mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Approach (Focus Glass) */}
          <div className="lg:col-span-5 rounded-2xl glass-focus liquid-edge glass-reflection-sweep p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs font-bold text-[#00D9FF] uppercase tracking-wider mb-2">
                ARCHITECTURAL APPROACH
              </div>
              <h3 className="text-2xl font-display font-bold text-[#F4F7FA] mb-3">
                {currentStage.title}
              </h3>
              <p className="text-[#A8B4C2] font-body text-sm leading-relaxed mb-6">
                {currentStage.description}
              </p>
            </div>

            {/* Objective Callout */}
            <div className="p-4 rounded-xl border border-white/10 bg-black/40">
              <span className="font-mono text-[0.625rem] text-[#687687] uppercase tracking-wider block mb-1 font-semibold">
                CORE OBJECTIVE
              </span>
              <p className="font-body text-xs text-[#F4F7FA] leading-normal">
                {currentStage.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Guiding Principle Banner — Glass Level 1 */}
        <motion.div
          key={`heuristic-${currentStage.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-5 rounded-xl glass-level-1 liquid-edge flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
        >
          <div>
            <span className="font-mono text-[0.6875rem] text-[#00D9FF] uppercase tracking-wider font-bold block mb-1">
              GUIDING PRINCIPLE // STAGE {currentStage.number}
            </span>
            <p className="font-body text-xs sm:text-sm text-[#F4F7FA] italic">
              {currentStage.heuristic}
            </p>
          </div>
          <span className="font-mono text-[0.6875rem] text-[#687687] self-start sm:self-center uppercase flex-shrink-0">
            ENGINEERING DISCIPLINE
          </span>
        </motion.div>
      </SceneContainer>
    </SectionTransition>
  )
}
