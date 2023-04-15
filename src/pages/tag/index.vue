<template>
  <view class="demo">
    <vin-cell-group title="基础用法">
      <vin-cell title="primary 类型">
        <template v-slot:link>
          <vin-tag type="primary" @click="click">标签</vin-tag>
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
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('tag');

export default createDemo({
  setup() {
    const show = ref(true);
    const close = () => {
      show.value = false;
    };

    const click = () => {
      uni.showToast({ title: '点击事件' });
    };

    return {
      close,
      click,
      show,
    };
  },
});
</script>
