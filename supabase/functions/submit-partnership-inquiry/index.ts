import { createClient } from 'npm:@supabase/supabase-js@2';

// ── Types ─────────────────────────────────────────────────────────────────────

interface InquiryBody {
  full_name:      string;
  brokerage_name: string;
  email:          string;
  phone:          string;
  message?:       string;
}

// ── Clients ───────────────────────────────────────────────────────────────────

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!;
const MAILGUN_DOMAIN  = 'md.adminfocus.co.za';
const MAILGUN_API_URL = `https://api.eu.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

// ── CORS headers ──────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
};

// ── Email template ────────────────────────────────────────────────────────────

function buildEmailHtml(data: InquiryBody): string {
  const messageSection = data.message
    ? `<tr>
         <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
           <span style="color:#6b7280;font-size:13px;">Message</span>
           <p style="margin:4px 0 0;color:#111827;font-size:14px;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
         </td>
       </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f9fafb;margin:0;padding:40px 16px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr>
      <td style="background:#ffffff;border-radius:12px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,.1);">

        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td>
              <div style="width:40px;height:40px;background:#8B1E1E;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:12px;"></div>
              <span style="font-size:16px;font-weight:600;color:#1a1a2e;vertical-align:middle;">Admin Focus</span>
            </td>
          </tr>
        </table>

        <h1 style="font-size:20px;font-weight:700;color:#1a1a2e;margin:0 0 4px;">New Partnership Inquiry</h1>
        <p style="font-size:13px;color:#6b7280;margin:0 0 24px;">Submitted via the Admin Focus website</p>

        <!-- Details table -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
              <span style="color:#6b7280;font-size:13px;">Full Name</span>
              <p style="margin:2px 0 0;color:#111827;font-size:14px;font-weight:500;">${escapeHtml(data.full_name)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
              <span style="color:#6b7280;font-size:13px;">Brokerage</span>
              <p style="margin:2px 0 0;color:#111827;font-size:14px;font-weight:500;">${escapeHtml(data.brokerage_name)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
              <span style="color:#6b7280;font-size:13px;">Email</span>
              <p style="margin:2px 0 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#8B1E1E;font-size:14px;">${escapeHtml(data.email)}</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
              <span style="color:#6b7280;font-size:13px;">Phone</span>
              <p style="margin:2px 0 0;"><a href="tel:${escapeHtml(data.phone)}" style="color:#8B1E1E;font-size:14px;">${escapeHtml(data.phone)}</a></p>
            </td>
          </tr>
          ${messageSection}
        </table>

        <!-- CTA -->
        <div style="margin-top:28px;padding:16px;background:#f3f4f6;border-radius:8px;">
          <p style="margin:0;font-size:13px;color:#374151;">
            Review and manage this inquiry in the
            <a href="https://adminfocus.co.za/admin" style="color:#8B1E1E;font-weight:500;">Admin Portal</a>.
          </p>
        </div>

        <!-- Footer -->
        <p style="margin-top:24px;font-size:11px;color:#9ca3af;text-align:center;">
          Admin Focus Underwriting Managers · FSP 50086 · Parys, 9585
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status:  405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  let body: InquiryBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status:  400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const { full_name, brokerage_name, email, phone, message } = body;

  if (!full_name?.trim() || !brokerage_name?.trim() || !email?.trim() || !phone?.trim()) {
    return new Response(
      JSON.stringify({ error: 'full_name, brokerage_name, email, and phone are required' }),
      { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } },
    );
  }

  try {
    // 1. Persist the inquiry
    const { error: dbError } = await supabase
      .from('partnership_inquiries')
      .insert({ full_name, brokerage_name, email, phone, message: message ?? null });

    if (dbError) {
      console.error('DB insert error:', dbError.message);
      return new Response(JSON.stringify({ error: 'Failed to save inquiry' }), {
        status:  500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    // 2. Send notification email via Mailgun
    const formData = new FormData();
    formData.append('from',    'Admin Focus <noreply@md.adminfocus.co.za>');
    formData.append('to',      'rika@adminfocus.co.za');
    formData.append('cc',      'fanie@adminfocus.co.za');
    formData.append('subject', `Partnership Inquiry — ${brokerage_name}`);
    formData.append('html',    buildEmailHtml({ full_name, brokerage_name, email, phone, message }));

    const mgRes = await fetch(MAILGUN_API_URL, {
      method:  'POST',
      headers: { Authorization: `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}` },
      body:    formData,
    });

    if (!mgRes.ok) {
      // Inquiry is already saved; log the email failure but return success to the user
      console.error('Mailgun error:', await mgRes.text());
    }

    return new Response(JSON.stringify({ success: true }), {
      status:  200,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Unhandled error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status:  500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }
});
