export const runtime = 'edge';

export async function GET() {
  const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } = process.env as Record<string, string | undefined>;

  return new Response(
    JSON.stringify(
      {
        ok: true,
        cloud_name: CLOUDINARY_CLOUD_NAME ? 'set' : 'missing',
        api_key: CLOUDINARY_API_KEY ? 'set' : 'missing',
        api_secret: CLOUDINARY_API_SECRET ? 'set' : 'missing',
      },
      null,
      2
    ),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
