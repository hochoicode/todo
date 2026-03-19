import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
    if (req.method === "GET") {
        // Giả lập việc đếm dữ liệu cực nhọc
        const stats = {
            totalTasks: 100,
            completed: 85,
            pending: 15,
            systemStatus: "Healthy - Report Service is running!"
        };
        return new Response(JSON.stringify(stats), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("Method Not Allowed", { status: 405 });
};