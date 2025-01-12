import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/geni": {
        target: "https://api.tugas-cool.my.id/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
