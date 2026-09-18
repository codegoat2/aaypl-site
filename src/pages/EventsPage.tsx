import { useState } from 'react'
import { Calendar, Filter } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import EventCard from '../components/ui/EventCard'
import { useScrollAnimation } from '../lib/useScrollAnimation'

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const upcomingEvents = [
  {
    id: 'inaugural-summit-2026',
    title: 'AAYPL Inaugural Continental Leadership Summit',
    description: 'The inaugural gathering of young African political leaders to formally launch the organization, elect continental leadership, and adopt the strategic agenda for AAYPL\'s first term.',
    date: '2026-11-15',
    time: 'To be announced',
    location: 'To be announced',
    isOnline: false,
    category: 'Summit',
    registrationUrl: '/membership',
  },
  {
    id: 'founding-webinar',
    title: 'AAYPL Founding Members Virtual Orientation',
    description: 'A virtual orientation session for all founding members and applicants to learn about AAYPL\'s structure, programmes, and how to get involved.',
    date: '2026-10-01',
    time: 'To be announced',
    location: 'Online',
    isOnline: true,
    category: 'Orientation',
    registrationUrl: '/membership',
  },
]

const categories = ['All', 'Summit', 'Forum', 'Workshop', 'Webinar', 'Orientation', 'Conference']

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? upcomingEvents
    : upcomingEvents.filter(e => e.category === activeCategory)

  return (
    <>
      <SEOHead
        title="Events – AAYPL"
        description="Upcoming events, summits, forums, and workshops organized by the All Africa Young Political Leaders Organization. Join our continental gatherings."
        path="/events"
      />

      <PageHero
        label="Events"
        title="Gatherings & Summits"
        subtitle="AAYPL brings together young leaders from across the continent through summits, forums, workshops, and networking events."
        breadcrumbs={[{ label: 'Events' }]}
      />

      {/* Upcoming events */}
      <section className="section-padding bg-white" aria-labelledby="upcoming-events">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <AnimatedSection>
              <SectionHeading
                label="Coming Up"
                title="Upcoming Events"
              />
            </AnimatedSection>
            {/* Filter */}
            <AnimatedSection>
              <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter events by category">
                <Filter size={14} className="text-charcoal-400" aria-hidden="true" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                      activeCategory === cat
                        ? 'bg-navy-900 text-white'
                        : 'bg-cream-100 text-charcoal-600 hover:bg-navy-900/10'
                    }`}
                    aria-pressed={activeCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {filtered.length > 0 ? (
            <div className="space-y-5">
              {filtered.map((event, idx) => (
                <AnimatedSection key={event.id} delay={idx * 80}>
                  <EventCard {...event} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar size={40} className="text-charcoal-200 mx-auto mb-4" aria-hidden="true" />
              <p className="text-charcoal-400 text-base">No events in this category at the moment.</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-3 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
              >
                View all events
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Past events */}
      <section className="section-padding bg-cream-100" aria-labelledby="past-events">
        <div className="container-wide">
          <AnimatedSection>
            <SectionHeading
              label="History"
              title="Past Events"
              subtitle="AAYPL's record of continental gatherings and leadership events."
            />
          </AnimatedSection>
          <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-charcoal-100">
            <Calendar size={36} className="text-charcoal-200 mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">
              AAYPL is Getting Started
            </h3>
            <p className="text-charcoal-400 text-sm max-w-md mx-auto">
              As a newly established organization, AAYPL's event history will grow as we hold our inaugural summits and programmes. Past event records will appear here.
            </p>
          </div>
        </div>
      </section>

      {/* Host an event */}
      <section className="section-padding bg-navy-950" aria-labelledby="host-event">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 id="host-event" className="font-heading font-black text-white text-3xl lg:text-4xl mb-5">
              Partner to Host an AAYPL Event
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Organizations, governments, and institutions interested in co-hosting or supporting AAYPL events are welcome to reach out to the secretariat.
            </p>
            <a href="/contact" className="btn-primary px-8 py-4">
              Contact the Secretariat
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
