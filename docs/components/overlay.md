# OverLay 遮罩层

### 介绍

创建一个遮罩层，通常用于阻止用户进行其他操作

### 安装

```javascript
import { createApp } from 'vue';
import { OverLay } from '@vingogo/uni-ui';

const app = createApp();
app.use(OverLay);
```

## 代码演示

### 基础用法

```html
<template>
  <vin-button type="primary" @click="state.show = true">显示遮罩层</vin-button>
  <vin-overlay v-model:visible="state.show" :z-index="2000"></vin-overlay>
</template>
<script lang="ts">
  import { reactive } from 'vue';
  export default {
    setup() {
      const state = reactive({
        show: false,
      });
      return {
        state,
      };
    },
  };
</script>
```

### 遮罩样式

```html
<template>
  <vin-button type="primary" @click="state.show = true">显示遮罩层</vin-button>
  <vin-overlay
    v-model:visible="state.show"
    :z-index="2000"
    :overlay-style="state.overlayStyle"
  ></vin-overlay>
</template>
<script lang="ts">
  import { reactive } from 'vue';
  export default {
    setup() {
      const state = reactive({
        show: false,
        overlayStyle: {
          backgroundColor: 'rgba(0, 0, 0, .2)',
        },
      });
      return {
        state,
      };
    },
  };
</script>
```

### 嵌套内容

```html
<template>
  <vin-button type="success" @click="state.show2 = true">嵌套内容</vin-button>
  <vin-overlay v-model:visible="state.show2" :z-index="2000">
    <view class="wrapper">
      <view class="content">这里是正文</view>
    </view>
  </vin-overlay>
</template>
<script lang="ts">
  import { reactive } from 'vue';
  export default {
    setup() {
      const state = reactive({
        show2: false,
      });
      return {
        state,
      };
    },
  };
</script>
<style lang="scss" scoped>
  .wrapper {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    .content {
      display: flex;
      width: 150px;
      height: 150px;
      background: #fff;
      border-radius: 8px;
      align-items: center;
      justify-content: center;
      color: red;
    }
  }
</style>
```

## API

### Props

| 参数                   | 说明             | 类型           | 默认值  |
| ---------------------- | ---------------- | -------------- | ------- |
| v-model:visible        | 当前组件是否显示 | Boolean        | `false` |
| z-index                | 遮罩层级         | String, Number | `2000`  |
| duration               | 动画时长，单位秒 | String, Number | `0.3`   |
| overlay-class          | 自定义遮罩类名   | String         | -       |
| overlay-style          | 自定义遮罩样式   | CSSProperties  | -       |
| close-on-click-overlay | 是否点击遮罩关闭 | Boolean        | `true`  |

### Events

| 事件名 | 说明       | 回调参数     |
| ------ | ---------- | ------------ |
| click  | 点击时触发 | event: Event |
