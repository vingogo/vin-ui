# Skeleton 骨架屏

### 介绍

在页面上待加载区域填充灰色的占位图，本质上是界面加载过程中的过渡效果。

### 基础用法

```html
<template>
  <vin-skeleton width="250px" height="15px" animated> </vin-skeleton>
</template>
```

### 传入多行

```html
<template>
  <vin-skeleton width="250px" height="15px" title animated row="3"> </vin-skeleton>
</template>
```

### 显示头像

```html
<template>
  <vin-skeleton width="250px" height="15px" title animated avatar avatarSize="100px" row="3">
  </vin-skeleton>
</template>
```

### 标题段落圆角风格

```html
<template>
  <vin-skeleton width="250px" height="15px" animated round></vin-skeleton>
</template>
```

### 显示子组件

```html
<template>
  <view class="content">
    <vin-switch v-model="checked" size="15px" />
    <vin-skeleton width="250px" height="15px" title animated avatar row="3" :loading="!checked">
      <view class="container">
        <vin-avatar
          size="50"
          icon="https://cdn.vingogo.cn/logo.png"
        />
      <view class="right-content">
        <view class="title">VinUI</view>
        <view class="desc"
            >一套轻量级移动端 Vue 组件库，提供丰富的基础组件和业务组件，帮助开发者快速搭建移动应用。</div
        >
        </view>
      </view>
    </vin-skeleton>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    const checked = ref(false);
    return {
      checked
    };
  }
};
</script>

<style lang="scss">
.content {
  .vin-switch {
    display: flex;
    margin: 0 16px 8px 0;
  }
  .container {
    display: flex;
    .right-content {
      margin-left: 19px;
      font-family: PingFangSC;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
      .desc {
        margin-top: 10px;
        font-size: 13px;
        color: rgba(154, 155, 157, 1);
      }
    }
  }
}
</style>

```

### Prop

| 字段         | 说明                      | 类型    | 默认值    |
| ------------ | ------------------------- | ------- | --------- |
| loading      | 是否显示骨架屏            | Boolean | `true`    |
| width        | 每行宽度                  | String  | `default` |
| height       | 每行高度                  | String  | `100px`   |
| animated     | 是否开启骨架屏动画        | Boolean | `false`   |
| avatar       | 是否显示头像              | Boolean | `false`   |
| avatar-shape | 头像形状：正方形/圆形     | String  | `round`   |
| avatar-size  | 头像大小                  | String  | `50px`    |
| round        | 标题/段落是否采用圆角风格 | Boolean | `false`   |
| row          | 设置段落行数              | String  | `1`       |
| title        | 是否显示段落标题          | Boolean | `true`    |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 骨架屏显示内容 |
