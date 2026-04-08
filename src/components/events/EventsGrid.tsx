'use client';

import { motion } from 'motion/react';
import { Calendar, Check, Clock, MapPin, Star } from 'lucide-react';
import type { PadelEvent } from '@/src/data/events';
import { toDualCurrencyDisplay } from '@/src/lib/pricing';

interface EventsGridProps {
  events: PadelEvent[];
  onSelectEvent: (eventId: number) => void;
}

export default function EventsGrid({ events, onSelectEvent }: EventsGridProps) {
  return (
    <section className="py-24 px-6" aria-label="All padel holiday dates and prices">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, idx) => (
            // Sold out events remain visible for social proof but cannot be booked.
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative bg-white rounded-2xl p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {event.status === 'Sold Out' && (
                <div className="absolute inset-0 bg-white/55 pointer-events-none z-[1]" />
              )}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red rounded-t-2xl" />

              <div className="relative z-[2] flex justify-between items-start gap-3 mb-5 pt-2">
                <div
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                    event.status === 'Filling Fast'
                      ? 'bg-brand-red/10 text-brand-red'
                      : event.status === 'Sold Out'
                        ? 'bg-stone-800 text-white'
                      : event.status === 'Limited Spaces'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {event.status}
                </div>
                <div className="text-right shrink-0">
                  {event.originalPrice && (
                    <p className="text-xs font-semibold text-stone-400 line-through whitespace-nowrap mb-1">
                      {toDualCurrencyDisplay(event.originalPrice)}
                    </p>
                  )}
                  <p className="text-xl lg:text-2xl font-serif font-black text-brand-red leading-none whitespace-nowrap">
                    From {toDualCurrencyDisplay(event.price)}
                  </p>
                </div>
              </div>

              <div className="relative z-[2] space-y-2 mb-7 flex-1">
                {event.promoNote && (
                  <p className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {event.promoNote}
                  </p>
                )}
                {event.eligibilityNote && (
                  <p className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    {event.eligibilityNote}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <Calendar size={15} className="text-brand-red shrink-0" />
                  <span className="font-bold text-brand-dark text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Clock size={14} className="shrink-0" />
                  <span className="text-sm">{event.nights} nights / {event.nights + 1} days</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <MapPin size={14} className="shrink-0" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Star size={14} className="shrink-0" />
                  <span className="text-sm">{event.hotel} + B&amp;B</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Check size={14} className="shrink-0 text-brand-red/80" />
                  <span className="text-sm">6h coaching + 6h social play</span>
                </div>
              </div>

              {event.status === 'Sold Out' ? (
                <button
                  type="button"
                  disabled
                  className="relative z-[2] block w-full py-3.5 bg-stone-300 text-stone-600 text-center font-semibold uppercase tracking-widest text-xs rounded-full cursor-not-allowed mt-auto"
                >
                  Sold Out
                </button>
              ) : (
                <a
                  href="#booking"
                  onClick={() => onSelectEvent(event.id)}
                  className="relative z-[2] block w-full py-3.5 bg-brand-dark text-white text-center font-semibold uppercase tracking-widest text-xs rounded-full hover:bg-brand-red transition-all duration-300 mt-auto"
                >
                  Book This Trip
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
