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

      {/* Central Hub Node — Communication Core (Phase 9 Section 27) */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="p-4 px-8 rounded-2xl glass-focus liquid-edge glass-reflection-sweep shadow-[0_0_35px_rgba(0,217,255,0.3)] text-center mb-6 relative z-10"
        >
          <div className="flex items-center gap-2 justify-center">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-display font-bold text-sm text-white tracking-wider uppercase">
              COMMUNICATION CORE
            </span>
          </div>
          <div className="font-mono text-[0.625rem] text-slate-400 mt-0.5">
            4 DIRECT ACCESS DESTINATIONS
          </div>
        </motion.div>

        {/* 4 Radiating Nodes — Floating Glass Nodes */}
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
                className={`p-5 rounded-2xl glass-card liquid-edge glass-reflection-sweep text-left transition-all duration-300 block relative overflow-hidden group cursor-pointer ${
                  isHovered
                    ? 'glass-focus -translate-y-1.5 shadow-2xl border-[#00D9FF]/70'
                    : 'hover:border-white/30'
                }`}
                style={{
                  boxShadow: isHovered ? `0 0 25px ${conn.color}35` : 'none',
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
