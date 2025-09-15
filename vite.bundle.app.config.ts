import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  root: path.resolve(process.cwd(), 'src'),
  plugins: [react()],
  build: {
    outDir: path.resolve(process.cwd(), 'dist/app'),
    emptyOutDir: true, // clear only dist/app, not dist/cli
  },
});
