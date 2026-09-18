import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import Logo from '../ui/Logo'

const navItems = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Who We Are', href: '/about' },
      { label: 'Vision & Mission', href: '/about#vision-mission' },
      { label: 'Objectives', href: '/about#objectives' },
      { label: 'Our Principles', href: '/about#principles' },
      { label: 'Regional Structure', href: '/about#structure' },
      { label: 'Our Constitution', href: '/constitution' },
    ],
  },
  {
    label: 'Leadership',
    href: '/leadership',
  },
  {
    label: 'Programmes',
    href: '/programmes',
  },
  {
    label: 'Membership',
    href: '/membership',
  },
  {
    label: 'News & Insights',
    href: '/news',
    children: [
      { label: 'All News', href: '/news' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    label: 'Partnerships',
    href: '/partnerships',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navBg = isScrolled || !isHomePage
    ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-charcoal-100'
    : 'bg-transparent'

  const navText = isScrolled || !isHomePage ? 'text-charcoal-700 hover:text-navy-900' : 'text-white/90 hover:text-white'
  const navTextActive = isScrolled || !isHomePage ? 'text-navy-900 font-semibold' : 'text-white font-semibold'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        role="banner"
      >
        <nav
          className="container-wide flex items-center justify-between h-16 lg:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg"
            aria-label="AAYPL – Home"
          >
            <Logo
              variant={isScrolled || !isHomePage ? 'dark' : 'light'}
              size="md"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href} className="relative group">
                {item.children ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${navText}`}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown size={14} className="mt-0.5 transition-transform duration-150 group-hover:rotate-180" />
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 block ${isActive ? navTextActive : navText}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}

                {/* Dropdown */}
                {item.children && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-card-hover border border-charcoal-100 py-1.5 transition-all duration-150 origin-top ${
                      openDropdown === item.label ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
                    }`}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    role="menu"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm text-charcoal-700 hover:text-navy-900 hover:bg-cream-100 transition-colors duration-100"
                        role="menuitem"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/membership"
              className="hidden lg:inline-flex btn-primary text-xs px-5 py-2.5"
            >
              Join AAYPL
            </Link>
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors duration-150 ${
                isScrolled || !isHomePage
                  ? 'text-charcoal-700 hover:bg-cream-100'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-100">
            <Logo variant="dark" size="sm" />
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-charcoal-600 hover:text-charcoal-900 hover:bg-cream-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
            <ul className="space-y-0.5" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-charcoal-700 hover:text-navy-900 hover:bg-cream-100 rounded-xl transition-colors"
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <ul className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-gold-200 pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                to={child.href}
                                className="block px-3 py-2.5 text-sm text-charcoal-600 hover:text-navy-900 hover:bg-cream-100 rounded-lg transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                          isActive
                            ? 'text-navy-900 bg-cream-100'
                            : 'text-charcoal-700 hover:text-navy-900 hover:bg-cream-100'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile CTA */}
          <div className="px-6 py-5 border-t border-charcoal-100">
            <Link
              to="/membership"
              className="btn-primary w-full justify-center py-3.5"
            >
              Join AAYPL
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
