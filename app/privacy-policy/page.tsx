import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Padel Tripper collects, uses, and protects personal data.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-stone-50">
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-24">
        <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-xs mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl font-black text-brand-dark uppercase mb-4">Privacy Policy</h1>
        <p className="text-stone-500 text-sm mb-10">Last updated: March 1, 2026</p>

        <div className="space-y-8 text-stone-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">1. Data Controller</h2>
            <p>
              Padel Tripper (UK Company Registration No. 15698275) is the data controller for personal data processed
              through this website and quotation forms.
            </p>
            <p>
              Contact for privacy matters:{' '}
              <a className="text-brand-red hover:underline" href="mailto:hello@padeltripper.com">hello@padeltripper.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">2. Personal Data We Collect</h2>
            <p>Depending on your interaction with us, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Lead traveler details (name, email, phone).</li>
              <li>Participant details submitted by the lead traveler (name, email, level, requirements).</li>
              <li>Trip and accommodation preferences and special requests.</li>
              <li>Communication and customer support records.</li>
              <li>Technical and usage data (for security and website operation).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">3. How and Why We Use Data</h2>
            <p>We process personal data to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Handle quotation requests and respond to inquiries.</li>
              <li>Administer potential and confirmed travel arrangements.</li>
              <li>Communicate important service updates.</li>
              <li>Maintain website security and prevent abuse.</li>
              <li>Meet legal, accounting, and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">4. Legal Bases for Processing</h2>
            <p>We rely on one or more of the following legal bases under UK GDPR / EU GDPR:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pre-contractual steps at your request (for quotations and trip planning).</li>
              <li>Performance of a contract (where a booking is confirmed).</li>
              <li>Legitimate interests (service operations, support, fraud prevention).</li>
              <li>Legal obligation (financial, tax, compliance records).</li>
              <li>Consent (where required, including certain cookies/communications).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">5. Data Shared with Service Providers</h2>
            <p>We use trusted processors to deliver services, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Cloudflare (hosting and edge infrastructure).</li>
              <li>Supabase (database infrastructure).</li>
              <li>Resend (transactional email delivery).</li>
            </ul>
            <p>We only share data necessary for the relevant service and under contractual safeguards.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">6. International Data Transfers</h2>
            <p>
              Where personal data is transferred outside the UK/EEA, we rely on lawful transfer mechanisms such as
              adequacy decisions or standard contractual clauses, plus supplementary safeguards where needed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">7. Data Retention</h2>
            <p>
              We keep personal data only for as long as necessary for the purposes above, including legal, accounting,
              and dispute-resolution requirements. Retention periods may vary by data type and legal context.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">8. Your Data Protection Rights</h2>
            <p>You may have the right to request access, rectification, erasure, restriction, objection, and data portability.</p>
            <p>
              To exercise your rights, email{' '}
              <a className="text-brand-red hover:underline" href="mailto:hello@padeltripper.com">hello@padeltripper.com</a>.
            </p>
            <p>
              You also have the right to complain to your local data protection authority. UK users can contact the
              Information Commissioner&apos;s Office (ICO).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">9. Data Submitted for Other Participants</h2>
            <p>
              If you submit personal data for other participants, you must be authorized to do so and must provide them
              with relevant privacy information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">10. Cookies</h2>
            <p>
              We use cookies and similar technologies as described in our{' '}
              <a className="text-brand-red hover:underline" href="/cookie-policy">Cookie Policy</a>.
            </p>
            <p>
              Where you make a cookie choice, we store a consent log (decision, timestamp, policy version, technical
              identifiers such as client ID, user-agent, and IP address) to demonstrate compliance.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this policy periodically. Material changes will be reflected by updating the “Last updated”
              date above.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">12. Retention for Cookie Consent Logs</h2>
            <p>
              Cookie consent logs are retained for up to 24 months, after which they are deleted or anonymized unless a
              longer period is required to meet legal obligations.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
