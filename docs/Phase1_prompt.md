# EVE Public Chatbot — Phase 1 Cursor Prompt
## Supabase Project · Schema · pgvector · Pilot Ingestion

---

## Context

You are working on the `FAN9525/AFUM-Website` repo — a Vite 7 + React 19 + TypeScript
SPA for Admin Focus Underwriting Managers (AFUM), FSP 50086.

Phase 1 is infrastructure only. No React code. No edge functions yet.
The deliverables for this phase are:

1. A new dedicated Supabase project for the public EVE chatbot
2. SQL migration files that define the full schema
3. pgvector enabled
4. A TypeScript ingestion script that chunks and embeds one product `.md` file
   (Domestic Insurance) as a pilot run

Do not touch the existing Shorekeeper Supabase projects
(`wjvmqpgwxmbsuyewuhkt` / `jgzmjpnbczmpoyjstwoc`). This is an entirely
separate project.

---

## Step 1 — Supabase Project

Create a new Supabase project. Suggested name: `admin-focus-website`.
Region: `af-south-1` (Cape Town) — AFUM is a South African business and FAIS
record-keeping requirements favour data residency.

Once created, collect:
- Project URL → `VITE_SUPABASE_URL`
- Anon/public key → `VITE_SUPABASE_ANON_KEY`
- Service role key → `SUPABASE_SERVICE_ROLE_KEY` (ingestion script only, never
  exposed to the browser)

---

## Step 2 — SQL Migrations

Create the following files under `supabase/migrations/`. Use timestamped
filenames so Supabase CLI applies them in order.

### `supabase/migrations/20260418000001_enable_pgvector.sql`

```sql
-- Enable pgvector extension for semantic search
create extension if not exists vector
  with schema extensions;
```

---

### `supabase/migrations/20260418000002_create_products.sql`

```sql
create table public.products (
  id          uuid        primary key default gen_random_uuid(),
  slug        text        unique not null,
  title       text        not null,
  short_title text        not null,
  description text,
  features    text[]      default '{}',
  created_at  timestamptz default now()
);

comment on table public.products is
  'Structured product metadata for the four AFUM insurance lines.';

-- Seed the four products
insert into public.products (slug, title, short_title, description, features)
values
  (
    'domestic',
    'Domestic Insurance',
    'Personal Focus',
    'Comprehensive home and contents coverage, expertly underwritten for clients who value protection over price.',
    array['All-risk cover', 'Theft protection', 'Liability cover', 'Building insurance']
  ),
  (
    'commercial',
    'Commercial Insurance',
    'Commercial Focus',
    'Business packages designed for stability, protecting commercial assets with precision and expertise.',
    array['Property cover', 'Business interruption', 'Liability protection', 'Asset coverage']
  ),
  (
    'agri',
    'Agri Insurance',
    'Agri Focus',
    'Specialized farm coverage combining residential and commercial protection for agricultural operations.',
    array['Farm buildings', 'Equipment cover', 'Livestock options', 'Crop insurance']
  ),
  (
    'hospitality',
    'Hospitality Insurance',
    'Hospitality Focus',
    'Tailored solutions for guesthouses, hotels, and tourism businesses that demand excellence.',
    array['Guest liability', 'Property cover', 'Business interruption', 'Contents insurance']
  );
```

---

### `supabase/migrations/20260418000003_create_knowledge_chunks.sql`

```sql
create table public.knowledge_chunks (
  id            uuid        primary key default gen_random_uuid(),
  product_slug  text        references public.products(slug) on delete cascade,
  content       text        not null,
  embedding     vector(1536),          -- dimensions for text-embedding-3-small
  chunk_index   int         not null,
  source_file   text        not null,
  token_count   int,
  created_at    timestamptz default now()
);

comment on table public.knowledge_chunks is
  'Chunked product knowledge base with pgvector embeddings for RAG retrieval.';

-- IVFFlat index for cosine similarity search
-- lists = sqrt(expected row count); start with 100 and tune after ingestion
create index knowledge_chunks_embedding_idx
  on public.knowledge_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Index for fast product-scoped retrieval
create index knowledge_chunks_product_slug_idx
  on public.knowledge_chunks (product_slug);
```

---

### `supabase/migrations/20260418000004_create_conversations.sql`

```sql
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
```

---

### `supabase/migrations/20260418000005_create_messages.sql`

```sql
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
```

---

### `supabase/migrations/20260418000006_create_leads.sql`

```sql
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
```

---

### `supabase/migrations/20260418000007_create_guardrail_triggers.sql`

```sql
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
```

---

### `supabase/migrations/20260418000008_rls_policies.sql`

```sql
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
```

---

## Step 3 — Environment Files

### `app/.env.local` (browser — never commit)

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
```

### `scripts/.env` (ingestion script — never commit)

```env
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
OPENAI_API_KEY=<openai-api-key>
```

Add both files to `.gitignore` if not already covered.

---

## Step 4 — Pilot Ingestion Script

Create `scripts/ingest-knowledge.ts`.

This script reads a product `.md` file, splits it into overlapping chunks,
generates embeddings, and upserts them into `knowledge_chunks`.

### Dependencies (add to root or scripts package.json)

```bash
npm install -D tsx dotenv @supabase/supabase-js openai tiktoken
```

### `scripts/ingest-knowledge.ts`

```typescript
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

