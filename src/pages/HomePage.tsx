import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Users, Globe, BookOpen, Scale, Shield, Heart,
  Lightbulb, HeartHandshake, Target, ChevronDown, Star, Zap,
  Network, Award, TrendingUp, MessageSquare
} from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import SectionHeading from '../components/ui/SectionHeading'
import ObjectiveCard from '../components/ui/ObjectiveCard'
import ProgrammeCard from '../components/ui/ProgrammeCard'
import LeadershipCard from '../components/ui/LeadershipCard'
import NewsCard from '../components/ui/NewsCard'
import EventCard from '../components/ui/EventCard'
import AfricaMap from '../components/sections/AfricaMap'
import { useScrollAnimation } from '../lib/useScrollAnimation'

// ──────────────────────────────── DATA ────────────────────────────────

const objectives = [
  { icon: <Star size={20} />, title: 'Promote Youth Leadership', description: 'Identify, nurture, and promote young African leaders who are committed to ethical and competent governance across the continent.' },
  { icon: <Scale size={20} />, title: 'Strengthen Democratic Values', description: 'Promote democracy, constitutionalism, rule of law, and respect for human rights as foundations of stable African governance.' },
  { icon: <Users size={20} />, title: 'Encourage Political Participation', description: 'Encourage constructive and peaceful youth participation in political and public life at all levels of governance.' },
  { icon: <Lightbulb size={20} />, title: 'Build Leadership Capacity', description: 'Develop the skills, knowledge, values, and networks of young leaders through training, mentorship, and dialogue programmes.' },
  { icon: <Globe size={20} />, title: 'Promote Unity Across Africa', description: 'Strengthen continental solidarity and cooperation among young African leaders across regional, national, and cultural boundaries.' },
  { icon: <Heart size={20} />, title: 'Support Inclusive Governance', description: 'Promote gender equality, inclusion of persons with disabilities, and representation of marginalised voices in leadership.' },
  { icon: <Shield size={20} />, title: 'Promote Peace & Tolerance', description: 'Encourage political tolerance, peaceful coexistence, conflict prevention, and peaceful resolution of political differences.' },
  { icon: <TrendingUp size={20} />, title: 'Encourage Socio-Economic Development', description: 'Contribute to Africa\'s sustainable social, economic, and technological development through informed youth leadership.' },
  { icon: <Network size={20} />, title: 'Pan-African Leadership Network', description: 'Build a continental network of young African political and public leaders committed to collective progress.' },
  { icon: <Award size={20} />, title: 'Promote Ethical Leadership', description: 'Champion integrity, accountability, transparency, and responsible leadership as essential standards for public service.' },
]

const principles = [
  { icon: <Shield size={16} />, title: 'Integrity' },
  { icon: <Target size={16} />, title: 'Accountability' },
  { icon: <BookOpen size={16} />, title: 'Transparency' },
  { icon: <Scale size={16} />, title: 'Democracy' },
  { icon: <Zap size={16} />, title: 'Rule of Law' },
  { icon: <Heart size={16} />, title: 'Peaceful Political Engagement' },
  { icon: <Globe size={16} />, title: 'African Unity' },
  { icon: <Users size={16} />, title: 'Inclusiveness' },
  { icon: <Scale size={16} />, title: 'Equality' },
  { icon: <Star size={16} />, title: 'Human Dignity' },
  { icon: <HeartHandshake size={16} />, title: 'Service' },
  { icon: <Award size={16} />, title: 'Responsible Leadership' },
  { icon: <Lightbulb size={16} />, title: 'Youth Empowerment' },
  { icon: <Target size={16} />, title: 'Professionalism' },
  { icon: <Heart size={16} />, title: 'Respect for Diversity' },
]

