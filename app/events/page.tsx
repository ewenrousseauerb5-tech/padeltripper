import type { Metadata } from 'next';
import EventsPage from '@/src/views/EventsPage';
import { ALL_EVENTS } from '@/src/data/events';

const siteUrl = 'https://padeltripper.com';

export const metadata: Metadata = {
  title: 'Padel Retreat Dates & Prices',
  description:
    'Browse upcoming Padel Tripper retreat dates in Alicante. Premium padel holidays with coaching, 4-star hotel and limited group places.',
  alternates: {
    canonical: '/events',
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/events`,
    title: 'Padel Retreat Dates & Prices | Padel Tripper',
    description:
      'Upcoming premium padel retreat dates in Alicante. Secure your place and request your quotation online.',
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
    title: 'Padel Retreat Dates & Prices | Padel Tripper',
    description:
      'Upcoming premium padel retreat dates in Alicante. Secure your place and request your quotation online.',
    images: ['/images/post-tournament-celebration.jpg'],
  },
};

export default function Page() {
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
        description: `Premium padel retreat in Alicante (${event.nights} nights) with coaching and 4-star accommodation.`,
        brand: {
          '@type': 'Brand',
          name: 'Padel Tripper',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'GBP',
          price: event.price.replace(/[^\d.]/g, ''),
          availability: event.status === 'Available' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
          url: `${siteUrl}/events#booking`,
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
      <EventsPage />
    </>
  );
}
