import http from "../utils/http";
import { TodoItemType } from "../types/todo";

export const todoService = {
  // Lấy danh sách
  getAll: async (): Promise<TodoItemType[]> => {
    const res = await http.get("/todos");
    return res.data; // Của axios
  },

  // Thêm mới
  create: async (data: { title: string; description: string }): Promise<TodoItemType> => {
    const res = await http.post('/todos', {
      title: data.title,
      description: data.description, // Gửi thêm description
      isCompleted: false
    });
    return res.data;
  },

  update: async (id: number, todo: TodoItemType): Promise<TodoItemType> => {
    const res = await http.put(`/todos/${id}`, todo);
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await http.delete(`/todos/${id}`);
  }
};
