'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BedDouble,
  Calendar,
  ChevronDown,
  Plane,
  Quote,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Users,
} from 'lucide-react';
import BookingForm from '@/src/components/BookingForm';
import { FUTURE_EVENTS, getVisiblePromoNote } from '@/src/data/events';
import { landingTestimonials, padelHolidayFaqs } from '@/src/data/padelHolidaysSpain';
import { toDualCurrencyDisplay } from '@/src/lib/pricing';

const alicanteHighlights = [
  {
    label: 'Coast',
    title: 'Beach time between padel sessions',
    copy:
      'San Juan and Alicante coastline give the trip a real holiday feeling: warm air, space to recover and easy downtime between padel blocks.',
    image: '/images/san-juan-beach-alicante.jpg',
    alt: 'San Juan beach in Alicante, Spain',
  },
  {
    label: 'City',
    title: 'Alicante without over-planning',
    copy:
      'The city is compact, walkable and relaxed. After padel, groups can head into Alicante for food, drinks and Mediterranean evenings without long transfers.',
    image: '/images/alicante.jpg',
    alt: 'Alicante city, marina and Santa Barbara castle in Spain',
  },
  {
    label: 'Clubs',
    title: 'Local padel culture on court',
    copy:
      'You are not playing on anonymous resort courts. Alicante has real clubs, experienced players and the social padel rhythm that makes Spain special.',
    image: '/images/venues/bela-center.webp',
    alt: 'Bela Padel Center courts in Alicante',
  },
];

const includedItems = [
  {
    icon: BedDouble,
    title: 'Premium accommodation',
    kicker: 'Stay',
    copy: 'Comfortable hotel stays with breakfast included, giving the trip a proper holiday base.',
    image: '/images/venues/Hotel-piscina.webp',
    alt: 'Premium hotel pool in Alicante for a padel holiday',
  },
  {
    icon: Calendar,
    title: 'Daily padel sessions',
    kicker: 'Play',
    copy: 'A balanced schedule of coached sessions, match play and social court time across the trip.',
    image: '/images/venues/bela-center.webp',
    alt: 'Bela Padel Center courts in Alicante',
  },
  {
    icon: Trophy,
    title: 'Professional coaching',
    kicker: 'Improve',
    copy: 'Clear technical input from trusted coaches, with practical feedback you can take straight into games.',
    image: '/images/coach-training-2026.jpg',
    alt: 'Coach-led padel training session in Alicante in 2026',
    objectPosition: 'center 28%',
  },
  {
    icon: Sparkles,
    title: 'Social activities',
    kicker: 'Connect',
    copy: 'Welcome moments, dinners and easy group plans so the trip feels social from day one.',
    image: '/images/post-tournament-celebration.jpg',
    alt: 'Padel Tripper guests celebrating after a tournament',
  },
  {
    icon: Plane,
    title: 'Airport convenience',
    kicker: 'Arrive',
    copy: 'Alicante is simple to reach from major UK and European cities, making short padel holidays easy to plan.',
    image: '/images/alicante.jpg',
    alt: 'Alicante city and marina near the airport',
  },
  {
    icon: Users,
    title: 'International community',
    kicker: 'Belong',
    copy: 'Meet players from across Europe in a friendly group format built around padel and sunshine.',
    image: '/images/group-photo.jpg',
    alt: 'International padel holiday group in Alicante',
  },
];

