import { ReactNode } from 'react'

interface SectionHeadingProps {
  label?: string
  title: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  variant?: 'default' | 'light'
  className?: string
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  variant = 'default',
  className = '',
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const titleColor = variant === 'light' ? 'text-white' : 'text-navy-900'
  const subtitleColor = variant === 'light' ? 'text-white/70' : 'text-charcoal-500'
  const labelColor = variant === 'light' ? 'text-gold-300' : 'text-gold-600'
  const dividerColor = variant === 'light' ? 'bg-gold-400' : 'bg-gold-500'

  return (
    <div className={`flex flex-col ${alignClasses} ${className}`}>
      {label && (
        <span className={`section-label ${labelColor}`}>
          <span className="w-6 h-px bg-current inline-block" aria-hidden="true" />
          {label}
        </span>
      )}
      <h2 className={`font-heading font-bold text-3xl lg:text-4xl xl:text-[2.75rem] leading-tight tracking-tight ${titleColor}`}>
        {title}
      </h2>
      <div className={`w-12 h-0.5 mt-4 ${dividerColor} ${align === 'center' ? 'mx-auto' : ''}`} aria-hidden="true" />
      {subtitle && (
        <p className={`mt-4 text-base lg:text-lg leading-relaxed max-w-2xl ${subtitleColor} ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
