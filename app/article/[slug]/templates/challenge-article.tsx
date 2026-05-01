'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArticleCard } from '@/components/article-card'
import { Newsletter } from '@/components/newsletter'
import { type Article, type Author } from '@/lib/articles-data'

interface ChallengeArticleTemplateProps {
  article: Article
  relatedArticles: Article[]
  author: Author | undefined
}

// Content block types for challenge-style parsing
type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: number; content: string; id: string }
  | { type: 'pullquote'; content: string }
  | { type: 'weekcard'; week: number; title: string; body: string; color: string }
  | { type: 'results'; items: { icon: string; title: string; desc: string }[] }
  | { type: 'tips'; items: string[] }
  | { type: 'list'; items: string[]; ordered: boolean }
  | { type: 'highlight'; title: string; body: string }
  | { type: 'warning'; content: string }
  | { type: 'divider' }
  | { type: 'stats'; items: { value: string; label: string }[] }

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function parseChallengeContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const lines = content.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    // Empty line
    if (!line) { i++; continue }

    // Divider (---)
    if (line === '---') {
      blocks.push({ type: 'divider' })
      i++; continue
    }

    // Heading
    if (line.match(/^#{1,6}\s/)) {
      const level = line.match(/^(#{1,6})/)?.[0].length || 2
      const content = line.replace(/^#{1,6}\s/, '')
      const id = slugify(content)
      blocks.push({ type: 'heading', level, content, id })
      i++; continue
    }

    // Pull quote (>)
    if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      blocks.push({ type: 'pullquote', content: quoteLines.join(' ') })
      continue
    }

    // Warning (⚠)
    if (line.startsWith('⚠') || line.toLowerCase().startsWith('warning:')) {
      const content = line.replace(/^⚠\s*/, '').replace(/^warning:\s*/i, '').trim()
      blocks.push({ type: 'warning', content })
      i++; continue
    }

    // Key Takeaways / Stats block
    if (line.toLowerCase().includes('key stats') || line.toLowerCase().includes('key stats:')) {
      const items: { value: string; label: string }[] = []
      i++
      while (i < lines.length && (lines[i].trim().startsWith('-') || lines[i].trim().startsWith('*'))) {
        const statLine = lines[i].trim().replace(/^[-*]\s*/, '')
        const match = statLine.match(/\*\*(.+?)\*\*\s*(.*)/)
        if (match) {
          items.push({ value: match[1], label: match[2] })
        }
        i++
      }
      if (items.length > 0) blocks.push({ type: 'stats', items })
      continue
    }

    // Week card pattern: ### Week X: Title or ## Week X: Title
    const weekMatch = line.match(/^#{2,3}\s+(Week\s+(\d+))[:\s—–-]*(.*)/i)
    if (weekMatch) {
      const week = parseInt(weekMatch[2])
      const title = weekMatch[3] || `Days ${(week - 1) * 7 + 1}–${week * 7}`
      const colors = ['bg-emerald-600', 'bg-amber-600', 'bg-teal-600', 'bg-violet-600']
      const color = colors[(week - 1) % colors.length]
      const bodyLines: string[] = []
      i++
      // Collect paragraph content until next heading or empty+heading
      while (i < lines.length) {
        const nextLine = lines[i].trim()
        if (!nextLine) { i++; continue }
        if (nextLine.match(/^#{1,6}\s/) || nextLine === '---') break
        bodyLines.push(nextLine)
        i++
      }
      blocks.push({ type: 'weekcard', week, title, body: bodyLines.join('\n'), color })
      continue
    }

    // Results section: ## What Actually Changed / ## The Complete Results
    if (line.match(/^#{2,3}\s+.*(results|changed|what actually changed|complete results)/i)) {
      const headingContent = line.replace(/^#{1,6}\s/, '')
      const headingId = slugify(headingContent)
      blocks.push({ type: 'heading', level: 2, content: headingContent, id: headingId })
      i++
      // Collect result items (bullet list with bold titles)
      const items: { icon: string; title: string; desc: string }[] = []
      const iconMap: Record<string, string> = {
        'weight': '⚖️', 'sleep': '😴', 'mental': '🧠', 'anxiety': '😌',
        'discipline': '💪', 'time': '⏰', 'mood': '😊', 'energy': '⚡',
        'focus': '🎯', 'body': '🏃', 'health': '❤️', 'clarity': '💡',
      }
      while (i < lines.length && (lines[i].trim().startsWith('-') || lines[i].trim().startsWith('*'))) {
        const itemLine = lines[i].trim().replace(/^[-*]\s*/, '')
        const boldMatch = itemLine.match(/^\*\*(.+?)\*\*[:\s—–-]*(.*)/)
        if (boldMatch) {
          const key = boldMatch[1].toLowerCase()
          const icon = Object.entries(iconMap).find(([k]) => key.includes(k))?.[1] || '✓'
          items.push({ icon, title: boldMatch[1], desc: boldMatch[2] })
        }
        i++
      }
      if (items.length > 0) blocks.push({ type: 'results', items })
      continue
    }

    // Highlight box (💡 or similar)
    if (line.includes('💡') || line.toLowerCase().includes('the science behind')) {
      const titleMatch = line.match(/💡\s*\*?\*?(.+?)\*?\*?\s*$/) || line.match(/#{2,3}\s+(.*)/)
      const title = titleMatch ? titleMatch[1].replace(/\*/g, '') : 'The Science Behind It'
      const bodyLines: string[] = []
      i++
      while (i < lines.length) {
        const nextLine = lines[i].trim()
        if (!nextLine || nextLine.match(/^#{1,6}\s/) || nextLine === '---') break
        bodyLines.push(nextLine)
        i++
      }
      blocks.push({ type: 'highlight', title, body: bodyLines.join('\n') })
      continue
    }

    // Numbered list (tips)
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().match(/^\d+\.\s/)) {
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

    // Regular paragraph
    let paragraph = line
    i++
    while (i < lines.length && lines[i].trim() && !lines[i].trim().match(/^[-*#>\d]/) && lines[i].trim() !== '---') {
      paragraph += ' ' + lines[i].trim()
      i++
    }
    blocks.push({ type: 'paragraph', content: paragraph })
  }

  return blocks
}

// Render content blocks
function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={idx} className="text-lg text-muted-foreground leading-[1.85] mb-6 first:text-xl first:text-foreground/90">
          <span dangerouslySetInnerHTML={{ __html: block.content.replace(/\*\*(.+?)\*/g, '<strong class="text-foreground">$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }} />
        </p>
      )

    case 'heading':
      const sizes: Record<number, string> = { 1: 'text-3xl', 2: 'text-2xl', 3: 'text-xl', 4: 'text-lg' }
      return (
        <h2 key={idx} id={block.id} className={`${sizes[block.level] || 'text-2xl'} font-bold text-foreground mt-12 mb-5 scroll-mt-24`}>
          {block.content}
        </h2>
      )

    case 'pullquote':
      return (
        <blockquote key={idx} className="relative my-10 mx-0 md:-mx-5 bg-emerald-900 text-white rounded-xl p-8 border-l-4 border-emerald-400">
          <span className="absolute top-3 left-6 text-6xl text-emerald-400/30 font-serif leading-none">&ldquo;</span>
          <p className="relative text-lg md:text-xl italic leading-relaxed pl-2">{block.content}</p>
        </blockquote>
      )

    case 'weekcard':
      return (
        <div key={idx} className="my-8 border border-border rounded-2xl overflow-hidden bg-card hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
            <span className={`${block.color} text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full`}>
              Week {block.week}
            </span>
            <span className="font-bold text-foreground">{block.title}</span>
          </div>
          <div className="px-6 py-5">
            <p className="text-muted-foreground leading-relaxed mb-0">
              <span dangerouslySetInnerHTML={{ __html: block.body.replace(/\*\*(.+?)\*/g, '<strong class="text-foreground">$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }} />
            </p>
          </div>
        </div>
      )

    case 'results':
      return (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {block.items.map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 hover:border-emerald-500/50 hover:-translate-y-0.5 transition-all">
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">{item.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed m-0">{item.desc}</p>
            </div>
          ))}
        </div>
      )

    case 'tips':
      return (
        <ol key={idx} className="space-y-4 my-8">
          {block.items.map((item, i) => {
            const boldMatch = item.match(/^\*\*(.+?)\*\*[:\s—–-]*(.*)/)
            return (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed pt-0.5">
                  {boldMatch ? (
                    <>
                      <strong className="text-foreground">{boldMatch[1]}</strong>{boldMatch[2] ? `: ${boldMatch[2]}` : ''}
                    </>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*/g, '<strong class="text-foreground">$1</strong>') }} />
                  )}
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
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*/g, '<strong class="text-foreground">$1</strong>') }} />
            </li>
          ))}
        </ul>
      )

    case 'highlight':
      return (
        <div key={idx} className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 my-10">
          <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-3">💡 {block.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-0">
            <span dangerouslySetInnerHTML={{ __html: block.body.replace(/\*\*(.+?)\*/g, '<strong class="text-foreground">$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }} />
          </p>
        </div>
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

    case 'divider':
      return (
        <div key={idx} className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-border" />
          <span className="text-emerald-500 text-lg">☀</span>
          <div className="flex-1 h-px bg-border" />
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

    default:
      return null
  }
}

// Build TOC from content blocks
function buildTOC(blocks: ContentBlock[]): { id: string; label: string }[] {
  return blocks
    .filter(b => b.type === 'heading' && b.level <= 3)
    .map(b => ({ id: (b as { type: 'heading'; id: string; content: string }).id, label: (b as { type: 'heading'; content: string }).content }))
}

export function ChallengeArticleTemplate({ article, relatedArticles, author }: ChallengeArticleTemplateProps) {
  const [progress, setProgress] = useState(0)
  const contentBlocks = parseChallengeContent(article.content)
  const toc = buildTOC(contentBlocks)

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll reveal
  const revealRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    const reveals = revealRef.current?.querySelectorAll('.reveal-item')
    reveals?.forEach(r => observer.observe(r))
    return () => observer.disconnect()
  }, [contentBlocks])

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-[3px] z-[9999] bg-gradient-to-r from-emerald-500 to-teal-400 transition-[width] duration-100" style={{ width: `${progress}%` }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white overflow-hidden">
        {/* Background Image */}
        {article.image && (
          <div className="absolute inset-0">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/85 to-green-950/90" />
          </div>
        )}

        {/* Animated glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Horizon glow */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-500/20 via-emerald-400/5 to-transparent pointer-events-none" />

        <div className="relative container mx-auto max-w-4xl px-4 py-16 md:py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-400/15 border border-emerald-400/35 text-emerald-400 text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            30-Day Personal Challenge
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            {article.title.includes('—') ? (
              article.title.split('—').map((part, i) => (
                i === 0 ? <span key={i}>{part}</span> : <span key={i} className="text-emerald-400 italic">—{part}</span>
              ))
            ) : article.title.includes(':') ? (
              article.title.split(':').map((part, i) => (
                i === 0 ? <span key={i}>{part}</span> : <span key={i} className="text-emerald-400 italic">:{part}</span>
              ))
            ) : (
              article.title
            )}
          </h1>

          {/* Excerpt */}
          <p className="text-lg md:text-xl text-emerald-100/70 max-w-2xl mx-auto mb-8 leading-relaxed italic border-l-3 border-emerald-400 pl-5 text-left">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-center gap-5 text-sm text-emerald-200/50 flex-wrap">
            <span>{article.author}</span>
            <span className="text-emerald-700">•</span>
            <span>{article.date}</span>
            {article.lastModified && (
              <>
                <span className="text-emerald-700">•</span>
                <span>Updated {article.lastModified}</span>
              </>
            )}
            <span className="text-emerald-700">•</span>
            <span>{article.readTime}</span>
            <span className="text-emerald-700">•</span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Medically Reviewed
            </span>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <div className="bg-card border-y border-border">
        <div className="container mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4">
          {[
            { value: '30', label: 'Days Completed' },
            { value: '4:50', label: 'Daily Wake Time' },
            { value: '3.5kg', label: 'Weight Lost' },
            { value: '100%', label: 'Honest Results' },
          ].map((stat, i) => (
            <div key={i} className={`py-7 px-6 text-center ${i < 3 ? 'border-r border-border' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''}`}>
              <span className="block text-3xl font-bold text-emerald-500 leading-none mb-1">{stat.value}</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px]" ref={revealRef}>
          {/* Article Content */}
          <article>
            {contentBlocks.map((block, idx) => renderBlock(block, idx))}

            {/* Author Bio */}
            <div className="mt-12 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 flex gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center text-lg font-bold shrink-0">
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
                      <p className="text-muted-foreground text-sm leading-relaxed pl-5">{faq.answer}</p>
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

            {/* CTA Section */}
            <div className="mt-12 bg-card border border-border rounded-2xl p-10 text-center">
              <span className="text-4xl mb-4 block">🌅</span>
              <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Try It Yourself?</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Get our free 30-day sunrise workout plan with week-by-week guidance, tips for surviving the first seven days, and the exact routine that worked.
              </p>
              <a href="#newsletter" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/30">
                Get the Free Plan →
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4 pb-3 border-b border-border">Table of Contents</div>
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/5 px-2.5 py-2 rounded-lg transition-colors">
                        <span className="w-1 h-1 bg-border rounded-full shrink-0" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Newsletter */}
            <div id="newsletter" className="bg-gradient-to-br from-emerald-500/10 to-teal-400/5 border border-emerald-500/25 rounded-2xl p-6">
              <div className="text-xl font-bold text-foreground mb-2">Get New Posts Free</div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Honest health experiments delivered to your inbox every week. No spam, ever.</p>
              <div className="flex flex-col gap-2.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2.5 rounded-lg text-sm tracking-wide transition-colors">
                  Subscribe Free
                </button>
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4 pb-3 border-b border-border">About the Author</div>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center text-xl font-bold mb-3">
                {article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="font-bold text-foreground mb-1">{article.author}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {author?.bio || `Health and wellness expert with years of experience in ${article.category.toLowerCase()}.`}
              </p>
            </div>

            {/* Related Posts */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4 pb-3 border-b border-border">Related Posts</div>
              <div className="space-y-3">
                {relatedArticles.slice(0, 4).map((related) => (
                  <Link key={related.id} href={`/article/${related.slug}`} className="flex gap-3 group py-2 border-b border-border last:border-0">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
                      {related.category === 'Nutrition' ? '🥗' : related.category === 'Fitness' ? '💪' : '🧠'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-emerald-500 transition-colors line-clamp-2">
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
