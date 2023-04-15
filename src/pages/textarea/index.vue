<template>
  <view class="demo full">
    <view class="h2">基础用法</view>
    <vin-textarea v-model="value" />
    <view class="h2">显示字数统计</view>
    <vin-textarea v-model="value2" limit-show max-length="20" />
    <view class="h2">高度自定义，拉伸</view>
    <vin-textarea v-model="value3" :rows="1" autosize />
    <view class="h2">只读</view>
    <vin-textarea readonly model-value="textarea只读状态" />
    <view class="h2">禁用</view>
    <vin-textarea disabled model-value="textarea禁用状态" limit-show max-length="20" />
    <view class="h2">自动获取焦点</view>
    <vin-textarea autofocus v-model="value4" />
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('textarea');
export default createDemo({
  setup() {
    const value = ref('');
    const value2 = ref('');
    const value3 = ref('');
    const value4 = ref('');

    return {
      value,
      value2,
      value3,
      value4,
    };
  },
});
</script>

<style lang="scss" scoped></style>
