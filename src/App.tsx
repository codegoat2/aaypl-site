import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LeadershipPage from './pages/LeadershipPage'
import ProgrammesPage from './pages/ProgrammesPage'
import MembershipPage from './pages/MembershipPage'
import ConstitutionPage from './pages/ConstitutionPage'
import EventsPage from './pages/EventsPage'
import NewsPage from './pages/NewsPage'
import NewsArticlePage from './pages/NewsArticlePage'
import PartnershipsPage from './pages/PartnershipsPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import AccessibilityPage from './pages/AccessibilityPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminPage from './admin/AdminPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/leadership" element={<Layout><LeadershipPage /></Layout>} />
        <Route path="/programmes" element={<Layout><ProgrammesPage /></Layout>} />
        <Route path="/membership" element={<Layout><MembershipPage /></Layout>} />
        <Route path="/constitution" element={<Layout><ConstitutionPage /></Layout>} />
        <Route path="/events" element={<Layout><EventsPage /></Layout>} />
        <Route path="/news" element={<Layout><NewsPage /></Layout>} />
        <Route path="/news/:slug" element={<Layout><NewsArticlePage /></Layout>} />
        <Route path="/partnerships" element={<Layout><PartnershipsPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
        <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
        <Route path="/accessibility" element={<Layout><AccessibilityPage /></Layout>} />
        {/* Admin – rendered outside the public Layout, secured by password */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
