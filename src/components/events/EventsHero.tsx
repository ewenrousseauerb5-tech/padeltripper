'use client';

import { motion } from 'motion/react';

export default function EventsHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/post-tournament-celebration.jpg"
          alt="Padel Tripper players at Club Montemar, Alicante — Costa Blanca"
          className="w-full h-full object-cover object-top brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
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
            24/7 so you can focus on enjoying every moment on and off court.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
