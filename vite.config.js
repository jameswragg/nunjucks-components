import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "./public",
    manifest: true,
    rollupOptions: {
      input: "./src/index.js",
    },
  },
});
