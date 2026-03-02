import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

interface TailoredEventPayload {
  full_name?: string;
  email?: string;
  phone?: string;
  event_type?: string;
  group_size?: string;
  preferred_dates?: string;
  message?: string;
  accepted_privacy_terms?: boolean;
  confirmed_group_authority?: boolean;
}

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const resendApiUrl = 'https://api.resend.com/emails';
const fallbackFromEmail = 'Padel Tripper <[email protected]>';

function normalize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmailTo = process.env.CONTACT_EMAIL_TO ?? process.env.BOOKING_NOTIFICATION_EMAIL;
    const fromEmail = normalize(process.env.RESEND_FROM_EMAIL) || fallbackFromEmail;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json(
        { ok: false, error: 'Server is missing Supabase configuration.' },
        { status: 500, headers: corsHeaders },
      );
    }
    if (!resendApiKey || !contactEmailTo) {
      return Response.json(
        { ok: false, error: 'Server is missing email configuration.' },
        { status: 500, headers: corsHeaders },
      );
    }

    let body: TailoredEventPayload;
    try {
      body = (await request.json()) as TailoredEventPayload;
    } catch {
      return Response.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400, headers: corsHeaders });
    }

    const fullName = normalize(body.full_name);
    const email = normalize(body.email);
    const eventType = normalize(body.event_type);
    const groupSize = normalize(body.group_size);
    const phone = normalize(body.phone);
    const preferredDates = normalize(body.preferred_dates);
    const destination = 'Alicante';
    const message = normalize(body.message);

    if (!fullName || !email || !eventType || !groupSize) {
      return Response.json(
        { ok: false, error: 'full_name, email, event_type and group_size are required.' },
        { status: 400, headers: corsHeaders },
      );
    }
    if (body.accepted_privacy_terms !== true) {
      return Response.json(
        { ok: false, error: 'Privacy policy and terms must be accepted.' },
        { status: 400, headers: corsHeaders },
      );
    }
    if (body.confirmed_group_authority !== true) {
      return Response.json(
        { ok: false, error: 'Group authority confirmation is required.' },
        { status: 400, headers: corsHeaders },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: tailoredRequest, error: insertError } = await supabase
      .from('tailored_event_requests')
      .insert({
        full_name: fullName,
        email,
        phone,
        event_type: eventType,
        group_size: groupSize,
        preferred_dates: preferredDates,
        destination,
        budget_range: null,
        message,
        status: 'SUBMITTED',
        source: 'website_tailored_form',
        accepted_privacy_terms: true,
        confirmed_group_authority: true,
      })
      .select('id')
      .single();

    if (insertError || !tailoredRequest?.id) {
      throw new Error(`Tailored request insert failed: ${insertError?.message || 'No id returned.'}`);
    }

    const adminHtml = `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#111;padding:24px 32px;">
    <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700;">New Tailored Event Request - Padel Tripper</h1>
  </div>
  <div style="padding:32px;background:#fff;border:1px solid #eee;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:5px 0;color:#888;width:40%;">Request ID</td><td style="padding:5px 0;font-weight:700;">#${tailoredRequest.id}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Lead Name</td><td style="padding:5px 0;">${escapeHtml(fullName)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Email</td><td style="padding:5px 0;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Phone</td><td style="padding:5px 0;">${escapeHtml(phone || '—')}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Event Type</td><td style="padding:5px 0;">${escapeHtml(eventType)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Group Size</td><td style="padding:5px 0;">${escapeHtml(groupSize)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Preferred Dates</td><td style="padding:5px 0;">${escapeHtml(preferredDates || '—')}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Destination</td><td style="padding:5px 0;">${escapeHtml(destination)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Message</td><td style="padding:5px 0;">${escapeHtml(message || '—')}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Accepted Privacy/Terms</td><td style="padding:5px 0;">Yes</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Confirmed Group Authority</td><td style="padding:5px 0;">Yes</td></tr>
    </table>
  </div>
</div>`;

    const customerHtml = `
<div style="font-family:Arial,Helvetica,sans-serif;background:#f4f1ec;padding:24px 12px;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #ece7df;">
    <div style="background:#111111;padding:22px 28px;border-bottom:4px solid #d64242;">
      <img src="https://padeltripper.com/images/logos/logo-landscape.png" alt="Padel Tripper" width="190" style="display:block;width:190px;max-width:100%;height:auto;" />
    </div>
    <div style="padding:32px 28px 26px;">
      <p style="margin:0 0 8px;color:#d64242;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Tailored Event Request Received</p>
      <h2 style="font-size:30px;line-height:1.15;color:#101218;margin:0 0 14px;font-weight:800;">Thanks, ${escapeHtml(fullName.split(' ')[0] || fullName)}!</h2>
      <p style="margin:0;color:#4e535b;font-size:17px;line-height:1.6;">We've received your tailored event request. Our team will review your requirements and contact you shortly with next steps.</p>
      <p style="margin:18px 0 0;color:#4e535b;font-size:15px;line-height:1.6;">If you have any questions in the meantime, email <strong style="color:#101218;">hello@padeltripper.com</strong> or message us on WhatsApp at <strong style="color:#101218;">7939870682</strong>.</p>
      <p style="margin:24px 0 0;color:#8a8f97;font-size:14px;">The Padel Tripper Team</p>
    </div>
  </div>
</div>`;

    const emailResults = await Promise.allSettled([
      sendResendEmail(resendApiKey, fromEmail, {
        to: contactEmailTo,
        reply_to: email,
        subject: `New tailored event request - ${eventType} - ${fullName}`,
        html: adminHtml,
      }),
      sendResendEmail(resendApiKey, fromEmail, {
        to: email,
        subject: 'Your tailored event request - Padel Tripper',
        html: customerHtml,
      }),
    ]);

    const [adminEmailResult, customerEmailResult] = emailResults;
    if (adminEmailResult.status === 'rejected') {
      console.error('Tailored request email to admin failed:', adminEmailResult.reason);
    }
    if (customerEmailResult.status === 'rejected') {
      console.error('Tailored request email to customer failed:', customerEmailResult.reason);
    }

    return Response.json({ ok: true, tailored_request_id: tailoredRequest.id }, { headers: corsHeaders });
  } catch (error) {
    console.error('Tailored request API error:', error);
    return Response.json(
      { ok: false, error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500, headers: corsHeaders },
    );
  }
}
