# SearchBar 搜索栏

### 介绍

搜索栏

### 基础用法

```html
<template>
  <vin-searchbar v-model="searchValue"></vin-searchbar>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        searchValue: '',
      });

      return {
        ...toRefs(state),
      };
    },
  };
</script>
```

### 搜索事件监听

```html
<template>
  <vin-searchbar v-model="searchValue" @search="search"></vin-searchbar>
</template>
<script lang="ts">
  import { toRefs, reactive } from 'vue';
  import { Toast } from '@vingogo/uni-ui';
  export default {
    setup() {
      const state = reactive({
        searchValue: '',
      });

      const search = function () {
        Toast.text('搜索触发');
      };

      return {
        ...toRefs(state),
        search,
      };
    },
  };
</script>
```

### 显示搜索 icon

```html
<template>
  <vin-searchbar v-model="searchValue">
    <template v-slot:leftin>
      <vin-icon size="14" name="search2"></vin-icon>
    </template>
  </vin-searchbar>
</template>
<script lang="ts">
  import { toRefs, reactive } from 'vue';
  import { Icon } from '@vingogo/uni-ui';
  export default {
    setup() {
      const state = reactive({
        searchValue: '',
      });

      return {
        ...toRefs(state),
      };
    },
  };
</script>
```

### 右侧添加搜索文字

```html
<template>
  <vin-searchbar v-model="searchValue">
    <template v-slot:rightout> 搜索 </template>
  </vin-searchbar>
</template>
<script lang="ts">
  import { toRefs, reactive } from 'vue';
  export default {
    setup() {
      const state = reactive({
        searchValue: '',
      });

      return {
        ...toRefs(state),
      };
    },
  };
</script>
```

### 更改输入框内部及外部的背景样式

```html
<template>
  <vin-searchbar
    v-model="searchValue4"
    background="linear-gradient(to right, #9866F0, #EB4D50)"
    input-background="#fff"
  >
  </vin-searchbar>
</template>
<script lang="ts">
  import { toRefs, reactive } from 'vue';
  export default {
    setup() {
      const state = reactive({
        searchValue: '',
      });

      return {
        ...toRefs(state),
      };
    },
  };
</script>
```

### 显示全部 icon

```html
<template>
  <vin-searchbar v-model="searchValue">
    <template v-slot:leftout>
      <vin-icon @click="clickLeft" size="20" name="left"></vin-icon>
    </template>
    <template v-slot:leftin>
      <vin-icon size="14" name="search2"></vin-icon>
    </template>
    <template v-slot:rightin>
      <vin-icon size="20" name="photograph"></vin-icon>
    </template>
    <template v-slot:rightout>
      <vin-icon size="20" name="message"></vin-icon>
    </template>
  </vin-searchbar>
</template>
<script lang="ts">
  import { toRefs, reactive } from 'vue';
  import { Icon } from '@vingogo/uni-ui';
  export default {
    setup() {
      const state = reactive({
        searchValue: '',
      });

      return {
        ...toRefs(state),
      };
    },
  };
</script>
```

### Props

| 参数             | 说明                                    | 类型            | 默认值    |
| ---------------- | --------------------------------------- | --------------- | --------- |
| v-model          | 输入框内容，可使用 v-model 双向绑定数据 | String、Number  | -         |
| max-length       | 最大输入长度                            | [Number,String] | '9999'    |
| input-type       | 输入框类型                              | String          | 'text'    |
| placeholder      | 输入框默认暗纹                          | String          | '请输入'  |
| clearable        | 是否展示清除按钮                        | Boolean         | true      |
| background       | 输入框外部背景                          | String          | '#fff'    |
| input-background | 输入框内部背景                          | String          | '#f7f7f7' |

### Events

| 事件名 | 说明                | 回调参数   |
| ------ | ------------------- | ---------- |
| change | 输入内容时触发      | val, event |
| focus  | 聚焦时触发          | val, event |
| blur   | 失焦时触发          | val, event |
| clear  | 点击清空时触发      | val        |
| search | 按下 ENTER 键时触发 | val, event |

## Slots

| 名称     | 说明             |
| -------- | ---------------- |
| leftin   | 输入框内 左 icon |
| leftout  | 输入框外 左 icon |
| rightin  | 输入框内 右 icon |
| rightout | 输入框外 右 icon |
