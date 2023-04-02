# 快速上手

使用 `Vin UI` 前，请确保你已经对小程序开发、`uniapp` 有一定了解。

## vin-cli

如果是新项目，推荐使用 [vin-cli](https://github.com/vingogo/vin-cli), `vin-cli`将为您提供`uniapp cli`开发方式的最佳实践。

```bash
# 通过 npm
npm i @vingogo/vin-cli -g
```

您也可以使用 `yarn` 或 `pnpm` 进行安装：

```bash
# 通过 yarn
yarn global add @vingogo/vin-cli

# 通过 pnpm
pnpm add @vingogo/vin-cli -g
```

创建一个开发模板：

```bash
vin template
```

启动项目开发模式：

```bash
npm run dev
```

## 安装

`Vin UI` 遵循 `uniapp` 的安装方式，在已有项目中集成，可通过如下步骤完成:

### npm 安装

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

### HbuilderX 方式（不推荐）

如果您是使用 `HBuilderX` 开发的用户，您可以在 `uniapp` 插件市场通过 `uni_modules` 的形式进行安装。

在 uniapp 插件市场右上角选择 `uni_modules` 版本下的使用 `HBuilderX` 导入插件，导入到对应的项目中即可。

下载地址：[https://ext.dcloud.net.cn/plugin?id=11187](https://ext.dcloud.net.cn/plugin?id=11187)

> 不推荐该方式安装，项目主要使用 cli 的方式开发、测试，后续步骤也主要按 cli 方式；HbuilderX 挺好用，下次一定学

## 配置

在进行配置之前，请确保您已经根据安装中的步骤对 `Vin UI` 进行了 `npm` 安装。

### 配置 easycom

[easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom) 可以方便的引入组件，建议开启

该配置需要修改 `pages.json` 中的内容，如修改没有及时生效，请重新编译项目

```json
// pages.json
{
  "easycom": {
    "^vin-(.*)": "@vingogo/uni-ui/lib/components/$1/index.vue"
  },
  // 此为本身已有的内容
  "pages": [
    // ......
  ]
}
```

### 样式引入

在项目入口文件 `main.ts` 或者 `main.js` 文件中添加如下代码：

```js
import '@vingogo/uni-ui/lib/style.css';
```

## 组件使用

完成上述配置后，无需引入组件，可以直接在项目中使用，如：

```vue
<template>
  <vin-button>button</vin-button>
</template>
```
