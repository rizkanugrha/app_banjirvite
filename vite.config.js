import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/geni": {
        target: "https://apis-beta-peach.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
