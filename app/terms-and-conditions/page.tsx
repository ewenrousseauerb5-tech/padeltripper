import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Padel Tripper',
  description: 'Terms and conditions for quotation requests and travel services.',
};

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-stone-50">
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-24">
        <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-xs mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl font-black text-brand-dark uppercase mb-4">Terms & Conditions</h1>
        <p className="text-stone-500 text-sm mb-10">Last updated: March 1, 2026</p>

        <div className="space-y-8 text-stone-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">1. Scope</h2>
            <p>These terms apply to quotation requests, bookings, and related services provided by Padel Tripper.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">2. Quotation Requests</h2>
            <p>
              Submitting a form creates a quotation request only. It does not confirm a booking. Confirmation requires
              explicit acceptance from Padel Tripper and completion of payment steps.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">3. Pricing</h2>
            <p>
              Prices displayed on the website are indicative and may vary by room type, availability, participant
              profile, or optional services. Final pricing is shown in your quotation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">4. Customer Responsibilities</h2>
            <p>
              You are responsible for providing accurate information. If you submit personal data for other
              participants, you confirm that you are authorized to share it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">5. Cancellations and Changes</h2>
            <p>
              Cancellation and amendment terms depend on the specific trip and supplier conditions. These terms are
              provided in your quotation or booking confirmation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">6. Liability</h2>
            <p>
              Padel Tripper is not liable for losses caused by events outside reasonable control, including travel
              disruptions, force majeure, or third-party provider actions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">7. Contact</h2>
            <p>
              For terms questions, contact <a className="text-brand-red hover:underline" href="mailto:hello@padeltripper.com">hello@padeltripper.com</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
