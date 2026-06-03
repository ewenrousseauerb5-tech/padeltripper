'use client';

import { motion } from 'motion/react';
import { Calendar, Check, Clock, MapPin, Star } from 'lucide-react';
import { getVisiblePromoNote, type PadelEvent } from '@/src/data/events';
import { toDualCurrencyDisplay } from '@/src/lib/pricing';

interface EventsGridProps {
  events: PadelEvent[];
  onSelectEvent: (eventId: number) => void;
}

export default function EventsGrid({ events, onSelectEvent }: EventsGridProps) {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6" aria-label="All padel holiday dates and prices">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {events.map((event, idx) => (
            // Sold out events remain visible for social proof but cannot be booked.
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="relative bg-white rounded-2xl p-5 md:p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              {event.status === 'Sold Out' && (
                <div className="absolute inset-0 bg-white/55 pointer-events-none z-[1]" />
              )}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red rounded-t-2xl" />

              <div className="relative z-[2] flex justify-between items-start gap-3 mb-4 md:mb-5 pt-2">
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
                  <p className="text-lg sm:text-xl lg:text-2xl font-serif font-black text-brand-red leading-none whitespace-nowrap">
                    From {toDualCurrencyDisplay(event.price)}
                  </p>
                </div>
              </div>

              <div className="relative z-[2] space-y-2 mb-6 md:mb-7 flex-1">
                {(() => {
                  const promoNote = getVisiblePromoNote(event);
                  if (!promoNote) return null;
                  const isHostedByBen = promoNote.toLowerCase().includes('hosted by ben kettleborough');
                  return (
                    <p
                      className={`text-[11px] font-semibold rounded-lg px-3 py-2 ${
                        isHostedByBen
                          ? 'text-sky-700 bg-sky-50 border border-sky-200'
                          : 'text-red-700 bg-red-50 border border-red-200'
                      }`}
                    >
                      {promoNote}
                    </p>
                  );
                })()}
                {event.eligibilityNote && (
                  <p className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    {event.eligibilityNote}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <Calendar size={15} className="text-brand-red shrink-0" />
                  <span className="font-bold text-brand-dark text-[13px] sm:text-sm">{event.date}</span>
                </div>
                <a
                  href="#full-itinerary"
                  className="ml-7 inline-flex text-[12px] font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-dark transition-colors"
                >
                  View full itinerary
                </a>
                <div className="flex items-center gap-3 text-stone-400">
                  <Clock size={14} className="shrink-0" />
                  <span className="text-[13px] sm:text-sm">{event.nights} nights / {event.nights + 1} days</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <MapPin size={14} className="shrink-0" />
                  <span className="text-[13px] sm:text-sm">{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Star size={14} className="shrink-0" />
                  <span className="text-[13px] sm:text-sm">{event.hotel} + B&amp;B</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Check size={14} className="shrink-0 text-brand-red/80" />
                  <span className="text-[13px] sm:text-sm">{event.formatNote || '6h coaching + 6h social play'}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Check size={14} className="shrink-0 text-brand-red/80" />
                  <span className="text-[13px] sm:text-sm">Welcome gifts, team night out &amp; photo album</span>
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
