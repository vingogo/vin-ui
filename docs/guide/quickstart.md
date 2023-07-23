# 快速上手

使用 `Vin UI` 前，请确保你已经对小程序开发、`uniapp` 有一定了解。

如果是新项目，推荐使用 [uni-app-starter](https://github.com/vingogo/uni-app-starter), `uni-app-starter` 致力于打造跟 web 开发一致的开发体验，提供了很多开箱即用的功能，如果你使用过 nuxt，你或许会很喜欢。

## 安装

`Vin UI` 遵循 `uniapp` 的安装方式，为您提供了 npm 包和 uni_modules 包的方式安装组件。

### 方式一：npm 安装

在项目根目录执行如下命令即可：

```bash
# 如果您的项目根目录没有 package.json 文件的话，请先执行如下命令：
# npm init -y

npm install @vingogo/uni-ui

# 更新
# npm update @vingogo/uni-ui
```

您也可以使用 `yarn` 或 `pnpm` 进行安装：

```bash
# 通过 yarn 安装
yarn add @vingogo/uni-ui

# 通过 pnpm 安装
pnpm add @vingogo/uni-ui
```

### 方式二：uniapp 插件市场下载

如果您是使用 `HBuilderX` 开发的用户，您可以在 `uniapp` 插件市场通过 `uni_modules` 的形式进行安装。

在 uniapp 插件市场右上角选择 `uni_modules` 版本下的使用 `HBuilderX` 导入插件，导入到对应的项目中即可。

下载地址：[https://ext.dcloud.net.cn/plugin?id=11187](https://ext.dcloud.net.cn/plugin?id=11187)

### 方式三：通过下载代码

通过 [Github](https://github.com/vingogo/vin-ui)/[Gitee](https://gitee.com/vingogo/vin-ui) 下载 VinUI 的代码，然后将打包后的代码拷贝到自己的项目中，下面以 Github 仓库、pnpm 安装依赖为例：

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

拷贝 `dist/uni_modules` 下生成的文件

## 使用方式

在进行配置之前，请确保您已经根据安装中的步骤对 `Vin UI` 进行了 `npm` 安装。

### 1. easycom

[easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom) 可以方便的引入组件，建议开启

该配置需要修改 `pages.json` 中的内容，如修改没有及时生效，请重新编译项目

```json
// pages.json
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

### 2. 样式引入

在项目入口文件 `main.ts` 或者 `main.js` 文件中添加如下代码：

```js
import '@vingogo/uni-ui/lib/style.css';
```

### 3. 在项目中使用

完成上述配置后，无需引入组件，可以直接在项目中使用，如：

```vue
<template>
  <vin-button>button</vin-button>
</template>
```
