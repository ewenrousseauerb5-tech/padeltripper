'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_PHOTOS = [
  { src: '/images/post-tournament-celebration.jpg', alt: 'Padel Tripper group celebrating after a tournament at Club Montemar, Alicante' },
  { src: '/images/alicante-castle-view.jpg', alt: 'View over Alicante from the castle — Costa Blanca' },
  { src: '/images/post-tournament-drinks.jpg', alt: 'Group padel holiday — post-tournament drinks in the sun' },
  { src: '/images/padel-coaching-alicante.jpg', alt: 'Padel coaching session at Club Atlético Montemar, Alicante' },
  { src: '/images/san-juan-beach-alicante.jpg', alt: 'Playa San Juan beach, Alicante — just minutes from Hotel Alicante Golf' },
  { src: '/images/players-enjoying-padel.jpg', alt: 'Players laughing during a padel coaching session in Alicante' },
  { src: '/images/group-social-evening.jpg', alt: 'Padel Tripper group social evening in Alicante' },
  { src: '/images/padel-night-game.jpg', alt: 'Evening padel under the lights in Alicante' },
];

export default function ExperienceGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % CAROUSEL_PHOTOS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + CAROUSEL_PHOTOS.length) % CAROUSEL_PHOTOS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-14 md:py-16 bg-brand-dark px-6" aria-label="Padel holiday experience gallery">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">Gallery</p>
          <h2 className="font-serif text-3xl font-black text-white uppercase mb-3">The Padel Tripper <span className="text-brand-red">Experience</span></h2>
          <p className="text-white/40 text-sm font-light">More than just padel — it&apos;s the people, the sun, the memories.</p>
        </div>
        <div className="relative">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={CAROUSEL_PHOTOS[currentSlide].src}
                alt={CAROUSEL_PHOTOS[currentSlide].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {CAROUSEL_PHOTOS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-brand-red w-8' : 'bg-white/20 w-1.5 hover:bg-white/40'
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
