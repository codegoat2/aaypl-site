import { Link } from 'react-router-dom'
import {
  Star, Scale, Users, Heart, BookOpen, Network,
  ArrowRight, CheckCircle2, Target, Lightbulb, Globe, TrendingUp
} from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
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

const programmes = [
  {
    id: 'leadership-development',
    icon: <Star size={26} />,
    title: 'Leadership Development',
    tagline: 'Building the Skills of Tomorrow\'s African Leaders',
    description: 'AAYPL\'s Leadership Development Programme is the cornerstone of the organization\'s mission. Through structured training, mentorship, workshops, and seminars, we equip young African leaders with the practical skills, ethical frameworks, and personal capacities they need to lead effectively in public life.',
    activities: [
      'Leadership skills training and workshops',
      'One-on-one and group mentorship',
      'Leadership academies and retreats',
      'Public speaking and communication training',
      'Strategic thinking and governance seminars',
      'Cross-country peer learning exchanges',
    ],
    color: 'bg-navy-900',
    textColor: 'text-white',
    accentColor: 'bg-gold-500',
  },
  {
    id: 'democracy-governance',
    icon: <Scale size={26} />,
    title: 'Democracy & Governance',
    tagline: 'Strengthening the Foundations of Democratic Africa',
    description: 'This programme focuses on deepening young leaders\' understanding of and commitment to democratic values, constitutionalism, accountability, and civic participation. AAYPL believes that durable African development is only possible through genuine democratic governance.',
    activities: [
      'Democracy and constitutionalism seminars',
      'Electoral processes and integrity forums',
      'Parliamentary and legislative engagement',
      'Civic education programmes',
      'Governance reform dialogues',
      'Anti-corruption and accountability campaigns',
    ],
    color: 'bg-gold-500',
    textColor: 'text-white',
    accentColor: 'bg-navy-900',
  },
  {
    id: 'youth-empowerment',
    icon: <Users size={26} />,
    title: 'Youth Empowerment',
    tagline: 'Unlocking Africa\'s Most Powerful Resource',
    description: 'Africa\'s young people are the continent\'s greatest asset. AAYPL\'s Youth Empowerment Programme supports young Africans through entrepreneurship, education, innovation, employment, and economic empowerment initiatives that build lasting opportunity.',
    activities: [
      'Youth entrepreneurship and innovation hubs',
      'Skills development and vocational training',
      'Education access and scholarship advocacy',
      'Youth economic empowerment dialogues',
      'Technology and digital skills programmes',
      'Young women\'s leadership empowerment',
    ],
    color: 'bg-emerald-800',
    textColor: 'text-white',
    accentColor: 'bg-gold-500',
  },
  {
    id: 'peace-dialogue',
    icon: <Heart size={26} />,
    title: 'Peace & Dialogue',
    tagline: 'Choosing Dialogue Over Division',
    description: 'Political tolerance, peaceful coexistence, and constructive dialogue are essential to Africa\'s stability and progress. AAYPL\'s Peace & Dialogue Programme works to prevent political conflict, build inter-party and inter-ethnic understanding, and promote peaceful resolution of political differences.',
    activities: [
      'Inter-party youth dialogue forums',
      'Conflict prevention and early warning initiatives',
      'Peace education and political tolerance campaigns',
      'Post-conflict youth reconciliation programmes',
      'Cross-regional dialogue summits',
      'Mediation and negotiation skills training',
    ],
    color: 'bg-rose-800',
    textColor: 'text-white',
    accentColor: 'bg-gold-500',
  },
  {
    id: 'policy-research',
    icon: <BookOpen size={26} />,
    title: 'Policy & Research',
    tagline: 'Evidence-Based Leadership for Africa\'s Challenges',
    description: 'AAYPL produces research, publications, policy briefs, and civic education materials that inform better governance and leadership decisions across Africa. We believe young leaders must be equipped with knowledge, not just enthusiasm.',
    activities: [
      'Policy research and publications',
      'Continental leadership reports and surveys',
      'Civic education toolkits and curricula',
      'Youth governance policy advocacy',
      'Annual State of African Youth Leadership report',
      'Policy fellowships and research attachments',
    ],
    color: 'bg-indigo-900',
    textColor: 'text-white',
    accentColor: 'bg-gold-500',
  },
  {
    id: 'pan-african-networking',
    icon: <Network size={26} />,
    title: 'Pan-African Networking',
    tagline: 'One Africa, One Generation of Leaders',
    description: 'AAYPL\'s Pan-African Networking Programme connects young leaders across countries, regions, cultures, and professional backgrounds. Through continental summits, exchanges, and a shared platform, AAYPL builds the bonds of solidarity that Africa\'s next generation of leaders will need.',
    activities: [
      'Continental Leadership Summits',
      'Regional youth leadership exchanges',
      'Cross-country mentorship pairings',
      'Pan-African young leaders directory',
      'AAYPL continental alumni network',
      'Digital networking platforms and communities',
    ],
    color: 'bg-amber-800',
    textColor: 'text-white',
    accentColor: 'bg-navy-900',
  },
]

