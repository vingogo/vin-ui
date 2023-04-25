<template>
  <app-page-layout title="评分">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-rate v-model="state.val" />

    <view class="h2">{{ translate('title1') }}</view>
    <vin-rate allow-half v-model="state.val1"></vin-rate>

    <view class="h2">{{ translate('title2') }}</view>
    <vin-rate checked-icon="heart-fill1" unchecked-icon="heart" v-model="state.val2"></vin-rate>

    <view class="h2">{{ translate('title3') }}</view>
    <vin-rate :count="6" v-model="state.val3"></vin-rate>

    <view class="h2">{{ translate('title4') }}</view>
    <vin-rate active-color="#FFC800" v-model="state.val4"></vin-rate>

    <view class="h2">{{ translate('title5') }}</view>
    <vin-rate disabled v-model="state.val5"></vin-rate>

    <view class="h2">{{ translate('title6') }}</view>
    <vin-rate v-model="state.val6" readonly></vin-rate>

    <view class="h2">{{ translate('title7') }}</view>
    <vin-rate v-model="state.val7" @change="onChange"></vin-rate>

    <view class="h2">{{ translate('title8') }}</view>
    <vin-rate v-model="state.val8" icon-size="35"></vin-rate>
  </app-page-layout>
</template>

<script lang="ts">
import { reactive, getCurrentInstance } from 'vue';

import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('rate');
useTranslate({
  'zh-CN': {
    basic: '基本用法',
    title1: '半星',
    title2: '自定义 icon',
    title3: '自定义数量',
    title4: '自定义颜色',
    title5: '禁用状态',
    title6: '只读状态',
    title7: '绑定事件',
    title8: '自定义尺寸 35px',
  },
  'en-US': {
    basic: 'Basic Usage',
    title1: 'Half Star',
    title2: 'Custom icon',
    title3: 'Custom quantity',
    title4: 'Custom color',
    title5: 'disabled state',
    title6: 'read-only status',
    title7: 'bind event',
    title8: 'Custom size 35px',
  },
});
export default createDemo({
  setup() {
    const { proxy } = getCurrentInstance();

    const state = reactive({
      val: 3,
      val1: 3.5,
      val2: 3,
      val3: 3,
      val4: 3,
      val5: 3,
      val6: 3,
      val7: 3,
      val8: 3,
    });
    const onChange = (val) => {
      proxy.$toast.text(val);
    };
    return {
      state,
      onChange,
      translate,
    };
  },
});
</script>

<style lang="scss" scoped></style>
