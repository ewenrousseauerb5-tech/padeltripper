'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import WhatsAppButton from '@/src/components/WhatsAppButton';
import CookieBanner from '@/src/components/CookieBanner';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname() ?? '/';
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (isDashboardRoute) {
    return <div className="min-h-screen bg-white font-sans text-brand-dark">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark">
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
