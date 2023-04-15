<template>
  <view :class="mainClass" @click="onClick" :style="mainStyle">
    <view class="switch-button">
      <vin-icon v-if="loading" :name="name" :size="size" :color="color"></vin-icon>
      <template v-if="activeText">
        <view class="vin-switch-label open" v-show="modelValue">{{ activeText }}</view>
        <view class="vin-switch-label close" v-show="!modelValue">{{ inactiveText }}</view>
      </template>
    </view>
  </view>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { switchProps } from './common';

const { componentName, create, useVinContext } = createComponent('switch');

export default create({
  props: switchProps,
  emits: ['change', 'update:modelValue', 'update:loading'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const isActive = computed(() => props.modelValue === props.activeValue);
    const mainClass = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        [isActive.value ? 'switch-open' : 'switch-close']: true,
        [`${prefixCls}-disable`]: props.disable,
        [`${prefixCls}-base`]: true,
      });
    });

    const mainStyle = computed(() => {
      return getMainStyle({
        backgroundColor: isActive.value ? props.activeColor : props.inactiveColor,
      });
    });

    const onClick = (event: Event) => {
      if (props.disable || props.loading) return;
      const value = isActive.value ? props.inactiveValue : props.activeValue;
      emit('update:modelValue', value);
      emit('update:loading');
      emit('change', value, event);
    };

    return {
      mainClass,
      mainStyle,
      onClick,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
