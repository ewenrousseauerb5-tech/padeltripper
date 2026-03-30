import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

type MaybeRecord = Record<string, unknown>;

function safeArray(value: unknown): MaybeRecord[] {
  return Array.isArray(value) ? (value as MaybeRecord[]) : [];
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json({ ok: false, error: 'Missing Supabase configuration.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const [bookingsRes, participantsRes, eventsRes, workflowsRes, partnersRes] = await Promise.all([
      supabase
        .from('quotations')
        .select('id,event_id,full_name,email,num_participants,status,payment_status,created_at')
        .order('created_at', { ascending: false })
        .limit(300),
      supabase
        .from('participants')
        .select('id,quotation_id,full_name,email,padel_level,created_at')
        .order('created_at', { ascending: false })
        .limit(500),
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
    ]);

    const bookings = safeArray(bookingsRes.data);
    const participants = safeArray(participantsRes.data);
    const events = safeArray(eventsRes.data);
    const workflows = safeArray(workflowsRes.data);
    const partners = safeArray(partnersRes.data);

    // Some optional dashboard tables may not exist yet. Keep dashboard usable.
    const optionalErrors: string[] = [];
    if (workflowsRes.error) optionalErrors.push(`booking_workflows: ${workflowsRes.error.message}`);
    if (partnersRes.error) optionalErrors.push(`partner_enquiries: ${partnersRes.error.message}`);

    return Response.json({
      ok: true,
      data: {
        bookings,
        participants,
        events,
        workflows,
        partners,
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
