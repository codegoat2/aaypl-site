import { useState, useCallback } from 'react'
import { Activity, Search, Trash2, RefreshCw, Download, Clock, X } from 'lucide-react'
import { ActivityLogEntry, getActivityLog, clearActivityLog } from '../useAdminAuth'

const TYPE_COLORS: Record<string, string> = {
  LOGIN:          'bg-emerald-100 text-emerald-700 border-emerald-200',
  LOGOUT:         'bg-charcoal-100 text-charcoal-600 border-charcoal-200',
  POST_CREATE:    'bg-blue-100   text-blue-700   border-blue-200',
  POST_UPDATE:    'bg-indigo-100 text-indigo-700 border-indigo-200',
  POST_DELETE:    'bg-red-100    text-red-700    border-red-200',
  MEMBER_STATUS:  'bg-amber-100  text-amber-700  border-amber-200',
  MEMBER_DELETE:  'bg-red-100    text-red-700    border-red-200',
  SUPPORT_UPDATE: 'bg-teal-100   text-teal-700   border-teal-200',
  SUPPORT_DELETE: 'bg-red-100    text-red-700    border-red-200',
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
}

export default function ActivityLogSection() {
  const [logs, setLogs]           = useState<ActivityLogEntry[]>(() => getActivityLog())
  const [search, setSearch]       = useState('')
  const [filterType, setFilter]   = useState<string>('all')
  const [clearConfirm, setClear]  = useState(false)

  const refresh = useCallback(() => setLogs(getActivityLog()), [])

  const allTypes = Array.from(new Set(logs.map((l) => l.type))).sort()

  const filtered = logs.filter((l) => {
    const matchSearch =
      l.description.toLowerCase().includes(search.toLowerCase()) ||
      l.type.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'all' || l.type === filterType
    return matchSearch && matchType
  })

  function handleClear() {
    clearActivityLog()
    setLogs([])
    setClear(false)
  }

  function exportCSV() {
    const header = 'ID,Type,Description,Timestamp\n'
    const rows = logs.map((l) =>
      `"${l.id}","${l.type}","${l.description.replace(/"/g, '""')}","${l.timestamp}"`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `aaypl-activity-log-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-heading font-black text-charcoal-900">Activity Log</h2>
          <p className="text-charcoal-400 text-sm mt-0.5">{logs.length} entries recorded</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 text-sm text-charcoal-500 hover:text-charcoal-800 border border-charcoal-200 rounded-xl px-3 py-2 hover:bg-charcoal-50 transition-colors"
            aria-label="Refresh log"
          >
            <RefreshCw size={14} aria-hidden="true" /> Refresh
          </button>
          <button
            onClick={exportCSV}
            disabled={logs.length === 0}
            className="inline-flex items-center gap-2 text-sm text-navy-700 hover:text-navy-900 border border-navy-200 bg-navy-50 rounded-xl px-3 py-2 hover:bg-navy-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Export activity log as CSV"
          >
            <Download size={14} aria-hidden="true" /> Export CSV
          </button>
          <button
            onClick={() => setClear(true)}
            disabled={logs.length === 0}
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-800 border border-red-200 bg-red-50 rounded-xl px-3 py-2 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Clear activity log"
          >
            <Trash2 size={14} aria-hidden="true" /> Clear Log
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-300" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search log entries…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-charcoal-200 rounded-xl bg-white focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
          />
        </div>
        {allTypes.length > 0 && (
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 text-sm border border-charcoal-200 rounded-xl bg-white focus:outline-none focus:border-navy-400 cursor-pointer"
            >
              <option value="all">All Types</option>
              {allTypes.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
            </select>
            <X size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Log entries */}
      <div className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-charcoal-400">
            <Activity size={32} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p className="text-sm">{logs.length === 0 ? 'No activity recorded yet.' : 'No entries match your filters.'}</p>
          </div>
        ) : (
          <ul className="divide-y divide-charcoal-50">
            {filtered.map((entry) => (
              <li key={entry.id} className="flex items-center gap-3 px-5 py-3 hover:bg-charcoal-50/40 transition-colors">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border flex-shrink-0 ${
                    TYPE_COLORS[entry.type] ?? 'bg-charcoal-100 text-charcoal-600 border-charcoal-200'
                  }`}
                >
                  {entry.type.replace(/_/g, ' ')}
                </span>
                <span className="text-charcoal-600 text-sm flex-1 truncate">{entry.description}</span>
                <span className="text-charcoal-300 text-xs flex-shrink-0 flex items-center gap-1 whitespace-nowrap">
                  <Clock size={11} aria-hidden="true" />
                  {formatTimestamp(entry.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clear confirm */}
      {clearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="clear-log-title">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 id="clear-log-title" className="font-bold text-charcoal-900 text-lg mb-2">Clear Activity Log?</h3>
            <p className="text-charcoal-500 text-sm mb-6">All {logs.length} log entries will be permanently deleted. Consider exporting a CSV backup first.</p>
            <div className="flex gap-3">
              <button onClick={() => setClear(false)} className="flex-1 py-2.5 rounded-xl border border-charcoal-200 text-charcoal-700 text-sm font-semibold hover:bg-charcoal-50 transition-colors">Cancel</button>
              <button onClick={handleClear} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">Clear All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
