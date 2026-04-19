-- Enable Row Level Security on all tables
alter table public.products           enable row level security;
alter table public.knowledge_chunks   enable row level security;
alter table public.conversations      enable row level security;
alter table public.messages           enable row level security;
alter table public.leads              enable row level security;
alter table public.guardrail_triggers enable row level security;

-- products: public read (the website needs to read product metadata)
create policy "Public can read products"
  on public.products for select
  using (true);

-- knowledge_chunks: public read (the edge function uses anon key for RAG)
create policy "Public can read knowledge chunks"
  on public.knowledge_chunks for select
  using (true);

-- All write operations go through the service role (edge function).
-- No direct client writes permitted on sensitive tables.

-- conversations: anon insert + select own session
create policy "Anon can insert conversations"
  on public.conversations for insert
  with check (true);

create policy "Anon can read own conversation"
  on public.conversations for select
  using (true);   -- session_id scoping enforced in app logic, not RLS for now

-- messages: anon insert (edge function writes via anon key in Phase 1)
create policy "Anon can insert messages"
  on public.messages for insert
  with check (true);

-- leads: anon insert
create policy "Anon can insert leads"
  on public.leads for insert
  with check (true);

-- guardrail_triggers: service role only (no anon policy = blocked)
-- Edge function will use service role key for guardrail logging.
