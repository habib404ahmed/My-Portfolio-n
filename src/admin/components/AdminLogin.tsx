import React, { useState } from 'react'
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { apiFetch, parseApiResponse, ApiError } from '../utils/api.ts'

interface AdminLoginProps {
  onLoginSuccess: (token: string, user: { username: string }) => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const cleanUsername = username.trim()
    const cleanPassword = password.trim()

    if (!cleanUsername) {
      setError('Please enter your administrator username.')
      return
    }

    if (!cleanPassword) {
      setError('Please enter your administrator password.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUsername, password: cleanPassword }),
      })

      const data = await parseApiResponse<{ success: boolean; token: string; user: { username: string } }>(res)

      // Save token in sessionStorage as secondary fallback for API calls
      sessionStorage.setItem('admin_token', data.token)
      onLoginSuccess(data.token, data.user)
    } catch (err: any) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Unable to connect to the authentication server. Please check your network or ensure the server is running.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#030507] relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(0, 217, 255, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(85, 119, 255, 0.06) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-[28px] bg-[rgba(10,15,24,0.75)] backdrop-blur-2xl border border-[rgba(255,255,255,0.12)] shadow-[0_32px_100px_rgba(0,0,0,0.65)] text-slate-100">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,217,255,0.2)]">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
            Portfolio Admin Studio
          </h1>
          <p className="text-sm text-slate-400 mt-1.5 font-mono">
            Enter credentials to manage cinematic portfolio
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1 leading-snug">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Admin Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 bg-[rgba(255,255,255,0.04)] border border-slate-700/60 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Master Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-[rgba(255,255,255,0.04)] border border-slate-700/60 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_24px_rgba(0,217,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access Admin Studio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          Protected by server-side bcrypt authorization &amp; rate-limiting.
        </div>
      </div>
    </div>
  )
}
