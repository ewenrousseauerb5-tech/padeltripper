import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

const SESSION_COOKIE = 'pt_dashboard_token';

interface LoginPayload {
  email?: string;
  password?: string;
}

function normalize(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      return Response.json({ ok: false, error: 'Missing Supabase auth configuration.' }, { status: 500 });
    }

    let body: LoginPayload;
    try {
      body = (await request.json()) as LoginPayload;
    } catch {
      return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
    }

    const email = normalize(body.email).toLowerCase();
    const password = normalize(body.password);
    if (!email || !password) {
      return Response.json({ ok: false, error: 'Email and password are required.' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, anonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session?.access_token) {
      return Response.json({ ok: false, error: 'Invalid credentials.' }, { status: 401 });
    }

    const maxAge = Math.max(60, (data.session.expires_in || 3600));
    const response = Response.json({ ok: true });
    response.headers.append(
      'Set-Cookie',
      `${SESSION_COOKIE}=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`,
    );
    return response;
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : 'Login failed.' },
      { status: 500 },
    );
  }
}
