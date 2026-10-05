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
        name: 'Tailored Events',
        item: `${SITE_URL}/tailored-events`,
      },
    ],
  };

  const tailoredServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tailored padel events in Alicante',
    serviceType: 'Tailored padel holiday',
    url: `${SITE_URL}/tailored-events`,
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
      audienceType: 'Private groups, clubs, coaches, celebrations and corporate groups',
    },
    description:
      'Bespoke padel trips in Alicante with coaching, social play, accommodation and group support for private groups and communities.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tailoredServiceSchema) }}
      />
      <TailoredEventsPage />
    </>
  );
}
