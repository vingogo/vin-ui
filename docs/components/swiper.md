# Swiper 轮播

### 介绍

常用于一组图片或卡片轮播。

### 安装

```javascript
import { createApp } from 'vue';
import { Swiper } from '@vingogo/uni-ui';

const app = createApp();
app.use(Swiper);
```

### 基础用法

`auto-play` 自动轮播的时长
`init-page` 初始索引值
`pagination-visible` 是否显示分页指示器
`pagination-color` 指示器颜色自定义

```html
<template>
  <vin-swiper
    custom-class="custom-swiper"
    :list="list"
    :init-page="page"
    :pagination-visible="true"
    pagination-color="#426543"
    auto-play="3000"
  >
    <template v-slot:default="{ data }">
      <image :src="data" alt="" />
    </template>
  </vin-swiper>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        page: 2,
        list: [
          'https://via.placeholder.com/375x150/8799a3/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/8dc63f/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/fbbd08/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/a5673f/fff?text=Hello+Vin+UI',
        ],
      });
      return { ...toRefs(state) };
    },
  };
</script>
<style lang="scss" scoped>
  .custom-swiper {
    image {
      width: 100%;
      height: 150px;
    }
  }
</style>
```

### 异步加载

```html
<template>
  <vin-swiper
    custom-class="custom-swiper"
    :list="list"
    :init-page="page"
    :pagination-visible="true"
    pagination-active-color="#f87d09"
    auto-play="2000"
  >
    <template v-slot:default="{ data }">
      <image :src="data" alt="" />
    </template>
  </vin-swiper>
</template>
<script lang="ts">
  import { reactive, toRefs, onMounted } from 'vue';
  export default {
    setup() {
      const state = reactive({
        page: 2,
        list: [] as string[],
      });
      onMounted(() => {
        setTimeout(() => {
          state.list = [
            'https://via.placeholder.com/375x150/8799a3/fff?text=Hello+Vin+UI',
            'https://via.placeholder.com/375x150/8dc63f/fff?text=Hello+Vin+UI',
            'https://via.placeholder.com/375x150/fbbd08/fff?text=Hello+Vin+UI',
            'https://via.placeholder.com/375x150/a5673f/fff?text=Hello+Vin+UI',
          ];
        }, 3000);
      });
      return { ...toRefs(state) };
    },
  };
</script>
<style lang="scss" scoped>
  .custom-swiper {
    image {
      width: 100%;
      height: 150px;
    }
  }
</style>
```

### 动态加载

支持动态增加/删除图片

```html
<template>
  <vin-swiper
    custom-class="custom-swiper"
    :list="list"
    :init-page="page"
    :pagination-visible="true"
    pagination-active-color="#f87d09"
    auto-play="2000"
  >
    <template v-slot:default="{ data }">
      <image :src="data" alt="" />
    </template>
  </vin-swiper>
</template>
<script lang="ts">
  import { reactive, toRefs, onMounted } from 'vue';
  export default {
    setup() {
      const state = reactive({
        page: 2,
        list: [
          'https://via.placeholder.com/375x150/8799a3/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/8dc63f/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/fbbd08/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/a5673f/fff?text=Hello+Vin+UI',
        ],
      });
      onMounted(() => {
        setTimeout(() => {
          state.list.splice(1, 1);
        }, 3000);
      });
      return { ...toRefs(state) };
    },
  };
</script>
<style lang="scss" scoped>
  .custom-swiper {
    image {
      width: 100%;
      height: 150px;
    }
  }
</style>
```

### 自定义大小

`width` 自定义轮播大小

```html
<template>
  <vin-swiper
    custom-class="custom-swiper"
    :list="list"
    :init-page="page2"
    :loop="false"
    width="300"
  >
    <template v-slot:default="{ data }">
      <image :src="data" alt="" />
    </template>
  </vin-swiper>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        page2: 2,
        list: [
          'https://via.placeholder.com/375x150/8799a3/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/8dc63f/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/fbbd08/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/a5673f/fff?text=Hello+Vin+UI',
        ],
      });
      return { ...toRefs(state) };
    },
  };
</script>
<style lang="scss" scoped>
  .custom-swiper {
    image {
      width: 100%;
      height: 150px;
    }
  }
</style>
```

### 自定义分页指示器

`v-slot:page` 表示自定义指示器

```html
<template>
  <vin-swiper
    custom-class="custom-swiper"
    :list="list"
    :init-page="page3"
    :loop="true"
    @change="change"
  >
    <template v-slot:default="{ data }">
      <image :src="data" alt="" />
    </template>
    <template v-slot:page>
      <div class="page">{{ current }}/4</div>
    </template>
  </vin-swiper>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        page3: 0,
        current: 1,
        list: [
          'https://via.placeholder.com/375x150/8799a3/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/8dc63f/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/fbbd08/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/a5673f/fff?text=Hello+Vin+UI',
        ],
      });
      const change = (index: number) => {
        state.current = index + 1;
      };
      return { ...toRefs(state), change };
    },
  };
</script>
<style lang="scss" scoped>
  .custom-swiper {
    image {
      width: 100%;
      height: 150px;
    }
  }
  .page {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 46px;
    height: 22px;
    background-color: rgba(0, 0, 0, 0.33);
    border-radius: 22px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
</style>
```

