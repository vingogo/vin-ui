<template>
  <view :class="mainClass" :style="mainStyle">
    <slot v-if="$slots.title" name="title"></slot>
    <view v-else-if="title" class="vin-cell-group__title">{{ title }}</view>
    <slot v-if="$slots.desc" name="desc"></slot>
    <view v-else-if="desc" class="vin-cell-group__desc">{{ desc }}</view>
    <view class="vin-cell-group__warp">
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../../common/create';
import { cellGroupProps } from './common';

const { create, useVinContext } = createComponent('cell-group');

export default create({
  props: cellGroupProps,
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    return {
      mainClass,
      mainStyle,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
