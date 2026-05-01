'use client'

import Link from 'next/link'
import { ArticleCard } from '@/components/article-card'
import { Newsletter } from '@/components/newsletter'
import { type Article, type Author } from '@/lib/articles-data'

interface MagazineArticleTemplateProps {
  article: Article
  relatedArticles: Article[]
  author: Author | undefined
}

// Parse magazine content into blocks
type ContentBlock = 
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: number; content: string }
  | { type: 'keyfacts'; items: string[] }
  | { type: 'stats'; items: { label: string; value: string }[] }
  | { type: 'quote'; content: string; cite: string }
  | { type: 'warning'; content: string }
  | { type: 'tips'; items: string[] }
  | { type: 'list'; items: string[]; ordered: boolean }

function parseMagazineContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const lines = content.split('\n')
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i].trim()
    
    // Heading — shift levels down by 1 to avoid duplicate H1 (article title is already H1)
    if (line.match(/^#{1,6}\s/)) {
      const rawLevel = line.match(/^(#{1,6})/)?.[0].length || 2
      const level = Math.min(rawLevel + 1, 6)
      blocks.push({ type: 'heading', level, content: line.replace(/^#{1,6}\s/, '') })
      i++
      continue
    }
    
    // Key facts block
    if (line.toLowerCase().includes('key takeaways') || line.toLowerCase().includes('key facts')) {
      const items: string[] = []
      i++
      while (i < lines.length && lines[i].trim().startsWith('-')) {
        items.push(lines[i].trim().replace(/^-\s*/, ''))
        i++
      }
      if (items.length > 0) {
        blocks.push({ type: 'keyfacts', items })
      }
      continue
    }
    
    // Quote block
    if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      const fullQuote = quoteLines.join(' ')
      const citeMatch = fullQuote.match(/—\s*(.+)$/)
      if (citeMatch) {
        blocks.push({
          type: 'quote',
          content: fullQuote.replace(/—\s*.+$/, '').trim(),
          cite: citeMatch[1]
        })
      } else {
        blocks.push({ type: 'quote', content: fullQuote, cite: '' })
      }
      continue
    }
    
    // Warning block
    if (line.startsWith('⚠') || line.toLowerCase().includes('warning:')) {
      const content = line.replace(/^⚠\s*/, '').replace(/warning:/i, '').trim()
      blocks.push({ type: 'warning', content })
      i++
      continue
    }
    
    // Numbered list (tips)
    if (line.match(/^\d+\./)) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().match(/^\d+\./)) {
        items.push(lines[i].trim().replace(/^\d+\.\s*/, ''))
        i++
      }
      blocks.push({ type: 'tips', items })
      continue
    }
    
    // Bullet list
    if (line.startsWith('-') || line.startsWith('*')) {
      const items: string[] = []
      while (i < lines.length && (lines[i].trim().startsWith('-') || lines[i].trim().startsWith('*'))) {
        items.push(lines[i].trim().replace(/^[-*]\s*/, ''))
        i++
      }
      blocks.push({ type: 'list', items, ordered: false })
      continue
    }
    
    // Stats block (lines with ** around them)
    if (line.includes('**') && line.match(/\d+/)) {
      const items: { label: string; value: string }[] = []
      while (i < lines.length && lines[i].includes('**')) {
        const match = lines[i].match(/\*\*(.+?)\*\*\s*(.+)/)
        if (match) {
          items.push({ value: match[1], label: match[2] })
        }
        i++
      }
      if (items.length > 0) {
        blocks.push({ type: 'stats', items })
      }
      continue
    }
    
    // Regular paragraph
    if (line) {
      let paragraph = line
      i++
      // Collect continuation lines
      while (i < lines.length && lines[i].trim() && !lines[i].trim().match(/^[-*#>\d]/)) {
        paragraph += ' ' + lines[i].trim()
        i++
      }
      blocks.push({ type: 'paragraph', content: paragraph })
      continue
    }
    
    i++
  }
  
  return blocks
}

// Render magazine content blocks
function renderMagazineBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={idx} className="text-lg text-muted-foreground leading-[1.8] mb-6">
          {block.content}
        </p>
      )
    
    case 'heading':
      const safeLevel = Math.max(block.level, 2) as 2 | 3 | 4 | 5 | 6
      const HeadingTag = `h${safeLevel}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      const sizeClasses = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'][safeLevel - 1]
      return (
        <HeadingTag key={idx} className={`${sizeClasses} font-bold text-foreground mt-10 mb-4 border-l-4 border-emerald-500 pl-4`}>
          {block.content}
        </HeadingTag>
      )
    
    case 'keyfacts':
      return (
        <div key={idx} className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 my-8">
          <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-4">
            Key takeaways
          </h4>
          <ul className="space-y-3">
            {block.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground">
                <span className="text-emerald-600 font-bold">✓</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*(.+?)\*/g, '<em>$1</em>') }} />
              </li>
            ))}
          </ul>
        </div>
      )
    
    case 'stats':
      return (
        <div key={idx} className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {block.items.map((stat, i) => (
            <div key={i} className="bg-emerald-900 text-white rounded-xl p-4 text-center">
              <span className="block text-2xl md:text-3xl font-bold text-emerald-400">{stat.value}</span>
              <span className="text-xs text-emerald-200/70 mt-1 block">{stat.label}</span>
            </div>
          ))}
        </div>
      )
    
    case 'quote':
      return (
        <blockquote key={idx} className="relative bg-emerald-900 text-white rounded-xl p-8 my-8">
          <span className="absolute top-4 left-6 text-6xl text-emerald-400/30 font-serif">&ldquo;</span>
          <p className="relative text-lg md:text-xl italic leading-relaxed mb-4 pl-4">
            {block.content}
          </p>
          {block.cite && (
            <cite className="text-sm text-emerald-300 not-italic block pl-4">— {block.cite}</cite>
          )}
        </blockquote>
      )
    
    case 'warning':
      return (
        <div key={idx} className="bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 border-l-4 border-l-amber-500 rounded-lg p-4 my-6">
          <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
            <strong className="font-semibold">⚠ Warning:</strong>{' '}
            <span dangerouslySetInnerHTML={{ __html: block.content }} />
          </p>
        </div>
      )
    
    case 'tips':
      return (
        <ol key={idx} className="space-y-4 my-8">
          {block.items.map((item, i) => {
            const boldMatch = item.match(/^\*\*(.+?)\*\*:\s*(.+)$/)
            return (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed pt-0.5">
                  {boldMatch ? (
                    <>
                      <strong className="text-foreground">{boldMatch[1]}:</strong>{' '}
                      {boldMatch[2]}
                    </>
                  ) : item}
                </span>
              </li>
            )
          })}
        </ol>
      )
    
    case 'list':
      return (
        <ul key={idx} className="space-y-2 my-6 ml-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-muted-foreground">
              <span className="text-emerald-500">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    
    default:
      return null
  }
}

export function MagazineArticleTemplate({ article, relatedArticles, author }: MagazineArticleTemplateProps) {
  // Parse content for special blocks
  const contentBlocks = parseMagazineContent(article.content)
  
  return (
    <>
      {/* Hero Section - Magazine Style */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white overflow-hidden">
        {/* Background Image */}
        {article.image && (
          <div className="absolute inset-0">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/85 to-green-900/90" />
          </div>
        )}
        
        {/* Background Pattern (fallback) */}
        {!article.image && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-300 rounded-full blur-3xl" />
          </div>
        )}
        
        <div className="relative container mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
          {/* Tag */}
          <div className="inline-block bg-emerald-400 text-emerald-900 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            {article.category}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {article.title.includes(':') ? (
              article.title.split(':').map((part, i) => (
                i === 0 ? <span key={i}>{part}</span> : <span key={i} className="text-emerald-300 italic">:{part}</span>
              ))
            ) : (
              article.title
            )}
          </h1>
          
          {/* Subtitle / Excerpt */}
          <p className="text-lg md:text-xl text-emerald-100/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          
          {/* Meta */}
          <div className="flex items-center justify-center gap-6 text-sm text-emerald-200/60 flex-wrap">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            {article.lastModified && (
              <>
                <span>•</span>
                <span>Updated {article.lastModified}</span>
              </>
            )}
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Medically Reviewed
            </span>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Article Content */}
          <article className="article-magazine">
            {contentBlocks.map((block, idx) => renderMagazineBlock(block, idx))}
            
            {/* Author Bio Box */}
            <div className="mt-12 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 flex gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
                {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-foreground">{article.author}</p>
                {author && <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-2">{author.title}</p>}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {author?.bio || `Health and wellness expert with years of experience in ${article.category.toLowerCase()}.`}
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-xl p-5">
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

            {/* Medical Disclaimer */}
            <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800 p-5">
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong className="font-semibold">Medical Disclaimer:</strong> This article is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before making changes to your diet, exercise routine, or treatment plan. Individual results may vary.
              </p>
            </div>
          </article>

          {/* Sidebar */}
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

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Related Articles</h2>
            <p className="text-muted-foreground mb-8">More content you might enjoy</p>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} {...relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  )
}
