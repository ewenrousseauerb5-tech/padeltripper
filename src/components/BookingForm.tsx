'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { ALL_EVENTS, FUTURE_EVENTS } from '../data/events';
import { toDualCurrencyDisplay } from '../lib/pricing';

interface BookingFormProps {
  selectedEventId?: number | null;
  priceOverrides?: Record<number, string>;
}

interface BookingResponse {
  ok: boolean;
  error?: string;
  quotation_id?: number;
}

const inputClass =
  'w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm';

const labelClass = 'block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2';

export default function BookingForm({ selectedEventId, priceOverrides }: BookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const [eventId, setEventId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [numParticipantsInput, setNumParticipantsInput] = useState('1');
  const [otherInfo, setOtherInfo] = useState('');
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [confirmedEligibility, setConfirmedEligibility] = useState(false);
  const [attribution, setAttribution] = useState<{
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    utm_term: string;
    gclid: string;
  }>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    gclid: '',
  });

  useEffect(() => {
    if (selectedEventId) {
      setEventId(String(selectedEventId));
    }
  }, [selectedEventId]);

  useEffect(() => {
    setConfirmedEligibility(false);
  }, [eventId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const fromQuery = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      gclid: urlParams.get('gclid') || '',
    };

    const hasQueryAttribution = Object.values(fromQuery).some(Boolean);
    if (hasQueryAttribution) {
      setAttribution(fromQuery);
      window.sessionStorage.setItem('pt_attribution', JSON.stringify(fromQuery));
      return;
    }

    const stored = window.sessionStorage.getItem('pt_attribution');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Record<string, string>;
        setAttribution({
          utm_source: parsed.utm_source || '',
          utm_medium: parsed.utm_medium || '',
          utm_campaign: parsed.utm_campaign || '',
          utm_content: parsed.utm_content || '',
          utm_term: parsed.utm_term || '',
          gclid: parsed.gclid || '',
        });
      } catch {
        // no-op
      }
    }
  }, []);

  const selectedEvent = ALL_EVENTS.find(event => String(event.id) === eventId);
  const selectableEvents = FUTURE_EVENTS.filter(event => event.status !== 'Sold Out');
  const getDisplayPrice = (event: { id: number; price: string }) => priceOverrides?.[event.id] ?? event.price;
  const selectedEventPrice = selectedEvent ? getDisplayPrice(selectedEvent) : null;
  const selectedEventOriginalPrice = selectedEvent
    ? (selectedEvent.originalPrice || (priceOverrides?.[selectedEvent.id] && priceOverrides[selectedEvent.id] !== selectedEvent.price ? selectedEvent.price : null))
    : null;
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
        event_name: selectedEvent ? `${selectedEvent.date} - From ${getDisplayPrice(selectedEvent)}` : undefined,
        full_name: fullName.trim(),
        email: email.trim(),
        num_participants: getNormalizedParticipants(),
        special_requests: otherInfo.trim(),
        accepted_privacy_terms: acceptedLegal,
        eligibility_confirmed: requiresEligibilityConfirmation ? confirmedEligibility : undefined,
        ...attribution,
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

      const eventLabel = selectedEvent ? selectedEvent.date : '';
      const query = new URLSearchParams();
      if (eventLabel) query.set('event', eventLabel);
      if (data.quotation_id) query.set('qid', String(data.quotation_id));
      const queryString = query.toString();
      const destination = queryString ? `/booking-submitted?${queryString}` : '/booking-submitted';

      resetForm();
      router.push(destination);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-7 pb-2 md:pb-4">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red mb-5">Enquiry Request</p>
        <div className="mb-5 rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3">
          {selectedEvent ? (
            <div className="text-xs text-stone-600 leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-brand-dark">Trip price:</span>{' '}
                <span className="font-semibold text-brand-dark">
                  {selectedEventOriginalPrice ? (
                    <>
                      <span className="line-through text-stone-400 mr-1">{toDualCurrencyDisplay(selectedEventOriginalPrice)}</span>
                      {toDualCurrencyDisplay(selectedEventPrice as string)}
                    </>
                  ) : (
                    toDualCurrencyDisplay(selectedEventPrice as string)
                  )}
                </span>
              </p>
              <p>
                <span className="font-semibold text-brand-dark">Single room supplement:</span>{' '}
                <span className="font-semibold text-brand-dark">{toDualCurrencyDisplay('£150.00')}</span>
              </p>
            </div>
          ) : (
            <p className="text-xs text-stone-600 leading-relaxed">
              Select a date to see the exact price for that event.
            </p>
          )}
        </div>
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
                {selectableEvents.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.date}
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
        {status === 'loading' ? 'Submitting...' : 'Submit Enquiry Request'}
      </button>
      <p className="text-center text-stone-400 text-sm">We&apos;ll confirm your quotation by email within 24 hours.</p>
    </form>
  );
}
