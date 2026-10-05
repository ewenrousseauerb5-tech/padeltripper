import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Check, Clock, Star } from 'lucide-react';
import BookingForm from '@/src/components/BookingForm';
import { ALL_EVENTS, getEventBySlug, getEventSlug, getVisiblePromoNote } from '@/src/data/events';
import { padelHolidayFaqs } from '@/src/data/padelHolidaysSpain';
import { SITE_URL } from '@/src/lib/seo';
import { toDualCurrencyDisplay } from '@/src/lib/pricing';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

function getEndDate(startDate: string, nights: number) {
  const date = new Date(`${startDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + nights);
  return date.toISOString().slice(0, 10);
}

export function generateStaticParams() {
  return ALL_EVENTS.map(event => ({
    slug: getEventSlug(event),
  }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Padel Holiday Date',
    };
  }

  const title = `${event.date} | Padel Holiday Alicante`;
  const description = `${event.date} padel holiday in Alicante, Spain. ${event.nights} nights with coaching, social play, 4-star hotel stay and local Padel Tripper support.`;
  const image = event.image || '/images/post-tournament-celebration.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: `/events/${getEventSlug(event)}`,
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/events/${getEventSlug(event)}`,
      title: `${title} | Padel Tripper`,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `Padel Tripper holiday in Alicante - ${event.date}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Padel Tripper`,
      description,
      images: [image],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) notFound();

  const eventUrl = `${SITE_URL}/events/${getEventSlug(event)}`;
  const image = event.image || '/images/post-tournament-celebration.jpg';
  const promoNote = getVisiblePromoNote(event);
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.name || `Padel holiday in Alicante - ${event.date}`,
    sport: 'Padel',
    startDate: event.startDate,
    endDate: getEndDate(event.startDate, event.nights),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.hotel,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Alicante',
        addressCountry: 'ES',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Padel Tripper',
      url: SITE_URL,
    },
    image: `${SITE_URL}${image}`,
    description: `Small-group padel holiday in Alicante, Spain with ${event.formatNote || 'coaching and social play'}, accommodation at ${event.hotel}, and local support from Padel Tripper.`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: event.price.replace(/[^\d.]/g, ''),
      availability:
        event.status === 'Sold Out'
          ? 'https://schema.org/SoldOut'
          : event.status === 'Available'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/LimitedAvailability',
      url: `${SITE_URL}/events#booking`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Events',
        item: `${SITE_URL}/events`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: event.date,
        item: eventUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="bg-white">
        <section className="relative min-h-[620px] overflow-hidden flex items-end">
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={`Padel Tripper holiday in Alicante - ${event.date}`}
              fill
              priority
              sizes="100vw"
              className={`object-cover brightness-[0.34] ${
                event.imagePosition === 'center'
                  ? 'object-center'
                  : event.imagePosition === 'bottom'
                    ? 'object-bottom'
                    : event.imagePosition === 'lower'
                      ? 'object-[center_60%]'
                      : event.imagePosition === 'slightLower'
                        ? 'object-[center_22%]'
                        : event.imagePosition === 'slightTop'
                          ? 'object-[center_12%]'
                          : event.imagePosition === 'midPosition'
                            ? 'object-[center_36%]'
                            : 'object-top'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/15" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-32 md:pb-20">
            <Link
              href="/events"
              className="mb-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/65 hover:text-white"
            >
              Back to all events
            </Link>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">Padel Holiday Alicante</p>
            <h1 className="max-w-4xl font-serif text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl">
              {event.date}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
              {event.nights} nights in Alicante with padel coaching, social play, 4-star accommodation and local support from the Padel Tripper team.
            </p>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Status</p>
                <p className="mt-1 font-serif text-xl font-black text-white">{event.status}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Shared room</p>
                <p className="mt-1 font-serif text-xl font-black text-white">From {toDualCurrencyDisplay(event.price)}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Private room</p>
                <p className="mt-1 font-serif text-xl font-black text-white">+£200</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div>
              <div className="mb-8 rounded-2xl border border-stone-200 bg-brand-light p-5 md:p-7">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-red">Trip Details</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <Calendar size={17} className="mt-1 shrink-0 text-brand-red" />
                    <div>
                      <p className="font-semibold text-brand-dark">{event.date}</p>
                      <p className="text-sm text-stone-500">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={17} className="mt-1 shrink-0 text-brand-red" />
                    <div>
                      <p className="font-semibold text-brand-dark">{event.nights} nights / {event.nights + 1} days</p>
                      <p className="text-sm text-stone-500">Short padel holiday format</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Star size={17} className="mt-1 shrink-0 text-brand-red" />
                    <div>
                      <p className="font-semibold text-brand-dark">{event.hotel}</p>
                      <p className="text-sm text-stone-500">B&amp;B included</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Check size={17} className="mt-1 shrink-0 text-brand-red" />
                    <div>
                      <p className="font-semibold text-brand-dark">{event.formatNote || '6h coaching + 6h social play'}</p>
                      <p className="text-sm text-stone-500">Mixed abilities and solo travellers welcome</p>
                    </div>
                  </div>
                </div>
                {promoNote && (
                  <p className="mt-5 rounded-xl border border-brand-red/20 bg-white px-4 py-3 text-sm font-semibold text-brand-red">
                    {promoNote}
                  </p>
                )}
                {event.eligibilityNote && (
                  <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
                    {event.eligibilityNote}
                  </p>
                )}
              </div>

              <section id="itinerary" className="scroll-mt-24">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">Full Itinerary</p>
                <h2 className="mb-6 font-serif text-3xl font-black uppercase text-brand-dark md:text-4xl">
                  What The Trip Looks Like
                </h2>
                <div className="space-y-4">
                  {padelHolidayFaqs.slice(0, 7).map(item => (
                    <article key={item.question} className="rounded-2xl border border-stone-200 bg-white p-5">
                      <h3 className="mb-2 font-serif text-lg font-black uppercase text-brand-dark">{item.question}</h3>
                      <p className="text-sm leading-relaxed text-stone-600">{item.answer}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xl md:p-5 lg:sticky lg:top-24">
              {event.status === 'Sold Out' ? (
                <div className="rounded-xl bg-stone-100 p-5 text-center">
                  <p className="mb-2 font-serif text-2xl font-black uppercase text-brand-dark">Sold Out</p>
                  <p className="mb-5 text-sm leading-relaxed text-stone-500">
                    This date is currently sold out. Browse the full events page to find the next available trip.
                  </p>
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-red"
                  >
                    View Other Dates
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-red">Enquire</p>
                    <h2 className="mt-2 font-serif text-2xl font-black uppercase text-brand-dark">Book This Date</h2>
                  </div>
                  <BookingForm selectedEventId={event.id} />
                </>
              )}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
