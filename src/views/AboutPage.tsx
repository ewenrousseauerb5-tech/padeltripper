'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <section className="bg-brand-light px-6 pt-36 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-5">About Us</p>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-brand-dark leading-[1.02] mb-5">
            The Padel Tripper Story
          </h1>
          <p className="text-stone-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
            A real Alicante padel community that evolved into curated retreats for players who want to improve, compete and enjoy the social side of the game.
          </p>

          <div className="rounded-[30px] overflow-hidden border border-stone-200 bg-white shadow-sm">
            <img
              src="/images/group-social-evening.jpg"
              alt="Padel Tripper players enjoying the social side of the trip in Alicante"
              className="w-full h-[290px] md:h-[430px] object-cover object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20 bg-white border-y border-stone-200/70">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500 font-semibold mb-3">Founder Note</p>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-brand-dark mb-5 leading-tight">
            Built by players,
            <span className="text-brand-red"> for players.</span>
          </h2>
          <p className="text-stone-600 max-w-3xl mx-auto leading-relaxed">
            I&apos;m Ollie, founder of Padel Tripper and Alicante Social Padel. Four years ago I started building a local community in Spain. Since then, we&apos;ve hosted 700+ events and grown a network of 2000+ players. Padel Tripper is the natural next step: same community spirit, now delivered as premium retreat experiences.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-light px-6">
        <div className="max-w-6xl mx-auto space-y-4 md:space-y-5">
          <article className="grid md:grid-cols-2 gap-0 rounded-[30px] overflow-hidden border border-stone-200 bg-white">
            <div className="p-7 md:p-9 lg:p-10 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-3">Step 1</p>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-brand-dark mb-3">From Humble Beginnings</h3>
              <p className="text-stone-600 leading-relaxed">
                It started with local sessions in Alicante, focused on quality games, friendly competition, and creating a proper padel community.
              </p>
            </div>
            <img
              src="/images/padel-coaching-alicante.jpg"
              alt="Padel coaching in Alicante"
              className="w-full h-64 md:h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </article>

          <article className="grid md:grid-cols-2 gap-0 rounded-[30px] overflow-hidden border border-stone-200 bg-white">
            <img
              src="/images/group-photo.jpg"
              alt="Group photo from a Padel Tripper event"
              className="order-2 md:order-1 w-full h-64 md:h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div className="order-1 md:order-2 p-7 md:p-9 lg:p-10 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-3">Step 2</p>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-brand-dark mb-3">700+ Events Hosted</h3>
              <p className="text-stone-600 leading-relaxed">
                The model was proven at scale: hundreds of events and thousands of players, with real friendships formed both on and off court.
              </p>
            </div>
          </article>

          <article className="grid md:grid-cols-2 gap-0 rounded-[30px] overflow-hidden border border-stone-200 bg-white">
            <div className="p-7 md:p-9 lg:p-10 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold mb-3">Step 3</p>
              <h3 className="font-serif text-2xl md:text-3xl font-black text-brand-dark mb-3">International Retreats</h3>
              <p className="text-stone-600 leading-relaxed">
                Today we package that same energy into premium 4-day trips, combining elite coaching, social play and seamless organisation from arrival to departure.
              </p>
            </div>
            <img
              src="/images/group-bela-court.jpg"
              alt="Padel Tripper players at Bela Padel Center"
              className="w-full h-64 md:h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </article>
        </div>
      </section>

      <section className="py-14 md:py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[28px] border border-stone-200 bg-brand-light px-6 md:px-10 py-8 md:py-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Social Proof</p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <p className="font-serif text-3xl md:text-4xl font-black text-brand-dark leading-none">5.0 Rating</p>
                <p className="font-serif text-3xl md:text-4xl font-black text-brand-dark leading-none">2000+ Travellers</p>
                <p className="font-serif text-3xl md:text-4xl font-black text-brand-dark leading-none">700+ Events</p>
              </div>
            </div>
            <Link
              href="/events"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-dark transition-colors"
            >
              View Upcoming Dates
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
