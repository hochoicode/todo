import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vừa vào app là kiểm tra túi quần xem có thẻ VIP (token) chưa
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Vứt thẻ VIP đi
    setIsAuthenticated(false); // Quay về màn hình khóa
  };

  return (
    <div>
      <div className="container mt-5" style={{ maxWidth: '600px' }}>
        {/* Nút Đăng xuất nhỏ gọn ở góc */}
        {isAuthenticated && (
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        )}

        {/* Rẽ nhánh giao diện */}
        {isAuthenticated ? (
          <Todo />
        ) : (
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        )}
      </div>
    </div>

  );
}

export default App;