'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { ALL_EVENTS } from '../data/events';

interface Participant {
  full_name: string;
  email: string;
  padel_level: string;
  trip_goals: string;
  special_requirements: string;
  equipment_rental: boolean;
}

const emptyParticipant = (): Participant => ({
  full_name: '',
  email: '',
  padel_level: '',
  trip_goals: '',
  special_requirements: '',
  equipment_rental: false,
});

const inputClass =
  'w-full px-4 py-3.5 bg-stone-50 border border-stone-100 rounded-xl focus:border-brand-red focus:outline-none transition-colors text-sm';

const labelClass = 'block text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2';

interface BookingFormProps {
  selectedEventId?: number | null;
}

export default function BookingForm({ selectedEventId }: BookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Trip
  const [eventId, setEventId] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [numParticipants, setNumParticipants] = useState(1);

  // Lead booker
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dietary, setDietary] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Participants
  const [participants, setParticipants] = useState<Participant[]>([emptyParticipant()]);

  // Sync pre-selected event from parent
  useEffect(() => {
    if (selectedEventId) setEventId(String(selectedEventId));
  }, [selectedEventId]);

  // Keep participants array in sync with numParticipants
  useEffect(() => {
    setParticipants(prev => {
      if (numParticipants > prev.length) {
        return [...prev, ...Array.from({ length: numParticipants - prev.length }, emptyParticipant)];
      }
      return prev.slice(0, numParticipants);
    });
  }, [numParticipants]);

  const updateParticipant = (idx: number, field: keyof Participant, value: string | boolean) => {
    setParticipants(prev => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));
  };

  const selectedEvent = ALL_EVENTS.find(e => String(e.id) === eventId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const payload = {
        event_id: parseInt(eventId),
        event_name: selectedEvent ? `${selectedEvent.date} — ${selectedEvent.price}` : undefined,
        full_name: fullName,
        email,
        phone,
        num_participants: numParticipants,
        accommodation_type: accommodation,
        dietary_requirements: dietary,
        special_requests: specialRequests,
        participants,
      };

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'Submission failed.');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-16 flex flex-col items-center text-center space-y-5">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-serif text-2xl font-black uppercase text-brand-dark">Booking Received!</h3>
        <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
          We&apos;ll review your request and be in touch shortly to confirm your spot and share next steps. Check your inbox for a confirmation email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── Trip Details ──────────────────────────────────────── */}
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
                {ALL_EVENTS.map(ev => (
                  <option key={ev.id} value={ev.id}>
                    {ev.date} — {ev.price}
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
              onChange={e => setNumParticipants(Math.max(1, parseInt(e.target.value) || 1))}
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
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Lead Booker ───────────────────────────────────────── */}
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
          <div>
            <label className={labelClass}>Dietary Requirements</label>
            <input
              type="text"
              placeholder="e.g. Vegetarian, Gluten free"
              value={dietary}
              onChange={e => setDietary(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Special Requests</label>
            <input
              type="text"
              placeholder="Anything else we should know?"
              value={specialRequests}
              onChange={e => setSpecialRequests(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* ── Participants ──────────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-red mb-5">
          Participant Details
        </p>
        <div className="space-y-5">
          {participants.map((p, idx) => (
            <div key={idx} className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <p className="font-semibold text-brand-dark text-sm mb-4 uppercase tracking-wide">
                Participant {idx + 1}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={p.full_name}
                    onChange={e => updateParticipant(idx, 'full_name', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={p.email}
                    onChange={e => updateParticipant(idx, 'email', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Padel Level</label>
                  <div className="relative">
                    <select
                      value={p.padel_level}
                      onChange={e => updateParticipant(idx, 'padel_level', e.target.value)}
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
                  <input
                    type="text"
                    placeholder="e.g. Improve serve, meet new people"
                    value={p.trip_goals}
                    onChange={e => updateParticipant(idx, 'trip_goals', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Special Requirements</label>
                  <input
                    type="text"
                    placeholder="Any injuries, accessibility needs, etc."
                    value={p.special_requirements}
                    onChange={e => updateParticipant(idx, 'special_requirements', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="flex items-center gap-3 mt-2 md:mt-6">
                  <input
                    id={`rental-${idx}`}
                    type="checkbox"
                    checked={p.equipment_rental}
                    onChange={e => updateParticipant(idx, 'equipment_rental', e.target.checked)}
                    className="w-4 h-4 accent-brand-red rounded"
                  />
                  <label htmlFor={`rental-${idx}`} className="text-sm text-stone-500 cursor-pointer">
                    Racquet hire needed (included in price)
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Error ─────────────────────────────────────────────── */}
      {status === 'error' && (
        <p className="text-sm text-brand-red text-center">{errorMsg}</p>
      )}

      {/* ── Submit ────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand-red text-white font-semibold uppercase tracking-widest rounded-full hover:bg-brand-dark transition-all duration-300 text-sm disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Booking Request'}
      </button>

      <p className="text-center text-[11px] text-stone-300 -mt-4">
        We&apos;ll confirm your booking by email within 24 hours.
      </p>
    </form>
  );
}
