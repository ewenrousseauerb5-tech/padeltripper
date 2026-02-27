'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showTransparent = isHome && !scrolled;

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500",
      showTransparent
        ? "bg-transparent"
        : "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
    )}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" aria-label="Padel Tripper — Padel holidays Spain">
          <img
            src={showTransparent ? "/images/logos/logo-white-landscape.png" : "/images/logos/logo-landscape.png"}
            alt="Padel Tripper logo"
            className="h-9 w-auto transition-opacity duration-500"
          />
        </Link>
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-semibold uppercase tracking-wider">
          <Link href="/" className={cn(
            "transition-colors duration-300",
            showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark"
          )}>Home</Link>
          <Link href="/events" className={cn(
            "transition-colors duration-300",
            showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark"
          )}>Events</Link>
          <Link
            href="/events#booking"
            className={cn(
              "px-7 py-2.5 rounded-full font-bold transition-all duration-300",
              showTransparent
                ? "border border-white/40 text-white hover:bg-white hover:text-brand-dark"
                : "bg-brand-red text-white hover:bg-brand-dark"
            )}
          >
            Book Your Trip
          </Link>
        </div>
      </div>
    </nav>
  );
}
