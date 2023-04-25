<template>
  <demo-page-layout title="搜索栏" custom-class="full">
    <view class="h2">基础用法</view>
    <vin-searchbar v-model="searchValue"> </vin-searchbar>

    <view class="h2">搜索事件监听</view>
    <vin-searchbar v-model="searchValue1" @search="search"> </vin-searchbar>

    <view class="h2">显示搜索 icon</view>
    <vin-searchbar v-model="searchValue2">
      <template v-slot:leftin>
        <vin-icon size="14" name="search2"></vin-icon>
      </template>
    </vin-searchbar>

    <view class="h2">右侧添加搜索文字</view>
    <vin-searchbar v-model="searchValue3">
      <template v-slot:rightout> 搜索 </template>
    </vin-searchbar>

    <view class="h2">更改输入框内部及外部的背景样式</view>
    <vin-searchbar
      v-model="searchValue4"
      background="linear-gradient(to right, #9866F0, #EB4D50)"
      input-background="#fff"
    >
    </vin-searchbar>

    <view class="h2">显示全部 icon</view>
    <vin-searchbar v-model="searchValue5">
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
  </demo-page-layout>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('searchbar');
export default createDemo({
  props: {},
  setup() {
    const state = reactive({
      searchValue: '',
      searchValue1: '',
      searchValue2: '',
      searchValue3: '',
      searchValue4: '',
      searchValue5: '',
    });

    const search = function (e: any) {
      uni.showToast({ title: '搜索触发' });
    };

    const clickLeft = function () {
      uni.showToast({ title: '点击回退按钮' });
    };

    return {
      clickLeft,
      search,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped></style>
