import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://healthhub-eta.vercel.app'),
  title: {
    default: 'HealthHub | Evidence-Based Wellness, Fitness & Health Articles',
    template: '%s | HealthHub',
  },
  description: 'Discover expert-reviewed health articles on fitness, nutrition, mental wellness & sleep. Evidence-based tips to transform your health and live better.',
  keywords: ['health', 'wellness', 'fitness', 'nutrition', 'mental health', 'lifestyle', 'exercise', 'diet', 'meditation'],
  authors: [{ name: 'HealthHub Team' }],
  creator: 'HealthHub',
  publisher: 'HealthHub',
  generator: 'Next.js',
  applicationName: 'HealthHub',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://healthhub-eta.vercel.app',
    siteName: 'HealthHub',
    title: 'HealthHub | Evidence-Based Wellness, Fitness & Health Articles',
    description: 'Discover expert-reviewed health articles on fitness, nutrition, mental wellness & sleep.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HealthHub - Evidence-Based Wellness & Health Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@healthhub',
    creator: '@healthhub',
    title: 'HealthHub | Evidence-Based Wellness, Fitness & Health Articles',
    description: 'Discover expert-reviewed health articles on fitness, nutrition, mental wellness & sleep.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://healthhub-eta.vercel.app',
    languages: {
      'en-US': 'https://healthhub-eta.vercel.app',
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon-light-32x32.png',
  },
  manifest: '/manifest.json',
  category: 'health',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Google tag (gtag.js) - GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G92RECTKY3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G92RECTKY3');
            `,
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8497285724891966"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        
        {/* Structured Data - Moved to body to avoid hydration issues */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HealthHub',
              url: 'https://healthhub-eta.vercel.app',
              logo: 'https://healthhub-eta.vercel.app/icon.svg',
              description: 'Your trusted source for evidence-based health and wellness information.',
              sameAs: [
                'https://twitter.com/healthhub',
                'https://facebook.com/healthhub',
                'https://instagram.com/healthhub',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@healthhub.com',
                contactType: 'customer service',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthAndBeautyBusiness',
              name: 'HealthHub',
              url: 'https://healthhub-eta.vercel.app',
              logo: 'https://healthhub-eta.vercel.app/icon.svg',
              description: 'Your trusted source for evidence-based health and wellness information.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Wellness Street',
                addressLocality: 'San Francisco',
                addressRegion: 'CA',
                postalCode: '94102',
                addressCountry: 'US',
              },
              telephone: '+1-415-555-0123',
              email: 'hello@healthhub.com',
              openingHours: 'Mo-Fr 09:00-18:00',
              sameAs: [
                'https://twitter.com/healthhub',
                'https://facebook.com/healthhub',
                'https://instagram.com/healthhub',
              ],
              priceRange: '$$',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'HealthHub',
              url: 'https://healthhub-eta.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://healthhub-eta.vercel.app/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
