import type { Metadata } from 'next';
import EventsPage from '@/src/views/EventsPage';
import { ALL_EVENTS } from '@/src/data/events';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'Padel Holidays Spain | Dates & Prices',
  description:
    'Browse upcoming padel holiday dates in Spain (Alicante). Premium coaching trips with 4-star hotel stays and limited group places.',
  alternates: {
    canonical: '/events',
  },
  keywords: [
    'padel holidays spain dates',
    'padel holidays spain prices',
    'padel holidays alicante dates',
    'padel retreat dates spain',
  ],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/events`,
    title: 'Padel Holidays Spain | Dates & Prices | Padel Tripper',
    description:
      'Upcoming premium padel holiday dates in Spain (Alicante). Secure your place and request your quotation online.',
    images: [
      {
        url: '/images/post-tournament-celebration.jpg',
        width: 1200,
        height: 630,
        alt: 'Padel Tripper retreat dates and prices in Alicante',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padel Holidays Spain | Dates & Prices | Padel Tripper',
    description:
      'Upcoming premium padel holiday dates in Spain (Alicante). Secure your place and request your quotation online.',
    images: ['/images/post-tournament-celebration.jpg'],
  },
};

export default function Page() {
  const getEndDate = (startDate: string, nights: number) => {
    const date = new Date(`${startDate}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + nights);
    return date.toISOString().slice(0, 10);
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Padel Tripper Retreat Dates',
    itemListElement: ALL_EVENTS.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: event.name || `Padel Retreat Alicante - ${event.date}`,
        description: `Premium padel holiday in Spain (Alicante) (${event.nights} nights) with coaching and 4-star accommodation.`,
        brand: {
          '@type': 'Brand',
          name: 'Padel Tripper',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'GBP',
          price: event.price.replace(/[^\d.]/g, ''),
          availability:
            event.status === 'Sold Out'
              ? 'https://schema.org/OutOfStock'
              : event.status === 'Available'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/LimitedAvailability',
          url: `${SITE_URL}/events#booking`,
        },
      },
    })),
  };

  const sportsEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming Padel Tripper holidays in Alicante',
    itemListElement: ALL_EVENTS.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SportsEvent',
        name: event.name || `Padel holiday in Alicante - ${event.date}`,
        sport: 'Padel',
        startDate: event.startDate,
        endDate: getEndDate(event.startDate, event.nights),
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: event.hotel,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Alicante',
            addressCountry: 'ES',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Padel Tripper',
          url: SITE_URL,
        },
        image: event.image ? `${SITE_URL}${event.image}` : `${SITE_URL}/images/post-tournament-celebration.jpg`,
        description: `Small-group padel holiday in Alicante, Spain with ${event.formatNote || 'coaching and social play'}, accommodation at ${event.hotel}, and local support from Padel Tripper.`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'GBP',
          price: event.price.replace(/[^\d.]/g, ''),
          availability:
            event.status === 'Sold Out'
              ? 'https://schema.org/SoldOut'
              : event.status === 'Available'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/LimitedAvailability',
          url: `${SITE_URL}/events#booking`,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventSchema) }}
      />
      <EventsPage />
    </>
  );
}
