import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

const publicFiles = fs.readdirSync(path.resolve(__dirname, "public"));
const publicFilesRegex = publicFiles
  .map((f) => f.replace(/\./g, "\\."))
  .join("|");

export default defineConfig({
  base: "/yorick/",
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      kolmafia: path.resolve(__dirname, "./src/kolmafia"),
    },
  },
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./index.html"),
        load: path.resolve(__dirname, "./load.html"),
      },
    },
  },
  optimizeDeps: {
    exclude: ["kolmafia"],
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    port: 3000,
    proxy: {
      [`^/(?!yorick/|src/|node_modules/|@react-refresh|@vite|${publicFilesRegex}).*(?<!.js.map)$`]:
        {
          target: "http://127.0.0.1:60080",
          changeOrigin: true,
          secure: false,
        },
    },
  },
});
