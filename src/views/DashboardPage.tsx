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
  status: string | null;
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

type EditEntity = 'booking' | 'participant' | 'event' | 'partner';
type EditMode = 'create' | 'update';

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

function statusBadgeClass(value: string | null | undefined, isLight = false): string {
  const normalized = (value || '').toLowerCase().replaceAll('_', ' ').trim();
  if (!normalized || normalized === 'not set' || normalized === 'not sent') {
    return isLight
      ? 'bg-slate-100 text-slate-700 border-slate-300'
      : 'bg-slate-500/15 text-slate-200 border-slate-300/25';
  }
  if (normalized.includes('paid') || normalized.includes('confirmed') || normalized.includes('completed') || normalized.includes('acknowledged')) {
    return isLight
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30';
  }
  if (normalized.includes('pending') || normalized.includes('draft') || normalized.includes('reminder')) {
    return isLight
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-amber-500/15 text-amber-200 border-amber-400/30';
  }
  if (normalized.includes('sent') || normalized.includes('requested') || normalized.includes('notified')) {
    return isLight
      ? 'bg-sky-50 text-sky-700 border-sky-200'
      : 'bg-sky-500/15 text-sky-200 border-sky-400/30';
  }
  if (normalized.includes('declined') || normalized.includes('cancelled') || normalized.includes('rejected')) {
    return isLight
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : 'bg-rose-500/15 text-rose-200 border-rose-400/30';
  }
  return isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-white/10 text-white/75 border-white/20';
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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [data, setData] = useState<DashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewAction, setPreviewAction] = useState('');
  const [previewBody, setPreviewBody] = useState('');
  const [activeBookingId, setActiveBookingId] = useState<number | null>(null);
  const [submittingAction, setSubmittingAction] = useState(false);
  const [bookingSearch, setBookingSearch] = useState('');
  const [editingOpen, setEditingOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<EditEntity>('participant');
  const [editingMode, setEditingMode] = useState<EditMode>('update');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});
  const [savingEdit, setSavingEdit] = useState(false);
  const [bookingDrafts, setBookingDrafts] = useState<Record<number, Record<string, string>>>({});
  const [savingBookingId, setSavingBookingId] = useState<number | null>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('dashboard-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('dashboard-theme', theme);
  }, [theme]);

  const loadDashboard = async () => {
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

  useEffect(() => {
    void loadDashboard();
  }, []);

  const workflowMap = useMemo(() => {
    const map = new Map<number, WorkflowRow>();
    data.workflows.forEach(row => map.set(row.quotation_id, row));
    return map;
  }, [data.workflows]);

  const sortedEvents = useMemo(() => {
    const getTime = (value: string | null): number => {
      if (!value) return Number.POSITIVE_INFINITY;
      const time = new Date(value).getTime();
      return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time;
    };

    return [...data.events].sort((a, b) => {
      const startDiff = getTime(a.start_date) - getTime(b.start_date);
      if (startDiff !== 0) return startDiff;
      return getTime(a.end_date) - getTime(b.end_date);
    });
  }, [data.events]);

  const eventMap = useMemo(() => {
    const map = new Map<number, EventRow>();
    sortedEvents.forEach(event => map.set(event.id, event));
    return map;
  }, [sortedEvents]);

  const sortedBookings = useMemo(() => {
    const getTime = (value: string | null): number => {
      if (!value) return Number.NEGATIVE_INFINITY;
      const time = new Date(value).getTime();
      return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
    };

    return [...data.bookings].sort((a, b) => getTime(b.created_at) - getTime(a.created_at));
  }, [data.bookings]);

  const filteredBookings = useMemo(() => {
    const query = bookingSearch.trim().toLowerCase();
    if (!query) return sortedBookings;

    return sortedBookings.filter(booking => {
      const event = booking.event_id ? eventMap.get(booking.event_id) : null;
      const haystack = [
        booking.full_name || '',
        booking.email || '',
        String(booking.id),
        String(booking.event_id || ''),
        event?.name || '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [bookingSearch, sortedBookings, eventMap]);

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
      await loadDashboard();
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : 'Action failed.');
    } finally {
      setSubmittingAction(false);
    }
  };

  const openCreateParticipant = () => {
    setEditingEntity('participant');
    setEditingMode('create');
    setEditingId(null);
    setEditingValues({
      quotation_id: '',
      full_name: '',
      email: '',
      padel_level: '',
      status: 'pending',
    });
    setEditingOpen(true);
  };

  const getBookingDraft = (booking: BookingRow) => {
    return (
      bookingDrafts[booking.id] ?? {
        event_id: String(booking.event_id ?? ''),
        full_name: String(booking.full_name ?? ''),
        email: String(booking.email ?? ''),
        num_participants: String(booking.num_participants ?? 1),
        status: String(booking.status ?? ''),
        payment_status: String(booking.payment_status ?? ''),
      }
    );
  };

  const handleBookingDraftChange = (bookingId: number, field: string, value: string) => {
    setBookingDrafts((prev) => {
      const base = prev[bookingId] ?? {
        event_id: '',
        full_name: '',
        email: '',
        num_participants: '1',
        status: '',
        payment_status: '',
      };
      return {
        ...prev,
        [bookingId]: {
          ...base,
          [field]: value,
        },
      };
    });
  };

  const saveBookingInline = async (bookingId: number, fallbackBooking: BookingRow) => {
    const draft = getBookingDraft(fallbackBooking);
    setSavingBookingId(bookingId);
    setError('');
    try {
      const response = await fetch('/api/dashboard/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'booking',
          mode: 'update',
          id: bookingId,
          values: {
            event_id: draft.event_id,
            full_name: draft.full_name,
            email: draft.email,
            num_participants: draft.num_participants,
            status: draft.status,
            payment_status: draft.payment_status,
          },
        }),
      });
      const result = await response.json();
      if (!response.ok || !result?.ok) throw new Error(result?.error || 'Could not save booking.');
      await loadDashboard();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save booking.');
    } finally {
      setSavingBookingId(null);
    }
  };

  const openEditRecord = (entity: EditEntity, row: Record<string, unknown>) => {
    setEditingEntity(entity);
    setEditingMode('update');
    setEditingId(Number(row.id));

    if (entity === 'booking') {
      setEditingValues({
        event_id: String(row.event_id ?? ''),
        full_name: String(row.full_name ?? ''),
        email: String(row.email ?? ''),
        num_participants: String(row.num_participants ?? ''),
        status: String(row.status ?? ''),
        payment_status: String(row.payment_status ?? ''),
      });
    } else if (entity === 'participant') {
      setEditingValues({
        quotation_id: String(row.quotation_id ?? ''),
        full_name: String(row.full_name ?? ''),
        email: String(row.email ?? ''),
        padel_level: String(row.padel_level ?? ''),
        status: String(row.status ?? ''),
      });
    } else if (entity === 'event') {
      setEditingValues({
        name: String(row.name ?? ''),
        start_date: String(row.start_date ?? ''),
        end_date: String(row.end_date ?? ''),
        status: String(row.status ?? ''),
        base_price: String(row.base_price ?? ''),
        max_participants: String(row.max_participants ?? ''),
        current_participants: String(row.current_participants ?? ''),
        is_public: row.is_public === true ? 'true' : 'false',
      });
    } else {
      setEditingValues({
        reference: String(row.reference ?? ''),
        full_name: String(row.full_name ?? ''),
        email: String(row.email ?? ''),
        role: String(row.role ?? ''),
        status: String(row.status ?? ''),
      });
    }
    setEditingOpen(true);
  };

  const handleEditChange = (field: string, value: string) => {
    setEditingValues(prev => ({ ...prev, [field]: value }));
  };

  const saveEditRecord = async () => {
    setSavingEdit(true);
    setError('');

    try {
      const values: Record<string, unknown> = { ...editingValues };
      if (editingEntity === 'booking') {
        values.event_id = Number(values.event_id || 0);
        values.num_participants = Number(values.num_participants || 0);
      }
      if (editingEntity === 'participant' && values.quotation_id !== '') {
        values.quotation_id = Number(values.quotation_id);
      }
      if (editingEntity === 'event') {
        values.max_participants = Number(values.max_participants || 0);
        values.current_participants = Number(values.current_participants || 0);
      }

      const response = await fetch('/api/dashboard/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: editingEntity,
          mode: editingMode,
          id: editingMode === 'update' ? editingId : undefined,
          values,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result?.ok) throw new Error(result?.error || 'Could not save changes.');

      setEditingOpen(false);
      await loadDashboard();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save changes.');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/dashboard/auth/logout', { method: 'POST' });
    window.location.href = '/dashboard/login';
  };

  const isLight = theme === 'light';

  return (
    <main
      className={`min-h-screen pt-28 pb-14 px-6 transition-colors ${
        isLight
          ? 'bg-slate-100 text-slate-900 [&_p]:text-slate-700 [&_h1]:text-slate-900 [&_h3]:text-slate-900'
          : 'bg-[#0b0d10] text-white'
      }`}
    >
      <section className="max-w-7xl mx-auto">
        <div className="mb-5 flex justify-end">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
              isLight
                ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-900 hover:text-white'
                : 'border-white/25 bg-white/5 text-white/80 hover:bg-white hover:text-brand-dark'
            }`}
          >
            {isLight ? 'Switch To Dark' : 'Switch To Light'}
          </button>
        </div>

        <div className="mb-8">
          <p className="text-brand-red font-semibold uppercase tracking-[0.28em] text-xs mb-3">Internal Dashboard</p>
          <h1 className="font-serif text-4xl md:text-5xl font-black uppercase">Operations Console</h1>
          <p className={`${isLight ? 'text-slate-600' : 'text-white/60'} mt-4 max-w-3xl`}>
            Semi-automatic workflow with manual confirmation checkpoints for hotel, payment and coaches.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className={`mt-4 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors ${
              isLight
                ? 'border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white'
                : 'border-white/25 text-white/80 hover:bg-white hover:text-brand-dark'
            }`}
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-7">
          <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-white' : 'border-white/12 bg-white/[0.03]'}`}>
            <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${isLight ? 'text-slate-500' : 'text-white/50'}`}>Bookings</p>
            <p className="text-2xl font-serif font-black">{data.bookings.length}</p>
          </div>
          <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-white' : 'border-white/12 bg-white/[0.03]'}`}>
            <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${isLight ? 'text-slate-500' : 'text-white/50'}`}>Participants</p>
            <p className="text-2xl font-serif font-black">{data.participants.length}</p>
          </div>
          <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-white' : 'border-white/12 bg-white/[0.03]'}`}>
            <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${isLight ? 'text-slate-500' : 'text-white/50'}`}>Partners</p>
            <p className="text-2xl font-serif font-black">{data.partners.length}</p>
          </div>
          <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-white' : 'border-white/12 bg-white/[0.03]'}`}>
            <p className={`text-[10px] uppercase tracking-[0.2em] mb-1 ${isLight ? 'text-slate-500' : 'text-white/50'}`}>Events</p>
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
                tab === item.id
                  ? 'bg-brand-red text-white'
                  : isLight
                    ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
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

        <div className={`rounded-2xl border overflow-hidden ${isLight ? 'border-slate-200 bg-white' : 'border-white/12 bg-white/[0.03]'}`}>
          {loading ? (
            <div className={`p-8 text-sm ${isLight ? 'text-slate-500' : 'text-white/60'}`}>Loading dashboard...</div>
          ) : (
            <>
              {tab === 'bookings' && (
                <div className="p-4 md:p-5">
                  <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? 'text-slate-500' : 'text-white/45'}`}>
                      {filteredBookings.length} bookings
                    </p>
                    <input
                      value={bookingSearch}
                      onChange={event => setBookingSearch(event.target.value)}
                      placeholder="Search by lead, email, event or ID"
                      className={`w-full md:w-[360px] rounded-xl border px-3 py-2 text-sm focus:outline-none ${
                        isLight
                          ? 'border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:border-slate-500'
                          : 'border-white/15 bg-black/25 text-white/90 placeholder:text-white/35 focus:border-white/35'
                      }`}
                    />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className={isLight ? 'bg-slate-50 text-slate-600' : 'bg-white/[0.02] text-white/60'}>
                        <tr>
                          <th className="px-4 py-3 text-left">Lead</th>
                          <th className="w-[200px] px-4 py-3 text-left">Event</th>
                          <th className="px-4 py-3 text-left">Booking</th>
                          <th className="px-4 py-3 text-left">Hotel</th>
                          <th className="px-4 py-3 text-left">Payment</th>
                          <th className="px-4 py-3 text-left">Coaches</th>
                          <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                    {filteredBookings.map((booking, index) => {
                      const wf = workflowMap.get(booking.id);
                      const draft = getBookingDraft(booking);
                      const draftEventId = Number(draft.event_id);
                      const event = Number.isFinite(draftEventId) ? eventMap.get(draftEventId) : null;
                      const eventLabel = event?.name || (booking.event_id ? `#${booking.event_id}` : '—');

                      return (
                        <tr
                          key={booking.id}
                          className={`border-t ${isLight ? 'border-slate-200' : 'border-white/10'} ${
                            index % 2 === 0 ? 'bg-transparent' : isLight ? 'bg-slate-50/70' : 'bg-white/[0.015]'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <input
                              value={draft.full_name}
                              onChange={(event) => handleBookingDraftChange(booking.id, 'full_name', event.target.value)}
                              className={`mb-1 block w-full rounded-lg border px-2 py-1 text-xs font-semibold ${
                                isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/20 text-white'
                              }`}
                            />
                            <input
                              value={draft.email}
                              onChange={(event) => handleBookingDraftChange(booking.id, 'email', event.target.value)}
                              className={`block w-full rounded-lg border px-2 py-1 text-xs ${
                                isLight ? 'border-slate-300 bg-white text-slate-700' : 'border-white/20 bg-black/20 text-white/85'
                              }`}
                            />
                          </td>
                          <td className="w-[200px] px-4 py-3">
                            <input
                              value={draft.event_id}
                              onChange={(event) => handleBookingDraftChange(booking.id, 'event_id', event.target.value)}
                              className={`mb-1 block w-full rounded-lg border px-2 py-1 text-xs ${
                                isLight ? 'border-slate-300 bg-white text-slate-700' : 'border-white/20 bg-black/20 text-white/85'
                              }`}
                            />
                            <p className="max-w-[180px] truncate">{eventLabel}</p>
                            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-white/50'}`}>
                              {event ? `${formatDate(event.start_date)} - ${formatDate(event.end_date)}` : '—'}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p>#{booking.id}</p>
                            <div className="mt-1 space-y-1">
                              <input
                                value={draft.num_participants}
                                onChange={(event) => handleBookingDraftChange(booking.id, 'num_participants', event.target.value)}
                                className={`block w-[90px] rounded-lg border px-2 py-1 text-xs ${
                                  isLight ? 'border-slate-300 bg-white text-slate-700' : 'border-white/20 bg-black/20 text-white/85'
                                }`}
                              />
                              <input
                                value={draft.status}
                                onChange={(event) => handleBookingDraftChange(booking.id, 'status', event.target.value)}
                                className={`block w-full rounded-lg border px-2 py-1 text-xs ${
                                  isLight ? 'border-slate-300 bg-white text-slate-700' : 'border-white/20 bg-black/20 text-white/85'
                                }`}
                              />
                              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-white/50'}`}>{formatDate(booking.created_at)}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(wf?.hotel_status || 'not_sent', isLight)}`}>
                              {toLabel(wf?.hotel_status || 'not_sent')}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={draft.payment_status}
                              onChange={(event) => handleBookingDraftChange(booking.id, 'payment_status', event.target.value)}
                              className={`mb-2 block w-full rounded-lg border px-2 py-1 text-xs ${
                                isLight ? 'border-slate-300 bg-white text-slate-700' : 'border-white/20 bg-black/20 text-white/85'
                              }`}
                            />
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(wf?.payment_status || draft.payment_status || 'pending', isLight)}`}>
                              {toLabel(wf?.payment_status || draft.payment_status || 'pending')}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(wf?.coach_status || 'not_sent', isLight)}`}>
                              {toLabel(wf?.coach_status || 'not_sent')}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => openPreview(booking, 'hotel_request_sent')}
                                className={`rounded-full border border-brand-red/55 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider hover:bg-brand-red hover:text-white transition-colors ${
                                  isLight ? 'text-slate-700' : 'text-white/85'
                                }`}
                              >
                                Hotel
                              </button>
                              <button
                                type="button"
                                onClick={() => openPreview(booking, 'coach_notified')}
                                className={`rounded-full border border-brand-red/55 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider hover:bg-brand-red hover:text-white transition-colors ${
                                  isLight ? 'text-slate-700' : 'text-white/85'
                                }`}
                              >
                                Coach
                              </button>
                              <button
                                type="button"
                                onClick={() => openPreview(booking, 'payment_reminder_sent')}
                                className={`rounded-full border border-brand-red/55 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider hover:bg-brand-red hover:text-white transition-colors ${
                                  isLight ? 'text-slate-700' : 'text-white/85'
                                }`}
                              >
                                Payment
                              </button>
                              <button
                                type="button"
                                onClick={() => saveBookingInline(booking.id, booking)}
                                disabled={savingBookingId === booking.id}
                                className={`rounded-full border border-slate-400/50 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                                  isLight ? 'text-slate-700 hover:bg-slate-800 hover:text-white' : 'text-white/85 hover:bg-white hover:text-brand-dark'
                                }`}
                              >
                                {savingBookingId === booking.id ? 'Saving...' : 'Save'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === 'participants' && (
                <div className="p-4 md:p-5">
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      onClick={openCreateParticipant}
                      className="rounded-full bg-brand-red px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white hover:bg-brand-dark transition-colors"
                    >
                      Add Participant
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className={isLight ? 'bg-slate-50 text-slate-600' : 'bg-white/[0.02] text-white/60'}>
                      <tr>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Level</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Booking</th>
                        <th className="px-4 py-3 text-left">Created</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.participants.map(participant => (
                        <tr key={participant.id} className={`border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                          <td className="px-4 py-3">{participant.full_name || '—'}</td>
                          <td className="px-4 py-3">{participant.email || '—'}</td>
                          <td className="px-4 py-3">{participant.padel_level || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(participant.status || 'not_set', isLight)}`}>
                              {toLabel(participant.status || 'not_set')}
                            </span>
                          </td>
                          <td className="px-4 py-3">#{participant.quotation_id || '—'}</td>
                          <td className="px-4 py-3">{formatDate(participant.created_at)}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => openEditRecord('participant', participant as unknown as Record<string, unknown>)}
                              className={`rounded-full border border-slate-400/50 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                                isLight ? 'text-slate-700 hover:bg-slate-800 hover:text-white' : 'text-white/85 hover:bg-white hover:text-brand-dark'
                              }`}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
              )}

              {tab === 'partners' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className={isLight ? 'bg-slate-50 text-slate-600' : 'bg-white/[0.02] text-white/60'}>
                      <tr>
                        <th className="px-4 py-3 text-left">Reference</th>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Role</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Created</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.partners.map(partner => (
                        <tr key={partner.id} className={`border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                          <td className="px-4 py-3">{partner.reference || '—'}</td>
                          <td className="px-4 py-3">{partner.full_name || '—'}</td>
                          <td className="px-4 py-3">{partner.email || '—'}</td>
                          <td className="px-4 py-3">{partner.role || '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(partner.status || 'NEW', isLight)}`}>
                              {toLabel(partner.status || 'NEW')}
                            </span>
                          </td>
                          <td className="px-4 py-3">{formatDate(partner.created_at)}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => openEditRecord('partner', partner as unknown as Record<string, unknown>)}
                              className={`rounded-full border border-slate-400/50 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                                isLight ? 'text-slate-700 hover:bg-slate-800 hover:text-white' : 'text-white/85 hover:bg-white hover:text-brand-dark'
                              }`}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'events' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className={isLight ? 'bg-slate-50 text-slate-600' : 'bg-white/[0.02] text-white/60'}>
                      <tr>
                        <th className="px-4 py-3 text-left">Event</th>
                        <th className="px-4 py-3 text-left">Dates</th>
                        <th className="px-4 py-3 text-left">Price</th>
                        <th className="px-4 py-3 text-left">Capacity</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedEvents.map(event => (
                        <tr key={event.id} className={`border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                          <td className="px-4 py-3">{event.name || `Event #${event.id}`}</td>
                          <td className="px-4 py-3">{formatDate(event.start_date)} - {formatDate(event.end_date)}</td>
                          <td className="px-4 py-3">{event.base_price || '—'}</td>
                          <td className="px-4 py-3">{event.current_participants || 0}/{event.max_participants || 0}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusBadgeClass(event.status || '—', isLight)}`}>
                              {toLabel(event.status || '—')}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => openEditRecord('event', event as unknown as Record<string, unknown>)}
                              className={`rounded-full border border-slate-400/50 bg-transparent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                                isLight ? 'text-slate-700 hover:bg-slate-800 hover:text-white' : 'text-white/85 hover:bg-white hover:text-brand-dark'
                              }`}
                            >
                              Edit
                            </button>
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

      {editingOpen && (
        <div className={`fixed inset-0 z-[75] p-4 flex items-center justify-center backdrop-blur-sm ${isLight ? 'bg-slate-900/45' : 'bg-black/60'}`}>
          <div className={`w-full max-w-2xl rounded-2xl border p-5 md:p-6 ${isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/15 bg-[#111318]'}`}>
            <p className="text-brand-red text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              {editingMode === 'create' ? 'Create' : 'Edit'} {editingEntity}
            </p>
            <h3 className="font-serif text-2xl font-black uppercase mb-5">
              {editingMode === 'create' ? 'Add New Record' : `Update #${editingId || '—'}`}
            </h3>

            <div className="grid md:grid-cols-2 gap-3">
              {(editingEntity === 'booking' || editingEntity === 'participant') && (
                <label className="block">
                  <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>
                    {editingEntity === 'participant' ? 'Booking ID' : 'Event ID'}
                  </span>
                  <input
                    value={editingValues.quotation_id ?? editingValues.event_id ?? ''}
                    onChange={(event) => handleEditChange(editingEntity === 'participant' ? 'quotation_id' : 'event_id', event.target.value)}
                    className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                  />
                </label>
              )}

              {(editingEntity === 'booking' || editingEntity === 'participant' || editingEntity === 'partner') && (
                <label className="block">
                  <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Full Name</span>
                  <input
                    value={editingValues.full_name ?? ''}
                    onChange={(event) => handleEditChange('full_name', event.target.value)}
                    className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                  />
                </label>
              )}

              {(editingEntity === 'booking' || editingEntity === 'participant' || editingEntity === 'partner') && (
                <label className="block md:col-span-2">
                  <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Email</span>
                  <input
                    value={editingValues.email ?? ''}
                    onChange={(event) => handleEditChange('email', event.target.value)}
                    className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                  />
                </label>
              )}

              {editingEntity === 'booking' && (
                <>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Players</span>
                    <input
                      value={editingValues.num_participants ?? ''}
                      onChange={(event) => handleEditChange('num_participants', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Payment Status</span>
                    <input
                      value={editingValues.payment_status ?? ''}
                      onChange={(event) => handleEditChange('payment_status', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                </>
              )}

              {(editingEntity === 'booking' || editingEntity === 'participant' || editingEntity === 'event' || editingEntity === 'partner') && (
                <label className="block">
                  <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Status</span>
                  <input
                    value={editingValues.status ?? ''}
                    onChange={(event) => handleEditChange('status', event.target.value)}
                    className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                  />
                </label>
              )}

              {editingEntity === 'participant' && (
                <label className="block">
                  <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Padel Level</span>
                  <input
                    value={editingValues.padel_level ?? ''}
                    onChange={(event) => handleEditChange('padel_level', event.target.value)}
                    className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                  />
                </label>
              )}

              {editingEntity === 'event' && (
                <>
                  <label className="block md:col-span-2">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Event Name</span>
                    <input
                      value={editingValues.name ?? ''}
                      onChange={(event) => handleEditChange('name', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Start Date</span>
                    <input
                      type="date"
                      value={editingValues.start_date ?? ''}
                      onChange={(event) => handleEditChange('start_date', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>End Date</span>
                    <input
                      type="date"
                      value={editingValues.end_date ?? ''}
                      onChange={(event) => handleEditChange('end_date', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Price</span>
                    <input
                      value={editingValues.base_price ?? ''}
                      onChange={(event) => handleEditChange('base_price', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Max Participants</span>
                    <input
                      value={editingValues.max_participants ?? ''}
                      onChange={(event) => handleEditChange('max_participants', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Current Participants</span>
                    <input
                      value={editingValues.current_participants ?? ''}
                      onChange={(event) => handleEditChange('current_participants', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Public</span>
                    <select
                      value={editingValues.is_public ?? 'false'}
                      onChange={(event) => handleEditChange('is_public', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  </label>
                </>
              )}

              {editingEntity === 'partner' && (
                <>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Reference</span>
                    <input
                      value={editingValues.reference ?? ''}
                      onChange={(event) => handleEditChange('reference', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                  <label className="block">
                    <span className={`mb-1.5 block text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-slate-500' : 'text-white/55'}`}>Role</span>
                    <input
                      value={editingValues.role ?? ''}
                      onChange={(event) => handleEditChange('role', event.target.value)}
                      className={`w-full rounded-xl border px-3 py-2 text-sm ${isLight ? 'border-slate-300 bg-white text-slate-800' : 'border-white/20 bg-black/25 text-white/90'}`}
                    />
                  </label>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => setEditingOpen(false)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                  isLight
                    ? 'border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white'
                    : 'border-white/25 text-white/80 hover:bg-white hover:text-brand-dark'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEditRecord}
                disabled={savingEdit}
                className="rounded-full bg-brand-red px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark disabled:opacity-60 transition-colors"
              >
                {savingEdit ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewOpen && activeBooking && (
        <div className={`fixed inset-0 z-[70] p-4 flex items-center justify-center backdrop-blur-sm ${isLight ? 'bg-slate-900/45' : 'bg-black/60'}`}>
          <div className={`w-full max-w-3xl rounded-2xl border p-5 md:p-6 ${isLight ? 'border-slate-200 bg-white text-slate-900' : 'border-white/15 bg-[#111318]'}`}>
            <p className="text-brand-red text-xs font-semibold uppercase tracking-[0.2em] mb-2">Preview</p>
            <h3 className="font-serif text-2xl font-black uppercase mb-3">Review Before Confirm</h3>
            <p className={`text-sm mb-4 ${isLight ? 'text-slate-600' : 'text-white/60'}`}>Booking #{activeBooking.id} · {activeBooking.full_name || 'Lead'}</p>
            <textarea
              value={previewBody}
              onChange={e => setPreviewBody(e.target.value)}
              className={`w-full min-h-[220px] rounded-xl border p-4 text-sm focus:outline-none focus:border-brand-red ${
                isLight
                  ? 'border-slate-300 bg-slate-50 text-slate-800'
                  : 'border-white/15 bg-black/25 text-white/90'
              }`}
            />
            <div className="mt-5 flex flex-wrap gap-2 justify-end">
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
                  isLight
                    ? 'border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white'
                    : 'border-white/25 text-white/80 hover:bg-white hover:text-brand-dark'
                }`}
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
