import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import Script from 'next/script';
import AppShell from '@/src/components/AppShell';
import { SITE_URL } from '@/src/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Padel Tripper | Padel Holidays in Spain (Alicante)',
    template: '%s | Padel Tripper',
  },
  description:
    'Premium padel holidays in Spain, based in Alicante. World-class coaching, 4-star hotel stays, and curated small groups for international players.',
  applicationName: 'Padel Tripper',
  keywords: [
    'padel holidays spain',
    'padel holidays in spain',
    'padel camp spain',
    'padel retreats spain',
    'padel trip spain',
    'padel holiday spain',
    'padel retreat spain',
    'padel holiday alicante',
    'padel holidays alicante',
    'padel camps alicante',
    'premium padel camp',
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
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
    shortcut: ['/favicon-48x48.png'],
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Padel Tripper',
    title: 'Padel Tripper | Padel Holidays in Spain (Alicante)',
    description:
      'Premium padel holidays in Spain, based in Alicante, with world-class coaching and curated small groups.',
    images: [
      {
        url: '/images/tournament-oct-24.jpg',
        width: 1200,
        height: 630,
        alt: 'Padel Tripper group experience in Alicante',
      },
    ],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padel Tripper | Padel Holidays in Spain (Alicante)',
    description:
      'Premium padel holidays in Spain, based in Alicante, with world-class coaching and curated small groups.',
    images: ['/images/tournament-oct-24.jpg'],
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
    url: SITE_URL,
    logo: `${SITE_URL}/images/logos/logo-landscape.png`,
    email: '[email protected]',
    telephone: '+44 7939870682',
    sameAs: ['https://www.instagram.com/padeltripper/'],
    areaServed: ['GB', 'NL', 'DE', 'ES', 'EU'],
    description:
      'Padel Tripper organizes premium padel holidays in Spain, based in Alicante, for international players.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Padel Tripper',
    url: SITE_URL,
    inLanguage: 'en',
  };

  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'SiteNavigationElement', position: 1, name: 'Home', url: `${SITE_URL}/` },
      { '@type': 'SiteNavigationElement', position: 2, name: 'Events', url: `${SITE_URL}/events` },
      { '@type': 'SiteNavigationElement', position: 3, name: 'About Us', url: `${SITE_URL}/about` },
      { '@type': 'SiteNavigationElement', position: 4, name: 'Venues', url: `${SITE_URL}/venues` },
      { '@type': 'SiteNavigationElement', position: 5, name: 'Tailored Events', url: `${SITE_URL}/tailored-events` },
      { '@type': 'SiteNavigationElement', position: 6, name: 'Partners', url: `${SITE_URL}/partners` },
    ],
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable}`}>
        <Script id="gtm-init" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5MS5QXVX');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MS5QXVX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
