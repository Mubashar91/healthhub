import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { ArticleCard } from '@/components/article-card'
import { Sidebar } from '@/components/sidebar'
import { Newsletter } from '@/components/newsletter'
import { Footer } from '@/components/footer'
import { getArticlesByTag, getAllTags } from '@/lib/articles-data'
import { Tag } from 'lucide-react'

interface TagPageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all tags
export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    slug: tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params
  const tagArticles = getArticlesByTag(slug)
  
  if (tagArticles.length === 0) {
    return { title: 'Tag Not Found' }
  }

  const title = `${slug.charAt(0).toUpperCase() + slug.slice(1)} Articles | HealthHub`
  const description = `Explore ${tagArticles.length} articles about ${slug}. Discover evidence-based health and wellness information on ${slug}.`

  return {
    title,
    description,
    keywords: [slug, 'health', 'wellness', 'articles', 'tips', 'guide'],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://healthhub-eta.vercel.app/tag/${slug}`,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${slug} Articles - HealthHub`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://healthhub-eta.vercel.app/tag/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tagArticles = getArticlesByTag(slug)

  if (tagArticles.length === 0) {
    notFound()
  }

  const formattedTag = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <>
      <Header />

      {/* Tag Hero */}
      <section className="border-b border-border bg-linear-to-b from-primary/5 via-accent/5 to-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Tag</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl text-balance capitalize">
            {formattedTag}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/70">
            Explore {tagArticles.length} articles about {slug}. Discover tips, guides, and evidence-based information.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {tagArticles.length} Articles
            </span>
          </div>
        </div>
      </section>

      <main>
        <section className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Column */}
            <div className="lg:col-span-2">
              <div className="grid gap-6">
                {tagArticles.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: 'Tags',
                item: 'https://healthhub-eta.vercel.app/tags',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: formattedTag,
                item: `https://healthhub-eta.vercel.app/tag/${slug}`,
              },
            ],
          }),
        }}
      />
      {/* CollectionPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${formattedTag} Articles | HealthHub`,
            description: `Articles about ${slug} - health and wellness tips, guides, and evidence-based information.`,
            url: `https://healthhub-eta.vercel.app/tag/${slug}`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: tagArticles.map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://healthhub-eta.vercel.app/article/${article.slug}`,
                name: article.title,
              })),
            },
          }),
        }}
      />
    </>
  )
}
