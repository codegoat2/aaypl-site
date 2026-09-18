import { useState } from 'react'
import { Search } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import NewsCard from '../components/ui/NewsCard'
import { newsArticles, newsCategories } from '../data/news'
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

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = newsArticles.filter(article => {
    const matchCategory = activeCategory === 'All' || article.category === activeCategory
    const matchSearch = !search.trim() ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      <SEOHead
        title="News & Insights – AAYPL"
        description="Stay informed on AAYPL's activities, announcements, leadership insights, and developments across the African continent."
        path="/news"
      />

      <PageHero
        label="News & Insights"
        title="Updates from AAYPL"
        subtitle="Stay informed on our activities, announcements, and perspectives on youth leadership and governance in Africa."
        breadcrumbs={[{ label: 'News & Insights' }]}
      />

      <section className="section-padding bg-white" aria-labelledby="news-content">
        <div className="container-wide">
          {/* Search & Categories */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search articles..."
                className="form-input pl-9 text-sm"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search news articles"
              />
            </div>

            {/* Category filters */}
            <div
              className="flex items-center gap-2 flex-wrap"
              role="group"
              aria-label="Filter by category"
            >
              {newsCategories.slice(0, 8).map(cat => (
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
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal-400 text-base">No articles found matching your criteria.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearch('') }}
                className="mt-3 text-sm font-semibold text-navy-900 hover:text-gold-600 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && !search && activeCategory === 'All' && (
                <AnimatedSection>
                  <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-px flex-1 bg-charcoal-100" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-600">Featured</span>
                      <div className="h-px flex-1 bg-charcoal-100" aria-hidden="true" />
                    </div>
                    <NewsCard {...featured} featured />
                  </div>
                </AnimatedSection>
              )}

              {/* Article grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(search || activeCategory !== 'All' ? filtered : rest).map((article, idx) => (
                  <AnimatedSection key={article.slug} delay={idx * 60}>
                    <NewsCard {...article} />
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
