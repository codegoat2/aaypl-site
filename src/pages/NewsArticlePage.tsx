import { useParams, Link, Navigate } from 'react-router-dom'
import { Calendar, User, Tag, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import SEOHead from '../components/ui/SEOHead'
import { newsArticles } from '../data/news'
import NewsCard from '../components/ui/NewsCard'

function renderMarkdown(text: string) {
  return text
    .trim()
    .split('\n\n')
    .map((block, i) => {
      if (block.startsWith('**') && block.endsWith('**') && !block.includes('\n')) {
        return <h3 key={i} className="font-heading font-bold text-navy-900 text-xl mt-8 mb-3">{block.replace(/\*\*/g, '')}</h3>
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter(l => l.startsWith('- '))
        return (
          <ul key={i} className="list-disc pl-5 space-y-1 text-charcoal-700 text-base leading-relaxed">
            {items.map((item, j) => <li key={j}>{item.slice(2)}</li>)}
          </ul>
        )
      }
      const withBold = block.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-navy-900">$1</strong>')
      return <p key={i} className="text-charcoal-700 text-base leading-[1.85]" dangerouslySetInnerHTML={{ __html: withBold }} />
    })
}

export default function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = newsArticles.find(a => a.slug === slug)

  if (!article) return <Navigate to="/news" replace />

  const currentIdx = newsArticles.findIndex(a => a.slug === slug)
  const prevArticle = currentIdx > 0 ? newsArticles[currentIdx - 1] : null
  const nextArticle = currentIdx < newsArticles.length - 1 ? newsArticles[currentIdx + 1] : null
  const related = newsArticles.filter(a => a.slug !== slug).slice(0, 3)

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  const shareUrl = encodeURIComponent(`https://aaypl.site/news/${slug}`)
  const shareTitle = encodeURIComponent(article.title)

  return (
    <>
      <SEOHead
        title={`${article.title} – AAYPL`}
        description={article.excerpt}
        path={`/news/${slug}`}
        type="article"
        article={{
          publishedTime: article.date,
          author: article.author,
          section: article.category,
        }}
      />

      {/* Hero */}
      <section className="relative bg-navy-950 pt-32 pb-16 overflow-hidden" aria-label="Article header">
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 60px)` }} />
        </div>
        <div className="container-narrow relative">
          {/* Back */}
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors mb-8"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to News
          </Link>

          {/* Meta */}
          <div className="flex items-center flex-wrap gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <Tag size={10} aria-hidden="true" /> {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <Calendar size={12} aria-hidden="true" />
              <time dateTime={article.date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <User size={12} aria-hidden="true" />
              <span>{article.author}</span>
            </div>
          </div>

          <h1 className="font-heading font-black text-white text-3xl lg:text-5xl leading-tight tracking-tight mb-5">
            {article.title}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            {article.excerpt}
          </p>
        </div>
      </section>

      {/* Article content */}
      <article className="bg-white" aria-labelledby="article-title">
        <div className="container-narrow py-14">
          <div className="max-w-3xl mx-auto">
            {/* Featured image placeholder */}
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full rounded-2xl mb-10 aspect-video object-cover"
              />
            ) : (
              <div className="w-full rounded-2xl mb-10 aspect-video bg-gradient-to-br from-navy-900/5 to-navy-900/10 flex items-center justify-center">
                <span className="font-heading font-black text-navy-900/15 text-6xl select-none" aria-hidden="true">AAYPL</span>
              </div>
            )}

            {/* Body */}
            <div className="prose-content space-y-4">
              {renderMarkdown(article.content)}
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-charcoal-100">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider mr-1">Tags:</span>
                  {article.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 bg-cream-100 text-charcoal-600 text-xs font-medium px-3 py-1 rounded-full border border-cream-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-charcoal-100">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold text-charcoal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 size={12} aria-hidden="true" /> Share:
                </span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-[#1877F2] transition-colors bg-cream-100 hover:bg-blue-50 px-3 py-1.5 rounded-full"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={13} aria-hidden="true" /> Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-colors bg-cream-100 hover:bg-charcoal-100 px-3 py-1.5 rounded-full"
                  aria-label="Share on X (Twitter)"
                >
                  <Twitter size={13} aria-hidden="true" /> X (Twitter)
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-[#0A66C2] transition-colors bg-cream-100 hover:bg-blue-50 px-3 py-1.5 rounded-full"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={13} aria-hidden="true" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Prev / Next */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link to={`/news/${prevArticle.slug}`} className="group card p-4 hover:-translate-y-0.5 transition-all duration-300">
                  <p className="text-xs text-charcoal-400 flex items-center gap-1 mb-1">
                    <ArrowLeft size={11} aria-hidden="true" /> Previous
                  </p>
                  <p className="text-sm font-semibold text-navy-900 group-hover:text-gold-700 transition-colors leading-snug line-clamp-2">
                    {prevArticle.title}
                  </p>
                </Link>
              ) : <div />}
              {nextArticle ? (
                <Link to={`/news/${nextArticle.slug}`} className="group card p-4 text-right hover:-translate-y-0.5 transition-all duration-300">
                  <p className="text-xs text-charcoal-400 flex items-center gap-1 justify-end mb-1">
                    Next <ArrowRight size={11} aria-hidden="true" />
                  </p>
                  <p className="text-sm font-semibold text-navy-900 group-hover:text-gold-700 transition-colors leading-snug line-clamp-2">
                    {nextArticle.title}
                  </p>
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section-padding bg-cream-100" aria-labelledby="related-articles">
          <div className="container-wide">
            <h2 id="related-articles" className="font-heading font-bold text-navy-900 text-2xl mb-8">
              More from AAYPL
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(a => <NewsCard key={a.slug} {...a} />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
