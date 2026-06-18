import type { Metadata } from 'next';
import PadelHolidaysSpainPage from '@/src/views/PadelHolidaysSpainPage';
import { SITE_URL } from '@/src/lib/seo';
import { padelHolidayFaqs } from '@/src/data/padelHolidaysSpain';

const pageUrl = `${SITE_URL}/padel-holidays-spain`;

export const metadata: Metadata = {
  title: 'Padel Holidays in Spain | Coaching Retreats in Alicante',
  description:
    'Discover premium padel holidays in Spain with Padel Tripper. Join small-group coaching retreats in Alicante with sunshine, 4-star accommodation and international players.',
  alternates: {
    canonical: '/padel-holidays-spain',
  },
  keywords: [
    'padel holidays spain',
    'padel holiday spain',
    'padel camps spain',
    'padel retreat spain',
    'padel coaching holiday spain',
    'padel holidays alicante',
  ],
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Padel Holidays in Spain | Padel Tripper',
    description:
      'World-class padel, coaching, sunshine and international community in Alicante, Spain.',
    images: [
      {
        url: '/images/padel-group-holiday.jpg',
        width: 1200,
        height: 630,
        alt: 'Padel holiday group in Alicante, Spain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padel Holidays in Spain | Padel Tripper',
    description:
      'Premium small-group padel coaching holidays in Alicante, Spain.',
    images: ['/images/padel-group-holiday.jpg'],
  },
};

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: padelHolidayFaqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Padel Holidays in Spain',
        item: pageUrl,
      },
    ],
  };

  const sportsHolidaySchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Padel Holidays in Spain',
    description:
      'Premium small-group padel holidays and coaching retreats in Alicante, Spain, with accommodation, coaching, social padel and local support.',
    url: pageUrl,
    provider: {
      '@type': 'Organization',
      name: 'Padel Tripper',
      url: SITE_URL,
    },
    touristType: ['Padel players', 'Sports travellers', 'Active holiday travellers'],
    itinerary: {
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Arrival and welcome' },
        { '@type': 'ListItem', position: 2, name: 'Padel coaching and social play' },
        { '@type': 'ListItem', position: 3, name: 'Alicante social activities' },
        { '@type': 'ListItem', position: 4, name: 'Final session and departure' },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsHolidaySchema) }}
      />
      <PadelHolidaysSpainPage />
    </>
  );
}
