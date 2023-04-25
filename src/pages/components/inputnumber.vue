<template>
  <app-page-layout title="数字输入框">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-cell>
      <vin-input-number v-model="state.val1" />
    </vin-cell>
    <view class="h2">{{ translate('step') }}</view>
    <vin-cell>
      <vin-input-number v-model="state.val2" step="5" />
    </vin-cell>
    <view class="h2">{{ translate('limit') }}</view>
    <vin-cell>
      <vin-input-number v-model="state.val3" @overlimit="overlimit" min="10" max="20" />
    </vin-cell>
    <view class="h2">{{ translate('disable') }}</view>
    <vin-cell>
      <vin-input-number v-model="state.val4" disabled />
    </vin-cell>
    <view class="h2">{{ translate('readonly') }}</view>
    <vin-cell>
      <vin-input-number v-model="state.val5" readonly />
    </vin-cell>
    <view class="h2">{{ translate('decimal') }}</view>
    <vin-cell>
      <vin-input-number v-model="state.val6" step="0.1" decimal-places="1" readonly />
    </vin-cell>
    <view class="h2">{{ translate('asyc') }}</view>
    <vin-cell>
      <vin-input-number :model-value="state.val8" @change="onChange" />
    </vin-cell>
    <view class="h2">{{ translate('size') }}</view>
    <vin-cell>
      <vin-input-number v-model="state.val7" button-size="30" input-width="50" />
    </vin-cell>
  </app-page-layout>
</template>

<script lang="ts">
import { reactive, getCurrentInstance } from 'vue';
import { createComponent } from '@/utils/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('input-number');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    step: '步长设置',
    limit: '限制输入范围',
    disable: '禁用操作',
    readonly: '只读禁用输入框',
    decimal: '支持小数',
    asyn: '支持异步修改',
    size: '自定义按钮大小',
    content1: '异步演示 2 秒后更改',
    content2: '超出限制事件触发',
  },
  'en-US': {
    basic: 'Basic Usage',
    step: 'Step size setting',
    limit: 'Limit input range',
    disable: 'Disable operation',
    readonly: 'Read only disable input box',
    decimal: 'Support decimal',
    asyc: 'Support asynchronous modification',
    size: 'Custom button size',
    content1: 'Asynchronous presentation changes in 2 seconds',
    content2: 'Trigger of limit exceeding event',
  },
});
export default createDemo({
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();

    const state = reactive({
      val1: 1,
      val2: 0,
      val3: 10,
      val4: 0,
      val5: 1,
      val6: 5.5,
      val7: 1,
      val8: 1,
      step: 1.1,
    });

    const onChange = (value: number) => {
      // proxy.$toast.loading(translate('content1'));
      uni.showToast({ title: translate('content1') });
      setTimeout(() => {
        state.val8 = value;
        // proxy.$toast.hide();
        uni.hideToast();
      }, 2000);
    };

    const overlimit = () => {
      uni.showToast({ title: translate('content2') });
      // proxy.$toast.warn(translate('content2'));
    };

    return {
      state,
      onChange,
      overlimit,
      translate,
    };
  },
});
</script>

<style lang="scss" scoped></style>
