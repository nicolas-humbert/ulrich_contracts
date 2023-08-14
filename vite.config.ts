import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://9707-41-86-253-66.ngrok-free.app",
    },
  },
  plugins: [react()],
});
