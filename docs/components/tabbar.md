# TabBar 标签栏

### 介绍

底部导航常用场景

### 安装

```javascript
import { createApp } from 'vue';
import { Tabbar, TabbarItem, Icon } from '@vin/uni-ui';

const app = createApp();
app.use(Tabbar);
app.use(TabbarItem);
```

### 基础用法

如果需要在现有 Icon 的基础上使用更多图标，请参考 icon 组件自定义图标引入。

```html
<template>
  <vin-tabbar @tab-switch="tabSwitch">
    <vin-tabbar-item tab-title="首页" icon="home"></vin-tabbar-item>
    <vin-tabbar-item tab-title="分类" icon="category"></vin-tabbar-item>
    <vin-tabbar-item tab-title="发现" icon="find"></vin-tabbar-item>
    <vin-tabbar-item tab-title="购物车" icon="cart"></vin-tabbar-item>
    <vin-tabbar-item tab-title="我的" icon="my"></vin-tabbar-item>
  </vin-tabbar>
</template>
<script>
  export default {
    setup() {
      function tabSwitch(item, index) {
        console.log(item, index);
      }
      return {
        tabSwitch,
      };
    },
  };
</script>
```

### 自定义图片链接

```html
<template>
  <vin-tabbar @tab-switch="tabSwitch">
    <vin-tabbar-item
      tab-title="首页"
      img="http://img13.360buyimg.com/uba/jfs/t1/29316/38/1115/3203/5c0f3d61E35d0c7da/9e557f2cb5c9dab6.jpg"
      activeImg="http://img20.360buyimg.com/uba/jfs/t1/9996/36/8646/4833/5c0f3d61E7c1b7e0f/c98ad61124172e93.jpg"
    ></vin-tabbar-item>
    <vin-tabbar-item
      tab-title="分类"
      img="http://img12.360buyimg.com/uba/jfs/t1/25443/23/1062/4600/5c0f3d61E2e9f1360/c9b3421fe18614e2.jpg"
      activeImg="http://img20.360buyimg.com/uba/jfs/t1/19241/12/1048/8309/5c0f3d61E17ed5a56/c3af0964cade47f8.jpg"
    ></vin-tabbar-item>
    <vin-tabbar-item
      tab-title="发现"
      img="http://img13.360buyimg.com/uba/jfs/t1/10361/35/4713/4643/5c0f3d62E437a3c94/273fd0fb90798f03.jpg"
      activeImg="http://img14.360buyimg.com/uba/jfs/t1/26604/35/1073/7896/5c0f3d61Eb9f5f184/5f01c938abe4216d.jpg"
    ></vin-tabbar-item>
    <vin-tabbar-item
      tab-title="购物车"
      img="http://img11.360buyimg.com/uba/jfs/t1/14848/18/1066/3723/5c0f41bdE9f2a38fe/e6ed6768717297fb.jpg"
      activeImg="http://img30.360buyimg.com/uba/jfs/t1/17538/16/1070/6214/5c0f41bdE4bc9a1db/74cf978e5015454b.jpg"
    ></vin-tabbar-item>
    <vin-tabbar-item
      tab-title="我的"
      img="http://img20.360buyimg.com/uba/jfs/t1/20004/20/1045/3620/5c0f3d61Eaaec1670/9e59db63983b7b9f.jpg"
      activeImg="http://img14.360buyimg.com/uba/jfs/t1/23967/14/1072/6714/5c0f3d61E0ad8991e/8f741953f6e38f15.jpg"
    ></vin-tabbar-item>
  </vin-tabbar>
</template>
<script>
  export default {
    setup() {
      function tabSwitch(item, index) {
        console.log(item, index);
      }
      return {
        tabSwitch,
      };
    },
  };
</script>
```

### 自定义选中

```html
<template>
  <vin-tabbar v-model:visible="active" size="18px">
    <vin-tabbar-item tab-title="首页" icon="home"></vin-tabbar-item>
    <vin-tabbar-item tab-title="分类" icon="category"></vin-tabbar-item>
    <vin-tabbar-item tab-title="发现" icon="find"></vin-tabbar-item>
    <vin-tabbar-item tab-title="购物车" icon="cart"></vin-tabbar-item>
    <vin-tabbar-item tab-title="我的" icon="my"></vin-tabbar-item>
  </vin-tabbar>
</template>
```

### 徽标提示

