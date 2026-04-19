-- Fix vector dimensions: switch from OpenAI text-embedding-3-small (1536)
-- to Voyage AI voyage-3 (1024 dimensions)
alter table public.knowledge_chunks
  alter column embedding type extensions.vector(1024);

-- Drop and recreate the IVFFlat index with correct dimensions
drop index if exists knowledge_chunks_embedding_idx;

create index knowledge_chunks_embedding_idx
  on public.knowledge_chunks
  using ivfflat (embedding extensions.vector_cosine_ops)
  with (lists = 100);
