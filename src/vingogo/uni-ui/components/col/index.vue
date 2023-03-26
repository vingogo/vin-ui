<template>
  <view :class="mainClass" :style="mainStyle" @click="handleClick">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { computed, inject } from 'vue';
import { createComponent } from '../common/create';
import { colProps } from './common';

const { componentName, create, useVinContext } = createComponent('col');

export default create({
  props: colProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const prefixCls = componentName;
    const gutter = inject('gutter') as number;

    const mainClass = computed(() => {
      return getMainClass({
        [`${prefixCls}-gutter`]: gutter,
        [`vin-col-${props.span}`]: true,
        [`vin-col-offset-${props.offset}`]: true,
      });
    });

    const mainStyle = computed(() => {
      return getMainStyle({
        paddingLeft: `${gutter / 2}px`,
        paddingRight: `${gutter / 2}px`,
      });
    });

    const handleClick = (evt: MouseEvent) => {
      evt.stopPropagation();
      emit('click', evt);
    };

    return {
      mainClass,
      mainStyle,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
