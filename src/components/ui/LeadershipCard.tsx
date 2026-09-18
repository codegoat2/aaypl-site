import { User, Linkedin, Twitter, Globe } from 'lucide-react'

interface SocialLinks {
  linkedin?: string
  twitter?: string
  website?: string
}

interface LeadershipCardProps {
  name?: string
  position: string
  country?: string
  biography?: string
  imageUrl?: string
  socialLinks?: SocialLinks
  placeholder?: boolean
}

export default function LeadershipCard({
  name,
  position,
  country,
  biography,
  imageUrl,
  socialLinks,
  placeholder = false,
}: LeadershipCardProps) {
  return (
    <article className="group card overflow-hidden hover:-translate-y-1 transition-all duration-300">
      {/* Photo */}
      <div className="relative h-56 bg-gradient-to-br from-navy-900/5 to-navy-900/10 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name ? `${name} – ${position}` : position}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-20 h-20 rounded-full bg-navy-900/10 border-2 border-dashed border-navy-900/20 flex items-center justify-center">
              <User size={32} className="text-navy-900/30" aria-hidden="true" />
            </div>
            {placeholder && (
              <span className="text-xs text-charcoal-400 italic">Photo coming soon</span>
            )}
          </div>
        )}
        {/* Gold accent bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading font-bold text-navy-900 text-base mb-0.5">
          {name || <span className="text-charcoal-300 italic">Name to be announced</span>}
        </h3>
        <p className="text-gold-600 text-xs font-bold uppercase tracking-wider mb-1">
          {position}
        </p>
        {country && (
          <p className="text-charcoal-400 text-xs mb-3">{country}</p>
        )}
        {biography ? (
          <p className="text-charcoal-500 text-sm leading-relaxed line-clamp-3">
            {biography}
          </p>
        ) : placeholder ? (
          <p className="text-charcoal-300 text-sm italic">Biography coming soon</p>
        ) : null}

        {/* Social links */}
        {socialLinks && Object.values(socialLinks).some(Boolean) && (
          <div className="mt-4 pt-4 border-t border-charcoal-100 flex items-center gap-2">
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-navy-900 flex items-center justify-center text-charcoal-400 hover:text-white transition-all duration-200"
                aria-label={`${name || position} on LinkedIn`}
              >
                <Linkedin size={13} aria-hidden="true" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-navy-900 flex items-center justify-center text-charcoal-400 hover:text-white transition-all duration-200"
                aria-label={`${name || position} on X`}
              >
                <Twitter size={13} aria-hidden="true" />
              </a>
            )}
            {socialLinks.website && (
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-cream-100 hover:bg-navy-900 flex items-center justify-center text-charcoal-400 hover:text-white transition-all duration-200"
                aria-label={`${name || position}'s website`}
              >
                <Globe size={13} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
