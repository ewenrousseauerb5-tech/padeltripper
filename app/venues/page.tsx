import type { Metadata } from 'next';
import VenuesPage from '@/src/views/VenuesPage';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'Coaches & Venues',
  description:
    'Discover where Padel Tripper takes place in Alicante: elite coaching at Club Montemar, social games at Bela Padel Center, and 4-star stays at Hotel Alicante Golf.',
  alternates: {
    canonical: '/venues',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/venues`,
    title: 'Coaches & Venues | Padel Tripper',
    description:
      'Explore the training clubs and premium hotel behind the Padel Tripper experience in Alicante.',
    images: [
      {
        url: '/images/venues/Montemar-pistas.jpg',
        width: 1200,
        height: 630,
        alt: 'Padel Tripper coaching courts in Alicante',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaches & Venues | Padel Tripper',
    description:
      'Explore the training clubs and premium hotel behind the Padel Tripper experience in Alicante.',
    images: ['/images/venues/Montemar-pistas.jpg'],
  },
};

export default function Page() {
  const venuesPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Coaches & Venues',
    url: `${SITE_URL}/venues`,
    description:
      'Training clubs, social padel venues and accommodation used by Padel Tripper in Alicante, Spain.',
    about: [
      {
        '@type': 'SportsActivityLocation',
        name: 'Bela Padel Center',
        sport: 'Padel',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Alicante',
          addressCountry: 'ES',
        },
      },
      {
        '@type': 'Hotel',
        name: 'Hotel Alicante Golf',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Alicante',
          addressCountry: 'ES',
        },
      },
      {
        '@type': 'SportsActivityLocation',
        name: 'Padel Tripper training clubs',
        sport: 'Padel',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Alicante',
          addressCountry: 'ES',
        },
      },
    ],
  };

  const venueItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Padel Tripper Alicante venues',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SportsActivityLocation',
          name: 'Padel Tripper training clubs',
          sport: 'Padel',
          description:
            'Curated high-performance padel clubs in Alicante used for technical coaching sessions during Padel Tripper holidays.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Alicante',
            addressCountry: 'ES',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'SportsActivityLocation',
          name: 'Bela Padel Center',
          sport: 'Padel',
          description:
            'Alicante padel venue used by Padel Tripper for social match play and Spanish club atmosphere.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Alicante',
            addressCountry: 'ES',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Hotel',
          name: 'Hotel Alicante Golf',
          description:
            '4-star Alicante hotel used as the accommodation base for Padel Tripper holidays.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Alicante',
            addressCountry: 'ES',
          },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venuesPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueItemListSchema) }}
      />
      <VenuesPage />
    </>
  );
}
