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
  avatarUrl: string;
};

const reviews: Review[] = [
  {
    name: 'Mr Wilson',
    country: 'United Kingdom',
    flag: '🇬🇧',
    date: '05 Dec 2025',
    title: 'Great Trip',
    excerpt: 'Great trip. Well organised. Already planning on booking a return trip.',
    rating: 5,
    avatarUrl: 'https://ui-avatars.com/api/?name=Mr+Wilson&background=d94545&color=ffffff&size=128',
  },
  {
    name: 'Jake Cox',
    country: 'United Kingdom',
    flag: '🇬🇧',
    date: '01 Dec 2025',
    title: 'The perfect padel getaway!',
    excerpt:
      'We have just returned from a 4 night stay with Padel Tripper in Alicante and are already looking into booking again.',
    rating: 5,
    avatarUrl: 'https://ui-avatars.com/api/?name=Jake+Cox&background=111111&color=ffffff&size=128',
  },
  {
    name: 'Caroline Rickett',
    country: 'Spain',
    flag: '🇪🇸',
    date: '06 Oct 2025',
    title: 'Amazing padel holiday',
    excerpt: 'We had the most amazing padel holiday and will definitely be back for more.',
    rating: 5,
    avatarUrl: 'https://ui-avatars.com/api/?name=Caroline+Rickett&background=d94545&color=ffffff&size=128',
  },
  {
    name: 'Anja',
    country: 'United States',
    flag: '🇺🇸',
    date: '05 Oct 2025',
    title: 'Padel in Alicante',
    excerpt: 'Just returned home after 4 days in Alicante. The whole thing was really well organized.',
    rating: 5,
    avatarUrl: 'https://ui-avatars.com/api/?name=Anja&background=111111&color=ffffff&size=128',
  },
  {
    name: 'C Brooks',
    country: 'United Kingdom',
    flag: '🇬🇧',
    date: '30 Sep 2025',
    title: 'A great few days playing padel in the sun',
    excerpt: 'I went on my own and was made to feel very welcome and included. Highly recommend.',
    rating: 5,
    avatarUrl: 'https://ui-avatars.com/api/?name=C+Brooks&background=d94545&color=ffffff&size=128',
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
                  <div className="inline-flex items-center gap-3">
                    <img
                      src={activeReview.avatarUrl}
                      alt={`${activeReview.name} profile`}
                      className="h-10 w-10 rounded-full border border-stone-200 object-cover"
                      loading="lazy"
                    />
                    <p className="text-sm font-semibold text-brand-dark">{activeReview.name}</p>
                  </div>
                  <p className="text-sm text-stone-500 inline-flex items-center gap-2">
                    <span className="text-xl leading-none">{activeReview.flag}</span>
                    {activeReview.country}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative h-[360px] w-[360px]">
              <div className="absolute inset-0 rounded-full border border-stone-300" />
              <div className="absolute inset-[52px] rounded-full border border-stone-200" />
              <div className="absolute inset-[104px] rounded-full border border-stone-100" />

              <motion.div
                key={activeIdx}
                initial={{ scale: 0.96, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-brand-red shadow-lg shadow-brand-red/15 flex flex-col items-center justify-center z-10"
              >
                <img
                  src={activeReview.avatarUrl}
                  alt={`${activeReview.name} profile`}
                  className="h-16 w-16 rounded-full border border-stone-200 object-cover"
                  loading="lazy"
                />
              </motion.div>

              {orbitNodes.map(node => {
                const isActive = node.idx === activeIdx;

                return (
                  <motion.button
                    key={`${node.review.name}-${node.idx}`}
                    type="button"
                    onClick={() => setActiveIdx(node.idx)}
                    whileTap={{ scale: 0.95 }}
                    title={`${node.review.name} — ${node.review.country}`}
                    className={`absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center z-20 ${
                      isActive
                        ? 'border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/20 ring-4 ring-brand-red/15'
                        : 'border-stone-300 bg-white text-stone-600 hover:border-brand-red/50 hover:shadow-md'
                    }`}
                    style={{
                      left: `calc(50% + ${node.x}px)`,
                      top: `calc(50% + ${node.y}px)`,
                    }}
                    aria-label={`Show review by ${node.review.name}`}
                  >
                    <span className="text-2xl leading-none">{node.review.flag}</span>
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
                  <p className="text-xl leading-none">{review.flag}</p>
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
