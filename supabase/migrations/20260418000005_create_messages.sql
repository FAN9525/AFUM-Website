create table public.messages (
  id              uuid        primary key default gen_random_uuid(),
  conversation_id uuid        not null references public.conversations(id) on delete cascade,
  role            text        not null check (role in ('user', 'assistant')),
  content         text        not null,
  intent_tag      text        check (intent_tag in ('info', 'advice', 'competitor', 'claim', 'lead')),
  created_at      timestamptz default now()
);

comment on table public.messages is
  'Full message log for FAIS record-keeping. Retained per regulatory requirements.';

create index messages_conversation_id_idx on public.messages (conversation_id);
create index messages_created_at_idx      on public.messages (created_at);
