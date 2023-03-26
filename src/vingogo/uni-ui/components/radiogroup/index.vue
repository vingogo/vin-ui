<template>
  <view :class="mainClass" :style="mainStyle">
    <slot />
  </view>
</template>
<script lang="ts">
import { provide, computed, readonly, watch } from 'vue';
import { createComponent } from '../../common/create';
import { radioGroupProps } from './common';

const { componentName, create, useVinContext } = createComponent('radiogroup');

export default create({
  props: radioGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const updateValue = (value: string | boolean | number) => emit('update:modelValue', value);

    provide('parent', {
      label: readonly(computed(() => props.modelValue)),
      position: props.textPosition,
      updateValue,
    });

    watch(
      () => props.modelValue,
      (value) => emit('change', value)
    );

    const mainClass = computed(() =>
      getMainClass({
        [`${componentName}--${props.direction}`]: true,
      })
    );

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