const programmes = [
  { icon: <Star size={20} />, title: 'Leadership Development', description: 'Structured training, mentorship, workshops, and seminars designed to sharpen the skills of young African leaders at all levels.', slug: 'leadership-development', color: 'navy' as const },
  { icon: <Scale size={20} />, title: 'Democracy & Governance', description: 'Dialogue and engagement on democracy, constitutionalism, accountability, and civic participation across Africa.', slug: 'democracy-governance', color: 'gold' as const },
  { icon: <Users size={20} />, title: 'Youth Empowerment', description: 'Supporting young people through entrepreneurship, education, innovation, and economic empowerment initiatives.', slug: 'youth-empowerment', color: 'default' as const },
  { icon: <Heart size={20} />, title: 'Peace & Dialogue', description: 'Facilitating political tolerance, conflict prevention, dialogue, and peaceful resolution of differences.', slug: 'peace-dialogue', color: 'default' as const },
  { icon: <BookOpen size={20} />, title: 'Policy & Research', description: 'Producing research, publications, policy discussions, and civic education to inform better governance decisions.', slug: 'policy-research', color: 'default' as const },
  { icon: <Network size={20} />, title: 'Pan-African Networking', description: 'Connecting young leaders across countries and regions to share ideas, resources, and collaborative opportunities.', slug: 'pan-african-networking', color: 'default' as const },
]

// Placeholder leadership previews
const leadershipPreviews = [
  { position: 'Chairman, Board of Trustees', placeholder: true },
  { position: 'President, Continental Executive Council', placeholder: true },
  { position: 'Secretary-General', placeholder: true },
  { position: 'Director-General', placeholder: true },
]

// Sample events (clearly labeled as demo/placeholder)
const upcomingEvents = [
  {
    id: 'inaugural-summit',
    title: 'AAYPL Inaugural Continental Leadership Summit',
    description: 'The inaugural gathering of young African political leaders for dialogue, networking, and the formal launch of the continental platform.',
    date: '2026-11-15',
    time: 'To be announced',
    location: 'To be announced',
    isOnline: false,
    category: 'Summit',
    registrationUrl: '/events',
  },
]

// Sample news (clearly labeled placeholder)
const latestNews = [
  {
    slug: 'aaypl-established',
    title: 'All Africa Young Political Leaders Organization Formally Established',
    excerpt: 'AAYPL is formally established as a continental non-governmental, non-partisan organization dedicated to developing young African leaders and promoting democratic governance across Africa.',
    category: 'News',
    date: '2026-01-01',
    imageUrl: '',
  },
  {
    slug: 'aaypl-constitution-adopted',
    title: 'AAYPL Constitution Adopted: A Foundation for Continental Leadership',
    excerpt: 'The organization adopts its founding constitution, establishing the governance framework, membership structure, and guiding principles for the All Africa Young Political Leaders Organization.',
    category: 'Governance',
    date: '2026-01-01',
    imageUrl: '',
  },
  {
    slug: 'call-for-founding-members',
    title: 'AAYPL Opens Applications for Founding Membership',
    excerpt: 'Young African political and public leaders are invited to apply as Founding Members of the newly established All Africa Young Political Leaders Organization.',
    category: 'Membership',
    date: '2026-01-01',
    imageUrl: '',
  },
]

// ──────────────────────────────── SECTIONS ────────────────────────────────

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
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

// ──────────────────────────────── HERO ────────────────────────────────

