import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Medical Disclaimer | HealthHub',
  description: 'Important medical disclaimer regarding health information on HealthHub. Read our terms for using health and wellness content.',
  keywords: ['medical disclaimer', 'health disclaimer', 'terms of use', 'medical advice', 'health information'],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://healthhub-eta.vercel.app/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main>
        <article className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="mb-8 flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-6">
            <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-red-900">Medical Disclaimer</h2>
              <p className="mt-2 text-sm text-red-800">
                Please read this disclaimer carefully. The information on HealthHub is not a substitute for professional medical advice.
              </p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-foreground/80 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:leading-relaxed">
            <h2>No Professional Advice</h2>
            <p>
              The content, information, and materials on HealthHub are provided for educational and informational purposes only and not for diagnosing or treating a health problem or disease. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>

            <h2>Not Medical Professionals</h2>
            <p>
              Our contributors and authors are not medical professionals, and the articles published on HealthHub represent their personal research and opinions. The articles are not intended to replace medical advice from a licensed healthcare provider.
            </p>

            <h2>No Liability</h2>
            <p>
              Never disregard professional medical advice or delay in seeking it because of something you have read on HealthHub. If you think you may have a medical emergency, call your doctor or emergency services immediately. HealthHub does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the site.
            </p>

            <h2>Individual Differences</h2>
            <p>
              Individual health outcomes vary from person to person. What works for one person may not work for another. Our articles provide general health information based on research and expert opinions, but they do not account for your individual medical history, current medications, or specific health conditions.
            </p>

            <h2>Accuracy and Updates</h2>
            <p>
              While we strive to provide accurate and up-to-date health information, the field of medicine is constantly evolving. Health recommendations may change based on new research. HealthHub does not guarantee the accuracy, completeness, or timeliness of any information on the site.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              HealthHub may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of these external sites. Accessing third-party websites is at your own risk.
            </p>

            <h2>When to Seek Professional Help</h2>
            <p>
              You should consult with a healthcare professional if you:
            </p>
            <ul className="list-disc ml-6 mb-4">
              <li>Experience unusual symptoms or health changes</li>
              <li>Have concerns about your current health condition</li>
              <li>Are considering starting a new exercise or diet regimen</li>
              <li>Are taking medications and considering supplements</li>
              <li>Have a family history of health conditions</li>
              <li>Are pregnant, nursing, or planning to become pregnant</li>
            </ul>

            <h2>Contact Your Healthcare Provider</h2>
            <p>
              If you have any specific health concerns or questions, please consult with a qualified healthcare professional. You can find healthcare providers through your insurance provider, local hospital, or by visiting your primary care physician.
            </p>

            <h2>Agreement</h2>
            <p>
              By accessing and using HealthHub, you agree that you have read and understood this disclaimer and that you will not hold HealthHub, its authors, contributors, or anyone associated with the site liable for any health outcomes related to information found on the site.
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
                name: 'Medical Disclaimer',
                item: 'https://healthhub-eta.vercel.app/disclaimer',
              },
            ],
          }),
        }}
      />
    </>
  )
}
