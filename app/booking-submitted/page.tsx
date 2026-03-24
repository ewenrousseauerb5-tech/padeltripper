import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Request Received | Padel Tripper',
  robots: {
    index: false,
    follow: false,
  },
};

interface BookingSubmittedPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BookingSubmittedPage({ searchParams }: BookingSubmittedPageProps) {
  const params = await searchParams;
  const eventLabel = Array.isArray(params.event) ? params.event[0] : params.event;
  const quotationId = Array.isArray(params.qid) ? params.qid[0] : params.qid;

  return (
    <main className="bg-[#0b0d10] text-white min-h-screen">
      <section className="px-4 md:px-6 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/10 relative min-h-[62vh]">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/group-bela-court.jpg"
            aria-hidden="true"
          >
            <source src="/videos/hero-background.m4v" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/55" />

          <div className="relative z-10 p-6 md:p-10 lg:p-12 h-full flex flex-col justify-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 mb-5">
              <CheckCircle2 size={28} />
            </div>

            <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-[10px] mb-3">Request Received</p>
            <h1 className="font-serif text-3xl md:text-6xl font-black uppercase leading-[0.95] mb-5 max-w-4xl">
              Thanks For Your
              <span className="block text-brand-red">Quotation Request</span>
            </h1>

            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-3xl">
              We have your details and the team is already checking availability. We aim to get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:py-14">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6 md:gap-8 items-start">
          <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm">
            {(eventLabel || quotationId) && (
              <div className="rounded-2xl border border-white/12 bg-black/25 p-4 mb-7 text-sm">
                {eventLabel && <p className="text-white/85 mb-1"><span className="text-white/50">Event:</span> {eventLabel}</p>}
                {quotationId && <p className="text-white/85"><span className="text-white/50">Reference:</span> #{quotationId}</p>}
              </div>
            )}

            <div className="space-y-3 mb-8">
              <div className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold mb-1">1. Hotel + trip availability check</p>
                <p className="text-white/65 text-sm">We verify the selected date and room options.</p>
              </div>
              <div className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold mb-1">2. Confirmation to book flights</p>
                <p className="text-white/65 text-sm">If availability is confirmed, we send your confirmation to proceed safely.</p>
              </div>
              <div className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold mb-1">3. WhatsApp onboarding before the trip</p>
                <p className="text-white/65 text-sm">A few days before travel, you are added to the event group and ready to go.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/447939870682"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark transition-colors"
              >
                <MessageCircle size={14} />
                WhatsApp Us
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/85 hover:bg-white hover:text-brand-dark hover:border-white transition-colors"
              >
                Back To Page
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/12 bg-white/[0.03] p-5 md:p-6 backdrop-blur-sm">
            <div className="rounded-2xl overflow-hidden border border-white/12 mb-5">
              <img
                src="/images/group-bela-court.jpg"
                alt="Padel Tripper players in Alicante"
                className="h-44 w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-brand-red font-semibold uppercase tracking-[0.24em] text-[10px] mb-3">FAQ</p>
            <div className="space-y-2.5 text-sm">
              <details className="rounded-xl border border-white/10 bg-white/[0.02] p-3 group">
                <summary className="cursor-pointer list-none font-semibold text-white/90">When will I get a reply?</summary>
                <p className="mt-2 text-white/60">Usually within 24 hours, including confirmation of availability.</p>
              </details>
              <details className="rounded-xl border border-white/10 bg-white/[0.02] p-3 group">
                <summary className="cursor-pointer list-none font-semibold text-white/90">Can I ask questions before paying?</summary>
                <p className="mt-2 text-white/60">Yes, we encourage it. Message us on WhatsApp and we will guide you.</p>
              </details>
              <details className="rounded-xl border border-white/10 bg-white/[0.02] p-3 group">
                <summary className="cursor-pointer list-none font-semibold text-white/90">What happens next after confirmation?</summary>
                <p className="mt-2 text-white/60">You can book flights, then we add you to the event WhatsApp group before travel.</p>
              </details>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
