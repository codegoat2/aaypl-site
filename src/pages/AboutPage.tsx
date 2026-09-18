import { Link } from 'react-router-dom'
import {
  ArrowRight, Shield, Scale, Users, Globe, Heart, Lightbulb,
  Target, Award, Zap, HeartHandshake, BookOpen, Star, Network,
  TrendingUp, TreePine, ChevronRight
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

const objectives = [
  { icon: <Star size={18} />, title: 'Promote Youth Leadership', description: 'Identify, nurture, and promote young African leaders committed to ethical and competent governance.' },
  { icon: <Scale size={18} />, title: 'Strengthen Democratic Values', description: 'Promote democracy, constitutionalism, rule of law, and respect for human rights across Africa.' },
  { icon: <Users size={18} />, title: 'Encourage Political Participation', description: 'Encourage constructive and peaceful youth participation in political and public life.' },
  { icon: <Lightbulb size={18} />, title: 'Build Leadership Capacity', description: 'Develop skills, knowledge, values, and networks of young leaders through training and mentorship.' },
  { icon: <Globe size={18} />, title: 'Promote Unity Across Africa', description: 'Strengthen continental solidarity among young African leaders across all boundaries.' },
  { icon: <Heart size={18} />, title: 'Support Inclusive Governance', description: 'Promote gender equality, inclusion, and representation of marginalised voices in leadership.' },
  { icon: <Shield size={18} />, title: 'Promote Peace & Tolerance', description: 'Encourage political tolerance, conflict prevention, and peaceful resolution of differences.' },
  { icon: <TrendingUp size={18} />, title: 'Encourage Socio-Economic Development', description: 'Contribute to Africa\'s sustainable development through informed youth leadership.' },
  { icon: <Network size={18} />, title: 'Pan-African Leadership Network', description: 'Build a continental network of young African political and public leaders.' },
  { icon: <Award size={18} />, title: 'Promote Ethical Leadership', description: 'Champion integrity, accountability, transparency, and responsible leadership.' },
]

const principles = [
  { icon: <Shield size={16} />, title: 'Integrity', desc: 'Unwavering commitment to honesty and moral uprightness in all aspects of leadership.' },
  { icon: <Target size={16} />, title: 'Accountability', desc: 'Responsibility to members, the public, and the African continent for all decisions and actions.' },
  { icon: <BookOpen size={16} />, title: 'Transparency', desc: 'Open and clear communication in all organizational processes and decision-making.' },
  { icon: <Scale size={16} />, title: 'Democracy', desc: 'Respect for democratic principles in the governance of AAYPL and in public life.' },
  { icon: <Zap size={16} />, title: 'Rule of Law', desc: 'Respect for the law, constitutional order, and established legal processes.' },
  { icon: <Heart size={16} />, title: 'Peaceful Political Engagement', desc: 'Commitment to peaceful dialogue and non-violent participation in political processes.' },
  { icon: <Globe size={16} />, title: 'African Unity', desc: 'Dedication to continental solidarity and the ideals of pan-Africanism.' },
  { icon: <Users size={16} />, title: 'Inclusiveness', desc: 'Ensuring that all Africans, regardless of background, can participate in leadership.' },
  { icon: <Scale size={16} />, title: 'Equality', desc: 'Equal rights, equal treatment, and equal opportunity for all members and all Africans.' },
  { icon: <Star size={16} />, title: 'Human Dignity', desc: 'Respect for the inherent dignity and worth of every human being.' },
  { icon: <HeartHandshake size={16} />, title: 'Service', desc: 'A genuine commitment to serving the African people and the public good.' },
  { icon: <Award size={16} />, title: 'Responsible Leadership', desc: 'Leadership exercised with care, competence, and a long-term view of impact.' },
  { icon: <Lightbulb size={16} />, title: 'Youth Empowerment', desc: 'Prioritising the development and empowerment of young Africans.' },
  { icon: <Target size={16} />, title: 'Professionalism', desc: 'Maintaining high standards of conduct, competence, and organisational excellence.' },
  { icon: <Heart size={16} />, title: 'Respect for Diversity', desc: 'Celebrating and respecting Africa\'s rich diversity of peoples, cultures, and perspectives.' },
]

const structureLevels = [
  { level: 'Continental', desc: 'The Board of Trustees and Continental Executive Council provide overall direction, governance and accountability at the continental level.', icon: <Globe size={20} /> },
  { level: 'Regional Councils', desc: 'Five regional councils covering North, West, East, Central, and Southern Africa coordinate activities across each region.', icon: <Network size={20} /> },
  { level: 'National Chapters', desc: 'National chapters in each member country implement AAYPL\'s programmes and represent the organisation at the national level.', icon: <TreePine size={20} /> },
  { level: 'State / Provincial Chapters', desc: 'State and provincial chapters bring AAYPL\'s work to subnational levels of government and public life.', icon: <Target size={20} /> },
  { level: 'Local / Community Chapters', desc: 'Local chapters ensure AAYPL\'s presence and impact reaches communities across the continent.', icon: <Heart size={20} /> },
]

const membershipCategories = [
  { title: 'Founding Members', desc: 'Young Africans who join AAYPL during the founding period and fulfil the qualifying criteria under the constitution.' },
  { title: 'Ordinary Members', desc: 'Young Africans who join the organisation after its establishment and meet the applicable membership criteria.' },
  { title: 'Associate Members', desc: 'Individuals who support AAYPL\'s mission and values but do not qualify for ordinary membership.' },
  { title: 'Honorary Members', desc: 'Distinguished individuals conferred honorary membership in recognition of exceptional contributions to AAYPL\'s mission or African leadership.' },
  { title: 'Institutional / Partner Members', desc: 'Organisations, institutions, and bodies that partner with AAYPL and are admitted as institutional members in accordance with the constitution.' },
]

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About AAYPL – All Africa Young Political Leaders Organization"
        description="Learn about AAYPL's vision, mission, objectives, principles, and why it exists. AAYPL is a non-governmental, non-partisan pan-African organization dedicated to developing young African leaders."
        path="/about"
      />

      <PageHero
        label="About AAYPL"
        title="Who We Are"
        subtitle="A continental platform for young African political and public leaders to develop, connect, and contribute to Africa's future."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Who We Are */}
      <section className="section-padding bg-white" aria-labelledby="who-we-are">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <SectionHeading
                label="Our Identity"
                title={<>The All Africa Young Political Leaders Organization</>}
              />
              <div className="mt-6 space-y-4 text-charcoal-600 text-base leading-relaxed">
                <p>
                  The All Africa Young Political Leaders Organization (AAYPL) is a continental, non-governmental, and non-partisan organization established to develop, connect, and empower young African leaders committed to democratic governance, peace, and sustainable development.
                </p>
                <p>
                  AAYPL operates across all 54 recognized African states, bringing together young leaders from diverse political, cultural, national, and professional backgrounds in a spirit of unity, mutual respect, and shared purpose.
                </p>
                <p>
                  The organization is guided by its motto: <strong className="text-navy-900 font-semibold">"Unity, Leadership, Integrity and Service."</strong>
                </p>
              </div>
              <div className="mt-8">
                <Link to="/constitution" className="btn-primary-navy">
                  Read Our Constitution
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="space-y-5">
                {[
                  { label: 'Nature', value: 'Non-Governmental, Non-Partisan' },
                  { label: 'Mandate', value: 'Continental — All 54 African States' },
                  { label: 'Focus', value: 'Youth Political & Public Leadership' },
                  { label: 'Motto', value: 'Unity, Leadership, Integrity and Service' },
                  { label: 'Headquarters', value: 'To be provided' },
                  { label: 'Official Website', value: 'aaypl.site' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-cream-100 border border-cream-200">
                    <ChevronRight size={16} className="text-gold-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">{label}</span>
                      <p className="text-navy-900 font-semibold text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why AAYPL Exists */}
      <section className="section-padding bg-cream-100" aria-labelledby="why-aaypl">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <SectionHeading
                label="Our Rationale"
                title="Why AAYPL Exists"
                align="center"
              />
            </AnimatedSection>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Users size={22} />,
                  title: 'A Youth Leadership Gap',
                  desc: 'Africa\'s future depends on a new generation of ethical, capable, and committed leaders. AAYPL exists to identify, develop, and connect that generation.',
                },
                {
                  icon: <Scale size={22} />,
                  title: 'Deepening Democracy',
                  desc: 'Democratic governance requires informed, skilled, and principled young leaders who understand constitutionalism, accountability, and the rule of law.',
                },
                {
                  icon: <Globe size={22} />,
                  title: 'Continental Unity',
                  desc: 'Africa\'s challenges — from conflict to underdevelopment — require collective solutions. AAYPL builds the networks and solidarity that make continental cooperation possible.',
                },
              ].map(({ icon, title, desc }, idx) => (
                <AnimatedSection key={title} delay={idx * 80}>
                  <div className="card p-6 h-full">
                    <div className="w-11 h-11 rounded-xl bg-navy-900 flex items-center justify-center text-white mb-4">
                      {icon}
                    </div>
                    <h3 className="font-heading font-bold text-navy-900 text-base mb-2">{title}</h3>
                    <p className="text-charcoal-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="section-padding bg-white" aria-labelledby="vision-mission-heading">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading label="Our Purpose" title="Vision & Mission" align="center" />
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection delay={80}>
              <div className="card p-8 lg:p-10 border-t-4 border-gold-500 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
                    <Star size={18} className="text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-bold text-navy-900 text-xl">Our Vision</h3>
                </div>
                <blockquote className="text-charcoal-700 text-base lg:text-lg leading-relaxed italic border-l-2 border-gold-300 pl-5 mb-6">
                  "To build a generation of ethical, competent, visionary, and responsible young African leaders committed to peace, democracy, good governance, development, and African unity."
                </blockquote>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="card p-8 lg:p-10 border-t-4 border-navy-900 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center">
                    <Target size={18} className="text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-bold text-navy-900 text-xl">Our Mission</h3>
                </div>
                <blockquote className="text-charcoal-700 text-base lg:text-lg leading-relaxed italic border-l-2 border-navy-900/20 pl-5 mb-6">
                  "To provide a platform through which young political leaders can develop leadership capacity, exchange ideas, participate constructively in public affairs, and contribute to the sustainable development of Africa."
                </blockquote>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section id="objectives" className="section-padding bg-cream-100" aria-labelledby="objectives-heading">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="Our Commitment"
              title="Core Objectives"
              subtitle="Ten strategic objectives that define AAYPL's work and direction across Africa."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {objectives.map((obj, idx) => (
              <AnimatedSection key={obj.title} delay={idx * 40}>
                <div className="card p-5 h-full hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl bg-navy-900/8 flex items-center justify-center text-navy-900 mb-3">
                    {obj.icon}
                  </div>
                  <span className="text-[10px] font-black text-gold-500 uppercase tracking-widest">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading font-bold text-navy-900 text-sm mt-1 mb-2">{obj.title}</h3>
                  <p className="text-charcoal-500 text-xs leading-relaxed">{obj.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="section-padding bg-navy-950" aria-labelledby="principles-heading">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="Our Values"
              title="Our Principles"
              subtitle="Fifteen guiding principles that shape AAYPL's culture, conduct, and character."
              variant="light"
              align="center"
            />
          </AnimatedSection>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((p, idx) => (
              <AnimatedSection key={p.title} delay={idx * 35}>
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 hover:bg-gold-500/10 border border-white/8 hover:border-gold-500/25 transition-all duration-200">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 group-hover:bg-gold-500/25 flex items-center justify-center text-gold-400 flex-shrink-0 transition-colors duration-200">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-sm mb-1">{p.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Structure */}
      <section id="structure" className="section-padding bg-white" aria-labelledby="structure-heading">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="Our Architecture"
              title="Continental Structure"
              subtitle="AAYPL operates through a five-tier structure designed to ensure effective governance and continental reach."
              align="center"
            />
          </AnimatedSection>
          <div className="mt-14 max-w-3xl mx-auto">
            {structureLevels.map((level, idx) => (
              <AnimatedSection key={level.level} delay={idx * 80}>
                <div className="relative flex gap-6 pb-8 last:pb-0">
                  {/* Connector line */}
                  {idx < structureLevels.length - 1 && (
                    <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-gold-400/40 to-transparent" aria-hidden="true" />
                  )}
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white shadow-sm z-10">
                    {level.icon}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-heading font-bold text-navy-900 text-lg mb-1.5">{level.level}</h3>
                    <p className="text-charcoal-500 text-sm leading-relaxed">{level.desc}</p>
                    {idx < structureLevels.length - 1 && (
                      <div className="mt-3 text-xs text-gold-500 font-bold flex items-center gap-1" aria-hidden="true">
                        <span>↓</span>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="mt-10 max-w-3xl mx-auto p-5 rounded-2xl bg-cream-100 border border-cream-200">
              <p className="text-xs text-charcoal-500 leading-relaxed">
                <strong className="text-charcoal-700">Note:</strong> Chapters are established subject to the organization's constitutional procedures and applicable local law. The existence of a chapter is confirmed only upon formal establishment in accordance with the AAYPL Constitution. Do not assume that a chapter exists in any country unless formally announced by AAYPL.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Membership Overview */}
      <section className="section-padding bg-cream-100" aria-labelledby="membership-overview-heading">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <SectionHeading
                label="Membership"
                title="Who Can Join AAYPL"
                subtitle="AAYPL membership is open to young Africans committed to the organization's mission, values, and constitution."
              />
              <div className="mt-8">
                <Link to="/membership" className="btn-primary">
                  Apply for Membership
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="space-y-4">
                {membershipCategories.map(({ title, desc }, idx) => (
                  <div key={title} className="flex items-start gap-4 p-4 card">
                    <div className="w-7 h-7 rounded-lg bg-gold-500/15 flex items-center justify-center flex-shrink-0 text-gold-600 font-black text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-navy-900 text-sm mb-1">{title}</h4>
                      <p className="text-charcoal-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Partnerships overview */}
      <section className="section-padding bg-white" aria-labelledby="partnerships-overview">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <SectionHeading
                label="Partnerships"
                title="Collaborative Approach"
                subtitle="AAYPL believes in the power of partnerships to amplify its impact across the continent."
                align="center"
              />
            </AnimatedSection>
            <AnimatedSection>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
                {[
                  'Governments & Public Institutions',
                  'Civil Society Organizations',
                  'Youth Organizations',
                  'Universities & Research Institutions',
                  'International & Regional Bodies',
                  'Private Sector Partners',
                  'Development Partners',
                  'Political Institutions',
                ].map((partner) => (
                  <div key={partner} className="flex items-start gap-2 p-3 rounded-xl bg-cream-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs text-charcoal-700 font-medium leading-snug">{partner}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/partnerships" className="btn-outline">
                  Partner With AAYPL
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-950" aria-labelledby="about-cta">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 id="about-cta" className="font-heading font-black text-white text-3xl lg:text-4xl mb-5">
              Ready to be Part of This Movement?
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Whether you want to join as a member, partner with us, or simply learn more — we welcome your engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/membership" className="btn-primary px-8 py-4">
                Join AAYPL
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/leadership" className="btn-outline-white px-8 py-4">
                Meet Our Leadership
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
