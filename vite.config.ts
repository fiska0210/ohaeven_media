
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ohaeven_media/', // 使用相對路徑，確保部署在 GitHub Pages 子路徑時資源讀取正確
  server: {
    port: 5173,
    open: true
  }
});
