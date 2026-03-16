'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { ALL_EVENTS, FUTURE_EVENTS } from '../data/events';

interface BookingFormProps {
  selectedEventId?: number | null;
}

interface BookingResponse {
  ok: boolean;
  error?: string;
  quotation_id?: number;
}

const inputClass =
  'w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm';

const labelClass = 'block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2';

export default function BookingForm({ selectedEventId }: BookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [eventId, setEventId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [numParticipantsInput, setNumParticipantsInput] = useState('1');
  const [otherInfo, setOtherInfo] = useState('');
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [confirmedEligibility, setConfirmedEligibility] = useState(false);

  useEffect(() => {
    if (selectedEventId) {
      setEventId(String(selectedEventId));
    }
  }, [selectedEventId]);

  useEffect(() => {
    setConfirmedEligibility(false);
  }, [eventId]);

  const selectedEvent = ALL_EVENTS.find(event => String(event.id) === eventId);
  const requiresEligibilityConfirmation = Boolean(selectedEvent?.eligibilityNote);
  const getNormalizedParticipants = () => {
    const parsed = parseInt(numParticipantsInput, 10);
    if (!Number.isFinite(parsed)) return 1;
    return Math.max(1, Math.min(16, parsed));
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setNumParticipantsInput('1');
    setOtherInfo('');
    setAcceptedLegal(false);
    setConfirmedEligibility(false);

    if (!selectedEventId) {
      setEventId('');
    } else {
      setEventId(String(selectedEventId));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const payload = {
        event_id: Number(eventId),
        event_name: selectedEvent ? `${selectedEvent.date} - From ${selectedEvent.price}` : undefined,
        full_name: fullName.trim(),
        email: email.trim(),
        num_participants: getNormalizedParticipants(),
        special_requests: otherInfo.trim(),
        accepted_privacy_terms: acceptedLegal,
        eligibility_confirmed: requiresEligibilityConfirmation ? confirmedEligibility : undefined,
      };

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as BookingResponse;
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Submission failed.');
      }

      resetForm();
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 md:p-7">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 size={26} />
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-black text-brand-dark uppercase leading-tight mb-3">
          Thanks For Your Request
        </h3>
        <p className="text-stone-600 leading-relaxed mb-6">
          We&apos;ve received your quotation request. Here&apos;s what happens next:
        </p>

        <div className="space-y-3 mb-6">
          <div className="rounded-xl border border-stone-200 bg-white p-4">
            <p className="text-sm font-semibold text-brand-dark mb-1">1. Availability Check</p>
            <p className="text-sm text-stone-600">We now check hotel and trip availability for your selected dates.</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4">
            <p className="text-sm font-semibold text-brand-dark mb-1">2. Confirmation To Book Flights</p>
            <p className="text-sm text-stone-600">If available, we confirm your place so you can safely book your flights.</p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4">
            <p className="text-sm font-semibold text-brand-dark mb-1">3. Pre-Trip WhatsApp Group</p>
            <p className="text-sm text-stone-600">A few days before the event, we add you to the WhatsApp group and you&apos;re ready to enjoy the trip.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/447939870682"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-brand-dark px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-red transition-colors"
          >
            Message on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setStatus('idle');
            }}
            className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:border-brand-red hover:text-brand-red transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red mb-5">Quotation Request</p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClass}>Select Date *</label>
            <div className="relative">
              <select
                required
                value={eventId}
                onChange={e => setEventId(e.target.value)}
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="">Choose a date...</option>
                {FUTURE_EVENTS.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.date} - From {event.price}
                    {event.originalPrice ? ` (was ${event.originalPrice})` : ''}
                    {event.promoNote ? ` - ${event.promoNote}` : ''}
                    {event.eligibilityNote ? ` (${event.eligibilityNote})` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              required
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              required
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2 md:max-w-[220px]">
            <label className={labelClass}>How Many Players *</label>
            <input
              required
              type="number"
              min={1}
              max={16}
              value={numParticipantsInput}
              onFocus={e => e.currentTarget.select()}
              onChange={e => setNumParticipantsInput(e.target.value)}
              onBlur={() => setNumParticipantsInput(String(getNormalizedParticipants()))}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Any Other Information</label>
            <textarea
              rows={5}
              placeholder="Anything else we should know?"
              value={otherInfo}
              onChange={e => setOtherInfo(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{errorMsg}</p>
      )}

      {requiresEligibilityConfirmation && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <label className="flex items-start gap-3 text-sm text-amber-900">
            <input
              required
              type="checkbox"
              checked={confirmedEligibility}
              onChange={e => setConfirmedEligibility(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-amber-300 text-brand-red focus:ring-brand-red"
            />
            <span>
              I confirm I meet the required level for this event: <strong>{selectedEvent?.eligibilityNote}</strong>.
            </span>
          </label>
        </div>
      )}

      <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
        <label className="flex items-start gap-3 text-sm text-stone-600">
          <input
            required
            type="checkbox"
            checked={acceptedLegal}
            onChange={e => setAcceptedLegal(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-stone-300 text-brand-red focus:ring-brand-red"
          />
          <span>
            I accept the{' '}
            <Link href="/privacy-policy" className="text-brand-red underline hover:text-brand-dark">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms-and-conditions" className="text-brand-red underline hover:text-brand-dark">
              Terms & Conditions
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-full bg-brand-red text-white font-semibold uppercase tracking-[0.15em] hover:bg-brand-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Quotation Request'}
      </button>
      <p className="text-center text-stone-400 text-sm">We&apos;ll confirm your quotation by email within 24 hours.</p>
    </form>
  );
}
