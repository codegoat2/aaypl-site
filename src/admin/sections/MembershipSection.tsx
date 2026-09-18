import { useState, useEffect, useCallback } from 'react'
import {
  Users, Search, ChevronDown, CheckCircle2, XCircle,
  Clock, Eye, Trash2, Mail, Phone, MapPin, Briefcase,
  X, RefreshCw,
} from 'lucide-react'
import {
  MemberApplication, MemberStatus,
  getMembers, updateMemberStatus, deleteMember, seedDemoMembers,
} from '../adminStore'

const STATUS_STYLES: Record<MemberStatus, string> = {
  pending:      'bg-amber-100  text-amber-700  border-amber-200',
  under_review: 'bg-blue-100   text-blue-700   border-blue-200',
  approved:     'bg-emerald-100 text-emerald-700 border-emerald-200',
  rejected:     'bg-red-100    text-red-700    border-red-200',
}

const STATUS_LABELS: Record<MemberStatus, string> = {
  pending:      'Pending',
  under_review: 'Under Review',
  approved:     'Approved',
  rejected:     'Rejected',
}

export default function MembershipSection() {
  const [members, setMembers]       = useState<MemberApplication[]>([])
  const [search, setSearch]         = useState('')
  const [filterStatus, setFilter]   = useState<MemberStatus | 'all'>('all')
  const [selected, setSelected]     = useState<MemberApplication | null>(null)
  const [deleteConfirm, setDelete]  = useState<string | null>(null)

  const load = useCallback(() => {
    seedDemoMembers()
    setMembers(getMembers())
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = members.filter((m) => {
    const q = search.toLowerCase()
    const matchSearch = m.full_name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.country.toLowerCase().includes(q)
    const matchStatus = filterStatus === 'all' || m.status === filterStatus
    return matchSearch && matchStatus
  })

  function changeStatus(id: string, status: MemberStatus) {
    updateMemberStatus(id, status)
    load()
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : prev)
  }

  function handleDelete(id: string) {
    deleteMember(id)
    setDelete(null)
    if (selected?.id === id) setSelected(null)
    load()
  }

  const counts: Record<MemberStatus | 'all', number> = {
    all:          members.length,
    pending:      members.filter((m) => m.status === 'pending').length,
    under_review: members.filter((m) => m.status === 'under_review').length,
    approved:     members.filter((m) => m.status === 'approved').length,
    rejected:     members.filter((m) => m.status === 'rejected').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-heading font-black text-charcoal-900">Membership Management</h2>
          <p className="text-charcoal-400 text-sm mt-0.5">{members.length} total applications</p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 text-sm text-charcoal-500 hover:text-charcoal-800 border border-charcoal-200 rounded-xl px-3 py-2 hover:bg-charcoal-50 transition-colors"
          aria-label="Refresh member list"
        >
          <RefreshCw size={14} aria-hidden="true" /> Refresh
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {(['all', 'pending', 'under_review', 'approved', 'rejected'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              filterStatus === s
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-white text-charcoal-500 border-charcoal-200 hover:border-charcoal-300'
            }`}
          >
            {s === 'all' ? 'All' : STATUS_LABELS[s]}
            <span className={`rounded-full px-1.5 py-0 text-[10px] font-bold ${
              filterStatus === s ? 'bg-white/20 text-white' : 'bg-charcoal-100 text-charcoal-500'
            }`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-300" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or country…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-charcoal-200 rounded-xl bg-white focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-charcoal-400">
            <Users size={32} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
            <p className="text-sm">{search || filterStatus !== 'all' ? 'No members match your filters.' : 'No membership applications yet.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-charcoal-100 bg-charcoal-50/60">
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-5 py-3">Name</th>
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-3 py-3">Country</th>
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-3 py-3">Category</th>
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-3 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-charcoal-400 uppercase tracking-wide px-3 py-3">Applied</th>
                  <th className="px-3 py-3" aria-label="Actions" />
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-50">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-charcoal-50/40 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="font-semibold text-charcoal-800">{m.full_name}</div>
                      <div className="text-charcoal-400 text-xs">{m.email}</div>
                    </td>
                    <td className="px-3 py-3 text-charcoal-500">{m.country}</td>
                    <td className="px-3 py-3 text-charcoal-500 text-xs">{m.membership_category}</td>
                    <td className="px-3 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${STATUS_STYLES[m.status]}`}>
                        {STATUS_LABELS[m.status]}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-charcoal-400 text-xs whitespace-nowrap">
                      {new Date(m.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                        <button
                          onClick={() => setSelected(m)}
                          title="View application"
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-navy-700 hover:bg-navy-50 transition-colors"
                          aria-label="View member application"
                        >
                          <Eye size={15} />
                        </button>
                        {m.status !== 'approved' && (
                          <button
                            onClick={() => changeStatus(m.id, 'approved')}
                            title="Approve"
                            className="p-1.5 rounded-lg text-charcoal-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            aria-label="Approve member"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                        )}
                        {m.status !== 'rejected' && (
                          <button
                            onClick={() => changeStatus(m.id, 'rejected')}
                            title="Reject"
                            className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            aria-label="Reject member"
                          >
                            <XCircle size={15} />
                          </button>
                        )}
                        {m.status !== 'under_review' && (
                          <button
                            onClick={() => changeStatus(m.id, 'under_review')}
                            title="Mark Under Review"
                            className="p-1.5 rounded-lg text-charcoal-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            aria-label="Mark as under review"
                          >
                            <Clock size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => setDelete(m.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          aria-label="Delete member"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-charcoal-900 text-lg mb-2">Delete Application?</h3>
            <p className="text-charcoal-500 text-sm mb-6">This will permanently remove the member application.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelete(null)} className="flex-1 py-2.5 rounded-xl border border-charcoal-200 text-charcoal-700 text-sm font-semibold hover:bg-charcoal-50 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Application detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-end" role="dialog" aria-modal="true" aria-labelledby="member-detail-title">
          <div className="bg-white h-full w-full max-w-lg overflow-y-auto shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100 sticky top-0 bg-white z-10">
              <h3 id="member-detail-title" className="font-heading font-bold text-charcoal-900 text-lg">Application Detail</h3>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-5">
              {/* Status banner */}
              <div className={`flex items-center justify-between rounded-xl border px-4 py-3 ${STATUS_STYLES[selected.status]}`}>
                <span className="text-sm font-semibold">Status: {STATUS_LABELS[selected.status]}</span>
                <div className="flex gap-2">
                  {selected.status !== 'approved' && (
                    <button onClick={() => changeStatus(selected.id, 'approved')} className="text-xs font-bold underline">Approve</button>
                  )}
                  {selected.status !== 'rejected' && (
                    <button onClick={() => changeStatus(selected.id, 'rejected')} className="text-xs font-bold underline">Reject</button>
                  )}
                  {selected.status !== 'under_review' && (
                    <button onClick={() => changeStatus(selected.id, 'under_review')} className="text-xs font-bold underline">Review</button>
                  )}
                </div>
              </div>

              {/* Personal info */}
              <Section title="Personal Information">
                <Field icon={<Users size={13} />} label="Full Name" value={selected.full_name} />
                <Field icon={<Mail size={13} />} label="Email" value={selected.email} />
                {selected.phone && <Field icon={<Phone size={13} />} label="Phone" value={selected.phone} />}
                <Field icon={<MapPin size={13} />} label="Country" value={`${selected.country}${selected.city ? `, ${selected.city}` : ''}`} />
                {selected.date_of_birth && <Field icon={<Clock size={13} />} label="Date of Birth" value={selected.date_of_birth} />}
              </Section>

              {/* Professional info */}
              <Section title="Professional Background">
                {selected.occupation && <Field icon={<Briefcase size={13} />} label="Occupation" value={selected.occupation} />}
                {selected.organization && <Field icon={<Briefcase size={13} />} label="Organization" value={selected.organization} />}
                {selected.leadership_role && <Field icon={<Briefcase size={13} />} label="Leadership Role" value={selected.leadership_role} />}
                <Field icon={<Users size={13} />} label="Membership Category" value={selected.membership_category} />
              </Section>

              {/* Areas of interest */}
              {selected.areas_of_interest && selected.areas_of_interest.length > 0 && (
                <Section title="Areas of Interest">
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selected.areas_of_interest.map((a) => (
                      <span key={a} className="bg-navy-50 text-navy-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-navy-100">{a}</span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Statement */}
              <Section title="Statement of Interest">
                <p className="text-charcoal-600 text-sm leading-relaxed mt-1">{selected.statement_of_interest}</p>
              </Section>

              {/* Agreements */}
              <Section title="Agreements">
                <AgreementRow label="Agreed to Constitution" value={selected.agreed_to_constitution} />
                <AgreementRow label="Consented to Privacy Policy" value={selected.consented_to_privacy} />
              </Section>
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 border-t border-charcoal-100 bg-charcoal-50/60 flex gap-3 sticky bottom-0">
              <button onClick={() => { setDelete(selected.id); setSelected(null) }} className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-800 text-sm font-semibold transition-colors">
                <Trash2 size={14} aria-hidden="true" /> Delete
              </button>
              <button onClick={() => setSelected(null)} className="ml-auto py-2.5 px-5 rounded-xl border border-charcoal-200 text-charcoal-700 text-sm font-semibold hover:bg-charcoal-100 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Small helper sub-components ───────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-charcoal-400 mb-3 pb-1 border-b border-charcoal-100">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-charcoal-300 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-charcoal-400">{label}</p>
        <p className="text-sm text-charcoal-700 font-medium">{value}</p>
      </div>
    </div>
  )
}

function AgreementRow({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {value
        ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" aria-hidden="true" />
        : <XCircle     size={14} className="text-red-400    flex-shrink-0" aria-hidden="true" />}
      <span className="text-sm text-charcoal-600">{label}</span>
    </div>
  )
}
