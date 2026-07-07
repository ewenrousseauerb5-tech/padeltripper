'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { FUTURE_EVENTS } from '../data/events';
import EventsHero from '../components/events/EventsHero';
import EventsGrid from '../components/events/EventsGrid';

const EventsFaqSection = dynamic(() => import('../components/events/EventsFaqSection'), {
  ssr: false,
  loading: () => <section className="py-20 bg-brand-light px-6" />,
});

const bookingGallery = [
  {
    src: '/images/booking-gallery/group-selfie.jpg',
    alt: 'Padel Tripper guests smiling together on court in Alicante',
    label: 'Group energy',
    position: 'center 42%',
  },
  {
    src: '/images/booking-gallery/alicante-palms.jpg',
    alt: 'Palm trees and sunshine in Alicante',
    label: 'Alicante sun',
    position: 'center 48%',
  },
  {
    src: '/images/booking-gallery/team-dinner.jpg',
    alt: 'Padel Tripper guests enjoying a team dinner in Alicante',
    label: 'Team dinner',
    position: 'center 48%',
  },
  {
    src: '/images/venues/Hotel-piscina.webp',
    alt: 'Hotel pool at Hotel Alicante Golf for a Padel Tripper holiday',
    label: 'Hotel base',
    position: 'center 52%',
  },
  {
    src: '/images/booking-gallery/match-day.jpg',
    alt: 'Padel Tripper guests after a match on a blue padel court',
    label: 'Match day',
    position: 'center 34%',
  },
];

export default function EventsPage() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [activeBookingPhoto, setActiveBookingPhoto] = useState(0);
  const activeGalleryPhoto = bookingGallery[activeBookingPhoto];

  useEffect(() => {
    if (window.location.hash === '#booking') {
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveBookingPhoto(current => (current + 1) % bookingGallery.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main>
      <EventsHero />
      <EventsGrid events={FUTURE_EVENTS} onSelectEvent={setSelectedEventId} />

      {/* Booking Form */}
      <section id="booking" className="py-16 md:py-24 bg-brand-dark px-4 sm:px-6" aria-label="Book your padel holiday in Alicante">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-10 max-w-3xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Get Started</p>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-white uppercase mb-5 md:mb-6">
              Book Your <span className="text-brand-red">Trip</span>
            </h2>
            <p className="text-white/50 leading-relaxed font-light text-[15px] md:text-base">
              Fill in the form and we&apos;ll confirm your spot within 24 hours. Got a question first? Drop us a message on WhatsApp.
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.18fr)_340px] gap-5 md:gap-6 lg:gap-8 items-start">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl">
              <BookingForm selectedEventId={selectedEventId} />
            </div>

            <aside className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 md:p-5">
              <div className="mb-5">
                <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-[10px] mb-2">Trip Moments</p>
                <h3 className="font-serif text-2xl font-black uppercase text-white leading-tight">See Yourself Here</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-white/50">
                  Coaching, match play, dinners and the easy group energy that makes the trip feel social from day one.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="relative aspect-[1.14] md:aspect-[1.08]">
                  <Image
                    key={activeGalleryPhoto.src}
                    src={activeGalleryPhoto.src}
                    alt={activeGalleryPhoto.alt}
                    fill
                    quality={50}
                    sizes="(max-width: 1024px) 100vw, 340px"
                    className="animate-[softReveal_800ms_ease-out_both] object-cover object-center"
                    style={{ objectPosition: activeGalleryPhoto.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-dark">
                      {activeGalleryPhoto.label}
                    </p>
                    <div className="flex items-center gap-2" aria-label="Trip photo gallery">
                      {bookingGallery.map((photo, index) => (
                        <button
                          key={photo.src}
                          type="button"
                          onClick={() => setActiveBookingPhoto(index)}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            activeBookingPhoto === index ? 'w-9 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/75'
                          }`}
                          aria-label={`Show ${photo.label} photo`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-semibold mb-3">Questions?</p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <Mail size={15} className="text-brand-red" />
                    <p className="text-white/75 font-medium text-sm">hello@padeltripper.com</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-brand-red" />
                    <a href="https://wa.me/447939870682" target="_blank" rel="noreferrer" className="text-white/75 font-medium text-sm hover:text-white transition-colors">
                      +44 7939870682
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/12 bg-white/[0.03] p-3">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logos/PTS-Logo.jpg"
                    alt="Protected Trust Services"
                    width={88}
                    height={34}
                    className="h-7 w-auto object-contain"
                  />
                  <p className="text-[12px] text-white/65 leading-relaxed">
                    Protected Trust Services verified partner.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <EventsFaqSection />

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
