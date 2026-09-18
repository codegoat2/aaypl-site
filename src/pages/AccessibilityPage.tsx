import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'
import { Link } from 'react-router-dom'

export default function AccessibilityPage() {
  return (
    <>
      <SEOHead
        title="Accessibility Statement – AAYPL"
        description="AAYPL's commitment to web accessibility and how we strive to make our website usable by everyone."
        path="/accessibility"
      />
      <PageHero
        label="Accessibility"
        title="Accessibility Statement"
        subtitle="AAYPL is committed to making its website accessible to all users, including those with disabilities."
        breadcrumbs={[{ label: 'Accessibility' }]}
      />
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl mx-auto">
          <div className="space-y-10 text-charcoal-600 text-sm leading-relaxed">
            <div>
              <h2 className="font-heading font-bold text-navy-900 text-xl mb-4">Our Commitment</h2>
              <p>The All Africa Young Political Leaders Organization (AAYPL) is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-navy-900 text-xl mb-4">Accessibility Features</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Semantic HTML structure with proper heading hierarchy</li>
                <li>Descriptive alt text for meaningful images</li>
                <li>Keyboard navigation support throughout the site</li>
                <li>Visible focus states for interactive elements</li>
                <li>Accessible form labels and error messages</li>
                <li>Sufficient color contrast ratios</li>
                <li>Reduced motion support for users who prefer less animation</li>
                <li>ARIA labels on interactive components where appropriate</li>
                <li>Responsive design that works across devices and zoom levels</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading font-bold text-navy-900 text-xl mb-4">Known Limitations</h2>
              <p>While we strive for full accessibility, some areas of our website may not yet fully meet WCAG 2.1 AA standards. We are working to identify and address these limitations. Full accessibility validation requires manual testing with assistive technologies and expert accessibility review.</p>
            </div>
            <div>
              <h2 className="font-heading font-bold text-navy-900 text-xl mb-4">Feedback</h2>
              <p>If you experience any accessibility barriers on the AAYPL website or require content in an alternative format, please contact us through our <Link to="/contact" className="text-navy-900 font-semibold underline hover:text-gold-600 transition-colors">Contact page</Link>. We take accessibility feedback seriously and will work to address any issues you raise.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
