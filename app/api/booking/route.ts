import { corsHeaders, handleBookingRequest } from '@/src/lib/booking';

export const runtime = 'edge';

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  return handleBookingRequest(request, {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO ?? process.env.BOOKING_NOTIFICATION_EMAIL,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  });
}
