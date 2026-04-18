'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Play, Star, Heart, Brain, Dumbbell, Apple } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const floatingCards = [
    { icon: Heart, label: 'Wellness', color: 'text-rose-500', bg: 'bg-rose-500/10', delay: '0s' },
    { icon: Brain, label: 'Mental', color: 'text-violet-500', bg: 'bg-violet-500/10', delay: '0.5s' },
    { icon: Dumbbell, label: 'Fitness', color: 'text-orange-500', bg: 'bg-orange-500/10', delay: '1s' },
    { icon: Apple, label: 'Nutrition', color: 'text-emerald-500', bg: 'bg-emerald-500/10', delay: '1.5s' },
  ]

  return (
    <section className="relative overflow-hidden bg-background min-h-[90vh] flex items-center">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-accent/15 rounded-full blur-[150px] animate-pulse delay-700" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-xl border border-primary/20 px-5 py-2.5 mb-6 shadow-xl shadow-primary/10">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-bold text-foreground">Trusted by 50,000+ health enthusiasts</span>
              <Sparkles className="h-4 w-4 text-accent" />
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-balance leading-[1.05] mb-6">
              <span className="text-foreground">Transform</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-600 to-accent">
                Your Life
              </span>
              <br />
              <span className="text-foreground">Today</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Expert-backed wellness insights for fitness, nutrition, and mental clarity. Start your journey to a healthier you.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="#articles"
                className="group relative inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 font-bold text-lg text-primary-foreground transition-all hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Explore Articles</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                <div className="absolute inset-0 bg-linear-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/category/fitness"
                className="group inline-flex items-center gap-2 rounded-2xl border-2 border-border bg-white/80 backdrop-blur-xl px-8 py-4 font-bold text-lg text-foreground transition-all hover:bg-white hover:border-primary/30 hover:shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary fill-primary" />
                </div>
                Watch Intro
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8">
              {[
                { value: '200+', label: 'Articles' },
                { value: '50K+', label: 'Readers' },
                { value: '4.9', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className={`relative h-[500px] hidden lg:block transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {floatingCards.map((card, index) => {
              const Icon = card.icon
              const positions = [
                { top: '5%', left: '10%' },
                { top: '15%', right: '5%' },
                { bottom: '25%', left: '5%' },
                { bottom: '10%', right: '15%' },
              ]
              const pos = positions[index]
              
              return (
                <div
                  key={card.label}
                  className="absolute glass-card p-4 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/50 shadow-2xl animate-float"
                  style={{
                    ...pos,
                    animationDelay: card.delay,
                    animation: `float 6s ease-in-out infinite`,
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-2`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <span className="text-sm font-bold text-foreground">{card.label}</span>
                </div>
              )
            })}

            {/* Center Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop"
                alt="Person practicing yoga meditation for wellness and mental health"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
