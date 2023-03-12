<template>
  <view class="demo">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-cell>
      <vin-button type="primary" @click="state.show = true">{{ translate('btn1') }}</vin-button>
      <vin-overlay v-model:visible="state.show" :z-index="2000"></vin-overlay>
    </vin-cell>
    <view class="h2">{{ translate('style') }}</view>
    <vin-cell>
      <vin-button type="primary" @click="state.show3 = true">{{ translate('btn1') }}</vin-button>
      <vin-overlay
        v-model:visible="state.show3"
        :z-index="2000"
        :overlay-style="state.overlayStyle"
      ></vin-overlay>
    </vin-cell>
    <view class="h2">{{ translate('content') }}</view>
    <vin-cell>
      <vin-button type="success" @click="state.show2 = true">{{ translate('btn2') }}</vin-button>
      <vin-overlay v-model:visible="state.show2" :z-index="2000">
        <view class="wrapper">
          <view class="content">{{ translate('text') }}</view>
        </view>
      </vin-overlay>
    </vin-cell>
  </view>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { createComponent } from '@vingogo/uni-ui/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('overlay');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    style: '遮罩样式',
    content: '嵌套内容',
    btn1: '显示遮罩层',
    btn2: '嵌套内容',
    text: '这里是正文',
  },
  'en-US': {
    basic: 'Basic Usage',
    style: 'Mask style',
    content: 'Nested content',
    btn1: 'Show mask layer',
    btn2: 'Nested content',
    text: 'Here is the text',
  },
});
export default createDemo({
  props: {},
  setup() {
    const state = reactive({
      show: false,
      show2: false,
      show3: false,
      overlayStyle: {
        backgroundColor: 'rgba(0, 0, 0, .2)',
      },
    });
    return {
      state,
      translate,
    };
  },
});
</script>

<style lang="scss">
.wrapper {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    width: 150px;
    height: 150px;
    background: #fff;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    color: red;
  }
}
</style>
