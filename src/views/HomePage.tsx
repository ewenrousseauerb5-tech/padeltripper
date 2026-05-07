'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Calendar, Star, ArrowRight, Trophy, Handshake, MapPin, Check } from 'lucide-react';
import { FUTURE_EVENTS, getVisiblePromoNote } from '../data/events';
import { toDualCurrencyDisplay } from '../lib/pricing';

const TrustpilotReviewHighlights = dynamic(() => import('../components/TrustpilotReviewHighlights'), {
  ssr: false,
  loading: () => (
    <section className="pt-6 md:pt-8 bg-white px-6">
      <div className="max-w-7xl mx-auto h-40 rounded-2xl border border-stone-200 bg-brand-light animate-pulse" />
    </section>
  ),
});

export default function HomePage() {
  const [loadDesktopVideo, setLoadDesktopVideo] = useState(false);
  const [showTrustpilot, setShowTrustpilot] = useState(false);
  const trustpilotTriggerRef = useRef<HTMLDivElement | null>(null);
  const homeUpcomingEvents = FUTURE_EVENTS.slice(0, 3);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const saveDataEnabled = Boolean(connection?.saveData);
    const slowNetwork = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (saveDataEnabled || slowNetwork || prefersReducedMotion) return;

    setLoadDesktopVideo(true);
  }, []);

  useEffect(() => {
    if (!trustpilotTriggerRef.current || showTrustpilot) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowTrustpilot(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '240px 0px', threshold: 0.01 },
    );

    observer.observe(trustpilotTriggerRef.current);
    return () => observer.disconnect();
  }, [showTrustpilot]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden" aria-label="Padel holidays Spain hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/foto-movil-1.jpeg"
            alt="Group padel holiday in Alicante, Spain — players enjoying coaching on the Costa Blanca"
            fill
            priority
            quality={46}
            sizes="100vw"
            className="object-cover brightness-[0.4] md:hidden"
          />
          <video
            className={`hidden md:block absolute inset-0 w-full h-full object-cover brightness-[0.4] ${
              loadDesktopVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            {loadDesktopVideo ? <source src="/videos/hero-background.m4v" type="video/mp4" media="(min-width: 768px)" /> : null}
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-black text-white uppercase leading-[0.95] mb-8">
              Ultimate padel retreats <br />
              <span className="text-brand-red">in Alicante</span>
            </h1>
            <p className="text-lg text-white/70 mb-12 max-w-lg leading-relaxed font-light">
              Discover the fastest growing sport in the world in Spain, the home of padel. What&apos;s not to love?
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/events"
                className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/30 text-white font-semibold uppercase tracking-widest text-sm text-center hover:bg-white hover:text-brand-dark transition-all duration-300"
              >
                View Dates
              </Link>
              <Link
                href="/events#booking"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-brand-red text-white font-semibold uppercase tracking-widest text-sm text-center hover:bg-white hover:text-brand-dark transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Next Upcoming Events */}
      <section id="events" className="py-24 md:py-28 px-6 bg-white" aria-label="Next upcoming padel holidays">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Upcoming Trips</p>
            <h2 className="font-serif text-4xl md:text-5xl font-black uppercase mb-5">Next Padel Camps</h2>
            <p className="text-stone-400 leading-relaxed">
              Our next padel coaching holidays in Alicante are filling up. Every package includes 4&#8209;star hotel
              with B&amp;B, 6 hours of coaching, 6 hours of social play, welcome gifts, a team night out and a trip
              photo album. Flights not included.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {homeUpcomingEvents.map((event, idx) => (
              <div
                key={event.id}
                className="group h-full rounded-2xl overflow-hidden border border-stone-100 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
              >
                {event.image && (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={`Padel camp in Alicante — ${event.dateShort}`}
                      fill
                      quality={46}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover transform-gpu [backface-visibility:hidden] group-hover:scale-105 transition-transform duration-700 ${
                        event.imagePosition === 'center'
                          ? 'object-center'
                          : event.imagePosition === 'bottom'
                            ? 'object-bottom'
                            : event.imagePosition === 'lower'
                              ? 'object-[center_60%]'
                              : event.imagePosition === 'slightLower'
                                ? 'object-[center_22%]'
                                : 'object-top'
                      }`}
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-brand-dark text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {event.status}
                    </div>
                    {idx === 1 && (
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                        Most Popular
                      </div>
                    )}
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-3 mb-5">
                    <span className="font-semibold text-sm text-brand-dark">{event.dateShort}</span>
                    <div className="text-right shrink-0">
                      {event.originalPrice && (
                        <p className="text-xs font-semibold text-stone-400 line-through whitespace-nowrap mb-1">
                          {toDualCurrencyDisplay(event.originalPrice)}
                        </p>
                      )}
                      <p className="text-xl font-serif font-black text-brand-red leading-none whitespace-nowrap">
                        From {toDualCurrencyDisplay(event.price)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-5 flex-1">
                    {getVisiblePromoNote(event) && (
                      <p className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {getVisiblePromoNote(event)}
                      </p>
                    )}
                    {event.eligibilityNote && (
                      <p className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        {event.eligibilityNote}
                      </p>
                    )}
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
                      <span className="text-sm">{event.hotel} + B&amp;B</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-400">
                      <Check size={14} className="text-brand-red/70" />
                      <span className="text-sm">{event.formatNote || '6h coaching + 6h social play'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-400">
                      <Check size={14} className="text-brand-red/70" />
                      <span className="text-sm">Welcome gifts, team night out &amp; photo album</span>
                    </div>
                  </div>
                  <Link
                    href={event.status === 'Sold Out' ? '/events' : '/events#booking'}
                    className={`block w-full py-3.5 text-center font-semibold uppercase tracking-widest text-xs rounded-full transition-all duration-300 mt-auto ${
                      event.status === 'Sold Out'
                        ? 'bg-stone-300 text-stone-600 hover:bg-stone-300'
                        : 'bg-brand-dark text-white hover:bg-brand-red'
                    }`}
                  >
                    {event.status === 'Sold Out' ? 'Sold Out' : 'Book This Trip'}
                  </Link>
                </div>
              </div>
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

      {/* Full-width trust banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden" aria-label="Padel Tripper trust and protection">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/post-tournament-celebration-mobile.jpg"
            alt="Padel Tripper group celebrating after a tournament at Club Montemar, Alicante"
            fill
            quality={44}
            sizes="100vw"
            className="w-full h-full object-cover brightness-[0.3]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Trust & Protection</p>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-white uppercase mb-6">
              Book With <span className="text-brand-red">Confidence</span>
            </h2>
            <p className="text-white/75 max-w-2xl mx-auto text-lg leading-relaxed font-light">
              Padel Tripper is a Protected Trust Services verified partner, giving you added confidence from the moment
              you book to the moment you return home.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Image
                src="/images/logos/PTS-Logo.jpg"
                alt="Protected Trust Services"
                width={88}
                height={34}
                className="h-6 w-auto object-contain"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/85">Verified Partner</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-24 md:py-28 px-6 bg-brand-light border-y border-stone-200/70" aria-label="What makes Padel Tripper different">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-6">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Why Padel Tripper</p>
            <h2 className="font-serif text-[30px] md:text-4xl font-black uppercase leading-tight mb-4">
              <span className="block">Train Like A Player.</span>
              <span className="block text-brand-red">Travel Like A Guest.</span>
            </h2>
            <div className="space-y-3 text-stone-500 leading-relaxed">
              <p>
                Padel trips should be more than just a few games. They should be an unforgettable experience.
                That&apos;s exactly why Padel Tripper exists.
              </p>
              <p>
                From the moment you arrive, everything is built to feel premium and personal, including welcome gifts,
                team evenings and a full trip photo album.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-9 mb-7">
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
                  <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500 mb-2">
                    <Trophy size={13} className="text-brand-red" />
                    Elite Coaching Network in Alicante
                  </p>
                  <h3 className="font-serif text-lg md:text-xl font-black text-brand-dark mb-2">World-Class Coaching Environment</h3>
                  <p className="text-stone-600 leading-relaxed">
                    Morning sessions follow proven high-performance methods across our trusted partner clubs in Alicante, always focused on real improvement and high-level technical work.
                  </p>
                </div>

                <div className="relative pl-8">
                  <span className="absolute left-[-11px] top-0 h-6 w-6 rounded-full bg-brand-dark text-white text-[10px] font-bold flex items-center justify-center">PM</span>
                  <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500 mb-2">
                    <Handshake size={13} className="text-brand-red" />
                    Bela Padel Center
                  </p>
                  <h3 className="font-serif text-lg md:text-xl font-black text-brand-dark mb-2">Authentic Spanish Club Atmosphere</h3>
                  <p className="text-stone-600 leading-relaxed mb-4">
                    Afternoons move into social games at Bela, where you apply what you learned in real matches and enjoy the true vibe of a Spanish padel club.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/8Lbyzh8nVYucZHXt7?g_st=iw"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-stone-600 hover:border-brand-red hover:text-brand-red transition-colors"
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
                <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
                  <Image
                    src="/images/bela-center.webp"
                    alt="Social padel match play at Bela Padel Center in Alicante"
                    width={1600}
                    height={900}
                    quality={48}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="w-full h-[290px] object-cover object-center"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm w-[56%] ml-auto -mt-14 relative bg-white">
                  <Image
                    src="/images/coach-training-2026.jpg"
                    alt="Padel Tripper coach training session in Alicante"
                    width={900}
                    height={700}
                    quality={46}
                    sizes="(max-width: 1024px) 56vw, 28vw"
                    className="w-full h-44 object-cover object-[center_18%]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-[#141414] px-6 py-5 md:px-8 md:py-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-2">The Combination</p>
            <p className="font-serif text-lg md:text-[19px] font-bold leading-snug text-stone-100 max-w-none md:whitespace-nowrap">
              Elite Coaching (AM) <span className="text-brand-red">+</span> Spanish Club Match Play (PM) <span className="text-brand-red">+</span> Welcome Gifts &amp; Team Socials <span className="text-brand-red">=</span> A Premium Padel Experience
            </p>
          </div>
        </div>
      </section>

      {/* About Padel Tripper */}
      <section className="py-24 md:py-28 bg-white px-6" aria-label="About Padel Tripper">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
                <Image
                  src="/images/ollie.jpg"
                  alt="Ollie, founder of Padel Tripper, on court in Alicante"
                  width={900}
                  height={1200}
                  quality={48}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-[520px] object-cover object-[center_34%]"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="lg:col-span-7"
            >
              <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">About Us</p>
              <h2 className="font-serif text-[30px] md:text-5xl font-black uppercase leading-tight mb-6">
                <span className="block">The Story Behind</span>
                <span className="block text-brand-red">Padel Tripper</span>
              </h2>
              <div className="space-y-3 text-[15px] md:text-base text-stone-600 leading-relaxed">
                <p className="font-medium text-brand-dark">
                  I&apos;m Ollie, founder of Padel Tripper and Alicante Social Padel.
                </p>
                <p>
                  Four years ago, I started building a local padel community in Spain. Since then, we&apos;ve hosted 700+ events and built a network of 2000 players where real friendships formed on and off court.
                </p>
                <p>
                  That success sparked something bigger. Padel Tripper was born from the same energy, but on an international level. This isn&apos;t a travel company that added padel. It&apos;s a proven padel community that expanded into unforgettable trips.
                </p>
                <p>
                  We know what players want: great organisation, first-class coaching, social match play, sunshine, tapas, and meeting fellow padel addicts.
                </p>
              </div>
              <div className="mt-7">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-red px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-brand-red hover:bg-brand-red hover:text-white transition-colors"
                >
                  See Upcoming Trips
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div ref={trustpilotTriggerRef} className="pt-6 md:pt-8 bg-white">
        {showTrustpilot ? (
          <TrustpilotReviewHighlights />
        ) : (
          <section className="pt-16 pb-20 md:pt-28 md:pb-32 px-4 sm:px-6 bg-brand-light">
            <div className="max-w-7xl mx-auto h-40 rounded-2xl border border-stone-200 bg-white animate-pulse" />
          </section>
        )}
      </div>
    </main>
  );
}
