export const runtime = 'edge';

const SESSION_COOKIE = 'pt_dashboard_token';

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
  );
  return response;
}