function Hero() {
  const scrollDown = () => {
    const next = document.getElementById('intro-section')
    next?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950"
      aria-label="Hero – Building Africa's Next Generation of Leaders"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover object-center opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/60 to-navy-950/85" />
      </div>

      {/* Geometric accent lines */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold-500/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 py-32 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" aria-hidden="true" />
          A Pan-African Youth Leadership Network
        </div>

        <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight max-w-5xl mx-auto mb-6 animate-slide-up">
          Building Africa's{' '}
          <span className="text-gradient-gold">Next Generation</span>{' '}
          of Leaders
        </h1>

        <p className="text-white/65 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-200">
          A platform for young African political and public leaders to connect, develop leadership capacity, promote democratic values, and contribute to Africa's sustainable future.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-300">
          <Link to="/membership" className="btn-primary text-sm px-8 py-4">
            Join AAYPL
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/about" className="btn-outline-white text-sm px-8 py-4">
            Discover Our Mission
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 divide-x divide-white/10 max-w-md mx-auto animate-fade-in animation-delay-500" aria-label="Key statistics">
          {[
            { value: '54', label: 'African Countries' },
            { value: 'Youth', label: 'Leadership Focus', isText: true },
            { value: 'Pan-African', label: 'Network', isText: true },
          ].map(({ value, label, isText }) => (
            <div key={label} className="px-6 text-center">
              <p className={`font-heading font-black text-white ${isText ? 'text-lg' : 'text-3xl'}`}>{value}</p>
              <p className="text-white/45 text-xs uppercase tracking-wider mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors duration-200 animate-bounce"
        aria-label="Scroll down to content"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
    </section>
  )
}

// ──────────────────────────────── INTRO ────────────────────────────────

function IntroSection() {
  return (
    <section id="intro-section" className="section-padding bg-white" aria-labelledby="intro-heading">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <AnimatedSection>
            <SectionHeading
              label="Who We Are"
              title={<>A New Generation of<br />African Leadership</>}
              subtitle="AAYPL brings together young leaders from different political, cultural, national, and professional backgrounds to encourage dialogue, leadership development, peaceful political participation, and cooperation across the African continent."
            />
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/about" className="btn-primary-navy">
                Learn About AAYPL
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link to="/membership" className="btn-outline">
                Become a Member
              </Link>
            </div>
          </AnimatedSection>

          {/* Right – stats + image */}
          <AnimatedSection delay={150}>
            <div className="relative">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-navy-900/5">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&auto=format&fit=crop"
                  alt="Diverse young African leaders in a leadership setting"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -left-6 right-6 grid grid-cols-3 gap-3">
                {[
                  { value: 54, suffix: '', label: 'African Countries', animated: true },
                  { value: 'Youth', suffix: '', label: 'Leadership Focus', animated: false },
                  { value: 'Pan-African', suffix: '', label: 'Network', animated: false },
                ].map(({ value, suffix, label, animated }) => (
                  <div key={label} className="bg-white rounded-xl shadow-card-hover p-4 text-center border border-charcoal-100">
                    <p className="font-heading font-black text-navy-900 text-xl leading-none">
                      {animated && typeof value === 'number' ? value : value}{suffix}
                    </p>
                    <p className="text-charcoal-400 text-[10px] uppercase tracking-wider mt-1 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── VISION / MISSION ────────────────────────────────

function VisionMissionSection() {
  return (
    <section className="section-padding bg-cream-100" aria-labelledby="vision-mission-heading">
      <div className="container-wide">
        <AnimatedSection>
          <SectionHeading
            label="Our Purpose"
            title="Vision & Mission"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision */}
          <AnimatedSection delay={100}>
            <div className="card p-8 lg:p-10 border-t-4 border-gold-500 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
                  <Star size={18} className="text-white" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-navy-900 text-xl">Our Vision</h3>
              </div>
              <blockquote className="text-charcoal-700 text-base lg:text-lg leading-relaxed italic border-l-2 border-gold-300 pl-5">
                "To build a generation of ethical, competent, visionary, and responsible young African leaders committed to peace, democracy, good governance, development, and African unity."
              </blockquote>
            </div>
          </AnimatedSection>

          {/* Mission */}
          <AnimatedSection delay={200}>
            <div className="card p-8 lg:p-10 border-t-4 border-navy-900 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center">
                  <Target size={18} className="text-white" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-navy-900 text-xl">Our Mission</h3>
              </div>
              <blockquote className="text-charcoal-700 text-base lg:text-lg leading-relaxed italic border-l-2 border-navy-900/20 pl-5">
                "To provide a platform through which young political leaders can develop leadership capacity, exchange ideas, participate constructively in public affairs, and contribute to the sustainable development of Africa."
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── OBJECTIVES ────────────────────────────────

function ObjectivesSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="objectives-heading">
      <div className="container-wide">
        <AnimatedSection>
          <SectionHeading
            label="Our Commitment"
            title="What We Stand For"
            subtitle="AAYPL is driven by ten core objectives that define our work across Africa."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" role="list">
          {objectives.map((obj, idx) => (
            <AnimatedSection key={obj.title} delay={idx * 40}>
              <div role="listitem">
                <ObjectiveCard
                  icon={obj.icon}
                  number={String(idx + 1).padStart(2, '0')}
                  title={obj.title}
                  description={obj.description}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── PRINCIPLES ────────────────────────────────

function PrinciplesSection() {
  return (
    <section className="section-padding bg-navy-950" aria-labelledby="principles-heading">
      <div className="container-wide">
        <AnimatedSection>
          <SectionHeading
            label="Our Values"
            title="Our Principles"
            subtitle="AAYPL operates by a set of principles that guide every aspect of our work and the conduct of our members."
            variant="light"
            align="center"
          />
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" role="list">
          {principles.map((p, idx) => (
            <AnimatedSection key={p.title} delay={idx * 30}>
              <div role="listitem">
                <div className="group flex items-center gap-2.5 p-3.5 rounded-xl bg-white/5 hover:bg-gold-500/15 border border-white/8 hover:border-gold-500/30 transition-all duration-200">
                  <div className="w-7 h-7 rounded-lg bg-gold-500/15 group-hover:bg-gold-500/25 flex items-center justify-center text-gold-400 flex-shrink-0 transition-colors duration-200">
                    {p.icon}
                  </div>
                  <span className="text-white/80 group-hover:text-white text-xs font-semibold transition-colors duration-200">
                    {p.title}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── PROGRAMMES ────────────────────────────────

function ProgrammesSection() {
  return (
    <section className="section-padding bg-cream-100" aria-labelledby="programmes-heading">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <AnimatedSection>
            <SectionHeading
              label="What We Do"
              title="Our Programmes"
              subtitle="Six flagship programme areas that drive AAYPL's continental mission."
            />
          </AnimatedSection>
          <AnimatedSection>
            <Link to="/programmes" className="btn-outline flex-shrink-0">
              View All Programmes
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {programmes.map((prog, idx) => (
            <AnimatedSection key={prog.slug} delay={idx * 60}>
              <div role="listitem">
                <ProgrammeCard {...prog} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── AFRICA MAP ────────────────────────────────

function AfricaSection() {
  return (
    <section className="section-padding bg-white overflow-hidden" aria-labelledby="africa-section-heading">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <SectionHeading
              label="Continental Presence"
              title={<>Connecting Young Leaders <span className="text-gold-600">Across Africa</span></>}
              subtitle="AAYPL operates across all 54 recognised African states, with a continental mandate to nurture, connect, and empower young leaders in every region of Africa."
            />
            <div className="mt-8 space-y-4">
              {[
                { region: 'North Africa', countries: '6 Countries' },
                { region: 'West Africa', countries: '15 Countries' },
                { region: 'East Africa', countries: '14 Countries' },
                { region: 'Central Africa', countries: '11 Countries' },
                { region: 'Southern Africa', countries: '8 Countries' },
              ].map(({ region, countries }) => (
                <div key={region} className="flex items-center justify-between py-2.5 border-b border-charcoal-100 last:border-0">
                  <span className="text-sm font-semibold text-navy-900">{region}</span>
                  <span className="text-xs text-charcoal-400 font-medium">{countries}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/about#structure" className="btn-primary-navy">
                Our Regional Structure
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <AfricaMap />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── LEADERSHIP PREVIEW ────────────────────────────────

function LeadershipSection() {
  return (
    <section className="section-padding bg-cream-100" aria-labelledby="leadership-preview-heading">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <AnimatedSection>
            <SectionHeading
              label="Our Leaders"
              title="Continental Leadership"
              subtitle="AAYPL is guided by a dedicated continental executive structure committed to the organization's mission."
            />
          </AnimatedSection>
          <AnimatedSection>
            <Link to="/leadership" className="btn-outline flex-shrink-0">
              Meet Our Leadership
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipPreviews.map((leader, idx) => (
            <AnimatedSection key={leader.position} delay={idx * 70}>
              <LeadershipCard {...leader} />
            </AnimatedSection>
          ))}
        </div>
        <p className="mt-6 text-xs text-charcoal-400 text-center italic">
          Leadership profiles will be updated following the organization's inaugural elections and appointment processes.
        </p>
      </div>
    </section>
  )
}

// ──────────────────────────────── EVENTS ────────────────────────────────

function EventsSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="events-section-heading">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <AnimatedSection>
            <SectionHeading
              label="Upcoming Events"
              title="Gatherings & Summits"
              subtitle="Join AAYPL events bringing together young leaders from across the continent."
            />
          </AnimatedSection>
          <AnimatedSection>
            <Link to="/events" className="btn-outline flex-shrink-0">
              View All Events
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((event, idx) => (
            <AnimatedSection key={event.id} delay={idx * 80}>
              <EventCard {...event} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── NEWS ────────────────────────────────

function NewsSection() {
  return (
    <section className="section-padding bg-cream-100" aria-labelledby="news-section-heading">
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <AnimatedSection>
            <SectionHeading
              label="Latest Updates"
              title="News & Insights"
              subtitle="Stay informed on AAYPL's activities, leadership insights, and continental developments."
            />
          </AnimatedSection>
          <AnimatedSection>
            <Link to="/news" className="btn-outline flex-shrink-0">
              All News & Insights
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article, idx) => (
            <AnimatedSection key={article.slug} delay={idx * 80}>
              <NewsCard {...article} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── MEMBERSHIP CTA ────────────────────────────────

function MembershipCTA() {
  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden" aria-labelledby="membership-cta-heading">
      {/* Background accent */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <span className="section-label text-gold-300 justify-center">
              <span className="w-6 h-px bg-current inline-block" aria-hidden="true" />
              Join the Movement
            </span>
            <h2 id="membership-cta-heading" className="font-heading font-black text-white text-3xl lg:text-5xl leading-tight tracking-tight mt-4 mb-6">
              Become Part of Africa's{' '}
              <span className="text-gradient-gold">Next Generation</span>{' '}
              of Leadership
            </h2>
            <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-10">
              AAYPL welcomes young Africans committed to ethical leadership, democratic governance, and the sustainable development of Africa. If you share our values, we invite you to become part of this continental movement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/membership" className="btn-primary px-8 py-4">
                Apply for Membership
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/constitution" className="btn-outline-white px-8 py-4">
                Read Our Constitution
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── PARTNERSHIP CTA ────────────────────────────────

function PartnershipCTA() {
  return (
    <section className="section-padding-sm bg-cream-100" aria-labelledby="partnership-cta-heading">
      <div className="container-wide">
        <div className="card p-8 lg:p-12 bg-white grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="section-label text-gold-600">
              <span className="w-6 h-px bg-current inline-block" aria-hidden="true" />
              Partnerships
            </span>
            <h2 id="partnership-cta-heading" className="font-heading font-bold text-navy-900 text-2xl lg:text-3xl mt-3 mb-4">
              Partner With AAYPL
            </h2>
            <p className="text-charcoal-500 text-sm leading-relaxed">
              We collaborate with governments, civil society organizations, universities, international organizations, and private sector institutions who share our commitment to youth leadership and African development.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link to="/partnerships" className="btn-primary">
              Explore Partnership
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── CONTACT CTA ────────────────────────────────

function ContactCTA() {
  return (
    <section className="section-padding-sm bg-white" aria-labelledby="contact-cta-heading">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { icon: <MessageSquare size={22} />, title: 'Contact Us', desc: 'Reach out to the AAYPL secretariat for inquiries, partnerships, and media requests.', cta: 'Send a Message', href: '/contact' },
            { icon: <Users size={22} />, title: 'Join AAYPL', desc: 'Apply for membership and become part of the pan-African youth leadership movement.', cta: 'Apply Now', href: '/membership' },
            { icon: <BookOpen size={22} />, title: 'Our Constitution', desc: 'Read the AAYPL founding constitution — the supreme document governing the organization.', cta: 'Read Constitution', href: '/constitution' },
          ].map(({ icon, title, desc, cta, href }, idx) => (
            <AnimatedSection key={title} delay={idx * 80}>
              <div className="card p-6 text-center hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-navy-900/5 flex items-center justify-center text-navy-900 mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">{title}</h3>
                <p className="text-charcoal-500 text-sm leading-relaxed mb-5">{desc}</p>
                <Link to={href} className="btn-outline-gold text-xs py-2.5 px-5">
                  {cta}
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────── PAGE ────────────────────────────────

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="AAYPL – All Africa Young Political Leaders Organization"
        description="All Africa Young Political Leaders Organization (AAYPL) – A pan-African platform for young leaders to develop leadership capacity, promote democracy, and contribute to Africa's sustainable future. Unity, Leadership, Integrity and Service."
        path="/"
      />
      <Hero />
      <IntroSection />
      <VisionMissionSection />
      <ObjectivesSection />
      <PrinciplesSection />
      <AfricaSection />
      <ProgrammesSection />
      <LeadershipSection />
      <EventsSection />
      <NewsSection />
      <MembershipCTA />
      <PartnershipCTA />
      <ContactCTA />
    </>
  )
}
