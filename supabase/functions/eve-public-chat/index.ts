import Anthropic from 'npm:@anthropic-ai/sdk@0.27.0';
import OpenAI from 'npm:openai@4';
import { createClient } from 'npm:@supabase/supabase-js@2';

// ── Types ─────────────────────────────────────────────────────────────────────

interface RequestBody {
  session_id:      string;
  product_context: string;
  message:         string;
  history:         Array<{ role: 'user' | 'assistant'; content: string }>;
}

interface ResponseBody {
  reply:          string;
  intent_tag:     IntentTag;
  show_lead_form: boolean;
}

type IntentTag = 'info' | 'advice' | 'competitor' | 'claim' | 'lead';

// ── Clients ───────────────────────────────────────────────────────────────────

const anthropic = new Anthropic({
  apiKey: Deno.env.get('ANTHROPIC_API_KEY')!,
});

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')!,
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// ── Guardrail patterns ────────────────────────────────────────────────────────

const ADVICE_PATTERNS = [
  /should i (take out|get|buy|choose|switch|cancel)/i,
  /do i need/i,
  /is it worth/i,
  /recommend.*(for me|my situation|my property|my business)/i,
  /best (policy|cover|option|product) for me/i,
  /what (would|should) you (suggest|recommend)/i,
];

const CLAIM_PATTERNS = [
  /my claim/i,
  /claim (number|status|update|payout|settlement|reference)/i,
  /when (will|is) my (claim|payout)/i,
  /assessor/i,
  /loss adjuster/i,
];

function detectGuardrailTrigger(
  message: string,
): { triggered: true; type: 'advice' | 'competitor' | 'claim' } | { triggered: false } {
  if (ADVICE_PATTERNS.some(p => p.test(message))) return { triggered: true, type: 'advice' };
  if (CLAIM_PATTERNS.some(p => p.test(message)))  return { triggered: true, type: 'claim' };
  return { triggered: false };
}

// ── Intent classifier ─────────────────────────────────────────────────────────

async function classifyIntent(message: string): Promise<IntentTag> {
  const response = await anthropic.messages.create({
    model:      'claude-haiku-4-5',
    max_tokens: 10,
    system: `Classify the user message into exactly one of these tags:
- info: general question about an insurance product, coverage, or company
- advice: request for personal financial advice or product recommendation
- competitor: mentions a named competitor insurer or underwriter
- claim: question about an active or specific claim
- lead: ready to speak to a broker or get a quote

Reply with the single tag only. No explanation.`,
    messages: [{ role: 'user', content: message }],
  });

  const tag = (response.content[0] as { text: string }).text.trim().toLowerCase();
  const valid: IntentTag[] = ['info', 'advice', 'competitor', 'claim', 'lead'];
  return valid.includes(tag as IntentTag) ? (tag as IntentTag) : 'info';
}

// ── RAG retrieval ─────────────────────────────────────────────────────────────

async function embedQuery(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model:      'text-embedding-3-small',
    input:      text,
    dimensions: 1536,
  });
  return response.data[0].embedding;
}

async function retrieveChunks(
  query: string,
  productSlug: string | null,
  topK = 5,
): Promise<string[]> {
  const embedding = await embedQuery(query);

  const { data, error } = await supabase.rpc('match_knowledge_chunks', {
    query_embedding: embedding,
    filter_slug:     productSlug,
    match_count:     topK,
  });

  if (error) {
    console.error('RAG retrieval error:', error.message);
    return [];
  }

  return (data as Array<{ content: string }>).map(r => r.content);
}

// ── Guardrail responses ───────────────────────────────────────────────────────

const GUARDRAIL_RESPONSES: Record<'advice' | 'competitor' | 'claim', string> = {
  advice:
    "That would constitute personal financial advice, which I'm not in a position to provide. " +
    "I'd recommend speaking directly with one of our accredited broker partners — they can " +
    "assess your specific situation and recommend appropriate cover. Would you like me to " +
    "connect you with a partner?",
  competitor:
    "I'm not able to comment on other insurers. What I can tell you is how our products are " +
    "structured and what sets our underwriting approach apart. Would that be helpful?",
  claim:
    "For queries about a specific claim, please contact our claims department directly or " +
    "speak to your broker — they'll have access to your claim details and can give you an " +
    "accurate update. Is there anything else about our products I can help with?",
};

// ── System prompt ─────────────────────────────────────────────────────────────

function buildSystemPrompt(productContext: string): string {
  return `You are EVE, the digital assistant for Admin Focus Underwriting Managers (AFUM), FSP 50086, underwritten by Guardrisk Insurance Company Limited.

Your role is to help brokers and prospective clients understand AFUM's insurance products: Domestic, Commercial, Agri, and Hospitality insurance.

Tone: Professional, precise, and warm. Treat the person as a knowledgeable professional. Never condescending. Never use phrases like "in plain English" or "simply put" — assume competence.

You may:
- Explain product features, coverage scope, and how AFUM's offerings are structured
- Describe what is and is not typically covered
- Compare AFUM's own products to each other
- Explain the claims process at a high level
- Route warm leads to a human partner when the person is ready to get a quote

You may NOT:
- Provide personal financial advice or recommend a specific product for a specific person's situation
- Name or compare any competitor insurer or underwriting manager
- Assist with an active claim or claims outcome

Be concise. Prefer two clear paragraphs over a bullet-point wall. End with a natural next step or open question where appropriate.

Current product context: ${productContext || 'General enquiry'}`;
}

