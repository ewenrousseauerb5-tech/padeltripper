'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  MapPin,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Sparkles,
  Users,
  Building2,
} from 'lucide-react';
import { ALL_EVENTS } from '../data/events';
import BookingForm from '../components/BookingForm';

const CAROUSEL_PHOTOS = [
  { src: '/images/post-tournament-celebration.jpg', alt: 'Padel Tripper group celebrating after a tournament at Club Montemar, Alicante' },
  { src: '/images/alicante-castle-view.jpg', alt: 'View over Alicante from the castle — Costa Blanca' },
  { src: '/images/post-tournament-drinks.jpg', alt: 'Group padel holiday — post-tournament drinks in the sun' },
  { src: '/images/padel-coaching-alicante.jpg', alt: 'Padel coaching session at Club Atlético Montemar, Alicante' },
  { src: '/images/san-juan-beach-alicante.jpg', alt: 'Playa San Juan beach, Alicante — just minutes from Hotel Alicante Golf' },
  { src: '/images/players-enjoying-padel.jpg', alt: 'Players laughing during a padel coaching session in Alicante' },
  { src: '/images/group-social-evening.jpg', alt: 'Padel Tripper group social evening in Alicante' },
  { src: '/images/padel-night-game.jpg', alt: 'Evening padel under the lights in Alicante' },
];

