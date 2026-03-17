'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-stone-200 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50/50 transition-colors"
      >
        <span className="font-serif font-bold text-brand-dark text-[15px] pr-4">{title}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
          isOpen ? 'bg-brand-red text-white rotate-180' : 'bg-stone-100 text-stone-400'
        }`}>
          <ChevronDown size={16} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EventsFaqSection() {
  return (
    <section className="py-28 bg-brand-light px-6" aria-label="Padel holiday package information">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-28">
            <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-4">FAQ</p>
            <h2 className="font-serif text-4xl md:text-5xl font-black uppercase leading-tight mb-4">
              Everything You<br />Need to <span className="text-brand-red">Know</span>
            </h2>
            <p className="text-stone-400 text-sm mb-10 max-w-sm leading-relaxed">
              All the details about your padel holiday in Alicante — from coaching to accommodation.
            </p>
            <img
              src="/images/pitu-losada-coach.jpg"
              alt="Pitu Losada — 3x World Champion padel coach at Club Atlético Montemar, Alicante"
              className="rounded-2xl w-full aspect-[4/3] object-cover shadow-lg hidden md:block"
            />
          </div>

          <div className="space-y-3">
            <AccordionItem
              title="What does a typical itinerary look like?"
              defaultOpen
            >
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-brand-dark text-sm mb-1">Tuesday — Arrival</p>
                  <p className="text-stone-400 text-sm leading-relaxed">Check in, dump your bags, and get into holiday mode. There&apos;s often time for an informal hit if you land early. The trip officially starts with welcome drinks at 7.30pm up on the hotel Mirador — a rooftop terrace with views over the golf course.</p>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark text-sm mb-1">Wednesday</p>
                  <p className="text-stone-400 text-sm leading-relaxed">Meet the coaching team at Club Atlético Montemar at 9.45am. Morning coaching session 10am–12pm. After a break, we head to Bela Padel Centre for a 3–5pm afternoon social — expect competitive games and plenty of laughs.</p>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark text-sm mb-1">Thursday</p>
                  <p className="text-stone-400 text-sm leading-relaxed">Morning coaching at Montemar again (10am–12pm), then back to Bela for the afternoon session (3–5pm). Round the day off with a night out in the city — Plaza del Ayuntamiento is the go-to for a few well-earned drinks.</p>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark text-sm mb-1">Friday — Departure</p>
                  <p className="text-stone-400 text-sm leading-relaxed">Last coaching session of the trip (10am–12pm), then farewells at 12.15pm. Got an evening flight? The courts don&apos;t close at midday — feel free to keep playing.</p>
                </div>
                <p className="text-stone-300 text-xs italic">Afternoon sessions may run 90 minutes subject to court availability.</p>
              </div>
            </AccordionItem>

            <AccordionItem title="Do flights come with the package?">
              <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                <p>Flights aren&apos;t included — you&apos;ll book those independently. Alicante is well connected from most UK airports and flights are generally very reasonable.</p>
                <p>Make sure you have adequate travel insurance in place before you travel. This should cover the dates of your trip and any sporting activities.</p>
                <p className="font-medium text-brand-dark">Important: don&apos;t book your flights until you&apos;ve received email confirmation from us that your trip is going ahead.</p>
              </div>
            </AccordionItem>

            <AccordionItem title="How do I get from the airport to the hotel?">
              <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                <p>Taxis from Alicante airport are easy to find and reliable — expect to pay around €35–40 and the journey takes roughly 20 minutes.</p>
                <p>If several of you are landing around the same time, we&apos;ll coordinate a group transfer where we can. Full arrival details are shared ahead of the trip.</p>
                <p>Hotel check-in is from <strong className="text-brand-dark">4pm</strong> and check-out is by <strong className="text-brand-dark">12pm</strong> on your departure day.</p>
              </div>
            </AccordionItem>

            <AccordionItem title="What happens between coaching sessions?">
              <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                <p>Between sessions the time is yours. Head back to the hotel for a swim and some downtime, or stay at the club and make use of the bar and facilities on site.</p>
                <p>Evenings are unstructured — Alicante has a brilliant restaurant and bar scene. We&apos;ll share recommendations and often join the group for a drink or dinner.</p>
              </div>
            </AccordionItem>

            <AccordionItem title="Where do we stay?">
              <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                <p>Everyone stays at the Hotel Alicante Golf — a comfortable 4-star hotel right next to Playa San Juan. Pool, sun terrace, good food, and an easy tram link into the city centre.</p>
                <p>The beach is a short walk away and the hotel has everything you need to recharge between sessions.</p>
                <p className="font-medium text-brand-dark">Pricing is based on two guests sharing a room. Solo travellers can add a single room supplement of &pound;150.</p>
              </div>
            </AccordionItem>

            <AccordionItem title="Do I need to bring my own racquet?">
              <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                <p>Not at all — racquet hire is included in the price, so don&apos;t worry if you don&apos;t have your own.</p>
                <p>Bring comfortable sports kit and proper court shoes. Alicante tends to be warm and sunny even in spring, so pack a cap and sunscreen too.</p>
              </div>
            </AccordionItem>

            <AccordionItem title="How does the group stay in touch?">
              <div className="text-stone-400 text-sm space-y-3 leading-relaxed">
                <p>Before the trip you&apos;ll have direct contact details for our team on the ground — someone will always be available if you need anything.</p>
                <p>We set up a WhatsApp group for each trip so everyone can connect ahead of time and during the week. It&apos;s optional but most people find it useful.</p>
              </div>
            </AccordionItem>
          </div>
        </div>
      </div>
    </section>
  );
}
