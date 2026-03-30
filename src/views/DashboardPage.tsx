'use client';

import { useEffect, useMemo, useState } from 'react';

type DashboardTab = 'bookings' | 'participants' | 'partners' | 'events';

interface BookingRow {
  id: number;
  event_id: number | null;
  full_name: string | null;
  email: string | null;
  num_participants: number | null;
  status: string | null;
  payment_status: string | null;
  created_at: string | null;
}

interface WorkflowRow {
  quotation_id: number;
  hotel_status: string | null;
  payment_status: string | null;
  coach_status: string | null;
}

interface ParticipantRow {
  id: number;
  quotation_id: number | null;
  full_name: string | null;
  email: string | null;
  padel_level: string | null;
  created_at: string | null;
}

interface PartnerRow {
  id: number;
  reference: string | null;
  full_name: string | null;
  email: string | null;
  role: string | null;
  status: string | null;
  created_at: string | null;
}

interface EventRow {
  id: number;
  name: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string | null;
  base_price: string | null;
  max_participants: number | null;
  current_participants: number | null;
  is_public: boolean | null;
}

interface DashboardData {
  bookings: BookingRow[];
  participants: ParticipantRow[];
  partners: PartnerRow[];
  events: EventRow[];
  workflows: WorkflowRow[];
}

const initialData: DashboardData = {
  bookings: [],
  participants: [],
  partners: [],
  events: [],
  workflows: [],
};

