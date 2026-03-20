'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import TailoredEventRequestSection from '../components/TailoredEventRequestSection';

export default function TailoredEventsPage() {
  return (
    <main>
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/padel-group-holiday.jpg"
            alt="Tailored Padel Tripper group experience in Alicante"
            fill
            className="object-cover object-[center_42%] brightness-[0.32]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16"
        >
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Tailored Events</p>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-white uppercase mb-4 max-w-4xl">
            Tailor Your Own <span className="block text-brand-red">Padel Trip</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg font-light">
            Build your own Padel Tripper experience around our proven 4-day format in Alicante.
          </p>
        </motion.div>
      </section>

      <TailoredEventRequestSection />
    </main>
  );
}
