import { defineConfig } from 'tsup';

export default defineConfig([
  {
    dts: true,
    entry: {
      ['@webchat-forge/micromark-extension-copilot'.split('/').reverse()[0]]: './src/index.ts'
    },
    format: ['esm'],
    sourcemap: true,
    target: 'esnext'
  }
]);
