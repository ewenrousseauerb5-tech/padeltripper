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
        name: 'Partners',
        item: `${SITE_URL}/partners`,
      },
    ],
  };

  const partnerPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Partner With Padel Tripper',
    url: `${SITE_URL}/partners`,
    description:
      'Partner information for coaches, clubs and connected players who want to introduce their communities to Padel Tripper holidays.',
    about: {
      '@type': 'Organization',
      name: 'Padel Tripper',
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerPageSchema) }}
      />
      <PartnersPage />
    </>
  );
}
