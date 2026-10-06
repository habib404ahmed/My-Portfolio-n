import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { CinematicButton } from '@/components/ui/CinematicButton'

const CAREER_VECTORS = [
  'SOFTWARE ENGINEERING',
  'AI ENGINEERING',
  'FULL-STACK DEVELOPMENT',
  'SECURE SYSTEMS',
]

export function RecruiterMoment() {
  return (
    <div className="w-full mb-20 p-6 sm:p-12 rounded-2xl border border-cyan-500/20 bg-slate-950/90 backdrop-blur-md relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div className="max-w-2xl">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2 font-bold">
            CAREER TRAJECTORY & ASPIRATION
          </div>
          <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4">
            What I&rsquo;m Building Toward
          </h3>

          {/* 4 Pillars of Focus */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CAREER_VECTORS.map((v) => (
              <span
                key={v}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] font-mono text-xs font-semibold text-cyan-200"
              >
                {v}
              </span>
            ))}
          </div>

          <p className="text-base text-slate-300 font-body leading-relaxed mb-6">
            &ldquo;Looking for opportunities to build meaningful software, learn from strong engineering teams, and solve real-world problems.&rdquo;
          </p>

          <p className="font-mono text-xs text-slate-500">
            Available for software engineering internships, technical apprenticeships, and high-impact project collaborations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <CinematicButton
            variant="primary"
            size="lg"
            href={`mailto:${profile.contact.email}`}
            ariaLabel="Contact Md Habib Munsar Ahmed"
          >
            GET IN TOUCH &rarr;
          </CinematicButton>

          <CinematicButton
            variant="secondary"
            size="lg"
            href={profile.social.linkedin}
            target="_blank"
            ariaLabel="Connect on LinkedIn"
          >
            CONNECT ON LINKEDIN
          </CinematicButton>
        </div>
      </div>
    </div>
  )
}
