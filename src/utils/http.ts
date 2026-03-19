/// <reference types="vite/client" />
import axios from "axios";

// 1. Khởi tạo một instance với các config mặc định
const http = axios.create({
  // Sử dụng biến môi trường thay vì hardcode
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 2. Request Interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. Response Interceptor
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Token hết hạn, đang đá ra trang Login...");
    }
    return Promise.reject(error);
  },
);

export default http;
