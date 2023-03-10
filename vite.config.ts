import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';

export default defineConfig({
  base: 'ui',
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@vin/uni-ui/styles/variables.scss';",
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@vin': path.resolve(__dirname, './src/@vin'),
      '@vin/uni-ui': path.resolve(__dirname, './src/@vin/uni-ui'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    port: 3001,
  },
});
