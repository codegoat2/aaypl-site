import { ReactNode } from 'react'

interface PrincipleCardProps {
  icon: ReactNode
  title: string
  description?: string
  compact?: boolean
}

export default function PrincipleCard({ icon, title, description, compact = false }: PrincipleCardProps) {
  if (compact) {
    return (
      <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-cream-100 transition-colors duration-200">
        <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 text-gold-600">
          {icon}
        </div>
        <span className="text-sm font-semibold text-navy-900">{title}</span>
      </div>
    )
  }

  return (
    <article className="group card p-5 hover:-translate-y-0.5 transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-gold-500/10 group-hover:bg-gold-500/20 flex items-center justify-center text-gold-600 mb-3 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-heading font-bold text-navy-900 text-sm mb-1.5">{title}</h3>
      {description && (
        <p className="text-charcoal-400 text-xs leading-relaxed">{description}</p>
      )}
    </article>
  )
}
