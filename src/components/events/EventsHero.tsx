'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function EventsHero() {
  return (
    <section className="relative min-h-[520px] md:h-[58vh] md:min-h-[520px] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/post-tournament-celebration.jpg"
          alt="Padel Tripper players at Club Montemar, Alicante — Costa Blanca"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover object-top brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-14 md:pb-[4.5rem]">
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
            Browse our upcoming padel coaching holidays in Alicante. From arrival to departure, our team is on hand
            24/7 so you can focus on enjoying every moment on and off court. Learn more about our{' '}
            <Link href="/padel-holidays-spain" className="text-white/75 underline decoration-white/25 underline-offset-4 hover:text-white transition-colors">
              padel holidays in Spain
            </Link>
            .
          </p>
          <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Shared room</p>
              <p className="mt-1 font-serif text-xl font-black text-white">£545-£645pp</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Private room</p>
              <p className="mt-1 font-serif text-xl font-black text-white">£745-£845pp</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
