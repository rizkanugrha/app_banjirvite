import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://demo-api.syaifur.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Keep `/api` intact for the backend
      },
      "/geni": {
        target: "https://api.tugas-cool.my.id",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/geni/, "/geni"), // Keep `/geni` intact for the backend
      },
    },
  },
});
