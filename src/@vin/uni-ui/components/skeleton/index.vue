<template>
  <view v-if="!loading">
    <slot></slot>
  </view>
  <view v-else :class="mainClass" :style="mainStyle">
    <view class="vin-skeleton-animation" v-if="animated"></view>
    <view class="content">
      <vin-avatar
        v-if="avatar"
        :custom-class="avatarClass"
        :shape="avatarShape"
        :custom-style="getStyle()"
        bg-color="rgb(239, 239, 239)"
      ></vin-avatar>

      <view v-if="Number(row) == 1" :class="blockClass" :style="{ width, height }"> </view>

      <view class="content-line">
        <view v-if="title" class="title"></view>
        <view
          v-for="(item, index) in Number(row)"
          :key="index"
          :class="blockClass"
          :style="{ width, height }"
        >
        </view
      ></view>
    </view>
  </view>
</template>

<script lang="ts">
import { CSSProperties, computed, toRefs } from 'vue';
import { createComponent } from '../../common/create';
import { skeletonProps } from './common';

const { create, componentName, useVinContext } = createComponent('skeleton');

export default create({
  props: skeletonProps,

  setup(props: any) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { avatarShape, round, avatarSize } = toRefs(props);

    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    const avatarClass = computed(() => {
      const prefixCls = `${componentName}__avatar`;
      return {
        [prefixCls]: true,
        [`${prefixCls}--${avatarShape.value}`]: avatarShape.value,
      };
    });

    const blockClass = computed(() => {
      const prefixCls = `${componentName}__block`;
      return {
        [prefixCls]: true,
        [`${prefixCls}--round`]: round.value,
      };
    });

    const getStyle = (): CSSProperties => {
      if (avatarSize.value) {
        return {
          width: avatarSize.value,
          height: avatarSize.value,
        };
      }
      return {
        width: '50px',
        height: '50px',
      };
    };

    return {
      mainStyle,
      mainClass,
      avatarShape,
      avatarClass,
      blockClass,
      getStyle,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
