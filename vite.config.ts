import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 針對 https://fiska0210.github.io/ohaeven_media/ 進行設定
export default defineConfig({
  plugins: [react()],
  base: '/ohaeven_media/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    open: true
  }
});