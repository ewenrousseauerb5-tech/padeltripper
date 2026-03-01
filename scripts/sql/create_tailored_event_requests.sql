-- Step 1: dedicated table for tailored event leads
create table if not exists public.tailored_event_requests (
  id bigserial primary key,
  full_name text not null,
  email text not null,
  phone text,
  event_type text not null,
  group_size text not null,
  preferred_dates text,
  destination text,
  budget_range text,
  message text,
  status text not null default 'SUBMITTED',
  source text not null default 'website_tailored_form',
  accepted_privacy_terms boolean not null default false,
  confirmed_group_authority boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Basic indexes for CRM-style filtering
create index if not exists tailored_event_requests_status_idx
  on public.tailored_event_requests (status);

create index if not exists tailored_event_requests_created_at_idx
  on public.tailored_event_requests (created_at desc);

-- Restrict direct public access. Backend inserts will use service role.
alter table public.tailored_event_requests enable row level security;

drop policy if exists "tailored_event_requests_no_select_anon" on public.tailored_event_requests;
create policy "tailored_event_requests_no_select_anon"
on public.tailored_event_requests
for select
to public
using (false);

drop policy if exists "tailored_event_requests_no_insert_anon" on public.tailored_event_requests;
create policy "tailored_event_requests_no_insert_anon"
on public.tailored_event_requests
for insert
to public
with check (false);
