import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

interface CookieConsentPayload {
  decision?: 'accepted' | 'necessary-only';
  policy_version?: string;
  client_id?: string;
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return Response.json({ ok: false, error: 'Missing Supabase configuration.' }, { status: 500 });
    }

    let body: CookieConsentPayload;
    try {
      body = (await request.json()) as CookieConsentPayload;
    } catch {
      return Response.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
    }

    if (body.decision !== 'accepted' && body.decision !== 'necessary-only') {
      return Response.json({ ok: false, error: 'Invalid decision value.' }, { status: 400 });
    }

    const policyVersion = typeof body.policy_version === 'string' && body.policy_version.trim()
      ? body.policy_version.trim()
      : '2026-03-01';
    const clientId = typeof body.client_id === 'string' && body.client_id.trim() ? body.client_id.trim() : null;
    const userAgent = request.headers.get('user-agent');
    const ipAddress = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for');

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase.from('cookie_consents').insert({
      decision: body.decision,
      policy_version: policyVersion,
      client_id: clientId,
      user_agent: userAgent,
      ip_address: ipAddress,
    });

    if (error) {
      throw new Error(`Cookie consent insert failed: ${error.message}`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Cookie consent API error:', error);
    return Response.json({ ok: false, error: 'Failed to store cookie consent.' }, { status: 500 });
  }
}
