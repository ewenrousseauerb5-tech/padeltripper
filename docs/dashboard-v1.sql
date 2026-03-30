-- Padel Tripper Dashboard v1 (semi-automatic workflow)
-- Safe to run multiple times where possible.

-- 1) Workflow status per booking / quotation
create table if not exists public.booking_workflows (
  quotation_id bigint primary key references public.quotations(id) on delete cascade,
  hotel_status text not null default 'not_sent',     -- not_sent | sent | confirmed | declined
  payment_status text not null default 'pending',    -- pending | partial | paid
  coach_status text not null default 'not_sent',     -- not_sent | sent | acknowledged
  updated_at timestamptz not null default now()
);

create index if not exists idx_booking_workflows_updated_at
  on public.booking_workflows(updated_at desc);

-- 2) Action log / history timeline
create table if not exists public.booking_status_history (
  id bigserial primary key,
  quotation_id bigint not null references public.quotations(id) on delete cascade,
  action_type text not null,
  notes text,
  created_by text,
  created_at timestamptz not null default now()
);

create index if not exists idx_booking_status_history_quotation
  on public.booking_status_history(quotation_id, created_at desc);

-- 3) Optional operational tables for explicit tracking
create table if not exists public.hotel_requests (
  id bigserial primary key,
  quotation_id bigint not null references public.quotations(id) on delete cascade,
  hotel_name text,
  status text not null default 'draft',              -- draft | sent | confirmed | declined
  sent_at timestamptz,
  confirmed_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_hotel_requests_quotation
  on public.hotel_requests(quotation_id, created_at desc);

create table if not exists public.coach_notifications (
  id bigserial primary key,
  quotation_id bigint not null references public.quotations(id) on delete cascade,
  channel text not null default 'email',             -- email | whatsapp
  status text not null default 'draft',              -- draft | sent | acknowledged
  sent_at timestamptz,
  acknowledged_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_coach_notifications_quotation
  on public.coach_notifications(quotation_id, created_at desc);

create table if not exists public.payment_logs (
  id bigserial primary key,
  quotation_id bigint not null references public.quotations(id) on delete cascade,
  amount numeric(10,2),
  currency text default 'GBP',
  status text not null default 'pending',            -- pending | paid | refunded
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_payment_logs_quotation
  on public.payment_logs(quotation_id, created_at desc);

-- 4) Partner leads table (for /partners form and dashboard list)
create table if not exists public.partner_enquiries (
  id bigserial primary key,
  reference text unique,
  full_name text not null,
  email text not null,
  phone text,
  role text not null,
  message text,
  status text not null default 'NEW',                -- NEW | CONTACTED | ACTIVE | CLOSED
  source text not null default 'website_partners_form',
  created_at timestamptz not null default now()
);

create index if not exists idx_partner_enquiries_created
  on public.partner_enquiries(created_at desc);

-- 5) Backfill workflow rows for existing quotations
insert into public.booking_workflows (quotation_id)
select q.id
from public.quotations q
left join public.booking_workflows bw on bw.quotation_id = q.id
where bw.quotation_id is null;
