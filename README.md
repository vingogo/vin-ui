<p align="center">
  <img alt="logo" src="https://cdn.vingogo.cn/logo.png" width="150" style="margin-bottom: 10px;">
</p>

<p align="center">京东风格的轻量级 Vue 组件库，支持移动端 H5 和 小程序开发</p>

<p align="center">
  <a href="https://github.com/vingogo/vin-ui">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
  <a href="https://github.com/vingogo/vin-ui">
    <img src="https://img.shields.io/npm/l/@vingogo/uni-ui.svg" alt="license"/>
  </a>
  <a href="https://www.npmjs.com/package/@vingogo/uni-ui">
    <img src="https://img.shields.io/npm/v/@vingogo/uni-ui.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/@vingogo/uni-ui">
    <img src="https://img.shields.io/npm/dt/@vingogo/uni-ui.svg?style=flat-square">
  </a>
</p>

<p align="center">
  <a href="https://github.com/vingogo/vin-ui">
    <img src="https://img.shields.io/github/contributors/vingogo/vin-ui" alt="GitHub contributors">
  </a>
  <a href="https://github.com/vingogo/vin-ui">
    <img src="https://img.shields.io/github/commit-activity/w/vingogo/vin-ui" alt="GitHub commit activity">
  </a>
  <a href="https://github.com/vingogo/vin-ui">
    <img src="https://img.shields.io/github/commits-since/vingogo/vin-ui/latest/dev" alt="GitHub commits since latest release (by date)">
  </a>
  <a href="https://github.com/vingogo/vin-ui">
    <img src="https://img.shields.io/github/release-date/vingogo/vin-ui" alt="GitHub Release Date">
  </a>
</p>

<p align="center">
   <img src="https://cdn.vingogo.cn/vinui-qrcode.png" width="236" alt="网页端二维码" title="网页端" />
  &nbsp;
  <img src="https://cdn.vingogo.cn/qrcode.jpg" width="236" alt="微信二维码" title="请用微信扫码">
  &nbsp;
   <img src="https://cdn.vingogo.cn/alipay-qrcode.jpg" width="236" alt="支付宝二维码" title="请用支付宝扫码">
</p>

---

VinUI 参考 [NutUI](https://github.com/jdf2e/nutui)（京东风格的轻量级移动端组件库）的设计和实现，在 Taro 小程序组件库版本 NutUI-Vue 基础上实现的 uniapp 版本

针对 uniapp 的一些特性进行了修改和调整，同时增加一些新的组件，对一些组件功能也有所增强

## 特性

- 🚀 30+ 高质量组件，覆盖移动端主流场景
- 💪 支持一套代码同时开发 H5+多端小程序
- 📖 仿照 NutUI 视觉规范
- 🍭 支持按需引用
- 📖 详尽的文档和示例
- 💪 支持 TypeScript
- 🌍 支持国际化
- 🍭 支持组件级别定制主题

## 快速开始

启动项目 demo:

```bash
pnpm run dev:play
```

启动 demo 后同步修改编译组件:

```bash
pnpm run dev:ui
```

开发文档：

```bash
pnpm run docs:dev
```

[快速开始](https://vingogo.cn/docs/guide/quickstart.html)

## 关于项目

项目采用 pnpm workspace 的 monorepo 结构，使各个子项目彼此独立，子项目如下：

- docs：文档项目
- packages/play: demo 项目，用于发布 h5 和小程序
- packages/uni-ui: VinUI 组件的核心代码项目，用于发布 npm 包（@vingogo/uni-ui）和 uniapp 市场插件

采用该结构的好处是彼此独立，互不侵入，方便项目后续拓展。

**目前在结合 pnpm/yarn workspace + uniapp 使用上发现的问题是，对软链接支持似乎有问题，h5 端和小程序端经常出现编译报错的情况**

临时处理方案是：

- 开发阶段，监听组件（uni-ui）项目的修改，实时构建输出到 play 项目 src/@vingogo 文件夹
- play 项目引用构建后的 @vingogo 文件夹文件内容

监听文件修改并实时构建输出实现的较为简漏，会频繁读、写、删除、创建文件，待优化。如未找到软链接引用后各端能正常使用的方法的话，可能会放弃 pnpm workspace 的结构

## 链接

- [组件使用文档](https://vingogo.cn/docs/index.html)
- [Github](https://github.com/vingogo/vin-ui)
- [Gitee](https://gitee.com/vingogo/vin-ui)
- [uniapp 市场插件](https://ext.dcloud.net.cn/plugin?id=11187)
