'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

const WhatsAppButton = dynamic(() => import('@/src/components/WhatsAppButton'), {
  ssr: false,
});

const CookieBanner = dynamic(() => import('@/src/components/CookieBanner'), {
  ssr: false,
});

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname() ?? '/';
  const [showNonCriticalWidgets, setShowNonCriticalWidgets] = useState(false);
  const isDashboardRoute = pathname.startsWith('/dashboard');

  useEffect(() => {
    if (isDashboardRoute) return;

    setShowNonCriticalWidgets(false);
    const showWidgets = () => setShowNonCriticalWidgets(true);
    const timeout = window.setTimeout(showWidgets, 2200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isDashboardRoute]);

  if (isDashboardRoute) {
    return <div className="min-h-screen bg-white font-sans text-brand-dark">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark">
      <Navbar />
      {children}
      <Footer />
      {showNonCriticalWidgets ? (
        <>
          <WhatsAppButton />
          <CookieBanner />
        </>
      ) : null}
    </div>
  );
}
