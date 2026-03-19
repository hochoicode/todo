import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    if (req.method === "POST") {
        // Không cần check DB, cứ gọi POST là cấp thẻ VIP
        return new Response(JSON.stringify({
            message: "Đăng nhập thành công từ Identity Service",
            token: "microservice-jwt-token-2026"
        }), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("Method Not Allowed", { status: 405 });
};