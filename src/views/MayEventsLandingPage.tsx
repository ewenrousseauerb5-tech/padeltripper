'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Calendar, Check, MapPin, Star } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { ALL_EVENTS } from '../data/events';
import { toDualCurrencyDisplay } from '../lib/pricing';

const MAY_EVENT_IDS = [88, 70];
const MAY_VOUCHER_PRICE_OVERRIDES: Record<number, string> = {
  88: '£645.00',
  70: '£645.00',
};

export default function MayEventsLandingPage() {
  const mayEvents = useMemo(
    () => MAY_EVENT_IDS.map(id => ALL_EVENTS.find(event => event.id === id)).filter(Boolean),
    [],
  );
  const [selectedEventId, setSelectedEventId] = useState<number>(MAY_EVENT_IDS[0]);
  const [loadDesktopVideo, setLoadDesktopVideo] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const saveDataEnabled = Boolean(connection?.saveData);
    const slowNetwork = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (saveDataEnabled || slowNetwork || prefersReducedMotion) return;

    const onIdle = () => setLoadDesktopVideo(true);
    if (win.requestIdleCallback && win.cancelIdleCallback) {
      const idleId = win.requestIdleCallback(() => onIdle(), { timeout: 1200 });
      return () => win.cancelIdleCallback!(idleId);
    }

    const timeout = win.setTimeout(onIdle, 400);
    return () => win.clearTimeout(timeout);
  }, []);

  return (
    <main className="bg-[#0b0d10] text-white">
      <section className="px-4 md:px-6 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/10 relative min-h-[66vh] md:min-h-[78vh]">
          <div className="md:hidden absolute inset-0">
            <Image
              src="/images/group-bela-court.jpg"
              alt="Padel retreat in Alicante"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/images/group-bela-court.jpg"
              alt="Padel retreat in Alicante"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <video
            className={`hidden md:block absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
              loadDesktopVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/group-bela-court.jpg"
            aria-hidden="true"
          >
            {loadDesktopVideo ? <source src="/videos/hero-background.m4v" type="video/mp4" media="(min-width: 768px)" /> : null}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/55" />

          <div className="relative z-10 p-6 md:p-10 lg:p-12 h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto text-center md:translate-y-20"
            >
              <p className="text-brand-red font-semibold uppercase tracking-[0.28em] text-xs mb-4">May Padel Voucher</p>
              <h1 className="font-serif text-4xl md:text-6xl font-black uppercase leading-[0.96] mb-5">
                <span className="md:whitespace-nowrap">Premium Padel Retreats</span>
                <span className="block text-brand-red">In Alicante</span>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Two May dates, one premium format. 6h coaching, 6h social play, 4* hotel with B&amp;B, and founder-level hosting throughout the trip.
              </p>
              <div className="mx-auto mb-4 inline-flex items-center rounded-full border border-brand-red/40 bg-black/35 px-5 py-2.5">
                <span className="text-sm md:text-base text-white/90 font-semibold">
                  <span className="line-through text-white/50 mr-2">{toDualCurrencyDisplay('£745')}</span>
                  <span className="text-brand-red font-bold">{toDualCurrencyDisplay('£645')}</span>
                </span>
              </div>
              <a
                href="#book-now"
                className="mt-6 flex w-fit mx-auto items-center justify-center rounded-full bg-white px-8 py-3 text-xs font-semibold uppercase tracking-widest text-brand-dark hover:bg-brand-red hover:text-white transition-colors"
              >
                Reserve My Spot
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-2">Training</p>
            <p className="font-semibold text-white">6h coaching + 6h social play</p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-2">Accommodation</p>
            <p className="font-semibold text-white">4* Hotel Alicante Golf + B&amp;B</p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-2">Price</p>
            <p className="font-semibold text-white">From {toDualCurrencyDisplay('£745.00')} (+{toDualCurrencyDisplay('£150')} single room)</p>
            <p className="text-[11px] text-brand-red/90 mt-2 font-semibold uppercase tracking-[0.12em]">£100 voucher - limited time</p>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-7 md:mb-8">
            <p className="text-brand-red font-semibold uppercase tracking-[0.28em] text-xs mb-3">Choose Your Date</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black uppercase">May Event Options</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mayEvents.map(event => {
              if (!event) return null;
              const selected = selectedEventId === event.id;

              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setSelectedEventId(event.id)}
                  aria-pressed={selected}
                  className={`text-left rounded-2xl border p-6 transition-all ${
                    selected
                      ? 'border-brand-red bg-white/[0.08] ring-2 ring-brand-red/25'
                      : 'border-white/12 bg-white/[0.02] hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">{event.status}</span>
                    <span className="font-serif text-xl md:text-2xl font-black text-brand-red">
                      <span className="mr-2 text-white/50 line-through text-base md:text-lg">{toDualCurrencyDisplay('£745')}</span>
                      <span>{toDualCurrencyDisplay('£645')}</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-black mb-4">{event.dateShort}</h3>
                  <div className="space-y-2.5 text-white/75">
                    <div className="flex items-center gap-3">
                      <Calendar size={15} className="text-brand-red/80" />
                      <span>{event.nights} nights / {event.nights + 1} days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={15} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star size={15} />
                      <span>{event.hotel} + B&amp;B</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check size={15} className="text-brand-red/80" />
                      <span>Coaching + social format included</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="book-now" className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 rounded-xl border border-brand-red/35 bg-brand-red/10 px-4 py-3 text-center text-xs md:text-sm font-semibold text-white">
            Voucher offer available: £100 off selected dates (limited time).
          </div>
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl text-brand-dark">
            <BookingForm selectedEventId={selectedEventId} priceOverrides={MAY_VOUCHER_PRICE_OVERRIDES} />
          </div>
        </div>
      </section>
    </main>
  );
}
