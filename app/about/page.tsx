import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getAllAuthors } from '@/lib/articles-data'
import { User, Award, BookOpen, Heart, Shield, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'About Us | HealthHub - Your Trusted Health Resource',
  description: 'Learn about HealthHub\'s mission to provide evidence-based health, wellness, and fitness information. Meet our team of experts and understand our editorial standards.',
  keywords: ['about healthhub', 'healthhub team', 'health experts', 'medical writers', 'health editorial', 'wellness experts'],
  openGraph: {
    title: 'About Us | HealthHub',
    description: 'Your trusted source for evidence-based health and wellness information.',
    url: 'https://healthhub-eta.vercel.app/about',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://healthhub-eta.vercel.app/about',
  },
}

export default function AboutPage() {
  const authors = getAllAuthors()

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="border-b border-border bg-linear-to-b from-primary/5 via-accent/5 to-background py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Your Trusted Health Resource
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Evidence-based wellness information reviewed by medical professionals. 
              We make complex health science accessible to everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Mission</h2>
            <div className="prose prose-lg max-w-none text-foreground/80">
              <p className="text-lg leading-relaxed mb-6">
                HealthHub was founded with a simple mission: to make reliable, evidence-based health information 
                accessible to everyone. In a world of conflicting health advice and wellness trends, we stand 
                as a beacon of scientific accuracy and transparency.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We believe that good health shouldn\'t be complicated or expensive. Our articles break down 
                complex medical research into practical, actionable advice that you can implement in your 
                daily life. Every piece of content is reviewed by qualified healthcare professionals to 
                ensure accuracy and safety.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Editorial Standards</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Evidence-Based</h3>
                <p className="text-foreground/70">
                  Every article is grounded in peer-reviewed research and scientific evidence. 
                  We cite our sources and link to original studies.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Expert Reviewed</h3>
                <p className="text-foreground/70">
                  Content is written by health professionals and reviewed by subject matter experts 
                  to ensure accuracy and relevance.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Reader First</h3>
                <p className="text-foreground/70">
                  We prioritize your wellbeing. No clickbait, no pseudoscience—just honest, 
                  practical health guidance you can trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Meet Our Experts</h2>
            <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-12">
              Our content is created and reviewed by qualified healthcare professionals, 
              registered dietitians, certified trainers, and medical researchers.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author) => (
                <div key={author.name} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{author.name}</h3>
                      <p className="text-sm text-primary font-medium">{author.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-foreground/70 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-foreground/70">Expert Articles</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">8</div>
                <p className="text-foreground/70">Health Experts</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <p className="text-foreground/70">Categories</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <p className="text-foreground/70">Monthly Readers</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Start Your Health Journey</h2>
            <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
              Explore our evidence-based articles and take the first step toward better health.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Browse Articles
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* AboutPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About HealthHub',
            description: 'Learn about HealthHub\'s mission and team of health experts.',
            url: 'https://healthhub-eta.vercel.app/about',
            mainEntity: {
              '@type': 'Organization',
              name: 'HealthHub',
              url: 'https://healthhub-eta.vercel.app',
              logo: 'https://healthhub-eta.vercel.app/icon.svg',
              description: 'Evidence-based health and wellness information.',
              member: authors.map((author) => ({
                '@type': 'Person',
                name: author.name,
                jobTitle: author.title,
                description: author.bio,
              })),
            },
          }),
        }}
      />
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
                name: 'About Us',
                item: 'https://healthhub-eta.vercel.app/about',
              },
            ],
          }),
        }}
      />
    </>
  )
}
