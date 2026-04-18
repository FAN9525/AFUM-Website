create table public.guardrail_triggers (
  id              uuid        primary key default gen_random_uuid(),
  conversation_id uuid        references public.conversations(id) on delete cascade,
  message_id      uuid        references public.messages(id) on delete cascade,
  trigger_type    text        not null check (trigger_type in ('advice', 'competitor', 'claim')),
  original_input  text        not null,
  created_at      timestamptz default now()
);

comment on table public.guardrail_triggers is
  'Log of guardrail firings. Used to tune the intent classifier and refusal prompts.';

create index guardrail_triggers_trigger_type_idx on public.guardrail_triggers (trigger_type);
create index guardrail_triggers_created_at_idx   on public.guardrail_triggers (created_at);
