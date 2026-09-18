import { useState, FormEvent } from 'react'
import { Shield, Eye, EyeOff, Lock } from 'lucide-react'
import { AdminAuthState } from './useAdminAuth'

interface AdminLoginProps {
  auth: AdminAuthState
}

export default function AdminLogin({ auth }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Small artificial delay for UX
    await new Promise((r) => setTimeout(r, 400))
    auth.login(password)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 60px)`,
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 mb-4">
            <Shield size={32} className="text-gold-400" aria-hidden="true" />
          </div>
          <h1 className="text-white font-heading font-black text-2xl tracking-tight">
            AAYPL Admin
          </h1>
          <p className="text-white/40 text-sm mt-1">Restricted access — authorised personnel only</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-gold-400" aria-hidden="true" />
            <h2 className="text-white/80 text-sm font-semibold uppercase tracking-widest">
              Admin Sign-in
            </h2>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-5">
              <label
                htmlFor="admin-password"
                className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30 transition-all pr-12 text-sm"
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  required
                  aria-describedby={auth.error ? 'login-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {auth.error && (
                <p
                  id="login-error"
                  role="alert"
                  className="mt-2 text-red-400 text-xs flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 bg-red-400 rounded-full inline-block" aria-hidden="true" />
                  {auth.error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-navy-950 font-bold py-3 px-6 rounded-xl transition-colors duration-150 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          AAYPL Internal System · Unauthorised access is prohibited
        </p>
      </div>
    </div>
  )
}
