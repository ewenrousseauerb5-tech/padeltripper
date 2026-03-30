import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'pt_dashboard_token';

async function isValidDashboardSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return false;

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: 'GET',
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isDashboardPage = pathname.startsWith('/dashboard');
  const isDashboardApi = pathname.startsWith('/api/dashboard');
  const isDashboardAuthApi = pathname.startsWith('/api/dashboard/auth/');

  if (!isDashboardPage && !isDashboardApi) return NextResponse.next();
  if (isDashboardAuthApi) return NextResponse.next();

  const isLoginPage = pathname === '/dashboard/login';
  const valid = await isValidDashboardSession(request);

  if (isLoginPage) {
    if (valid) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (valid) return NextResponse.next();

  if (isDashboardApi) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/dashboard/login';
  loginUrl.search = `?next=${encodeURIComponent(`${pathname}${search}`)}`;
  const response = NextResponse.redirect(loginUrl);
  response.cookies.set(SESSION_COOKIE, '', {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
  });
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/dashboard/:path*'],
};
