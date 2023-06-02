<template>
  <view
    :class="['page-layout', 'demo', 'font-1', 'theme-light', customClass]"
    :style="{ paddingTop }"
  >
    <vin-navbar
      custom-class="navbar"
      :z-index="2"
      fixed
      safe-area-inset-top
      @on-click-back="goBack"
      :title="title"
    >
      <template #left>
        <view>返回</view>
      </template>
    </vin-navbar>

    <slot />
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { useShareAppMessage, useShareTimeline } from '@/hooks/useShare';

const entryPath = '/pages/index/index';

export default {
  onShareAppMessage: () => {
    return {
      title: 'AI智能私人小助理:AI助手，智能办公小程序，小红书、大众点评、日报、节日祝福等',
      path: entryPath,
      success: (res: any) => {
        // 转发成功
        console.log('转发成功', res);
      },
      fail: (error: any) => {
        // 转发失败
        console.log('转发失败', error);
      },
    };
  },

  onShareTimeline: () => {
    return {
      title: 'AI智能私人小助理',
      path: entryPath,
    };
  },

  props: {
    title: String,
    customClass: String,
  },

  setup(props) {
    useShareTimeline({ title: `VinUI: ${props.title}` });
    useShareAppMessage({ title: `VinUI: ${props.title}` });

    const paddingTop = computed(
      () => `calc(${uni.getSystemInfoSync().statusBarHeight}px + var(--vin-navbar-height, 46px))`
    );

    const goBack = () => {
      uni.navigateBack();
    };

    return {
      goBack,
      paddingTop,
    };
  },
};
</script>
