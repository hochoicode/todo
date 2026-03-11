import type { Context } from "@netlify/functions";

// Dữ liệu tạm trên RAM (Bài test đặc sản của Serverless: nó sẽ bị reset mất trí nhớ sau vài chục phút)
let todos = [
  { id: 1, title: "Hành trang lên mây với Netlify", isCompleted: true, description: "Đã deploy FE thành công!" },
  { id: 2, title: "Làm Backend bằng chuẩn V2 .mts", isCompleted: false, description: "Cực kỳ xịn xò" }
];

export default async (req: Request, context: Context) => {
  const method = req.method;
  const headers = { "Content-Type": "application/json" };

  // 1. Lấy danh sách (GET)
  if (method === "GET") {
    return new Response(JSON.stringify(todos), { headers, status: 200 });
  }

  // 2. Thêm mới (POST)
  if (method === "POST") {
    const body = await req.json();
    const newTodo = {
      id: Date.now(),
      title: body.title,
      isCompleted: false,
      description: body.description || ""
    };
    todos.push(newTodo);
    return new Response(JSON.stringify(newTodo), { headers, status: 201 });
  }

  // 3. Giả lập thành công cho các thao tác Cập nhật/Xóa để FE không bị lỗi đỏ
  if (method === "PUT" || method === "DELETE") {
    return new Response(JSON.stringify({ message: "Thao tác thành công" }), { headers, status: 200 });
  }

  return new Response("Method Not Allowed", { status: 405 });
};