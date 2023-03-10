<template>
  <view class="vin-badge">
    <view class="slot-icons">
      <slot name="icons"></slot>
    </view>
    <slot></slot>
    <view
      v-show="!hidden && (content || dot)"
      class="vin-badge__content sup"
      :class="{ 'is-dot': dot }"
      :style="mainStyle"
    >
      {{ content }}
    </view>
  </view>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../../common/create';
import { badgeProps } from './common';

const { create, useVinContext } = createComponent('badge');
export default create({
  props: badgeProps,

  setup(props) {
    const { getMainStyle } = useVinContext(props);

    const mainStyle = computed(() => {
      return getMainStyle({
        top: `${props.top}px`,
        right: `${props.right}px`,
        zIndex: props.zIndex,
        background: props.color,
      });
    });

    const content = computed(() => {
      if (props.dot) return '';
      const { value } = props;
      const { max } = props;
      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value;
      }
      return value;
    });

    return {
      mainStyle,
      content,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
