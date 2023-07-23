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

在项目入口文件 main.ts 或者 main.js 文件中添加如下代码：

```
import '@vingogo/uni-ui/lib/styles/themes/default.scss';
```

修改 vite 或者 webpack 配置文件。如下示例:

> 注意不同安装方式 variables.scss 文件的路径可能会有不同，请注意修改，下面文件路径以 npm 包路径为例

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

## FAQ

1. 样式不生效？

注意不同的 sass-loader 版本中配置有区别：

- V10 以上版本中，引入文件的键名为 `additionalData`
- V8 以上版本 V10 以下版本中，引入文件的键名为 `prependData`
- V8 以下版本中，引入文件的键名为 `data`

如果上述配置正确，检查项目中 `@dcloudio/vite-plugin-uni` 版本是否为最新，在部分 `@dcloudio/vite-plugin-uni` 的旧版本中，样式引入会有问题
