create or replace function match_knowledge_chunks(
  query_embedding extensions.vector(1536),
  filter_slug     text,
  match_count     int default 5
)
returns table (
  id           uuid,
  product_slug text,
  content      text,
  similarity   float
)
language sql stable
set search_path = public, extensions
as $$
  select
    kc.id,
    kc.product_slug,
    kc.content,
    1 - (kc.embedding <=> query_embedding) as similarity
  from public.knowledge_chunks kc
  where
    (filter_slug is null or kc.product_slug = filter_slug)
  order by kc.embedding <=> query_embedding
  limit match_count;
$$;
