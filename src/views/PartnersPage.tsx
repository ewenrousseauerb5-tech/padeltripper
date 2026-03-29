'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
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
            <h1 className="font-serif text-4xl md:text-6xl font-black text-white uppercase mb-4 max-w-4xl md:whitespace-nowrap">
              Partner With <span className="text-brand-red">Padel Tripper</span>
            </h1>
            <p className="text-white/65 max-w-2xl text-lg font-light">
              Help your community access premium padel trips while earning commission on every confirmed booking.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-16 px-6 bg-[#0b0d10] border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {[
              { src: '/images/group-bela-court.jpg', alt: 'Padel group at Bela courts', label: 'Community Trips' },
              { src: '/images/padel-coaching-session.jpg', alt: 'Padel coaching in Alicante', label: 'Coaching-led Events' },
              { src: '/images/group-social-evening.jpg', alt: 'Padel social evening in Alicante', label: 'Social Experiences' },
            ].map((item, idx) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="relative rounded-2xl overflow-hidden border border-white/10"
              >
                <img src={item.src} alt={item.alt} className="h-56 w-full object-cover" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-xs font-semibold uppercase tracking-[0.15em]">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 md:gap-10 items-start">
          <div>
            <p className="text-stone-600 leading-relaxed mb-4">
              Padel Tripper partners with coaches, club managers, and well-connected players to offer exclusive discounts for their communities while earning commissions on every booking.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              If you have a strong network within your club or regularly organise padel groups and trips, this is a great way to add value for your players while generating extra income.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border border-stone-200 bg-brand-light px-4 py-3 text-sm text-brand-dark">
                Earn commission on each booking made through your referral.
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

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-stone-200 md:col-span-2">
              <img
                src="/images/bela-center.webp"
                alt="Padel partner venue in Alicante"
                className="w-full h-48 md:h-52 object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-stone-200">
              <img
                src="/images/group-dinner-alicante.jpg"
                alt="Padel Tripper social group dinner"
                className="w-full h-40 md:h-44 object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-stone-200">
              <img
                src="/images/sunset-group-hotel.jpg"
                alt="Padel Tripper sunset hotel social"
                className="w-full h-40 md:h-44 object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl border border-stone-200 bg-brand-light p-4 md:col-span-2">
              <p className="text-[11px] uppercase tracking-widest text-stone-400 font-semibold mb-1">After You Apply</p>
              <p className="text-sm text-brand-dark leading-relaxed">
                Once your form is submitted, you&apos;ll receive your own unique partner reference and our team will guide you through setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PartnerEnquirySection />
    </main>
  );
}
