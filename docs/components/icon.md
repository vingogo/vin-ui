# Icon 图标

### 介绍

基于 IconFont 字体的图标集，可以通过 Icon 组件使用。

### 安装

```javascript
import { createApp } from 'vue';
import { Icon } from '@vingogo/uni-ui';

const app = createApp();
app.use(Icon);
```

## 代码演示

### 基础用法

`Icon` 的 `name` 属性支持传入图标名称或图片链接。

```html
<template>
  <vin-icon name="fabulous"></vin-icon>
  <vin-icon name="star"></vin-icon>
  <vin-icon size="40" name="https://cdn.vingogo.cn/logo.png"></vin-icon>
</template>
```

### 图标颜色

`Icon` 的 `color` 属性用来设置图标的颜色。

```html
<template>
  <vin-icon name="fabulous" color="#fa2c19"></vin-icon>
  <vin-icon name="fabulous" color="#64b578"></vin-icon>
  <vin-icon name="star" color="#fa2c19"></vin-icon>
</template>
```

### 图标大小

`Icon` 的 `size` 属性用来设置图标的尺寸大小，默认单位为 `px`。

```html
<template>
  <vin-icon name="fabulous"></vin-icon>
  <vin-icon name="fabulous" size="24"></vin-icon>
  <vin-icon name="fabulous" size="16"></vin-icon>
</template>
```

### 通用动态图标

添加指定的 class 类就可以实现图片动态效果，默认是播放 1 次，添加 `vin-icon-am-infinite` 类即可实现循环播放。通过设置 css 可实现动画启动前的延迟间隔、动画在多久时间内完成

```html
<template>
  <vin-icon name="dou-arrow-up" class="vin-icon-am-jump vin-icon-am-infinite"></vin-icon>
  <vin-icon name="star-fill-n" class="vin-icon-am-blink vin-icon-am-infinite"></vin-icon>
  <vin-icon name="refresh2" class="vin-icon-am-rotate vin-icon-am-infinite"></vin-icon>
  <vin-icon name="heart-fill" class="vin-icon-am-breathe vin-icon-am-infinite"></vin-icon>
  <vin-icon name="microphone" class="vin-icon-am-flash vin-icon-am-infinite"></vin-icon>
  <vin-icon name="download" class="vin-icon-am-bounce vin-icon-am-infinite"></vin-icon>
  <vin-icon name="message" class="vin-icon-am-shake vin-icon-am-infinite"></vin-icon>
</template>

<style>
  .vin-icon {
    --animate-duration: 1s;
    --animate-delay: 0s;
  }
</style>
```

### 自定义图标

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。

> 方案一 引入 [iconfont](https://www.iconfont.cn/) 推荐此方案

第一步：首先在 [iconfont](https://www.iconfont.cn/) 生成你自定义的 Icon 文件下载存放至本地项目 [详细使用说明](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code)

```bash
/assets/font/demo.css
/assets/font/demo_index.html
/assets/font/iconfont.css
/assets/font/iconfont.js
/assets/font/iconfont.json
/assets/font/iconfont.ttf
/assets/font/iconfont.woff
/assets/font/iconfont.woff2
```

第二步：项目入口文件 main.js 引用 `iconfont.css`

```javascript
import './assets/font/iconfont.css';
```

第三步：

```html
<!-- 
  font-class-name 指定类名为默认 iconfont
  class-prefix 指定默认 icon
  name 值根据 iconfont.css 中值对应填写 
-->
<vin-icon font-class-name="iconfont" class-prefix="icon" name="close" />
```

> 方案二 第三方自定义字体库

```css
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'my-icon';
  src: url('./my-icon.ttf') format('truetype');
}

.my-icon {
  font-family: 'my-icon';
}

.my-icon-extra::before {
  content: '\e626';
}
```

```html
<!-- 
  font-class-name 指定类名为默认 my-icon
  class-prefix 指定默认 my-icon
-->
<vin-icon font-class-name="my-icon" class-prefix="my-icon" name="extra" />
```

## API

### Props

| 参数            | 说明                                     | 类型             | 默认值         |
| --------------- | ---------------------------------------- | ---------------- | -------------- |
| name            | 图标名称或图片链接                       | String           | -              |
| color           | 图标颜色                                 | String           | -              |
| size            | 图标大小，如 `20px` `2em` `2rem`         | String or Number | -              |
| font-class-name | 自定义 icon 字体基础类名                 | String           | `vin-iconfont` |
| class-prefix    | 自定义 icon 类名前缀，用于使用自定义图标 | String           | `vin-icon`     |
| tag             | HTML 标签                                | String           | `text`         |

### Events

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| click  | 点击图标时触发 | event: Event |
