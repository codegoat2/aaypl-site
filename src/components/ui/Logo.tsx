interface LogoProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-navy-900'
  const subColor = variant === 'light' ? 'text-white/70' : 'text-charcoal-500'
  const badgeColor = variant === 'light' ? 'bg-white/20 text-white border-white/30' : 'bg-gold-500/10 text-gold-700 border-gold-200'
  const ringColor = variant === 'light' ? 'border-white/30' : 'border-navy-900/20'

  const iconSize = size === 'sm' ? 32 : size === 'md' ? 40 : 52
  const textSizes = {
    sm: { main: 'text-sm', sub: 'text-[9px]', badge: 'text-[7px]' },
    md: { main: 'text-base', sub: 'text-[10px]', badge: 'text-[8px]' },
    lg: { main: 'text-xl', sub: 'text-xs', badge: 'text-[9px]' },
  }[size]

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Logo Icon */}
      <div
        className={`flex-shrink-0 rounded-lg border ${ringColor} flex items-center justify-center`}
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          width={iconSize * 0.7}
          height={iconSize * 0.7}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Africa shape simplified */}
          <path
            d="M14 2C8 2 3 7 3 13c0 3.5 1.5 6.5 4 8.5 1 .8 2 1.5 3 2 1.5 1 3 1.5 4 1.5s2.5-.5 4-1.5c1-.5 2-1.2 3-2 2.5-2 4-5 4-8.5C25 7 20 2 14 2z"
            fill={variant === 'light' ? 'rgba(255,255,255,0.15)' : 'rgba(10,22,40,0.08)'}
            stroke={variant === 'light' ? 'rgba(255,255,255,0.5)' : '#0a1628'}
            strokeWidth="1.5"
          />
          {/* Star/compass */}
          <path
            d="M14 7l1.5 4.5H20l-3.5 2.5 1.5 4.5L14 16l-4 2.5 1.5-4.5L8 11.5h4.5L14 7z"
            fill="#c9961a"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <div className={`font-heading font-black ${textSizes.main} ${textColor} tracking-tight`}>
          AAYPL
        </div>
        <div className={`font-body ${textSizes.sub} ${subColor} tracking-wide mt-0.5 uppercase`}>
          All Africa Young Political Leaders
        </div>
        {size !== 'sm' && (
          <div className={`mt-1 inline-flex items-center border rounded-full px-1.5 py-0.5 ${badgeColor} ${textSizes.badge} font-bold uppercase tracking-widest`}>
            Est. Organization
          </div>
        )}
      </div>
    </div>
  )
}
