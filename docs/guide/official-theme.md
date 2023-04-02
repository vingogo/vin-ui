# 默认主题

## 介绍

VinUI 默认提供了一套 UI 主题，同时允许在一定程度上定制新主题，以满足业务的多样化视觉需求。

### SASS

默认主题依赖 `SASS`，如果已安装，请略过。

如未安装，请通过以下命令安装对 sass/scss 的支持:

```bash
# 安装sass
npm i sass sass-loader -D
```

`HBuilderX` 可在工具 -> 插件安装中找到 "sass/scss 编译" 插件进行安装

### 使用方式

修改 vite 或者 webpack 配置文件。如下示例:

#### vite 配置示例

在 `vite.config.js` 或者 `vite.config.ts` 中添加配置：

```js
// https://vitejs.dev/config/
export default defineConfig({
  //...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@vingogo/uni-ui/lib/styles/variables.scss';`,
      },
    },
  },
});
```

#### webpack 配置示例

```js
{
  test: /\.(sa|sc)ss$/,
  use: [
    {
      loader: 'sass-loader',
      options: {
        // 注意：在 sass-loader 不同版本，这个选项名是 是不一样的，具体可参考 sass-loader对应的版本文档
        data: `@import '@vingogo/uni-ui/lib/styles/variables.scss';`,
      }
    }
  ]
}
```

#### vue/cli 3 以上版本

vue/cli 3 以上版本修改 vue.config.js 进行配置

```js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: `@import '@vingogo/uni-ui/lib/styles/variables.scss';`,
      },
    },
  },
};
```
