import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// ── Config ────────────────────────────────────────────────────────────────────

const CHUNK_TOKENS   = 500;   // target tokens per chunk
const OVERLAP_TOKENS = 50;    // overlap between chunks
const EMBED_MODEL    = 'voyage-3';
const EMBED_DIMS     = 1024;
const BATCH_SIZE     = 8;     // Voyage allows up to 128; keep small for safety

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ── Chunking ──────────────────────────────────────────────────────────────────

function approximateTokens(text: string): number {
  return Math.ceil(text.length / 4); // ~1 token per 4 chars for English prose
}

function chunkText(text: string, chunkTokens: number, overlapTokens: number): string[] {
  const words        = text.split(/\s+/);
  const chunkWords   = Math.floor(chunkTokens   * 0.75);
  const overlapWords = Math.floor(overlapTokens  * 0.75);
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

// ── Embedding (Voyage AI REST API) ────────────────────────────────────────────

async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model:      EMBED_MODEL,
      input:      texts,
      input_type: 'document',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Voyage AI error ${res.status}: ${err}`);
  }

  const json = await res.json() as { data: { index: number; embedding: number[] }[] };
  // Sort by index to guarantee order matches input
  return json.data.sort((a, b) => a.index - b.index).map(d => d.embedding);
}

// ── Ingest ────────────────────────────────────────────────────────────────────

async function ingestFile(filePath: string, productSlug: string): Promise<void> {
  console.log(`\nIngesting: ${filePath} → product: ${productSlug}`);
  console.log(`Embedding model: ${EMBED_MODEL} (${EMBED_DIMS} dims)`);

  const raw    = fs.readFileSync(filePath, 'utf-8');
  const chunks = chunkText(raw, CHUNK_TOKENS, OVERLAP_TOKENS);

  console.log(`  Chunks: ${chunks.length}`);

  const { error: deleteError } = await supabase
    .from('knowledge_chunks')
    .delete()
    .eq('product_slug', productSlug)
    .eq('source_file', path.basename(filePath));

  if (deleteError) {
    console.error('  Delete error:', deleteError.message);
    process.exit(1);
  }

  let chunkIndex = 0;

  for (let b = 0; b < chunks.length; b += BATCH_SIZE) {
    const batch = chunks.slice(b, b + BATCH_SIZE);
    const from  = b + 1;
    const to    = Math.min(b + BATCH_SIZE, chunks.length);
    process.stdout.write(`  Embedding chunks ${from}–${to}/${chunks.length}...`);

    const embeddings = await embedBatch(batch);

    for (let i = 0; i < batch.length; i++) {
      const { error: insertError } = await supabase
        .from('knowledge_chunks')
        .insert({
          product_slug: productSlug,
          content:      batch[i],
          embedding:    embeddings[i],
          chunk_index:  chunkIndex++,
          source_file:  path.basename(filePath),
          token_count:  approximateTokens(batch[i]),
        });

      if (insertError) {
        console.error('\n  Insert error:', insertError.message);
        process.exit(1);
      }
    }

    console.log(' ✓');
  }

  console.log(`  Done. ${chunks.length} chunks ingested.`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: tsx ingest-knowledge.ts <path-to-file.md> <product-slug>');
    console.error('Example: tsx ingest-knowledge.ts ../knowledge/domestic.md domestic');
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

  const missing = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'VOYAGE_API_KEY']
    .filter(k => !process.env[k]);
  if (missing.length) {
    console.error(`Missing env vars: ${missing.join(', ')}`);
    console.error('Copy scripts/.env.example → scripts/.env and fill in values.');
    process.exit(1);
  }

  await ingestFile(filePath, productSlug);
  console.log('\nIngestion complete.');
}

main().catch(console.error);
