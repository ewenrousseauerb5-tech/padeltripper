'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, Instagram, ArrowRight } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { FUTURE_EVENTS } from '../data/events';
import EventsHero from '../components/events/EventsHero';
import EventsGrid from '../components/events/EventsGrid';
import ExperienceGallery from '../components/events/ExperienceGallery';
import EventsFaqSection from '../components/events/EventsFaqSection';

export default function EventsPage() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    if (window.location.hash === '#booking') {
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <main>
      <EventsHero />
      <EventsGrid events={FUTURE_EVENTS} onSelectEvent={setSelectedEventId} />

      {/* Booking Form */}
      <section id="booking" className="py-24 bg-brand-dark px-6" aria-label="Book your padel holiday in Alicante">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 max-w-3xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Get Started</p>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-white uppercase mb-6">
              Book Your <span className="text-brand-red">Trip</span>
            </h2>
            <p className="text-white/40 leading-relaxed font-light">
              Fill in the form and we&apos;ll confirm your spot within 24 hours. Got a question first? Drop us a message on WhatsApp.
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.18fr)_340px] gap-6 lg:gap-8 items-start">
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl">
              <BookingForm selectedEventId={selectedEventId} />
            </div>

            <div className="space-y-3">
              <aside className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 md:p-5 space-y-3">
                <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-[10px]">Contact</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-red shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">Email Us</p>
                    <p className="text-white/80 font-medium text-sm">hello@padeltripper.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-red shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">WhatsApp Only</p>
                    <a href="https://wa.me/447939870682" target="_blank" rel="noreferrer" className="text-white/80 font-medium text-sm hover:text-white transition-colors">
                      +44 7939870682
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-red shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">Instagram</p>
                    <a href="https://www.instagram.com/padeltripper/" target="_blank" rel="noreferrer" className="text-white/80 font-medium text-sm hover:text-white transition-colors">
                      @padeltripper
                    </a>
                  </div>
                </div>
              </aside>

              <aside className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 md:p-6">
                <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-[10px] mb-3">Trip At A Glance</p>
                <h3 className="font-serif text-[26px] font-black text-white uppercase leading-tight mb-3">
                  Basic <span className="text-brand-red">Itinerary</span>
                </h3>

                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-white text-sm font-semibold mb-1">Tuesday</p>
                    <p className="text-white/60 text-[13px] leading-relaxed">Arrival, hotel check-in and welcome drinks in the evening.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-white text-sm font-semibold mb-1">Wednesday</p>
                    <p className="text-white/60 text-[13px] leading-relaxed">Morning coaching at Montemar and afternoon social games at Bela.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-white text-sm font-semibold mb-1">Thursday</p>
                    <p className="text-white/60 text-[13px] leading-relaxed">More coaching + social play, then optional night out in Alicante.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-white text-sm font-semibold mb-1">Friday</p>
                    <p className="text-white/60 text-[13px] leading-relaxed">Final coaching session, then departures after midday.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <EventsFaqSection />

      <ExperienceGallery />

      <section className="py-16 md:py-20 px-6 bg-white border-t border-stone-200/70">
        <div className="max-w-4xl mx-auto rounded-3xl border border-stone-200 bg-brand-light p-8 md:p-10 text-center">
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Bespoke Experiences</p>
          <h2 className="font-serif text-3xl md:text-4xl font-black uppercase text-brand-dark mb-4">
            Looking For A <span className="text-brand-red">Tailored Trip?</span>
          </h2>
          <p className="text-stone-500 leading-relaxed max-w-2xl mx-auto mb-7">
            We now have a dedicated tailored events page where you can design your own Padel Tripper experience and send your request directly.
          </p>
          <Link
            href="/tailored-events"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-red transition-colors"
          >
            Go To Tailored Events
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </main>
  );
}
