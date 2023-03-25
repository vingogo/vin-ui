import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';

export default defineConfig({
  base: '/ui/',
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@vingogo/uni-ui/styles/variables.scss';",
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
