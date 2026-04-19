import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { ArticleCard } from '@/components/article-card'
import { Sidebar } from '@/components/sidebar'
import { Newsletter } from '@/components/newsletter'
import { Footer } from '@/components/footer'
import { getArticlesByCategory, articles } from '@/lib/articles-data'

const categoryNames: Record<string, string> = {
  fitness: 'Fitness',
  nutrition: 'Nutrition',
  'mental-health': 'Mental Health',
}

const categoryDescriptions: Record<string, string> = {
  fitness: 'Discover fitness routines, exercise tips, and workout strategies to build a stronger, healthier body.',
  nutrition: 'Learn about nutrition, diet plans, and healthy eating habits from registered dietitians.',
  'mental-health': 'Explore mental wellness, stress management, meditation, and emotional health resources.',
}

const categoryKeywords: Record<string, string[]> = {
  fitness: ['fitness', 'exercise', 'workout', 'gym', 'training', 'strength', 'cardio', 'health', 'muscle', 'weight training'],
  nutrition: ['nutrition', 'diet', 'healthy eating', 'meal plan', 'vitamins', 'protein', 'weight loss', 'superfoods', 'recipes'],
  'mental-health': ['mental health', 'wellness', 'stress', 'anxiety', 'meditation', 'mindfulness', 'self care', 'therapy', 'depression'],
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const categoryName = categoryNames[slug]

  return {
    title: `${categoryName} Articles | HealthHub`,
    description: categoryDescriptions[slug],
    keywords: categoryKeywords[slug],
    openGraph: {
      title: `${categoryName} Articles | HealthHub`,
      description: categoryDescriptions[slug],
      type: 'website',
      url: `https://healthhub-eta.vercel.app/category/${slug}`,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${categoryName} Articles - HealthHub`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} Articles | HealthHub`,
      description: categoryDescriptions[slug],
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://healthhub-eta.vercel.app/category/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({
    slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categoryName = categoryNames[slug]

  if (!categoryName) {
    notFound()
  }

  const categoryArticles = getArticlesByCategory(categoryName)

  return (
    <>
      <Header />

      {/* Category Hero */}
      <section className="border-b border-border bg-linear-to-b from-primary/5 via-accent/5 to-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl text-balance">
            {categoryName}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/70">
            {categoryDescriptions[slug]}
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {categoryArticles.length} Articles
            </span>
          </div>
        </div>
      </section>

      <main>
        <section className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Column */}
            <div className="lg:col-span-2">
              {categoryArticles.length > 0 ? (
                <div className="grid gap-6">
                  {categoryArticles.map((article) => (
                    <ArticleCard key={article.id} {...article} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-muted/30 p-12 text-center">
                  <p className="text-foreground/70">No articles found in this category yet.</p>
                </div>
              )}

              {/* Ad Space Within Category Content */}
              <div className="my-8 rounded-xl border border-border bg-muted/30 p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Advertisement</p>
                <div className="bg-background rounded-lg border border-dashed border-border h-32 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">[AdSense 468x60]</span>
                </div>
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
                name: categoryName,
                item: `https://healthhub-eta.vercel.app/category/${slug}`,
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
            name: `${categoryName} Articles | HealthHub`,
            description: categoryDescriptions[slug],
            url: `https://healthhub-eta.vercel.app/category/${slug}`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: categoryArticles.map((article, index) => ({
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
