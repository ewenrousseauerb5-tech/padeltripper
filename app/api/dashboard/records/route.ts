import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

type Entity = 'booking' | 'participant' | 'event' | 'partner' | 'tailored_request';
type Mode = 'create' | 'update';

interface RecordsPayload {
  entity?: Entity;
  mode?: Mode;
  id?: number;
  values?: Record<string, unknown>;
}

function pickString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function pickNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function pickBoolean(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
}

function parseEntity(value: unknown): Entity | null {
  if (value === 'booking' || value === 'participant' || value === 'event' || value === 'partner' || value === 'tailored_request') {
    return value;
  }
  return null;
}

function parseMode(value: unknown): Mode | null {
  if (value === 'create' || value === 'update') return value;
  return null;
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json({ ok: false, error: 'Missing Supabase configuration.' }, { status: 500 });
    }

    const body = (await request.json()) as RecordsPayload;
    const entity = parseEntity(body.entity);
    const mode = parseMode(body.mode);
    const id = pickNumber(body.id);
    const values = body.values || {};

    if (!entity || !mode) {
      return Response.json({ ok: false, error: 'Invalid entity or mode.' }, { status: 400 });
    }
    if (mode === 'update' && (!id || id <= 0)) {
      return Response.json({ ok: false, error: 'Valid id required for updates.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (entity === 'participant') {
      const payload: Record<string, unknown> = {
        quotation_id: pickNumber(values.quotation_id),
        full_name: pickString(values.full_name),
        email: pickString(values.email),
        padel_level: pickString(values.padel_level),
        status: pickString(values.status),
      };

      if (mode === 'create') {
        if (!payload.quotation_id || !payload.full_name || !payload.email) {
          return Response.json({ ok: false, error: 'quotation_id, full_name and email are required.' }, { status: 400 });
        }

        const insertRes = await supabase.from('participants').insert(payload).select('id').single();
        if (!insertRes.error) return Response.json({ ok: true, id: insertRes.data?.id || null });

        // Backward compatibility if participants.status column does not exist.
        if (String(insertRes.error.message || '').toLowerCase().includes('status')) {
          delete payload.status;
          const retryRes = await supabase.from('participants').insert(payload).select('id').single();
          if (retryRes.error) throw retryRes.error;
          return Response.json({ ok: true, id: retryRes.data?.id || null, warning: 'Status column not available on participants.' });
        }
        throw insertRes.error;
      }

      const updatePayload = Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== null));
      if (Object.keys(updatePayload).length === 0) {
        return Response.json({ ok: false, error: 'No fields provided for participant update.' }, { status: 400 });
      }

      const updateRes = await supabase.from('participants').update(updatePayload).eq('id', id as number);
      if (!updateRes.error) return Response.json({ ok: true });

      if (String(updateRes.error.message || '').toLowerCase().includes('status') && 'status' in updatePayload) {
        delete updatePayload.status;
        const retryRes = await supabase.from('participants').update(updatePayload).eq('id', id as number);
        if (retryRes.error) throw retryRes.error;
        return Response.json({ ok: true, warning: 'Status column not available on participants.' });
      }
      throw updateRes.error;
    }

    if (entity === 'booking') {
      const payload = Object.fromEntries(
        Object.entries({
          event_id: pickNumber(values.event_id),
          full_name: pickString(values.full_name),
          email: pickString(values.email),
          num_participants: pickNumber(values.num_participants),
          status: pickString(values.status),
          payment_status: pickString(values.payment_status),
        }).filter(([, value]) => value !== null),
      );
      if (Object.keys(payload).length === 0) {
        return Response.json({ ok: false, error: 'No fields provided for booking update.' }, { status: 400 });
      }
      const updateRes = await supabase.from('quotations').update(payload).eq('id', id as number);
      if (updateRes.error) throw updateRes.error;
      return Response.json({ ok: true });
    }

    if (entity === 'event') {
      const payload = Object.fromEntries(
        Object.entries({
          name: pickString(values.name),
          start_date: pickString(values.start_date),
          end_date: pickString(values.end_date),
          status: pickString(values.status),
          base_price: pickString(values.base_price),
          max_participants: pickNumber(values.max_participants),
          current_participants: pickNumber(values.current_participants),
          is_public: pickBoolean(values.is_public),
        }).filter(([, value]) => value !== null),
      );
      if (Object.keys(payload).length === 0) {
        return Response.json({ ok: false, error: 'No fields provided for event update.' }, { status: 400 });
      }
      const updateRes = await supabase.from('events').update(payload).eq('id', id as number);
      if (updateRes.error) throw updateRes.error;
      return Response.json({ ok: true });
    }

    if (entity === 'partner') {
      const payload = Object.fromEntries(
        Object.entries({
          reference: pickString(values.reference),
          full_name: pickString(values.full_name),
          email: pickString(values.email),
          role: pickString(values.role),
          status: pickString(values.status),
        }).filter(([, value]) => value !== null),
      );
      if (Object.keys(payload).length === 0) {
        return Response.json({ ok: false, error: 'No fields provided for partner update.' }, { status: 400 });
      }
      const updateRes = await supabase.from('partner_enquiries').update(payload).eq('id', id as number);
      if (updateRes.error) throw updateRes.error;
      return Response.json({ ok: true });
    }

    if (entity === 'tailored_request') {
      const payload = Object.fromEntries(
        Object.entries({
          full_name: pickString(values.full_name),
          email: pickString(values.email),
          phone: pickString(values.phone),
          event_type: pickString(values.event_type),
          group_size: pickString(values.group_size),
          preferred_dates: pickString(values.preferred_dates),
          destination: pickString(values.destination),
          status: pickString(values.status),
          source: pickString(values.source),
        }).filter(([, value]) => value !== null),
      );
      if (Object.keys(payload).length === 0) {
        return Response.json({ ok: false, error: 'No fields provided for tailored request update.' }, { status: 400 });
      }
      const updateRes = await supabase.from('tailored_event_requests').update(payload).eq('id', id as number);
      if (updateRes.error) throw updateRes.error;
      return Response.json({ ok: true });
    }

    return Response.json({ ok: false, error: 'Unsupported entity.' }, { status: 400 });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Dashboard record update failed.',
      },
      { status: 500 },
    );
  }
}
