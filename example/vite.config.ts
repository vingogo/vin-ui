import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components';

export default defineConfig({
  root: process.cwd(),
  base: '/ui/',
  plugins: [
    UniHelperComponents({
      resolvers: [
        (name) => {
          if (name.match(/^(Vin[A-Z]|vin-[a-z])/)) {
            const cName = name
              .slice(3)
              .replace(/([a-z])([A-Z])/, '$1-$2')
              .toLowerCase();
            return {
              name,
              from: `@vingogo/uni-ui/lib/components/${cName}/index.vue`,
            };
          }
        },
        (name) => {
          if (name.match(/^(App[A-Z]|app-[a-z])/)) {
            const cName = name
              .slice(3)
              .replace(/([a-z])([A-Z])/, '$1-$2')
              .toLowerCase();
            return {
              name,
              from: `@/components/${cName}.vue`,
            };
          }
        },
      ],
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // eslint-disable-next-line
        additionalData: "@import '@vingogo/uni-ui/lib/styles/variables.scss';",
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    preserveSymlinks: true,
  },
});
