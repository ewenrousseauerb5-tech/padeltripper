'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Sparkles, Trophy, WavesLadder } from 'lucide-react';

export default function VenuesPage() {
  return (
    <main>
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/venues/Montemar-pistas.jpg"
            alt="Professional padel courts at Club Montemar in Alicante"
            fill
            className="object-cover object-center brightness-[0.32]"
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
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Coaches & Venues</p>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-white uppercase mb-4 max-w-4xl">
            World-Class <span className="block text-brand-red">Padel Partners</span>
          </h1>
          <p className="text-white/60 max-w-2xl text-lg font-light">
            Train at elite clubs, enjoy social games in iconic Spanish courts, and stay in a premium 4-star hotel designed for a seamless Alicante experience.
          </p>
        </motion.div>
      </section>

      <section className="py-12 md:py-14 px-6 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-brand-light p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2">Coaching Standard</p>
            <p className="font-serif text-2xl font-black text-brand-dark">Elite Academy</p>
            <p className="text-sm text-stone-600 mt-2">Sessions led by coaches from Pitu Losada&apos;s high-performance environment.</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-brand-light p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2">Social Standard</p>
            <p className="font-serif text-2xl font-black text-brand-dark">Prestige Clubs</p>
            <p className="text-sm text-stone-600 mt-2">Authentic Spanish social padel atmosphere at one of Alicante&apos;s top venues.</p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-brand-light p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500 mb-2">Hospitality Standard</p>
            <p className="font-serif text-2xl font-black text-brand-dark">4* Premium Stay</p>
            <p className="text-sm text-stone-600 mt-2">Comfortable rooms, breakfast included, and a smooth base for the full trip.</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 bg-[#f7f5f1] border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-3">Training Environments</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black uppercase text-brand-dark">
              Montemar & <span className="text-brand-red">Pitu Method</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                <Image
                  src="/images/venues/montemar.jpg"
                  alt="Club Montemar training environment in Alicante"
                  width={1400}
                  height={900}
                  className="w-full h-[290px] md:h-[340px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
              <div className="pt-4 md:pt-5">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="bg-brand-red/10 text-brand-red px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] rounded">
                    Training Academy
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-4">
                  Club <span className="text-brand-red">Montemar</span>
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Focused technical sessions in a proven high-performance setting. This is where tactical clarity, cleaner shot selection and match-ready patterns are built step by step.
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.05 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                <Image
                  src="/images/venues/Pitu-losada.jpg"
                  alt="Pitu Losada at the training academy"
                  width={1400}
                  height={900}
                  className="w-full h-[290px] md:h-[340px] object-cover object-[center_0%] group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
              <div className="pt-4 md:pt-5">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="bg-brand-dark/10 text-brand-dark px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] rounded">
                    Elite Methodology
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-black text-brand-dark leading-tight mb-4">
                  Pitu <span className="text-brand-red">Losada</span>
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Coaching led by the academy of 3-time world champion Pitu Losada. Clear structure, practical feedback and measurable improvement from day one.
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1"
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Social Play Venue</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black uppercase text-brand-dark mb-5">
              Bela <span className="text-brand-red">Padel Center</span>
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Our social matches are hosted at Bela, one of Spain&apos;s most prestigious clubs. It gives you the true Spanish padel atmosphere while still keeping the trip structure smooth and high quality.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              After coaching, this is where everything comes together. You play competitive but friendly matches, build rhythm with different partners, and enjoy the same social energy that made Alicante Social Padel grow into a thriving community.
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-stone-200 bg-brand-light p-4">
                <Trophy size={16} className="text-brand-red mb-2" />
                <p className="text-xs uppercase tracking-widest text-stone-500">Prestige</p>
                <p className="font-semibold text-brand-dark text-sm mt-1">Top Spanish club environment</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-brand-light p-4">
                <Building2 size={16} className="text-brand-red mb-2" />
                <p className="text-xs uppercase tracking-widest text-stone-500">Facilities</p>
                <p className="font-semibold text-brand-dark text-sm mt-1">Premium courts and social areas</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-brand-light p-4">
                <WavesLadder size={16} className="text-brand-red mb-2" />
                <p className="text-xs uppercase tracking-widest text-stone-500">Vibe</p>
                <p className="font-semibold text-brand-dark text-sm mt-1">Competitive and relaxed balance</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.05 }}
            className="order-1 lg:order-2"
          >
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-sm">
              <Image
                src="/images/venues/bela-center.webp"
                alt="Bela Padel Center courts in Alicante"
                width={1400}
                height={900}
                className="w-full h-[420px] object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6 bg-brand-light border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="mb-10 md:mb-12 max-w-3xl"
          >
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Your Stay</p>
            <h2 className="font-serif text-3xl md:text-4xl font-black uppercase text-brand-dark mb-4">
              4* Hotel <span className="text-brand-red">Alicante Golf</span>
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Spacious rooms, quality breakfast, and a premium base that keeps you close to coaching, social padel and Alicante&apos;s coastline.
            </p>
            <p className="text-stone-600 leading-relaxed mt-4">
              We chose this hotel because it matches the full Padel Tripper standard: practical location, reliable comfort, and the right atmosphere to recover well and enjoy the trip beyond the court.
            </p>
          </motion.div>

          <div className="rounded-3xl border border-brand-dark/10 bg-brand-dark p-5 md:p-7">
            <div className="grid md:grid-cols-12 gap-4 md:gap-5 items-start">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                className="md:col-span-7 rounded-2xl overflow-hidden border border-white/15"
              >
                <Image
                  src="/images/venues/Hotel-piscina.webp"
                  alt="Pool area in Hotel Alicante Golf"
                  width={1600}
                  height={1060}
                  className="block w-full h-[310px] md:h-[430px] object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </motion.div>

              <div className="md:col-span-5 h-[310px] md:h-[430px] grid grid-rows-2 gap-4 md:gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: 0.05 }}
                  className="rounded-2xl overflow-hidden border border-white/15 h-full"
                >
                  <Image
                    src="/images/venues/Hotel-golf.jpg"
                    alt="Hotel Alicante Golf exterior"
                    width={900}
                    height={700}
                    className="w-full h-full object-cover object-center"
                    sizes="(max-width: 768px) 50vw, 34vw"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-2 gap-4 md:gap-5 h-full"
                >
                  <div className="rounded-2xl overflow-hidden border border-white/15 h-full">
                    <Image
                      src="/images/venues/Hotel-comedor.webp"
                      alt="Dining area in Hotel Alicante Golf"
                      width={900}
                      height={700}
                      className="w-full h-full object-cover object-center"
                      sizes="(max-width: 768px) 50vw, 17vw"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-white/15 h-full">
                    <Image
                      src="/images/venues/Hotel-habitacion.jpg"
                      alt="Hotel room at Alicante Golf"
                      width={900}
                      height={700}
                      className="w-full h-full object-cover object-center"
                      sizes="(max-width: 768px) 50vw, 17vw"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="pt-8 md:pt-9">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 mb-1">Included Standard</p>
                  <p className="text-white font-medium">4* accommodation with B&amp;B included, close to clubs and social spots.</p>
                  <p className="text-white/65 text-sm mt-1">Designed so your days feel effortless: play, recover, repeat.</p>
                </div>
                <Sparkles size={18} className="text-brand-red shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-6 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto rounded-3xl border border-stone-200 bg-white p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-3">Ready To Join</p>
            <h3 className="font-serif text-2xl md:text-3xl font-black uppercase text-brand-dark mb-3">
              Secure Your Spot For The Next <span className="text-brand-red">Padel Trip</span>
            </h3>
            <p className="text-stone-600 leading-relaxed">Choose your date, request your quotation, and we&apos;ll handle the rest.</p>
          </div>
          <div>
            <Link
              href="/events#booking"
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-dark transition-colors"
            >
              Book Your Trip
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
