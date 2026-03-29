'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Handshake, Users } from 'lucide-react';
import PartnerEnquirySection from '../components/PartnerEnquirySection';

export default function PartnersPage() {
  return (
    <main>
      <section className="relative h-[52vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/group-photo.jpg"
            alt="Padel Tripper partner community"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Another Sub Heading</p>
            <h1 className="font-serif text-4xl md:text-6xl font-black text-white uppercase mb-4 max-w-4xl">
              Partner With <span className="text-brand-red">Padel Tripper</span>
            </h1>
            <p className="text-white/65 max-w-2xl text-lg font-light">
              Help your community access premium padel trips while earning commission on every confirmed booking.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 bg-white border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 md:gap-10 items-start">
          <div>
            <p className="text-stone-600 leading-relaxed mb-4">
              Padel Tripper partners with coaches, club managers, and well-connected players to offer exclusive discounts for their communities while earning commissions on every booking.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              If you have a strong network within your club or regularly organise padel groups and trips, this is a great way to add value for your players while generating extra income.
            </p>

            <div className="space-y-3 mb-6">
              <div className="rounded-xl border border-stone-200 bg-brand-light px-4 py-3 text-sm text-brand-dark">
                Earn a commission on each booking made through your referral.
              </div>
              <div className="rounded-xl border border-stone-200 bg-brand-light px-4 py-3 text-sm text-brand-dark">
                Work closely with the Padel Tripper team with full support throughout.
              </div>
            </div>

            <p className="text-stone-500 leading-relaxed mb-7">
              This opportunity is ideal for coaches, club representatives, and padel enthusiasts who want to bring their community together through unforgettable padel experiences.
            </p>

            <a
              href="#partner-form"
              className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-red transition-colors"
            >
              Enquire Below
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl overflow-hidden border border-stone-200">
              <img
                src="/images/bela-center.webp"
                alt="Padel partners and player community in Alicante"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-stone-200 bg-brand-light p-5">
                <div className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-brand-red mb-3">
                  <Users size={16} />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">Community Value</p>
                <p className="text-sm text-brand-dark font-medium leading-snug">Exclusive offers for your players.</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-brand-light p-5">
                <div className="w-9 h-9 rounded-full bg-white border border-stone-200 flex items-center justify-center text-brand-red mb-3">
                  <Handshake size={16} />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">Partner Support</p>
                <p className="text-sm text-brand-dark font-medium leading-snug">Hands-on help from our team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnerEnquirySection />
    </main>
  );
}