export default function PadelHolidaysSpainPage() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [activeAlicanteIdx, setActiveAlicanteIdx] = useState(0);
  const [activeIncludedIdx, setActiveIncludedIdx] = useState(0);
  const [activeFaqIdx, setActiveFaqIdx] = useState(0);

  const visibleEvents = FUTURE_EVENTS.filter(event => event.status !== 'Sold Out').slice(0, 4);
  const activeAlicante = alicanteHighlights[activeAlicanteIdx];
  const activeIncluded = includedItems[activeIncludedIdx];
  const activeFaq = padelHolidayFaqs[activeFaqIdx];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIncludedIdx(index => (index + 1) % includedItems.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAlicanteIdx(index => (index + 1) % alicanteHighlights.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFaqIdx(index => (index + 1) % padelHolidayFaqs.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const selectEvent = (eventId: number) => {
    setSelectedEventId(eventId);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <main>
      <section className="relative min-h-screen overflow-hidden flex items-center" aria-label="Padel holidays in Spain">
        <div className="absolute inset-0">
          <Image
            src="/images/padel-group-holiday.jpg"
            alt="Players enjoying a padel holiday in Alicante, Spain"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.38]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl -translate-y-8 md:-translate-y-12"
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-5">Padel Tripper Spain</p>
            <h1 className="font-serif text-5xl md:text-7xl font-black uppercase leading-[0.95] text-white mb-6">
              Padel Holidays <span className="block text-brand-red">in Spain</span>
            </h1>
            <p className="text-lg md:text-xl text-white/78 leading-relaxed max-w-2xl mb-9 font-light">
              Experience world-class padel, sunshine, coaching and an international community in Alicante.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#booking"
                className="inline-flex justify-center items-center gap-3 rounded-full bg-brand-red px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark transition-colors"
              >
                View Upcoming Trips
                <ArrowRight size={15} />
              </Link>
              <a
                href="#why-spain"
                className="inline-flex justify-center items-center rounded-full border border-white/35 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark transition-colors"
              >
                Why Spain?
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 md:block">
          <div className="h-11 w-[1px] overflow-hidden rounded-full bg-white/20">
            <div className="h-5 w-full animate-pulse bg-white/70" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 bg-brand-light border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-12 items-stretch">
            <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-stone-200 bg-brand-dark shadow-sm">
              <Image
                key={activeIncluded.image}
                src={activeIncluded.image}
                alt={activeIncluded.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover object-center"
                style={{ objectPosition: activeIncluded.objectPosition || 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <p className="text-brand-red font-semibold uppercase tracking-[0.28em] text-[10px] mb-3">
                  {activeIncluded.kicker}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-black uppercase text-white leading-tight mb-3">
                  What&apos;s Included
                </h2>
                <p className="max-w-lg text-sm leading-relaxed text-white/72">{activeIncluded.copy}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 md:p-7 shadow-sm">
              <div className="mb-6">
                <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-[10px] mb-3">Holiday Format</p>
                <h2 className="font-serif text-2xl md:text-[2rem] font-black uppercase leading-tight text-brand-dark">
                  A Premium Padel Trip, Already Organised
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {includedItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeIncludedIdx === index;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveIncludedIdx(index)}
                      className={`group w-full rounded-xl border p-3 text-left transition-colors ${
                        isActive
                          ? 'border-brand-red bg-brand-red text-white'
                          : 'border-stone-200 bg-brand-light hover:border-brand-red/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                            isActive ? 'bg-white/15 text-white' : 'bg-white text-brand-red'
                          }`}
                        >
                          <Icon size={18} />
                        </span>
                        <span>
                          <span className={`block text-[10px] font-semibold uppercase tracking-[0.2em] ${isActive ? 'text-white/60' : 'text-brand-red'}`}>
                            {item.kicker}
                          </span>
                          <span className="mt-1 block font-serif text-sm font-black uppercase leading-tight">{item.title}</span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="py-16 md:py-24 px-4 sm:px-6 bg-brand-dark">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-[10px] mb-3">Upcoming Trips</p>
              <h2 className="font-serif text-3xl md:text-[2.65rem] font-black uppercase text-white mb-3">
                Book Your <span className="text-brand-red">Spain Trip</span>
              </h2>
              <p className="max-w-xl text-sm text-white/58 leading-relaxed">
                Select a live Alicante date and send a quick enquiry. We will confirm availability and next steps.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[11px] font-semibold uppercase tracking-widest text-white/85 hover:bg-white hover:text-brand-dark transition-colors"
            >
              All events
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-5 md:space-y-7">
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {visibleEvents.map(event => {
                const promoNote = getVisiblePromoNote(event);
                return (
                  <article
                    key={event.id}
                    className={`rounded-xl border p-4 flex flex-col transition-colors ${
                      selectedEventId === event.id
                        ? 'border-brand-red bg-brand-red/10'
                        : 'border-white/12 bg-white/[0.04] hover:border-white/24'
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/42 mb-1">{event.status}</p>
                        <h3 className="font-serif text-lg font-black uppercase text-white">{event.dateShort}</h3>
                      </div>
                      <span className="rounded-full border border-white/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/55">
                        {event.nights} nights
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-white/68 mb-3">{event.date}</p>
                    {promoNote && (
                      <p className="mb-3 rounded-lg border border-red-300/20 bg-brand-red/10 px-3 py-2 text-[11px] font-semibold text-red-100">
                        {promoNote}
                      </p>
                    )}
                    <p className="text-xs leading-relaxed text-white/50 mb-4 flex-1">
                      {event.formatNote || '6h coaching + 6h social play'} at {event.hotel}
                    </p>
                    <div className="mb-4">
                      {event.originalPrice && (
                        <p className="text-xs font-semibold text-white/35 line-through">
                          {toDualCurrencyDisplay(event.originalPrice)}
                        </p>
                      )}
                      <p className="font-serif text-lg font-black text-brand-red">
                        From {toDualCurrencyDisplay(event.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => selectEvent(event.id)}
                      className="rounded-full bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-brand-dark hover:bg-brand-red hover:text-white transition-colors"
                    >
                      {selectedEventId === event.id ? 'Selected' : 'Enquire'}
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-4 md:p-6 shadow-2xl">
              <BookingForm selectedEventId={selectedEventId} />
            </div>
          </div>
        </div>
      </section>

      <section id="why-spain" className="py-16 md:py-24 px-6 bg-white border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-8 md:gap-14 items-center">
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-[10px] mb-4">Why Spain</p>
              <h2 className="font-serif text-3xl md:text-[2.65rem] font-black uppercase leading-tight mb-5">
                Why Choose Spain For A <span className="text-brand-red">Padel Holiday?</span>
              </h2>
              <p className="max-w-lg text-sm text-stone-600 leading-relaxed">
                Spain is where padel lives every day: busy clubs, experienced coaches and social match play. Alicante adds
                sunshine, strong facilities and easy access from major European cities.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {alicanteHighlights.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveAlicanteIdx(index)}
                    className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors ${
                      activeAlicanteIdx === index
                        ? 'bg-brand-red text-white'
                        : 'border border-stone-200 bg-white text-stone-600 hover:border-brand-red hover:text-brand-red'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-stone-200 bg-brand-light p-5">
                <div className="mb-3 flex items-center gap-2">
                  {alicanteHighlights.map((item, index) => (
                    <span
                      key={item.label}
                      className={`h-1.5 rounded-full transition-all ${
                        activeAlicanteIdx === index ? 'w-9 bg-brand-red' : 'w-3 bg-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-brand-red font-semibold mb-2">
                  {activeAlicante.label}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-black uppercase text-brand-dark mb-3">
                  {activeAlicante.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-600">{activeAlicante.copy}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-stone-200 shadow-sm h-[340px] md:h-[500px]">
              <Image
                key={activeAlicante.image}
                src={activeAlicante.image}
                alt={activeAlicante.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-brand-dark text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-12 max-w-2xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-[10px] mb-4">Guest Reviews</p>
            <h2 className="font-serif text-3xl md:text-[2.65rem] font-black uppercase leading-tight mb-5">
              Padel Holidays That <span className="text-brand-red">Feel Personal</span>
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Smooth organisation, friendly groups and strong coaching, with space to arrive solo and feel part of it quickly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {landingTestimonials.map(review => (
              <article key={review.name} className="rounded-xl border border-white/12 bg-white/[0.04] p-5">
                <div className="mb-4 flex gap-1 text-brand-red" aria-label="5 star review">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
                <Quote size={20} className="text-white/25 mb-4" />
                <h3 className="font-semibold text-white mb-2">{review.title}</h3>
                <p className="text-sm leading-relaxed text-white/62 mb-5">{review.quote}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/45">
                  {review.name} - {review.country}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-brand-light border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto">
          <div className="mb-9 max-w-3xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-[10px] mb-4">FAQ</p>
            <h2 className="font-serif text-3xl md:text-[2.65rem] font-black uppercase leading-tight">
              Padel Holiday <span className="text-brand-red">Questions</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-[0.86fr_1.14fr] gap-5 md:gap-7 items-start">
            <div className="space-y-2">
              {padelHolidayFaqs.map((item, index) => {
                const isActive = activeFaqIdx === index;

                return (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => setActiveFaqIdx(index)}
                    aria-expanded={isActive}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                      isActive
                        ? 'border-brand-red bg-white text-brand-dark shadow-sm'
                        : 'border-stone-200 bg-white/60 text-stone-600 hover:border-brand-red/40'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-serif text-sm md:text-base font-black uppercase">{item.question}</span>
                      <ChevronDown
                        size={17}
                        className={`shrink-0 transition-transform ${isActive ? 'rotate-180 text-brand-red' : ''}`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-sm lg:sticky lg:top-24">
              <div className="mb-5 flex gap-2">
                {padelHolidayFaqs.map(item => (
                  <span
                    key={item.question}
                    className={`h-1.5 rounded-full transition-all ${
                      item.question === activeFaq.question ? 'w-10 bg-brand-red' : 'w-3 bg-stone-300'
                    }`}
                  />
                ))}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-black uppercase text-brand-dark mb-4">
                {activeFaq.question}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">{activeFaq.answer}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-[10px] mb-4">Ready To Play?</p>
          <h2 className="font-serif text-3xl md:text-[2.65rem] font-black uppercase leading-tight mb-5">
            Join The Next Padel Tripper <span className="text-brand-red">Holiday In Spain</span>
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Browse upcoming Alicante dates, choose the trip that fits your calendar and send us your enquiry.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-3 rounded-full bg-brand-red px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-dark transition-colors"
          >
            See Upcoming Events
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
