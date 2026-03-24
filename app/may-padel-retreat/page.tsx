import type { Metadata } from 'next';
import MayEventsLandingPage from '@/src/views/MayEventsLandingPage';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'May Padel Retreat Voucher',
  description:
    'Book your May Padel Tripper retreat in Alicante. Premium coaching, social match play, 4-star hotel with B&B, and limited spaces.',
  alternates: {
    canonical: '/may-padel-retreat',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/may-padel-retreat`,
    title: 'May Padel Retreat Voucher | Padel Tripper',
    description:
      'Two premium May dates in Alicante with coaching, social play and 4-star accommodation.',
    images: [
      {
        url: '/images/group-bela-court.jpg',
        width: 1200,
        height: 630,
        alt: 'Padel Tripper May retreat in Alicante',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'May Padel Retreat Voucher | Padel Tripper',
    description:
      'Two premium May dates in Alicante with coaching, social play and 4-star accommodation.',
    images: ['/images/group-bela-court.jpg'],
  },
};

export default function Page() {
  return <MayEventsLandingPage />;
}
