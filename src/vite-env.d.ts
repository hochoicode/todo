/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Sau này bạn có thêm biến môi trường nào thì cứ khai báo vào đây nhé
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
