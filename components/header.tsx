'use client'

import Link from 'next/link'
import { Search, Menu, X, Zap } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Fitness', href: '/category/fitness' },
  { name: 'Nutrition', href: '/category/nutrition' },
  { name: 'Mental Health', href: '/category/mental-health' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/30 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-18 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                <Zap className="h-6 w-6 fill-current" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-foreground text-xl tracking-tight">
                  HealthHub
                </span>
                <p className="text-[10px] text-muted-foreground -mt-0.5">Evidence-Based Wellness</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-muted/50 rounded-full p-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2.5 text-sm font-semibold transition-all rounded-full ${
                    pathname === item.href
                      ? 'text-primary-foreground bg-primary shadow-md'
                      : 'text-foreground/70 hover:text-foreground hover:bg-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className={`relative hidden sm:block transition-all duration-300 ${searchFocused ? 'w-72' : 'w-48'} lg:w-56`}>
              <input
                type="search"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="h-11 w-full rounded-full border border-border bg-muted/50 px-4 pr-10 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
              />
              <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* Mobile Search & Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              <button 
                className="p-2.5 hover:bg-muted rounded-full transition-colors sm:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 hover:bg-muted rounded-full transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-xl">
            <div className="container mx-auto max-w-7xl px-4 py-4">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-semibold rounded-xl transition-colors ${
                      pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground/70 hover:bg-muted'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-18" />

    </>
  )
}
