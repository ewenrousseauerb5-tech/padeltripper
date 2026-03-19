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
  return <VenuesPage />;
}
