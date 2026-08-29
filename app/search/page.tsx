'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/article-card'
import { Sidebar } from '@/components/sidebar'
import { articles } from '@/lib/articles-data'
import { Search as SearchIcon } from 'lucide-react'

function matchesQuery(article: (typeof articles)[number], query: string) {
  const haystack = [
    article.title,
    article.excerpt,
    article.description,
    article.category,
    ...(article.tags || []),
    ...(article.keywords || []),
  ]
    .join(' ')
    .toLowerCase()

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term))
}

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''
  const [inputValue, setInputValue] = useState(initialQuery)

  const results = useMemo(() => {
    if (!initialQuery.trim()) return []
    return articles.filter((article) => matchesQuery(article, initialQuery))
  }, [initialQuery])

  return (
    <>
      <section className="border-b border-border bg-linear-to-b from-primary/5 via-accent/5 to-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <SearchIcon className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Search</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground md:text-5xl text-balance">
            {initialQuery ? `Results for "${initialQuery}"` : 'Search HealthHub'}
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              const trimmed = inputValue.trim()
              if (trimmed) router.push(`/search?q=${encodeURIComponent(trimmed)}`)
            }}
            className="mt-6 flex max-w-xl gap-2"
          >
            <input
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search articles..."
              className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            />
            <button
              type="submit"
              className="h-12 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Search
            </button>
          </form>

          {initialQuery && (
            <p className="mt-4 text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>
      </section>

      <main>
        <section className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {!initialQuery ? (
                <p className="text-muted-foreground">Enter a search term above to find articles.</p>
              ) : results.length === 0 ? (
                <p className="text-muted-foreground">
                  No articles matched your search. Try a different term or browse{' '}
                  <a href="/articles" className="text-primary hover:underline">
                    all articles
                  </a>
                  .
                </p>
              ) : (
                <div className="grid gap-6">
                  {results.map((article) => (
                    <ArticleCard key={article.id} {...article} />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  )
}
