export const runtime = "edge";
export async function GET() {
  return new Response("admin=OFF", {
    status: 200,
    headers: {
      "Set-Cookie": "isAdmin=; Path=/; Max-Age=0; SameSite=Lax",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
