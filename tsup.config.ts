import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main/server.ts'],
  outDir: 'dist',
  replaceNodeEnv: true,
  clean: true,
  keepNames: true,
  minify: true,
});
