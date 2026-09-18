import { Calendar, Clock, MapPin, Monitor, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface EventCardProps {
  id: string
  title: string
  description: string
  date: string
  time?: string
  location: string
  isOnline: boolean
  registrationUrl?: string
  isPast?: boolean
  category?: string
}

export default function EventCard({
  id,
  title,
  description,
  date,
  time,
  location,
  isOnline,
  registrationUrl,
  isPast = false,
  category,
}: EventCardProps) {
  const eventDate = new Date(date)
  const day = eventDate.toLocaleDateString('en-US', { day: '2-digit' })
  const month = eventDate.toLocaleDateString('en-US', { month: 'short' })
  const year = eventDate.getFullYear()

  return (
    <article className={`group card overflow-hidden hover:-translate-y-0.5 transition-all duration-300 flex gap-0 ${isPast ? 'opacity-70' : ''}`}>
      {/* Date block */}
      <div className="flex-shrink-0 w-20 bg-navy-900 flex flex-col items-center justify-center py-5 px-2 rounded-l-2xl">
        <span className="text-gold-400 text-xs font-bold uppercase tracking-wider">{month}</span>
        <span className="text-white text-2xl font-black font-heading leading-none mt-0.5">{day}</span>
        <span className="text-white/50 text-xs mt-0.5">{year}</span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <span className="inline-block bg-gold-500/10 text-gold-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                {category}
              </span>
            )}
            {isPast && (
              <span className="inline-block bg-charcoal-100 text-charcoal-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Past Event
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {isOnline ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                <Monitor size={10} aria-hidden="true" /> Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-navy-600 text-[10px] font-bold uppercase tracking-wider">
                <MapPin size={10} aria-hidden="true" /> In Person
              </span>
            )}
          </div>
        </div>

        <h3 className="font-heading font-bold text-navy-900 text-base mb-1.5 group-hover:text-gold-700 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-charcoal-500 text-xs leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-1.5 text-charcoal-400 text-xs">
            <MapPin size={11} aria-hidden="true" />
            <span>{location}</span>
          </div>
          {time && (
            <div className="flex items-center gap-1.5 text-charcoal-400 text-xs">
              <Clock size={11} aria-hidden="true" />
              <span>{time}</span>
            </div>
          )}
        </div>

        {!isPast && registrationUrl && (
          <div className="mt-3 pt-3 border-t border-charcoal-100">
            <Link
              to={registrationUrl}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-gold-600 transition-colors duration-200 group/link"
              aria-label={`Register for ${title}`}
            >
              Register Now
              <ArrowRight size={12} className="transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
