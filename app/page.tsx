import type { Metadata } from 'next';
import HomePage from '@/src/views/HomePage';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'Padel Holidays in Spain (Alicante)',
  description:
    'Join premium 4-day padel holidays in Spain, based in Alicante, with elite coaching, 4-star accommodation, and curated international groups.',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'padel holidays spain',
    'padel holidays in spain',
    'padel holidays alicante',
    'padel camp spain',
    'padel retreat alicante',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Padel Tripper | Padel Holidays in Spain (Alicante)',
    description:
      'Elite coaching, 4-star accommodation, and unforgettable padel holidays in Spain from Alicante.',
    images: [
      {
        url: '/images/hero-padel-camp.jpg',
        width: 1200,
        height: 630,
        alt: 'Premium padel retreat in Alicante',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padel Tripper | Padel Holidays in Spain (Alicante)',
    description:
      'Elite coaching, 4-star accommodation, and unforgettable padel holidays in Spain from Alicante.',
    images: ['/images/hero-padel-camp.jpg'],
  },
};

export default function Page() {
  const sportsActivityHolidaySchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Padel Tripper Retreats - Alicante',
    url: SITE_URL,
    sport: 'Padel',
    description:
      'Premium small-group padel holidays in Spain, based in Alicante, with professional coaching and 4-star accommodation.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Alicante',
      addressCountry: 'ES',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsActivityHolidaySchema) }}
      />
      <HomePage />
    </>
  );
}
