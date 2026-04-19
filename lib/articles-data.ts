// Import all articles from individual files
import {
  sleepTipsArticle,
  plantBasedNutritionArticle,
  managingStressArticle,
  homeWorkoutBeginnersArticle,
  hydrationGuideArticle,
  meditationAnxietyArticle,
  wakeUp5am30DaysArticle,
  whyAlwaysTiredArticle,
  morningHabitLongevityArticle,
  quitSugar30DaysArticle,
} from './articles'

export interface Author {
  name: string
  bio: string
  title: string
  image?: string
  social?: {
    twitter?: string
    linkedin?: string
  }
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  description: string
  keywords: string[]
  content: string
  category: 'Fitness' | 'Nutrition' | 'Mental Health'
  author: string
  date: string
  readTime: string
  image: string
  featured?: boolean
  tags?: string[]
  wordCount?: number
  faqs?: { question: string; answer: string }[]
  lastModified?: string
}

export const authors: Record<string, Author> = {
  'Dr. Sarah Mitchell': {
    name: 'Dr. Sarah Mitchell',
    title: 'Sleep Medicine Specialist',
    bio: 'Dr. Sarah Mitchell is a board-certified sleep medicine specialist with over 15 years of experience helping patients improve their sleep quality and overall health through evidence-based treatments.',
    social: {
      twitter: '@drsarahmitchell',
      linkedin: 'dr-sarah-mitchell',
    },
  },
  'Jennifer Lee, RD': {
    name: 'Jennifer Lee, RD',
    title: 'Registered Dietitian & Nutritionist',
    bio: 'Jennifer Lee is a registered dietitian specializing in plant-based nutrition and sustainable eating habits. She helps clients transition to healthier lifestyles through personalized nutrition plans.',
    social: {
      twitter: '@jenniferleerd',
      linkedin: 'jennifer-lee-rd',
    },
  },
  'Dr. Michael Chen': {
    name: 'Dr. Michael Chen',
    title: 'Clinical Psychologist & Stress Management Expert',
    bio: 'Dr. Michael Chen is a licensed clinical psychologist specializing in stress management, anxiety disorders, and cognitive behavioral therapy. He has published numerous research papers on natural stress reduction techniques.',
    social: {
      twitter: '@drmichaelchen',
      linkedin: 'dr-michael-chen',
    },
  },
  'Alex Thompson': {
    name: 'Alex Thompson',
    title: 'Certified Personal Trainer',
    bio: 'Alex Thompson is a certified personal trainer and fitness coach with expertise in bodyweight training, home workouts, and helping beginners build sustainable exercise habits.',
    social: {
      twitter: '@alexthompsonfit',
      linkedin: 'alex-thompson-fitness',
    },
  },
  'Dr. Emma Wilson': {
    name: 'Dr. Emma Wilson',
    title: 'Nutrition Scientist & Hydration Expert',
    bio: 'Dr. Emma Wilson holds a PhD in nutrition science and has spent over a decade researching the effects of hydration on human performance, cognitive function, and overall health.',
    social: {
      twitter: '@dremmawilson',
      linkedin: 'dr-emma-wilson',
    },
  },
  'Dr. Lisa Park': {
    name: 'Dr. Lisa Park',
    title: 'Meditation & Mindfulness Instructor',
    bio: 'Dr. Lisa Park is a meditation teacher and clinical psychologist who specializes in using mindfulness-based interventions for anxiety, depression, and stress management.',
    social: {
      twitter: '@drlisapark',
      linkedin: 'dr-lisa-park',
    },
  },
  'Sarah Thompson': {
    name: 'Sarah Thompson',
    title: 'Health & Wellness Writer',
    bio: 'Sarah Thompson is a health and wellness writer who documents her personal experiments with lifestyle changes, sharing honest, research-backed insights from her own health journey.',
    social: {
      twitter: '@sarahthompsonhw',
      linkedin: 'sarah-thompson-wellness',
    },
  },
  'Jennifer Walsh': {
    name: 'Jennifer Walsh',
    title: 'Longevity Researcher & Health Writer',
    bio: 'Jennifer Walsh specializes in translating longevity research into practical, actionable advice. She focuses on evidence-based strategies for extending healthspan and improving quality of life.',
    social: {
      twitter: '@jenniferwalsh',
      linkedin: 'jennifer-walsh-health',
    },
  },
}

// Articles are now stored in individual files in the ./articles/ directory
export const articles: Article[] = [
  sleepTipsArticle,
  plantBasedNutritionArticle,
  managingStressArticle,
  homeWorkoutBeginnersArticle,
  hydrationGuideArticle,
  meditationAnxietyArticle,
  wakeUp5am30DaysArticle,
  whyAlwaysTiredArticle,
  morningHabitLongevityArticle,
  quitSugar30DaysArticle,
]

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

export function getAllSlugs(): string[] {
  return articles.map(article => article.slug)
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category)
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured).slice(0, 3)
}

export function getRelatedArticles(articleId: string, limit: number = 3): Article[] {
  const article = getArticleById(articleId)
  if (!article) return []
  
  return articles
    .filter(a => a.id !== articleId && a.category === article.category)
    .slice(0, limit)
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter(article => 
    article.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const allTags = articles.flatMap(article => article.tags || [])
  return [...new Set(allTags.map(tag => tag.toLowerCase()))].sort()
}

export function getAuthorByName(name: string): Author | undefined {
  return authors[name]
}

export function getAllAuthors(): Author[] {
  return Object.values(authors)
}

export function calculateReadingTime(wordCount: number): string {
  const wordsPerMinute = 200
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}
