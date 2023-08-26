<template>
  <view :class="mainClass" :style="mainStyle" @click="onClick">
    <slot></slot>
    <vin-icon
      custom-class="vin-tag--close"
      v-if="closeable"
      name="close"
      size="8"
      @click="onClose"
    ></vin-icon>
  </view>
</template>

<script lang="ts">
import { computed, toRefs } from 'vue';
import type { CSSProperties } from 'vue';
import { createComponent } from '../common/create';
import { tagProps } from './common';

const { componentName, create, useVinContext } = createComponent('tag');

export default create({
  props: tagProps,
  emits: ['close', 'click'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { type, color, plain, round, mark, textColor } = toRefs(props);

    const mainClass = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        [`${prefixCls}--${type.value}`]: type.value,
        [`${prefixCls}--plain`]: plain.value,
        [`${prefixCls}--round`]: round.value,
        [`${prefixCls}--mark`]: mark.value,
      });
    });

    const mainStyle = computed(() => {
      const style: CSSProperties = {};
      if (textColor.value) {
        style.color = textColor.value;
      } else if (color.value && plain.value) {
        style.color = color.value;
      }
      if (plain.value) {
        style.background = '#fff';
        style['border-color'] = color.value;
      } else if (color.value) {
        style.background = color.value;
      }
      return getMainStyle(style);
    });

    const onClose = (event: MouseEvent) => {
      event.stopPropagation();
      emit('close', event);
    };

    const onClick = (event: MouseEvent) => {
      event.stopPropagation();
      emit('click', event);
    };

    return {
      mainClass,
      mainStyle,
      onClose,
      onClick,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
