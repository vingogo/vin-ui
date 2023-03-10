<template>
  <view v-show="isShow" ref="transition" @click="handleClick" :class="mainClass" :style="mainStyle">
    <slot />
  </view>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../../common/create';
import useTransition from './useTransition';

import { transitionProps } from './common';

const { create, useVinContext } = createComponent('transition');

export default create({
  props: transitionProps,
  emits: ['click', 'beforeEnter', 'enter', 'afterEnter', 'beforeLeave', 'leave', 'afterLeave'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { isShow, classes } = useTransition(props, {
      beforeEnter: () => emit('beforeEnter'),
      enter: () => emit('enter'),
      afterEnter: () => emit('afterEnter'),
      beforeLeave: () => emit('beforeLeave'),
      leave: () => emit('leave'),
      afterLeave: () => emit('afterLeave'),
    });

    const mainStyle = computed(() => {
      return getMainStyle({
        transitionDuration: `${props.duration}ms`,
        transitionTimingFunction: props.timingFunction,
      });
    });

    const mainClass = computed(() => getMainClass([classes.value]));

    const handleClick = () => {
      emit('click');
    };

    return {
      isShow,
      classes,
      mainClass,
      handleClick,
      mainStyle,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
