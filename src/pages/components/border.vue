<template>
  <app-page-layout title="边框">
    <view class="demo-container" v-for="(config, index) in borderConfigs" :key="index">
      <view class="h2">{{ config.title }}</view>
      <view class="paragraph">
        <text class="code" v-for="code in config.codes" :key="code">{{ code }}</text>
      </view>
      <view class="demo-box bg-white">
        <view v-for="item in config.list" :key="item.text" :class="['item', item.class]">{{
          item.text
        }}</view>
      </view>
    </view>
  </app-page-layout>
</template>

<script lang="ts">
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('tag');

const borderConfigs = [
  {
    title: '普通边框',
    codes: ['.border-{direction}'],
    list: [
      {
        class: 'border',
        text: '四周全边框',
      },
      {
        class: 'border-top',
        text: '顶部边框',
      },
      {
        class: 'border-right',
        text: '右边边框',
      },
      {
        class: 'border-bottom',
        text: '底部边框',
      },
      {
        class: 'border-left',
        text: '左边边框',
      },
    ],
  },
  {
    title: '粗边框',
    codes: ['.borders-{direction}'],
    list: [
      {
        class: 'borders',
        text: '四周全粗边框',
      },
      {
        class: 'borders-top',
        text: '顶部粗边框',
      },
      {
        class: 'borders-right',
        text: '右边粗边框',
      },
      {
        class: 'borders-bottom',
        text: '底部粗边框',
      },
      {
        class: 'borders-left',
        text: '左边粗边框',
      },
    ],
  },
  {
    title: '虚线边框',
    codes: ['.dashed/.dashed-{direction}'],
    list: [
      {
        class: 'dashed',
        text: '四周全虚线边框',
      },
      {
        class: 'dashed-top',
        text: '顶部虚线边框',
      },
      {
        class: 'dashed-right',
        text: '右边虚线边框',
      },
      {
        class: 'dashed-bottom',
        text: '底部虚线边框',
      },
      {
        class: 'dashed-left',
        text: '左边虚线边框',
      },
    ],
  },
  {
    title: '虚线粗边框',
    codes: ['.dasheds/.dasheds-{direction}'],
    list: [
      {
        class: 'dasheds',
        text: '四周全粗虚线边框',
      },
      {
        class: 'dasheds-top',
        text: '顶部粗虚线边框',
      },
      {
        class: 'dasheds-right',
        text: '右边粗虚线边框',
      },
      {
        class: 'dasheds-bottom',
        text: '底部粗虚线边框',
      },
      {
        class: 'dasheds-left',
        text: '左边粗虚线边框',
      },
    ],
  },
  {
    title: '边框颜色',
    codes: [
      '.border.border-{color}',
      '.borders.border-{color}',
      '.dashed.border-{color}',
      '.dasheds.border-{color}',
    ],
    list: [
      {
        class: 'border border-red',
        text: '红色边框',
      },
      {
        class: 'borders border-blue',
        text: '蓝色边框',
      },
      {
        class: 'dashed border-orange',
        text: '橙色虚线边框',
      },
      {
        class: 'dasheds border-green',
        text: '绿色粗虚线边框',
      },
    ],
  },
  {
    title: '动感边框',
    codes: ['.{border}-shine', '.dasheds-shine', '.dashed-shine.border-blue'],
    list: [
      {
        class: 'dasheds-shine',
        text: '粗虚线边框动画',
      },
      {
        class: 'dashed-shine border-blue',
        text: '蓝色虚线边框动画',
      },
    ],
  },
];

export default createDemo({
  setup() {
    return {
      borderConfigs,
    };
  },
});
</script>

<style lang="scss" scoped>
.demo-box {
  padding: 10px;

  .item {
    box-sizing: border-box;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
</style>
