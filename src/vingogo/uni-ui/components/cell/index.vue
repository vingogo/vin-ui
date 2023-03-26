<template>
  <view :class="classes" :style="baseStyle" @click="handleClick">
    <slot>
      <view class="vin-cell__icon" v-if="icon || $slots.icon">
        <slot v-if="$slots.icon" name="icon"></slot>
        <vin-icon v-else-if="icon" class="icon" :name="icon"></vin-icon>
      </view>
      <view class="vin-cell__title" v-if="title || subTitle">
        <template v-if="subTitle">
          <view class="title">{{ title }}</view>
          <view class="vin-cell__title-desc">{{ subTitle }}</view>
        </template>
        <template v-else>
          {{ title }}
        </template>
      </view>
      <view v-if="desc" class="vin-cell__value" :style="{ 'text-align': descTextAlign }">{{
        desc
      }}</view>

      <slot v-if="$slots.link" name="link"></slot>
      <vin-icon v-else-if="isLink || to" class="vin-cell__link" name="right"></vin-icon>
    </slot>
  </view>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../../common/create';
import { pxCheck } from '../../shared/utils/pxCheck';
import { useRouter } from '../../shared/hooks';
import { cellProps } from './common';

const { componentName, create, useVinContext } = createComponent('cell');

export default create({
  props: cellProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { push, replace } = useRouter();

    const classes = computed(() => {
      const prefixCls = componentName;

      return getMainClass({
        [`${prefixCls}--clickable`]: props.isLink || props.to,
      });
    });

    const baseStyle = computed(() => {
      return getMainStyle({
        borderRadius: pxCheck(props.roundRadius),
      });
    });

    const handleClick = (event: Event) => {
      if (props.replace && props.to) {
        replace(props.to);
        return;
      }

      if (props.to) {
        push(props.to);
        return;
      }

      emit('click', event);
    };

    return {
      handleClick,
      classes,
      baseStyle,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
