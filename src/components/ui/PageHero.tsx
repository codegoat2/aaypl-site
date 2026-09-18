import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  label?: string
  title: ReactNode
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  align?: 'left' | 'center'
  children?: ReactNode
}

export default function PageHero({
  label,
  title,
  subtitle,
  breadcrumbs,
  align = 'center',
  children,
}: PageHeroProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <section
      className="relative bg-navy-950 pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden"
      aria-label="Page header"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 60px)`,
        }} />
      </div>

      {/* Gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" aria-hidden="true" />

      <div className="container-wide relative">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link to="/" className="text-white/40 hover:text-white/70 transition-colors duration-150">
              <Home size={13} aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-white/30" aria-hidden="true" />
                {crumb.href && idx < breadcrumbs.length - 1 ? (
                  <Link to={crumb.href} className="text-white/40 hover:text-white/70 text-xs transition-colors duration-150">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/60 text-xs" aria-current="page">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={`flex flex-col ${alignClasses} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {label && (
            <span className="section-label text-gold-300 mb-4">
              <span className="w-6 h-px bg-current inline-block" aria-hidden="true" />
              {label}
            </span>
          )}
          <h1 className="font-heading font-black text-white text-display-md lg:text-display-lg leading-tight tracking-tight">
            {title}
          </h1>
          <div className={`w-16 h-0.5 bg-gold-500 mt-5 ${align === 'center' ? 'mx-auto' : ''}`} aria-hidden="true" />
          {subtitle && (
            <p className="mt-5 text-white/60 text-base lg:text-lg leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}
