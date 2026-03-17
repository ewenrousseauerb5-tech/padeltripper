import type { Metadata } from 'next';
import TailoredEventsPage from '@/src/views/TailoredEventsPage';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'Tailored Padel Events',
  description:
    'Design your own tailored Padel Tripper experience in Alicante. Ideal for private groups, clubs, celebrations and bespoke padel getaways.',
  alternates: {
    canonical: '/tailored-events',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/tailored-events`,
    title: 'Tailored Padel Events | Padel Tripper',
    description:
      'Create your custom Padel Tripper holiday with coaching, social play and tailored group options in Alicante.',
    images: [
      {
        url: '/images/padel-coaching-session.jpg',
        width: 1200,
        height: 630,
        alt: 'Tailored padel trip experience in Alicante',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tailored Padel Events | Padel Tripper',
    description:
      'Create your custom Padel Tripper holiday with coaching, social play and tailored group options in Alicante.',
    images: ['/images/padel-coaching-session.jpg'],
  },
};

export default function Page() {
  return <TailoredEventsPage />;
}
