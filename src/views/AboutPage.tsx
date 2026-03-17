'use client';

import Link from 'next/link';
import { ArrowRight, Trophy, Users, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/group-social-evening.jpg"
            alt="Padel Tripper group in Alicante enjoying the social side of the trip"
            className="w-full h-full object-cover object-top brightness-[0.3]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">About Us</p>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-white uppercase mb-4 max-w-3xl">
            Padel Tripper <span className="text-brand-red">Story</span>
          </h1>
          <p className="text-white/50 max-w-2xl text-lg font-light">
            Built from a real Alicante padel community into premium trips for players who want great coaching, social games and a seamless experience.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-28 bg-brand-light px-6 border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 md:gap-14 items-center">
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
            <h2 className="font-serif text-3xl md:text-4xl font-black uppercase leading-tight mb-5">
              <span className="block">The Story Behind</span>
              <span className="block text-brand-red">Padel Tripper</span>
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed max-w-2xl">
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

            <div className="grid sm:grid-cols-3 gap-4 mt-9">
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <Trophy className="text-brand-red mb-3" size={18} />
                <p className="text-xl font-black font-serif text-brand-dark leading-none">700+</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 mt-2">Events Hosted</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <Users className="text-brand-red mb-3" size={18} />
                <p className="text-xl font-black font-serif text-brand-dark leading-none">2000+</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 mt-2">Community Players</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <Sparkles className="text-brand-red mb-3" size={18} />
                <p className="text-xl font-black font-serif text-brand-dark leading-none">24/7</p>
                <p className="text-xs uppercase tracking-wider text-stone-500 mt-2">On-Trip Support</p>
              </div>
            </div>

            <div className="mt-10">
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

      <section className="py-20 md:py-24 px-6 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-5 text-center">Our Journey</p>
          <h3 className="font-serif text-2xl md:text-3xl font-black uppercase text-brand-dark text-center mb-10 md:mb-12">
            From Local Community To International Trips
          </h3>

          <div className="grid md:grid-cols-3 gap-5 md:gap-7 relative">
            <div className="rounded-2xl border border-stone-200 bg-brand-light p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-500 mb-2">Step 1</p>
              <p className="font-serif text-xl font-black text-brand-dark mb-2">Community Started</p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Alicante Social Padel began with local sessions focused on good games and great people.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-brand-light p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-500 mb-2">Step 2</p>
              <p className="font-serif text-xl font-black text-brand-dark mb-2">700+ Events Hosted</p>
              <p className="text-sm text-stone-600 leading-relaxed">
                A proven formula grew across thousands of players and hundreds of organised events.
              </p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-brand-light p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-500 mb-2">Step 3</p>
              <p className="font-serif text-xl font-black text-brand-dark mb-2">International Retreats</p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Padel Tripper now brings that same energy to curated holiday experiences in Spain.
              </p>
            </div>
          </div>

          <div className="mt-10 md:mt-12 rounded-2xl border border-stone-200 bg-brand-light px-6 md:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="font-serif text-2xl md:text-3xl font-black text-brand-dark leading-none">5.0</p>
                <p className="text-[11px] uppercase tracking-widest text-stone-500 mt-2">Average Rating</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl font-black text-brand-dark leading-none">2000+</p>
                <p className="text-[11px] uppercase tracking-widest text-stone-500 mt-2">Travellers</p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl font-black text-brand-dark leading-none">700+</p>
                <p className="text-[11px] uppercase tracking-widest text-stone-500 mt-2">Events Hosted</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
