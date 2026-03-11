import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // Trả về một token giả để lừa Frontend mở khóa màn hình
  return new Response(JSON.stringify({ token: "netlify-vip-token-2026" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};