# Checkbox 复选按钮

### 介绍

多选按钮用于选择。

### 基本用法

```html
<template>
  <vin-checkbox v-model="checkbox1" label="复选框">复选框</vin-checkbox>
  <vin-checkbox v-model="checkbox2" text-position="left">复选框</vin-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox1: false,
        checkbox2: false,
      });
      return { ...toRefs(state) };
    },
  };
</script>
<style lang="scss" scoped>
  .vin-checkbox {
    display: flex;
    margin-right: 20px;
    .vin-checkbox__label {
      margin-left: 10px;
    }
  }
</style>
```

### 禁用状态

```html
<template>
  <vin-checkbox v-model="checkbox3" disabled>未选时禁用状态</vin-checkbox>
  <vin-checkbox v-model="checkbox4" disabled>选中时禁用状态</vin-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox3: false,
        checkbox4: true,
      });
      return { ...toRefs(state) };
    },
  };
</script>
```

### 自定义尺寸

```html
<template>
  <vin-checkbox v-model="checkbox5" icon-size="25">自定义尺寸25</vin-checkbox>
  <vin-checkbox v-model="checkbox6" icon-size="10">自定义尺寸10</vin-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox5: true,
        checkbox6: true,
      });
      return { ...toRefs(state) };
    },
  };
</script>
```

### 自定义图标

这里建议同时设置 `icon-name` 和 `icon-active-name` 属性

```html
<template>
  <vin-checkbox v-model="checkbox7" icon-name="checklist" icon-active-name="checklist"
    >自定义图标</vin-checkbox
  >
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox7: true,
      });
      return { ...toRefs(state) };
    },
  };
</script>
```

### change 事件

值发生变化时，将触发 `change` 事件

```html
<template>
  <vin-checkbox v-model="checkbox" @change="changeBox3">change复选框</vin-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox: false,
      });
      const changeBox3 = (checked: boolean, label: string) => {
        console.log('change事件触发' + checked, label);
      };
      return { ...toRefs(state), changeBox3 };
    },
  };
</script>
```

### checkboxGroup 使用

```html
<template>
  <vin-checkboxgroup v-model="checkboxgroup1">
    <vin-checkbox label="1">组合复选框</vin-checkbox>
    <vin-checkbox label="2">组合复选框</vin-checkbox>
    <vin-checkbox label="3">组合复选框</vin-checkbox>
    <vin-checkbox label="4">组合复选框</vin-checkbox>
  </vin-checkboxgroup>
  <vin-cell>
    <view class="demo-check">当前选中值</view>
    <view>{{ checkboxgroup1 }}</view>
  </vin-cell>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkboxgroup1: ['2', '3'],
      });

      return { ...toRefs(state) };
    },
  };
</script>
```

### checkboxGroup 全选/取消

```html
<template>
  <vin-checkboxgroup v-model="checkboxgroup3" ref="group" @change="changeBox4">
    <vin-checkbox v-for="item in checkboxsource" :key="item.label" :label="item.label"
      >{{item.value}}</vin-checkbox
    >
  </vin-checkboxgroup>
  <span class="btn">
    <vin-button type="primary" @click="toggleAll(true)">全选</vin-button>
    <vin-button type="primary" @click="toggleAll(false)">取消</vin-button>
  </span>
</template>
<script lang="ts">
  import { reactive, toRefs, ref } from 'vue';
  import { Toast } from '@vingogo/uni-ui';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkboxgroup3: ['2'],
        checkboxsource: [
          { label: '1', value: '组合复选框' },
          { label: '2', value: '组合复选框' },
        ],
      });

      const group = ref(null);
      const changeBox4 = (label: any[]) => {
        Toast.text(`${label.length === state.checkboxsource.length ? '全选' : '取消全选'}`);
      };

      const toggleAll = (f: boolean) => {
        (group.value as any).toggleAll(f);
      };

      return { ...toRefs(state), group, changeBox4, toggleAll };
    },
  };
</script>
```

## API

### Checkbox Prop

| 字段                 | 说明                                                                             | 类型           | 默认值           |
| -------------------- | -------------------------------------------------------------------------------- | -------------- | ---------------- |
| v-model              | 是否处于选中状态                                                                 | Boolean        | `false`          |
| disabled             | 是否禁用选择                                                                     | Boolean        | `false`          |
| text-position        | 文本所在的位置，可选值：`left`,`right`                                           | String         | `right`          |
| icon-size            | [图标尺寸](/docs/components/icon.html)                                           | String、Number | `18`             |
| icon-name            | [图标名称](/docs/components/icon.html)，选中前(建议和`icon-active-name`一起修改) | String         | `'check-normal'` |
| icon-active-name     | [图标名称](/docs/components/icon.html)，选中后(建议和`icon-name`一起修改)        | String         | `'checked'`      |
| icon-class-prefix    | 自定义 icon 类名前缀，用于使用自定义图标                                         | String         | `vin-icon`       |
| icon-font-class-name | 自定义 icon 字体基础类名                                                         | String         | `vin-iconfont`   |
| label                | 复选框的文本内容                                                                 | String         | -                |

### CheckboxGroup Prop

| 字段     | 说明                                  | 类型    | 默认值  |
| -------- | ------------------------------------- | ------- | ------- |
| v-model  | 当前选中项的标识符，和 `label` 相对应 | Array   | -       |
| disabled | 是否禁用选择,将用于其下的全部复选框   | Boolean | `false` |

### Checkbox Event

| 字段   | 说明         | 回调参数                                                    |
| ------ | ------------ | ----------------------------------------------------------- |
| change | 值变化时触发 | (state, label),`state`代表当前状态，`label`表示当前选中的值 |

### CheckboxGroup Event

| 字段   | 说明         | 回调参数                                        |
| ------ | ------------ | ----------------------------------------------- |
| change | 值变化时触发 | label,`label`返回一个数组，表示当前选中项的集合 |
