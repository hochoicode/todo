import http from '../utils/http';

export const authService = {
  login: async (username: string, password: string) => {
    // Gọi API /api/login mà mình vừa viết bên .NET
    const res = await http.post('/login', { username, password });
    return res.data; 
  }
};