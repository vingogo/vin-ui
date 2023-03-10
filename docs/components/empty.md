# Empty 空状态

### 介绍

空状态时的占位提示

### 安装

```javascript
import { createApp } from 'vue';
import { Empty } from '@vin/uni-ui';

const app = createApp();
app.use(Empty);
```

### 基础用法

```html
<template>
  <vin-empty description="无数据"></vin-empty>
</template>
```

### 图片类型，内置 3 个

```html
<template>
  <vin-empty image="empty" description="无内容"></vin-empty>
  <vin-empty image="error" description="加载失败/错误"></vin-empty>
  <vin-empty image="network" description="无网络"></vin-empty>
</template>
```

### 自定义图片

```html
<template>
  <vin-empty description="无优惠券">
    <template #image>
      <img src="https://static-ftcms.jd.com/p/files/61a9e3313985005b3958672e.png" />
    </template>
  </vin-empty>
</template>
```

### 底部内容

```html
<template>
  <vin-empty image="error" description="加载失败">
    <view style="margin-top: 10px">
      <vin-button icon="refresh" type="primary">重试</vin-button>
    </view>
  </vin-empty>
</template>
```

## API

### Props

| 参数        | 说明                                                      | 类型             | 默认值 |
| ----------- | --------------------------------------------------------- | ---------------- | ------ |
| image       | 图片类型，可选值为 error network search，支持传入图片 URL | String           | empty  |
| image-size  | 图片大小，Number 类型单位为 px                            | Number \| String | -      |
| description | 图片下方的描述文字                                        | String           | 无内容 |

### Slots

| 事件名      | 说明           |
| ----------- | -------------- |
| default     | 自定义底部内容 |
| image       | 自定义图片     |
| description | 自定义描述文字 |
