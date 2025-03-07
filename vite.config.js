import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure JSX files are properly resolved
  },
  server: {
    mimeTypes: {
      'text/jsx': ['js', 'jsx'], // Correct MIME type issue
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: './index.html', // Ensure index.html is correctly bundled
    }
  },
});
