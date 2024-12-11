import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'spa',
  build: {
    cssMinify: true,
    manifest: true,
    minify: true,
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: fileURLToPath(new URL('./src/*', import.meta.url)),
      },
      {
        find: '@/data',
        replacement: fileURLToPath(new URL('./src/data/*', import.meta.url)),
      },
      {
        find: '@/view',
        replacement: fileURLToPath(new URL('./src/view/*', import.meta.url)),
      },
    ],
  },
});
