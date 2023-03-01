import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

const prod_server = {
  host: process.env.PROD_HOST,
  port: process.env.PROD_PORT,
};
const dev_server = {
  host: process.env.DEV_HOST,
  port: process.env.DEV_PORT,
};
let server = {};
if (process.env.NODE_ENV === "development") {
  server = dev_server;
} else {
  server = prod_server;
}
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
export default defineConfig({
  server: server,
  plugins: [react()],
});
