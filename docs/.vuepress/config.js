const { searchPlugin } = require('@vuepress/plugin-search');
const { defineUserConfig } = require('vuepress');
const { localTheme } = require('./theme');
const { copyCodePlugin } = require('vuepress-plugin-copy-code2');
const { commentPlugin } = require('vuepress-plugin-comment2');
const { mdEnhancePlugin } = require('vuepress-plugin-md-enhance');
const vinConfig = require('../../config.json');

module.exports = defineUserConfig({
  base: '/docs/',
  lang: 'zh_CN',
  title: 'Vin 使用文档',
  description: 'Vin 使用文档',
  head: [
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?187d3bdd1c4384c46db97e5ede089a32";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`,
    ],
  ],
  markdown: {},
  theme: localTheme({
    // 默认主题配置
    logo: '/images/logo.png',
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '组件',
        link: '/components/',
      },
      {
        text: 'Github',
        link: 'https://github.com/vingogo/vin-ui',
      },
    ],
    sidebar: {
      '/components/': vinConfig.list.map((nav) => {
        return {
          text: nav.name,
          children: nav.components.map(({ name, desc }) => {
            return {
              text: `${name} ${desc}`,
              link: `/components/${name.replace(/\B([A-Z])/g, '-$1').toLowerCase()}.md`,
            };
          }),
        };
      }),
    },
    docsDir: 'docs',
    lastUpdatedText: '上次更新',
    contributorsText: '贡献者',

    // custom containers
    tip: '提示',
    warning: '注意',
    danger: '警告',
    // 404 page
    notFound: ['这是一个 404 页面'],
    backToHome: '返回首页',
    // a11y
    openInNewWindow: '在新窗口打开',
    toggleDarkMode: '切换夜间模式',
    toggleSidebar: '切换侧边栏',
  }),
  plugins: [
    searchPlugin(),
    copyCodePlugin({
      locales: {
        '/': {
          copy: '复制代码成功',
          hint: '复制代码',
        },
      },
    }),
    mdEnhancePlugin({
      container: true,
      tabs: true,
      codetabs: true,
      tasklist: true,
    }),
  ],
});
