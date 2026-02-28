'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

const CAROUSEL_PHOTOS = [
  { src: '/images/post-tournament-celebration.jpg', alt: 'Padel Tripper group celebrating after a tournament at Club Montemar, Alicante' },
  { src: '/images/sunset-group-hotel.jpg', alt: 'Padel holiday guests enjoying sunset drinks at Hotel Alicante Golf' },
  { src: '/images/post-tournament-drinks.jpg', alt: 'Group padel holiday — post-tournament drinks in the sun' },
  { src: '/images/group-bela-padel.jpg', alt: 'Padel Tripper players on court at Bela Padel Centre' },
  { src: '/images/group-dinner-alicante.jpg', alt: 'Padel camp group dinner out in Alicante city centre' },
  { src: '/images/players-enjoying-padel.jpg', alt: 'Players laughing during a padel coaching session in Alicante' },
  { src: '/images/group-social-evening.jpg', alt: 'Padel Tripper group social evening in Alicante' },
  { src: '/images/group-beers-montemar.jpg', alt: 'Group relaxing with beers after padel coaching at Club Montemar' },
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    event: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [tailorData, setTailorData] = useState({
    name: '',
    email: '',
    eventType: '',
    groupSize: '',
    dates: '',
    details: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking enquiry.');
      }

      setFormData({
        name: '',
        email: '',
        event: '',
        message: '',
      });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setSubmitError('We could not send your enquiry right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTailorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTailorSubmitting(true);
    setTailorError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: tailorData.name,
          email: tailorData.email,
          event: `Tailored Event — ${tailorData.eventType}`,
          message: [
            `Type: ${tailorData.eventType}`,
            tailorData.groupSize ? `Group size: ${tailorData.groupSize}` : '',
            tailorData.dates ? `Preferred dates: ${tailorData.dates}` : '',
            `Details: ${tailorData.details}`,
          ].filter(Boolean).join('\n'),
        }),
      });

      if (!response.ok) throw new Error('Failed');

      setTailorData({ name: '', email: '', eventType: '', groupSize: '', dates: '', details: '' });
      setIsTailorSubmitted(true);
      setTimeout(() => setIsTailorSubmitted(false), 5000);
    } catch {
      setTailorError('We could not send your request right now. Please try again.');
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
            src="/images/padel-group-holiday.jpg"
            alt="Group padel holiday at Club Montemar, Alicante — Costa Blanca"
            className="w-full h-full object-cover brightness-[0.3]"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_EVENTS.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-7 border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="px-3 py-1.5 bg-stone-50 text-stone-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {event.status}
                  </div>
                  <div className="text-xl font-serif font-black text-brand-red">
                    {event.price}
                  </div>
                </div>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-3 text-brand-dark">
                    <Calendar size={15} className="text-brand-red/60" />
                    <span className="font-semibold text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-400">
                    <Clock size={15} />
                    <span className="text-sm">{event.nights} nights / {event.nights + 1} days</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-400">
                    <MapPin size={15} />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-400">
                    <Star size={15} />
                    <span className="text-sm">{event.hotel}</span>
                  </div>
                </div>
                <a
                  href="#booking"
                  onClick={() => setFormData(prev => ({ ...prev, event: event.date }))}
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
                    <p className="text-stone-400 text-sm leading-relaxed">Check-in at Hotel Alicante Golf. Relaxed social game depending on arrival times. 7.30pm welcome drinks on the hotel Mirador overlooking the golf course.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Wednesday</p>
                    <p className="text-stone-400 text-sm leading-relaxed">9.45am introduction to Club Atl&eacute;tico Montemar and the coaching team. 10–12pm coaching session. 15–17pm informal game / mini tournament at Bela Padel Centre.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Thursday</p>
                    <p className="text-stone-400 text-sm leading-relaxed">10–12pm coaching session. 15–17pm informal game / mini tournament at Bela. 9pm final night drinks in Alicante's Plaza del Ayuntamiento.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm mb-1">Friday — Departure</p>
                    <p className="text-stone-400 text-sm leading-relaxed">10–12pm final coaching session. 12.15 farewell from the team. More padel if you're flying late!</p>
                  </div>
                  <p className="text-stone-300 text-xs italic">Afternoon socials may be 90 minutes depending on court availability.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="What about flights and insurance?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>We do not provide flights as part of our event packages. If you need any help with flights feel free to get in touch.</p>
                  <p>All participants are expected to provide suitable holiday insurance to cover the period of their stay and activities.</p>
                  <p className="font-medium text-brand-dark">Please only book your flights once confirmation is received from us via email that your trip is confirmed.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="How do I get from the airport to the hotel?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>There is a very reliable taxi service from Alicante airport. It typically costs 35–40 euros and takes around 20 minutes.</p>
                  <p>For groups arriving together, we may meet you at the airport or at the hotel. Instructions will be communicated prior to arrival.</p>
                  <p>Check-in at Hotel Alicante Golf is from <strong className="text-brand-dark">4pm</strong>. Check-out by <strong className="text-brand-dark">12pm</strong>.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="What happens between coaching sessions?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>During the day you are welcome to return to your hotel for some rest or relax at the venue where there is a restaurant and other sporting facilities.</p>
                  <p>Your evenings are your own to explore Alicante and the surrounding areas. Our representatives may organise drinks or other gatherings depending on group requirements.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="Where do we stay?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>The Hotel Alicante Golf is a 4-star hotel close to Playa San Juan with everything you need to relax and enjoy the amazing Alicante weather.</p>
                  <p>Only a short distance into the centre of Alicante and close to the beach via the tram outside your hotel or a 10 minute walk.</p>
                  <p className="font-medium text-brand-dark">Note: the base price is based on 2 people sharing. Single room supplement of &pound;100.</p>
                </div>
              </AccordionItem>

              <AccordionItem title="Do I need my own padel racquet?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>No — padel racquet hire is included as part of the price if you don't have your own.</p>
                  <p>Please bring appropriate clothing and footwear. As Alicante is usually sunny we also recommend sun screen and a cap!</p>
                </div>
              </AccordionItem>

              <AccordionItem title="How will the group communicate?">
                <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                  <p>You will be given the telephone numbers of our on-the-ground representative(s) who will be available at all times.</p>
                  <p>A WhatsApp group will be created for the entire group to allow communications between guests. This is entirely voluntary.</p>
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
                src="/images/group-dinner-alicante.jpg"
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
                          <option value="group">Group Trip</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="stag-hen">Stag / Hen Do</option>
                          <option value="birthday">Birthday / Celebration</option>
                          <option value="club">Club / Association</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Group Size (approx.)</label>
                        <input
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
                        placeholder="What are you looking for? Any specific requirements, level of players, budget, etc."
                        value={tailorData.details}
                        onChange={e => setTailorData({ ...tailorData, details: e.target.value })}
                      />
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
      <section id="booking" className="py-32 bg-brand-dark px-6" aria-label="Book your padel holiday in Alicante">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Get Started</p>
              <h2 className="font-serif text-4xl md:text-5xl font-black text-white uppercase mb-8">Book Your <span className="text-brand-red">Trip</span></h2>
              <p className="text-white/40 mb-12 leading-relaxed font-light">
                Ready to book your padel holiday in Spain? Whether you're looking for a solo padel retreat, a couples getaway, or a corporate padel event in Alicante — we'll tailor the perfect experience.
              </p>
              <div className="space-y-6">
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
                    <a href="https://wa.me/4477939870682" target="_blank" rel="noreferrer" className="text-white/80 font-medium text-sm hover:text-white transition-colors">+44 7793 9870682</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-2xl">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold uppercase">Enquiry Sent!</h3>
                    <p className="text-stone-400 text-sm">
                      Thank you. We'll be in touch very soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Full Name</label>
                      <input
                        required
                        type="text"
                        className="w-full px-4 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Email Address</label>
                      <input
                        required
                        type="email"
                        className="w-full px-4 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                        placeholder="email@address.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Select Event</label>
                      <select
                        required
                        className="w-full px-4 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm"
                        value={formData.event}
                        onChange={e => setFormData({...formData, event: e.target.value})}
                      >
                        <option value="">Choose an event...</option>
                        {ALL_EVENTS.map(e => (
                          <option key={e.id} value={e.date}>{e.date} — {e.price}</option>
                        ))}
                        <option value="custom">Custom / Tailored Experience</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Message</label>
                      <textarea
                        className="w-full px-4 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:border-brand-red focus:outline-none transition-colors resize-none text-sm"
                        rows={3}
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-red text-white font-semibold uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all duration-300 text-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                    </button>
                    {submitError && (
                      <p className="text-sm text-brand-red text-center">{submitError}</p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
