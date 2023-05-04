<template>
  <view class="vin-swiper__wrapper">
    <swiper
      :style="mainStyle"
      :class="mainClass"
      :duration="duration"
      :autoplay="isAutoPlay"
      :interval="interval"
      :circular="loop"
      :current="current"
      :vertical="isVertical"
      :disable-touch="!touchable"
      :indicator-dots="paginationVisible"
      :indicator-active-color="paginationColor"
      @change="onChange"
    >
      <slot />
    </swiper>

    <slot name="page" />
  </view>
</template>

<script lang="ts">
import { computed, watch, ref } from 'vue';
import { createComponent } from '../common/create';
import { swiperProps, SWIPER_KEY } from './common';
import { useProvide, useExpose } from '../../shared/hooks';
import { pxCheck } from '../../shared/utils/pxCheck';

const { create, componentName, useVinContext } = createComponent('swiper');

export default create({
  props: swiperProps,
  emits: ['change'],

  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const { internalChildren } = useProvide(SWIPER_KEY, `${componentName}-item`)({ props });
    const current = ref(0);

    const mainClass = computed(getMainClass);

    const mainStyle = computed(() => {
      return getMainStyle({
        width: pxCheck(props.width),
        height: pxCheck(props.height),
      });
    });

    const childCount = computed(() => internalChildren.length);

    const isAutoPlay = computed(() => {
      return props.autoPlay > 0 && childCount.value > 1;
    });

    const interval = computed(() => {
      if (isAutoPlay.value) {
        return Number(props.autoPlay);
      }

      return 0;
    });

    const isVertical = computed(() => props.direction === 'vertical');

    watch(
      () => props.initPage,
      (val) => {
        current.value = Number(val);
      }
    );

    const onChange = (event: any) => {
      const current = event.detail.current;
      emit('change', current);
    };

    const jump = (pace: number) => {
      current.value += pace;
    };

    const to = (index: number) => {
      current.value = index;
    };

    const prev = () => {
      jump(-1);
    };

    const next = () => {
      jump(1);
    };

    useExpose({
      prev,
      next,
      to,
    });

    return {
      mainClass,
      mainStyle,
      isAutoPlay,
      interval,
      isVertical,
      current,
      onChange,
    };
  },
});
</script>
