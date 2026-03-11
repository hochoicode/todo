import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoItemType } from '../types/todo';
import { todoService } from '../services/todoService';

interface Props {
  todo: TodoItemType;
}

export default function TodoItem({ todo }: Props) {
  const queryClient = useQueryClient();

  // Gọi API Update khi click vào Checkbox
  const updateMutation = useMutation({
    // Đảo ngược trạng thái isCompleted hiện tại gửi lên server
    mutationFn: () => todoService.update(todo.id, { ...todo, isCompleted: !todo.isCompleted }),
    onSuccess: () => {
      // Thành công thì ngầm kêu React Query lấy list mới nhất
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  // Gọi API Delete khi click nút Xóa
  const deleteMutation = useMutation({
    mutationFn: () => todoService.remove(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded">
      <div className="form-check">
      <div className="form-check d-flex flex-column justify-content-center">
        <div>
          <input 
            className="form-check-input" 
            type="checkbox" 
            checked={todo.isCompleted}
            onChange={() => updateMutation.mutate()}
            disabled={updateMutation.isPending || deleteMutation.isPending} 
          />
          <label 
            className={`form-check-label ms-2 ${todo.isCompleted ? 'text-muted text-decoration-line-through' : 'fw-bold'}`}
          >
            {todo.title}
          </label>
        </div>
        
        {/* Nếu có description thì hiển thị ra (in nghiêng, màu xám) */}
        {todo.description && (
          <small className="text-muted ms-4 mt-1 fst-italic">
            ↳ {todo.description}
          </small>
        )}
      </div>
      </div>
      
      <button 
        className="btn btn-sm btn-outline-danger"
        onClick={() => deleteMutation.mutate()}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? 'Đang xóa...' : 'Xóa'}
      </button>
    </li>
  );
}