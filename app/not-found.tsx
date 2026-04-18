import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { articles } from '@/lib/articles-data'

export const metadata = {
  title: 'Page Not Found | HealthHub',
  description: 'Sorry, the page you are looking for does not exist. Browse our health and wellness articles.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  // Get 3 random articles for suggestions
  const suggestedArticles = articles.slice(0, 3)
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-foreground md:text-7xl">404</h1>
            <p className="mt-2 text-lg text-foreground/70">Page not found</p>
          </div>

          <div className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Sorry, we couldn&apos;t find what you&apos;re looking for.
            </h2>
            <p className="text-foreground/70">
              The article or page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-md hover:shadow-lg"
            >
              Go Home
            </Link>
            <Link
              href="/category/fitness"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-8 py-3 font-medium text-foreground transition-all hover:bg-muted"
            >
              Browse Articles
            </Link>
          </div>

          {/* Suggested Articles */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Popular Articles</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {suggestedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left"
                >
                  <span className="text-xs font-medium text-primary mb-1 block">{article.category}</span>
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                    {article.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
