import { useState } from 'react'
import { Save, Trash2, AlertTriangle, CheckCircle2, Globe, Mail, Bell, Lock } from 'lucide-react'
import { clearActivityLog } from '../useAdminAuth'

const SETTINGS_KEY = 'aaypl_admin_settings'

interface SiteSettings {
  siteName: string
  contactEmail: string
  notificationsEnabled: boolean
  maintenanceMode: boolean
  membersPerPage: number
  postsPerPage: number
  allowPublicComments: boolean
  announcementBanner: string
  announcementEnabled: boolean
}

function loadSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (raw) return JSON.parse(raw) as SiteSettings
  } catch { /* ignore */ }
  return {
    siteName: 'AAYPL – All Africa Young Political Leaders',
    contactEmail: 'info@aaypl.org',
    notificationsEnabled: true,
    maintenanceMode: false,
    membersPerPage: 20,
    postsPerPage: 10,
    allowPublicComments: false,
    announcementBanner: '',
    announcementEnabled: false,
  }
}

function persistSettings(s: SiteSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  } catch { /* ignore */ }
}

export default function SettingsSection() {
  const [settings, setSettings]   = useState<SiteSettings>(loadSettings)
  const [saved, setSaved]         = useState(false)
  const [clearConfirm, setClear]  = useState(false)
  const [cleared, setCleared]     = useState(false)

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  function handleSave() {
    persistSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleClearData() {
    clearActivityLog()
    localStorage.removeItem('aaypl_admin_posts')
    localStorage.removeItem('aaypl_admin_members')
    localStorage.removeItem('aaypl_admin_support')
    setClear(false)
    setCleared(true)
    setTimeout(() => setCleared(false), 4000)
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-7">
        <h2 className="text-2xl font-heading font-black text-charcoal-900">Settings</h2>
        <p className="text-charcoal-400 text-sm mt-0.5">Configure the admin dashboard and site preferences.</p>
      </div>

      {saved && (
        <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
          <CheckCircle2 size={15} aria-hidden="true" /> Settings saved successfully.
        </div>
      )}

      {cleared && (
        <div className="mb-5 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
          <CheckCircle2 size={15} aria-hidden="true" /> All admin data has been cleared.
        </div>
      )}

      {/* ── Section: General ── */}
      <SettingCard icon={Globe} title="General">
        <FieldRow label="Site Name">
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => update('siteName', e.target.value)}
            className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
          />
        </FieldRow>
        <FieldRow label="Contact Email">
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => update('contactEmail', e.target.value)}
            className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all"
          />
        </FieldRow>
        <FieldRow label="Posts per page">
          <input
            type="number"
            min={5} max={100}
            value={settings.postsPerPage}
            onChange={(e) => update('postsPerPage', Number(e.target.value))}
            className="w-32 border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 transition-all"
          />
        </FieldRow>
        <FieldRow label="Members per page">
          <input
            type="number"
            min={5} max={100}
            value={settings.membersPerPage}
            onChange={(e) => update('membersPerPage', Number(e.target.value))}
            className="w-32 border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 transition-all"
          />
        </FieldRow>
      </SettingCard>

      {/* ── Section: Announcement ── */}
      <SettingCard icon={Bell} title="Announcement Banner">
        <FieldRow label="Enable Banner">
          <Toggle
            value={settings.announcementEnabled}
            onChange={(v) => update('announcementEnabled', v)}
            label="Show announcement banner on the website"
          />
        </FieldRow>
        <FieldRow label="Banner Text">
          <input
            type="text"
            value={settings.announcementBanner}
            onChange={(e) => update('announcementBanner', e.target.value)}
            placeholder="e.g. Registration for the Continental Summit is now open!"
            disabled={!settings.announcementEnabled}
            className="w-full border border-charcoal-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all disabled:opacity-50 disabled:bg-charcoal-50"
          />
        </FieldRow>
      </SettingCard>

      {/* ── Section: Notifications ── */}
      <SettingCard icon={Mail} title="Notifications">
        <FieldRow label="Email Notifications">
          <Toggle
            value={settings.notificationsEnabled}
            onChange={(v) => update('notificationsEnabled', v)}
            label="Receive email alerts for new membership applications and support messages"
          />
        </FieldRow>
        <FieldRow label="Allow Public Comments">
          <Toggle
            value={settings.allowPublicComments}
            onChange={(v) => update('allowPublicComments', v)}
            label="Allow visitors to comment on published posts"
          />
        </FieldRow>
      </SettingCard>

      {/* ── Section: System ── */}
      <SettingCard icon={Lock} title="System">
        <FieldRow label="Maintenance Mode">
          <Toggle
            value={settings.maintenanceMode}
            onChange={(v) => update('maintenanceMode', v)}
            label="Show a maintenance message to public visitors"
          />
        </FieldRow>
        {settings.maintenanceMode && (
          <div className="mt-2 ml-0 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-xl px-3 py-2.5 flex items-center gap-2">
            <AlertTriangle size={13} aria-hidden="true" />
            Maintenance mode is active. Public visitors will see a maintenance message.
          </div>
        )}
      </SettingCard>

      {/* Save button */}
      <div className="flex justify-end mt-6 mb-8">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
        >
          <Save size={15} aria-hidden="true" /> Save Settings
        </button>
      </div>

      {/* ── Danger zone ── */}
      <div className="border-2 border-red-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={16} className="text-red-500" aria-hidden="true" />
          <h3 className="font-bold text-red-700 text-sm">Danger Zone</h3>
        </div>
        <p className="text-charcoal-500 text-sm mb-4">
          These actions are irreversible. All admin data (posts, members, support messages, activity logs) stored locally will be permanently deleted.
        </p>
        <button
          onClick={() => setClear(true)}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
        >
          <Trash2 size={14} aria-hidden="true" /> Reset All Admin Data
        </button>
      </div>

      {/* Clear confirm */}
      {clearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="danger-title">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-red-500" aria-hidden="true" />
              <h3 id="danger-title" className="font-bold text-charcoal-900 text-lg">Reset All Data?</h3>
            </div>
            <p className="text-charcoal-500 text-sm mb-6">
              This will permanently delete ALL posts, members, support messages, and activity logs from this device. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setClear(false)} className="flex-1 py-2.5 rounded-xl border border-charcoal-200 text-charcoal-700 text-sm font-semibold hover:bg-charcoal-50 transition-colors">Cancel</button>
              <button onClick={handleClearData} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">Yes, Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SettingCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-charcoal-100 p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-charcoal-400" aria-hidden="true" />
        <h3 className="font-semibold text-charcoal-800 text-sm">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label className="text-sm text-charcoal-600 font-medium w-44 flex-shrink-0">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  )
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 ${
          value ? 'bg-navy-700' : 'bg-charcoal-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-charcoal-500">{label}</span>
    </div>
  )
}
