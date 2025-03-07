import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/https://github.com/Sundunbun/evalgaming/", // Ensure the correct base path
  build: {
    outDir: "dist",
  },
});
