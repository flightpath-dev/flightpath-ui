import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@base-ui/react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'lucide-react',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    cssCodeSplit: false,
    cssMinify: true,
    sourcemap: true,
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
