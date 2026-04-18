import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy | HealthHub',
  description: 'Our privacy policy outlines how we collect, use, and protect your personal information when using HealthHub wellness services.',
  keywords: ['privacy policy', 'data protection', 'personal information', 'cookies', 'GDPR', 'health data privacy'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://healthhub.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | HealthHub',
    description: 'Learn how HealthHub protects your personal information and privacy.',
    type: 'website',
    url: 'https://healthhub.com/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <article className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl mb-8">Privacy Policy</h1>

          <div className="prose prose-sm max-w-none text-foreground/80 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:leading-relaxed">
            <h2>Introduction</h2>
            <p>
              HealthHub (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
            </p>

            <h2>Information Collection and Use</h2>
            <p>
              We collect several different types of information for various purposes to provide and improve our service to you.
            </p>

            <h2>Types of Data Collected</h2>
            <p>
              <strong>Personal Data:</strong> While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&quot;Personal Data&quot;). This may include, but is not limited to:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Cookies and Usage Data</li>
            </ul>

            <h2>Use of Data</h2>
            <p>
              HealthHub uses the collected data for various purposes:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To gather analysis or valuable information</li>
              <li>To monitor the usage of our service</li>
            </ul>

            <h2>Security of Data</h2>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@healthhub.com
            </p>
          </div>
        </article>
      </main>
      <Footer />

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
                item: 'https://healthhub.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Privacy Policy',
                item: 'https://healthhub.com/privacy',
              },
            ],
          }),
        }}
      />
    </>
  )
}
