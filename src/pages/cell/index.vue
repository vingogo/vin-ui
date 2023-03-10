<template>
  <view class="demo">
    <view class="h2">{{ translate('basic') }}</view>
    <vin-cell :title="translate('title')" :desc="translate('desc')"></vin-cell>
    <vin-cell
      :title="translate('title')"
      :sub-title="translate('title1')"
      :desc="translate('desc')"
    ></vin-cell>
    <vin-cell :title="translate('title3')" @click="testClick"></vin-cell>
    <vin-cell :title="translate('title4')" round-radius="0"></vin-cell>

    <view class="h2">{{ translate('title2') }}</view>

    <vin-cell :title="translate('title')" :desc="translate('desc')">
      <view>{{ translate('content') }}</view>
    </vin-cell>

    <vin-cell-group :title="translate('title5')" :desc="translate('desc1')">
      <vin-cell :title="translate('link')" is-link></vin-cell>
      <vin-cell :title="translate('routerJump')" to="/"></vin-cell>
    </vin-cell-group>

    <vin-cell-group :title="translate('customRight')">
      <vin-cell title="Switch">
        <template v-slot:link>
          <vin-switch v-model="switchChecked" />
        </template>
      </vin-cell>
    </vin-cell-group>

    <vin-cell-group :title="translate('customLeftIcon')">
      <vin-cell :title="translate('image')">
        <template v-slot:icon>
          <img
            class="vin-icon"
            style="width: 30px; height: 30px"
            src="https://vingogo.cn/docs/images/logo.png"
          />
        </template>
      </vin-cell>
    </vin-cell-group>

    <view class="h2">{{ translate('displayIcon') }}</view>
    <vin-cell :title="translate('name')" icon="my" :desc="translate('desc')" isLink> </vin-cell>
    <view class="h2">{{ translate('title6') }}</view>
    <vin-cell desc-text-align="left" :desc="translate('desc')"></vin-cell>
  </view>
</template>

<script lang="ts">
import { ref } from 'vue';

import { createComponent } from '@vin/uni-ui/common/create';
import { useTranslate } from '@/hooks/useTranslate';

const { createDemo, translate } = createComponent('cell');

useTranslate({
  'zh-CN': {
    basic: '基本用法',
    desc: '描述文字',
    desc1: '使用 vin-cell-group 支持 title desc slots',
    title: '我是标题',
    title1: '副标题描述',
    title2: '直接使用插槽(slot)',
    title3: '点击测试',
    title4: '圆角设置 0',
    title5: '链接 | 分组用法',
    title6: '只展示 desc ，可通过 desc-text-align 调整内容位置',
    link: '链接',
    routerJump: '路由跳转 ’/‘ ',
    name: '姓名',
    image: '图片',
    content: '自定义内容',
    customRight: '自定义右侧箭头区域',
    customLeftIcon: '自定义左侧 Icon 区域',
    displayIcon: '展示图标',
  },
  'en-US': {
    basic: 'Basic Usage',
    desc: 'Description',
    desc1: 'Usage vin-cell-group support title desc slots',
    title: 'Title',
    title1: 'Subtitle Description',
    title2: 'Use Slots',
    title3: 'Click Test',
    title4: 'Round Radius 0',
    title5: 'Link | CellGroup Usage',
    title6: 'Only display desc , you can adjust the content position through desc-text-align',
    link: 'Link',
    routerJump: 'Router Jump ’/‘ ',
    name: 'Name',
    image: 'Image',
    content: 'Content',
    customRight: 'Customize the right arrow area',
    customLeftIcon: 'Customize the left Icon area',
    displayIcon: 'Display Icon',
  },
});
export default createDemo({
  setup() {
    const testClick = (event: Event) => {
      console.log('Click Test');
    };
    const switchChecked = ref(true);
    return { testClick, switchChecked, translate };
  },
});
</script>

<style lang="scss" scoped></style>
