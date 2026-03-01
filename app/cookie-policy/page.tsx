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
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">1. What Are Cookies</h2>
            <p>Cookies are small text files placed on your device to help websites function and improve user experience.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">2. How We Use Cookies</h2>
            <p>
              We use necessary cookies for website operation and may use analytics or performance cookies to understand
              usage trends and improve the site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">3. Cookie Categories</h2>
            <p>Typical categories include strictly necessary, analytics, and functionality cookies.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">4. Managing Preferences</h2>
            <p>
              You can control cookies through your browser settings and, where available, through our cookie
              preferences banner.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">5. Contact</h2>
            <p>
              For cookie-related questions, email <a className="text-brand-red hover:underline" href="mailto:hello@padeltripper.com">hello@padeltripper.com</a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
