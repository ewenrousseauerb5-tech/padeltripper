import type { Metadata } from 'next';
import PartnersPage from '@/src/views/PartnersPage';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'Partner With Us',
  description:
    'Become a Padel Tripper partner. Coaches, club managers and connected players can earn commission and unlock exclusive offers for their community.',
  alternates: {
    canonical: '/partners',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/partners`,
    title: 'Partner With Us | Padel Tripper',
    description:
      'Join the Padel Tripper partner network and earn commission while bringing premium Alicante trips to your community.',
    images: [
      {
        url: '/images/group-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Padel Tripper partner community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner With Us | Padel Tripper',
    description:
      'Partner with Padel Tripper and bring premium padel experiences to your community.',
    images: ['/images/group-photo.jpg'],
  },
};

export default function Page() {
  return <PartnersPage />;
}
