create table public.leads (
  id              uuid        primary key default gen_random_uuid(),
  conversation_id uuid        references public.conversations(id) on delete set null,
  name            text,
  email           text,
  phone           text,
  product_interest text,
  notes           text,
  created_at      timestamptz default now()
);

comment on table public.leads is
  'Lead records created when EVE routes a visitor to a human partner.';

create index leads_created_at_idx on public.leads (created_at);
