<template>
  <view class="demo full">
    <view class="h2">基础用法</view>
    <vin-grid>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
    </vin-grid>

    <view class="h2">自定义列数</view>
    <vin-grid :column-num="3">
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
    </vin-grid>

    <view class="h2">正方形格子</view>
    <vin-grid :column-num="3" square>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
    </vin-grid>

    <view class="h2">格子间距</view>
    <vin-grid :gutter="10">
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
    </vin-grid>

    <view class="h2">内容翻转</view>
    <vin-grid reverse>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
    </vin-grid>

    <view class="h2">内容横向</view>
    <vin-grid direction="horizontal">
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
    </vin-grid>

    <view class="h2">图标颜色/大小</view>
    <vin-grid :column-num="3" icon-color="#fa2c19">
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
      <vin-grid-item
        icon="fabulous"
        icon-color="#478EF2"
        icon-size="40"
        text="文字"
      ></vin-grid-item>
      <vin-grid-item icon="fabulous" text="文字"></vin-grid-item>
    </vin-grid>

    <view class="h2">页面导航</view>
    <vin-grid :column-num="2">
      <vin-grid-item icon="home" text="路由跳转 ’/‘ " to="/pages/index/index"></vin-grid-item>
      <vin-grid-item
        icon="search"
        text="redirectTo 方式跳转"
        replace
        to="/pages/index/index"
      ></vin-grid-item>
    </vin-grid>

    <view class="h2">自定义内容</view>
    <vin-grid :border="false">
      <vin-grid-item v-for="i in 4" :key="i">
        <vin-avatar
          size="large"
          icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
        />
      </vin-grid-item>
    </vin-grid>
  </view>
</template>

<script lang="ts">
import { createComponent } from '@vin/uni-ui/common/create';

const { createDemo } = createComponent('grid');
export default createDemo({
  props: {},
  setup() {
    return {};
  },
});
</script>
