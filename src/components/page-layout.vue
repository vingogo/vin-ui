<template>
  <view :class="['page-layout', 'demo', 'font-1', 'theme-light', customClass]">
    <vin-navbar custom-class="navbar" :z-index="2" fixed @on-click-back="goBack" :title="title">
      <template #left>
        <view>返回</view>
      </template>
    </vin-navbar>

    <slot />
  </view>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
    customClass: String,
  },
  setup() {
    const goBack = () => {
      uni.navigateBack();
    };

    return {
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-layout {
  padding-top: 46px;
}
</style>
