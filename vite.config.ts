import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BASE_URL = "https://594b-41-86-253-66.ngrok-free.app/";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: BASE_URL,
        changeOrigin: true,
        secure: false,
      },
      "/auth": {
        target: BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
