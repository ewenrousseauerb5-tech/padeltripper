'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface PartnerApiResponse {
  ok: boolean;
  error?: string;
  reference?: string;
}

const initialData = {
  fullName: '',
  email: '',
  phone: '',
  role: '',
  details: '',
  acceptedPrivacyTerms: false,
};

export default function PartnerEnquirySection() {
  const [data, setData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/partner-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          role: data.role,
          message: data.details,
          accepted_privacy_terms: data.acceptedPrivacyTerms,
        }),
      });

      const result = (await response.json()) as PartnerApiResponse;
      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Could not send request.');
      }

      setReference(result.reference || '');
      setIsSubmitted(true);
      setData(initialData);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Could not send request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="partner-form" className="py-20 md:py-24 px-6 bg-brand-light border-t border-stone-200/70">
      <div className="max-w-5xl mx-auto rounded-3xl border border-stone-200 bg-white p-7 md:p-10">
        <p className="text-brand-red font-semibold uppercase tracking-[0.3em] text-xs mb-3">Enquire Below</p>
        <h2 className="font-serif text-3xl md:text-4xl font-black uppercase text-brand-dark mb-6">
          Become a <span className="text-brand-red">Partner</span>
        </h2>

        {isSubmitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 md:p-7">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-serif text-2xl font-black uppercase text-brand-dark mb-2">Request Sent</h3>
            <p className="text-stone-600 mb-3">Thanks. We&apos;ll review your details and reply shortly.</p>
            {reference && (
              <p className="text-sm text-stone-700">
                Your partner reference: <span className="font-semibold text-brand-dark">{reference}</span>
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Full Name *</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm focus:border-brand-red focus:outline-none transition-colors"
                  value={data.fullName}
                  onChange={e => setData({ ...data, fullName: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Email *</label>
                <input
                  required
                  type="email"
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm focus:border-brand-red focus:outline-none transition-colors"
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm focus:border-brand-red focus:outline-none transition-colors"
                  value={data.phone}
                  onChange={e => setData({ ...data, phone: e.target.value })}
                  placeholder="+44 ..."
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Role / Club *</label>
                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm focus:border-brand-red focus:outline-none transition-colors"
                  value={data.role}
                  onChange={e => setData({ ...data, role: e.target.value })}
                  placeholder="Coach, club manager, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Anything Else</label>
              <textarea
                rows={4}
                className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm focus:border-brand-red focus:outline-none transition-colors"
                value={data.details}
                onChange={e => setData({ ...data, details: e.target.value })}
                placeholder="Tell us a bit about your network and goals."
              />
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
              <label className="flex items-start gap-3 text-sm text-stone-600">
                <input
                  required
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-stone-300 text-brand-red focus:ring-brand-red"
                  checked={data.acceptedPrivacyTerms}
                  onChange={e => setData({ ...data, acceptedPrivacyTerms: e.target.checked })}
                />
                <span>
                  I accept the{' '}
                  <Link href="/privacy-policy" className="text-brand-red underline hover:text-brand-dark">Privacy Policy</Link>
                  {' '}and{' '}
                  <Link href="/terms-and-conditions" className="text-brand-red underline hover:text-brand-dark">Terms &amp; Conditions</Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brand-red py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Sending...' : 'Submit Partner Enquiry'}
            </button>

            {error && <p className="text-sm text-brand-red text-center">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
