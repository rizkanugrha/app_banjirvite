// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy: {
      '/geni': {
        target: mode === 'production' ? 'http://api.tugas-cool.my.id' : 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/geni/, ''),
        secure: false,
      },
    },
  },
}));