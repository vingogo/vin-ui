# Tag 标签

### 介绍

用于标记和分类的标签。

### 安装

```javascript
import { createApp } from 'vue';
import { Tag } from '@vin/uni-ui';

const app = createApp();
app.use(Tag);
```

### 代码实例

### 基础用法

```html
<template>
  <vin-cell-group title="基础用法">
    <vin-cell title="primary 类型">
      <template v-slot:link>
        <vin-tag type="primary">标签</vin-tag>
      </template>
    </vin-cell>
    <vin-cell title="success 类型">
      <template v-slot:link>
        <vin-tag type="success">标签</vin-tag>
      </template>
    </vin-cell>
    <vin-cell title="danger 类型">
      <template v-slot:link>
        <vin-tag type="danger">标签</vin-tag>
      </template>
    </vin-cell>
    <vin-cell title="warning 类型">
      <template v-slot:link>
        <vin-tag type="warning">标签</vin-tag>
      </template>
    </vin-cell>
  </vin-cell-group>
</template>
```

### 样式风格

```html
<template>
  <vin-cell-group title="样式风格">
    <vin-cell title="空心样式">
      <template v-slot:link>
        <vin-tag plain>标签</vin-tag>
      </template>
    </vin-cell>
    <vin-cell title="圆角样式">
      <template v-slot:link>
        <vin-tag round type="primary">标签</vin-tag>
      </template>
    </vin-cell>
    <vin-cell title="标记样式">
      <template v-slot:link>
        <vin-tag mark type="primary">标签</vin-tag>
      </template>
    </vin-cell>
    <vin-cell title="可关闭标签">
      <template v-slot:link>
        <vin-tag v-if="show" closeable @close="close" type="primary">标签</vin-tag>
      </template>
    </vin-cell>
  </vin-cell-group>
</template>

<script lang="ts">
  import { ref } from 'vue';

  export default {
    setup() {
      const show = ref(true);
      const close = () => {
        show.value = false;
      };

      return {
        close,
        show,
      };
    },
  };
</script>
```

### 颜色自定义

```html
<template>
  <vin-cell-group title="自定义">
    <vin-cell title="背景颜色">
      <template v-slot:link>
        <vin-tag color="#FA685D">标签</vin-tag>
      </template>
    </vin-cell>
    <vin-cell title="文字颜色">
      <template v-slot:link>
        <vin-tag color="#E9E9E9" textColor="#999999">标签</vin-tag>
      </template>
    </vin-cell>
    <vin-cell title="空心颜色">
      <template v-slot:link>
        <vin-tag color="#FA2400" plain>标签</vin-tag>
      </template>
    </vin-cell>
  </vin-cell-group>
</template>
```

### Prop

| 字段       | 说明                                              | 类型    | 默认值    |
| ---------- | ------------------------------------------------- | ------- | --------- |
| type       | 标签类型，可选值为 primary success danger warning | String  | `default` |
| color      | 标签颜色                                          | String  | -         |
| text-color | 文本颜色，优先级高于 color 属性                   | String  | `white`   |
| plain      | 是否为空心样式                                    | Boolean | `false`   |
| round      | 是否为圆角样式                                    | Boolean | `false`   |
| mark       | 是否为标记样式                                    | Boolean | `false`   |
| closeable  | 是否为可关闭标签                                  | Boolean | `false`   |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 标签显示内容 |

### Event

| 事件名称 | 说明     | 回调参数 |
| -------- | -------- | -------- |
| click    | 点击事件 | event    |
| close    | 关闭事件 | event    |
