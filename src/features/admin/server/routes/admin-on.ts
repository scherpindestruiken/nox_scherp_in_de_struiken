export const runtime = "edge";
export async function GET() {
  return new Response("admin=ON", {
    status: 200,
    headers: {
      "Set-Cookie": "isAdmin=1; Path=/; Max-Age=2592000; SameSite=Lax",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
