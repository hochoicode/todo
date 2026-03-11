import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../services/todoService';
import TodoItem from './TodoItem';

export default function Todo() {
  const [inputValue, setInputValue] = useState('');
  const [descValue, setDescValue] = useState(''); // Thêm state cho mô tả
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAll
  });

  const addMutation = useMutation({
    // Sửa lại chỗ này để truyền cả cục object qua service
    mutationFn: todoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setInputValue(''); 
      setDescValue(''); // Xóa trắng ô mô tả sau khi thêm thành công
    }
  });

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    // Truyền cả title và description
    addMutation.mutate({ title: inputValue, description: descValue });
  };

  return (
    <div className="card shadow border-0">
      <div className="card-header bg-primary text-white text-center py-3">
        <h3 className="mb-0">✨ Quản Lý Công Việc</h3>
        <small>React Query + EF Core SQLite</small>
      </div>
      
      <div className="card-body bg-light">
        {/* Khu vực Input được nâng cấp */}
        <div className="mb-4 shadow-sm p-3 bg-white rounded border">
          <input 
            type="text"
            className="form-control form-control-lg mb-2"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Nhập tiêu đề công việc..."
            disabled={addMutation.isPending}
          />
          <textarea 
            className="form-control mb-3"
            rows={2}
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
            placeholder="Nhập mô tả chi tiết (không bắt buộc)..."
            disabled={addMutation.isPending}
          />
          <button 
            className="btn btn-primary w-100 fw-bold" 
            onClick={handleAddTodo}
            disabled={addMutation.isPending || !inputValue.trim()}
          >
            {addMutation.isPending ? 'Đang thêm...' : 'Thêm Công Việc Mới'}
          </button>
        </div>
        
        {isError && <div className="alert alert-danger">Lỗi kết nối API!</div>}

        {isLoading ? (
          <div className="text-center text-muted my-4">Đang tải dữ liệu...</div>
        ) : (
          <ul className="list-group list-group-flush">
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            {todos.length === 0 && !isError && (
              <div className="text-center text-muted my-3">Chưa có công việc nào!</div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}