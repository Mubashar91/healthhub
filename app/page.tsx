import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ArticleCard } from '@/components/article-card'
import { Sidebar } from '@/components/sidebar'
import { Newsletter } from '@/components/newsletter'
import { Footer } from '@/components/footer'
import { articles, getFeaturedArticles } from '@/lib/articles-data'
import { ArrowRight, TrendingUp, Sparkles, Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'HealthHub | Modern Wellness & Fitness Information',
  description: 'Discover evidence-based articles on fitness, nutrition, and mental wellness. Your trusted source for health information.',
  keywords: ['health', 'wellness', 'fitness', 'nutrition', 'mental health', 'lifestyle', 'articles'],
  openGraph: {
    title: 'HealthHub | Modern Wellness & Fitness Information',
    description: 'Discover evidence-based articles on fitness, nutrition, and mental wellness.',
    type: 'website',
    url: 'https://healthhub-eta.vercel.app',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HealthHub - Modern Wellness & Fitness Information',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthHub | Modern Wellness & Fitness Information',
    description: 'Discover evidence-based articles on fitness, nutrition, and mental wellness.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://healthhub-eta.vercel.app',
  },
}

const categories = [
  { name: 'All', slug: 'all', count: articles.length },
  { name: 'Fitness', slug: 'fitness', count: articles.filter(a => a.category === 'Fitness').length },
  { name: 'Nutrition', slug: 'nutrition', count: articles.filter(a => a.category === 'Nutrition').length },
  { name: 'Mental Health', slug: 'mental-health', count: articles.filter(a => a.category === 'Mental Health').length },
]

export default function Home() {
  const featuredArticles = getFeaturedArticles()
  const recentArticles = articles.slice(0, 6)
  const trendingArticles = articles.slice(0, 3)

  return (
    <>
      <Header />
      <Hero />

      <main className="min-h-screen">
        {/* Category Pills */}
        <section className="border-b border-border/50 bg-background/95 sticky top-[73px] z-40 backdrop-blur-md">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              <span className="text-sm font-medium text-muted-foreground mr-2 shrink-0">Filter:</span>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug === 'all' ? '/' : `/category/${cat.slug}`}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    cat.slug === 'all'
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'bg-muted hover:bg-muted/80 text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {cat.name}
                  <span className="ml-1.5 text-xs opacity-70">({cat.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section id="articles" className="container mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-foreground">Editor&apos;s Picks</h2>
                <p className="text-sm text-muted-foreground">Handpicked articles for you</p>
              </div>
            </div>
            <Link 
              href="/"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {/* Featured Article - Large Card */}
          {featuredArticles[0] && (
            <div className="mb-8">
              <ArticleCard {...featuredArticles[0]} featured />
            </div>
          )}

          {/* Secondary Featured Articles */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.slice(1, 4).map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="relative overflow-hidden bg-linear-to-r from-primary/5 via-transparent to-accent/5">
          <div className="container mx-auto max-w-7xl px-4 py-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Trending Now</h2>
                <p className="text-sm text-muted-foreground">Most popular this week</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trendingArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Area with Sidebar */}
        <section className="container mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Column */}
            <div className="lg:col-span-2">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
                  <span className="text-sm text-muted-foreground">({recentArticles.length})</span>
                </div>
                <Link 
                  href="/articles" 
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Articles Grid */}
              <div className="grid gap-5">
                {recentArticles.map((article, idx) => (
                  <div key={article.id}>
                    <Link href={`/article/${article.slug}`} className="group block">
                      <article className="flex gap-5 p-5 rounded-2xl bg-card border border-border hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300">
                        {/* Image */}
                        <div className="hidden sm:block shrink-0 w-40 h-40 rounded-xl overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                              {article.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                            {article.title}
                          </h3>

                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3 grow">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                            <span className="font-medium text-foreground/70">{article.author}</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </article>
                    </Link>

                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-background border-2 border-border font-semibold text-foreground hover:border-primary/50 hover:bg-muted/50 transition-all">
                  Load More Articles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-[140px]">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />

      {/* JSON-LD Website Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'HealthHub',
            description: 'Discover evidence-based health, fitness, nutrition, and mental wellness articles.',
            url: 'https://healthhub-eta.vercel.app',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://healthhub-eta.vercel.app/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
            publisher: {
              '@type': 'Organization',
              name: 'HealthHub',
              logo: {
                '@type': 'ImageObject',
                url: 'https://healthhub-eta.vercel.app/icon.svg',
              },
            },
          }),
        }}
      />
    </>
  )
}
