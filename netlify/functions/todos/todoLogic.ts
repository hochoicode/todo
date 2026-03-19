import { Todo } from "../../shared/types";
import { TodoStatus } from "../../shared/enums";

// Database tạm thời trên RAM (Lát nữa mình sẽ thay bằng Supabase)
let todosDB: Todo[] = [
    { id: 1, title: "Nâng cấp Clean Architecture", status: TodoStatus.COMPLETED },
    { id: 2, title: "Chuẩn bị tích hợp Database thật", status: TodoStatus.PENDING }
];

export const getAllTodos = (): Todo[] => {
    return todosDB;
};

export const createNewTodo = (title: string, description?: string): Todo => {
    const newTodo: Todo = {
        id: Date.now(),
        title: title,
        description: description || "",
        status: TodoStatus.PENDING
    };
    todosDB.push(newTodo);
    return newTodo; // Trả về data thuần, không dính dáng gì tới HTTP
};