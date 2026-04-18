import Link from 'next/link'
import { Clock, User, ArrowUpRight } from 'lucide-react'

interface ArticleCardProps {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image?: string
  featured?: boolean
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Fitness': { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20' },
  'Nutrition': { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20' },
  'Mental Health': { bg: 'bg-violet-500/10', text: 'text-violet-600', border: 'border-violet-500/20' },
}

export function ArticleCard({
  id,
  slug,
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  image,
  featured = false,
}: ArticleCardProps) {
  const colors = categoryColors[category] || { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' }

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
        <Link href={`/article/${slug}`} className="block">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:via-transparent md:to-card/90" />
              <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border} backdrop-blur-sm`}>
                {category}
              </span>
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {readTime}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span>{date}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                {title}
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">{author}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  Read Article
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
      <Link href={`/article/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge - Overlaid on Image */}
          <span className={`absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${colors.bg} ${colors.text} border ${colors.border} backdrop-blur-md shadow-sm`}>
            {category}
          </span>

          {/* Read Time Badge */}
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-black/50 text-white backdrop-blur-md">
            <Clock className="h-3 w-3" />
            {readTime}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground/70">{author}</span>
            </div>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
