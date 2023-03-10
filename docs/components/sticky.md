# Sticky 粘性布局

### 介绍

效果同 `css` 中的 `position: sticky`,对低端浏览器可使用其做兼容

### 安装

```javascript
import { createApp } from 'vue';
import { Sticky } from '@vin/uni-ui';

const app = createApp();
app.use(Sticky);
```

### 基础用法

```html
<template>
  <vin-cell>
    <vin-sticky top="57">
      <vin-button type="primary">吸顶按钮</vin-button>
    </vin-sticky>
  </vin-cell>
</template>
<script lang="ts">
  export default {
    setup() {
      return {};
    },
  };
</script>
<style lang="scss">
  #app {
    height: auto !important;
  }
</style>
```

### 吸顶距离

```html
<template>
  <vin-cell>
    <vin-sticky top="120">
      <vin-button type="primary">吸顶距离120px</vin-button>
    </vin-sticky>
  </vin-cell>
</template>
<script lang="ts">
  export default {
    setup() {
      return {};
    },
  };
</script>
<style lang="scss">
  #app {
    height: auto !important;
  }
</style>
```

### 指定容器

```html
<template>
  <view class="sticky-container" ref="container">
    <vin-sticky top="100" :container="container" z-index="1">
      <vin-button type="info">指定容器</vin-button>
    </vin-sticky>
  </view>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const container = ref(null);
      return {
        container,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .sticky-container {
    width: 100%;
    height: 300px;
    background-color: #fff;
  }
</style>
<style lang="scss">
  #app {
    height: auto !important;
  }
</style>
```

### 吸底距离

```html
<template>
  <vin-cell>
    <vin-sticky bottom="100" position="bottom">
      <vin-button type="primary">吸底距离100px</vin-button>
    </vin-sticky>
  </vin-cell>
</template>
<script lang="ts">
  export default {
    setup() {
      return {};
    },
  };
</script>
<style lang="scss">
  #app {
    height: auto !important;
  }
</style>
```

## API

### Props

| 参数      | 说明                                                | 类型    | 默认值 |
| --------- | --------------------------------------------------- | ------- | ------ |
| position  | 吸附位置（`top`、`bottom`）                         | String  | `top`  |
| top       | 吸顶距离                                            | Number  | `0`    |
| bottom    | 吸底距离                                            | Number  | `0`    |
| container | 容器的 `HTML` 节点, 在小程序环境下需要同时指定 `id` | Element | -      |
| z-index   | 吸附时的层级                                        | Number  | `2000` |

### Events

| 事件名 | 说明               | 回调参数                          |
| ------ | ------------------ | --------------------------------- |
| change | 吸附状态改变时触发 | `val: Boolean`                    |
| scroll | 滚动时触发         | `{ top: Number, fixed: Boolean }` |
