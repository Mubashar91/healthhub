import { Header } from '@/components/header'
import { ArticleCard } from '@/components/article-card'
import { Sidebar } from '@/components/sidebar'
import { Newsletter } from '@/components/newsletter'
import { Footer } from '@/components/footer'
import { articles } from '@/lib/articles-data'

export const metadata = {
  title: 'All Articles | HealthHub',
  description: 'Browse every evidence-based article on HealthHub covering fitness, nutrition, and mental wellness.',
  keywords: ['health articles', 'wellness', 'fitness', 'nutrition', 'mental health'],
  openGraph: {
    title: 'All Articles | HealthHub',
    description: 'Browse every evidence-based article on HealthHub covering fitness, nutrition, and mental wellness.',
    type: 'website',
    url: 'https://healthhub-eta.vercel.app/articles',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Articles | HealthHub',
    description: 'Browse every evidence-based article on HealthHub covering fitness, nutrition, and mental wellness.',
  },
  alternates: {
    canonical: 'https://healthhub-eta.vercel.app/articles',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ArticlesPage() {
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      <Header />

      <section className="border-b border-border bg-linear-to-b from-primary/5 via-accent/5 to-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl text-balance">
            All Articles
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/70">
            Every evidence-based guide on HealthHub, covering fitness, nutrition, and mental wellness.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {sortedArticles.length} Articles
            </span>
          </div>
        </div>
      </section>

      <main>
        <section className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid gap-6">
                {sortedArticles.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />

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
                name: 'All Articles',
                item: 'https://healthhub-eta.vercel.app/articles',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'All Articles | HealthHub',
            description: 'Browse every evidence-based article on HealthHub covering fitness, nutrition, and mental wellness.',
            url: 'https://healthhub-eta.vercel.app/articles',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: sortedArticles.map((article, index) => ({
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
