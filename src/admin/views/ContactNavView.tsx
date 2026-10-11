import React from 'react'
import type { PortfolioContent, ContactData, NavigationData } from '@/types/content.ts'
import { Mail, Compass, Globe, Plus, Trash2 } from 'lucide-react'

interface ContactNavViewProps {
  content: PortfolioContent
  mode: 'contact' | 'navigation'
  onUpdateContact: (contact: ContactData) => void
  onUpdateNav: (nav: NavigationData) => void
}

export function ContactNavView({
  content,
  mode,
  onUpdateContact,
  onUpdateNav,
}: ContactNavViewProps) {
  const contact = content.contact
  const nav = content.navigation

  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs text-slate-300">
      {mode === 'contact' ? (
        <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Mail className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase">Contact &amp; Social Constellation</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Direct Email Address</label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) => onUpdateContact({ ...contact, email: e.target.value })}
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Phone / WhatsApp</label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => onUpdateContact({ ...contact, phone: e.target.value })}
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Location Line</label>
              <input
                type="text"
                value={contact.location}
                onChange={(e) => onUpdateContact({ ...contact, location: e.target.value })}
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">System Status Indicator</label>
              <input
                type="text"
                value={contact.statusText}
                onChange={(e) => onUpdateContact({ ...contact, statusText: e.target.value })}
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] text-slate-400 block mb-1">Response Time Estimate</label>
              <input
                type="text"
                value={contact.responseTimeText}
                onChange={(e) => onUpdateContact({ ...contact, responseTimeText: e.target.value })}
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase">Social Profile Links</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={contact.social.github}
                  onChange={(e) =>
                    onUpdateContact({
                      ...contact,
                      social: { ...contact.social, github: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={contact.social.linkedin}
                  onChange={(e) =>
                    onUpdateContact({
                      ...contact,
                      social: { ...contact.social, linkedin: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">YouTube URL</label>
                <input
                  type="text"
                  value={contact.social.youtube}
                  onChange={(e) =>
                    onUpdateContact({
                      ...contact,
                      social: { ...contact.social, youtube: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase">Navigation Bar &amp; Header Labels</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Logo Brand Text</label>
              <input
                type="text"
                value={nav.logoText}
                onChange={(e) => onUpdateNav({ ...nav, logoText: e.target.value })}
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Header Resume Button</label>
              <input
                type="text"
                value={nav.resumeButtonText}
                onChange={(e) => onUpdateNav({ ...nav, resumeButtonText: e.target.value })}
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Contact CTA Label</label>
              <input
                type="text"
                value={nav.contactCtaText}
                onChange={(e) => onUpdateNav({ ...nav, contactCtaText: e.target.value })}
                className="w-full p-2 bg-black/50 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold text-white uppercase block mb-1">
              Navbar Menu Links ({nav.links.length})
            </span>

            {nav.links.map((link, idx) => (
              <div
                key={link.id}
                className="p-2.5 rounded-xl bg-black/40 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-slate-500 font-bold w-4">{idx + 1}</span>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const next = [...nav.links]
                      next[idx] = { ...next[idx], label: e.target.value }
                      onUpdateNav({ ...nav, links: next })
                    }}
                    className="p-1 bg-black/50 border border-slate-700 rounded text-white text-xs font-bold w-36"
                  />
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => {
                      const next = [...nav.links]
                      next[idx] = { ...next[idx], href: e.target.value }
                      onUpdateNav({ ...nav, links: next })
                    }}
                    className="p-1 bg-black/50 border border-slate-700 rounded text-cyan-300 text-xs flex-1"
                  />
                </div>

                <input
                  type="checkbox"
                  checked={link.enabled}
                  onChange={(e) => {
                    const next = [...nav.links]
                    next[idx] = { ...next[idx], enabled: e.target.checked }
                    onUpdateNav({ ...nav, links: next })
                  }}
                  className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                  title={link.enabled ? 'Enabled' : 'Hidden'}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
