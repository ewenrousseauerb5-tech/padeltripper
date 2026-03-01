import { createClient } from '@supabase/supabase-js';

export interface BookingEnv {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_TO?: string;
  RESEND_FROM_EMAIL?: string;
}

interface ParticipantInput {
  full_name?: string;
  email?: string;
  padel_level?: string;
  trip_goals?: string;
  special_requirements?: string;
  equipment_rental?: boolean;
}

interface BookingPayload {
  event_id?: number;
  event_name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  num_participants?: number;
  accommodation_type?: string;
  dietary_requirements?: string;
  special_requests?: string;
  participants?: ParticipantInput[];
  // Optional legacy enquiry shape to avoid breaking existing non-booking form.
  name?: string;
  event?: string;
  message?: string;
}

interface NormalizedParticipant {
  full_name: string;
  email: string;
  padel_level: string;
  trip_goals: string;
  special_requirements: string;
  equipment_rental: boolean;
}

interface NormalizedBooking {
  event_id: number;
  event_name?: string;
  full_name: string;
  email: string;
  phone: string;
  num_participants: number;
  accommodation_type: string;
  dietary_requirements: string;
  special_requests: string;
  participants: NormalizedParticipant[];
}

export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const resendApiUrl = 'https://api.resend.com/emails';
const fallbackFromEmail = 'Padel Tripper <[email protected]>';

function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: corsHeaders });
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeParticipants(raw: ParticipantInput[] = []): NormalizedParticipant[] {
  return raw.map(participant => ({
    full_name: normalizeString(participant.full_name),
    email: normalizeString(participant.email),
    padel_level: normalizeString(participant.padel_level),
    trip_goals: normalizeString(participant.trip_goals),
    special_requirements: normalizeString(participant.special_requirements),
    equipment_rental: Boolean(participant.equipment_rental),
  }));
}

