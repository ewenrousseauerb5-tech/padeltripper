'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, CalendarDays, Dumbbell, Users } from 'lucide-react';

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

export default function TailoredEventRequestSection() {
  const [tailorData, setTailorData] = useState({
    ...initialTailorData,
  });
  const [isTailorSubmitted, setIsTailorSubmitted] = useState(false);
  const [isTailorSubmitting, setIsTailorSubmitting] = useState(false);
  const [tailorError, setTailorError] = useState<string | null>(null);

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
    <section id="tailored-request" className="py-24 md:py-28 px-6 bg-white" aria-label="Request a tailored padel event">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center mb-14">
          <div className="relative">
            <Image
              src="/images/padel-coaching-session.jpg"
              alt="Custom padel group event in Alicante — tailored experiences"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 50vw"
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
            <div className="space-y-3 text-stone-500 leading-relaxed mb-7">
              <p>
                Design your own Padel Tripper holiday built around our popular 4-day padel experience.
              </p>
              <p>
                Our typical trip includes 6 hours of professional coaching plus as much social padel as your group can handle.
              </p>
              <p>
                Off court, enjoy everything Alicante has to offer: beaches, food, nightlife and Mediterranean views.
              </p>
              <p>
                Tell us your group size and preferred dates, and we&apos;ll come back with the best options to create your perfect padel getaway.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-brand-red mb-3">
                  <CalendarDays size={16} />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">Format</p>
                <p className="text-sm text-brand-dark font-medium leading-snug">Proven 4-day Padel Tripper experience</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-brand-red mb-3">
                  <Dumbbell size={16} />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">On Court</p>
                <p className="text-sm text-brand-dark font-medium leading-snug">6h professional coaching + social play</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:col-span-3 md:col-span-1">
                <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center text-brand-red mb-3">
                  <Users size={16} />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">Perfect For</p>
                <p className="text-sm text-brand-dark font-medium leading-snug">Friends, clubs, birthdays and private groups</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-light rounded-2xl p-8 md:p-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-black uppercase text-center mb-2">Tell Us What You&apos;re Looking For</h3>
            <p className="text-stone-500 text-sm text-center mb-10">Fill in the details and we&apos;ll send you tailored options.</p>

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
                  <p className="text-stone-500 text-sm">We&apos;ll put together your tailored proposal and be in touch soon.</p>
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
                      placeholder="Any specific requirements, player levels, accommodation preferences, etc."
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
      </div>
    </section>
  );
}
