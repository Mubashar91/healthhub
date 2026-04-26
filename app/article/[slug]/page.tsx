import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getArticleBySlug, getRelatedArticles, getAllSlugs, getAuthorByName, getArticleById } from '@/lib/articles-data'
import { DefaultArticleTemplate } from './templates/default-article'
import { MagazineArticleTemplate } from './templates/magazine-article'
import { ChallengeArticleTemplate } from './templates/challenge-article'
import { WellnessArticleTemplate } from './templates/wellness-article'

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
        url: 'https://healthhub-eta.vercel.app/logo.png',
      },
    },
    datePublished: article.date,
    dateModified: article.lastModified || article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://healthhub-eta.vercel.app/article/${article.slug}`,
    },
    image: article.image,
    articleSection: article.category,
    keywords: article.keywords?.join(', ') || article.tags?.join(', '),
    wordCount: article.wordCount || article.content.split(/\s+/).length,
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
        item: 'https://healthhub-eta.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category,
        item: `https://healthhub-eta.vercel.app/category/${article.category.toLowerCase().replace(' ', '-')}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://healthhub-eta.vercel.app/article/${article.slug}`,
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

// FAQ Schema for articles with FAQs
function FAQSchema({ article }: { article: ReturnType<typeof getArticleById> }) {
  if (!article || !article.faqs || article.faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
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
      'article:modified_time': article.lastModified || article.date,
      'article:author': article.author,
      'article:section': article.category,
      'article:tag': article.tags?.join(', '),
      'wordCount': article.wordCount?.toString(),
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article.id)
  const author = getAuthorByName(article.author)

  // Determine which template to use
  const template = article.template || 'default'

  return (
    <>
      <Header />
      
      <main>
        {template === 'wellness' ? (
          <WellnessArticleTemplate article={article} relatedArticles={relatedArticles} author={author} />
        ) : template === 'challenge' ? (
          <ChallengeArticleTemplate article={article} relatedArticles={relatedArticles} author={author} />
        ) : template === 'magazine' ? (
          <MagazineArticleTemplate article={article} relatedArticles={relatedArticles} author={author} />
        ) : (
          <DefaultArticleTemplate article={article} relatedArticles={relatedArticles} author={author} />
        )}
      </main>

      <Footer />

      {/* SEO Structured Data */}
      <ArticleSchema article={article} />
      <BreadcrumbSchema article={article} />
      <FAQSchema article={article} />
    </>
  )
}