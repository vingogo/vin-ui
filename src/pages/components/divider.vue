<template>
  <app-page-layout title="分割线" custom-class="full bg-w">
    <view class="h2">基础用法</view>
    <vin-divider />
    <view class="h2">展示文本</view>
    <vin-divider>文本</vin-divider>
    <view class="h2">内容位置</view>
    <vin-divider content-position="left">文本</vin-divider>
    <vin-divider content-position="right">文本</vin-divider>
    <view class="h2">虚线</view>
    <vin-divider dashed>文本</vin-divider>
    <view class="h2">自定义样式</view>
    <vin-divider
      :customStyle="{
        color: '#1989fa',
        borderColor: '#1989fa',
        padding: '0 16px',
      }"
      >文本</vin-divider
    >
  </app-page-layout>
</template>

<script lang="ts">
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('divider');
export default createDemo({
  props: {},
  setup() {
    return {};
  },
});
</script>
