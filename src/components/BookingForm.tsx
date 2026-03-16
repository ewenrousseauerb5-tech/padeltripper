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
  const [successMsg, setSuccessMsg] = useState('');

  const [eventId, setEventId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [numParticipantsInput, setNumParticipantsInput] = useState('1');
  const [otherInfo, setOtherInfo] = useState('');
  const [acceptedLegal, setAcceptedLegal] = useState(false);

  useEffect(() => {
    if (selectedEventId) {
      setEventId(String(selectedEventId));
    }
  }, [selectedEventId]);

  const selectedEvent = ALL_EVENTS.find(event => String(event.id) === eventId);
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
    setSuccessMsg('');

    try {
      const payload = {
        event_id: Number(eventId),
        event_name: selectedEvent ? `${selectedEvent.date} - From ${selectedEvent.price}` : undefined,
        full_name: fullName.trim(),
        email: email.trim(),
        num_participants: getNormalizedParticipants(),
        special_requests: otherInfo.trim(),
        accepted_privacy_terms: acceptedLegal,
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
      setSuccessMsg('Quotation request received. We have sent a confirmation email and will contact you shortly.');
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

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
                    {event.date} - From {event.price}{event.eligibilityNote ? ` (${event.eligibilityNote})` : ''}
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

      {status === 'success' && (
        <p className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <CheckCircle2 size={18} />
          {successMsg}
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{errorMsg}</p>
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
