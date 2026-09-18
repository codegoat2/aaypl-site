import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

interface NewsCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author?: string
  imageUrl?: string
  featured?: boolean
}

export default function NewsCard({
  slug,
  title,
  excerpt,
  category,
  date,
  author,
  imageUrl,
  featured = false,
}: NewsCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className={`group card overflow-hidden hover:-translate-y-0.5 transition-all duration-300 flex flex-col ${featured ? 'lg:flex-row' : ''}`}>
      {/* Image */}
      <div className={`relative overflow-hidden bg-navy-900/5 flex-shrink-0 ${featured ? 'lg:w-80' : ''}`}>
        <div className={`${featured ? 'h-full min-h-[200px]' : 'h-48'}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              aria-hidden="true"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy-900/8 to-navy-900/15 flex items-center justify-center">
              <div className="text-navy-900/20 font-heading font-black text-5xl select-none" aria-hidden="true">
                AAYPL
              </div>
            </div>
          )}
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-navy-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            <Tag size={9} aria-hidden="true" />
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-charcoal-400 text-xs">
            <Calendar size={12} aria-hidden="true" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
          {author && (
            <>
              <span className="text-charcoal-200" aria-hidden="true">·</span>
              <span className="text-charcoal-400 text-xs">{author}</span>
            </>
          )}
        </div>

        <h3 className={`font-heading font-bold text-navy-900 leading-tight mb-2 group-hover:text-gold-700 transition-colors duration-300 ${featured ? 'text-xl lg:text-2xl' : 'text-base'}`}>
          <Link to={`/news/${slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded">
            {title}
          </Link>
        </h3>

        <p className="text-charcoal-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <Link
          to={`/news/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors duration-200 group/link"
          aria-label={`Read more about ${title}`}
        >
          Read Article
          <ArrowRight size={14} className="transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
