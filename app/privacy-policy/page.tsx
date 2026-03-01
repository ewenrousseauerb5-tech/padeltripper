import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Padel Tripper',
  description: 'How Padel Tripper collects, uses, and protects personal data.',
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
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">1. Who We Are</h2>
            <p>
              Padel Tripper organizes padel travel experiences and processes personal data to handle quotation requests,
              customer communication, and trip administration.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">2. Data We Collect</h2>
            <p>
              We may collect lead booker details (name, email, phone), participant details provided in quotation forms,
              and communication details needed to respond to your request.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">3. How We Use Your Data</h2>
            <p>We use your data to prepare and manage quotation requests, communicate trip information, and provide customer support.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">4. Legal Basis</h2>
            <p>
              We process personal data based on your request for pre-contractual steps, legitimate interests in operating
              our services, and consent where required.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">5. Data Sharing</h2>
            <p>
              We share data only with service providers necessary to operate our services, including hosting, database,
              and email infrastructure providers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">6. Retention</h2>
            <p>We retain personal data only for as long as needed for operational, legal, and accounting purposes.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">7. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, erase, restrict, or object to
              processing of your personal data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">8. Contact</h2>
            <p>
              For privacy requests, contact us at <a className="text-brand-red hover:underline" href="mailto:hello@padeltripper.com">hello@padeltripper.com</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
