'use client'

import { Mail, Sparkles, Check } from 'lucide-react'
import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-r from-primary/5 via-accent/5 to-primary/5 py-12 md:py-16 border-y border-border/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 md:p-12 shadow-xl">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>

              {/* Content */}
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Join 10,000+ subscribers</span>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>

              <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-3">
                Get Health Tips Weekly
              </h2>
              <p className="text-foreground/70 max-w-md mb-6">
                Subscribe to receive the latest wellness articles, expert insights, 
                and healthy living tips delivered straight to your inbox.
              </p>

              {/* Newsletter Form */}
              {subscribed ? (
                <div className="flex items-center gap-2 text-primary font-medium py-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>Thanks for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="h-12 flex-1 rounded-xl border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    <button
                      type="submit"
                      className="h-12 inline-flex items-center justify-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20 whitespace-nowrap hover:scale-105 active:scale-95"
                    >
                      Subscribe Free
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
