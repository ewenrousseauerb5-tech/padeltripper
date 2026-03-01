-- Create table for server-side cookie consent logging
create table if not exists public.cookie_consents (
  id bigserial primary key,
  decision text not null check (decision in ('accepted', 'necessary-only')),
  policy_version text not null default '2026-03-01',
  client_id text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists cookie_consents_created_at_idx
  on public.cookie_consents (created_at);

-- Restrict direct access from anon/authenticated clients.
alter table public.cookie_consents enable row level security;

drop policy if exists "cookie_consents_no_select_anon" on public.cookie_consents;
create policy "cookie_consents_no_select_anon"
on public.cookie_consents
for select
to public
using (false);

drop policy if exists "cookie_consents_no_insert_anon" on public.cookie_consents;
create policy "cookie_consents_no_insert_anon"
on public.cookie_consents
for insert
to public
with check (false);

-- Note:
-- Inserts from the website backend use SUPABASE_SERVICE_ROLE_KEY and bypass RLS.

-- Retention (24 months): run monthly
-- delete from public.cookie_consents
-- where created_at < now() - interval '24 months';
