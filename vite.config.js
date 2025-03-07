import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 Use your repo name here if hosted on GitHub Pages
  build: {
    outDir: "dist",
  },
});