function normalizeBookingPayload(raw: BookingPayload): { booking?: NormalizedBooking; error?: string } {
  const event_id = Number(raw.event_id);
  const full_name = normalizeString(raw.full_name);
  const email = normalizeString(raw.email);
  const participants = Array.isArray(raw.participants) ? normalizeParticipants(raw.participants) : [];

  if (!Number.isFinite(event_id) || event_id <= 0) {
    return { error: 'event_id is required.' };
  }
  if (!full_name) {
    return { error: 'full_name is required.' };
  }
  if (!email) {
    return { error: 'email is required.' };
  }
  if (!participants.length) {
    return { error: 'participants is required.' };
  }

  return {
    booking: {
      event_id,
      event_name: normalizeString(raw.event_name) || undefined,
      full_name,
      email,
      phone: normalizeString(raw.phone),
      num_participants: Number(raw.num_participants) > 0 ? Number(raw.num_participants) : participants.length,
      accommodation_type: normalizeString(raw.accommodation_type),
      dietary_requirements: normalizeString(raw.dietary_requirements),
      special_requests: normalizeString(raw.special_requests),
      participants,
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildAdminHtml(quotationId: number, booking: NormalizedBooking): string {
  const eventLabel = booking.event_name || `Event #${booking.event_id}`;
  const participantRows = booking.participants
    .map(
      (p, i) => `
      <tr style="border-bottom:1px solid #f0f0f0;">
        <td style="padding:8px 12px;font-weight:600;">${i + 1}. ${escapeHtml(p.full_name || '—')}</td>
        <td style="padding:8px 12px;">${escapeHtml(p.email || '—')}</td>
        <td style="padding:8px 12px;">${escapeHtml(p.padel_level || '—')}</td>
        <td style="padding:8px 12px;">${p.equipment_rental ? 'Yes' : 'No'}</td>
      </tr>`,
    )
    .join('');

  return `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#111;padding:24px 32px;">
    <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700;">New Booking - Padel Tripper</h1>
  </div>
  <div style="padding:32px;background:#fff;border:1px solid #eee;">
    <h2 style="color:#c0392b;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">Booking Summary</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
      <tr><td style="padding:5px 0;color:#888;width:40%;">Reference</td><td style="padding:5px 0;font-weight:700;">#${quotationId}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Event</td><td style="padding:5px 0;">${escapeHtml(eventLabel)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Lead Booker</td><td style="padding:5px 0;">${escapeHtml(booking.full_name)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Email</td><td style="padding:5px 0;">${escapeHtml(booking.email)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Phone</td><td style="padding:5px 0;">${escapeHtml(booking.phone || '—')}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Participants</td><td style="padding:5px 0;">${booking.num_participants}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Accommodation</td><td style="padding:5px 0;">${escapeHtml(booking.accommodation_type || '—')}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Dietary</td><td style="padding:5px 0;">${escapeHtml(booking.dietary_requirements || '—')}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Special Requests</td><td style="padding:5px 0;">${escapeHtml(booking.special_requests || '—')}</td></tr>
    </table>
    <h2 style="color:#c0392b;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;">Participants</h2>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#f8f8f8;">
          <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;color:#999;">Name</th>
          <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;color:#999;">Email</th>
          <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;color:#999;">Level</th>
          <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;color:#999;">Rental</th>
        </tr>
      </thead>
      <tbody>${participantRows}</tbody>
    </table>
  </div>
</div>`;
}

function buildCustomerHtml(booking: NormalizedBooking): string {
  const firstName = booking.full_name.split(' ')[0] || booking.full_name;
  const eventLabel = booking.event_name || `Event #${booking.event_id}`;

  return `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#111;padding:24px 32px;">
    <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700;">Padel Tripper</h1>
  </div>
  <div style="padding:32px;background:#fff;border:1px solid #eee;">
    <h2 style="font-size:22px;color:#111;margin-bottom:8px;">Thanks, ${escapeHtml(firstName)}!</h2>
    <p style="color:#666;line-height:1.7;">We've received your quotation request for <strong>${escapeHtml(eventLabel)}</strong>. Our team will review availability and contact you shortly with the next steps.</p>
    <div style="background:#f8f8f8;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <p style="margin:0;color:#666;line-height:1.7;">This is a request only. Your place is not confirmed until we email you with your quotation details and payment instructions.</p>
    </div>
    <p style="color:#666;line-height:1.7;">If you have any questions in the meantime, reach us on WhatsApp at <strong>+44 7793 9870682</strong> or email <strong>hello@padeltripper.com</strong>.</p>
    <p style="color:#aaa;font-size:13px;margin-top:32px;">The Padel Tripper Team</p>
  </div>
</div>`;
}

async function sendResendEmail(
  resendApiKey: string,
  fromEmail: string,
  payload: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    reply_to?: string;
  },
): Promise<void> {
  const response = await fetch(resendApiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      ...payload,
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Resend error (${response.status}): ${responseText}`);
  }
}

async function handleLegacyEnquiry(rawBody: BookingPayload, env: BookingEnv): Promise<Response | null> {
  const hasLegacyFields =
    typeof rawBody.name === 'string' ||
    typeof rawBody.message === 'string' ||
    typeof rawBody.event === 'string';

  if (!hasLegacyFields) {
    return null;
  }

  const name = normalizeString(rawBody.full_name || rawBody.name);
  const email = normalizeString(rawBody.email);
  const event = normalizeString(rawBody.event_name || rawBody.event || 'Enquiry');
  const message = normalizeString(rawBody.message);

  if (!name || !email) {
    return jsonResponse({ ok: false, error: 'Missing required fields.' }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL_TO) {
    return jsonResponse({ ok: false, error: 'Server is missing email configuration.' }, 500);
  }

  const fromEmail = normalizeString(env.RESEND_FROM_EMAIL) || fallbackFromEmail;
  await sendResendEmail(env.RESEND_API_KEY, fromEmail, {
    to: env.CONTACT_EMAIL_TO,
    reply_to: email,
    subject: `New enquiry - ${event} - ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, `Event: ${event}`, `Message: ${message || '(none)'}`].join('\n'),
  });

  return jsonResponse({ ok: true });
}