// ── Config ────────────────────────────────────────────────────────────────────

const CHUNK_TOKENS   = 500;   // target tokens per chunk
const OVERLAP_TOKENS = 50;    // overlap between chunks
const EMBED_MODEL    = 'text-embedding-3-small';
const EMBED_DIMS     = 1536;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Chunking (simple word-boundary split, token-count approximated) ───────────

function approximateTokens(text: string): number {
  // rough: 1 token ≈ 4 chars for English prose
  return Math.ceil(text.length / 4);
}

function chunkText(text: string, chunkTokens: number, overlapTokens: number): string[] {
  const words  = text.split(/\s+/);
  const chunks: string[] = [];

  // convert token targets to approximate word counts
  const chunkWords   = Math.floor(chunkTokens   * 0.75);
  const overlapWords = Math.floor(overlapTokens  * 0.75);

  let start = 0;
  while (start < words.length) {
    const end   = Math.min(start + chunkWords, words.length);
    const chunk = words.slice(start, end).join(' ').trim();
    if (chunk) chunks.push(chunk);
    if (end >= words.length) break;
    start = end - overlapWords;
  }

  return chunks;
}

// ── Embedding ─────────────────────────────────────────────────────────────────

async function embed(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model:      EMBED_MODEL,
    input:      text,
    dimensions: EMBED_DIMS,
  });
  return response.data[0].embedding;
}

// ── Ingest ────────────────────────────────────────────────────────────────────

async function ingestFile(filePath: string, productSlug: string): Promise<void> {
  console.log(`\nIngesting: ${filePath} → product: ${productSlug}`);

  const raw    = fs.readFileSync(filePath, 'utf-8');
  const chunks = chunkText(raw, CHUNK_TOKENS, OVERLAP_TOKENS);

  console.log(`  Chunks: ${chunks.length}`);

  // Delete existing chunks for this product + file before reinserting
  const { error: deleteError } = await supabase
    .from('knowledge_chunks')
    .delete()
    .eq('product_slug', productSlug)
    .eq('source_file', path.basename(filePath));

  if (deleteError) {
    console.error('  Delete error:', deleteError.message);
    process.exit(1);
  }

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    process.stdout.write(`  Embedding chunk ${i + 1}/${chunks.length}...`);

    const embedding = await embed(chunk);

    const { error: insertError } = await supabase
      .from('knowledge_chunks')
      .insert({
        product_slug: productSlug,
        content:      chunk,
        embedding,
        chunk_index:  i,
        source_file:  path.basename(filePath),
        token_count:  approximateTokens(chunk),
      });

    if (insertError) {
      console.error('\n  Insert error:', insertError.message);
      process.exit(1);
    }

    console.log(' ✓');
  }

  console.log(`  Done. ${chunks.length} chunks ingested.`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: tsx scripts/ingest-knowledge.ts <path-to-file.md> <product-slug>');
    console.error('Example: tsx scripts/ingest-knowledge.ts knowledge/domestic.md domestic');
    process.exit(1);
  }

  const [filePath, productSlug] = args;

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const validSlugs = ['domestic', 'commercial', 'agri', 'hospitality'];
  if (!validSlugs.includes(productSlug)) {
    console.error(`Invalid slug. Must be one of: ${validSlugs.join(', ')}`);
    process.exit(1);
  }

  await ingestFile(filePath, productSlug);
  console.log('\nIngestion complete.');
}

main().catch(console.error);
```

### Run the pilot ingestion

Once the Domestic Insurance `.md` file is available at `knowledge/domestic.md`
(or wherever it lives), run:

```bash
cd scripts
tsx ingest-knowledge.ts ../knowledge/domestic.md domestic
```

Verify in Supabase Table Editor that `knowledge_chunks` has rows with
non-null `embedding` values and `product_slug = 'domestic'`.

---

## Step 5 — Verify Schema

After applying all migrations and running the pilot ingestion, confirm:

```sql
-- All tables present
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;

-- pgvector installed
select * from pg_extension where extname = 'vector';

-- Products seeded
select slug, title from public.products;

-- Domestic chunks ingested
select count(*), avg(token_count)
from public.knowledge_chunks
where product_slug = 'domestic';

-- Embedding dimension correct
select chunk_index, token_count, left(content, 80) as preview
from public.knowledge_chunks
where product_slug = 'domestic'
order by chunk_index
limit 5;
```

---

## Phase 1 Completion Checklist

- [ ] Supabase project `admin-focus-website` created in `af-south-1`
- [ ] pgvector extension enabled
- [ ] All 7 migration files applied without error
- [ ] 4 products seeded in `products` table
- [ ] RLS enabled on all tables with appropriate policies
- [ ] `app/.env.local` created with URL + anon key (not committed)
- [ ] `scripts/.env` created with service role key + OpenAI key (not committed)
- [ ] Ingestion script runs without error
- [ ] Domestic Insurance chunks present in `knowledge_chunks` with valid embeddings
- [ ] Verification queries return expected results

---

## What is NOT in Phase 1

- No edge function code yet (Phase 2)
- No React components yet (Phase 4)
- No changes to any existing website files
- No Shorekeeper data or projects touched

---

*Phase 2 covers the `eve-public-chat` Supabase Edge Function:
intent classifier, RAG retrieval, Anthropic API call, guardrails, and logging.*