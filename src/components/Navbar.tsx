'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const promoEndsAt = Date.parse('2026-03-31T23:59:59Z');
    const updatePromoVisibility = () => setShowPromo(Date.now() <= promoEndsAt);

    updatePromoVisibility();
    const timer = window.setInterval(updatePromoVisibility, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const showTransparent = isHome && !scrolled;

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500",
      showTransparent
        ? "bg-transparent"
        : "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
    )}>
      {showPromo && (
        <div className="h-8 bg-brand-red text-white overflow-hidden border-b border-black/10">
          <div className="promo-marquee-inner h-full">
            <div className="promo-marquee-group h-full">
              <span className="mx-8">£100 OFF APRIL 14 EVENT UNTIL 31 MARCH</span>
              <span className="mx-8">BOOK NOW FROM £645 (WAS £745)</span>
              <span className="mx-8">£100 OFF APRIL 14 EVENT UNTIL 31 MARCH</span>
              <span className="mx-8">BOOK NOW FROM £645 (WAS £745)</span>
            </div>
            <div className="promo-marquee-group h-full" aria-hidden="true">
              <span className="mx-8">£100 OFF APRIL 14 EVENT UNTIL 31 MARCH</span>
              <span className="mx-8">BOOK NOW FROM £645 (WAS £745)</span>
              <span className="mx-8">£100 OFF APRIL 14 EVENT UNTIL 31 MARCH</span>
              <span className="mx-8">BOOK NOW FROM £645 (WAS £745)</span>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" aria-label="Padel Tripper — Padel holidays Spain">
          <img
            src={showTransparent ? "/images/logos/logo-white-landscape.png" : "/images/logos/logo-landscape.png"}
            alt="Padel Tripper logo"
            className={cn(
              "w-auto transition-opacity duration-500",
              showTransparent ? "h-10" : "h-8"
            )}
          />
        </Link>
        <div className="hidden lg:flex items-center gap-10 text-[13px] font-semibold uppercase tracking-wider">
          <Link href="/" className={cn(
            "transition-colors duration-300",
            showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark"
          )}>Home</Link>
          <Link href="/about" className={cn(
            "transition-colors duration-300",
            showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark"
          )}>About</Link>
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
