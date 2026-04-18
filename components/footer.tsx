import Link from 'next/link'
import { Heart, Twitter, Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Youtube', icon: Youtube, href: '#' },
  ]

  const categories = [
    { name: 'Fitness', href: '/category/fitness', count: 4 },
    { name: 'Nutrition', href: '/category/nutrition', count: 2 },
    { name: 'Mental Health', href: '/category/mental-health', count: 2 },
  ]

  const company = [
    { name: 'Home', href: '/' },
    { name: 'Fitness', href: '/category/fitness' },
    { name: 'Nutrition', href: '/category/nutrition' },
    { name: 'Mental Health', href: '/category/mental-health' },
  ]

  const legal = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Medical Disclaimer', href: '/disclaimer' },
    { name: 'Sitemap', href: '/sitemap.xml' },
  ]

  return (
    <footer className="border-t border-border bg-linear-to-b from-card to-muted/30">
{/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
                <span className="text-xl font-bold">H</span>
              </div>
              <div>
                <span className="font-bold text-foreground text-lg">HealthHub</span>
                <p className="text-xs text-muted-foreground">Evidence-Based Wellness</p>
              </div>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed mb-6 max-w-sm">
              Your trusted source for evidence-based health and wellness information. 
              We help you live a healthier, happier life through expert-backed articles.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2.5 rounded-xl bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    {cat.name}
                    <span className="text-xs text-muted-foreground">({cat.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5 mb-6">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span className="font-mono">hello[at]healthhub[dot]com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>+1 (415) 555-0123</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>123 Wellness Street<br />San Francisco, CA 94102</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} HealthHub. All rights reserved. 
            <span className="hidden md:inline"> Made with </span>
            <Heart className="h-4 w-4 text-red-500 inline md:hidden" />
            <span className="hidden md:inline"> for your health </span>
            <Heart className="h-4 w-4 text-red-500 inline mx-1" />
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</Link>
            <span className="text-border">|</span>
            <span className="text-muted-foreground">Health & Wellness Resources</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
