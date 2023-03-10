const { defaultTheme } = require('vuepress');
const { path } = require('@vuepress/utils');

module.exports = {
  localTheme: (options) => {
    return {
      name: 'vuepress-theme-local',
      extends: defaultTheme(options),
      layouts: {
        Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
      },
    };
  },
};
