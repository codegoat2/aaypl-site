import { useState, useRef } from 'react'
import { Search, ChevronDown, ChevronRight, Download, BookOpen, List } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import PageHero from '../components/ui/PageHero'
import { constitutionArticles } from '../data/constitution'

export default function ConstitutionPage() {
  const [activeArticle, setActiveArticle] = useState<number>(1)
  const [search, setSearch] = useState('')
  const [expandedArticles, setExpandedArticles] = useState<Set<number>>(new Set([1]))
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const mainRef = useRef<HTMLElement>(null)

  const filteredArticles = search.trim()
    ? constitutionArticles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.sections.some(s => s.text.toLowerCase().includes(search.toLowerCase()))
      )
    : constitutionArticles

  const toggleArticle = (num: number) => {
    setExpandedArticles(prev => {
      const next = new Set(prev)
      if (next.has(num)) next.delete(num)
      else next.add(num)
      return next
    })
  }

  const scrollToArticle = (num: number) => {
    setActiveArticle(num)
    if (!expandedArticles.has(num)) {
      setExpandedArticles(prev => new Set([...prev, num]))
    }
    setTimeout(() => {
      const el = document.getElementById(`article-${num}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const highlightText = (text: string) => {
    if (!search.trim()) return text
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark class="bg-gold-200 text-gold-900 rounded px-0.5">$1</mark>')
  }

  return (
    <>
      <SEOHead
        title="AAYPL Constitution – All Africa Young Political Leaders Organization"
        description="Read the full AAYPL Constitution — the supreme governing document of the All Africa Young Political Leaders Organization. All 26 articles covering vision, mission, membership, governance, elections, and more."
        path="/constitution"
      />

      <PageHero
        label="Our Constitution"
        title="The AAYPL Constitution"
        subtitle="The supreme governing document of the All Africa Young Political Leaders Organization."
        breadcrumbs={[{ label: 'Constitution' }]}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#constitution-content"
            className="btn-primary px-6 py-3"
            onClick={(e) => { e.preventDefault(); document.getElementById('constitution-content')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <BookOpen size={15} aria-hidden="true" />
            Read the Constitution
          </a>
          <span className="btn-outline-white px-6 py-3 opacity-60 cursor-not-allowed" aria-disabled="true">
            <Download size={15} aria-hidden="true" />
            Download PDF (Coming Soon)
          </span>
        </div>
      </PageHero>

      {/* Preamble note */}
      <div className="bg-cream-100 border-b border-cream-200">
        <div className="container-wide py-6">
          <div className="flex items-start gap-3">
            <BookOpen size={16} className="text-navy-900 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-charcoal-700 leading-relaxed">
              <strong className="font-semibold">Note:</strong> This Constitution is the authoritative governing document of AAYPL. It was adopted by the founding members as the supreme document governing the organization, its members, organs, and operations. Where website content summarises provisions of this Constitution, the Constitution itself remains the authoritative text.
            </p>
          </div>
        </div>
      </div>

      {/* Constitution reader */}
      <div id="constitution-content" className="bg-white">
        <div className="container-wide py-10">
          {/* Mobile sidebar toggle */}
          <button
            className="lg:hidden w-full flex items-center justify-between p-4 mb-4 rounded-xl border border-charcoal-200 bg-cream-100 text-sm font-semibold text-navy-900"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-expanded={sidebarOpen}
            aria-controls="constitution-sidebar"
          >
            <span className="flex items-center gap-2"><List size={16} aria-hidden="true" /> Table of Contents</span>
            <ChevronDown size={16} className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside
              id="constitution-sidebar"
              className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}
              aria-label="Constitution table of contents"
            >
              <div className="sticky top-24">
                {/* Search */}
                <div className="relative mb-4">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Search constitution..."
                    className="form-input pl-9 text-xs py-2.5"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    aria-label="Search the AAYPL Constitution"
                  />
                </div>

                {/* Article list */}
                <nav aria-label="Constitution articles">
                  <ul className="space-y-0.5 max-h-[calc(100vh-200px)] overflow-y-auto" role="list">
                    {filteredArticles.map(article => (
                      <li key={article.number}>
                        <button
                          onClick={() => scrollToArticle(article.number)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all duration-150 ${
                            activeArticle === article.number
                              ? 'bg-navy-900 text-white font-semibold'
                              : 'text-charcoal-600 hover:bg-cream-100 hover:text-navy-900'
                          }`}
                          aria-current={activeArticle === article.number ? 'true' : undefined}
                        >
                          <span className="font-black text-gold-500 mr-1.5">
                            Art. {article.number}
                          </span>
                          {article.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {search && filteredArticles.length === 0 && (
                  <p className="text-xs text-charcoal-400 mt-4 text-center italic">No results found for "{search}"</p>
                )}
              </div>
            </aside>

            {/* Main content */}
            <main ref={mainRef} className="flex-1 min-w-0" aria-label="Constitution articles">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-charcoal-400 text-base">No articles match your search.</p>
                  <button
                    onClick={() => setSearch('')}
                    className="mt-3 text-sm text-navy-900 font-semibold hover:text-gold-600 transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredArticles.map(article => (
                    <article
                      key={article.number}
                      id={`article-${article.number}`}
                      className="border border-charcoal-100 rounded-2xl overflow-hidden"
                    >
                      {/* Article header */}
                      <button
                        className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left bg-white hover:bg-cream-50 transition-colors duration-150"
                        onClick={() => toggleArticle(article.number)}
                        aria-expanded={expandedArticles.has(article.number)}
                        aria-controls={`article-${article.number}-content`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center">
                            <span className="text-gold-400 text-xs font-black">{article.number}</span>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600 mb-0.5">
                              Article {article.number}
                            </p>
                            <h2
                              className="font-heading font-bold text-navy-900 text-base leading-snug"
                              dangerouslySetInnerHTML={{ __html: highlightText(article.title) }}
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedArticles.has(article.number)
                            ? <ChevronDown size={18} className="text-charcoal-400" aria-hidden="true" />
                            : <ChevronRight size={18} className="text-charcoal-400" aria-hidden="true" />
                          }
                        </div>
                      </button>

                      {/* Article content */}
                      {expandedArticles.has(article.number) && (
                        <div
                          id={`article-${article.number}-content`}
                          className="px-5 lg:px-6 pb-6 bg-white border-t border-charcoal-100"
                        >
                          <div className="pt-5 space-y-3">
                            {article.sections.map((section, sIdx) => (
                              <div key={sIdx} className="flex gap-4">
                                {section.clause && (
                                  <span className="flex-shrink-0 text-xs font-black text-gold-500 w-12 mt-0.5 font-mono">
                                    {section.clause}
                                  </span>
                                )}
                                <p
                                  className="text-sm text-charcoal-700 leading-relaxed flex-1"
                                  dangerouslySetInnerHTML={{ __html: highlightText(section.text) }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}

              {/* Footer note */}
              <div className="mt-10 p-5 rounded-2xl bg-cream-100 border border-cream-200">
                <p className="text-xs text-charcoal-500 leading-relaxed">
                  <strong className="text-charcoal-700">Legal Notice:</strong> This is the AAYPL Constitution as adopted by the founding members of the organization. Any questions of interpretation shall be resolved by the Board of Trustees in accordance with Article 25. Amendments may only be made in accordance with Article 24.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
