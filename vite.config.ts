import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config
export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/mixins.scss" as *;`,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('axios')) return 'http';

            return 'vendor';
          }
        },
      },
    },
  },
});
