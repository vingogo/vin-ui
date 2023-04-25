<template>
  <demo-page-layout title="布局">
    <view class="h2">基础布局</view>
    <view class="box-item">
      <vin-row>
        <vin-col :span="24">
          <view class="flex-content">span:24</view>
        </vin-col>
      </vin-row>
      <vin-row>
        <vin-col :span="12">
          <view class="flex-content">span:12</view>
        </vin-col>
        <vin-col :span="12">
          <view class="flex-content flex-content-light">span:12</view>
        </vin-col>
      </vin-row>
      <vin-row>
        <vin-col :span="8">
          <view class="flex-content">span:8</view>
        </vin-col>
        <vin-col :span="8">
          <view class="flex-content flex-content-light">span:8</view>
        </vin-col>
        <vin-col :span="8">
          <view class="flex-content">span:8</view>
        </vin-col>
      </vin-row>
      <vin-row>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content flex-content-light">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
      </vin-row>
    </view>
    <view class="h2">分栏间隔</view>
    <view class="box-item">
      <vin-row :gutter="10">
        <vin-col :span="8">
          <view class="flex-content">span:8</view>
        </vin-col>
        <vin-col :span="8">
          <view class="flex-content flex-content-light">span:8</view>
        </vin-col>
        <vin-col :span="8">
          <view class="flex-content">span:8</view>
        </vin-col>
      </vin-row>
    </view>
    <view class="h2">Flex布局</view>
    <view class="box-item">
      <vin-row type="flex" wrap="nowrap">
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content flex-content-light">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
      </vin-row>
      <vin-row type="flex" justify="center">
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content flex-content-light">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
      </vin-row>
      <vin-row type="flex" justify="end">
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content flex-content-light">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
      </vin-row>
      <vin-row type="flex" justify="space-between">
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content flex-content-light">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
      </vin-row>
      <vin-row type="flex" justify="space-around">
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content flex-content-light">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
      </vin-row>
      <vin-row type="flex" justify="space-evenly">
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content flex-content-light">span:6</view>
        </vin-col>
        <vin-col :span="6">
          <view class="flex-content">span:6</view>
        </vin-col>
      </vin-row>
    </view>
  </demo-page-layout>
</template>

<script lang="ts">
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('layout');

export default createDemo({});
</script>

<style lang="scss">
.box-item {
  background: #fff;
  margin-bottom: 20px;
  padding: 20px 0;
}
.demo .vin-row {
  overflow: hidden;
  &:not(:last-child) .vin-col {
    margin-bottom: 15px;
  }
}
.flex-content {
  line-height: 40px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  background: #ff8881;
  &.flex-content-light {
    background: #ffc7c4;
  }
  &.flex-content-height {
    height: 50px;
  }
}
</style>
