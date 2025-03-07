import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Fixes broken paths in `dist/`
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // ✅ Ensures assets go into `dist/assets/`
    rollupOptions: {
      input: 'index.html', // ✅ Ensures correct entry point
    },
  },
});
