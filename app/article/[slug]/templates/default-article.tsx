'use client'

import Link from 'next/link'
import { Sidebar } from '@/components/sidebar'
import { ArticleCard } from '@/components/article-card'
import { Newsletter } from '@/components/newsletter'
import { type Article, type Author } from '@/lib/articles-data'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react'

interface DefaultArticleTemplateProps {
  article: Article
  relatedArticles: Article[]
  author: Author | undefined
}

// Component to render article content
function ArticleContent({ content }: { content: string }) {
  const paragraphs = content.split('\n\n')

  return (
    <>
      {paragraphs.map((paragraph, idx) => renderParagraph(paragraph, idx))}
    </>
  )
}

function renderParagraph(paragraph: string, idx: number) {
  // Handle headings (##, ###, etc.)
  const headingMatch = paragraph.match(/^(#{1,6})\s+(.+)$/)
  if (headingMatch) {
    const level = headingMatch[1].length
    const text = headingMatch[2]
    const sizeClasses = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'][level - 1]
    const className = `${sizeClasses} font-bold text-foreground mt-10 mb-4 border-l-4 border-emerald-500 pl-4`
    
    switch (level) {
      case 1: return <h1 key={idx} className={className}>{text}</h1>
      case 2: return <h2 key={idx} className={className}>{text}</h2>
      case 3: return <h3 key={idx} className={className}>{text}</h3>
      case 4: return <h4 key={idx} className={className}>{text}</h4>
      case 5: return <h5 key={idx} className={className}>{text}</h5>
      case 6: return <h6 key={idx} className={className}>{text}</h6>
      default: return <h2 key={idx} className={className}>{text}</h2>
    }
  }
  
  if (paragraph.startsWith('-')) {
    const items = paragraph.split('\n')
    return (
      <ul key={idx} className="list-disc space-y-2 mb-6 ml-6">
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="text-muted-foreground leading-relaxed">
            {item.replace(/^-\s/, '')}
          </li>
        ))}
      </ul>
    )
  }
  
  if (paragraph.match(/^\d+\./)) {
    const items = paragraph.split('\n')
    return (
      <ol key={idx} className="list-decimal space-y-2 ml-6 mb-6">
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="text-muted-foreground leading-relaxed">
            {item.replace(/^\d+\.\s/, '')}
          </li>
        ))}
      </ol>
    )
  }
  
  return (
    <p key={idx} className="text-lg text-muted-foreground leading-[1.8] mb-6">
      {paragraph}
    </p>
  )
}

export function DefaultArticleTemplate({ article, relatedArticles, author }: DefaultArticleTemplateProps) {
  return (
    <>
      {/* Article Header */}
      <article className="border-b border-border bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
          {/* Breadcrumb & Actions */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href={`/category/${article.category.toLowerCase().replace(' ', '-')}`}
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {article.category}
            </Link>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Share">
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Bookmark">
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Article Meta */}
          <div className="mb-6 space-y-4">
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 text-xs font-semibold"
            >
              {article.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground text-balance">
              {article.title}
            </h1>

            {/* Article Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="font-medium text-foreground/80">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/60 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}
        </div>
      </article>

      {/* Article Content with Sidebar */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Main Column */}
            <div>
              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <ArticleContent content={article.content} />
              </div>

              {/* Author Box */}
              <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
                    {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">Written by {article.author}</h3>
                    {author && (
                      <>
                        <p className="text-sm text-emerald-600 font-medium mt-0.5">{author.title}</p>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {author.bio}
                        </p>
                      </>
                    )}
                    {!author && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Health and wellness expert with years of experience in {article.category.toLowerCase()}.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              {article.faqs && article.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {article.faqs.map((faq, idx) => (
                      <div key={idx} className="rounded-xl border border-border bg-card p-5">
                        <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                          <span className="text-emerald-600 shrink-0">Q:</span>
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed pl-5">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Sticky on desktop */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Newsletter */}
              <div className="bg-emerald-900 text-white rounded-xl p-6">
                <h4 className="font-bold text-emerald-300 mb-2">Weekly Wellness Digest</h4>
                <p className="text-sm text-emerald-100/70 mb-4">Evidence-based health insights, delivered every Tuesday.</p>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-emerald-700 text-white placeholder:text-emerald-400/50 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
                  Subscribe — it&apos;s free
                </button>
              </div>

              {/* Related Articles */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h4 className="font-bold text-foreground mb-4 pb-3 border-b border-border">Related articles</h4>
                <div className="space-y-4">
                  {relatedArticles.slice(0, 4).map((related) => (
                    <Link key={related.id} href={`/article/${related.slug}`} className="flex gap-3 group">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
                        {related.category === 'Nutrition' ? '🥗' : related.category === 'Fitness' ? '💪' : '🧠'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {related.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{related.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-2">Related Articles</h2>
            <p className="text-muted-foreground mb-8">More content you might enjoy</p>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} {...relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
