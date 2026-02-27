import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface BookingPayload {
  name?: string;
  email?: string;
  event?: string;
  message?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as BookingPayload;
  const name = body.name?.trim();
  const email = body.email?.trim();
  const event = body.event?.trim();
  const message = body.message?.trim();

  if (!name || !email || !event) {
    return NextResponse.json(
      { ok: false, error: 'Missing required fields.' },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFICATION_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL;

  if (resendApiKey && to && from) {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from,
      to,
      subject: `New booking enquiry - ${event}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Event: ${event}`,
        `Message: ${message || '(no message)'}`,
      ].join('\n'),
    });
  }

  return NextResponse.json({ ok: true });
}
