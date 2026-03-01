import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'Padel Tripper | Padel Holidays in Alicante',
  description:
    '4-day padel retreats on the Costa Blanca with professional coaching, 4-star hotel and small groups.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="80cd5f03-ce56-4dbd-b7a0-4765778c1f28"
          data-blockingmode="auto"
          type="text/javascript"
          strategy="beforeInteractive"
        />
        <div className="min-h-screen bg-white font-sans text-brand-dark">
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
