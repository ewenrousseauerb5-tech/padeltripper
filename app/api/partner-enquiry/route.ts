import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

interface PartnerPayload {
  full_name?: string;
  email?: string;
  phone?: string;
  role?: string;
  message?: string;
  accepted_privacy_terms?: boolean;
}

const resendApiUrl = 'https://api.resend.com/emails';
const fallbackFromEmail = 'Padel Tripper <[email protected]>';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

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

function generatePartnerReference(): string {
  const now = new Date();
  const y = String(now.getUTCFullYear()).slice(-2);
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  const d = String(now.getUTCDate()).padStart(2, '0');
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PTP-${y}${m}${d}-${rnd}`;
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
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmailTo = process.env.CONTACT_EMAIL_TO ?? process.env.BOOKING_NOTIFICATION_EMAIL;
    const fromEmail = normalize(process.env.RESEND_FROM_EMAIL) || fallbackFromEmail;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!resendApiKey || !contactEmailTo) {
      return Response.json(
        { ok: false, error: 'Server is missing email configuration.' },
        { status: 500, headers: corsHeaders },
      );
    }

    let body: PartnerPayload;
    try {
      body = (await request.json()) as PartnerPayload;
    } catch {
      return Response.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400, headers: corsHeaders });
    }

    const fullName = normalize(body.full_name);
    const email = normalize(body.email);
    const phone = normalize(body.phone);
    const role = normalize(body.role);
    const message = normalize(body.message);

    if (!fullName || !email || !role) {
      return Response.json(
        { ok: false, error: 'full_name, email and role are required.' },
        { status: 400, headers: corsHeaders },
      );
    }
    if (body.accepted_privacy_terms !== true) {
      return Response.json(
        { ok: false, error: 'Privacy policy and terms must be accepted.' },
        { status: 400, headers: corsHeaders },
      );
    }

    const reference = generatePartnerReference();

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error: partnerInsertError } = await supabase.from('partner_enquiries').insert({
        reference,
        full_name: fullName,
        email,
        phone: phone || null,
        role,
        message: message || null,
        status: 'NEW',
        source: 'website_partners_form',
      });
      if (partnerInsertError) {
        console.error('Partner enquiry DB insert failed:', partnerInsertError.message);
      }
    }

    const adminHtml = `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#111;padding:24px 32px;">
    <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700;">New Partner Enquiry - Padel Tripper</h1>
  </div>
  <div style="padding:32px;background:#fff;border:1px solid #eee;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:5px 0;color:#888;width:40%;">Reference</td><td style="padding:5px 0;font-weight:700;">${reference}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Name</td><td style="padding:5px 0;">${escapeHtml(fullName)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Email</td><td style="padding:5px 0;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Phone</td><td style="padding:5px 0;">${escapeHtml(phone || '—')}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Role / Club</td><td style="padding:5px 0;">${escapeHtml(role)}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Message</td><td style="padding:5px 0;">${escapeHtml(message || '—')}</td></tr>
    </table>
  </div>
</div>`;

    const firstName = fullName.split(' ')[0] || fullName;
    const customerHtml = `
<div style="font-family:Arial,Helvetica,sans-serif;background:#f4f1ec;padding:24px 12px;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #ece7df;">
    <div style="background:#111111;padding:22px 28px;border-bottom:4px solid #d64242;">
      <img src="https://padeltripper.com/images/logos/logo-landscape.png" alt="Padel Tripper" width="190" style="display:block;width:190px;max-width:100%;height:auto;" />
    </div>
    <div style="padding:32px 28px 26px;">
      <p style="margin:0 0 8px;color:#d64242;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Partner Enquiry Received</p>
      <h2 style="font-size:30px;line-height:1.15;color:#101218;margin:0 0 14px;font-weight:800;">Thanks, ${escapeHtml(firstName)}!</h2>
      <p style="margin:0;color:#4e535b;font-size:17px;line-height:1.6;">Your enquiry has been received. Your partner reference is <strong style="color:#101218;">${reference}</strong>.</p>
      <p style="margin:14px 0 0;color:#4e535b;font-size:15px;line-height:1.6;">Our team will review your profile and contact you shortly with next steps.</p>
      <p style="margin:18px 0 0;color:#4e535b;font-size:15px;line-height:1.6;">Questions? Email <strong style="color:#101218;">hello@padeltripper.com</strong>.</p>
      <p style="margin:24px 0 0;color:#8a8f97;font-size:14px;">The Padel Tripper Team</p>
    </div>
  </div>
</div>`;

    const emailResults = await Promise.allSettled([
      sendResendEmail(resendApiKey, fromEmail, {
        to: contactEmailTo,
        reply_to: email,
        subject: `New partner enquiry - ${fullName} (${reference})`,
        html: adminHtml,
      }),
      sendResendEmail(resendApiKey, fromEmail, {
        to: email,
        subject: `Your partner enquiry reference - ${reference}`,
        html: customerHtml,
      }),
    ]);

    const [adminEmailResult, customerEmailResult] = emailResults;
    if (adminEmailResult.status === 'rejected') {
      console.error('Partner enquiry email to admin failed:', adminEmailResult.reason);
    }
    if (customerEmailResult.status === 'rejected') {
      console.error('Partner enquiry email to customer failed:', customerEmailResult.reason);
    }

    return Response.json({ ok: true, reference }, { headers: corsHeaders });
  } catch (error) {
    console.error('Partner enquiry API error:', error);
    return Response.json(
      { ok: false, error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500, headers: corsHeaders },
    );
  }
}