function formatDate(value: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function toLabel(value: string | null | undefined): string {
  if (!value) return 'Not set';
  return value
    .replaceAll('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function statusBadgeClass(value: string | null | undefined): string {
  const normalized = (value || '').toLowerCase();
  if (normalized.includes('paid') || normalized.includes('confirmed') || normalized.includes('completed') || normalized.includes('acknowledged')) {
    return 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30';
  }
  if (normalized.includes('pending') || normalized.includes('draft')) {
    return 'bg-amber-500/15 text-amber-200 border-amber-400/30';
  }
  if (normalized.includes('sent') || normalized.includes('requested') || normalized.includes('notified')) {
    return 'bg-sky-500/15 text-sky-200 border-sky-400/30';
  }
  if (normalized.includes('declined') || normalized.includes('cancelled') || normalized.includes('rejected')) {
    return 'bg-rose-500/15 text-rose-200 border-rose-400/30';
  }
  return 'bg-white/10 text-white/75 border-white/20';
}

function buildPreviewText(action: string, booking: BookingRow): string {
  const lead = booking.full_name || 'Lead';
  const eventLabel = booking.event_id ? `event #${booking.event_id}` : 'selected event';

  if (action === 'hotel_request_sent') {
    return `Subject: Availability check - ${eventLabel}\n\nHi Hotel Team,\n\nPlease confirm room availability for ${lead} (${booking.num_participants || 1} players) for ${eventLabel}.\n\nThanks,\nPadel Tripper`;
  }
  if (action === 'coach_notified') {
    return `Subject: Coaching team heads-up - ${eventLabel}\n\nHi Team,\n\nPlease note new booking confirmed for ${lead} on ${eventLabel}. Further player details to follow.\n\nThanks,\nPadel Tripper`;
  }
  if (action === 'payment_reminder_sent') {
    return `Subject: Payment reminder - ${eventLabel}\n\nHi ${lead},\n\nQuick reminder to complete payment for your trip on ${eventLabel}.\n\nThanks,\nPadel Tripper`;
  }
  return '';
}

export default function DashboardPage() {
  const [tab, setTab] = useState<DashboardTab>('bookings');
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewAction, setPreviewAction] = useState('');
  const [previewBody, setPreviewBody] = useState('');
  const [activeBookingId, setActiveBookingId] = useState<number | null>(null);
  const [submittingAction, setSubmittingAction] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/dashboard/overview', { method: 'GET' });
        const result = await response.json();
        if (!response.ok || !result?.ok) throw new Error(result?.error || 'Could not load dashboard.');
        setData({
          bookings: result.data?.bookings || [],
          participants: result.data?.participants || [],
          partners: result.data?.partners || [],
          events: result.data?.events || [],
          workflows: result.data?.workflows || [],
        });
        setWarnings(Array.isArray(result.warnings) ? result.warnings : []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Could not load dashboard.');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const workflowMap = useMemo(() => {
    const map = new Map<number, WorkflowRow>();
    data.workflows.forEach(row => map.set(row.quotation_id, row));
    return map;
  }, [data.workflows]);

  const activeBooking = useMemo(
    () => data.bookings.find(booking => booking.id === activeBookingId) || null,
    [activeBookingId, data.bookings],
  );

  const openPreview = (booking: BookingRow, action: string) => {
    setActiveBookingId(booking.id);
    setPreviewAction(action);
    setPreviewBody(buildPreviewText(action, booking));
    setPreviewOpen(true);
  };

  const confirmAction = async () => {
    if (!activeBooking || !previewAction) return;
    setSubmittingAction(true);
    try {
      const response = await fetch('/api/dashboard/booking-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quotation_id: activeBooking.id,
          action: previewAction,
          preview_body: previewBody,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result?.ok) throw new Error(result?.error || 'Action failed.');
      setPreviewOpen(false);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : 'Action failed.');
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/dashboard/auth/logout', { method: 'POST' });
    window.location.href = '/dashboard/login';
  };

  return (
    <main className="bg-[#0b0d10] min-h-screen pt-28 pb-14 px-6 text-white">
      <section className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-brand-red font-semibold uppercase tracking-[0.28em] text-xs mb-3">Internal Dashboard</p>
          <h1 className="font-serif text-4xl md:text-5xl font-black uppercase">Operations Console</h1>
          <p className="text-white/60 mt-4 max-w-3xl">
            Semi-automatic workflow with manual confirmation checkpoints for hotel, payment and coaches.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-full border border-white/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white/80 hover:bg-white hover:text-brand-dark transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-7">
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Bookings</p>
            <p className="text-2xl font-serif font-black">{data.bookings.length}</p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Participants</p>
            <p className="text-2xl font-serif font-black">{data.participants.length}</p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Partners</p>
            <p className="text-2xl font-serif font-black">{data.partners.length}</p>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Events</p>
            <p className="text-2xl font-serif font-black">{data.events.length}</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {[
            { id: 'bookings', label: 'Bookings' },
            { id: 'participants', label: 'Participants' },
            { id: 'partners', label: 'Partners' },
            { id: 'events', label: 'Events' },
          ].map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as DashboardTab)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                tab === item.id ? 'bg-brand-red text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {warnings.length > 0 && (
          <div className="rounded-xl border border-amber-300/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100 mb-5">
            {warnings.join(' | ')}
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-red-300/40 bg-red-400/10 px-4 py-3 text-sm text-red-100 mb-5">{error}</div>
        )}

        <div className="rounded-2xl border border-white/12 bg-white/[0.03] overflow-hidden">
          {loading ? (
            <div className="p-8 text-white/60 text-sm">Loading dashboard...</div>
          ) : (
            <>
              {tab === 'bookings' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white/[0.02] text-white/60">
                      <tr>
                        <th className="px-4 py-3 text-left">Lead</th>
                        <th className="px-4 py-3 text-left">Event</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Hotel</th>
                        <th className="px-4 py-3 text-left">Payment</th>
                        <th className="px-4 py-3 text-left">Coaches</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.bookings.map(booking => {
                        const wf = workflowMap.get(booking.id);
                        return (
                          <tr key={booking.id} className="border-t border-white/10">
                            <td className="px-4 py-3">
                              <p className="font-semibold">{booking.full_name || '—'}</p>
                              <p className="text-white/50 text-xs">{booking.email || '—'}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p>#{booking.event_id || '—'}</p>
                              <p className="text-white/50 text-xs">{formatDate(booking.created_at)}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(booking.status || 'SUBMITTED')}`}>
                                {toLabel(booking.status || 'SUBMITTED')}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(wf?.hotel_status || 'not_sent')}`}>
                                {toLabel(wf?.hotel_status || 'not_sent')}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(wf?.payment_status || booking.payment_status || 'pending')}`}>
                                {toLabel(wf?.payment_status || booking.payment_status || 'pending')}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(wf?.coach_status || 'not_sent')}`}>
                                {toLabel(wf?.coach_status || 'not_sent')}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => openPreview(booking, 'hotel_request_sent')}
                                  className="rounded-full border border-sky-400/40 bg-sky-500/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-sky-100 hover:bg-sky-500/25 transition-colors"
                                >
                                  Preview Hotel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openPreview(booking, 'coach_notified')}
                                  className="rounded-full border border-violet-400/40 bg-violet-500/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-violet-100 hover:bg-violet-500/25 transition-colors"
                                >
                                  Preview Coach
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openPreview(booking, 'payment_reminder_sent')}
                                  className="rounded-full border border-amber-400/40 bg-amber-500/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-100 hover:bg-amber-500/25 transition-colors"
                                >
                                  Preview Payment
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'participants' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white/[0.02] text-white/60">
                      <tr>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Level</th>
                        <th className="px-4 py-3 text-left">Booking</th>
                        <th className="px-4 py-3 text-left">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.participants.map(participant => (
                        <tr key={participant.id} className="border-t border-white/10">
                          <td className="px-4 py-3">{participant.full_name || '—'}</td>
                          <td className="px-4 py-3">{participant.email || '—'}</td>
                          <td className="px-4 py-3">{participant.padel_level || '—'}</td>
                          <td className="px-4 py-3">#{participant.quotation_id || '—'}</td>
                          <td className="px-4 py-3">{formatDate(participant.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'partners' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white/[0.02] text-white/60">
                      <tr>
                        <th className="px-4 py-3 text-left">Reference</th>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Role</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.partners.map(partner => (
                        <tr key={partner.id} className="border-t border-white/10">
                          <td className="px-4 py-3">{partner.reference || '—'}</td>
                          <td className="px-4 py-3">{partner.full_name || '—'}</td>
                          <td className="px-4 py-3">{partner.email || '—'}</td>
                          <td className="px-4 py-3">{partner.role || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(partner.status || 'NEW')}`}>
                              {toLabel(partner.status || 'NEW')}
                            </span>
                          </td>
                          <td className="px-4 py-3">{formatDate(partner.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'events' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white/[0.02] text-white/60">
                      <tr>
                        <th className="px-4 py-3 text-left">Event</th>
                        <th className="px-4 py-3 text-left">Dates</th>
                        <th className="px-4 py-3 text-left">Price</th>
                        <th className="px-4 py-3 text-left">Capacity</th>
                        <th className="px-4 py-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.events.map(event => (
                        <tr key={event.id} className="border-t border-white/10">
                          <td className="px-4 py-3">{event.name || `Event #${event.id}`}</td>
                          <td className="px-4 py-3">{formatDate(event.start_date)} - {formatDate(event.end_date)}</td>
                          <td className="px-4 py-3">{event.base_price || '—'}</td>
                          <td className="px-4 py-3">{event.current_participants || 0}/{event.max_participants || 0}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(event.status || '—')}`}>
                              {toLabel(event.status || '—')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {previewOpen && activeBooking && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-3xl rounded-2xl border border-white/15 bg-[#111318] p-5 md:p-6">
            <p className="text-brand-red text-xs font-semibold uppercase tracking-[0.2em] mb-2">Preview</p>
            <h3 className="font-serif text-2xl font-black uppercase mb-3">Review Before Confirm</h3>
            <p className="text-white/60 text-sm mb-4">Booking #{activeBooking.id} · {activeBooking.full_name || 'Lead'}</p>
            <textarea
              value={previewBody}
              onChange={e => setPreviewBody(e.target.value)}
              className="w-full min-h-[220px] rounded-xl border border-white/15 bg-black/25 p-4 text-sm text-white/90 focus:outline-none focus:border-brand-red"
            />
            <div className="mt-5 flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 hover:bg-white hover:text-brand-dark transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmAction}
                disabled={submittingAction}
                className="rounded-full bg-brand-red px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark disabled:opacity-60 transition-colors"
              >
                {submittingAction ? 'Confirming...' : 'Confirm & Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
