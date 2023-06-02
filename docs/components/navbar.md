# NavBar 头部导航

### 介绍

提供导航功能。

### 基本用法

```html
<template>
  <vin-navbar @on-click-back="back" @on-click-title="title" title="订单详情">
    <template #left>
      <view>返回</view>
    </template>
    <template #right>
      <vin-icon class="right" name="share-n"></vin-icon>
    </template>
  </vin-navbar>

  <vin-navbar
    @on-click-back="back"
    @on-click-title="title"
    @on-click-right="rightClick"
    title="浏览记录"
    desc="清空"
  ></vin-navbar>

  <vin-navbar
    :left-show="false"
    @on-click-back="back"
    @on-click-title="title"
    @on-click-icon="icon"
    @on-click-right="rightClick"
    title="购物车"
    titIcon="cart2"
    desc="编辑"
  >
    <template #right>
      <vin-icon class="right" name="more-x"></vin-icon>
    </template>
  </vin-navbar>
</template>

<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const methods = {
        back() {
          alert('header头部， 点击返回');
        },
        title() {
          alert('header头部， 点击title');
        },
        rightClick() {
          alert('右侧点击事件');
        },
      };

      return {
        ...methods,
      };
    },
  };
</script>
```

### 设置 slot:content 可以自定义导航栏中间内容

```html
<template>
  <vin-navbar
    @on-click-back="back"
    @on-click-title="title"
    @on-click-right="rightClick"
    desc="编辑"
  >
    <template #content>
      <vin-tabs v-model="tab1value" @click="changeTab">
        <vin-tabpane title="商品"> </vin-tabpane>
        <vin-tabpane title="店铺"> </vin-tabpane>
      </vin-tabs>
    </template>

    <template #right>
      <vin-icon class="right" name="more-x"></vin-icon>
    </template>
  </vin-navbar>
</template>

<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const tab1value = ref(0);
      const methods = {
        back() {
          alert('header头部， 点击返回');
        },
        title() {
          alert('header头部， 点击title');
        },
        rightClick() {
          alert('右侧点击事件');
        },
        changeTab(tab: any) {
          tab1value.value = tab.paneKey as number;
        },
      };

      return {
        tab1value,
        ...methods,
      };
    },
  };
</script>
```

### 多 tab 切换导航及增加右侧按钮

```html
<template>
  <vin-navbar @on-click-back="back">
    <template #content>
      <vin-tabs v-model="tab2value" @click="changeTabList">
        <vin-tabpane title="商品"> </vin-tabpane>
        <vin-tabpane title="评价"> </vin-tabpane>
        <vin-tabpane title="详情"> </vin-tabpane>
        <vin-tabpane title="推荐"> </vin-tabpane>
      </vin-tabs>
    </template>
    <template #icons>
      <vin-icon class="icon" name="share"></vin-icon>
    </template>

    <template #right>
      <vin-icon class="right" name="horizontal-n"></vin-icon>
    </template>
  </vin-navbar>
</template>

<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const tab2value = ref(0);
      const methods = {
        back() {
          alert('header头部， 点击返回');
        },
        changeTabList(tab: any) {
          tab2value.value = tab.paneKey as number;
        },
      };
      return {
        tab2value,
        ...methods,
      };
    },
  };
</script>
```

### Prop

| 字段                | 说明                   | 类型    | 默认值 |
| ------------------- | ---------------------- | ------- | ------ |
| title               | 标题名称               | String  | -      |
| desc                | 右侧描述               | String  | -      |
| left-show           | 是否展示左侧箭头       | Boolean | false  |
| tit-icon            | 标题中插入 icon        | String  | -      |
| fixed               | 是否固定到顶部         | Boolean | false  |
| safe-area-inset-top | 是否开启顶部安全区适配 | Boolean | false  |

### Event

| 名称           | 说明                   | 回调参数    |
| -------------- | ---------------------- | ----------- |
| on-click-title | 点击页面标题事件       | event:Event |
| on-click-icon  | 点击页面标题 icon 事件 | event:Event |
| on-click-right | 点击右侧按钮事件       | event:Event |
| on-click-back  | 左侧图标返回点击事件   | event:Event |

### Slot

| 名称    | 说明                 | 回调参数 |
| ------- | -------------------- | -------- |
| left    | 自定义左侧内容       |          |
| right   | 自定义右侧内容       |          |
| content | 自定义导航栏中间内容 |          |
