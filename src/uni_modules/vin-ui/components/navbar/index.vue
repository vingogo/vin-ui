<template>
  <view :class="mainClass" :style="mainStyle">
    <view class="vin-navbar__left">
      <vin-icon v-if="leftShow" color="#979797" name="left" @click="handleLeft"></vin-icon>
      <slot name="left"></slot>
    </view>
    <view class="vin-navbar__title">
      <view v-if="title" @click="handleCenter">{{ title }}</view>
      <vin-icon v-if="titIcon" class="icon" :name="titIcon" @click="handleCenterIcon"></vin-icon>
      <slot name="content"></slot>
    </view>

    <view class="vin-navbar__right">
      <view v-if="desc" class="right_text" @click="handleRight">{{ desc }}</view>
      <slot name="right"></slot>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import { createComponent } from '../common/create';
import { navbarProps } from './common';

const { componentName, create, useVinContext } = createComponent('navbar');
export default create({
  props: navbarProps,
  emits: ['on-click-back', 'on-click-title', 'on-click-icon', 'on-click-right'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { fixed, safeAreaInsetTop } = toRefs(props);

    const mainClass = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        [`${prefixCls}--fixed`]: fixed.value,
        [`${prefixCls}--safe-area-inset-top`]: safeAreaInsetTop.value,
      });
    });

    const mainStyle = computed(() =>
      getMainStyle({
        zIndex: props.zIndex,
      })
    );

    const handleLeft = () => {
      emit('on-click-back');
    };

    const handleCenter = () => {
      emit('on-click-title');
    };
    const handleCenterIcon = () => {
      emit('on-click-icon');
    };

    const handleRight = () => {
      emit('on-click-right');
    };

    return {
      mainStyle,
      mainClass,
      handleLeft,
      handleCenter,
      handleCenterIcon,
      handleRight,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
