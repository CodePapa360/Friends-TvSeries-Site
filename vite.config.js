import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
  },
  server: {
    port: 3000,
    open: true,
    host: "0.0.0.0",
  },
  preview: {
    port: 6000,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
