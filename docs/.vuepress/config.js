import { searchPlugin } from '@vuepress/plugin-search';
import { defineUserConfig, defaultTheme } from 'vuepress';
import { copyCodePlugin } from 'vuepress-plugin-copy-code2';
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance';
import vinConfig from '../../config.json';

export default defineUserConfig({
  base: '/docs/',
  lang: 'zh_CN',
  title: 'Vin UI 使用文档',
  description: 'Vin UI 使用文档',
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
    ['link', { rel: 'icon', href: 'favicon.ico' }],
  ],
  theme: defaultTheme({
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '指南',
        link: '/guide/',
      },
      {
        text: '组件',
        link: '/components/icon',
        activeMatch: '/components/',
      },
      {
        text: '更多',
        children: [
          {
            text: 'vin-cli',
            link: 'https://github.com/vingogo/vin-cli',
          },
          {
            text: '基础开发',
            link: 'https://github.com/vingogo/uni-app-starter',
          },
          {
            text: 'VinUI vscode 插件',
            link: 'https://github.com/vingogo/vinui-vscode-extension',
          },
        ],
      },
      {
        text: 'Github',
        link: 'https://github.com/vingogo/vin-ui',
      },
      {
        text: 'Gitee',
        link: 'https://gitee.com/vingogo/vin-ui',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          link: '/guide/',
        },
        {
          text: '快速开始',
          link: '/guide/quickstart.md',
        },
        {
          text: '默认主题',
          link: '/guide/official-theme.md',
        },
        {
          text: '定制主题',
          link: '/guide/theme.md',
        },
        {
          text: '国际化',
          link: '/guide/international.md',
        },
        {
          text: '更新日志',
          link: 'https://github.com/vingogo/vin-ui/releases',
        },
        {
          text: '关于',
          link: '/guide/about.md',
        },
      ],
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
  markdown: {},
  plugins: [
    searchPlugin(),
    copyCodePlugin(),
    mdEnhancePlugin({
      container: true,
      tabs: true,
      codetabs: true,
    }),
  ],
});
