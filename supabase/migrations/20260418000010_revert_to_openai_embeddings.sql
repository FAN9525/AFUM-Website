-- Revert: switch back from Voyage AI (1024) to OpenAI text-embedding-3-small (1536)
alter table public.knowledge_chunks
  alter column embedding type extensions.vector(1536);

-- Rebuild IVFFlat index with correct dimensions
drop index if exists knowledge_chunks_embedding_idx;

create index knowledge_chunks_embedding_idx
  on public.knowledge_chunks
  using ivfflat (embedding extensions.vector_cosine_ops)
  with (lists = 100);
