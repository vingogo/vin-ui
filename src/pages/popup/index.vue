<template>
  <view class="demo">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-cell :title="translate('cell1')" is-link @click="state.showBasic = true"></vin-cell>
    <vin-popup
      pop-class="popclass"
      :custom-style="{ padding: '30px 50px' }"
      v-model:visible="state.showBasic"
      :z-index="100"
      >{{ translate('text') }}</vin-popup
    >

    <view class="h2">{{ translate('position') }}</view>
    <vin-cell :title="translate('cell2')" is-link @click="state.showTop = true"></vin-cell>
    <vin-popup
      position="top"
      :custom-style="{ height: '20%' }"
      v-model:visible="state.showTop"
    ></vin-popup>
    <vin-cell :title="translate('cell3')" is-link @click="state.showBottom = true"></vin-cell>
    <vin-popup
      position="bottom"
      :custom-style="{ height: '20%' }"
      v-model:visible="state.showBottom"
    ></vin-popup>
    <vin-cell :title="translate('cell4')" is-link @click="state.showLeft = true"></vin-cell>
    <vin-popup
      position="left"
      :custom-style="{ width: '20%', height: '100%' }"
      v-model:visible="state.showLeft"
    ></vin-popup>
    <vin-cell :title="translate('cell5')" is-link @click="state.showRight = true"></vin-cell>
    <vin-popup
      position="right"
      :custom-style="{ width: '20%', height: '100%' }"
      v-model:visible="state.showRight"
    ></vin-popup>
    <view class="h2">{{ translate('close') }}</view>
    <vin-cell :title="translate('close')" is-link @click="state.showIcon = true"></vin-cell>
    <vin-popup
      position="bottom"
      closeable
      :custom-style="{ height: '20%' }"
      v-model:visible="state.showIcon"
    ></vin-popup>
    <vin-cell
      :title="translate('iposition')"
      is-link
      @click="state.showIconPosition = true"
    ></vin-cell>
    <vin-popup
      position="bottom"
      closeable
      close-icon-position="top-left"
      :custom-style="{ height: '20%' }"
      v-model:visible="state.showIconPosition"
    ></vin-popup>
    <vin-cell :title="translate('cicon')" is-link @click="state.showCloseIcon = true"></vin-cell>
    <vin-popup
      position="bottom"
      closeable
      close-icon-position="top-left"
      close-icon="heart"
      :custom-style="{ height: '20%' }"
      v-model:visible="state.showCloseIcon"
    ></vin-popup>
    <view class="h2">{{ translate('circle') }}</view>
    <vin-cell :title="translate('circle')" is-link @click="state.showRound = true"></vin-cell>
    <vin-popup
      position="bottom"
      closeable
      round
      :custom-style="{ height: '30%' }"
      v-model:visible="state.showRound"
    ></vin-popup>
  </view>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { createComponent } from '@vingogo/uni-ui/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('popup');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    cell1: '展示弹出层',
    text: '正文',
    position: '弹出位置',
    cell2: '顶部弹出',
    cell3: '底部弹出',
    cell4: '左侧弹出',
    cell5: '右侧弹出',
    close: '关闭图标',
    iposition: '图标位置',
    cicon: '自定义图标',
    circle: '圆角弹框',
  },
  'en-US': {
    basic: 'Basic Usage',
    cell1: 'Show pop-up layer',
    text: 'text',
    position: 'Eject position',
    cell2: 'Top pop-up',
    cell3: 'Bottom pop-up',
    cell4: 'Left pop-up',
    cell5: 'Right pop-up',
    close: 'Close icon',
    iposition: 'Icon location',
    cicon: 'Custom icon',
    circle: 'Rounded bullet frame',
  },
});
export default createDemo({
  props: {},
  setup() {
    const state = reactive({
      showBasic: false,
      showTop: false,
      showBottom: false,
      showLeft: false,
      showRight: false,
      showIcon: false,
      showIconPosition: false,
      showCloseIcon: false,
      showRound: false,
      showCombination: false,
    });
    return { state, translate };
  },
});
</script>
