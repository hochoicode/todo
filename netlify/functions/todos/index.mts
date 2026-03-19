import type { Context } from "@netlify/functions";
import { getAllTodos, createNewTodo } from "./todoLogic"; // Gọi thợ ra làm

export default async (req: Request, context: Context) => {
  const headers = { "Content-Type": "application/json" };
  const method = req.method;

  try {
    // 1. API Lấy danh sách
    if (method === "GET") {
      const data = getAllTodos(); // Gọi logic
      return new Response(JSON.stringify(data), { status: 200, headers });
    }

    // 2. API Thêm mới
    if (method === "POST") {
      const body = await req.json();

      // Validate sơ bộ tại cửa
      if (!body.title) {
        return new Response(JSON.stringify({ error: "Vui lòng nhập tiêu đề!" }), { status: 400, headers });
      }

      const newTodo = createNewTodo(body.title, body.description); // Gọi logic
      return new Response(JSON.stringify(newTodo), { status: 201, headers });
    }

    return new Response("Method Not Allowed", { status: 405, headers });

  } catch (error) {
    // Bắt mọi lỗi sập nguồn để không bị văng 500 trắng trang
    return new Response(JSON.stringify({ error: "Lỗi hệ thống Serverless!" }), { status: 500, headers });
  }
};