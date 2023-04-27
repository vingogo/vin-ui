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

export default {
  props: {
    title: String,
    customClass: String,
  },
  setup() {
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
