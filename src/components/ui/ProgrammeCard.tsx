import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProgrammeCardProps {
  icon: ReactNode
  title: string
  description: string
  slug: string
  color?: 'navy' | 'gold' | 'green' | 'default'
}

const colorMap = {
  navy: 'bg-navy-900 text-white',
  gold: 'bg-gold-500 text-white',
  green: 'bg-emerald-700 text-white',
  default: 'bg-cream-200 text-navy-900',
}

export default function ProgrammeCard({ icon, title, description, slug, color = 'default' }: ProgrammeCardProps) {
  return (
    <article className="group card p-6 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[color]} transition-all duration-300`}>
        {icon}
      </div>
      <h3 className="font-heading font-bold text-navy-900 text-lg mb-2 group-hover:text-gold-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-charcoal-500 text-sm leading-relaxed flex-1 mb-4">
        {description}
      </p>
      <Link
        to={`/programmes#${slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors duration-200 group/link"
        aria-label={`Learn more about ${title}`}
      >
        Learn More
        <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  )
}
