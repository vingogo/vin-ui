import { configDefaults, defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
  plugins: [
    uni(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
