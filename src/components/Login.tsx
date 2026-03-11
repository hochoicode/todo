import React, { useState } from 'react';
import { authService } from '../services/authService';

interface Props {
  onLoginSuccess: () => void; // Hàm báo cho App biết là đã đăng nhập xong
}

export default function Login({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await authService.login(username, password);
      // Lấy được thẻ VIP rồi! Lưu ngay vào bộ nhớ trình duyệt
      localStorage.setItem('access_token', data.token);
      onLoginSuccess(); // Báo hiệu thành công để đổi màn hình
    } catch (err) {
      setError('Sai tài khoản hoặc mật khẩu!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card shadow border-0 mx-auto" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card-header bg-dark text-white text-center py-3">
        <h4 className="mb-0">🔐 Đăng Nhập Hệ Thống</h4>
      </div>
      <div className="card-body p-4 bg-light">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Tài khoản</label>
            <input 
              type="text" 
              className="form-control" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Mật khẩu</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          
          {error && <div className="alert alert-danger py-2">{error}</div>}
          
          <button type="submit" className="btn btn-dark w-100 fw-bold" disabled={isLoading}>
            {isLoading ? 'Đang xác thực...' : 'Đăng Nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}