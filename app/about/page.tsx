import type { Metadata } from 'next';
import AboutPage from '@/src/views/AboutPage';
import { SITE_URL } from '@/src/lib/seo';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the team behind Padel Tripper. Built from a real Alicante padel community with 700+ events hosted and premium retreat experiences.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/about`,
    title: 'About Us | Padel Tripper',
    description:
      'The story behind Padel Tripper and how a local Alicante padel community became premium international trips.',
    images: [
      {
        url: '/images/ollie.jpg',
        width: 1200,
        height: 630,
        alt: 'Ollie founder of Padel Tripper in Alicante',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Padel Tripper',
    description:
      'Built by padel players, for padel players. Meet the team and story behind Padel Tripper.',
    images: ['/images/ollie.jpg'],
  },
};

export default function Page() {
  return <AboutPage />;
}
