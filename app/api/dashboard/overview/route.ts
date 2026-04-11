import { createClient } from '@supabase/supabase-js';
import { ALL_EVENTS } from '@/src/data/events';

export const runtime = 'edge';

type MaybeRecord = Record<string, unknown>;

function safeArray(value: unknown): MaybeRecord[] {
  return Array.isArray(value) ? (value as MaybeRecord[]) : [];
}

function toIsoDate(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json({ ok: false, error: 'Missing Supabase configuration.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const participantsWithStatusPromise = supabase
      .from('participants')
      .select('id,quotation_id,full_name,email,padel_level,status,created_at')
      .order('created_at', { ascending: false })
      .limit(500);

    const [bookingsRes, participantsWithStatusRes, eventsRes, workflowsRes, partnersRes, tailoredRes] = await Promise.all([
      supabase
        .from('quotations')
        .select('id,event_id,full_name,email,num_participants,status,payment_status,created_at')
        .order('created_at', { ascending: false })
        .limit(300),
      participantsWithStatusPromise,
      supabase
        .from('events')
        .select('id,name,start_date,end_date,status,base_price,max_participants,current_participants,is_public')
        .order('start_date', { ascending: true }),
      supabase
        .from('booking_workflows')
        .select('quotation_id,hotel_status,payment_status,coach_status,updated_at')
        .limit(500),
      supabase
        .from('partner_enquiries')
        .select('id,reference,full_name,email,role,status,created_at')
        .order('created_at', { ascending: false })
        .limit(300),
      supabase
        .from('tailored_event_requests')
        .select('id,full_name,email,phone,event_type,group_size,preferred_dates,destination,status,source,created_at')
        .order('created_at', { ascending: false })
        .limit(300),
    ]);

    const bookings = safeArray(bookingsRes.data);
    let participants = safeArray(participantsWithStatusRes.data);
    if (participantsWithStatusRes.error) {
      const fallbackParticipantsRes = await supabase
        .from('participants')
        .select('id,quotation_id,full_name,email,padel_level,created_at')
        .order('created_at', { ascending: false })
        .limit(500);
      participants = safeArray(fallbackParticipantsRes.data).map(participant => ({ ...participant, status: null }));
    }
    const rawEvents = safeArray(eventsRes.data);
    const eventFallbackById = new Map(ALL_EVENTS.map(event => [event.id, event]));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = rawEvents
      .map((eventRow) => {
        const idValue = Number(eventRow.id);
        const fallback = Number.isFinite(idValue) ? eventFallbackById.get(idValue) : undefined;
        const startDate = toIsoDate(eventRow.start_date) ?? fallback?.startDate ?? null;
        const endDate = toIsoDate(eventRow.end_date)
          ?? (fallback
            ? new Date(new Date(`${fallback.startDate}T00:00:00`).getTime() + (fallback.nights * 24 * 60 * 60 * 1000))
              .toISOString()
              .slice(0, 10)
            : null);
        const eventEndDate = endDate ? new Date(`${endDate}T00:00:00`) : null;
        const isCompleted = Boolean(eventEndDate && !Number.isNaN(eventEndDate.getTime()) && eventEndDate.getTime() < today.getTime());
        const normalizedStatus = isCompleted ? 'COMPLETED' : (typeof eventRow.status === 'string' ? eventRow.status : 'AVAILABLE');

        return {
          ...eventRow,
          start_date: startDate,
          end_date: endDate,
          status: normalizedStatus,
        };
      })
      .sort((a, b) => {
        const aDate = a.start_date ? new Date(`${a.start_date}T00:00:00`) : null;
        const bDate = b.start_date ? new Date(`${b.start_date}T00:00:00`) : null;
        const aValid = aDate && !Number.isNaN(aDate.getTime());
        const bValid = bDate && !Number.isNaN(bDate.getTime());

        if (aValid && bValid) {
          const aTime = aDate.getTime();
          const bTime = bDate.getTime();

          const aDiff = aTime >= today.getTime() ? aTime - today.getTime() : Number.MAX_SAFE_INTEGER / 2 + (today.getTime() - aTime);
          const bDiff = bTime >= today.getTime() ? bTime - today.getTime() : Number.MAX_SAFE_INTEGER / 2 + (today.getTime() - bTime);
          return aDiff - bDiff;
        }
        if (aValid) return -1;
        if (bValid) return 1;
        return 0;
      });
    const workflows = safeArray(workflowsRes.data);
    const partners = safeArray(partnersRes.data);
    const tailored_requests = safeArray(tailoredRes.data);

    // Some optional dashboard tables may not exist yet. Keep dashboard usable.
    const optionalErrors: string[] = [];
    if (participantsWithStatusRes.error) optionalErrors.push(`participants.status unavailable: ${participantsWithStatusRes.error.message}`);
    if (workflowsRes.error) optionalErrors.push(`booking_workflows: ${workflowsRes.error.message}`);
    if (partnersRes.error) optionalErrors.push(`partner_enquiries: ${partnersRes.error.message}`);
    if (tailoredRes.error) optionalErrors.push(`tailored_event_requests: ${tailoredRes.error.message}`);

    return Response.json({
      ok: true,
      data: {
        bookings,
        participants,
        events,
        workflows,
        partners,
        tailored_requests,
      },
      warnings: optionalErrors,
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Dashboard overview failed.',
      },
      { status: 500 },
    );
  }
}
