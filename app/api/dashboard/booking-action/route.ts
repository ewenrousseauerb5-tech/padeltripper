import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

type ActionType = 'hotel_request_sent' | 'coach_notified' | 'payment_reminder_sent' | 'mark_paid' | 'mark_confirmed';

interface ActionPayload {
  quotation_id?: number;
  action?: ActionType;
  preview_body?: string;
}

function normalizeAction(action: unknown): ActionType | null {
  if (typeof action !== 'string') return null;
  const allowed: ActionType[] = [
    'hotel_request_sent',
    'coach_notified',
    'payment_reminder_sent',
    'mark_paid',
    'mark_confirmed',
  ];
  return allowed.includes(action as ActionType) ? (action as ActionType) : null;
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json({ ok: false, error: 'Missing Supabase configuration.' }, { status: 500 });
    }

    const body = (await request.json()) as ActionPayload;
    const quotationId = Number(body.quotation_id);
    const action = normalizeAction(body.action);
    const previewBody = typeof body.preview_body === 'string' ? body.preview_body.trim() : '';

    if (!Number.isFinite(quotationId) || quotationId <= 0 || !action) {
      return Response.json({ ok: false, error: 'Invalid quotation_id or action.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const now = new Date().toISOString();

    // Ensure workflow row exists.
    await supabase.from('booking_workflows').upsert(
      {
        quotation_id: quotationId,
        updated_at: now,
      },
      { onConflict: 'quotation_id' },
    );

    const workflowPatch: Record<string, string> = { updated_at: now };
    const quotationPatch: Record<string, string> = {};

    if (action === 'hotel_request_sent') {
      workflowPatch.hotel_status = 'sent';
      quotationPatch.status = 'HOTEL_REQUESTED';
    }
    if (action === 'coach_notified') {
      workflowPatch.coach_status = 'sent';
      quotationPatch.status = 'COACH_NOTIFIED';
    }
    if (action === 'payment_reminder_sent') {
      quotationPatch.status = 'PAYMENT_REMINDER_SENT';
    }
    if (action === 'mark_paid') {
      workflowPatch.payment_status = 'paid';
      quotationPatch.payment_status = 'paid';
      quotationPatch.status = 'PAID';
    }
    if (action === 'mark_confirmed') {
      quotationPatch.status = 'CONFIRMED';
    }

    await supabase.from('booking_workflows').update(workflowPatch).eq('quotation_id', quotationId);

    if (Object.keys(quotationPatch).length > 0) {
      await supabase.from('quotations').update(quotationPatch).eq('id', quotationId);
    }

    await supabase.from('booking_status_history').insert({
      quotation_id: quotationId,
      action_type: action,
      notes: previewBody || null,
      created_at: now,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Booking action failed.',
      },
      { status: 500 },
    );
  }
}
