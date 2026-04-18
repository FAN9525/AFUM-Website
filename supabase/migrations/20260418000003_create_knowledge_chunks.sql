create table public.knowledge_chunks (
  id            uuid        primary key default gen_random_uuid(),
  product_slug  text        references public.products(slug) on delete cascade,
  content       text        not null,
  embedding     extensions.vector(1536), -- dimensions for text-embedding-3-small (OpenAI)
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
  using ivfflat (embedding extensions.vector_cosine_ops)
  with (lists = 100);

-- Index for fast product-scoped retrieval
create index knowledge_chunks_product_slug_idx
  on public.knowledge_chunks (product_slug);
