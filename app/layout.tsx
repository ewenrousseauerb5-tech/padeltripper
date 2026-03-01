import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import CookieBanner from '@/src/components/CookieBanner';
import './globals.css';

const siteUrl = 'https://padeltripper.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Padel Tripper | Premium Padel Retreats in Alicante',
    template: '%s | Padel Tripper',
  },
  description:
    'Premium padel retreats in Alicante with world-class coaching, 4-star hotel stays, and curated small groups for international players.',
  applicationName: 'Padel Tripper',
  keywords: [
    'padel retreat spain',
    'padel holiday alicante',
    'premium padel camp',
    'padel trip spain',
    'padel training camp',
    'uk padel holiday',
    'padel holiday netherlands',
    'padel holiday germany',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
      en: '/',
      'en-GB': '/',
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/images/logos/logo-square.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
    shortcut: ['/icon.png'],
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Padel Tripper',
    title: 'Padel Tripper | Premium Padel Retreats in Alicante',
    description:
      'Premium padel retreats in Alicante with world-class coaching, 4-star hotel stays, and curated small groups.',
    images: [
      {
        url: '/images/hero-padel-camp.jpg',
        width: 1200,
        height: 630,
        alt: 'Padel Tripper premium padel retreat in Alicante',
      },
    ],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padel Tripper | Premium Padel Retreats in Alicante',
    description:
      'Premium padel retreats in Alicante with world-class coaching, 4-star hotel stays, and curated small groups.',
    images: ['/images/hero-padel-camp.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Padel Tripper',
    url: siteUrl,
    logo: `${siteUrl}/images/logos/logo-landscape.png`,
    email: '[email protected]',
    telephone: '+44 7793 9870682',
    sameAs: ['https://www.instagram.com/padeltripper/'],
    areaServed: ['GB', 'NL', 'DE', 'ES', 'EU'],
    description:
      'Padel Tripper organizes premium padel retreats in Alicante for international players.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Padel Tripper',
    url: siteUrl,
    inLanguage: 'en',
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <div className="min-h-screen bg-white font-sans text-brand-dark">
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}
