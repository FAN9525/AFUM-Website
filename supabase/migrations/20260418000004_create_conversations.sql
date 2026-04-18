create table public.conversations (
  id              uuid        primary key default gen_random_uuid(),
  session_id      text        not null unique,   -- client-generated UUID
  product_context text,                          -- product slug or title at session start
  started_at      timestamptz default now(),
  last_active_at  timestamptz default now()
);

comment on table public.conversations is
  'Anonymous chat sessions. session_id is generated client-side and never linked to PII.';

create index conversations_session_id_idx on public.conversations (session_id);
