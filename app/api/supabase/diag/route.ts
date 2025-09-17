export const runtime = 'edge';

export async function GET() {
  const {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE,
  } = process.env as Record<string, string | undefined>;

  return new Response(
    JSON.stringify(
      {
        ok: true,
        url: SUPABASE_URL ? 'set' : 'missing',
        anon: SUPABASE_ANON_KEY ? 'set' : 'missing',
        service: SUPABASE_SERVICE_ROLE ? 'set' : 'missing',
      },
      null,
      2
    ),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
