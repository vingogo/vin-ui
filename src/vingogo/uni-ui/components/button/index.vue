<template>
  <button :class="classes" :style="mainStyle" @click="handleClick">
    <view class="vin-button__warp">
      <vin-icon custom-class="vin-icon-loading" v-if="loading"></vin-icon>
      <vin-icon
        v-if="icon && !loading"
        :name="icon"
        :class-prefix="iconClassPrefix"
        :font-class-name="iconFontClassName"
      ></vin-icon>
      <view :class="{ text: icon || loading }" v-if="$slots.default">
        <slot></slot>
      </view>
    </view>
  </button>
</template>

<script lang="ts">
import { CSSProperties, toRefs, computed } from 'vue';
import { createComponent } from '../../common/create';
import Icon from '../icon/index.vue';
import { buttonProps } from './common';

const { componentName, create, useVinContext } = createComponent('button');

export default create({
  components: {
    [Icon.name]: Icon,
  },
  props: buttonProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { type, size, shape, disabled, loading, color, plain, block } = toRefs(props);
    const { getMainClass, getMainStyle } = useVinContext(props);

    const handleClick = (event: MouseEvent) => {
      if (!loading.value && !disabled.value) {
        emit('click', event);
      }
    };

    const classes = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        [`${prefixCls}--${type.value}`]: type.value,
        [`${prefixCls}--${size.value}`]: size.value,
        [`${prefixCls}--${shape.value}`]: shape.value,
        [`${prefixCls}--plain`]: plain.value,
        [`${prefixCls}--block`]: block.value,
        [`${prefixCls}--disabled`]: disabled.value,
        [`${prefixCls}--loading`]: loading.value,
      });
    });

    const mainStyle = computed(() => {
      const style: CSSProperties = {};
      if (color?.value) {
        if (plain.value) {
          style.color = color.value;
          style.background = '#fff';
          if (!color.value?.includes('gradient')) {
            style.borderColor = color.value;
          }
        } else {
          style.color = '#fff';
          style.background = color.value;
        }
      }

      return getMainStyle(style);
    });

    return {
      handleClick,
      classes,
      mainStyle,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