// ── Logging ───────────────────────────────────────────────────────────────────

async function ensureConversation(
  sessionId: string,
  productContext: string,
): Promise<string> {
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('session_id', sessionId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('conversations')
      .update({ last_active_at: new Date().toISOString() })
      .eq('id', existing.id);
    return existing.id;
  }

  const { data: created, error } = await supabase
    .from('conversations')
    .insert({ session_id: sessionId, product_context: productContext })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to create conversation: ${error.message}`);
  return created.id;
}

async function logMessages(
  conversationId: string,
  userMessage: string,
  assistantReply: string,
  intentTag: IntentTag,
): Promise<string> {
  const { data: userMsg, error: userErr } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role:            'user',
      content:         userMessage,
      intent_tag:      intentTag,
    })
    .select('id')
    .single();

  if (userErr) console.error('Failed to log user message:', userErr.message);

  await supabase.from('messages').insert({
    conversation_id: conversationId,
    role:            'assistant',
    content:         assistantReply,
    intent_tag:      intentTag,
  });

  return userMsg?.id ?? '';
}

async function logGuardrailTrigger(
  conversationId: string,
  messageId: string,
  triggerType: 'advice' | 'competitor' | 'claim',
  originalInput: string,
): Promise<void> {
  await supabase.from('guardrail_triggers').insert({
    conversation_id: conversationId,
    message_id:      messageId,
    trigger_type:    triggerType,
    original_input:  originalInput,
  });
}

// ── Product slug helper ───────────────────────────────────────────────────────

function slugFromContext(productContext: string): string | null {
  const map: Record<string, string> = {
    'Domestic Insurance':    'domestic',
    'Commercial Insurance':  'commercial',
    'Agri Insurance':        'agri',
    'Hospitality Insurance': 'hospitality',
  };
  return map[productContext] ?? null;
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { session_id, product_context, message, history } = body;

  if (!session_id || !message) {
    return new Response(
      JSON.stringify({ error: 'session_id and message are required' }),
      { status: 400 },
    );
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type':                'application/json',
  };

  try {
    // 1. Classify intent
    const intentTag = await classifyIntent(message);

    // 2. Regex guardrail check (fast, before any LLM call)
    const guardrailCheck = detectGuardrailTrigger(message);
    const finalTag: IntentTag = guardrailCheck.triggered ? guardrailCheck.type : intentTag;

    // 3. Ensure conversation record exists
    const conversationId = await ensureConversation(session_id, product_context);

    // 4. Guardrail response path
    if (guardrailCheck.triggered || finalTag === 'advice' || finalTag === 'claim') {
      const reply        = GUARDRAIL_RESPONSES[finalTag as 'advice' | 'competitor' | 'claim'];
      const showLeadForm = finalTag === 'advice' || finalTag === 'lead';
      const messageId    = await logMessages(conversationId, message, reply, finalTag);

      if (guardrailCheck.triggered) {
        await logGuardrailTrigger(conversationId, messageId, guardrailCheck.type, message);
      }

      const response: ResponseBody = { reply, intent_tag: finalTag, show_lead_form: showLeadForm };
      return new Response(JSON.stringify(response), { headers: corsHeaders });
    }

    // 5. RAG retrieval for info / lead intents
    const productSlug = slugFromContext(product_context);
    const chunks      = await retrieveChunks(message, productSlug);
    const context     = chunks.length > 0
      ? `Relevant product information:\n\n${chunks.join('\n\n---\n\n')}`
      : '';

    // 6. Build messages array for Claude
    const systemPrompt = buildSystemPrompt(product_context);
    const claudeMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [
      ...history.slice(-6),
      {
        role:    'user',
        content: context ? `${context}\n\nUser question: ${message}` : message,
      },
    ];

    // 7. Call Claude — Haiku for most queries, Sonnet for long/complex messages
    const isComplex = message.length > 200 || (message.match(/\?/g) ?? []).length > 1;
    const model     = isComplex ? 'claude-sonnet-4-6' : 'claude-haiku-4-5';

    const claudeResponse = await anthropic.messages.create({
      model,
      max_tokens: 600,
      system:     systemPrompt,
      messages:   claudeMessages,
    });

    const reply = (claudeResponse.content[0] as { text: string }).text.trim();

    // 8. Log messages
    await logMessages(conversationId, message, reply, finalTag);

    // 9. Return response
    const response: ResponseBody = {
      reply,
      intent_tag:     finalTag,
      show_lead_form: finalTag === 'lead',
    };

    return new Response(JSON.stringify(response), { headers: corsHeaders });

  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders },
    );
  }
});
