'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Calendar, Check, MapPin, Star } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { ALL_EVENTS } from '../data/events';

const MAY_EVENT_IDS = [88, 70];

export default function MayEventsLandingPage() {
  const mayEvents = useMemo(
    () => MAY_EVENT_IDS.map(id => ALL_EVENTS.find(event => event.id === id)).filter(Boolean),
    [],
  );

  const [selectedEventId, setSelectedEventId] = useState<number>(MAY_EVENT_IDS[0]);

  return (
    <main>
      <section className="relative h-[60vh] min-h-[460px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/group-bela-court.jpg"
            alt="Padel Tripper players in Alicante during a premium padel retreat"
            fill
            className="object-cover object-[center_34%] brightness-[0.34]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">May Event Voucher</p>
            <h1 className="font-serif text-4xl md:text-6xl font-black text-white uppercase mb-4 leading-tight">
              Ultimate Padel <span className="text-brand-red">Retreats In May</span>
            </h1>
            <p className="text-white/75 text-lg leading-relaxed font-light mb-7">
              Two premium Alicante dates. World-class coaching, social match play, 4* hotel with B&amp;B and a seamless founder-led experience from start to finish.
            </p>
            <a
              href="#book-now"
              className="inline-flex items-center justify-center rounded-full bg-brand-red px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-dark transition-colors"
            >
              Claim Your May Spot
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-14 px-6 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-brand-light p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2">Included</p>
            <p className="font-semibold text-brand-dark">6h coaching + 6h social play</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-brand-light p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2">Stay</p>
            <p className="font-semibold text-brand-dark">4* Hotel Alicante Golf + B&amp;B</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-brand-light p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2">Price</p>
            <p className="font-semibold text-brand-dark">From £745.00 pp (+£150 single room)</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 bg-[#f7f5f1] border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 max-w-3xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Choose Your Date</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black uppercase text-brand-dark mb-4">
              May Retreat <span className="text-brand-red">Options</span>
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Pick your preferred date and submit your request. We&apos;ll confirm availability quickly so you can lock flights and prepare for Alicante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {mayEvents.map(event => {
              if (!event) return null;
              const selected = selectedEventId === event.id;
              return (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => setSelectedEventId(event.id)}
                  className={`text-left rounded-2xl border p-6 transition-all ${
                    selected
                      ? 'border-brand-red bg-white shadow-md ring-2 ring-brand-red/10'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                  aria-pressed={selected}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] uppercase tracking-[0.22em] text-stone-500">{event.status}</span>
                    <span className="font-serif font-black text-2xl text-brand-red">From {event.price}</span>
                  </div>
                  <h3 className="font-serif text-3xl font-black text-brand-dark mb-4">{event.dateShort}</h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-stone-500">
                      <Calendar size={15} className="text-brand-red/70" />
                      <span>{event.nights} nights / {event.nights + 1} days</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-500">
                      <MapPin size={15} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-500">
                      <Star size={15} />
                      <span>{event.hotel} + B&amp;B</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-500">
                      <Check size={15} className="text-brand-red/70" />
                      <span>6h coaching + 6h social play included</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="book-now" className="py-20 md:py-24 px-6 bg-brand-dark">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_320px] gap-7 lg:gap-9 items-start">
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl">
            <BookingForm selectedEventId={selectedEventId} />
          </div>
          <aside className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 md:p-6">
            <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-[10px] mb-3">May Voucher Flow</p>
            <h3 className="font-serif text-2xl font-black text-white uppercase mb-4">What Happens Next</h3>
            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-white text-sm font-semibold mb-1">1. Availability Check</p>
                <p className="text-white/60 text-sm">We check your chosen date and room availability.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-white text-sm font-semibold mb-1">2. Confirmation</p>
                <p className="text-white/60 text-sm">You receive confirmation and can book flights confidently.</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-white text-sm font-semibold mb-1">3. Pre-Trip WhatsApp</p>
                <p className="text-white/60 text-sm">You are added to the event group a few days before travel.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