### 手动切换

可通过 `API`(`prev`,`next`)进行手动切换

```html
<template>
  <view class="demo-box">
    <vin-swiper
      custom-class="custom-swiper"
      :list="list"
      :init-page="page"
      :loop="true"
      ref="swiper"
    >
      <template v-slot:default="{ data }">
        <image :src="data" alt="" />
      </template>
    </vin-swiper>
    <view class="vin-swiper-btns">
      <view class="vin-swiper-btns__left" @click="handlePrev">
        <vin-icon name="left"></vin-icon>
      </view>
      <view class="vin-swiper-btns__left" @click="handleNext">
        <vin-icon name="right"></vin-icon>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
  import { reactive, toRefs, ref, Ref } from 'vue';
  export default {
    setup() {
      const swiper = ref(null) as Ref;
      const state = reactive({
        page: 2,
        list: [
          'https://via.placeholder.com/375x150/8799a3/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/8dc63f/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/fbbd08/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/a5673f/fff?text=Hello+Vin+UI',
        ],
      });
      const handlePrev = () => {
        swiper.value.prev();
      };
      const handleNext = () => {
        swiper.value.next();
      };

      return { ...toRefs(state), swiper, handlePrev, handleNext };
    },
  };
</script>
<style lang="scss" scoped>
  .demo-box {
    position: relative;
  }
  .custom-swiper {
    image {
      width: 100%;
      height: 150px;
    }
  }
  .vin-swiper-btns {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    display: flex;
    justify-content: space-between;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
</style>
```

### 垂直方向

`direction` 自定义轮播方向

```html
<template>
  <vin-swiper
    custom-class="custom-swiper"
    :list="list"
    :init-page="page4"
    :loop="true"
    auto-play="3000"
    direction="vertical"
    height="150"
    :pagination-visible="true"
  >
    <template v-slot:default="{ data }">
      <image :src="data" alt="" />
    </template>
  </vin-swiper>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        page4: 0,
        list: [
          'https://via.placeholder.com/375x150/8799a3/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/8dc63f/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/fbbd08/fff?text=Hello+Vin+UI',
          'https://via.placeholder.com/375x150/a5673f/fff?text=Hello+Vin+UI',
        ],
      });
      return { ...toRefs(state) };
    },
  };
</script>
<style lang="scss" scoped>
  .custom-swiper {
    image {
      width: 100%;
      height: 150px;
    }
  }
</style>
```

## API

### Props

| 参数                    | 说明                                                                                                                                  | 类型           | 默认值               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------- |
| list                    | 用于轮播图 item 的数据                                                                                                                | Array          | -                    |
| width                   | 轮播卡片的宽度                                                                                                                        | Number、String | `auto`               |
| height                  | 轮播卡片的高度                                                                                                                        | String、Number | `auto`               |
| direction               | 轮播方向,可选值`horizontal`,`vertical`                                                                                                | String         | 'horizontal'         |
| pagination-visible      | 分页指示器是否展示                                                                                                                    | Boolean        | false                |
| pagination-color        | 分页指示器颜色                                                                                                                        | String         | 'rgba(0, 0, 0, 0.3)' |
| pagination-active-color | 分页指示器选中的颜色                                                                                                                  | String         | '#000'               |
| loop                    | 是否循环轮播                                                                                                                          | Boolean        | true                 |
| duration                | 动画时长（单位是 ms）                                                                                                                 | Number、String | 500                  |
| auto-play               | 自动轮播时长，0 表示不会自动轮播                                                                                                      | Number、String | 0                    |
| init-page               | 初始化索引值                                                                                                                          | Number、String | 0                    |
| touchable               | 是否可触摸滑动                                                                                                                        | Boolean        | true                 |
| easing-function         | 指定 swiper 切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic (微信小程序、快手小程序、京东小程序) | String         | default              |

### Events

| 事件名 | 说明           | 回调参数         |
| ------ | -------------- | ---------------- |
| change | 滑动之后的回调 | 当前索引值 index |

### Slots

| 名称 | 说明         |
| ---- | ------------ |
| page | 自定义分页器 |

### Swipe 方法

| 事件名 | 说明           | 参数         |
| ------ | -------------- | ------------ |
| prev   | 切换到上一页   | -            |
| next   | 切换到下一页   | -            |
| to     | 切换到指定轮播 | index:number |
