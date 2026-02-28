'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Clock, Users, MapPin, Calendar, Star, ArrowRight } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/events';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden" aria-label="Padel holidays Spain hero">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-padel-camp.jpg"
            alt="Group padel holiday in Alicante, Spain — players enjoying coaching on the Costa Blanca"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-sm mb-6">Alicante, Costa Blanca</p>
            <h1 className="font-serif text-5xl md:text-7xl font-black text-white uppercase leading-[0.95] mb-8">
              Padel Holidays <br />
              <span className="text-brand-red">in Spain</span>
            </h1>
            <p className="text-lg text-white/70 mb-12 max-w-lg leading-relaxed font-light">
              4-day padel retreats on the Costa Blanca with professional coaching, 4&#8209;star hotel and a great group of players. The ultimate padel camp experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/events"
                className="px-10 py-4 rounded-full border border-white/30 text-white font-semibold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all duration-300"
              >
                View Dates
              </Link>
              <Link
                href="/events#booking"
                className="px-10 py-4 rounded-full bg-brand-red text-white font-semibold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Padel Camps */}
      <section className="py-28 bg-brand-light px-6" aria-label="Why choose our padel camps in Spain">
        <div className="max-w-6xl mx-auto">
          <h2 className="sr-only">Why Choose Our Padel Coaching Holidays in Spain</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Clock, title: '6 Hours Coaching + 4 Hours Social Play', desc: 'Intensive padel training sessions at the academy of 3x World Champion Pitu Losada, plus competitive social play each afternoon. Suitable for all levels.' },
              { icon: Users, title: 'Expert Coaching Ratio', desc: 'Maximum 4 players per coach for personalised attention. Perfect for solo travellers, couples, or group padel holidays.' },
              { icon: MapPin, title: 'Alicante, Costa Blanca', desc: "Play padel in one of Spain's sunniest cities with world-class facilities. Direct flights from the UK all year round." },
            ].map((item, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center space-y-5"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-red mx-auto" aria-hidden="true">
                  <item.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-bold uppercase tracking-tight">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width social proof banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden" aria-label="Padel Tripper guest experience">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/post-tournament-celebration.jpg"
            alt="Padel Tripper group celebrating after a tournament at Club Montemar, Alicante"
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">The Experience</p>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-white uppercase mb-6">
              More Than Just <span className="text-brand-red">Padel</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed font-light">
              From post-tournament celebrations to sunset drinks overlooking the Mediterranean — every trip is packed with unforgettable moments and lifelong friendships.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Next Upcoming Events */}
      <section id="events" className="py-32 px-6" aria-label="Next upcoming padel holidays">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-20">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Upcoming Trips</p>
            <h2 className="font-serif text-4xl font-black uppercase mb-5">Next Padel Camps</h2>
            <p className="text-stone-400 leading-relaxed">
              Our next padel coaching holidays in Alicante are filling up. Every package includes 4&#8209;star hotel, 6 hours of coaching, 4 hours of social play and transport to the courts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {UPCOMING_EVENTS.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                {event.image && (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={event.image}
                      alt={`Padel camp in Alicante — ${event.dateShort}`}
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${event.imagePosition === 'center' ? 'object-center' : event.imagePosition === 'bottom' ? 'object-bottom' : 'object-top'}`}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {event.status}
                    </div>
                  </div>
                )}
                <div className="p-7">
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-semibold text-sm text-brand-dark">{event.dateShort}</span>
                    <span className="text-xl font-serif font-black text-brand-red">{event.price}</span>
                  </div>
                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-3 text-stone-400">
                      <Calendar size={14} className="text-brand-red/60" />
                      <span className="text-sm">{event.nights} nights / {event.nights + 1} days</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-400">
                      <MapPin size={14} />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-400">
                      <Star size={14} />
                      <span className="text-sm">{event.hotel}</span>
                    </div>
                  </div>
                  <Link
                    href="/events#booking"
                    className="block w-full py-3.5 bg-brand-dark text-white text-center font-semibold uppercase tracking-widest text-xs rounded-full hover:bg-brand-red transition-all duration-300"
                  >
                    Book This Trip
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-stone-200 text-brand-dark font-semibold uppercase tracking-widest text-sm hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all duration-300"
            >
              View All Events & Dates
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