export default function ProgrammesPage() {
  return (
    <>
      <SEOHead
        title="Our Programmes – AAYPL"
        description="AAYPL's six flagship programme areas: Leadership Development, Democracy & Governance, Youth Empowerment, Peace & Dialogue, Policy & Research, and Pan-African Networking."
        path="/programmes"
      />

      <PageHero
        label="Our Programmes"
        title="What We Do"
        subtitle="Six flagship programme areas that deliver AAYPL's continental mission and develop Africa's next generation of leaders."
        breadcrumbs={[{ label: 'Programmes' }]}
      />

      {/* Programmes overview */}
      <section className="section-padding bg-white" aria-label="Programme overview">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="Programme Areas"
              title="Six Pillars of Our Work"
              subtitle="Each programme area targets a critical dimension of youth leadership and African development."
              align="center"
            />
          </AnimatedSection>

          {/* Programme cards grid summary */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {programmes.map(({ id, icon, title, color, textColor }, idx) => (
              <AnimatedSection key={id} delay={idx * 50}>
                <a
                  href={`#${id}`}
                  className={`group ${color} ${textColor} rounded-2xl p-4 flex flex-col items-center gap-3 text-center hover:scale-105 hover:shadow-lg transition-all duration-300`}
                  aria-label={`Jump to ${title} section`}
                >
                  <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                    {icon}
                  </div>
                  <span className="text-xs font-bold leading-snug">{title}</span>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Full programme sections */}
      {programmes.map((prog, idx) => (
        <section
          key={prog.id}
          id={prog.id}
          className={`section-padding ${idx % 2 === 0 ? 'bg-cream-100' : 'bg-white'}`}
          aria-labelledby={`prog-${prog.id}`}
        >
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <AnimatedSection className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${prog.color} ${prog.textColor} mb-5`}>
                  {prog.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3 block">
                  Programme {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 id={`prog-${prog.id}`} className="font-heading font-bold text-navy-900 text-3xl lg:text-4xl leading-tight mb-3">
                  {prog.title}
                </h2>
                <p className="text-gold-600 font-semibold text-base mb-5 italic">{prog.tagline}</p>
                <div className="w-12 h-0.5 bg-gold-500 mb-6" aria-hidden="true" />
                <p className="text-charcoal-600 text-base leading-relaxed mb-8">
                  {prog.description}
                </p>
                <Link to="/membership" className="btn-primary-navy">
                  Get Involved
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </AnimatedSection>

              {/* Activities */}
              <AnimatedSection delay={120} className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className="card p-6 lg:p-8">
                  <h3 className="font-heading font-bold text-navy-900 text-lg mb-5 flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-md ${prog.color} flex-shrink-0`} aria-hidden="true" />
                    Key Activities
                  </h3>
                  <ul className="space-y-3" role="list">
                    {prog.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-gold-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-charcoal-600 text-sm leading-relaxed">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Approach section */}
      <section className="section-padding bg-navy-950" aria-labelledby="our-approach">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="Our Approach"
              title="How We Work"
              subtitle="AAYPL's programmes are delivered through a combination of in-person gatherings, digital platforms, and peer-to-peer engagement."
              variant="light"
              align="center"
            />
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Target size={20} />, title: 'Targeted', desc: 'Programmes designed for the specific realities of African political and public leadership.' },
              { icon: <Users size={20} />, title: 'Inclusive', desc: 'Open to young Africans from all backgrounds, regions, and political persuasions.' },
              { icon: <Globe size={20} />, title: 'Continental', desc: 'Connecting leaders across all five African regions and 54 states.' },
              { icon: <TrendingUp size={20} />, title: 'Impact-Driven', desc: 'Measurable outcomes in leadership capacity and democratic participation.' },
            ].map(({ icon, title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 70}>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-400 mb-4">
                    {icon}
                  </div>
                  <h3 className="font-heading font-bold text-white text-sm mb-2">{title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="mt-12 text-center">
              <Link to="/membership" className="btn-primary px-8 py-4">
                Join & Participate
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
