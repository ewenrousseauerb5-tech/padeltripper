'use client';

import { useEffect, useMemo, useState } from 'react';
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
  avatarUrl?: string;
};

const reviews: Review[] = [
  {
    name: 'Caroline Rickett',
    country: 'Spain',
    flag: '🇪🇸',
    date: '06 Oct 2025',
    title: 'Amazing padel holiday',
    excerpt: 'We had the most amazing padel holiday.',
    rating: 5,
    avatarUrl: 'https://user-images.trustpilot.com/68e3ca2c412e4c45aa6088af/73x73.png',
  },
  {
    name: 'Omar Duarte',
    country: 'Estonia',
    flag: '🇪🇪',
    date: '03 Oct 2025',
    title: 'The experience was great',
    excerpt:
      'The experience was great. We had 2 great coaches come down and help us improve our padel. The whole experience has a great flow to it, relaxed, yet fun and challenging at the same time.',
    rating: 5,
    avatarUrl: 'https://user-images.trustpilot.com/68e007c68a838c80f883d000/73x73.png',
  },
  {
    name: 'Neeltje Philippe',
    country: 'Austria',
    flag: '🇦🇹',
    date: '04 Jun 2025',
    title: 'Good time in Golf Hotel Alicante',
    excerpt: 'Fast communication, enjoyable lessons and a really fun overall experience.',
    rating: 5,
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
  },
  {
    name: 'C Brooks',
    country: 'United Kingdom',
    flag: '🇬🇧',
    date: '30 Sep 2025',
    title: 'A great few days playing padel in the sun',
    excerpt: 'I went on my own and was made to feel very welcome and included. Highly recommend.',
    rating: 5,
  },
];

function stars(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('');
}

function ReviewerAvatar({
  review,
  sizeClass,
  textClass,
}: {
  review: Review;
  sizeClass: string;
  textClass: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (review.avatarUrl && !imgError) {
    return (
      <img
        src={review.avatarUrl}
        alt={`${review.name} profile`}
        className={`${sizeClass} rounded-full border border-stone-200 object-cover`}
        loading="lazy"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full border border-[#e5c89f] bg-[#f2d7b1] text-[#1a1a1a] inline-flex items-center justify-center font-semibold ${textClass}`}
      aria-label={`${review.name} initials avatar`}
    >
      {initials(review.name)}
    </div>
  );
}

export default function TrustpilotReviewHighlights() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animatedRating, setAnimatedRating] = useState(0);
  const activeReview = reviews[activeIdx];

  const orbitNodes = useMemo(() => {
    return reviews.map((review, idx) => {
      const angle = (Math.PI * 2 * idx) / reviews.length - Math.PI / 2;
      const x = Math.cos(angle) * 110;
      const y = Math.sin(angle) * 110;
      return { review, idx, x, y };
    });
  }, []);

  useEffect(() => {
    const target = 4.7;
    const durationMs = 1000;
    const steps = 30;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      setAnimatedRating(Number((target * progress).toFixed(1)));

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, durationMs / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-18 px-6 bg-brand-light" aria-label="Trustpilot reviews">
      <div className="max-w-6xl mx-auto">
        <div className="mb-7 md:mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-3">Trustpilot Reviews</p>
            <h2 className="font-serif text-[30px] md:text-[38px] font-black uppercase leading-tight">
              What Guests Say About <span className="text-brand-red">Padel Tripper</span>
            </h2>
            <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-2">
              <span className="text-2xl font-serif font-black text-brand-red">{animatedRating.toFixed(1)}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Trustpilot Rating</span>
            </div>
          </div>
          <div className="md:-translate-y-16 lg:-translate-y-20">
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
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rounded-3xl bg-white border border-stone-200 p-5 md:p-6 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.article
                key={`${activeReview.name}-${activeReview.date}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    {stars(activeReview.rating).map(i => (
                      <Star key={i} size={15} className="text-brand-red fill-brand-red" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-400">{activeReview.date}</p>
                </div>

                <Quote size={20} className="text-brand-red/55 mb-2.5" />
                <h3 className="font-serif text-[34px] font-black text-brand-dark mb-2.5 leading-[1.1]">{activeReview.title}</h3>
                <p className="text-stone-600 leading-relaxed text-[15px]">{activeReview.excerpt}</p>

                <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div className="inline-flex items-center gap-3">
                    <ReviewerAvatar review={activeReview} sizeClass="h-10 w-10" textClass="text-base" />
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

          <div className="hidden lg:flex items-center justify-center lg:-translate-y-12">
            <div className="relative h-[320px] w-[320px]">
              <div className="absolute inset-0 rounded-full border border-stone-300" />
              <div className="absolute inset-[48px] rounded-full border border-stone-200" />
              <div className="absolute inset-[96px] rounded-full border border-stone-100" />

              <motion.div
                key={activeIdx}
                initial={{ scale: 0.96, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-brand-red shadow-lg shadow-brand-red/15 flex flex-col items-center justify-center z-10"
              >
                <ReviewerAvatar review={activeReview} sizeClass="h-14 w-14" textClass="text-lg" />
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
                    className={`absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center z-20 ${
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
                    <span className="text-xl leading-none">{node.review.flag}</span>
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
