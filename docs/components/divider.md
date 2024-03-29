# Divider 分割线

### 介绍

用于将内容分隔为多个区域。

### 基础用法

默认渲染一条水平分割线。

```html
<template>
  <vin-cell>
    <vin-divider />
  </vin-cell>
</template>
```

### 展示文本

通过插槽在可以分割线中间插入内容。

```html
<template>
  <vin-cell>
    <vin-divider>文本</vin-divider>
  </vin-cell>
</template>
```

### 内容位置

通过 content-position 指定内容所在位置。

```html
<template>
  <vin-cell>
    <vin-divider content-position="left">文本</vin-divider>
  </vin-cell>
  <vin-cell>
    <vin-divider content-position="right">文本</vin-divider>
  </vin-cell>
</template>
```

### 虚线

添加 dashed 属性使分割线渲染为虚线。

```html
<template>
  <vin-cell>
    <vin-divider dashed>文本</vin-divider>
  </vin-cell>
</template>
```

### 自定义样式

可以直接通过 style 属性设置分割线的样式。

```html
<template>
  <vin-cell>
    <vin-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >文本</vin-divider
    >
  </vin-cell>
</template>
```

## API

### Props

| 参数             | 说明                          | 类型    | 默认值 |
| ---------------- | ----------------------------- | ------- | ------ |
| dashed           | 是否使用虚线                  | Boolean | false  |
| hairline         | 是否使用 0.5px 线             | Boolean | true   |
| content-position | 内容位置，可选值为 left right | String  | center |

### Slots

| 名称    | 说明 |
| ------- | ---- |
| default | 内容 |
