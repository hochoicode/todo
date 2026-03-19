import type { Context } from "@netlify/functions";

// Database giả lập (Sẽ bay màu sau 15 phút không ai gọi)
let todos = [
  { id: 1, title: "Tách Microservices thành công", completed: true }
];

export default async (req: Request, context: Context) => {
  const headers = { "Content-Type": "application/json" };

  if (req.method === "GET") {
    return new Response(JSON.stringify(todos), { status: 200, headers });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const newTodo = { id: Date.now(), title: body.title, completed: false };
    todos.push(newTodo);
    return new Response(JSON.stringify(newTodo), { status: 201, headers });
  }

  return new Response("Method Not Allowed", { status: 405 });
};