function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-stone-200 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50/50 transition-colors"
      >
        <span className="font-serif font-bold text-brand-dark text-[15px] pr-4">{title}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
          isOpen ? 'bg-brand-red text-white rotate-180' : 'bg-stone-100 text-stone-400'
        }`}>
          <ChevronDown size={16} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EventsPage() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const initialTailorData = {
    name: '',
    email: '',
    phone: '',
    eventType: '',
    groupSize: '',
    dates: '',
    details: '',
    acceptedPrivacyTerms: false,
    confirmedGroupAuthority: false,
  };

  const [tailorData, setTailorData] = useState({
    ...initialTailorData,
  });
  const [isTailorSubmitted, setIsTailorSubmitted] = useState(false);
  const [isTailorSubmitting, setIsTailorSubmitting] = useState(false);
  const [tailorError, setTailorError] = useState<string | null>(null);
  const [showTailorForm, setShowTailorForm] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#booking') {
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % CAROUSEL_PHOTOS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleTailorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTailorSubmitting(true);
    setTailorError(null);

    try {
      const response = await fetch('/api/tailored-event-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: tailorData.name,
          email: tailorData.email,
          phone: tailorData.phone,
          event_type: tailorData.eventType,
          group_size: tailorData.groupSize,
          preferred_dates: tailorData.dates,
          message: tailorData.details,
          accepted_privacy_terms: tailorData.acceptedPrivacyTerms,
          confirmed_group_authority: tailorData.confirmedGroupAuthority,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.ok) throw new Error(data?.error || 'Failed');

      setTailorData(initialTailorData);
      setIsTailorSubmitted(true);
      setTimeout(() => setIsTailorSubmitted(false), 5000);
    } catch (error) {
      setTailorError(error instanceof Error ? error.message : 'We could not send your request right now. Please try again.');
    } finally {
      setIsTailorSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero with background photo */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/post-tournament-celebration.jpg"
            alt="Padel Tripper players at Club Montemar, Alicante — Costa Blanca"
            className="w-full h-full object-cover object-top brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">All Dates & Prices</p>
            <h1 className="font-serif text-4xl md:text-6xl font-black text-white uppercase mb-4">
              Padel Camp <span className="text-brand-red">Dates</span>
            </h1>
            <p className="text-white/50 max-w-2xl text-lg font-light">
              Browse all our upcoming padel coaching holidays in Alicante. Choose your dates and book your spot.
            </p>
          </motion.div>
        </div>
      </section>

      {/* All Events Grid */}
      <section className="py-24 px-6" aria-label="All padel holiday dates and prices">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_EVENTS.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative bg-white rounded-2xl p-7 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Red top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red rounded-t-2xl" />

                <div className="flex justify-between items-start mb-5 pt-2">
                  <div className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                    event.status === 'Filling Fast'
                      ? 'bg-brand-red/10 text-brand-red'
                      : event.status === 'Limited Spaces'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-stone-100 text-stone-400'
                  }`}>
                    {event.status}
                  </div>
                  <div className="text-2xl font-serif font-black text-brand-red">
                    From {event.price}
                  </div>
                </div>

                <div className="space-y-3 mb-7">
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
                    <span className="text-sm">{event.hotel}</span>
                  </div>
                </div>

                <a
                  href="#booking"
                  onClick={() => setSelectedEventId(event.id)}
                  className="block w-full py-3.5 bg-brand-dark text-white text-center font-semibold uppercase tracking-widest text-xs rounded-full hover:bg-brand-red transition-all duration-300"
                >
                  Book This Trip
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Carousel */}
      <section className="py-24 bg-brand-dark px-6" aria-label="Padel holiday experience gallery">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Gallery</p>
            <h2 className="font-serif text-3xl font-black text-white uppercase mb-3">The Padel Tripper <span className="text-brand-red">Experience</span></h2>
            <p className="text-white/40 text-sm font-light">More than just padel — it's the people, the sun, the memories.</p>
          </div>
          <div className="relative">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={CAROUSEL_PHOTOS[currentSlide].src}
                  alt={CAROUSEL_PHOTOS[currentSlide].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {CAROUSEL_PHOTOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'bg-brand-red w-8' : 'bg-white/20 w-1.5 hover:bg-white/40'
                  }`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Need to Know — FAQ Accordion */}
      <section className="py-28 bg-brand-light px-6" aria-label="Padel holiday package information">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left — Title + Photo */}
            <div className="md:sticky md:top-28">
              <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">FAQ</p>
              <h2 className="font-serif text-4xl md:text-5xl font-black uppercase leading-tight mb-4">
                Everything You<br />Need to <span className="text-brand-red">Know</span>
              </h2>
              <p className="text-stone-400 text-sm mb-10 max-w-sm leading-relaxed">
                All the details about your padel holiday in Alicante — from coaching to accommodation.
              </p>
              <img
                src="/images/pitu-losada-coach.jpg"
                alt="Pitu Losada — 3x World Champion padel coach at Club Atlético Montemar, Alicante"
                className="rounded-2xl w-full aspect-[4/3] object-cover shadow-lg hidden md:block"
              />
            </div>

            {/* Right — Accordion */}
            <div className="space-y-3">
              <AccordionItem
                title="What does a typical itinerary look like?"
                defaultOpen
              >
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Tuesday — Arrival</p>
                    <p className="text-stone-400 text-sm leading-relaxed">Check in, dump your bags, and get into holiday mode. There's often time for an informal hit if you land early. The trip officially starts with welcome drinks at 7.30pm up on the hotel Mirador — a rooftop terrace with views over the golf course.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Wednesday</p>
                    <p className="text-stone-400 text-sm leading-relaxed">Meet the coaching team at Club Atlético Montemar at 9.45am. Morning coaching session 10am–12pm. After a break, we head to Bela Padel Centre for a 3–5pm afternoon social — expect competitive games and plenty of laughs.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Thursday</p>
                    <p className="text-stone-400 text-sm leading-relaxed">Morning coaching at Montemar again (10am–12pm), then back to Bela for the afternoon session (3–5pm). Round the day off with a night out in the city — Plaza del Ayuntamiento is the go-to for a few well-earned drinks.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Friday — Departure</p>
                    <p className="text-stone-400 text-sm leading-relaxed">Last coaching session of the trip (10am–12pm), then farewells at 12.15pm. Got an evening flight? The courts don't close at midday — feel free to keep playing.</p>
                  </div>
                  <p className="text-stone-300 text-xs italic">Afternoon sessions may run 90 minutes subject to court availability.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="Do flights come with the package?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>Flights aren't included — you'll book those independently. Alicante is well connected from most UK airports and flights are generally very reasonable.</p>
                  <p>Make sure you have adequate travel insurance in place before you travel. This should cover the dates of your trip and any sporting activities.</p>
                  <p className="font-medium text-brand-dark">Important: don't book your flights until you've received email confirmation from us that your trip is going ahead.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="How do I get from the airport to the hotel?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>Taxis from Alicante airport are easy to find and reliable — expect to pay around €35–40 and the journey takes roughly 20 minutes.</p>
                  <p>If several of you are landing around the same time, we'll coordinate a group transfer where we can. Full arrival details are shared ahead of the trip.</p>
                  <p>Hotel check-in is from <strong className="text-brand-dark">4pm</strong> and check-out is by <strong className="text-brand-dark">12pm</strong> on your departure day.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="What happens between coaching sessions?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>Between sessions the time is yours. Head back to the hotel for a swim and some downtime, or stay at the club and make use of the bar and facilities on site.</p>
                  <p>Evenings are unstructured — Alicante has a brilliant restaurant and bar scene. We'll share recommendations and often join the group for a drink or dinner.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="Where do we stay?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>Everyone stays at the Hotel Alicante Golf — a comfortable 4-star hotel right next to Playa San Juan. Pool, sun terrace, good food, and an easy tram link into the city centre.</p>
                  <p>The beach is a short walk away and the hotel has everything you need to recharge between sessions.</p>
                  <p className="font-medium text-brand-dark">Pricing is based on two guests sharing a room. Solo travellers can add a single room supplement of &pound;100.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="Do I need to bring my own racquet?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>Not at all — racquet hire is included in the price, so don't worry if you don't have your own.</p>
                  <p>Bring comfortable sports kit and proper court shoes. Alicante tends to be warm and sunny even in spring, so pack a cap and sunscreen too.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="How does the group stay in touch?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>Before the trip you'll have direct contact details for our team on the ground — someone will always be available if you need anything.</p>
                  <p>We set up a WhatsApp group for each trip so everyone can connect ahead of time and during the week. It's optional but most people find it useful.</p>
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      {/* Tailor Your Event */}
      <section id="tailor" className="py-28 px-6" aria-label="Tailor your own padel event">
        <div className="max-w-6xl mx-auto">
          {/* Intro row */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative">
              <img
                src="/images/padel-coaching-session.jpg"
                alt="Custom padel group event in Alicante — tailored experiences"
                className="rounded-2xl w-full aspect-[4/3] object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-red text-white rounded-2xl p-6 shadow-lg hidden md:block">
                <p className="font-serif font-black text-3xl">100%</p>
                <p className="text-white/80 text-xs uppercase tracking-widest">Tailored</p>
              </div>
            </div>
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Bespoke Experiences</p>
              <h2 className="font-serif text-4xl md:text-5xl font-black uppercase leading-tight mb-6">
                Tailor Your <span className="text-brand-red">Own Event</span>
              </h2>
              <p className="text-stone-400 leading-relaxed mb-10">
                Looking for something unique? We create bespoke padel experiences for groups, corporate teams, and special occasions. From private coaching to full event management — we'll design the perfect trip.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 mt-0.5">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Group Trips</p>
                    <p className="text-stone-400 text-sm">Bring your own group of friends, family, or club members. We'll handle everything.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 mt-0.5">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Corporate Events</p>
                    <p className="text-stone-400 text-sm">Team building with a twist. Padel, sun, and unforgettable team bonding in Alicante.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 mt-0.5">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Special Occasions</p>
                    <p className="text-stone-400 text-sm">Birthdays, stag/hen dos, celebrations — make it a padel holiday to remember.</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowTailorForm(true)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-dark text-white font-semibold uppercase tracking-widest text-xs hover:bg-brand-red transition-all duration-300 mt-10"
              >
                Get Started
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Tailor form — revealed on click */}
          <AnimatePresence>
            {showTailorForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-brand-light rounded-2xl p-10 md:p-14 mt-12">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="font-serif text-2xl font-black uppercase text-center mb-2">Tell Us What You're Looking For</h3>
                    <p className="text-stone-400 text-sm text-center mb-10">Fill in the details below and we'll get back to you with a tailored proposal.</p>

                    <AnimatePresence mode="wait">
                      {isTailorSubmitted ? (
                        <motion.div
                          key="tailor-success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                        >
                          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={32} />
                          </div>
                          <h3 className="font-serif text-2xl font-bold uppercase">Request Sent!</h3>
                          <p className="text-stone-400 text-sm">We'll put together a tailored proposal and be in touch soon.</p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="tailor-form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onSubmit={handleTailorSubmit}
                          className="space-y-5"
                        >
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Full Name</label>
                        <input
                          required
                          type="text"
                          className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                          placeholder="Your Name"
                          value={tailorData.name}
                          onChange={e => setTailorData({ ...tailorData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Email Address</label>
                        <input
                          required
                          type="email"
                          className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                          placeholder="email@address.com"
                          value={tailorData.email}
                          onChange={e => setTailorData({ ...tailorData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                          placeholder="+44 7700 000000"
                          value={tailorData.phone}
                          onChange={e => setTailorData({ ...tailorData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Type of Event</label>
                        <select
                          required
                          className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                          value={tailorData.eventType}
                          onChange={e => setTailorData({ ...tailorData, eventType: e.target.value })}
                        >
                          <option value="">Select type...</option>
                          <option value="group-trip">Group Trip (friends/family)</option>
                          <option value="club-trip">Club / Team Trip</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="special-occasion">Special Occasion</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Group Size (approx.)</label>
                        <input
                          required
                          type="text"
                          className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                          placeholder="e.g. 8-12 people"
                          value={tailorData.groupSize}
                          onChange={e => setTailorData({ ...tailorData, groupSize: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Preferred Dates</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                        placeholder="e.g. Late June 2026, flexible on exact dates"
                        value={tailorData.dates}
                        onChange={e => setTailorData({ ...tailorData, dates: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Tell Us More</label>
                      <textarea
                        required
                        className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors resize-none text-sm"
                        rows={4}
                        placeholder="What are you looking for? Any specific requirements, player levels, accommodation preferences, etc."
                        value={tailorData.details}
                        onChange={e => setTailorData({ ...tailorData, details: e.target.value })}
                      />
                    </div>
                    <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          checked={tailorData.acceptedPrivacyTerms}
                          onChange={e => setTailorData({ ...tailorData, acceptedPrivacyTerms: e.target.checked })}
                          className="mt-0.5 w-4 h-4 accent-brand-red rounded"
                        />
                        <span className="text-sm text-stone-600 leading-relaxed">
                          I acknowledge and accept Padel Tripper&apos;s{' '}
                          <Link href="/privacy-policy" className="text-brand-red underline hover:no-underline">Privacy Policy</Link>
                          {' '}and{' '}
                          <Link href="/terms-and-conditions" className="text-brand-red underline hover:no-underline">Terms &amp; Conditions</Link>.
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          required
                          type="checkbox"
                          checked={tailorData.confirmedGroupAuthority}
                          onChange={e => setTailorData({ ...tailorData, confirmedGroupAuthority: e.target.checked })}
                          className="mt-0.5 w-4 h-4 accent-brand-red rounded"
                        />
                        <span className="text-sm text-stone-600 leading-relaxed">
                          I confirm I am authorized to submit this request and provide participant/group information.
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={isTailorSubmitting}
                      className="w-full py-4 bg-brand-red text-white font-semibold uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all duration-300 text-sm disabled:opacity-50"
                    >
                      {isTailorSubmitting ? 'Sending...' : 'Request a Tailored Proposal'}
                    </button>
                    {tailorError && (
                      <p className="text-sm text-brand-red text-center">{tailorError}</p>
                    )}
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-24 bg-brand-dark px-6" aria-label="Book your padel holiday in Alicante">
        <div className="max-w-5xl mx-auto">
          {/* Header + contact */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Get Started</p>
              <h2 className="font-serif text-4xl md:text-5xl font-black text-white uppercase mb-6">
                Book Your <span className="text-brand-red">Trip</span>
              </h2>
              <p className="text-white/40 leading-relaxed font-light">
                Fill in the form and we&apos;ll confirm your spot within 24 hours. Got a question first? Drop us a message on WhatsApp.
              </p>
            </div>
            <div className="space-y-5 md:pt-16">
              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-brand-red">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">Email Us</p>
                  <p className="text-white/80 font-medium text-sm">hello@padeltripper.com</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-brand-red">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">WhatsApp Only</p>
                  <a href="https://wa.me/447939870682" target="_blank" rel="noreferrer" className="text-white/80 font-medium text-sm hover:text-white transition-colors">
                    +44 7939870682
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
            <BookingForm selectedEventId={selectedEventId} />
          </div>
        </div>
      </section>
    </main>
  );
}
