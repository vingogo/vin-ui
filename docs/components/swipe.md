# Swipe 滑动手势

### 介绍

常用于单元格左右滑删除等手势操作

### 基础用法

```html
<template>
  <vin-swipe>
    <vin-cell round-radius="0" desc="左滑删除" />
    <template #right>
      <vin-button shape="square" style="height:100%" type="danger">删除</vin-button>
    </template>
  </vin-swipe>
</template>
```

### 禁止滑动

```html
<template>
  <vin-swipe disabled>
    <vin-cell round-radius="0" desc="禁止滑动" />
    <template #right>
      <vin-button shape="square" style="height:100%" type="danger">删除</vin-button>
    </template>
  </vin-swipe>
</template>
```

### 左右滑动

```html
<template>
  <vin-swipe>
    <template #left>
      <vin-button shape="square" style="height:100%" type="success">选择</vin-button>
    </template>
    <vin-cell round-radius="0" desc="左滑右滑都可以哦" />
    <template #right>
      <vin-button shape="square" style="height:100%" type="danger">删除</vin-button>
      <vin-button shape="square" style="height:100%" type="info">收藏</vin-button>
    </template>
  </vin-swipe>
</template>
```

### 异步控制

按需加载方式需要单独引入`switch`组件

```html
<template>
  <vin-swipe ref="refSwipe" @open="open" @close="close">
    <vin-cell title="异步打开关闭">
      <template v-slot:link>
        <vin-switch v-model="checked" @change="changSwitch" active-text="开" inactive-text="关" />
      </template>
    </vin-cell>
    <template #right>
      <vin-button shape="square" style="height:100%" type="danger">删除</vin-button>
    </template>
  </vin-swipe>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const refSwipe = ref<HTMLElement>();
      const checked = ref(false);
      const changSwitch = (value: boolean) => {
        if (value) {
          refSwipe.value?.open('left');
        } else {
          refSwipe.value?.close();
        }
      };
      const open = (obj: any) => {
        console.log(obj);
        checked.value = true;
      };
      const close = () => {
        checked.value = false;
      };
      return {
        checked,
        changSwitch,
        refSwipe,
        open,
        close,
      };
    },
  };
</script>
```

### 自定义

按需加载方式需要单独引入`input-number`组件

```html
<template>
  <vin-swipe>
    <template #left>
      <vin-button shape="square" style="height:100%" type="success">选择</vin-button>
    </template>
    <vin-cell title="商品描述">
      <template v-slot:link>
        <vin-input-number v-model="number" />
      </template>
    </vin-cell>
    <template #right>
      <vin-button shape="square" style="height:100%" type="danger">删除</vin-button>
      <vin-button shape="square" style="height:100%" type="info">收藏</vin-button>
    </template>
  </vin-swipe>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const number = ref(0);
      return { number };
    },
  };
</script>
```

### Props

| 参数                        | 说明                 | 类型    | 默认值 |
| --------------------------- | -------------------- | ------- | ------ |
| name                        | 唯一标识             | String  | -      |
| disabled                    | 是否禁用滑动         | String  | false  |
| touch-move-prevent-default  | 是否阻止滑动事件行为 | boolean | false  |
| touch-move-stop-propagation | 是否阻止滑动事件冒泡 | boolean | false  |

### Events

| 事件名 | 说明       | 回调参数               |
| ------ | ---------- | ---------------------- |
| open   | 打开时触发 | {type:'left or right'} |
| close  | 关闭时触发 | {type:'left or right'} |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| left    | 左侧滑动内容 |
| default | 自定义内容   |
| right   | 右侧滑动内容 |

### 方法

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html) 可以获取到 Swipe 实例并调用实例方法。

| 方法名 | 说明             | 参数          |
| ------ | ---------------- | ------------- |
| open   | 打开单元格侧边栏 | left or right |
| close  | 收起单元格侧边栏 |               |
