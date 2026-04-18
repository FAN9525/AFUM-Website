-- Add document type classification to knowledge chunks
alter table public.knowledge_chunks
  add column doc_type text not null default 'wording'
    check (doc_type in ('wording', 'limits', 'underwriting'));

create index knowledge_chunks_doc_type_idx
  on public.knowledge_chunks (product_slug, doc_type);

-- RPC to summarise uploaded documents for the admin panel
create or replace function public.list_knowledge_documents(p_product_slug text)
returns table (
  source_file    text,
  doc_type       text,
  chunk_count    bigint,
  latest_upload  timestamptz
)
language sql stable security definer
set search_path = public, extensions
as $$
  select
    source_file,
    doc_type,
    count(*)       as chunk_count,
    max(created_at) as latest_upload
  from public.knowledge_chunks
  where product_slug = p_product_slug
  group by source_file, doc_type
  order by latest_upload desc;
$$;
