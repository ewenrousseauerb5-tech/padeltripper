import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import CookieBanner from '@/src/components/CookieBanner';
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
