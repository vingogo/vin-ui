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
      title: '京东风格的轻量级 Vue 组件库，支持移动端 H5 和 小程序开发',
      path: entryPath,
      success: () => {
        // 转发成功
        uni.showToast({
          title: '转发成功',
          icon: 'none',
        });
      },
      fail: () => {
        // 转发失败
        uni.showToast({
          title: '转发失败',
          icon: 'none',
        });
      },
    };
  },

  onShareTimeline: () => {
    return {
      title: '京东风格的轻量级 Vue 组件库，支持移动端 H5 和 小程序开发',
      path: entryPath,
    };
  },

  props: {
    title: String,
    customClass: String,
  },

  setup(props) {
    useShareTimeline({
      title: `VinUI: ${props.title}`,
    });
    useShareAppMessage({
      title: `VinUI: ${props.title}`,
    });

    const paddingTop = computed(
      () => `calc(${uni.getSystemInfoSync().statusBarHeight}px + var(--vin-navbar-height, 46px))`,
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
