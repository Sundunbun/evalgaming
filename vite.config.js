import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // 👈 Change this to match your repo name on GitHub Pages
  build: {
    outDir: "dist",
  },
});