import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'

const CONNECTIONS = [
  {
    id: 'github',
    label: 'GITHUB',
    handle: '@habib404ahmed',
    desc: 'Public codebases & system repositories',
    href: profile.social.github,
    color: '#06b6d4',
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    handle: 'md-habib-munsar-ahmed',
    desc: 'Professional network & technical milestones',
    href: profile.social.linkedin,
    color: '#38bdf8',
  },
  {
    id: 'youtube',
    label: 'YOUTUBE',
    handle: '@king_of_kali_linux_404',
    desc: 'Cybersecurity & Linux walkthroughs',
    href: profile.social.youtube,
    color: '#f43f5e',
  },
  {
    id: 'email',
    label: 'EMAIL',
    handle: profile.contact.email,
    desc: 'Direct encrypted & standard inbox',
    href: `mailto:${profile.contact.email}`,
    color: '#10b981',
  },
]

export function SocialConstellation() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto my-16 text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">
        COMMUNICATION TOPOLOGY
      </div>
      <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-8">
        Social & Network Nodes
      </h3>

      {/* Central Hub Node */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="p-3.5 px-6 rounded-2xl border border-cyan-500/30 bg-slate-900/90 shadow-[0_0_30px_rgba(6,182,212,0.25)] text-center mb-6 relative z-10"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-display font-bold text-sm text-white tracking-wider">
              HABIB &bull; CORE HUB
            </span>
          </div>
          <div className="font-mono text-[0.625rem] text-slate-400 mt-0.5">
            4 DIRECT ACCESS DESTINATIONS
          </div>
        </motion.div>

        {/* 4 Radiating Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {CONNECTIONS.map((conn) => {
            const isHovered = hoveredNode === conn.id
            return (
              <a
                key={conn.id}
                href={conn.href}
                target={conn.id === 'email' ? undefined : '_blank'}
                rel={conn.id === 'email' ? undefined : 'noopener noreferrer'}
                onMouseEnter={() => setHoveredNode(conn.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onFocus={() => setHoveredNode(conn.id)}
                onBlur={() => setHoveredNode(null)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 block relative overflow-hidden group ${
                  isHovered
                    ? 'border-white/40 bg-slate-900/90 -translate-y-1 shadow-xl'
                    : 'border-white/10 bg-slate-950/70 hover:border-white/20'
                }`}
                style={{
                  boxShadow: isHovered ? `0 0 25px ${conn.color}30` : 'none',
                }}
                aria-label={`Open ${conn.label}: ${conn.handle}`}
              >
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: conn.color }}
                    />
                    <span
                      className="font-mono text-xs font-bold tracking-wider"
                      style={{ color: conn.color }}
                    >
                      {conn.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 group-hover:text-white transition-colors">
                    &rarr;
                  </span>
                </div>

                <div className="font-mono text-xs text-white font-medium mb-1 truncate">
                  {conn.handle}
                </div>

                <p className="font-body text-[0.6875rem] text-slate-400 leading-snug">
                  {conn.desc}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
