# Progress 进度条

### 介绍

展示操作或任务的当前进度，比如上传文件。

### 基础用法

```html
<template>
  <vin-cell>
    <vin-progress percentage="30" />
  </vin-cell>
</template>
```

### 设置高度和颜色

```html
<template>
  <vin-cell>
    <vin-progress
      percentage="30"
      stroke-color=" rgba(250,44,25,0.47)"
      stroke-width="20"
      text-color="red"
    />
  </vin-cell>
</template>
```

### 设置百分比不显示

```html
<template>
  <vin-cell>
    <vin-progress percentage="50" :show-text="false" stroke-height="24" />
  </vin-cell>
</template>
```

### 设置百分比外显

```html
<template>
  <vin-cell>
    <vin-progress percentage="30" />
  </vin-cell>
</template>
```

### 设置百分比内显

```html
<template>
  <vin-cell>
    <vin-progress percentage="60" :text-inside="true" />
  </vin-cell>
</template>
```

### 设置百分比内显自定义内容

```html
<template>
  <vin-cell>
    <vin-progress percentage="60" :text-inside="true">
      <vin-icon style="display: block" size="30" name="https://cdn.vingogo.cn/logo.png"></vin-icon>
    </vin-progress>
  </vin-cell>
</template>
```

## 自定义尺寸

内置 **small**，**base**，**large** 三种规格供使用。

```html
<template>
  <vin-cell>
    <vin-progress percentage="30" :text-inside="true" size="small"> </vin-progress>
  </vin-cell>
  <vin-cell>
    <vin-progress percentage="50" :text-inside="true" size="base"> </vin-progress>
  </vin-cell>
  <vin-cell>
    <vin-progress percentage="70" :text-inside="true" size="large"> </vin-progress>
  </vin-cell>
</template>
```

### 设置状态显示

```html
<template>
  <view>
    <vin-cell>
      <vin-progress
        percentage="30"
        stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
        status="active"
      />
    </vin-cell>
    <vin-cell>
      <vin-progress percentage="50" :stroke-width="strokeWidth" status="icon" />
    </vin-cell>
    <vin-cell>
      <vin-progress
        percentage="100"
        stroke-color="linear-gradient(90deg, rgba(180,236,81,1) 0%,rgba(66,147,33,1) 100%)"
        stroke-width="15"
        status="icon"
        icon-name="issue"
        icon-color="red"
      />
    </vin-cell>
  </view>
</template>
```

## Prop

| 字段               | 说明                                                     | 类型    | 默认值       |
| ------------------ | -------------------------------------------------------- | ------- | ------------ |
| percentage         | 百分比                                                   | Number  | 0            |
| is-show-percentage | 是否需要展示百分号                                       | Boolean | true         |
| stroke-color       | 进度条背景色                                             | String  | #f30         |
| stroke-width       | 进度条宽度                                               | String  | ''           |
| size               | 进度条及文字尺寸，可选值 small/base/large                | String  | -            |
| show-text          | 是否显示进度条文字内容                                   | Boolean | true         |
| text-inside        | 进度条文字显示位置(false:外显，true:内显)                | Boolean | false        |
| text-color         | 进度条文字颜色设置                                       | String  | #333         |
| text-background    | 进度条文字背景颜色设置                                   | String  | 同进度条颜色 |
| status             | 进度条当前状态,active(展示动画效果)/icon(展示 icon 标签) | String  | text         |
| icon-name          | icon 名称                                                | String  | checked      |
| icon-color         | icon 颜色                                                | String  | #439422      |
