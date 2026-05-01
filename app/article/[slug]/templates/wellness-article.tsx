'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArticleCard } from '@/components/article-card'
import { Newsletter } from '@/components/newsletter'
import { type Article, type Author } from '@/lib/articles-data'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, Heart, Brain, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react'

interface WellnessArticleTemplateProps {
  article: Article
  relatedArticles: Article[]
  author: Author | undefined
}

// Component to render article content with special formatting
function ArticleContent({ content }: { content: string }) {
  const sections = content.split('\n\n')

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => renderSection(section, idx))}
    </div>
  )
}

function renderSection(section: string, idx: number) {
  const trimmed = section.trim()

  // H2 Heading
  if (trimmed.startsWith('## ')) {
    const text = trimmed.replace('## ', '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return (
      <h2 key={idx} id={id} className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-6 scroll-mt-24 border-l-4 border-violet-500 pl-4">
        {text}
      </h2>
    )
  }

  // H3 Heading
  if (trimmed.startsWith('### ')) {
    const text = trimmed.replace('### ', '')
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return (
      <h3 key={idx} id={id} className="text-xl md:text-2xl font-semibold text-foreground mt-10 mb-4 scroll-mt-24 text-violet-600">
        {text}
      </h3>
    )
  }

  // Bullet list with emojis (wellness tips)
  if (trimmed.startsWith('- ') && trimmed.includes('**')) {
    const lines = trimmed.split('\n').filter(l => l.trim().startsWith('- '))
    return (
      <div key={idx} className="grid gap-4 my-8">
        {lines.map((line, i) => {
          const cleanLine = line.replace('- ', '').trim()
          const emojiMatch = cleanLine.match(/^(\p{Emoji}+)/u)
          const emoji = emojiMatch ? emojiMatch[1] : '✓'
          const textWithoutEmoji = cleanLine.replace(/^\p{Emoji}+\s*/u, '').trim()
          const boldMatch = textWithoutEmoji.match(/^\*\*(.+?)\*\*[\s:–—-]*(.*)/)
          
          return (
            <div key={i} className="flex gap-4 p-5 rounded-xl bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-800/50 hover:border-violet-400 transition-colors">
              <span className="text-2xl shrink-0">{emoji}</span>
              <div>
                {boldMatch ? (
                  <>
                    <strong className="text-foreground block mb-1">{boldMatch[1]}</strong>
                    <span className="text-muted-foreground text-sm leading-relaxed">{boldMatch[2]}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground" dangerouslySetInnerHTML={{ 
                    __html: textWithoutEmoji.replace(/\*\*(.+?)\*/g, '<strong class="text-foreground">$1</strong>')
                  }} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Warning/Important box
  if (trimmed.startsWith('⚠️') || trimmed.startsWith('⚠')) {
    const text = trimmed.replace(/^⚠️?\s*/, '').trim()
    return (
      <div key={idx} className="my-8 p-6 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 flex gap-4">
        <span className="text-2xl shrink-0">⚠️</span>
        <div>
          <strong className="text-amber-800 dark:text-amber-200 block mb-1">Important</strong>
          <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{
            __html: text.replace(/\*\*(.+?)\*/g, '<strong>$1</strong>')
          }} />
        </div>
      </div>
    )
  }

  // Quote/Highlight box
  if (trimmed.startsWith('>')) {
    const text = trimmed.replace(/^>\s*/, '').trim()
    return (
      <blockquote key={idx} className="my-8 py-6 px-8 rounded-xl bg-gradient-to-r from-violet-100 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/20 border-l-4 border-violet-500">
        <p className="text-lg text-violet-900 dark:text-violet-200 italic leading-relaxed">
          {text}
        </p>
      </blockquote>
    )
  }

  // Key Takeaways section
  if (trimmed.toLowerCase().includes('key takeaway') || trimmed.toLowerCase().includes('the bottom line')) {
    return (
      <div key={idx} className="my-8 p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800">
        <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Key Takeaway
        </h4>
        <p className="text-emerald-700 dark:text-emerald-400" dangerouslySetInnerHTML={{
          __html: trimmed.replace(/\*\*(.+?)\*/g, '<strong>$1</strong>')
        }} />
      </div>
    )
  }

  // Divider
  if (trimmed === '---') {
    return (
      <div key={idx} className="flex items-center gap-4 my-10">
        <div className="flex-1 h-px bg-border" />
        <Heart className="h-4 w-4 text-violet-400" />
        <div className="flex-1 h-px bg-border" />
      </div>
    )
  }

  // Regular paragraph
  return (
    <p key={idx} className="text-lg text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{
      __html: trimmed
        .replace(/\*\*(.+?)\*/g, '<strong class="text-foreground">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
    }} />
  )
}

// Build TOC from content
function buildTOC(content: string): { id: string; label: string; level: number }[] {
  const lines = content.split('\n')
  const toc: { id: string; label: string; level: number }[] = []
  
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      const text = line.replace('## ', '')
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      toc.push({ id, label: text, level: 2 })
    } else if (line.startsWith('### ')) {
      const text = line.replace('### ', '')
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      toc.push({ id, label: text, level: 3 })
    }
  })
  
  return toc
}

export function WellnessArticleTemplate({ article, relatedArticles, author }: WellnessArticleTemplateProps) {
  const [progress, setProgress] = useState(0)
  const toc = buildTOC(article.content)

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-violet-500 to-purple-400 transition-[width] duration-100" style={{ width: `${progress}%` }} />

      {/* Hero Section - Calming Design */}
      <section className="relative bg-gradient-to-br from-violet-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Background Image */}
        {article.image && (
          <div className="absolute inset-0">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-purple-900/80 to-slate-900/90" />
          </div>
        )}

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative container mx-auto max-w-4xl px-4 py-16 md:py-20 text-center">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-400/20 border border-violet-400/40 text-violet-200 text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            <Brain className="h-3.5 w-3.5" />
            {article.category}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-violet-100/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-center gap-5 text-sm text-violet-200/60 flex-wrap">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="text-violet-400">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {article.date}
            </span>
            {article.lastModified && (
              <>
                <span className="text-violet-400">•</span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4" />
                  Updated {article.lastModified}
                </span>
              </>
            )}
            <span className="text-violet-400">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </span>
            <span className="text-violet-400">•</span>
            <span className="flex items-center gap-1.5 text-violet-300">
              <ShieldCheck className="h-4 w-4" />
              Medically Reviewed
            </span>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Article Content */}
          <article className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href={`/category/${article.category.toLowerCase().replace(' ', '-')}`} className="hover:text-violet-600 transition-colors">
                {article.category}
              </Link>
              <span>/</span>
              <span className="text-foreground">Article</span>
            </div>

            <ArticleContent content={article.content} />

            {/* Author Box */}
            <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 border border-violet-200 dark:border-violet-800/50">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{article.author}</p>
                  {author && <p className="text-sm text-violet-600 dark:text-violet-400 mb-2">{author.title}</p>}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {author?.bio || `Clinical psychologist specializing in ${article.category.toLowerCase()} and evidence-based therapeutic approaches.`}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-violet-500" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, idx) => (
                    <div key={idx} className="rounded-xl border border-violet-200 dark:border-violet-800/50 bg-violet-50/50 dark:bg-violet-950/10 p-5">
                      <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                        <span className="text-violet-600 shrink-0">Q:</span>
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

            {/* CTA */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white text-center">
              <Heart className="h-10 w-10 mx-auto mb-4 text-violet-200" />
              <h3 className="text-xl font-bold mb-2">Need Professional Support?</h3>
              <p className="text-violet-100 mb-4 max-w-md mx-auto">
                If anxiety is affecting your daily life, speaking with a mental health professional can help. You're not alone.
              </p>
              <a href="#newsletter" className="inline-block bg-white text-violet-600 px-6 py-2.5 rounded-full font-semibold hover:bg-violet-50 transition-colors">
                Get Mental Health Resources
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* TOC */}
            {toc.length > 0 && (
              <div className="bg-card border border-violet-200 dark:border-violet-800/50 rounded-2xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-4 pb-3 border-b border-violet-100 dark:border-violet-800/50">
                  Table of Contents
                </h4>
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`} 
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-3 py-2 rounded-lg transition-colors"
                        style={{ paddingLeft: item.level === 3 ? '1.5rem' : '0.75rem' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-300 dark:bg-violet-700 shrink-0" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Newsletter */}
            <div id="newsletter" className="bg-gradient-to-br from-violet-500/10 to-purple-400/5 border border-violet-200 dark:border-violet-800/50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5 text-violet-500" />
                Mental Wellness Tips
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Weekly insights on managing anxiety, stress relief techniques, and mental health resources.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-violet-200 dark:border-violet-800 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                  Subscribe Free
                </button>
              </div>
            </div>

            {/* Related Posts */}
            <div className="bg-card border border-violet-200 dark:border-violet-800/50 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-4 pb-3 border-b border-violet-100 dark:border-violet-800/50">
                Related Articles
              </h4>
              <div className="space-y-3">
                {relatedArticles.slice(0, 4).map((related) => (
                  <Link key={related.id} href={`/article/${related.slug}`} className="flex gap-3 group py-2 border-b border-border/50 last:border-0">
                    <div className="w-12 h-12 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xl shrink-0">
                      {related.category === 'Mental Health' ? '🧠' : related.category === 'Fitness' ? '💪' : '🌱'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-violet-600 transition-colors line-clamp-2">
                        {related.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{related.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Helpline */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
                Crisis Support
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                If you're in crisis, help is available 24/7:
              </p>
              <div className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                Crisis Text Line: Text HOME to 741741
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-violet-200 dark:border-violet-800/50 bg-violet-50/30 dark:bg-violet-950/10 py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Related Articles</h2>
            <p className="text-muted-foreground mb-8">More resources for your mental wellness journey</p>
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

export default WellnessArticleTemplate
