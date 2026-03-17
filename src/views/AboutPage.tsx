'use client';

import Link from 'next/link';
import { ArrowRight, Trophy, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <section className="relative min-h-[58vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/group-social-evening.jpg"
            alt="Padel Tripper group in Alicante enjoying the social side of the trip"
            className="w-full h-full object-cover object-center brightness-[0.35]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16 pt-36">
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">About Us</p>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-white uppercase leading-[0.95] max-w-4xl mb-5">
            Built By Padel Players,
            <br />
            <span className="text-brand-red">For Padel Players</span>
          </h1>
          <p className="text-white/75 max-w-2xl text-base md:text-lg leading-relaxed">
            We started as a real local padel community in Alicante and grew into curated trips for players who want coaching, competition and good vibes in one premium experience.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-brand-light px-6 border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
              <img
                src="/images/ollie.jpg"
                alt="Ollie, founder of Padel Tripper"
                className="w-full h-[470px] object-cover object-[center_35%]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl md:text-5xl font-black uppercase leading-tight mb-6">
              <span className="block">The Story Behind</span>
              <span className="block text-brand-red">Padel Tripper</span>
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p className="font-medium text-brand-dark">
                I&apos;m Ollie, founder of Padel Tripper and Alicante Social Padel.
              </p>
              <p>
                Four years ago, I started building a local padel community in Spain. Since then, we&apos;ve hosted 700+ events and built a network of 2000 players where real friendships formed on and off court.
              </p>
              <p>
                Padel Tripper came from that same community-first energy. We know what players actually want: top coaching, social match play, smooth organisation, and an experience that feels premium from start to finish.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <Trophy className="text-brand-red mb-3" size={18} />
                <p className="text-2xl font-black font-serif text-brand-dark leading-none">700+</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 mt-2">Events Hosted</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <Users className="text-brand-red mb-3" size={18} />
                <p className="text-2xl font-black font-serif text-brand-dark leading-none">2000+</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 mt-2">Community Players</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <Sparkles className="text-brand-red mb-3" size={18} />
                <p className="text-2xl font-black font-serif text-brand-dark leading-none">24/7</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 mt-2">On-Trip Support</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-dark transition-colors"
              >
                See Upcoming Trips
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
