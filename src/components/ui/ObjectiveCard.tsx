import { ReactNode } from 'react'

interface ObjectiveCardProps {
  icon: ReactNode
  number: string
  title: string
  description: string
}

export default function ObjectiveCard({ icon, number, title, description }: ObjectiveCardProps) {
  return (
    <article className="group card p-6 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-navy-900/5 group-hover:bg-gold-500/10 flex items-center justify-center transition-colors duration-300">
            <span className="text-navy-900 group-hover:text-gold-600 transition-colors duration-300">
              {icon}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black text-gold-500 uppercase tracking-widest">{number}</span>
            <div className="flex-1 h-px bg-charcoal-100" aria-hidden="true" />
          </div>
          <h3 className="font-heading font-bold text-navy-900 text-base mb-1.5 group-hover:text-gold-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-charcoal-500 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}
