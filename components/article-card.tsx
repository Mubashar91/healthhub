import Link from 'next/link'
import { Clock, User, ArrowUpRight, Dumbbell, Apple, Brain, Sparkles } from 'lucide-react'

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
  template?: string
}

const categoryConfig: Record<string, { 
  bg: string
  text: string
  border: string
  gradient: string
  icon: React.ReactNode
}> = {
  'Fitness': { 
    bg: 'bg-emerald-500/15', 
    text: 'text-emerald-600', 
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-500/20 to-emerald-900/40',
    icon: <Dumbbell className="h-3 w-3" />
  },
  'Nutrition': { 
    bg: 'bg-amber-500/15', 
    text: 'text-amber-600', 
    border: 'border-amber-500/30',
    gradient: 'from-amber-500/20 to-amber-900/40',
    icon: <Apple className="h-3 w-3" />
  },
  'Mental Health': { 
    bg: 'bg-violet-500/15', 
    text: 'text-violet-600', 
    border: 'border-violet-500/30',
    gradient: 'from-violet-500/20 to-violet-900/40',
    icon: <Brain className="h-3 w-3" />
  },
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
  template,
}: ArticleCardProps) {
  const config = categoryConfig[category] || { 
    bg: 'bg-primary/15', 
    text: 'text-primary', 
    border: 'border-primary/30',
    gradient: 'from-primary/20 to-primary-900/40',
    icon: <Sparkles className="h-3 w-3" />
  }

  // Check if this is a challenge-style article
  const isChallenge = template === 'challenge'

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30">
        <Link href={`/article/${slug}`} className="block">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card" />
              
              {/* Category Badge */}
              <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${config.bg} ${config.text} border ${config.border} backdrop-blur-md shadow-lg`}>
                {config.icon}
                {category}
              </span>

              {/* Challenge Badge */}
              {isChallenge && (
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  30-Day Challenge
                </span>
              )}
            </div>

            {/* Content Side */}
            <div className="p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-card to-muted/30">
              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1 bg-muted/80 px-2 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  {readTime}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>{date}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                {title}
              </h2>

              {/* Excerpt */}
              <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                {excerpt}
              </p>

              {/* Author + CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center border border-emerald-500/20">
                    <User className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">{author}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
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
    <article className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 hover:-translate-y-1.5">
      <Link href={`/article/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Gradient Overlay - Always visible at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text} border ${config.border} backdrop-blur-md shadow-md`}>
            {config.icon}
            {category}
          </span>

          {/* Challenge Badge */}
          {isChallenge && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
              <Sparkles className="h-3 w-3" />
              Challenge
            </span>
          )}

          {/* Read Time - Bottom overlay */}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md">
            <Clock className="h-3 w-3" />
            {readTime}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 bg-gradient-to-b from-card to-muted/20">
          {/* Title with better typography */}
          <h3 className="text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2 tracking-tight">
            {title}
          </h3>

          {/* Excerpt - shorter and cleaner */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {excerpt}
          </p>

          {/* Footer - More modern */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border">
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground/70 truncate max-w-[100px]">{author}</span>
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {date}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
