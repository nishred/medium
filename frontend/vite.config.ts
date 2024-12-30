import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: "process/browser",
      buffer: "buffer",
    },
  },
  define: {
    global: "window",
    "process.env": {}, // You can also define any specific environment variables here
  },
});