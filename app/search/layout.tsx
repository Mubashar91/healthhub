export const metadata = {
  title: 'Search | HealthHub',
  description: 'Search HealthHub for evidence-based articles on fitness, nutrition, and mental wellness.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://healthhub-eta.vercel.app/search',
  },
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
