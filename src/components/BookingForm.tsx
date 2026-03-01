'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, ChevronDown, Plus, Trash2 } from 'lucide-react';
import { ALL_EVENTS } from '../data/events';

interface Participant {
  full_name: string;
  email: string;
  padel_level: string;
  trip_goals: string;
  special_requirements: string;
  equipment_rental: boolean;
}

interface BookingFormProps {
  selectedEventId?: number | null;
}

interface BookingResponse {
  ok: boolean;
  error?: string;
  quotation_id?: number;
}

const inputClass =
  'w-full px-4 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm';

const labelClass = 'block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2';

const emptyParticipant = (): Participant => ({
  full_name: '',
  email: '',
  padel_level: '',
  trip_goals: '',
  special_requirements: '',
  equipment_rental: false,
});

export default function BookingForm({ selectedEventId }: BookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [eventId, setEventId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [acceptedPrivacyTerms, setAcceptedPrivacyTerms] = useState(false);
  const [confirmedParticipantConsent, setConfirmedParticipantConsent] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([emptyParticipant()]);
  const [numParticipants, setNumParticipants] = useState(1);

  useEffect(() => {
    if (selectedEventId) {
      setEventId(String(selectedEventId));
    }
  }, [selectedEventId]);

  const selectedEvent = ALL_EVENTS.find(event => String(event.id) === eventId);

  const resizeParticipants = (nextCount: number) => {
    const safeCount = Math.max(1, Math.min(16, Number.isFinite(nextCount) ? nextCount : 1));
    setNumParticipants(safeCount);
    setParticipants(previous => {
      if (safeCount > previous.length) {
        return [...previous, ...Array.from({ length: safeCount - previous.length }, emptyParticipant)];
      }
      return previous.slice(0, safeCount);
    });
  };

  const addParticipant = () => {
    if (participants.length >= 16) return;
    setParticipants(previous => [...previous, emptyParticipant()]);
    setNumParticipants(previous => Math.min(16, previous + 1));
  };

  const removeParticipant = (index: number) => {
    if (participants.length <= 1) return;
    setParticipants(previous => previous.filter((_, i) => i !== index));
    setNumParticipants(previous => Math.max(1, previous - 1));
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string | boolean) => {
    setParticipants(previous => previous.map((participant, i) => (i === index ? { ...participant, [field]: value } : participant)));
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setAccommodation('');
    setSpecialRequests('');
    setAcceptedPrivacyTerms(false);
    setConfirmedParticipantConsent(false);
    setParticipants([emptyParticipant()]);
    setNumParticipants(1);
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
        phone: phone.trim(),
        num_participants: participants.length,
        accommodation_type: accommodation,
        dietary_requirements: '',
        special_requests: specialRequests.trim(),
        accepted_privacy_terms: acceptedPrivacyTerms,
        confirmed_participant_consent: confirmedParticipantConsent,
        participants: participants.map(participant => ({
          full_name: participant.full_name.trim(),
          email: participant.email.trim(),
          padel_level: participant.padel_level,
          trip_goals: participant.trip_goals.trim(),
          special_requirements: participant.special_requirements.trim(),
          equipment_rental: participant.equipment_rental,
        })),
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
      setSuccessMsg('Booking request received. We have sent a confirmation email and will contact you shortly.');
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red mb-5">Trip Details</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Select Event *</label>
            <div className="relative">
              <select
                required
                value={eventId}
                onChange={e => setEventId(e.target.value)}
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="">Choose a date...</option>
                {ALL_EVENTS.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.date} - From {event.price}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Number of Participants *</label>
            <input
              required
              type="number"
              min={1}
              max={16}
              value={numParticipants}
              onChange={e => resizeParticipants(parseInt(e.target.value, 10) || 1)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Accommodation Type</label>
            <div className="relative">
              <select
                value={accommodation}
                onChange={e => setAccommodation(e.target.value)}
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="">Select type...</option>
                <option value="sharing">Sharing room (2 people)</option>
                <option value="single">Single room (+£100)</option>
                <option value="double">Double room</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Special Requests</label>
            <textarea
              rows={3}
              placeholder="Anything else we should know?"
              value={specialRequests}
              onChange={e => setSpecialRequests(e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red mb-5">Your Details</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
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
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              placeholder="+44 7700 000000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3 mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red">Participant Details</p>
          <button
            type="button"
            onClick={addParticipant}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold uppercase tracking-widest text-stone-500 hover:border-brand-red hover:text-brand-red transition-colors"
          >
            <Plus size={14} />
            Add Participant
          </button>
        </div>
        <div className="space-y-5">
          {participants.map((participant, index) => (
            <div key={index} className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="font-semibold text-brand-dark text-sm uppercase tracking-wide">
                  Participant {index + 1}
                </p>
                {participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-stone-400 hover:text-brand-red transition-colors"
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    value={participant.full_name}
                    onChange={e => updateParticipant(index, 'full_name', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="email@example.com"
                    value={participant.email}
                    onChange={e => updateParticipant(index, 'email', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Padel Level</label>
                  <div className="relative">
                    <select
                      value={participant.padel_level}
                      onChange={e => updateParticipant(index, 'padel_level', e.target.value)}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option value="">Select level...</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Improver">Improver</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Trip Goals</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Improve serve, meet new people"
                    value={participant.trip_goals}
                    onChange={e => updateParticipant(index, 'trip_goals', e.target.value)}
                    className={`${inputClass} resize-y`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Special Requirements</label>
                  <textarea
                    rows={2}
                    placeholder="Any injuries, accessibility needs, etc."
                    value={participant.special_requirements}
                    onChange={e => updateParticipant(index, 'special_requirements', e.target.value)}
                    className={`${inputClass} resize-y`}
                  />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <input
                    id={`rental-${index}`}
                    type="checkbox"
                    checked={participant.equipment_rental}
                    onChange={e => updateParticipant(index, 'equipment_rental', e.target.checked)}
                    className="w-4 h-4 accent-brand-red rounded"
                  />
                  <label htmlFor={`rental-${index}`} className="text-sm text-stone-500 cursor-pointer">
                    Racquet hire needed (included in price)
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-stone-50 rounded-2xl border border-stone-100 p-5 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            required
            type="checkbox"
            checked={acceptedPrivacyTerms}
            onChange={e => setAcceptedPrivacyTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-brand-red rounded"
          />
          <span className="text-sm text-stone-600 leading-relaxed">
            I acknowledge and accept Padel Tripper&apos;s Privacy Policy and Terms &amp; Conditions, and consent to the processing of my personal data for the purpose of managing this quotation request.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={confirmedParticipantConsent}
            onChange={e => setConfirmedParticipantConsent(e.target.checked)}
            required={participants.length > 1}
            className="mt-0.5 w-4 h-4 accent-brand-red rounded"
          />
          <span className="text-sm text-stone-600 leading-relaxed">
            I confirm that, where I submit personal data relating to other participants, I am duly authorized to do so and have provided the required privacy information to those individuals.
          </span>
        </label>
      </div>

      {status === 'success' && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 text-sm flex items-center gap-2">
          <CheckCircle2 size={18} />
          <span>{successMsg || 'Booking submitted successfully.'}</span>
        </div>
      )}

      {status === 'error' && <p className="text-sm text-brand-red text-center">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand-red text-white font-semibold uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all duration-300 text-sm disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Booking Request'}
      </button>

      <p className="text-center text-[11px] text-stone-300 -mt-4">
        We&apos;ll confirm your booking by email within 24 hours.
      </p>
    </form>
  );
}
