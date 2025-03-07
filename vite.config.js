import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ Allows imports like "@/components/MyComponent"
    },
  },
  base: "/", // ✅ Ensure this is correct for your GitHub Pages setup
  build: {
    outDir: "dist",
  },
});
