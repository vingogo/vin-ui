<template>
  <view :class="mainClass" :style="mainStyle" @click="handleClick">
    <view :class="contentClass">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
      <template v-else>
        <slot v-if="$slots.icon" name="icon"></slot>
        <vin-icon
          v-else-if="iconProps?.name"
          :name="iconProps?.name"
          :size="iconProps?.size"
          :color="iconProps?.color"
          :class-prefix="iconProps?.classPrefix"
          :font-class-name="iconProps?.fontClassName"
        ></vin-icon>

        <slot v-if="$slots.text" name="text"></slot>
        <view v-else class="vin-grid-item__text">{{ text }}</view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, CSSProperties } from 'vue';
import { createComponent } from '../common/create';
import { pxCheck } from '../../shared/utils/pxCheck';
import { useInject, useRouter } from '../../shared/hooks';
import { GRID_KEY, GridProps } from '../grid/common';
import { gridItemProps } from './common';

const { create, componentName, useVinContext } = createComponent('grid-item');

export default create({
  props: gridItemProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const Parent = useInject<{
      props: Required<GridProps>;
    }>(GRID_KEY);

    if (!Parent.parent) return {};
    const { index } = Parent;
    const parent = Parent.parent.props || {};

    const mainClass = computed(getMainClass);

    const mainStyle = computed(() => {
      const style: CSSProperties = {
        flexBasis: `${100 / +parent.columnNum}%`,
      };

      if (parent.square) {
        style.paddingTop = `${100 / +parent.columnNum}%`;
      } else if (parent.gutter) {
        style.paddingRight = pxCheck(parent.gutter);
        if (index.value >= parent.columnNum) {
          style.marginTop = pxCheck(parent.gutter);
        }
      }

      return getMainStyle(style);
    });

    // content
    const contentClass = computed(() => {
      const prefixCls = `${componentName}__content`;
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}--border`]: parent.border,
        [`${prefixCls}--surround`]: parent.border && parent.gutter,
        [`${prefixCls}--center`]: parent.center,
        [`${prefixCls}--square`]: parent.square,
        [`${prefixCls}--reverse`]: parent.reverse,
        [`${prefixCls}--${parent.direction}`]: !!parent.direction,
        [`${prefixCls}--clickable`]: parent.clickable,
      };
    });

    // icon
    const iconProps = computed(() => {
      return {
        name: props.icon,
        size: props.iconSize || parent.iconSize,
        color: props.iconColor || parent.iconColor,
        classPrefix: props.iconClassPrefix,
        fontClassName: props.iconFontClassName,
      };
    });

    // click
    const router = useRouter();
    const handleClick = (event: Event) => {
      emit('click', event);

      if (props.to && router) {
        router[props.replace ? 'replace' : 'push'](props.to);
        // #ifdef H5
      } else if (props.url) {
        if (props.replace) {
          window.location.replace(props.url);
        } else {
          window.location.href = props.url;
        }
        // #endif
      }
    };

    return {
      mainClass,
      mainStyle,
      contentClass,
      iconProps,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
