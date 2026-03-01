import { corsHeaders, type BookingEnv, handleBookingRequest } from '../../src/lib/booking';

interface Env extends BookingEnv {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY: string;
  CONTACT_EMAIL_TO: string;
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  return handleBookingRequest(context.request, context.env);
}
