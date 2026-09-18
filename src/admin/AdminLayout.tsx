import { ReactNode, useState } from 'react'
import {
  LayoutDashboard,
  Newspaper,
  BookOpen,
  Users,
  MessageSquare,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
} from 'lucide-react'

export type AdminSection =
  | 'overview'
  | 'news'
  | 'blog'
  | 'membership'
  | 'support'
  | 'logs'
  | 'settings'

interface NavItem {
  id: AdminSection
  label: string
  icon: React.ElementType
  badge?: number
}

interface AdminLayoutProps {
  children: ReactNode
  activeSection: AdminSection
  onNavigate: (section: AdminSection) => void
  onLogout: () => void
  badges?: Partial<Record<AdminSection, number>>
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'news', label: 'News Posts', icon: Newspaper },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'membership', label: 'Membership', icon: Users },
  { id: 'support', label: 'Support', icon: MessageSquare },
  { id: 'logs', label: 'Activity Log', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({
  children,
  activeSection,
  onNavigate,
  onLogout,
  badges = {},
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeItem = navItems.find((n) => n.id === activeSection)

  return (
    <div className="min-h-screen bg-charcoal-50 flex">
      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-navy-950 flex flex-col
          transform transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Admin navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.08]">
          <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
            <Shield size={16} className="text-gold-400" aria-hidden="true" />
          </div>
          <div>
            <p className="text-white font-heading font-bold text-sm leading-tight">AAYPL Admin</p>
            <p className="text-white/30 text-xs">Control Panel</p>
          </div>
          {/* Close button (mobile) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-white/40 hover:text-white transition-colors"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Dashboard sections">
          <ul className="space-y-0.5" role="list">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              const badge = badges[item.id]
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group
                      ${isActive
                        ? 'bg-gold-500/15 text-gold-300 border border-gold-500/20'
                        : 'text-white/50 hover:text-white/90 hover:bg-white/[0.06]'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon
                      size={17}
                      className={isActive ? 'text-gold-400' : 'text-white/30 group-hover:text-white/60'}
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-left">{item.label}</span>
                    {badge != null && badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                        {badge > 99 ? '99+' : badge}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/[0.08]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 group"
          >
            <LogOut size={17} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-charcoal-100 flex items-center gap-4 px-5 flex-shrink-0 sticky top-0 z-20">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-charcoal-500 hover:text-charcoal-800 transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-charcoal-400 min-w-0">
            <span className="text-charcoal-300 hidden sm:inline">Admin</span>
            <ChevronRight size={13} className="text-charcoal-200 hidden sm:inline" aria-hidden="true" />
            <span className="text-charcoal-700 font-semibold truncate">
              {activeItem?.label ?? 'Dashboard'}
            </span>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-emerald-700 text-xs font-medium">Live</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center">
              <Shield size={14} className="text-gold-400" aria-hidden="true" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8" id="admin-main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
