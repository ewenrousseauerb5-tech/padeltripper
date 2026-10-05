import type { Metadata } from 'next';
import PadelHolidaysSpainPage from '@/src/views/PadelHolidaysSpainPage';
import { SITE_URL } from '@/src/lib/seo';
import { padelHolidayFaqs } from '@/src/data/padelHolidaysSpain';

const pageUrl = `${SITE_URL}/padel-holidays-spain`;

export const metadata: Metadata = {
  title: 'Padel Holidays Spain | Coaching, Accommodation & Events in Alicante',
  description:
    'Join premium padel holidays in Spain. Coaching, accommodation, sunshine and an international community in Alicante. View upcoming trips.',
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
    title: 'Padel Holidays Spain | Coaching, Accommodation & Events in Alicante',
    description:
      'Join premium padel holidays in Spain. Coaching, accommodation, sunshine and an international community in Alicante. View upcoming trips.',
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
    title: 'Padel Holidays Spain | Coaching, Accommodation & Events in Alicante',
    description:
      'Join premium padel holidays in Spain. Coaching, accommodation, sunshine and an international community in Alicante. View upcoming trips.',
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
    areaServed: {
      '@type': 'Place',
      name: 'Alicante, Spain',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: '545',
      highPrice: '845',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/events`,
    },
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

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Padel holidays and coaching retreats in Spain',
    serviceType: 'Padel holiday',
    provider: {
      '@type': 'Organization',
      name: 'Padel Tripper',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Alicante',
      containedInPlace: {
        '@type': 'Country',
        name: 'Spain',
      },
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Padel players, solo travellers, couples and small groups',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Padel Tripper room options',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Shared room padel holiday',
          priceCurrency: 'GBP',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '545',
            maxPrice: '645',
            priceCurrency: 'GBP',
          },
          url: `${SITE_URL}/events`,
        },
        {
          '@type': 'Offer',
          name: 'Private room padel holiday',
          priceCurrency: 'GBP',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '745',
            maxPrice: '845',
            priceCurrency: 'GBP',
          },
          url: `${SITE_URL}/events`,
        },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PadelHolidaysSpainPage />
    </>
  );
}
