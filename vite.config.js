import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // If using GitHub Pages, set this to "/evalgaming/"
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
