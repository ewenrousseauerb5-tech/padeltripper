import { createClient } from '@supabase/supabase-js';
import { ALL_EVENTS } from '../data/events';

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
  accepted_privacy_terms?: boolean;
  confirmed_participant_consent?: boolean;
  participants?: ParticipantInput[];
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
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
  accepted_privacy_terms: boolean;
  confirmed_participant_consent: boolean;
  participants: NormalizedParticipant[];
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
}

type PaymentEmailFlow = 'deposit' | 'full_payment';

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
  const num_participants = Number(raw.num_participants);

  if (!Number.isFinite(event_id) || event_id <= 0) {
    return { error: 'event_id is required.' };
  }
  if (!full_name) {
    return { error: 'full_name is required.' };
  }
  if (!email) {
    return { error: 'email is required.' };
  }
  if (!Number.isFinite(num_participants) || num_participants <= 0) {
    return { error: 'num_participants is required.' };
  }

  const normalizedParticipants =
    participants.length > 0
      ? participants
      : [
          {
            full_name,
            email,
            padel_level: '',
            trip_goals: '',
            special_requirements: '',
            equipment_rental: false,
          },
        ];

  return {
    booking: {
      event_id,
      event_name: normalizeString(raw.event_name) || undefined,
      full_name,
      email,
      phone: normalizeString(raw.phone),
      num_participants,
      accommodation_type: normalizeString(raw.accommodation_type),
      dietary_requirements: normalizeString(raw.dietary_requirements),
      special_requests: normalizeString(raw.special_requests),
      accepted_privacy_terms: raw.accepted_privacy_terms === true,
      confirmed_participant_consent: raw.confirmed_participant_consent === true,
      participants: normalizedParticipants,
      utm_source: normalizeString(raw.utm_source),
      utm_medium: normalizeString(raw.utm_medium),
      utm_campaign: normalizeString(raw.utm_campaign),
      utm_content: normalizeString(raw.utm_content),
      utm_term: normalizeString(raw.utm_term),
      gclid: normalizeString(raw.gclid),
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

  return `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#111;padding:24px 32px;">
    <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700;">New Quotation Request - Padel Tripper</h1>
  </div>
  <div style="padding:32px;background:#fff;border:1px solid #eee;">
    <h2 style="color:#c0392b;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">Quotation Summary</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
      <tr><td style="padding:5px 0;color:#888;width:40%;">Reference</td><td style="padding:5px 0;font-weight:700;">#${quotationId}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Event</td><td style="padding:5px 0;">${escapeHtml(eventLabel)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Lead Booker</td><td style="padding:5px 0;">${escapeHtml(booking.full_name)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Email</td><td style="padding:5px 0;">${escapeHtml(booking.email)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Participants</td><td style="padding:5px 0;">${booking.num_participants}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Other Information</td><td style="padding:5px 0;">${escapeHtml(booking.special_requests || '—')}</td></tr>
    </table>
  </div>
</div>`;
}

function buildCustomerHtml(booking: NormalizedBooking, paymentFlow: PaymentEmailFlow): string {
  const firstName = booking.full_name.split(' ')[0] || booking.full_name;
  const eventLabel = booking.event_name || `Event #${booking.event_id}`;
  const paymentParagraph =
    paymentFlow === 'deposit'
      ? 'As soon as we receive these details, we&apos;ll send your invoice so you can secure your spot with the deposit and lock in your place.'
      : 'As soon as we receive these details, we&apos;ll send your invoice and next steps to confirm your booking in full.';

  return `
<div style="font-family:Arial,Helvetica,sans-serif;background:#ffffff;padding:0;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #efefef;">
    <div style="background:#111111;padding:22px 28px;border-bottom:4px solid #d64242;">
      <img
        src="https://padeltripper.com/images/logos/logo-landscape.png"
        alt="Padel Tripper"
        width="190"
        style="display:block;width:190px;max-width:100%;height:auto;"
      />
    </div>
    <div style="padding:30px 28px 24px;">
      <p style="margin:0 0 8px;color:#d64242;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Trip Enquiry Received</p>
      <h2 style="font-size:32px;line-height:1.15;color:#101218;margin:0 0 14px;font-weight:800;">Thanks, ${escapeHtml(firstName)}!</h2>
      <p style="margin:0 0 18px;color:#4e535b;font-size:18px;line-height:1.55;">Great choice. We&apos;re now checking final availability and preparing everything for your <strong style="color:#101218;">${escapeHtml(eventLabel)}</strong> trip.</p>
      <div style="border:1px solid #e9e9e9;border-radius:10px;padding:14px 16px;margin:0 0 18px;">
        <p style="margin:0;color:#3e444d;font-size:14px;line-height:1.55;"><strong style="color:#101218;">What happens next:</strong></p>
        <p style="margin:8px 0 0;color:#4e535b;font-size:14px;line-height:1.55;">1. Reply with your contact number and home address.</p>
        <p style="margin:4px 0 0;color:#4e535b;font-size:14px;line-height:1.55;">2. We send your invoice and booking details.</p>
        <p style="margin:4px 0 0;color:#4e535b;font-size:14px;line-height:1.55;">3. We confirm all final trip information before arrival.</p>
      </div>
      <div style="border:1px solid #e9e9e9;border-radius:10px;padding:18px 18px;margin:0 0 22px;">
        <p style="margin:0;color:#4e535b;font-size:16px;line-height:1.6;">${paymentParagraph}</p>
      </div>
      <div style="margin:0 0 20px;">
        <img
          src="https://padeltripper.com/images/tournament-oct-24.jpg"
          alt="Padel Tripper group celebrating after a tournament in Alicante"
          width="564"
          style="display:block;width:100%;max-width:564px;height:auto;border-radius:12px;border:1px solid #ece7df;"
        />
      </div>
      <p style="margin:0;color:#4e535b;font-size:16px;line-height:1.7;">If you have any questions in the meantime, reach us at <strong style="color:#101218;">hello@padeltripper.com</strong> or <strong style="color:#101218;">+44 7939870682</strong>.</p>
      <p style="margin:26px 0 0;color:#8a8f97;font-size:15px;">The Padel Tripper Team</p>
    </div>
    <div style="background:#ffffff;border-top:1px solid #efefef;padding:14px 28px;">
      <p style="margin:0;color:#9aa0a8;font-size:12px;line-height:1.5;">Padel Tripper · Alicante, Spain</p>
    </div>
  </div>
</div>`;
}

function getPaymentEmailFlow(startDateRaw: string | null | undefined, eventId: number): PaymentEmailFlow {
  const fallbackStartDate = ALL_EVENTS.find(event => event.id === eventId)?.startDate || null;
  const effectiveStartDate = startDateRaw || fallbackStartDate;
  if (!effectiveStartDate) return 'full_payment';

  const eventDate = new Date(`${effectiveStartDate}T00:00:00Z`);
  if (Number.isNaN(eventDate.getTime())) return 'full_payment';

  const now = new Date();
  const daysUntilEvent = Math.floor((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilEvent > 93 ? 'deposit' : 'full_payment';
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
      .select('id,start_date')
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
        utm_source: booking.utm_source || null,
        utm_medium: booking.utm_medium || null,
        utm_campaign: booking.utm_campaign || null,
        utm_content: booking.utm_content || null,
        utm_term: booking.utm_term || null,
        gclid: booking.gclid || null,
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
    const paymentEmailFlow = getPaymentEmailFlow(eventRow.start_date, booking.event_id);
    const customerHtml = buildCustomerHtml(booking, paymentEmailFlow);
    const eventLabel = booking.event_name || `Event #${booking.event_id}`;

    const emailResults = await Promise.allSettled([
      sendResendEmail(env.RESEND_API_KEY, fromEmail, {
        to: env.CONTACT_EMAIL_TO,
        reply_to: booking.email,
        subject: `New quotation request - ${eventLabel} - ${booking.full_name} (x${booking.num_participants})`,
        html: adminHtml,
      }),
      sendResendEmail(env.RESEND_API_KEY, fromEmail, {
        to: booking.email,
        subject: `Action needed: reply with your contact details to confirm ${eventLabel}`,
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
