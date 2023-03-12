# Cell 单元格

### 介绍

列表项，可组成列表。

### 安装

```javascript
import { createApp } from 'vue';
import { Cell, CellGroup, Icon } from '@vingogo/uni-ui';

const app = createApp();
app.use(Cell).use(CellGroup).use(Icon);
```

### 基本用法

```html
<template>
  <vin-cell title="我是标题" desc="描述文字"></vin-cell>
  <vin-cell title="我是标题" sub-title="副标题描述" desc="描述文字"></vin-cell>
  <vin-cell title="点击测试" @click="testClick"></vin-cell>
  <vin-cell title="圆角设置 0" round-radius="0"></vin-cell>
</template>
<script>
  import { ref } from 'vue';
  import { Toast } from '@vingogo/uni-ui';
  export default {
    setup() {
      const switchChecked = ref(true);
      const testClick = (event) => {
        Toast.text('点击事件');
      };
      return { testClick, switchChecked };
    },
  };
</script>
```

### 直接使用插槽

```html
<template>
  <vin-cell title="我是标题" desc="描述文字">
    <view>自定义内容</view>
  </vin-cell>
</template>
```

### 链接 | 分组用法

```html
<template>
  <vin-cell-group title="链接 | 分组用法" desc="使用 vin-cell-group 支持 title desc slots">
    <vin-cell title="链接" is-link></vin-cell>
    <vin-cell title="URL 跳转" desc="http://vingogo.cn" is-link url="http://vingogo.cn"></vin-cell>
    <vin-cell title="路由跳转 ’/‘ " to="/"></vin-cell>
  </vin-cell-group>
</template>
```

### 自定义右侧箭头区域

```html
<template>
  <vin-cell-group title="自定义右侧箭头区域">
    <vin-cell title="Switch">
      <template v-slot:link>
        <vin-switch v-model="switchChecked" />
      </template>
    </vin-cell>
  </vin-cell-group>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const testClick = (event: Event) => {
        console.log('点击事件');
      };
      const switchChecked = ref(true);
      return { testClick, switchChecked };
    },
  };
</script>
```

### 自定义左侧 Icon 区域

```html
<template>
  <vin-cell-group title="自定义左侧 Icon 区域">
    <vin-cell title="图片">
      <template v-slot:icon>
        <img
          class="vin-icon"
          style="width: 30px; height: 30px;"
          src="https://cdn.vingogo.cn/logo.png"
        />
      </template>
    </vin-cell>
  </vin-cell-group>
</template>
```

### 单元格展示图标

```html
<template>
  <vin-cell title="姓名" icon="my" desc="张三"></vin-cell>
</template>
```

### 只展示 desc ，可通过 desc-text-align 调整内容位置

```html
<template>
  <vin-cell desc-text-align="left" desc="张三"></vin-cell>
</template>
```

## API

### CellGroup Prop

| 字段  | 说明     | 类型   | 默认值 |
| ----- | -------- | ------ | ------ |
| title | 分组标题 | String | -      |
| desc  | 分组描述 | String | -      |

### Cell Prop

| 字段            | 说明                                                                                         | 类型             | 默认值 |
| --------------- | -------------------------------------------------------------------------------------------- | ---------------- | ------ |
| title           | 标题名称                                                                                     | String           | -      |
| sub-title       | 左侧副标题                                                                                   | String           | -      |
| desc            | 右侧描述                                                                                     | String           | -      |
| desc-text-align | 右侧描述文本对齐方式 [text-align](https://www.w3school.com.cn/cssref/pr_text_text-align.asp) | String           | right  |
| is-link         | 是否展示右侧箭头并开启点击反馈                                                               | Boolean          | false  |
| icon            | 左侧 [图标名称](/docs/components/icon.html) 或图片链接                                       | String           | -      |
| round-radius    | 圆角半径                                                                                     | Number           | 6px    |
| to              | 点击后跳转的目标路由对象                                                                     | String ｜ Object | -      |
| replace         | 是否在跳转时替换当前页面历史                                                                 | Boolean          | false  |

### Cell Event

| 名称  | 说明     | 回调参数    |
| ----- | -------- | ----------- |
| click | 点击事件 | event:Event |

## Cell Slots

| 名称    | 说明                 |
| ------- | -------------------- |
| icon    | 自定义左侧`icon`区域 |
| default | 自定义内容           |
| link    | 自定义右侧`link`区域 |

## CellGroup Slots

| 名称  | 说明                  |
| ----- | --------------------- |
| title | 自定义`title`标题区域 |
| desc  | 自定义`desc`描述区域  |
