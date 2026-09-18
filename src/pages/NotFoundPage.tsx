import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found – AAYPL"
        description="The page you are looking for could not be found."
        path="/404"
      />
      <section className="min-h-screen bg-navy-950 flex items-center justify-center pt-20">
        <div className="container-narrow text-center py-20">
          <div className="text-[120px] font-heading font-black text-white/5 leading-none select-none mb-6" aria-hidden="true">
            404
          </div>
          <h1 className="font-heading font-bold text-white text-3xl lg:text-4xl mb-4 -mt-16">
            Page Not Found
          </h1>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md mx-auto">
            The page you are looking for does not exist or may have been moved. Please check the URL or navigate back to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary px-8 py-3.5">
              <Home size={16} aria-hidden="true" />
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline-white px-8 py-3.5"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Go Back
            </button>
          </div>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
            {[
              { label: 'About', href: '/about' },
              { label: 'Membership', href: '/membership' },
              { label: 'Programmes', href: '/programmes' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-white/40 hover:text-white/80 text-sm font-medium transition-colors duration-150 py-2 border border-white/10 hover:border-white/20 rounded-lg"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
