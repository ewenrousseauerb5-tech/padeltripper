import type { Metadata } from 'next';
import HomePage from '@/src/views/HomePage';

const siteUrl = 'https://padeltripper.com';

export const metadata: Metadata = {
  title: 'Premium Padel Retreats in Alicante',
  description:
    'Join premium 4-day padel retreats in Alicante with elite coaching, 4-star accommodation, and curated international groups.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Padel Tripper | Premium Padel Retreats in Alicante',
    description:
      'Elite coaching, premium accommodation, and unforgettable padel retreats in Alicante for international players.',
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
    title: 'Padel Tripper | Premium Padel Retreats in Alicante',
    description:
      'Elite coaching, premium accommodation, and unforgettable padel retreats in Alicante for international players.',
    images: ['/images/hero-padel-camp.jpg'],
  },
};

export default function Page() {
  const sportsActivityHolidaySchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: 'Padel Tripper Retreats - Alicante',
    url: siteUrl,
    sport: 'Padel',
    description:
      'Premium small-group padel retreats in Alicante with professional coaching and 4-star accommodation.',
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
