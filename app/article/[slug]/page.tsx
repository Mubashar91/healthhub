import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { ArticleCard } from '@/components/article-card'
import { Newsletter } from '@/components/newsletter'
import { Footer } from '@/components/footer'
import { getArticleBySlug, getRelatedArticles, getAllSlugs } from '@/lib/articles-data'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all articles
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: 'Article Not Found' }
  }

  // Use SEO description if available, fallback to excerpt
  const metaDescription = article.description || article.excerpt
  const keywords = article.keywords?.join(', ') || article.tags?.join(', ') || 'health, wellness, fitness'

  return {
    title: `${article.title} | HealthHub`,
    description: metaDescription,
    keywords: keywords,
    authors: [{ name: article.author }],
    category: article.category,
    openGraph: {
      title: article.title,
      description: metaDescription,
      images: article.image ? [article.image] : [],
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      section: article.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: metaDescription,
      images: article.image ? [article.image] : [],
      creator: '@healthhub',
    },
    alternates: {
      canonical: `/article/${article.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    other: {
      'article:published_time': article.date,
      'article:modified_time': article.date,
      'article:author': article.author,
      'article:section': article.category,
      'article:tag': article.tags?.join(', '),
    },
  }
}

// JSON-LD Schema for Article structured data
function ArticleSchema({ article }: { article: ReturnType<typeof getArticleById> }) {
  if (!article) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description || article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HealthHub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://healthhub.com/logo.png',
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://healthhub.com/article/${article.id}`,
    },
    image: article.image,
    articleSection: article.category,
    keywords: article.keywords?.join(', ') || article.tags?.join(', '),
    wordCount: article.content.split(/\s+/).length,
    timeRequired: `PT${parseInt(article.readTime)}M`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb Schema
function BreadcrumbSchema({ article }: { article: ReturnType<typeof getArticleById> }) {
  if (!article) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://healthhub.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category,
        item: `https://healthhub.com/category/${article.category.toLowerCase().replace(' ', '-')}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        url: `https://healthhub.com/article/${article.slug}`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Component to split content and insert ads
function ArticleContent({ content }: { content: string }) {
  const paragraphs = content.split('\n\n')
  const adInterval = 3 // Insert ad every 3 paragraphs

  return (
    <>
      {paragraphs.map((paragraph, idx) => {
        // Insert ad after certain paragraphs
        if (idx > 0 && idx % adInterval === 0 && idx < paragraphs.length - 2) {
          return renderParagraph(paragraph, idx)
        }
        return renderParagraph(paragraph, idx)
      })}
    </>
  )
}

function renderParagraph(paragraph: string, idx: number) {
  if (paragraph.startsWith('-')) {
    const items = paragraph.split('\n')
    return (
      <ul key={idx} className="list-disc space-y-2 mb-6 ml-6">
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="text-foreground/80 leading-relaxed">
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
          <li key={itemIdx} className="text-foreground/80 leading-relaxed">
            {item.replace(/^\d+\.\s/, '')}
          </li>
        ))}
      </ol>
    )
  }
  return (
    <p key={idx} className="text-foreground/80 leading-[1.8] mb-6 text-base md:text-lg">
      {paragraph}
    </p>
  )
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article.id)

  return (
    <>
      <Header />

      <main>
        {/* Article Header */}
        <article className="border-b border-border bg-linear-to-b from-muted/30 to-background">
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
                className="bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs font-semibold"
              >
                {article.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground text-balance">
                {article.title}
              </h1>

              {/* Article Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
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
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/60 hover:bg-primary/10 hover:text-primary transition-colors"
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
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Column */}
              <div className="lg:col-span-2">
                {/* Article Body with In-Article Ads */}
                <div className="prose prose-lg max-w-none">
                  <ArticleContent content={article.content} />
                </div>

                {/* Author Box */}
                <div className="mt-12 rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Written by {article.author}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Health and wellness expert with years of experience in {article.category.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Sticky on desktop */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <Sidebar />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-border bg-linear-to-b from-muted/20 to-background py-12 md:py-16">
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
      </main>

      <Footer />

      {/* SEO Structured Data */}
      <ArticleSchema article={article} />
      <BreadcrumbSchema article={article} />
    </>
  )
}
