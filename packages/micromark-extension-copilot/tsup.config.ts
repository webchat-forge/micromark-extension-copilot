import { defineConfig } from 'tsup';

export default defineConfig([
  {
    dts: true,
    entry: {
      'micromark-extension-copilot': './src/index.ts'
    },
    format: ['cjs', 'esm'],
    sourcemap: true,
    target: 'esnext'
  }
]);
