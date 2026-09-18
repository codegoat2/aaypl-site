import { useState, useEffect } from 'react'
import { useAdminAuth } from './useAdminAuth'
import { getMembers, getSupportMessages, seedDemoMembers, seedDemoMessages } from './adminStore'
import AdminLogin from './AdminLogin'
import AdminLayout, { AdminSection } from './AdminLayout'
import OverviewSection from './sections/OverviewSection'
import PostsSection from './sections/PostsSection'
import MembershipSection from './sections/MembershipSection'
import SupportSection from './sections/SupportSection'
import ActivityLogSection from './sections/ActivityLogSection'
import SettingsSection from './sections/SettingsSection'

export default function AdminPage() {
  const auth = useAdminAuth()
  const [section, setSection] = useState<AdminSection>('overview')

  // Seed demo data on first load
  useEffect(() => {
    if (auth.isAuthenticated) {
      seedDemoMembers()
      seedDemoMessages()
    }
  }, [auth.isAuthenticated])

  // Badge counts for sidebar indicators
  const [badges, setBadges] = useState<Partial<Record<AdminSection, number>>>({})

  useEffect(() => {
    if (!auth.isAuthenticated) return
    const members  = getMembers()
    const messages = getSupportMessages()
    setBadges({
      membership: members.filter((m) => m.status === 'pending' || m.status === 'under_review').length || undefined,
      support:    messages.filter((m) => m.status === 'unread').length || undefined,
    })
  }, [auth.isAuthenticated, section])

  if (!auth.isAuthenticated) {
    return <AdminLogin auth={auth} />
  }

  function renderSection() {
    switch (section) {
      case 'overview':
        return <OverviewSection onNavigate={setSection} />
      case 'news':
        return <PostsSection type="news" />
      case 'blog':
        return <PostsSection type="blog" />
      case 'membership':
        return <MembershipSection />
      case 'support':
        return <SupportSection />
      case 'logs':
        return <ActivityLogSection />
      case 'settings':
        return <SettingsSection />
      default:
        return <OverviewSection onNavigate={setSection} />
    }
  }

  return (
    <AdminLayout
      activeSection={section}
      onNavigate={setSection}
      onLogout={auth.logout}
      badges={badges}
    >
      {renderSection()}
    </AdminLayout>
  )
}
