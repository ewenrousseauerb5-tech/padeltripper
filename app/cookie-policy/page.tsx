import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Padel Tripper',
  description: 'Information about how Padel Tripper uses cookies and similar technologies.',
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-stone-50">
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-24">
        <p className="text-brand-red font-semibold uppercase tracking-[0.25em] text-xs mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl font-black text-brand-dark uppercase mb-4">Cookie Policy</h1>
        <p className="text-stone-500 text-sm mb-10">Last updated: March 1, 2026</p>

        <div className="space-y-8 text-stone-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">1. What Cookies Are</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. Similar technologies
              (local storage, pixels, scripts) may be used for comparable purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">2. Why We Use Cookies</h2>
            <p>We use cookies for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Strictly necessary website operation and security.</li>
              <li>Remembering basic preferences where applicable.</li>
              <li>Analytics/performance measurement (only where consent is required and provided).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">3. Cookie Categories</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Strictly Necessary:</strong> required for core site functions and security.</li>
              <li><strong>Functional:</strong> help remember user preferences.</li>
              <li><strong>Analytics:</strong> help us understand website usage and improve services.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">4. Third-Party Services</h2>
            <p>
              Some cookies or similar technologies may be set by third-party providers we use to run and secure the
              site. Where required by law, non-essential cookies are only used after consent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">5. Managing Cookie Choices</h2>
            <p>
              You can manage cookie preferences through our cookie banner/preferences tool (when enabled) and through
              your browser settings. Disabling strictly necessary cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">6. Changes to This Policy</h2>
            <p>
              We may update this policy to reflect legal, technical, or operational changes. Updates are posted on this
              page with a revised “Last updated” date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">7. Contact</h2>
            <p>
              For cookie questions, contact{' '}
              <a className="text-brand-red hover:underline" href="mailto:hello@padeltripper.com">hello@padeltripper.com</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
