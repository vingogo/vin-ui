# 快速上手

使用 Vin UI 前，请确保你已经对小程序开发、uniapp 和 TypeScript 有一定了解。

> Vin UI 默认采用 TypeScript 开发, 非该开发方式, 请谨慎使用。

## 安装

Vin UI 遵循 uniapp 的安装方式

### npm 安装

在项目根目录执行如下命令即可：

```
// 如果您的项目根目录没有 package.json 文件的话，请先执行如下命令：
// npm init -y

npm install @vingogo/uni-ui

// 更新
// npm update @vingogo/uni-ui
```

您也可以使用 yarn 或 pnpm 进行安装：

```
# 通过 yarn 安装
yarn add @vingogo/uni-ui

# 通过 pnpm 安装
pnpm add @vingogo/uni-ui
```

### HbuilderX 方式（不推荐）

如果您是使用 HBuilderX 开发的用户，您可以在 uniapp 插件市场通过 uni_modules 的形式进行安装。

在 uniapp 插件市场右上角选择 uni_modules 版本下的使用 HBuilderX 导入插件，导入到对应的项目中即可。

下载地址：[https://ext.dcloud.net.cn/plugin?id=11187](https://ext.dcloud.net.cn/plugin?id=11187)

> 不推荐该方式安装，项目主要使用 uni cli 的方式开发、测试，后续步骤也主要按 uni cli 方式；HbuilderX 挺好用，下次一定学

## 配置

在进行配置之前，请确保您已经根据安装中的步骤对 Vin UI 进行了 npm 安装

### SCSS

Vin UI 依赖 SCSS，如果已安装，请略过。

如未安装，请通过以下命令安装对 sass(scss) 的支持:

```
// 安装sass
npm i sass sass-loader -D
```

HBuilderX 可在工具 -> 插件安装中找到 "scss/sass 编译" 插件进行安装

### 引入样式变量

在 vite.config.ts 中添加配置：

```
css: {
  preprocessorOptions: {
    scss: {
      additionalData: "@import '@vingogo/uni-ui/styles/variables.scss';",
    },
  },
}
```

您也可以获取 '@vingogo/uni-ui/styles/variables.scss' 文件的内容，替换成您自己的主题变量

### 配置 easycom

[easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom) 可以方便的引入组件，建议开启

该配置需要修改 `pages.json` 中的内容，如修改没有及时生效，请重新编译项目

```
// pages.json
{
  "easycom": {
    "^vin-(.*)": "@vingogo/uni-ui/components/$1/index.vue"
  },

	// 此为本身已有的内容
	"pages": [
		// ......
	]
}
```

## 自动导入

```
npm install @uni-helper/vite-plugin-uni-components
```
在 vite.config.ts 中添加配置：
```
import { defineConfig } from 'vite'

import Components from '@uni-helper/vite-plugin-uni-components'
import { VinUIResolver } from '@vingogo/uni-ui'

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
      resolvers: [VinUIResolver()],
    }),
  ],
})
```
这样你的组件会拥有类型提示
## 使用

完成上述配置后，无需引入组件，可以直接在项目中使用，如：

```
<template>
  <vin-button></vin-button>
</template>
```
