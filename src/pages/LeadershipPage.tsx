import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import LeadershipCard from '../components/ui/LeadershipCard'
import { useScrollAnimation } from '../lib/useScrollAnimation'

function AnimatedSection({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Board of Trustees placeholders
const boardOfTrustees = [
  { position: 'Chairman, Board of Trustees', placeholder: true },
  { position: 'Vice Chairman, Board of Trustees', placeholder: true },
  { position: 'Trustee', placeholder: true },
  { position: 'Trustee', placeholder: true },
  { position: 'Trustee', placeholder: true },
  { position: 'Legal / Constitutional Adviser', placeholder: true },
]

// Continental Executive Council placeholders
const executiveCouncil = [
  { position: 'President', placeholder: true },
  { position: 'Deputy President', placeholder: true },
  { position: 'Secretary-General', placeholder: true },
  { position: 'Deputy Secretary-General', placeholder: true },
  { position: 'Vice President – North Africa', placeholder: true },
  { position: 'Vice President – West Africa', placeholder: true },
  { position: 'Vice President – East Africa', placeholder: true },
  { position: 'Vice President – Central Africa', placeholder: true },
  { position: 'Vice President – Southern Africa', placeholder: true },
  { position: 'Director-General', placeholder: true },
  { position: 'Treasurer', placeholder: true },
  { position: 'Financial Secretary', placeholder: true },
  { position: 'Publicity & Communications Secretary', placeholder: true },
  { position: 'Organizing Secretary', placeholder: true },
  { position: 'Legal Adviser', placeholder: true },
  { position: 'Youth Development Director', placeholder: true },
  { position: 'Women & Inclusion Director', placeholder: true },
  { position: 'International & Inter-African Relations Director', placeholder: true },
]

export default function LeadershipPage() {
  return (
    <>
      <SEOHead
        title="Our Leadership – AAYPL"
        description="Meet the leaders guiding AAYPL's continental mission. The Board of Trustees and Continental Executive Council are responsible for the governance and strategic direction of the organization."
        path="/leadership"
      />

      <PageHero
        label="Our Leadership"
        title="Meet the Leaders"
        subtitle="Meet the leaders guiding AAYPL's continental mission — dedicated to developing the next generation of African leadership."
        breadcrumbs={[{ label: 'Leadership' }]}
      />

      {/* Notice */}
      <div className="bg-gold-500/8 border-b border-gold-200">
        <div className="container-wide py-4">
          <div className="flex items-start gap-3">
            <Info size={16} className="text-gold-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-charcoal-700">
              <strong className="font-semibold">Note:</strong> Leadership profiles will be published following the organization's inaugural elections and appointment processes conducted in accordance with the AAYPL Constitution. Positions shown reflect the organizational structure as established by the Constitution.
            </p>
          </div>
        </div>
      </div>

      {/* Board of Trustees */}
      <section className="section-padding bg-white" aria-labelledby="trustees-heading">
        <div className="container-wide">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-12">
              <div className="flex-1">
                <SectionHeading
                  label="Governance"
                  title="Board of Trustees"
                  subtitle="The Board of Trustees provides institutional oversight, safeguards the AAYPL Constitution, and ensures accountability in the organization's highest governance matters."
                />
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {boardOfTrustees.map((leader, idx) => (
              <AnimatedSection key={`trustee-${idx}`} delay={idx * 50}>
                <LeadershipCard {...leader} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-charcoal-200 to-transparent" aria-hidden="true" />

      {/* Continental Executive Council */}
      <section className="section-padding bg-cream-100" aria-labelledby="executive-council-heading">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="Executive Leadership"
              title="Continental Executive Council"
              subtitle="The Continental Executive Council is responsible for the day-to-day management, programme delivery, and strategic execution of AAYPL's continental mandate."
            />
          </AnimatedSection>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {executiveCouncil.map((leader, idx) => (
              <AnimatedSection key={`exec-${idx}`} delay={idx * 40}>
                <LeadershipCard {...leader} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Committees note */}
      <section className="section-padding bg-white" aria-labelledby="committees-heading">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <SectionHeading
                label="Committees"
                title="Standing & Ad Hoc Committees"
                subtitle="AAYPL may establish standing committees and ad hoc committees to support its work in accordance with the Constitution."
                align="center"
              />
            </AnimatedSection>
            <AnimatedSection>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { title: 'Finance & Audit Committee', desc: 'Oversees financial management, budgeting, and audit processes.' },
                  { title: 'Membership & Elections Committee', desc: 'Manages membership applications, elections, and constitutional compliance.' },
                  { title: 'Programmes & Events Committee', desc: 'Coordinates AAYPL programmes, summits, and continental events.' },
                  { title: 'Discipline & Ethics Committee', desc: 'Handles disciplinary matters and upholds the organization\'s code of conduct.' },
                  { title: 'Media & Communications Committee', desc: 'Manages AAYPL\'s public communications, media relations, and digital presence.' },
                  { title: 'Partnership & International Relations Committee', desc: 'Develops and manages institutional partnerships and international cooperation.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="card p-5">
                    <div className="w-1 h-8 bg-gold-500 rounded-full mb-3" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-navy-900 text-sm mb-1.5">{title}</h3>
                    <p className="text-charcoal-500 text-xs leading-relaxed">{desc}</p>
                    <p className="mt-3 text-[10px] text-charcoal-300 italic">Membership to be announced</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-950" aria-labelledby="leadership-cta">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 id="leadership-cta" className="font-heading font-black text-white text-3xl lg:text-4xl mb-4">
              Interested in Leading AAYPL?
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              AAYPL's leadership positions are filled through democratic processes in accordance with the Constitution. Start by becoming a member.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/membership" className="btn-primary px-8 py-4">
                Apply for Membership
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/constitution" className="btn-outline-white px-8 py-4">
                Read the Constitution
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
