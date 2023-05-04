<template>
  <swiper-item :class="mainClass" :style="mainStyle">
    <slot></slot>
  </swiper-item>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { useInject } from '../../shared/hooks';
import { SWIPER_KEY } from '../swiper/common';

const { create, useVinContext } = createComponent('swiper-item');

export default create({
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    useInject<{ activeKey: string }>(SWIPER_KEY);

    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    return {
      mainStyle,
      mainClass,
    };
  },
});
</script>