```html
<template>
  <vin-tabbar>
    <vin-tabbar-item tab-title="首页" icon="home" num="11"></vin-tabbar-item>
    <vin-tabbar-item tab-title="分类" icon="category"></vin-tabbar-item>
    <vin-tabbar-item tab-title="发现" icon="find"></vin-tabbar-item>
    <vin-tabbar-item tab-title="购物车" icon="cart" num="110"></vin-tabbar-item>
    <vin-tabbar-item tab-title="我的" icon="my"></vin-tabbar-item>
  </vin-tabbar>
</template>
```

### 自定义颜色

```html
<template>
  <vin-tabbar unactive-color="#7d7e80" active-color="#1989fa">
    <vin-tabbar-item tab-title="首页" icon="home"></vin-tabbar-item>
    <vin-tabbar-item tab-title="分类" icon="category"></vin-tabbar-item>
    <vin-tabbar-item tab-title="发现" icon="find"></vin-tabbar-item>
    <vin-tabbar-item tab-title="购物车" icon="cart"></vin-tabbar-item>
    <vin-tabbar-item tab-title="我的" icon="my"></vin-tabbar-item>
  </vin-tabbar>
</template>
```

### 三个图标的标签栏

```html
<template>
  <vin-tabbar unactive-color="#7d7e80" active-color="#1989fa">
    <vin-tabbar-item tab-title="首页" icon="home"></vin-tabbar-item>
    <vin-tabbar-item tab-title="分类" icon="category"></vin-tabbar-item>
    <vin-tabbar-item tab-title="发现" icon="find"></vin-tabbar-item>
  </vin-tabbar>
</template>
```

### 固定底部，可自由跳转

```html
<template>
  <vin-tabbar :bottom="true" :safeAreaInsetBottom="true">
    <vin-tabbar-item tab-title="首页" href="" icon="home"></vin-tabbar-item>
    <vin-tabbar-item tab-title="分类" icon="category"></vin-tabbar-item>
    <vin-tabbar-item tab-title="发现" icon="find"></vin-tabbar-item>
    <vin-tabbar-item tab-title="购物车" href="http://vingogo.cn" icon="cart"></vin-tabbar-item>
    <vin-tabbar-item tab-title="我的" href="######" icon="my"></vin-tabbar-item>
  </vin-tabbar>
</template>
```

### Prop

### vin-tabbar

| 字段                   | 说明                                     | 类型    | 默认值  |
| ---------------------- | ---------------------------------------- | ------- | ------- |
| v-model:visible        | 选中标签的索引值                         | number  | 0       |
| bottom                 | 是否固定在页面底部                       | boolean | false   |
| size                   | icon 的尺寸/图片的宽高                   | string  | '20px'  |
| unactive-color         | icon 未激活的颜色                        | string  | #7d7e80 |
| active-color           | icon 激活的颜色                          | string  | #1989fa |
| safe-area-inset-bottom | 是否开启 iphone 系列全面屏底部安全区适配 | boolean | false   |

### tabbar-item

| 字段              | 说明                                                                                     | 类型             | 默认值         |
| ----------------- | ---------------------------------------------------------------------------------------- | ---------------- | -------------- |
| tab-title         | 标签页的标题                                                                             | string           | --             |
| icon              | 标签页显示的[图标名称](/docs/components/icon.html)                                       | string           | --             |
| font-class-name   | 自定义 icon 字体基础类名                                                                 | string           | `vin-iconfont` |
| class-prefix      | 自定义 icon 类名前缀，用于使用自定义图标                                                 | string           | `vin-icon`     |
| img               | 标签页显示图片链接                                                                       | String           | --             |
| active-img        | 激活以后的标签页显示图片链接（同一个 item 中 icon 和 img 只能选择一个）                  | string           | --             |
| href              | 标签页的跳转链接                                                                         | string           | --             |
| to `小程序不支持` | 标签页的路由对象，等于 vue-router 的 [to 属性](https://router.vuejs.org/zh/api/#to) 属性 | string ｜ object | --             |
| num               | 页签右上角的数字角标，超出 99 之后为 99+                                                 | number           | --             |
| dot               | 是否显示图标右上角小红点                                                                 | boolean          | false          |

### Event

| 事件名称   | 说明               | 回调参数           |
| ---------- | ------------------ | ------------------ |
| tab-switch | 切换页签时触发事件 | 点击的数据和索引值 |
