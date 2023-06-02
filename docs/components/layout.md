# Layout 布局

### 介绍

用于快速进行布局

### 基础用法

```html
<template>
  <vin-row>
    <vin-col :span="24">
      <view class="flex-content">span:24</view>
    </vin-col>
  </vin-row>
  <vin-row>
    <vin-col :span="12">
      <view class="flex-content">span:12</view>
    </vin-col>
    <vin-col :span="12">
      <view class="flex-content flex-content-light">span:12</view>
    </vin-col>
  </vin-row>
  <vin-row>
    <vin-col :span="8">
      <view class="flex-content">span:8</view>
    </vin-col>
    <vin-col :span="8">
      <view class="flex-content flex-content-light">span:8</view>
    </vin-col>
    <vin-col :span="8">
      <view class="flex-content">span:8</view>
    </vin-col>
  </vin-row>
  <vin-row>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content flex-content-light">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
  </vin-row>
</template>
<style lang="scss" scoped>
  .vin-row {
    overflow: hidden;
    &:not(:last-child) .vin-col {
      margin-bottom: 15px;
    }
    margin-bottom: 15px;
  }
  .flex-content {
    line-height: 40px;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    background: #ff8881;
    &.flex-content-light {
      background: #ffc7c4;
    }
    &.flex-content-height {
      height: 50px;
    }
  }
</style>
```

### 设置元素间距

```html
<template>
  <vin-row :gutter="10">
    <vin-col :span="8">
      <view class="flex-content">span:8</view>
    </vin-col>
    <vin-col :span="8">
      <view class="flex-content flex-content-light">span:8</view>
    </vin-col>
    <vin-col :span="8">
      <view class="flex-content">span:8</view>
    </vin-col>
  </vin-row>
</template>
<style lang="scss" scoped>
  .vin-row {
    overflow: hidden;
    &:not(:last-child) .vin-col {
      margin-bottom: 15px;
    }
    margin-bottom: 15px;
  }
  .flex-content {
    line-height: 40px;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    background: #ff8881;
    &.flex-content-light {
      background: #ffc7c4;
    }
    &.flex-content-height {
      height: 50px;
    }
  }
</style>
```

### Flex 布局

```html
<template>
  <vin-row type="flex" wrap="nowrap">
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content flex-content-light">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
  </vin-row>
  <vin-row type="flex" justify="center">
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content flex-content-light">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
  </vin-row>
  <vin-row type="flex" justify="end">
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content flex-content-light">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
  </vin-row>
  <vin-row type="flex" justify="space-between">
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content flex-content-light">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
  </vin-row>
  <vin-row type="flex" justify="space-around">
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content flex-content-light">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
  </vin-row>
  <vin-row type="flex" justify="space-evenly">
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content flex-content-light">span:6</view>
    </vin-col>
    <vin-col :span="6">
      <view class="flex-content">span:6</view>
    </vin-col>
  </vin-row>
</template>
<style lang="scss" scoped>
  .vin-row {
    overflow: hidden;
    &:not(:last-child) .vin-col {
      margin-bottom: 15px;
    }
    margin-bottom: 15px;
  }
  .flex-content {
    line-height: 40px;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    background: #ff8881;
    &.flex-content-light {
      background: #ffc7c4;
    }
    &.flex-content-height {
      height: 50px;
    }
  }
</style>
```

## Prop

### row

| 字段    | 说明                                                                                 | 类型           | 默认值     |
| ------- | ------------------------------------------------------------------------------------ | -------------- | ---------- |
| type    | 布局方式，可选值为 flex                                                              | String         | -          |
| gutter  | 列元素之间的间距（单位为 px）                                                        | String、Number | -          |
| justify | Flex 主轴对齐方式，可选值为 start end center space-around space-between space-evenly | String         | start      |
| align   | Flex 交叉轴对齐方式，可选值为 flex-start center flex-end                             | String         | flex-start |
| wrap    | Flex 是否换行，可选值为 nowrap wrap reverse                                          | String         | nowrap     |

### col

| 字段   | 说明                                                            | 类型           | 默认值 |
| ------ | --------------------------------------------------------------- | -------------- | ------ |
| span   | 列元素宽度（共分为 24 份，例如设置一行 3 个，那么 span 值为 8） | String、Number | 24     |
| offset | 列元素偏移距离                                                  | String、Number | 0      |

### row events

| 字段  | 说明       | 回调参数          |
| ----- | ---------- | ----------------- |
| click | 点击时触发 | event: MouseEvent |

### col events

| 字段  | 说明       | 回调参数          |
| ----- | ---------- | ----------------- |
| click | 点击时触发 | event: MouseEvent |
