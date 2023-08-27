<template>
  <app-page-layout title="阴影">
    <!-- 简介 -->
    <view class="h2">简介</view>
    <view class="paragraph">可通过设置类名来控制阴影</view>

    <view class="h2">阴影尺寸</view>
    <view class="paragraph">
      <text class="code">.shadow-{size}</text>
    </view>

    <view class="cols-2">
      <view class="item bg-white shadow-sm">sm</view>
      <view class="item bg-white shadow">df</view>
      <view class="item bg-white shadow-lg">lg</view>
      <view class="item bg-white shadow-inset">inset</view>
    </view>

    <view class="h2">有色阴影</view>
    <view class="paragraph">
      <text class="code">.shadow-{color}</text>
    </view>

    <view class="cols-4">
      <view class="item bg-blue shadow-blue">blue</view>
      <view class="item bg-green shadow-green">green</view>
      <view class="item bg-orange shadow-orange">orange</view>
      <view class="item bg-red shadow-red">red</view>
    </view>

    <view class="h2">根据背景模糊的阴影</view>
    <view class="paragraph">
      <text class="code">.shadow-blur</text>
    </view>

    <view class="item bg-red-gradient shadow-blur">shadow-blur</view>

    <view class="h2">翘边阴影</view>
    <view class="paragraph">
      <text class="code">.shadow-warp</text>
    </view>

    <view class="item bg-white shadow-warp">shadow-warp</view>
  </app-page-layout>
</template>

<script>
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('shadow');

export default createDemo({});
</script>

<style lang="scss" scoped>
@import '@vingogo/uni-ui/lib/styles/extends/index.scss';

.cols-2 {
  display: flex;
  flex-wrap: wrap;

  .item {
    box-sizing: border-box;
    width: calc(100% / 2 - 20px);
    padding: 15px;
    margin: 10px;
    border-radius: 5px;
  }
}

.cols-4 {
  display: flex;
  flex-wrap: wrap;

  .item {
    box-sizing: border-box;
    width: calc(100% / 4 - 20px);
    padding: 15px;
    margin: 10px;
    border-radius: 5px;
    text-align: center;
  }
}

.item {
  box-sizing: border-box;
  padding: 15px;
  border-radius: 5px;
}
</style>
