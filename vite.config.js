import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const project = process.env.PROJECT || '0-moving_cubes';
  return {
    root: resolve(__dirname, `projects/${project}`),
    build: {
      outDir: resolve(__dirname, `dist/${project}`),
    },
  };
});