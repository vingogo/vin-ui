# 定制主题

## 介绍

`VinUI` 支持灵活的样式定制，满足多种视觉业务和品牌需求，包括但不限于全局主色调和特定组件视觉定制的支持。

### 使用 SASS 变量 进行主题配置

#### 1. 新建自定义变量 SCSS 文件

在本地项目中新建一个 SCSS 文件 `custom_theme.scss` 进行自定义。

```scss
$primary-color: #478ef2;
$primary-color-end: #496af2;
```

#### 2. 修改本地项目 webpack 或者 vite 的配置文件

修改 `vite` 或者 `webpack` 配置文件中 `sass-loader` 的配置。如下示例:

**vite**

```js
// https://vitejs.dev/config/
export default defineConfig({
  //...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/custom_theme.scss';@import '@vingogo/uni-ui/lib/styles/variables.scss';`,
      },
    },
  },
});
```

**webpack**

```js
{
  test: /\.(sa|sc)ss$/,
  use: [
    {
      loader: 'sass-loader',
      options: {
        // 注意：在 sass-loader 不同版本，这个选项名是 是不一样的，具体可参考 sass-loader对应的版本文档
        data: `@import '@/assets/custom_theme.scss';@import '@vingogo/uni-ui/lib/styles/variables.scss';`,
      }
    }
  ]
}
```

**vue-cli3.x**

```js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // 注意：在 sass-loader 不同版本，这个选项名是 是不一样的，具体可参考 sass-loader对应的版本文档
        prependData: `@import '@/assets/custom_theme.scss';@import '@vingogo/uni-ui/lib/styles/variables.scss';`,
      },
    },
  },
};
```

注意：其中 `@/assets/custom_theme.scss` 对应自定义样式变量文件路径，需要替换成实际项目中文件路径。

## FAQ

1. 样式不生效？

参考[默认主题 FAQ 部分的回答](./official-theme.html#faq)
