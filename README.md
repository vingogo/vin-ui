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

## 快速开始

可参考项目文档：[快速开始](https://vingogo.cn/docs/guide/quickstart.html)

### 安装

VinUI 提供了 npm 包和 uni_modules 包的方式安装组件。

#### 方式一：npm 安装运行

```bash
# Using npm
npm install @vingogo/uni-ui

# Using yarn
yarn add @vingogo/uni-ui

# Using pnpm
pnpm add @vingogo/uni-ui
```

#### 方式二：uniapp 插件市场下载

uniapp 市场插件地址：[https://ext.dcloud.net.cn/plugin?id=11187](https://ext.dcloud.net.cn/plugin?id=11187)

#### 方式三：通过下载代码

通过 [Github](https://github.com/vingogo/vin-ui) 下载 VinUI 的代码，然后将打包后的代码拷贝到自己的项目中：

1. 克隆仓库代码：

```bash
git clone https://github.com/vingogo/vin-ui.git
```

2. 安装依赖：

```bash
pnpm i
```

3. 在 `src/uni_modules/vin-ui` 目录对 VinUI 的代码做符合业务的个性化调整
4. 构建代码, 将把原有的 TS 文件生成编译后的 JS 文件，并转成 ES2015

```bash
pnpm build:uni
```

在 `dist/uni_modules` 下生成供拷贝的文件

### 使用方式

1. 在 `pages.json` 中添加 easycom 配置：

```json
{
  "easycom": {
    // 此处根据实际文件位置进行修改，如下为通过 npm 包安装的方式配置
    "^vin-(.*)": "@vingogo/uni-ui/lib/components/$1/index.vue"
  },
  // 此为本身已有的内容
  "pages": [
    // ......
  ]
}
```

2. 引入样式

在项目入口文件 main.ts 或者 main.js 文件中添加如下代码：

```js
import '@vingogo/uni-ui/lib/style.css';
```

3. 在项目中使用：

```vue
<vin-button type="primary">button</vin-button>
```

## 关于项目

在结合 pnpm/yarn workspace + uniapp 使用上发现 uniapp 对软链接的支持不是很好，将原有 workspace 改成现有形式，主要目录如下：

- docs: 文档相关
- src: 代码主要内容，用于发发布 h5 和小程序
- src/uni_modules: 放置 VinUI 核心代码，该目录下的代码用于发布 npm 包（@vingogo/uni-ui）和 uniapp 市场插件

### 项目运行

项目推荐使用 pnpm 的方式安装运行，启动方式：

1. 安装依赖

```bash
pnpm i
```

2. 运行 h5 或者小程序

```bash
pnpm dev
```

3. 根据交互式命令行选项选择要运行的环境
4. 在浏览器或者指定小程序端运行 dist/dev 文件夹下代码

### VinUI 组件构建

- 构建 npm 版本代码：

```bash
pnpm build:lib
```

执行完上面命令将在 `dist/npm` 下生成用于发布 npm 的代码

- 构建 uni_modules 版本代码：

```bash
pnpm build:uni
```

执行完上面命令将在 `dist/uni_modules` 下生成用于发布 uniapp 市场的代码

## VinUI 特性

- 🚀 30+ 高质量组件，覆盖移动端主流场景
- 💪 支持一套代码同时开发 H5+多端小程序
- 📖 仿照 NutUI 视觉规范
- 🍭 支持按需引用
- 📖 详尽的文档和示例
- 💪 支持 TypeScript
- 🌍 支持国际化
- 🍭 支持组件级别定制主题

## 链接

- [组件使用文档](https://vingogo.cn/docs/index.html)
- [Github](https://github.com/vingogo/vin-ui)
- [Gitee](https://gitee.com/vingogo/vin-ui)
- [uniapp 市场插件](https://ext.dcloud.net.cn/plugin?id=11187)

## 联系

有关 VinUI 的问题，欢迎添加微信交流，加微信请备注：VinUI

<img width="150" src="https://cdn.vingogo.cn/wechat.jpg" alt="wechat" title="wechat" />