export async function handleBookingRequest(request: Request, env: BookingEnv): Promise<Response> {
  try {
    let rawBody: BookingPayload;
    try {
      rawBody = (await request.json()) as BookingPayload;
    } catch {
      return jsonResponse({ ok: false, error: 'Invalid JSON body.' }, 400);
    }

    const legacyResponse = await handleLegacyEnquiry(rawBody, env);
    if (legacyResponse) {
      return legacyResponse;
    }

    const { booking, error } = normalizeBookingPayload(rawBody);
    if (!booking) {
      return jsonResponse({ ok: false, error: error || 'Invalid booking payload.' }, 400);
    }

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return jsonResponse({ ok: false, error: 'Server is missing Supabase configuration.' }, 500);
    }
    if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL_TO) {
      return jsonResponse({ ok: false, error: 'Server is missing email configuration.' }, 500);
    }
    const fromEmail = normalizeString(env.RESEND_FROM_EMAIL) || fallbackFromEmail;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: eventRow, error: eventLookupError } = await supabase
      .from('events')
      .select('id')
      .eq('id', booking.event_id)
      .maybeSingle();

    if (eventLookupError) {
      throw new Error(`Event lookup failed: ${eventLookupError.message}`);
    }
    if (!eventRow?.id) {
      return jsonResponse({ ok: false, error: 'Invalid event_id. Selected event does not exist.' }, 400);
    }

    const { data: quotation, error: quotationError } = await supabase
      .from('quotations')
      .insert({
        event_id: booking.event_id,
        full_name: booking.full_name,
        email: booking.email,
        phone: booking.phone,
        num_participants: booking.num_participants,
        accommodation_type: booking.accommodation_type,
        dietary_requirements: booking.dietary_requirements,
        special_requests: booking.special_requests,
        status: 'SUBMITTED',
        payment_status: 'pending',
      })
      .select('id')
      .single();

    if (quotationError || !quotation?.id) {
      throw new Error(`Quotation insert failed: ${quotationError?.message || 'No quotation id returned.'}`);
    }

    const { error: participantsError } = await supabase.from('participants').insert(
      booking.participants.map(participant => ({
        quotation_id: quotation.id,
        full_name: participant.full_name,
        email: participant.email,
        padel_level: participant.padel_level,
        trip_goals: participant.trip_goals,
        special_requirements: participant.special_requirements,
        equipment_rental: participant.equipment_rental,
      })),
    );

    if (participantsError) {
      throw new Error(`Participants insert failed: ${participantsError.message}`);
    }

    const adminHtml = buildAdminHtml(quotation.id, booking);
    const customerHtml = buildCustomerHtml(booking);
    const eventLabel = booking.event_name || `Event #${booking.event_id}`;

    const emailResults = await Promise.allSettled([
      sendResendEmail(env.RESEND_API_KEY, fromEmail, {
        to: env.CONTACT_EMAIL_TO,
        reply_to: booking.email,
        subject: `New booking - ${eventLabel} - ${booking.full_name} (x${booking.num_participants})`,
        html: adminHtml,
      }),
      sendResendEmail(env.RESEND_API_KEY, fromEmail, {
        to: booking.email,
        subject: `Your Padel Tripper quotation request - ${eventLabel}`,
        html: customerHtml,
      }),
    ]);
    const [adminEmailResult, customerEmailResult] = emailResults;
    if (adminEmailResult.status === 'rejected') {
      console.error('Booking email to admin failed:', adminEmailResult.reason);
    }
    if (customerEmailResult.status === 'rejected') {
      console.error('Booking email to customer failed:', customerEmailResult.reason);
    }

    return jsonResponse({ ok: true, quotation_id: quotation.id });
  } catch (error) {
    console.error('Booking API error:', error);
    const message = error instanceof Error ? error.message : '';
    if (message.includes('violates foreign key constraint')) {
      return jsonResponse({ ok: false, error: 'Invalid event_id. Selected event does not exist.' }, 400);
    }
    return jsonResponse(
      { ok: false, error: 'Something went wrong. Please try again or contact us directly.' },
      500,
    );
  }
}
