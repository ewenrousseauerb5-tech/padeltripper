import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for quotation requests and travel services.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
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
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">1. About Us</h2>
            <p>
              These terms apply to services provided by Padel Tripper (UK Company Registration No. 15698275). For
              support, contact <a className="text-brand-red hover:underline" href="mailto:hello@padeltripper.com">hello@padeltripper.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">2. Quotation Requests and Bookings</h2>
            <p>
              Submitting a website form creates a quotation request only. It does not create a confirmed booking or
              travel contract. A booking is only confirmed after explicit confirmation from us and completion of
              applicable payment steps.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">3. Eligibility and Authority</h2>
            <p>
              The person submitting a group quotation request confirms they are authorized to act for all participants
              included in the request.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">4. Pricing and Availability</h2>
            <p>
              Website prices are indicative (“From” prices) and may vary by room type, availability, group composition,
              and optional extras. Final pricing is provided in your quotation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">5. Payment Terms</h2>
            <p>
              Where a booking is confirmed, payment conditions (deposit, balance due date, methods, and deadlines) will
              be set out in the quotation or booking confirmation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">6. Changes and Cancellations</h2>
            <p>
              Cancellation and amendment terms depend on the specific trip and third-party suppliers. Applicable terms
              will be communicated in the quotation or booking confirmation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">7. Travel, Insurance, and Health</h2>
            <p>
              You are responsible for travel documents, visas, fitness to participate, and suitable travel insurance,
              including sports and medical cover where appropriate.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">8. Conduct and Safety</h2>
            <p>
              Participants must follow venue, coach, and local safety instructions. We may refuse participation where
              behavior creates safety risks for the group.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">9. Liability</h2>
            <p>
              Nothing in these terms excludes liability that cannot be excluded by law. Subject to that, liability is
              limited to foreseeable losses directly caused by our breach and excludes indirect or consequential loss.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">10. Force Majeure</h2>
            <p>
              We are not liable for delays or failures caused by events outside reasonable control, including extreme
              weather, transport disruption, public authority action, or similar events.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">11. Data Protection</h2>
            <p>
              Personal data is handled in accordance with our{' '}
              <a className="text-brand-red hover:underline" href="/privacy-policy">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">12. Governing Law</h2>
            <p>
              These terms are governed by applicable law in the relevant jurisdiction of contracting, without limiting
              your mandatory consumer rights under local law.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
