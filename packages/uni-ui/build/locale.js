const { resolve } = require('path');
const { build } = require('vite');
const { SRC_DIR, LIB_DIR } = require('./const');

let input = {
  index: resolve(SRC_DIR, 'locale/index.ts'),
};

['zh-CN', 'zh-TW', 'en-US'].map((file) => {
  input[file] = resolve(SRC_DIR, `locale/lang/${file}.ts`);
});

const buildLocale = () =>
  build({
    configFile: false,
    build: {
      target: 'es2015',
      minify: true,
      lib: {
        entry: '',
        name: 'index',
        formats: ['es'],
      },
      rollupOptions: {
        external: ['vue', 'vue-i18n'],
        input,
        output: {
          dir: resolve(LIB_DIR, 'locale'),
          entryFileNames: '[name].js',
        },
      },
      emptyOutDir: false,
    },
  });

module.exports = buildLocale;
