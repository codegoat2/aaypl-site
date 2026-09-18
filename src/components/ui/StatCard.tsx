import { useScrollAnimation, useCountUp } from '../../lib/useScrollAnimation'

interface StatCardProps {
  value: number | string
  label: string
  suffix?: string
  description?: string
  variant?: 'default' | 'light' | 'gold'
  animated?: boolean
}

export default function StatCard({
  value,
  label,
  suffix = '',
  description,
  variant = 'default',
  animated = true,
}: StatCardProps) {
  const { ref, isVisible } = useScrollAnimation()
  const numericValue = typeof value === 'number' ? value : 0
  const countedValue = useCountUp(animated && typeof value === 'number' ? numericValue : 0, isVisible)

  const displayValue = animated && typeof value === 'number'
    ? `${countedValue}${suffix}`
    : `${value}${suffix}`

  const bgClass = {
    default: 'bg-white border border-charcoal-100',
    light: 'bg-navy-900 border border-navy-800',
    gold: 'bg-gold-500/10 border border-gold-200',
  }[variant]

  const valueClass = {
    default: 'text-navy-900',
    light: 'text-white',
    gold: 'text-gold-700',
  }[variant]

  const labelClass = {
    default: 'text-charcoal-500',
    light: 'text-white/60',
    gold: 'text-gold-600',
  }[variant]

  const descClass = {
    default: 'text-charcoal-400',
    light: 'text-white/40',
    gold: 'text-gold-500/70',
  }[variant]

  return (
    <div
      ref={ref}
      className={`rounded-2xl p-6 text-center ${bgClass} transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5`}
    >
      <p className={`font-heading font-black text-4xl lg:text-5xl tracking-tight ${valueClass}`}>
        {displayValue}
      </p>
      <p className={`mt-2 text-sm font-bold uppercase tracking-wider ${labelClass}`}>
        {label}
      </p>
      {description && (
        <p className={`mt-1.5 text-xs leading-relaxed ${descClass}`}>
          {description}
        </p>
      )}
    </div>
  )
}
