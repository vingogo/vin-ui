<template>
  <view :class="mainClass" :style="mainStyle" @click="handleClick">
    <slot></slot>
  </view>
</template>
<script lang="ts">
import { provide, computed } from 'vue';
import { createComponent } from '../../common/create';
import { rowProps } from './common';

const { create, useVinContext } = createComponent('row');

export default create({
  props: rowProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    provide('gutter', props.gutter);
    const getClass = (prefix: string, type: string) => {
      return prefix ? (type ? `vin-row-${prefix}-${type}` : '') : `vin-row-${type}`;
    };
    const mainClass = computed(() => {
      return getMainClass(`
        ${getClass('', props.type)}
        ${getClass('justify', props.justify)}
        ${getClass('align', props.align)}
        ${getClass('flex', props.wrap)}
      `);
    });

    const mainStyle = computed(getMainStyle);

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
