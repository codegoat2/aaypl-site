import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'primary-navy' | 'outline' | 'outline-white' | 'outline-gold' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
  children: ReactNode
  fullWidth?: boolean
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  'primary': 'btn-primary',
  'primary-navy': 'btn-primary-navy',
  'outline': 'btn-outline',
  'outline-white': 'btn-outline-white',
  'outline-gold': 'btn-outline-gold',
  'ghost': 'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-charcoal-600 hover:text-navy-900 hover:bg-cream-100 font-medium rounded-lg transition-colors duration-150 text-sm',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: '',
  lg: 'text-base px-8 py-4',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  href,
  external,
  children,
  fullWidth,
  loading,
  className = '',
  disabled,
  ...props
}, ref) => {
  const classes = [
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : '',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </>
      ) : children}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
