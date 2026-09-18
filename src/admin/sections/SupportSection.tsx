import { useState, useEffect, useCallback } from 'react'
import {
  MessageSquare, Search, Mail, MapPin, X, Send, Trash2,
  CheckCircle2, Eye, RefreshCw,
} from 'lucide-react'
import {
  SupportMessage, MessageStatus,
  getSupportMessages, updateMessageStatus, deleteMessage, seedDemoMessages,
} from '../adminStore'

const STATUS_STYLES: Record<MessageStatus, string> = {
  unread:  'bg-red-100   text-red-700   border-red-200',
  read:    'bg-charcoal-100 text-charcoal-600 border-charcoal-200',
  replied: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

export default function SupportSection() {
  const [messages, setMessages]   = useState<SupportMessage[]>([])
  const [search, setSearch]       = useState('')
  const [filterStatus, setFilter] = useState<MessageStatus | 'all'>('all')
  const [selected, setSelected]   = useState<SupportMessage | null>(null)
  const [reply, setReply]         = useState('')
  const [replySent, setReplySent] = useState(false)
  const [deleteConfirm, setDelete] = useState<string | null>(null)

  const load = useCallback(() => {
    seedDemoMessages()
    setMessages(getSupportMessages())
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase()
    const matchSearch =
      m.name.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'all' || m.status === filterStatus
    return matchSearch && matchStatus
  })

  function openMessage(msg: SupportMessage) {
    setSelected(msg)
    setReply(msg.reply ?? '')
    setReplySent(false)
    // Mark as read
    if (msg.status === 'unread') {
      updateMessageStatus(msg.id, 'read')
      load()
    }
  }

  function sendReply() {
    if (!selected || !reply.trim()) return
    updateMessageStatus(selected.id, 'replied', reply.trim())
    setReplySent(true)
    load()
    setSelected((prev) => prev ? { ...prev, status: 'replied', reply: reply.trim() } : prev)
  }

  function handleDelete(id: string) {
    deleteMessage(id)
    setDelete(null)
    if (selected?.id === id) setSelected(null)
    load()
  }

  const unreadCount = messages.filter((m) => m.status === 'unread').length

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-heading font-black text-charcoal-900">Support Messages</h2>
          <p className="text-charcoal-400 text-sm mt-0.5">
            {messages.length} total · {unreadCount} unread
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 text-sm text-charcoal-500 hover:text-charcoal-800 border border-charcoal-200 rounded-xl px-3 py-2 hover:bg-charcoal-50 transition-colors"
          aria-label="Refresh messages"
        >
          <RefreshCw size={14} aria-hidden="true" /> Refresh
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-5">
        {(['all', 'unread', 'read', 'replied'] as const).map((s) => {
          const count = s === 'all' ? messages.length : messages.filter((m) => m.status === s).length
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize ${
                filterStatus === s
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-charcoal-500 border-charcoal-200 hover:border-charcoal-300'
              }`}
            >
              {s === 'all' ? 'All' : s}
              <span className={`rounded-full px-1.5 text-[10px] font-bold ${filterStatus === s ? 'bg-white/20 text-white' : 'bg-charcoal-100 text-charcoal-500'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-300" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, subject or email…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-charcoal-200 rounded-xl bg-white focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
        />
      </div>

      {/* Message list */}
      <div className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-charcoal-400">
            <MessageSquare size={32} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p className="text-sm">{search || filterStatus !== 'all' ? 'No messages match your filters.' : 'No support messages yet.'}</p>
          </div>
        ) : (
          <ul className="divide-y divide-charcoal-50">
            {filtered.map((msg) => (
              <li
                key={msg.id}
                className={`flex items-start gap-4 px-5 py-4 hover:bg-charcoal-50/50 transition-colors cursor-pointer group ${
                  msg.status === 'unread' ? 'bg-blue-50/40' : ''
                }`}
                onClick={() => openMessage(msg)}
              >
                <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-navy-700 text-sm font-bold">
                    {msg.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-semibold text-sm ${msg.status === 'unread' ? 'text-charcoal-900' : 'text-charcoal-700'}`}>
                      {msg.name}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${STATUS_STYLES[msg.status]}`}>
                      {msg.status}
                    </span>
                    {msg.country && (
                      <span className="text-charcoal-400 text-xs flex items-center gap-1">
                        <MapPin size={10} aria-hidden="true" />{msg.country}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${msg.status === 'unread' ? 'font-semibold text-charcoal-800' : 'text-charcoal-600'}`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-charcoal-400 truncate mt-0.5">{msg.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-charcoal-400 text-xs whitespace-nowrap">
                    {new Date(msg.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDelete(msg.id) }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded text-charcoal-300 hover:text-red-500 transition-all"
                    aria-label="Delete message"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-charcoal-900 text-lg mb-2">Delete Message?</h3>
            <p className="text-charcoal-500 text-sm mb-6">This will permanently remove this support message.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelete(null)} className="flex-1 py-2.5 rounded-xl border border-charcoal-200 text-charcoal-700 text-sm font-semibold hover:bg-charcoal-50 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Message detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-end" role="dialog" aria-modal="true" aria-labelledby="msg-detail-title">
          <div className="bg-white h-full w-full max-w-lg overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100 sticky top-0 bg-white z-10">
              <h3 id="msg-detail-title" className="font-heading font-bold text-charcoal-900 text-lg truncate pr-4">{selected.subject}</h3>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors flex-shrink-0" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-5">
              {/* Sender info */}
              <div className="flex items-start gap-3 bg-charcoal-50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-navy-700 font-bold">{selected.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-charcoal-800">{selected.name}</p>
                  <p className="text-sm text-charcoal-500 flex items-center gap-1.5"><Mail size={12} aria-hidden="true" />{selected.email}</p>
                  {selected.country && <p className="text-sm text-charcoal-500 flex items-center gap-1.5"><MapPin size={12} aria-hidden="true" />{selected.country}</p>}
                </div>
                <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded-md border flex-shrink-0 ${STATUS_STYLES[selected.status]}`}>
                  {selected.status}
                </span>
              </div>

              {/* Message body */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-2">Message</h4>
                <p className="text-charcoal-700 text-sm leading-relaxed whitespace-pre-wrap bg-charcoal-50 rounded-xl p-4">
                  {selected.message}
                </p>
              </div>

              {/* Existing reply */}
              {selected.reply && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={12} aria-hidden="true" /> Admin Reply
                  </h4>
                  <p className="text-charcoal-700 text-sm leading-relaxed bg-emerald-50 border border-emerald-100 rounded-xl p-4 whitespace-pre-wrap">
                    {selected.reply}
                  </p>
                </div>
              )}

              {/* Reply area */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-2">
                  {selected.reply ? 'Update Reply' : 'Write a Reply'}
                </h4>
                {replySent && (
                  <div className="mb-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-2.5 flex items-center gap-2">
                    <CheckCircle2 size={14} aria-hidden="true" /> Reply saved successfully.
                  </div>
                )}
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={5}
                  placeholder="Type your reply here…"
                  className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-charcoal-100 bg-charcoal-50/60 flex gap-3 sticky bottom-0">
              <button
                onClick={() => { setDelete(selected.id); setSelected(null) }}
                className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-800 text-sm font-semibold transition-colors"
              >
                <Trash2 size={14} aria-hidden="true" /> Delete
              </button>
              <button onClick={() => setSelected(null)} className="ml-auto py-2.5 px-5 rounded-xl border border-charcoal-200 text-charcoal-700 text-sm font-semibold hover:bg-charcoal-100 transition-colors">Close</button>
              <button
                onClick={sendReply}
                disabled={!reply.trim()}
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                <Send size={14} aria-hidden="true" /> Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
