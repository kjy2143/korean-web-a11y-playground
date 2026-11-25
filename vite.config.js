import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { playgroundDemos } from './build/demos.js';

export default defineConfig({
  root: fileURLToPath(new URL('./dashboard/', import.meta.url)),
  publicDir: false,
  appType: 'mpa',
  plugins: [playgroundDemos(fileURLToPath(new URL('./demo-sources/', import.meta.url)))],
  build: {
    outDir: fileURLToPath(new URL('./dist/', import.meta.url)),
    emptyOutDir: true,
  },
});
