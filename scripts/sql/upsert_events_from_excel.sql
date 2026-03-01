-- Upsert events extracted from:
-- /Users/ewenrousseau/Downloads/padel_tripper_data (1).xlsx (sheet: Events)
-- Run this in Supabase SQL Editor (production).

insert into public.events (
  id,
  name,
  base_price,
  current_participants,
  max_participants,
  status,
  location
)
values
  (80, 'Alicante Group Padel, 17.-20. March 2026', '£695', 2, 16, 'ACTIVE', 'Alicante, Spain'),
  (73, 'Alicante Group Padel 23rd-27th March 2026', '£895', 9, 16, 'ACTIVE', 'Alicante, Spain'),
  (68, 'Alicante Group Padel 31st March-3rd April 2026', '£795', 6, 16, 'ACTIVE', 'Alicante, Spain'),
  (69, 'Alicante Group Padel 14th-17th April 2026', '£795', 2, 16, 'ACTIVE', 'Alicante, Spain'),
  (62, 'Alicante Group Padel 5th-8th May 2026', '£895', 9, 16, 'ACTIVE', 'Alicante, Spain'),
  (88, 'Hosted Alicante Padel Experience: Ben Kettleborough 12th - 15th May ''26', '£795', 4, 16, 'ACTIVE', 'Alicante, Spain'),
  (70, 'Alicante Group Padel 26th-29th May 2026', '£795', 5, 16, 'ACTIVE', 'Alicante, Spain')
on conflict (id) do update
set
  name = excluded.name,
  base_price = excluded.base_price,
  current_participants = excluded.current_participants,
  max_participants = excluded.max_participants,
  status = excluded.status,
  location = excluded.location;

-- Keep sequence aligned when ids are manually inserted.
select setval(
  pg_get_serial_sequence('public.events', 'id'),
  (select coalesce(max(id), 1) from public.events),
  true
);
