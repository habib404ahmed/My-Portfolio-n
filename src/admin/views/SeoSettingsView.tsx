import React from 'react'
import type { PortfolioContent, SeoData } from '@/types/content.ts'
import { Search, Shield, Globe, KeyRound } from 'lucide-react'

interface SeoSettingsViewProps {
  content: PortfolioContent
  mode: 'seo' | 'settings'
  onUpdateSeo: (seo: SeoData) => void
  username: string
}

export function SeoSettingsView({
  content,
  mode,
  onUpdateSeo,
  username,
}: SeoSettingsViewProps) {
  const seo = content.seo

  return (
    <div className="space-y-6 max-w-4xl font-mono text-xs text-slate-300">
      {mode === 'seo' ? (
        <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Search className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase">SEO &amp; Open Graph Social Metadata</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                HTML Title Tag (&lt;title&gt;)
              </label>
              <input
                type="text"
                value={seo.title}
                onChange={(e) => onUpdateSeo({ ...seo, title: e.target.value })}
                className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 block mb-1">
                Meta Description Tag
              </label>
              <textarea
                rows={3}
                value={seo.description}
                onChange={(e) => onUpdateSeo({ ...seo, description: e.target.value })}
                className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Meta Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={seo.keywords}
                  onChange={(e) => onUpdateSeo({ ...seo, keywords: e.target.value })}
                  className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Canonical Production URL
                </label>
                <input
                  type="text"
                  value={seo.canonicalUrl}
                  onChange={(e) => onUpdateSeo({ ...seo, canonicalUrl: e.target.value })}
                  className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-cyan-300"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">
                  Open Graph Preview Image (og:image)
                </label>
                <input
                  type="text"
                  value={seo.ogImage}
                  onChange={(e) => onUpdateSeo({ ...seo, ogImage: e.target.value })}
                  className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-slate-200"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Author Name</label>
                <input
                  type="text"
                  value={seo.author}
                  onChange={(e) => onUpdateSeo({ ...seo, author: e.target.value })}
                  className="w-full p-2.5 bg-black/50 border border-slate-700 rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Shield className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase">Admin Security &amp; Environment</h3>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Authenticated Admin:</span>
              <span className="text-white font-bold">{username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Authorization Scheme:</span>
              <span className="text-cyan-400 font-bold">JWT + bcrypt + HTTP-Only Cookie</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Rate Limiting Protection:</span>
              <span className="text-emerald-400 font-bold">Enabled (5 Max attempts per IP)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Content Persistence:</span>
              <span className="text-cyan-400 font-bold">File-based JSON + Snapshots Archive</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-[11px] text-slate-400 space-y-2 font-sans">
            <h4 className="font-bold text-white uppercase font-mono text-xs">Production Environment Variables</h4>
            <p>
              To change your admin credentials in production, configure the following environment variables:
            </p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-slate-300">
              <li><code>ADMIN_USERNAME</code> (default: <code>admin</code>)</li>
              <li><code>ADMIN_PASSWORD</code> (default: <code>admin123</code>)</li>
              <li><code>JWT_SECRET</code> (secure random secret key)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
