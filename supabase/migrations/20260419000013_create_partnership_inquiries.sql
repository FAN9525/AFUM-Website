-- Partnership inquiries submitted via the public contact form
create table if not exists partnership_inquiries (
  id             uuid        primary key default gen_random_uuid(),
  created_at     timestamptz not null    default now(),
  full_name      text        not null,
  brokerage_name text        not null,
  email          text        not null,
  phone          text        not null,
  message        text,
  status         text        not null    default 'pending'
                             check (status in ('pending', 'reviewed', 'approved', 'declined')),
  outcome_notes  text,
  reviewed_by    text,
  reviewed_at    timestamptz
);

-- Indices
create index if not exists partnership_inquiries_status_idx     on partnership_inquiries (status);
create index if not exists partnership_inquiries_created_at_idx on partnership_inquiries (created_at desc);

-- Row-Level Security
alter table partnership_inquiries enable row level security;

-- Anyone (including anon) may insert a new inquiry from the public form
create policy "Public can insert inquiries"
  on partnership_inquiries
  for insert
  with check (true);

-- Only authenticated users (admins) may read inquiries
create policy "Admins can read inquiries"
  on partnership_inquiries
  for select
  using (auth.role() = 'authenticated');

-- Only authenticated users (admins) may update inquiries (status, notes, etc.)
create policy "Admins can update inquiries"
  on partnership_inquiries
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
