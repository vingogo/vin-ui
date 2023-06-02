<template>
  <app-page-layout title="徽章">
    <view class="h2">默认用法</view>
    <vin-row>
      <vin-badge :value="8">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge :value="76">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge value="NEW">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge dot>
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
    </vin-row>
    <view class="h2">最大值</view>
    <vin-row>
      <vin-badge :value="200" :max="9">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge :value="200" :max="20">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge :value="200" :max="99">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
    </vin-row>

    <view class="h2">自定义颜色</view>
    <vin-row>
      <vin-badge
        :value="8"
        color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)"
      >
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge
        :value="76"
        color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)"
      >
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge
        value="NEW"
        color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)"
      >
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge dot color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
    </vin-row>

    <view class="h2">自定义徽标内容</view>
    <vin-row>
      <vin-badge>
        <template #icons>
          <vin-icon name="Check" color="#ffffff" size="12"></vin-icon>
        </template>
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge>
        <template #icons>
          <vin-icon name="link" color="#ffffff" size="12"></vin-icon>
        </template>
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge>
        <template #icons>
          <vin-icon name="download" color="#ffffff" size="12"></vin-icon>
        </template>
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
    </vin-row>

    <view class="h2">自定义位置</view>
    <vin-row>
      <vin-badge :value="8" top="5" right="5">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge :value="76" top="10" right="10">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
      <vin-badge value="NEW">
        <vin-avatar icon="my" shape="square"></vin-avatar>
      </vin-badge>
    </vin-row>

    <view class="h2">独立展示</view>
    <vin-row>
      <vin-badge :value="8"> </vin-badge>
      <vin-badge :value="76"> </vin-badge>
      <vin-badge value="NEW"> </vin-badge>
    </vin-row>
  </app-page-layout>
</template>

<script>
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('badge');

export default createDemo({});
</script>

<style lang="scss">
.vin-badge {
  margin-right: 40px;
}
</style>
