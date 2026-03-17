'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Mail,
  Phone,
  ChevronRight,
  Instagram,
} from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { FUTURE_EVENTS } from '../data/events';
import EventsHero from '../components/events/EventsHero';
import EventsGrid from '../components/events/EventsGrid';
import ExperienceGallery from '../components/events/ExperienceGallery';
import EventsFaqSection from '../components/events/EventsFaqSection';

export default function EventsPage() {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

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
      <EventsHero />
      <EventsGrid events={FUTURE_EVENTS} onSelectEvent={setSelectedEventId} />
      <ExperienceGallery />
      <EventsFaqSection />

      {/* Booking Form */}
      <section id="booking" className="py-24 bg-brand-dark px-6" aria-label="Book your padel holiday in Alicante">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10 max-w-3xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Get Started</p>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-white uppercase mb-6">
              Book Your <span className="text-brand-red">Trip</span>
            </h2>
            <p className="text-white/40 leading-relaxed font-light">
              Fill in the form and we&apos;ll confirm your spot within 24 hours. Got a question first? Drop us a message on WhatsApp.
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.18fr)_340px] gap-6 lg:gap-8 items-start">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl">
                <BookingForm selectedEventId={selectedEventId} />
              </div>

              <aside className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 md:p-6">
                <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-[10px] mb-3">Trip At A Glance</p>
                <h3 className="font-serif text-[26px] font-black text-white uppercase leading-tight mb-3">
                  Basic <span className="text-brand-red">Itinerary</span>
                </h3>

                <div className="space-y-2.5">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-white text-sm font-semibold mb-1">Tuesday</p>
                    <p className="text-white/60 text-[13px] leading-relaxed">Arrival, hotel check-in and welcome drinks in the evening.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-white text-sm font-semibold mb-1">Wednesday</p>
                    <p className="text-white/60 text-[13px] leading-relaxed">Morning coaching at Montemar and afternoon social games at Bela.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-white text-sm font-semibold mb-1">Thursday</p>
                    <p className="text-white/60 text-[13px] leading-relaxed">More coaching + social play, then optional night out in Alicante.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-white text-sm font-semibold mb-1">Friday</p>
                    <p className="text-white/60 text-[13px] leading-relaxed">Final coaching session, then departures after midday.</p>
                  </div>
                </div>
              </aside>
            </div>

            <div>
              <aside className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 md:p-5 space-y-3">
                <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-[10px]">Contact</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-red shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">Email Us</p>
                    <p className="text-white/80 font-medium text-sm">hello@padeltripper.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-red shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">WhatsApp Only</p>
                    <a href="https://wa.me/447939870682" target="_blank" rel="noreferrer" className="text-white/80 font-medium text-sm hover:text-white transition-colors">
                      +44 7939870682
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-red shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">Instagram</p>
                    <a href="https://www.instagram.com/padeltripper/" target="_blank" rel="noreferrer" className="text-white/80 font-medium text-sm hover:text-white transition-colors">
                      @padeltripper
                    </a>
                  </div>
                </div>
              </aside>
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
                Tailor Your Own <span className="text-brand-red">Padel Tripper Experience</span>
              </h2>
              <div className="space-y-3 text-stone-400 leading-relaxed mb-6">
                <p>
                  Design your own Padel Tripper holiday built around our popular 4-day padel experience.
                </p>
                <p>
                  Tell us your group size and preferred dates, and we&apos;ll come back with the best options to create your perfect padel getaway.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                <div className="rounded-xl border border-stone-200 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">Format</p>
                  <p className="text-sm text-brand-dark font-medium">Built around our popular 4-day experience</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">On Court</p>
                  <p className="text-sm text-brand-dark font-medium">6 hours of pro coaching + social padel</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-4 sm:col-span-2">
                  <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">Off Court</p>
                  <p className="text-sm text-brand-dark font-medium">Beaches, great food, nightlife and Mediterranean views</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-2">
                <div className="rounded-xl border border-stone-200 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">Group Type</p>
                  <p className="text-sm text-brand-dark font-medium">Friends, family, clubs and private groups</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">Perfect For</p>
                  <p className="text-sm text-brand-dark font-medium">Birthdays, celebrations and unforgettable padel getaways</p>
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

    </main>
  );
}
