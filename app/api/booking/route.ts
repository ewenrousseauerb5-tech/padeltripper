import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const runtime = 'edge';

interface Participant {
  full_name: string;
  email: string;
  padel_level: string;
  trip_goals: string;
  special_requirements: string;
  equipment_rental: boolean;
}

interface BookingPayload {
  // Full booking
  event_id?: number;
  event_name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  num_participants?: number;
  accommodation_type?: string;
  dietary_requirements?: string;
  special_requests?: string;
  participants?: Participant[];
  // Legacy tailor/simple enquiry fields
  name?: string;
  event?: string;
  message?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPayload;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const contactTo = process.env.CONTACT_EMAIL_TO ?? process.env.BOOKING_NOTIFICATION_EMAIL ?? '';
    const from = 'Padel Tripper <[email protected]>';

    // ── Legacy / tailor enquiry (no event_id or no participants) ──────────────
    if (!body.event_id || !body.participants?.length) {
      const name = (body.full_name ?? body.name ?? '').trim();
      const email = (body.email ?? '').trim();
      const event = (body.event_name ?? body.event ?? 'Enquiry').trim();
      const message = (body.message ?? '').trim();

      if (!name || !email) {
        return Response.json(
          { ok: false, error: 'Missing required fields.' },
          { status: 400, headers: corsHeaders },
        );
      }

      if (contactTo) {
        await resend.emails.send({
          from,
          to: contactTo,
          replyTo: email,
          subject: `New enquiry — ${event} — ${name}`,
          text: [`Name: ${name}`, `Email: ${email}`, `Event: ${event}`, `Message: ${message || '(none)'}`].join('\n'),
        });
      }

      return Response.json({ ok: true }, { headers: corsHeaders });
    }

    // ── Full structured booking ───────────────────────────────────────────────
    const { event_id, full_name, email, participants } = body;

    if (!full_name?.trim() || !email?.trim()) {
      return Response.json(
        { ok: false, error: 'full_name and email are required.' },
        { status: 400, headers: corsHeaders },
      );
    }

    // 1. Supabase — insert quotation
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { data: quotation, error: quotationError } = await supabase
      .from('quotations')
      .insert({
        event_id,
        full_name: full_name.trim(),
        email: email.trim(),
        phone: body.phone?.trim() ?? '',
        num_participants: body.num_participants ?? participants.length,
        accommodation_type: body.accommodation_type ?? '',
        dietary_requirements: body.dietary_requirements ?? '',
        special_requests: body.special_requests ?? '',
        status: 'SUBMITTED',
        payment_status: 'pending',
      })
      .select('id')
      .single();

    if (quotationError) throw new Error(`Quotation insert: ${quotationError.message}`);

    // 2. Supabase — insert participants
    const { error: participantsError } = await supabase.from('participants').insert(
      participants.map(p => ({
        quotation_id: quotation.id,
        full_name: p.full_name?.trim() ?? '',
        email: p.email?.trim() ?? '',
        padel_level: p.padel_level ?? '',
        trip_goals: p.trip_goals ?? '',
        special_requirements: p.special_requirements ?? '',
        equipment_rental: p.equipment_rental ?? false,
      })),
    );

    if (participantsError) throw new Error(`Participants insert: ${participantsError.message}`);

    // 3. Build emails
    const eventLabel = body.event_name ?? `Event #${event_id}`;
    const firstName = full_name.trim().split(' ')[0];

    const participantRows = participants
      .map(
        (p, i) => `
        <tr style="border-bottom:1px solid #f0f0f0;">
          <td style="padding:8px 12px;font-weight:600;">${i + 1}. ${p.full_name}</td>
          <td style="padding:8px 12px;">${p.email || '—'}</td>
          <td style="padding:8px 12px;">${p.padel_level || '—'}</td>
          <td style="padding:8px 12px;">${p.equipment_rental ? 'Yes' : 'No'}</td>
        </tr>`,
      )
      .join('');

    const adminHtml = `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#111;padding:24px 32px;">
    <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700;">New Booking — Padel Tripper</h1>
  </div>
  <div style="padding:32px;background:#fff;border:1px solid #eee;">
    <h2 style="color:#c0392b;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">Booking Summary</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
      <tr><td style="padding:5px 0;color:#888;width:40%;">Reference</td><td style="padding:5px 0;font-weight:700;">#${quotation.id}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Event</td><td style="padding:5px 0;">${eventLabel}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Lead Booker</td><td style="padding:5px 0;">${full_name}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Email</td><td style="padding:5px 0;">${email}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Phone</td><td style="padding:5px 0;">${body.phone || '—'}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Participants</td><td style="padding:5px 0;">${body.num_participants ?? participants.length}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Accommodation</td><td style="padding:5px 0;">${body.accommodation_type || '—'}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Dietary</td><td style="padding:5px 0;">${body.dietary_requirements || '—'}</td></tr>
      <tr><td style="padding:5px 0;color:#888;">Special Requests</td><td style="padding:5px 0;">${body.special_requests || '—'}</td></tr>
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

    const customerHtml = `
<div style="font-family:sans-serif;max-width:620px;margin:0 auto;">
  <div style="background:#111;padding:24px 32px;">
    <h1 style="color:#fff;font-size:18px;margin:0;font-weight:700;">Padel Tripper</h1>
  </div>
  <div style="padding:32px;background:#fff;border:1px solid #eee;">
    <h2 style="font-size:22px;color:#111;margin-bottom:8px;">Thanks, ${firstName}!</h2>
    <p style="color:#666;line-height:1.7;">We've received your booking request for <strong>${eventLabel}</strong>. We're reviewing it now and will be in touch shortly to confirm your spot and share the next steps.</p>
    <div style="background:#f8f8f8;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <p style="margin:0 0 6px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Your Reference</p>
      <p style="margin:0;font-size:24px;font-weight:700;color:#c0392b;">#${quotation.id}</p>
    </div>
    <p style="color:#666;line-height:1.7;">Got a question in the meantime? Reach us on WhatsApp at <strong>+44 7793 9870682</strong> or email <strong>hello@padeltripper.com</strong>.</p>
    <p style="color:#aaa;font-size:13px;margin-top:32px;">The Padel Tripper Team</p>
  </div>
</div>`;

    // 4. Send emails (don't fail the booking if email fails)
    await Promise.allSettled([
      contactTo &&
        resend.emails.send({
          from,
          to: contactTo,
          replyTo: email.trim(),
          subject: `New booking — ${eventLabel} — ${full_name} (×${body.num_participants ?? participants.length})`,
          html: adminHtml,
        }),
      resend.emails.send({
        from,
        to: email.trim(),
        subject: `Your Padel Tripper booking — ${eventLabel}`,
        html: customerHtml,
      }),
    ]);

    return Response.json({ ok: true, quotation_id: quotation.id }, { headers: corsHeaders });
  } catch (err) {
    console.error('Booking API error:', err);
    return Response.json(
      { ok: false, error: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500, headers: corsHeaders },
    );
  }
}
