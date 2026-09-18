import { useState, useEffect, useCallback } from 'react'

const ADMIN_PASSWORD = 'Badeji'
const SESSION_KEY = 'aaypl_admin_auth'

export interface AdminAuthState {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  error: string | null
}

export function useAdminAuth(): AdminAuthState {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (isAuthenticated) {
        sessionStorage.setItem(SESSION_KEY, 'true')
      } else {
        sessionStorage.removeItem(SESSION_KEY)
      }
    } catch {
      // sessionStorage not available
    }
  }, [isAuthenticated])

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError(null)
      // Log the event
      logActivity('LOGIN', 'Admin logged in')
      return true
    }
    setError('Incorrect password. Please try again.')
    return false
  }, [])

  const logout = useCallback(() => {
    logActivity('LOGOUT', 'Admin logged out')
    setIsAuthenticated(false)
    setError(null)
  }, [])

  return { isAuthenticated, login, logout, error }
}

// ── Activity log helpers ─────────────────────────────────────────────────────

export interface ActivityLogEntry {
  id: string
  type: string
  description: string
  timestamp: string
}

const LOG_KEY = 'aaypl_admin_log'

export function logActivity(type: string, description: string): void {
  try {
    const existing = getActivityLog()
    const entry: ActivityLogEntry = {
      id: crypto.randomUUID(),
      type,
      description,
      timestamp: new Date().toISOString(),
    }
    const updated = [entry, ...existing].slice(0, 500) // keep last 500 entries
    localStorage.setItem(LOG_KEY, JSON.stringify(updated))
  } catch {
    // ignore storage errors
  }
}

export function getActivityLog(): ActivityLogEntry[] {
  try {
    const raw = localStorage.getItem(LOG_KEY)
    return raw ? (JSON.parse(raw) as ActivityLogEntry[]) : []
  } catch {
    return []
  }
}

export function clearActivityLog(): void {
  try {
    localStorage.removeItem(LOG_KEY)
  } catch {
    // ignore
  }
}
