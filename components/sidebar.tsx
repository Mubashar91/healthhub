'use client'

import Link from 'next/link'
import { Search, TrendingUp, Flame, Bookmark, Clock } from 'lucide-react'

interface PopularPost {
  id: string
  slug: string
  title: string
  views: number
  image?: string
}

const popularPosts: PopularPost[] = [
  { id: '1', slug: '10-science-backed-sleep-tips-for-better-rest', title: '10 Science-Backed Sleep Tips for Better Rest', views: 3205 },
  { id: '2', slug: 'complete-plant-based-nutrition-guide', title: 'Complete Plant-Based Nutrition Guide', views: 2840 },
  { id: '3', slug: 'managing-stress-naturally-without-medication', title: 'Managing Stress Naturally: Expert Tips', views: 2456 },
  { id: '4', slug: 'home-workout-routines-for-beginners', title: '15-Minute Home Workout Routines', views: 1923 },
  { id: '5', slug: 'hydration-the-foundation-of-good-health', title: 'Hydration & Health: The Complete Guide', views: 1654 },
]

const categories = [
  { name: 'Fitness', href: '/category/fitness', icon: '💪', count: 4 },
  { name: 'Nutrition', href: '/category/nutrition', icon: '🥗', count: 2 },
  { name: 'Mental Health', href: '/category/mental-health', icon: '🧠', count: 2 },
]

export function Sidebar() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Search Widget */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold text-foreground flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          Search Articles
        </h3>
        <div className="relative">
          <input
            type="search"
            placeholder="Find health tips..."
            className="h-11 w-full rounded-xl border border-input bg-background px-4 pr-10 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

{/* Popular Posts - Trending */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-bold text-foreground">Trending Now</h3>
        </div>
        <ul className="space-y-4">
          {popularPosts.map((post, idx) => (
            <li key={post.id} className="group">
              <Link
                href={`/article/${post.slug}`}
                className="flex items-start gap-3 text-sm transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-primary/20 to-primary/10 text-xs font-bold text-primary shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="leading-snug text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 font-medium">
                    {post.title}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {post.views.toLocaleString()} views
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-4 text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
          View all articles
          <TrendingUp className="h-3 w-3" />
        </Link>
      </div>

      {/* Categories with Counts */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 font-bold text-foreground flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-primary" />
          Browse by Category
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground/70 transition-all hover:bg-primary/5 hover:text-primary group"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

{/* Quick Links */}
      <div className="rounded-2xl border border-border bg-linear-to-br from-muted/50 to-background p-6">
        <h3 className="mb-4 font-bold text-foreground text-sm flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Quick Links
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/disclaimer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Disclaimer
          </Link>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </aside>
  )
}
