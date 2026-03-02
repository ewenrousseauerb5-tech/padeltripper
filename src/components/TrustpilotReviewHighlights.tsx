'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, Quote, Star } from 'lucide-react';

const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/padeltripper.com';

type Review = {
  name: string;
  country: string;
  flag: string;
  date: string;
  title: string;
  excerpt: string;
  rating: number;
};

const reviews: Review[] = [
  {
    name: 'Ben',
    country: 'United Kingdom',
    flag: '🇬🇧',
    date: '31 Jul 2025',
    title: 'Great coaching and atmosphere',
    excerpt: 'Praised the coaching setup and overall delivery, highlighting that the trip felt seamless and high quality throughout.',
    rating: 5,
  },
  {
    name: 'Lana',
    country: 'Spain',
    flag: '🇪🇸',
    date: '04 Jul 2025',
    title: 'Very well organized',
    excerpt: 'Highlighted excellent organization, clear planning and a smooth guest experience from pre-trip comms to on-court sessions.',
    rating: 5,
  },
  {
    name: 'Happy customer',
    country: 'United Kingdom',
    flag: '🇬🇧',
    date: '05 Jun 2025',
    title: 'Top-level trip',
    excerpt: 'Described the retreat as very enjoyable, with strong coaching quality and a social group dynamic.',
    rating: 5,
  },
  {
    name: 'Caspar Warren',
    country: 'United States',
    flag: '🇺🇸',
    date: '13 Apr 2025',
    title: 'Will book again',
    excerpt: 'Shared very positive feedback on the overall trip standard, coaching sessions and travel experience.',
    rating: 5,
  },
  {
    name: 'Barbara',
    country: 'Estonia',
    flag: '🇪🇪',
    date: '31 Mar 2025',
    title: 'Best group padel holiday',
    excerpt: 'Mentioned the trip as a standout padel holiday with quality coaching and a well-run schedule.',
    rating: 5,
  },
];

function stars(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

export default function TrustpilotReviewHighlights() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeReview = reviews[activeIdx];

  const orbitNodes = useMemo(() => {
    return reviews.map((review, idx) => {
      const angle = (Math.PI * 2 * idx) / reviews.length - Math.PI / 2;
      const x = Math.cos(angle) * 124;
      const y = Math.sin(angle) * 124;

      return { review, idx, x, y };
    });
  }, []);

  return (
    <section className="py-24 px-6 bg-brand-light" aria-label="Trustpilot reviews">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-3">Trustpilot Reviews</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black uppercase leading-tight">
              What Guests Say About <span className="text-brand-red">Padel Tripper</span>
            </h2>
          </div>
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-red px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-brand-red hover:bg-brand-red hover:text-white transition-colors"
          >
            View on Trustpilot
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rounded-3xl bg-white border border-stone-200 p-6 md:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.article
                key={`${activeReview.name}-${activeReview.date}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {stars(activeReview.rating).map(i => (
                      <Star key={i} size={15} className="text-brand-red fill-brand-red" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-400">{activeReview.date}</p>
                </div>

                <Quote size={22} className="text-brand-red/55 mb-3" />
                <h3 className="font-serif text-2xl font-black text-brand-dark mb-3">{activeReview.title}</h3>
                <p className="text-stone-600 leading-relaxed text-[15px]">{activeReview.excerpt}</p>

                <div className="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between">
                  <p className="text-sm font-semibold text-brand-dark">{activeReview.name}</p>
                  <p className="text-sm text-stone-500">
                    {activeReview.flag} {activeReview.country}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative h-[320px] w-[320px]">
              <div className="absolute inset-0 rounded-full border border-stone-300" />
              <div className="absolute inset-[44px] rounded-full border border-stone-200" />

              <motion.div
                key={activeIdx}
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-dark text-white flex flex-col items-center justify-center text-center px-3"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 mb-1">Selected</p>
                <p className="text-xs font-semibold">{activeReview.name}</p>
                <p className="text-[11px] text-white/70">{activeReview.flag} {activeReview.country}</p>
              </motion.div>

              {orbitNodes.map(node => {
                const isActive = node.idx === activeIdx;

                return (
                  <motion.button
                    key={`${node.review.name}-${node.idx}`}
                    type="button"
                    onClick={() => setActiveIdx(node.idx)}
                    whileTap={{ scale: 0.96 }}
                    className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border text-sm transition-all duration-200 ${
                      isActive
                        ? 'border-brand-red bg-brand-red text-white shadow-md'
                        : 'border-stone-300 bg-white text-stone-600 hover:border-brand-red/50'
                    }`}
                    style={{ transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))` }}
                    aria-label={`Show review by ${node.review.name}`}
                  >
                    {node.review.flag}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3">
            {reviews.map((review, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={`${review.name}-${idx}`}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`rounded-xl border px-3 py-2 text-left transition-colors ${
                    isActive ? 'border-brand-red bg-brand-red text-white' : 'border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <p className="text-sm">{review.flag}</p>
                  <p className="text-xs font-semibold leading-tight mt-1">{review.name}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
