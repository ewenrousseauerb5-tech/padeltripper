'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

  useEffect(() => {
    let ticking = false;
    let lastValue = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nextValue = window.scrollY > 50;
        if (nextValue !== lastValue) {
          lastValue = nextValue;
          setScrolled(nextValue);
        }
        ticking = false;
      });
    };

    onScroll();
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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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

        <button
          type="button"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className={cn(
            "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            showTransparent ? "bg-white/10 text-white hover:bg-white/20" : "bg-stone-100 text-brand-dark hover:bg-stone-200"
          )}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden lg:flex items-center gap-10 text-[13px] font-semibold uppercase tracking-wider">
          <Link href="/" className={cn(
            "transition-colors duration-300",
            isActive('/')
              ? (showTransparent ? "text-white font-bold" : "text-brand-dark font-bold")
              : (showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark")
          )}>Home</Link>
          <Link href="/events" className={cn(
            "transition-colors duration-300",
            isActive('/events')
              ? (showTransparent ? "text-white font-bold" : "text-brand-dark font-bold")
              : (showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark")
          )}>Events</Link>
          <Link href="/about" className={cn(
            "transition-colors duration-300",
            isActive('/about')
              ? (showTransparent ? "text-white font-bold" : "text-brand-dark font-bold")
              : (showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark")
          )}>About</Link>
          <Link href="/venues" className={cn(
            "transition-colors duration-300",
            isActive('/venues')
              ? (showTransparent ? "text-white font-bold" : "text-brand-dark font-bold")
              : (showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark")
          )}>Venues</Link>
          <Link href="/tailored-events" className={cn(
            "transition-colors duration-300",
            isActive('/tailored-events')
              ? (showTransparent ? "text-white font-bold" : "text-brand-dark font-bold")
              : (showTransparent ? "text-white/80 hover:text-white" : "text-stone-500 hover:text-brand-dark")
          )}>Tailored</Link>
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

      {mobileMenuOpen && (
        <div id="mobile-nav-menu" className="lg:hidden border-t border-black/10 bg-white/95 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-1">
            <Link href="/" className={cn(
              "block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors",
              isActive('/') ? "bg-stone-100 text-brand-dark font-bold" : "text-stone-600 hover:bg-stone-100 hover:text-brand-dark"
            )}>
              Home
            </Link>
            <Link href="/events" className={cn(
              "block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors",
              isActive('/events') ? "bg-stone-100 text-brand-dark font-bold" : "text-stone-600 hover:bg-stone-100 hover:text-brand-dark"
            )}>
              Events
            </Link>
            <Link href="/about" className={cn(
              "block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors",
              isActive('/about') ? "bg-stone-100 text-brand-dark font-bold" : "text-stone-600 hover:bg-stone-100 hover:text-brand-dark"
            )}>
              About
            </Link>
            <Link href="/venues" className={cn(
              "block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors",
              isActive('/venues') ? "bg-stone-100 text-brand-dark font-bold" : "text-stone-600 hover:bg-stone-100 hover:text-brand-dark"
            )}>
              Venues
            </Link>
            <Link href="/tailored-events" className={cn(
              "block rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors",
              isActive('/tailored-events') ? "bg-stone-100 text-brand-dark font-bold" : "text-stone-600 hover:bg-stone-100 hover:text-brand-dark"
            )}>
              Tailored
            </Link>
            <Link href="/events#booking" className="mt-2 block rounded-full bg-brand-red px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-dark transition-colors">
              Book Your Trip
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
