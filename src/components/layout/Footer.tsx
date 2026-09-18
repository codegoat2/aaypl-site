import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react'
import Logo from '../ui/Logo'

const footerLinks = {
  organization: [
    { label: 'About AAYPL', href: '/about' },
    { label: 'Vision & Mission', href: '/about#vision-mission' },
    { label: 'Leadership', href: '/leadership' },
    { label: 'Our Constitution', href: '/constitution' },
    { label: 'Regional Structure', href: '/about#structure' },
  ],
  engage: [
    { label: 'Become a Member', href: '/membership' },
    { label: 'Programmes', href: '/programmes' },
    { label: 'Events', href: '/events' },
    { label: 'Partnerships', href: '/partnerships' },
    { label: 'News & Insights', href: '/news' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: '#', ariaLabel: 'Follow AAYPL on Facebook (coming soon)' },
  { label: 'X (Twitter)', icon: Twitter, href: '#', ariaLabel: 'Follow AAYPL on X (coming soon)' },
  { label: 'Instagram', icon: Instagram, href: '#', ariaLabel: 'Follow AAYPL on Instagram (coming soon)' },
  { label: 'LinkedIn', icon: Linkedin, href: '#', ariaLabel: 'Follow AAYPL on LinkedIn (coming soon)' },
  { label: 'YouTube', icon: Youtube, href: '#', ariaLabel: 'Subscribe to AAYPL on YouTube (coming soon)' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-white" role="contentinfo">
      {/* Top border accent */}
      <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" aria-hidden="true" />

      {/* Main footer content */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="AAYPL – Home">
              <Logo variant="light" size="md" />
            </Link>
            <p className="mt-5 text-white/60 text-sm leading-relaxed max-w-xs">
              A continental platform for young African leaders committed to democracy, good governance, peace, and sustainable development.
            </p>
            <p className="mt-4 text-gold-400 text-xs font-bold uppercase tracking-widest italic">
              "Unity, Leadership, Integrity and Service"
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-2.5" aria-label="Social media links">
              {socialLinks.map(({ label, icon: Icon, href, ariaLabel }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={ariaLabel}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-gold-500 border border-white/10 hover:border-gold-500 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
                  rel="noopener noreferrer"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Organization links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-5">
              Organization
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.organization.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engage links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-5">
              Engage
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.engage.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-5">
              Contact
            </h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-gold-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wide mb-0.5">Email</p>
                  <span className="text-sm text-white/60">To be provided</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wide mb-0.5">Headquarters</p>
                  <span className="text-sm text-white/60">To be provided</span>
                </div>
              </li>
            </ul>

            {/* Newsletter teaser */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/70 font-semibold mb-1">Stay Informed</p>
              <p className="text-xs text-white/40 leading-relaxed">
                Follow our social media channels for the latest updates, events, and announcements from AAYPL.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center sm:text-left">
            © {year} All Africa Young Political Leaders Organization. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
