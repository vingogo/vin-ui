# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示

### 安装

```javascript
import { createApp } from 'vue';
import { Popup, OverLay } from '@vingogo/uni-ui';

const app = createApp();
app.use(Popup).use(OverLay);
```

## 代码演示

### 基础用法

`visible` 控制显示/隐藏

```html
<template>
  <vin-cell title="展示弹出层" is-link @click="state.showBasic = true"></vin-cell>
  <vin-popup
    pop-class="popclass"
    :style="{ padding: '30px 50px' }"
    v-model:visible="state.showBasic"
    :z-index="100"
    >正文</vin-popup
  >
</template>
<script lang="ts">
  import { reactive } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showBasic: false,
      });
      return { state };
    },
  };
</script>
```

### 弹出位置

```html
<template>
  <vin-cell title="顶部弹出" is-link @click="state.showTop = true"></vin-cell>
  <vin-popup position="top" :style="{ height: '20%' }" v-model:visible="state.showTop"></vin-popup>
  <vin-cell title="底部弹出" is-link @click="state.showBottom = true"></vin-cell>
  <vin-popup
    position="bottom"
    :style="{ height: '20%' }"
    v-model:visible="state.showBottom"
  ></vin-popup>
  <vin-cell title="左侧弹出" is-link @click="state.showLeft = true"></vin-cell>
  <vin-popup
    position="left"
    :style="{ width: '20%', height: '100%' }"
    v-model:visible="state.showLeft"
  ></vin-popup>
  <vin-cell title="右侧弹出" is-link @click="state.showRight = true"></vin-cell>
  <vin-popup
    position="right"
    :style="{ width: '20%', height: '100%' }"
    v-model:visible="state.showRight"
  ></vin-popup>
</template>
<script lang="ts">
  import { reactive } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showTop: false,
        showBottom: false,
        showLeft: false,
        showRight: false,
      });
      return { state };
    },
  };
</script>
```

### 图标

```html
<template>
  <vin-cell title="关闭图标" is-link @click="state.showIcon = true"></vin-cell>
  <vin-popup
    position="bottom"
    closeable
    :style="{ height: '20%' }"
    v-model:visible="state.showIcon"
  ></vin-popup>
  <vin-cell title="图标位置" is-link @click="state.showIconPosition = true"></vin-cell>
  <vin-popup
    position="bottom"
    closeable
    close-icon-position="top-left"
    :style="{ height: '20%' }"
    v-model:visible="state.showIconPosition"
  ></vin-popup>
  <vin-cell title="自定义图标" is-link @click="state.showCloseIcon = true"></vin-cell>
  <vin-popup
    position="bottom"
    closeable
    close-icon-position="top-left"
    close-icon="heart"
    :style="{ height: '20%' }"
    v-model:visible="state.showCloseIcon"
  ></vin-popup>
</template>
<script lang="ts">
  import { reactive } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showIcon: false,
        showIconPosition: false,
        showCloseIcon: false,
      });
      return { state };
    },
  };
</script>
```

### 圆角弹框

```html
<template>
  <vin-cell title="圆角弹框" is-link @click="state.showRound = true"></vin-cell>
  <vin-popup
    position="bottom"
    closeable
    round
    :style="{ height: '30%' }"
    v-model:visible="state.showRound"
  ></vin-popup>
</template>
<script lang="ts">
  import { reactive } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showRound: false,
      });
      return { state };
    },
  };
</script>
```

### 指定挂载节点

```html
<template>
  <vin-cell title="指定挂载节点" is-link @click="state.showTeleport = true"></vin-cell>
  <vin-popup :style="{ padding: '30px 50px' }" teleport="#app" v-model:visible="state.showTeleport"
    >app</vin-popup
  >
</template>
<script lang="ts">
  import { reactive } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showTeleport: false,
      });
      return { state };
    },
  };
</script>
```

## API

### Props

| 参数                   | 说明                                                                        | 类型           | 默认值        |
| ---------------------- | --------------------------------------------------------------------------- | -------------- | ------------- |
| v-model:visible        | 当前组件是否显示                                                            | Boolean        | `false`       |
| z-index                | 遮罩层级                                                                    | String、Number | `2000`        |
| duration               | 动画时长，单位秒                                                            | String、Number | `0.3`         |
| overlay-class          | 自定义遮罩类名                                                              | String         | -             |
| overlay-style          | 自定义遮罩样式                                                              | CSSProperties  | -             |
| overlay                | 是否显示遮罩                                                                | Boolean        | `true`        |
| close-on-click-overlay | 是否点击遮罩关闭                                                            | Boolean        | `true`        |
| position               | 弹出位置（top,bottom,left,right,center）                                    | String         | `"center"`    |
| transition             | 动画名                                                                      | String         | -             |
| pop-class              | 自定义弹框类名                                                              | String         | -             |
| closeable              | 是否显示关闭按钮                                                            | Boolean        | `false`       |
| close-icon-position    | 关闭按钮位置（top-left,top-right,bottom-left,bottom-right）                 | String         | `"top-right"` |
| close-icon             | 自定义 Icon                                                                 | String         | `"close"`     |
| destroy-on-close       | 弹层关闭后 `slot`内容会不会清空                                             | Boolean        | `true`        |
| round                  | 是否显示圆角                                                                | Boolean        | `false`       |
| safe-area-inset-bottom | 是否开启 iphone 系列全面屏底部安全区适配,仅当 `position` 为 `bottom` 时有效 | Boolean        | `false`       |

### Events

| 事件名           | 说明                   | 回调参数       |
| ---------------- | ---------------------- | -------------- |
| click            | 点击弹框时触发         | `event: Event` |
| click-close-icon | 点击关闭图标时触发     | `event: Event` |
| open             | 打开弹框时触发         | -              |
| close            | 关闭弹框时触发         | -              |
| opend            | 遮罩打开动画结束时触发 | `event: Event` |
| closed           | 遮罩关闭动画结束时触发 | `event: Event` |
| click-overlay    | 点击遮罩触发           | `event: Event` |
