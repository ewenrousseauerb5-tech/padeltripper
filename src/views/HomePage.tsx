'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Clock, Users, MapPin, Calendar, Star, ArrowRight, Trophy, Handshake } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/events';
import TrustpilotReviewHighlights from '../components/TrustpilotReviewHighlights';

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
      <section className="py-20 bg-white px-6 border-b border-stone-100" aria-label="Why choose our padel camps in Spain">
        <div className="max-w-6xl mx-auto">
          <h2 className="sr-only">Why Choose Our Padel Coaching Holidays in Spain</h2>
          <div className="grid md:grid-cols-3 gap-10">
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
                className="text-left space-y-4 border border-stone-200 rounded-2xl p-6 bg-stone-50/40"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-red bg-white border border-stone-200" aria-hidden="true">
                  <item.icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="font-serif text-lg font-bold tracking-tight text-brand-dark">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
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

      {/* Why We're Different */}
      <section className="py-16 md:py-18 px-6 bg-stone-50 border-y border-stone-200/70" aria-label="What makes Padel Tripper different">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-3">Why Padel Tripper</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight mb-4">
              Train Like A Player. <span className="text-brand-red">Travel Like A Guest.</span>
            </h2>
            <p className="text-stone-500 leading-relaxed">
              We are not a standard padel holiday company. Your mornings are focused on high-level coaching at Club Atlético
              Montemar with the Pitu Losada Academy. Your afternoons move into social match play at Bela Padel Center.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 h-full w-px bg-stone-300" />
                  <span className="absolute left-[-11px] top-0 h-6 w-6 rounded-full bg-brand-red text-white text-[10px] font-bold flex items-center justify-center">AM</span>
                  <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 mb-2">
                    <Trophy size={13} className="text-brand-red" />
                    Pitu Losada Academy at Montemar
                  </p>
                  <h3 className="font-serif text-2xl font-black text-brand-dark mb-2">Elite Technical Coaching</h3>
                  <p className="text-stone-600 leading-relaxed">
                    Morning sessions follow academy methodology at Club Atlético Montemar, developed around high-performance coaching principles.
                  </p>
                </div>

                <div className="relative pl-8">
                  <span className="absolute left-[-11px] top-0 h-6 w-6 rounded-full bg-brand-dark text-white text-[10px] font-bold flex items-center justify-center">PM</span>
                  <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 mb-2">
                    <Handshake size={13} className="text-brand-red" />
                    Bela Padel Center
                  </p>
                  <h3 className="font-serif text-2xl font-black text-brand-dark mb-2">Real Social Match Play</h3>
                  <p className="text-stone-600 leading-relaxed mb-4">
                    Afternoons move into social games at Bela so players apply what they have learned in real, competitive match contexts.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/8Lbyzh8nVYucZHXt7?g_st=iw"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-stone-600 hover:border-brand-red hover:text-brand-red transition-colors"
                  >
                    View Bela Location
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="lg:col-span-7"
            >
              <div className="relative">
                <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-lg">
                  <img
                    src="/images/pitu-losada-coach.jpg"
                    alt="Pitu Losada coaching at Club Atletico Montemar in Alicante"
                    className="w-full h-[320px] object-cover object-[center_22%]"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg w-[68%] ml-auto -mt-16 relative bg-white">
                  <img
                    src="/images/bela-courts.webp"
                    alt="Social padel match play at Bela Padel Center in Alicante"
                    className="w-full h-36 object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-5 md:px-8 md:py-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 mb-2">The Combination</p>
            <p className="font-serif text-xl md:text-2xl font-black leading-tight text-brand-dark">
              Elite Coaching (AM) <span className="text-brand-red">+</span> Social Match Play (PM) <span className="text-brand-red">=</span> Faster Improvement
            </p>
          </div>
        </div>
      </section>

      {/* Next Upcoming Events */}
      <section id="events" className="py-22 px-6 bg-white" aria-label="Next upcoming padel holidays">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-14">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Upcoming Trips</p>
            <h2 className="font-serif text-4xl font-black uppercase mb-5">Next Padel Camps</h2>
            <p className="text-stone-400 leading-relaxed">
              Our next padel coaching holidays in Alicante are filling up. Every package includes 4&#8209;star hotel, 6 hours of coaching, 4 hours of social play and transport to the courts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {UPCOMING_EVENTS.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-stone-200 bg-white hover:border-stone-300 transition-colors duration-300"
              >
                {event.image && (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={event.image}
                      alt={`Padel camp in Alicante — ${event.dateShort}`}
                      className={`w-full h-full object-cover ${event.imagePosition === 'center' ? 'object-center' : event.imagePosition === 'bottom' ? 'object-bottom' : 'object-top'}`}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white text-brand-dark text-[10px] font-bold uppercase tracking-widest rounded-full border border-stone-200">
                      {event.status}
                    </div>
                  </div>
                )}
                <div className="p-7">
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-semibold text-sm text-brand-dark">{event.dateShort}</span>
                    <span className="text-xl font-serif font-black text-brand-red">From {event.price}</span>
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

      <div className="pt-6 md:pt-8 bg-white">
        <TrustpilotReviewHighlights />
      </div>
    </main>
  );
}
