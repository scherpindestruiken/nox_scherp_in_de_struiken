export const runtime = 'edge';

type SendBody = { to: string; subject: string; content: string };

async function getAccessToken() {
  const {
    ZOHO_CLIENT_ID,
    ZOHO_CLIENT_SECRET,
    ZOHO_REFRESH_TOKEN,
  } = process.env as Record<string, string | undefined>;

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error('Missing Zoho OAuth env: ZOHO_CLIENT_ID/SECRET/REFRESH_TOKEN');
  }

  const form = new URLSearchParams();
  form.set('grant_type', 'refresh_token');
  form.set('refresh_token', ZOHO_REFRESH_TOKEN);
  form.set('client_id', ZOHO_CLIENT_ID);
  form.set('client_secret', ZOHO_CLIENT_SECRET);

  const res = await fetch('https://accounts.zoho.eu/oauth/v2/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });

  const json = await res.json() as any;
  if (!res.ok || !json.access_token) {
    throw new Error(`Zoho token exchange failed: ${res.status} ${JSON.stringify(json)}`);
  }
  return json.access_token as string;
}

export async function POST(req: Request) {
  try {
    const { to, subject, content } = (await req.json()) as SendBody;

    if (!to || !subject || !content) {
      return new Response(JSON.stringify({ error: 'Missing to/subject/content' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const {
      ZOHO_API_BASE,
      ZOHO_ACCOUNT_ID,
      ZOHO_SENDER,
    } = process.env as Record<string, string | undefined>;

    if (!ZOHO_API_BASE || !ZOHO_ACCOUNT_ID || !ZOHO_SENDER) {
      return new Response(JSON.stringify({ error: 'Missing env: ZOHO_API_BASE/ACCOUNT_ID/SENDER' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }

    const accessToken = await getAccessToken();

    const payload = {
      fromAddress: ZOHO_SENDER,
      toAddress: to,
      subject,
      content,
    };

    const apiUrl = `${ZOHO_API_BASE}/api/accounts/${ZOHO_ACCOUNT_ID}/messages`;
    const zr = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'authorization': `Zoho-oauthtoken ${accessToken}`,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await zr.json().catch(() => ({}));
    if (!zr.ok) {
      return new Response(JSON.stringify({ error: 'Zoho API error', status: zr.status, data }), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message ?? 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}
