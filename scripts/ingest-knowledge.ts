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

  await ingestFile(filePath, productSlug);
  console.log('\nIngestion complete.');
}

main().catch(console.error);
