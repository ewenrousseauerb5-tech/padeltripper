-- Add phone capture for booking/quotation leads.
-- Run this in the Supabase SQL editor before deploying the required frontend field.

alter table public.quotations
  add column if not exists phone text;

create index if not exists idx_quotations_phone
  on public.quotations (phone);

-- Enforce phone on new website leads while allowing old rows to stay as they are.
alter table public.quotations
  drop constraint if exists quotations_phone_required_for_new_rows;

alter table public.quotations
  add constraint quotations_phone_required_for_new_rows
  check (
    created_at < timestamptz '2026-05-26 00:00:00+00'
    or nullif(btrim(phone), '') is not null
  )
  not valid;

alter table public.tailored_event_requests
  add column if not exists phone text;

alter table public.tailored_event_requests
  drop constraint if exists tailored_event_requests_phone_required_for_new_rows;

alter table public.tailored_event_requests
  add constraint tailored_event_requests_phone_required_for_new_rows
  check (
    created_at < timestamptz '2026-05-26 00:00:00+00'
    or nullif(btrim(phone), '') is not null
  )
  not valid;
