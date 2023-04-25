<template>
  <app-page-layout title="滑动手势" custom-class="full">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-swipe>
      <vin-cell round-radius="0" :desc="translate('leftDel')" />
      <template #right>
        <vin-button shape="square" custom-style="height: 100%" type="danger">{{
          translate('delete')
        }}</vin-button>
      </template>
    </vin-swipe>
    <view class="h2">{{ translate('disable') }}</view>
    <vin-swipe disabled>
      <vin-cell round-radius="0" :desc="translate('disable')" />
      <template #right>
        <vin-button shape="square" custom-style="height: 100%" type="danger">{{
          translate('delete')
        }}</vin-button>
      </template>
    </vin-swipe>
    <view class="h2">{{ translate('swipeLR') }}</view>
    <vin-swipe>
      <template #left>
        <vin-button shape="square" custom-style="height: 100%" type="success">{{
          translate('select')
        }}</vin-button>
      </template>
      <vin-cell round-radius="0" :desc="translate('swipeLRDesc')" />
      <template #right>
        <view style="height: 100%">
          <vin-button shape="square" custom-style="height: 100%" type="danger">{{
            translate('delete')
          }}</vin-button>
          <vin-button shape="square" custom-style="height: 100%" type="info">{{
            translate('collect')
          }}</vin-button>
        </view>
      </template>
    </vin-swipe>
    <view class="h2">{{ translate('async') }}</view>
    <vin-swipe ref="refSwipe" @open="open" @close="close">
      <vin-cell :title="translate('asyncDesc')">
        <template v-slot:link>
          <vin-switch
            v-model="checked"
            @change="changSwitch"
            :active-text="translate('open')"
            :inactive-text="translate('close')"
          />
        </template>
      </vin-cell>
      <template #right>
        <vin-button shape="square" custom-style="height: 100%" type="danger">{{
          translate('delete')
        }}</vin-button>
      </template>
    </vin-swipe>
    <view class="h2">{{ translate('custom') }}</view>
    <vin-swipe>
      <template #left>
        <vin-button shape="square" custom-style="height: 100%" type="success">{{
          translate('select')
        }}</vin-button>
      </template>
      <vin-cell :title="translate('desc')">
        <template v-slot:link>
          <vin-input-number v-model="number" />
        </template>
      </vin-cell>
      <template #right>
        <view style="height: 100%">
          <vin-button shape="square" custom-style="height: 100%" type="danger">{{
            translate('delete')
          }}</vin-button>
          <vin-button shape="square" custom-style="height: 100%" type="info">{{
            translate('collect')
          }}</vin-button>
        </view>
      </template>
    </vin-swipe>
  </app-page-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('swipe');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    leftDel: '左滑删除',
    disable: '禁用滑动',
    swipeLR: '左右滑动',
    swipeLRDesc: '左滑右滑都可以哦',
    async: '异步控制',
    asyncDesc: '异步打开关闭',
    open: '开',
    close: '关',
    custom: '自定义',
    desc: '商品描述',
    delete: '删除',
    select: '选择',
    collect: '收藏',
  },
  'en-US': {
    basic: 'Basic Usage',
    leftDel: 'Swipe left to delete',
    disable: 'Disable swipe',
    swipeLR: 'Swipe left and right',
    swipeLRDesc: 'You can swipe left and right',
    async: 'Async control swipe',
    asyncDesc: 'Async on and off',
    open: 'on',
    close: 'off',
    custom: 'Custom',
    desc: 'product description',
    delete: 'Delelte',
    select: 'Select',
    collect: 'Collect',
  },
});
export default createDemo({
  props: {},
  setup() {
    const refSwipe = ref<HTMLElement>();
    const checked = ref(false);
    const number = ref(0);
    const changSwitch = (value: boolean) => {
      if (value) {
        refSwipe.value?.open('left');
      } else {
        refSwipe.value?.close();
      }
    };
    const open = (obj: any) => {
      checked.value = true;
    };
    const close = () => {
      checked.value = false;
    };
    return { checked, number, changSwitch, refSwipe, open, close, translate };
  },
});
</script>

<style lang="scss" scoped></style>
