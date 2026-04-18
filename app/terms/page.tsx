import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Terms of Service | HealthHub',
  description: 'Read HealthHub terms of service and conditions for using our health and wellness content, resources, and website features.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'website terms', 'health content terms'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://healthhub-eta.vercel.app/terms',
  },
  openGraph: {
    title: 'Terms of Service | HealthHub',
    description: 'HealthHub terms and conditions for using our wellness platform.',
    type: 'website',
    url: 'https://healthhub-eta.vercel.app/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <article className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl mb-8">Terms of Service</h1>

          <div className="prose prose-sm max-w-none text-foreground/80 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:leading-relaxed">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using the HealthHub website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on HealthHub for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on HealthHub</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
              The materials on HealthHub are provided on an &apos;as is&apos; basis. HealthHub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2>Limitations</h2>
            <p>
              In no event shall HealthHub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HealthHub.
            </p>

            <h2>Accuracy of Materials</h2>
            <p>
              The materials appearing on HealthHub could include technical, typographical, or photographic errors. HealthHub does not warrant that any of the materials on its website are accurate, complete, or current. HealthHub may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2>Links</h2>
            <p>
              HealthHub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by HealthHub of the site. Use of any such linked website is at the user&apos;s own risk.
            </p>

            <h2>Modifications</h2>
            <p>
              HealthHub may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which HealthHub operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
                item: 'https://healthhub-eta.vercel.app',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Terms of Service',
                item: 'https://healthhub-eta.vercel.app/terms',
              },
            ],
          }),
        }}
      />
    </>
  )
}
