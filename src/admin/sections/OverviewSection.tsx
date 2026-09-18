import { useMemo } from 'react'
import { Users, MessageSquare, Newspaper, BookOpen, Activity, TrendingUp, Clock } from 'lucide-react'
import { getPosts } from '../adminStore'
import { getMembers } from '../adminStore'
import { getSupportMessages } from '../adminStore'
import { getActivityLog } from '../useAdminAuth'
import { AdminSection } from '../AdminLayout'

interface OverviewSectionProps {
  onNavigate: (s: AdminSection) => void
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  onClick,
}: {
  icon: React.ElementType
  label: string
  value: number | string
  sub?: string
  color: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl border border-charcoal-100 p-5 text-left hover:shadow-card-hover hover:border-charcoal-200 transition-all duration-150 group w-full"
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
        <TrendingUp size={14} className="text-charcoal-300 group-hover:text-charcoal-500 transition-colors" aria-hidden="true" />
      </div>
      <p className="mt-4 text-2xl font-heading font-black text-charcoal-900">{value}</p>
      <p className="text-charcoal-500 text-sm font-medium mt-0.5">{label}</p>
      {sub && <p className="text-charcoal-300 text-xs mt-1">{sub}</p>}
    </button>
  )
}

export default function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const posts = useMemo(() => getPosts(), [])
  const members = useMemo(() => getMembers(), [])
  const messages = useMemo(() => getSupportMessages(), [])
  const logs = useMemo(() => getActivityLog().slice(0, 8), [])

  const newsPosts = posts.filter((p) => p.type === 'news')
  const blogPosts = posts.filter((p) => p.type === 'blog')
  const pendingMembers = members.filter((m) => m.status === 'pending' || m.status === 'under_review')
  const unreadMessages = messages.filter((m) => m.status === 'unread')

  const stats = [
    {
      icon: Newspaper,
      label: 'News Posts',
      value: newsPosts.length,
      sub: `${newsPosts.filter((p) => p.status === 'published').length} published`,
      color: 'bg-blue-50 text-blue-600',
      section: 'news' as AdminSection,
    },
    {
      icon: BookOpen,
      label: 'Blog Articles',
      value: blogPosts.length,
      sub: `${blogPosts.filter((p) => p.status === 'published').length} published`,
      color: 'bg-purple-50 text-purple-600',
      section: 'blog' as AdminSection,
    },
    {
      icon: Users,
      label: 'Members',
      value: members.length,
      sub: `${pendingMembers.length} awaiting review`,
      color: 'bg-emerald-50 text-emerald-600',
      section: 'membership' as AdminSection,
    },
    {
      icon: MessageSquare,
      label: 'Support Messages',
      value: messages.length,
      sub: `${unreadMessages.length} unread`,
      color: 'bg-amber-50 text-amber-600',
      section: 'support' as AdminSection,
    },
  ]

  function formatTime(iso: string) {
    const d = new Date(iso)
    return d.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  const logTypeColors: Record<string, string> = {
    LOGIN: 'bg-emerald-100 text-emerald-700',
    LOGOUT: 'bg-charcoal-100 text-charcoal-600',
    POST_CREATE: 'bg-blue-100 text-blue-700',
    POST_UPDATE: 'bg-indigo-100 text-indigo-700',
    POST_DELETE: 'bg-red-100 text-red-700',
    MEMBER_STATUS: 'bg-amber-100 text-amber-700',
    MEMBER_DELETE: 'bg-red-100 text-red-700',
    SUPPORT_UPDATE: 'bg-teal-100 text-teal-700',
    SUPPORT_DELETE: 'bg-red-100 text-red-700',
  }

  return (
    <div>
      <div className="mb-7">
        <h2 className="text-2xl font-heading font-black text-charcoal-900">Dashboard Overview</h2>
        <p className="text-charcoal-400 text-sm mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard
            key={s.section}
            icon={s.icon}
            label={s.label}
            value={s.value}
            sub={s.sub}
            color={s.color}
            onClick={() => onNavigate(s.section)}
          />
        ))}
      </div>

      {/* Alerts */}
      {(pendingMembers.length > 0 || unreadMessages.length > 0) && (
        <div className="mb-8 space-y-3">
          {pendingMembers.length > 0 && (
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <Users size={16} className="text-amber-600 flex-shrink-0" aria-hidden="true" />
              <p className="text-amber-800 text-sm flex-1">
                <strong>{pendingMembers.length}</strong> membership application{pendingMembers.length > 1 ? 's' : ''} awaiting review.
              </p>
              <button
                onClick={() => onNavigate('membership')}
                className="text-amber-700 font-semibold text-xs underline underline-offset-2 hover:text-amber-900 flex-shrink-0"
              >
                Review
              </button>
            </div>
          )}
          {unreadMessages.length > 0 && (
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
              <MessageSquare size={16} className="text-blue-600 flex-shrink-0" aria-hidden="true" />
              <p className="text-blue-800 text-sm flex-1">
                <strong>{unreadMessages.length}</strong> unread support message{unreadMessages.length > 1 ? 's' : ''}.
              </p>
              <button
                onClick={() => onNavigate('support')}
                className="text-blue-700 font-semibold text-xs underline underline-offset-2 hover:text-blue-900 flex-shrink-0"
              >
                View
              </button>
            </div>
          )}
        </div>
      )}

      {/* Recent activity */}
      <div className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal-100">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-charcoal-400" aria-hidden="true" />
            <h3 className="font-semibold text-charcoal-800 text-sm">Recent Activity</h3>
          </div>
          <button
            onClick={() => onNavigate('logs')}
            className="text-xs text-navy-700 font-semibold hover:underline"
          >
            View all
          </button>
        </div>
        {logs.length === 0 ? (
          <div className="px-5 py-10 text-center text-charcoal-400 text-sm">No activity yet.</div>
        ) : (
          <ul className="divide-y divide-charcoal-50">
            {logs.map((entry) => (
              <li key={entry.id} className="flex items-center gap-3 px-5 py-3">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md flex-shrink-0 ${
                    logTypeColors[entry.type] ?? 'bg-charcoal-100 text-charcoal-600'
                  }`}
                >
                  {entry.type.replace('_', ' ')}
                </span>
                <span className="text-charcoal-600 text-sm flex-1 truncate">{entry.description}</span>
                <span className="text-charcoal-300 text-xs flex-shrink-0 flex items-center gap-1">
                  <Clock size={11} aria-hidden="true" />
                  {formatTime(entry.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
