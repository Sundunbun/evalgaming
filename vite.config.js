import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', 
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html',
    },
  },
  server: {
    strictPort: true,
    mimeTypes: {
      'text/jsx': ['js', 'jsx'], // ✅ Fixes MIME type issue
    },
  },
});
