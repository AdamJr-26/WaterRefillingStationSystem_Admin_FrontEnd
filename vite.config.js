import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 3000,
  },
  // server: {
  //   host: "0.0.0.0",
  //   port: 10000
  // },
  plugins: [react()],
});
