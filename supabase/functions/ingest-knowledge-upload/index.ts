import OpenAI from 'npm:openai@4';
import { createClient } from 'npm:@supabase/supabase-js@2';

// ── Types ─────────────────────────────────────────────────────────────────────

type Action = 'ingest' | 'delete_file' | 'delete_product';

type DocType = 'wording' | 'limits' | 'underwriting';

interface RequestBody {
  action:       Action;
  product_slug: string;
  doc_type?:    DocType;
  filename?:    string;
  content?:     string;
}

// ── Config ────────────────────────────────────────────────────────────────────

const CHUNK_TOKENS   = 500;
const OVERLAP_TOKENS = 50;
const EMBED_MODEL    = 'text-embedding-3-small';
const EMBED_DIMS     = 1536;
const BATCH_SIZE     = 16;

const VALID_SLUGS: string[]    = ['domestic', 'commercial', 'agri', 'hospitality'];
const VALID_DOC_TYPES: string[] = ['wording', 'limits', 'underwriting'];

// ── Clients ───────────────────────────────────────────────────────────────────

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')!,
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// ── Chunking ──────────────────────────────────────────────────────────────────

function approximateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function chunkText(text: string): string[] {
  const words        = text.split(/\s+/).filter(Boolean);
  const chunkWords   = Math.floor(CHUNK_TOKENS   * 0.75);
  const overlapWords = Math.floor(OVERLAP_TOKENS * 0.75);
  const chunks: string[] = [];

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

async function embedBatch(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model:      EMBED_MODEL,
    input:      texts,
    dimensions: EMBED_DIMS,
  });
  return response.data
    .sort((a, b) => a.index - b.index)
    .map(d => d.embedding);
}

// ── CORS ──────────────────────────────────────────────────────────────────────

const corsHeaders = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type':                  'application/json',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders });
}

// ── Handlers ──────────────────────────────────────────────────────────────────

async function handleIngest(body: RequestBody): Promise<Response> {
  const { product_slug, doc_type, filename, content } = body;

  if (!doc_type || !VALID_DOC_TYPES.includes(doc_type)) {
    return jsonResponse({ error: 'Invalid or missing doc_type' }, 400);
  }
  if (!filename?.trim()) {
    return jsonResponse({ error: 'filename is required' }, 400);
  }
  if (!content?.trim()) {
    return jsonResponse({ error: 'content is required' }, 400);
  }

  // Delete existing chunks for this exact file
  const { error: deleteError } = await supabase
    .from('knowledge_chunks')
    .delete()
    .eq('product_slug', product_slug)
    .eq('source_file', filename);

  if (deleteError) {
    console.error('Delete error:', deleteError.message);
    return jsonResponse({ error: 'Failed to clear existing chunks' }, 500);
  }

  const chunks = chunkText(content);

  if (chunks.length === 0) {
    return jsonResponse({ error: 'No text content could be extracted' }, 400);
  }

  let chunkIndex = 0;
  let inserted   = 0;

  for (let b = 0; b < chunks.length; b += BATCH_SIZE) {
    const batch      = chunks.slice(b, b + BATCH_SIZE);
    const embeddings = await embedBatch(batch);

    const rows = batch.map((text, i) => ({
      product_slug,
      doc_type,
      content:     text,
      embedding:   embeddings[i],
      chunk_index: chunkIndex + i,
      source_file: filename,
      token_count: approximateTokens(text),
    }));

    const { error: insertError } = await supabase
      .from('knowledge_chunks')
      .insert(rows);

    if (insertError) {
      console.error('Insert error:', insertError.message);
      return jsonResponse({ error: 'Failed to insert chunks', detail: insertError.message }, 500);
    }

    chunkIndex += batch.length;
    inserted   += batch.length;
  }

  return jsonResponse({ success: true, chunks_inserted: inserted });
}

async function handleDeleteFile(body: RequestBody): Promise<Response> {
  const { product_slug, filename } = body;

  if (!filename?.trim()) {
    return jsonResponse({ error: 'filename is required' }, 400);
  }

  const { count, error } = await supabase
    .from('knowledge_chunks')
    .delete({ count: 'exact' })
    .eq('product_slug', product_slug)
    .eq('source_file', filename);

  if (error) {
    return jsonResponse({ error: error.message }, 500);
  }

  return jsonResponse({ success: true, deleted: count ?? 0 });
}

async function handleDeleteProduct(body: RequestBody): Promise<Response> {
  const { product_slug } = body;

  const { count, error } = await supabase
    .from('knowledge_chunks')
    .delete({ count: 'exact' })
    .eq('product_slug', product_slug);

  if (error) {
    return jsonResponse({ error: error.message }, 500);
  }

  return jsonResponse({ success: true, deleted: count ?? 0 });
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  // Validate caller via Supabase JWT
  const authHeader = req.headers.get('Authorization') ?? '';
  const token      = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    return jsonResponse({ error: 'Unauthorised — missing Bearer token' }, 401);
  }
  const { data: userData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !userData.user) {
    return jsonResponse({ error: 'Unauthorised — invalid or expired session' }, 401);
  }

  // Validate product slug
  if (!body.product_slug || !VALID_SLUGS.includes(body.product_slug)) {
    return jsonResponse({ error: 'Invalid or missing product_slug' }, 400);
  }

  try {
    switch (body.action) {
      case 'ingest':
        return await handleIngest(body);
      case 'delete_file':
        return await handleDeleteFile(body);
      case 'delete_product':
        return await handleDeleteProduct(body);
      default:
        return jsonResponse({ error: 'Invalid action' }, 400);
    }
  } catch (err) {
    console.error('Edge function error:', err);
    return jsonResponse({ error: 'Internal server error' }, 500);
  }
});
