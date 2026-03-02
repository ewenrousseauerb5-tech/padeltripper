'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Quote, ShieldCheck, Sparkles, Users } from 'lucide-react';

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/padeltripper.com';

const reviewHighlights = [
  {
    id: 'coaching',
    title: 'Elite Coaching Quality',
    summary:
      'Guests consistently highlight the quality of coaching sessions, clear structure, and the feeling of genuine improvement during the trip.',
    points: [
      'Small-group attention on court',
      'Structured sessions with practical feedback',
      'Suitable progression for mixed levels',
    ],
    icon: ShieldCheck,
  },
  {
    id: 'organization',
    title: 'Smooth End-to-End Organization',
    summary:
      'Reviews frequently mention clear communication before arrival and a smooth experience from check-in through to final session.',
    points: [
      'Clear pre-trip communication',
      'Well-coordinated daily schedule',
      'Reliable local support throughout the stay',
    ],
    icon: Sparkles,
  },
  {
    id: 'group',
    title: 'Premium Group Experience',
    summary:
      'Travellers often describe the atmosphere as social, welcoming, and high quality, with a strong balance of sport and holiday experience.',
    points: [
      'Friendly and international group mix',
      'Great balance: training + downtime',
      'High-quality overall trip feel',
    ],
    icon: Users,
  },
];

export default function TrustpilotReviewHighlights() {
  const [activeId, setActiveId] = useState(reviewHighlights[0].id);
  const active = reviewHighlights.find(item => item.id === activeId) || reviewHighlights[0];
  const ActiveIcon = active.icon;

  return (
    <section
      className="relative py-28 px-6 bg-white overflow-hidden"
      aria-label="Trustpilot review highlights for Padel Tripper"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-[-140px] h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute -bottom-24 left-[-140px] h-72 w-72 rounded-full bg-brand-dark/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12 md:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">
              Trustpilot
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-black uppercase leading-tight">
              Trusted by International <span className="text-brand-red">Padel Travellers</span>
            </h2>
            <p className="text-stone-500 mt-5 leading-relaxed">
              A live snapshot of what players consistently value most about Padel Tripper experiences.
            </p>
          </div>

          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-red px-6 py-3 text-xs font-semibold uppercase tracking-widest text-brand-red hover:bg-brand-red hover:text-white transition-colors"
          >
            View Trustpilot Reviews
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50 p-7 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <ActiveIcon size={20} />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                    Review Highlight
                  </p>
                </div>

                <Quote className="text-brand-red/50 mb-4" size={28} />
                <h3 className="font-serif text-3xl font-black text-brand-dark mb-4">{active.title}</h3>
                <p className="text-stone-600 leading-relaxed text-[17px] mb-7">{active.summary}</p>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {active.points.map(point => (
                    <li
                      key={point}
                      className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid gap-4 content-start">
            {reviewHighlights.map(item => {
              const ItemIcon = item.icon;
              const isActive = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`group text-left rounded-2xl border px-5 py-5 transition-all duration-300 ${
                    isActive
                      ? 'border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/20'
                      : 'border-stone-200 bg-white hover:border-brand-red/40 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                        isActive ? 'bg-white/20' : 'bg-brand-red/10 text-brand-red'
                      }`}
                    >
                      <ItemIcon size={18} />
                    </div>
                    <div>
                      <h4 className={`font-serif text-xl font-black ${isActive ? 'text-white' : 'text-brand-dark'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm mt-1.5 ${isActive ? 'text-white/90' : 'text-stone-500'}`}>
                        Insight from verified Trustpilot reviewers
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
