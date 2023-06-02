# Rate 评分

### 介绍

用于快速的评级操作，或对评价进行展示。

### 基础用法

```html
<template>
  <vin-rate v-model="value" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(3);
      return { value };
    },
  };
</script>
```

### 半星

```html
<template>
  <vin-rate allow-half v-model="value"></vin-rate>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(3.5);
      return { value };
    },
  };
</script>
```

### 自定义 icon

```html
<template>
  <vin-rate checked-icon="heart-fill1" unchecked-icon="heart" v-model="value" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(3);
      return { value };
    },
  };
</script>
```

### 自定义数量

```html
<template>
  <vin-rate :count="6" v-model="value" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(3);
      return { value };
    },
  };
</script>
```

### 自定义颜色

```html
<template>
  <vin-rate active-color="#FFC800" v-model="value" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(3);
      return { value };
    },
  };
</script>
```

### 禁用状态

```html
<template>
  <vin-rate disabled v-model="value" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(3);
      return { value };
    },
  };
</script>
```

### 只读

```html
<template>
  <vin-rate v-model="value" readonly />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(3);
      return { value };
    },
  };
</script>
```

### 绑定事件

```html
<template>
  <vin-rate v-model="value" @change="onChange" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  import { Toast } from '@vingogo/uni-ui';
  export default {
    setup() {
      const value = ref(3);
      const onChange = (val) => {
        Toast.text(val);
      };
      return { value, onChange };
    },
  };
</script>
```

### 自定义尺寸

```html
<template>
  <vin-rate v-model="value" icon-size="35" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  import { Toast } from '@vingogo/uni-ui';
  export default {
    setup() {
      const value = ref(3);
      return { value };
    },
  };
</script>
```

## Prop

| 字段            | 说明                                                   | 类型    | 默认值         |
| --------------- | ------------------------------------------------------ | ------- | -------------- |
| v-model         | 当前 star 数，可使用 v-model 双向绑定数据              | Number  | -              |
| count           | star 总数                                              | Number  | 5              |
| icon-size       | star 大小                                              | Number  | 18             |
| active-color    | 图标选中颜色                                           | String  | #fa200c        |
| void-color      | 图标未选中颜色                                         | String  | #ccc           |
| unchecked-icon  | 使用图标(未选中)[图标名称](/docs/components/icon.html) | String  | star-n         |
| checked-icon    | 使用图标(选中)[图标名称](/docs/components/icon.html)   | String  | star-fill-n    |
| font-class-name | 自定义 icon 字体基础类名                               | String  | `vin-iconfont` |
| class-prefix    | 自定义 icon 类名前缀，用于使用自定义图标               | String  | `vin-icon`     |
| allow-half      | 是否半星                                               | Boolean | false          |
| readonly        | 是否只读                                               | Boolean | false          |
| disabled        | 是否禁用                                               | Boolean | false          |
| spacing         | 间距                                                   | Number  | 14             |

## Event

| 字段   | 说明                       | 回调参数 |
| ------ | -------------------------- | -------- |
| change | 当前分值修改时时触发的事件 | 当前值   |
