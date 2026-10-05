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
        name: 'About Us',
        item: `${SITE_URL}/about`,
      },
    ],
  };

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Padel Tripper',
    url: `${SITE_URL}/about`,
    description:
      'The story behind Padel Tripper, a premium padel holiday company built from the Alicante Social Padel community.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Padel Tripper',
      url: SITE_URL,
      foundingLocation: {
        '@type': 'Place',
        name: 'Alicante, Spain',
      },
      description:
        'Padel Tripper organises premium padel holidays in Alicante, Spain, with coaching, social match play, accommodation and local support.',
    },
  };

  const founderSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ollie',
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Padel Tripper',
      url: SITE_URL,
    },
    affiliation: {
      '@type': 'Organization',
      name: 'Alicante Social Padel',
    },
    homeLocation: {
      '@type': 'Place',
      name: 'Alicante, Spain',
    },
    knowsAbout: [
      'padel holidays in Spain',
      'Alicante padel community',
      'padel coaching holidays',
      'social padel events',
      'small-group sports travel',
    ],
    description:
      'Founder of Padel Tripper and Alicante Social Padel, with experience hosting 700+ local padel events and building a 2000-player community in Alicante.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />
      <AboutPage />
    </>
  );
}
