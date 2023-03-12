<template>
  <view :class="mainClass" :style="mainStyle">
    <slot></slot>
  </view>
</template>

<script lang="ts">
import { computed, provide, reactive, watch } from 'vue';
import { createComponent } from '../../common/create';
import { tabbarProps } from './common';

const { create, useVinContext } = createComponent('tabbar');
export default create({
  props: tabbarProps,
  emits: ['tab-switch', 'update:visible'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const mdValue = reactive({
      val: props.visible,
      children: [],
    });
    const changeIndex = (active: number) => {
      emit('update:visible', active);
      // eslint-disable-next-line no-use-before-define
      parentData.modelValue = active;
      // eslint-disable-next-line no-use-before-define
      emit('tab-switch', parentData.children[active], active);
    };
    let parentData = reactive({
      children: mdValue.children,
      size: props.size,
      modelValue: mdValue.val,
      unactiveColor: props.unactiveColor,
      activeColor: props.activeColor,
      changeIndex,
    });
    provide('parent', parentData);
    watch(
      () => props.visible,
      (value) => {
        parentData.modelValue = value;
      }
    );

    const mainClass = computed(() => {
      return getMainClass({
        'vin-tabbar-bottom': props.bottom,
        'vin-tabbar-safebottom': props.safeAreaInsetBottom,
      });
    });

    const mainStyle = computed(getMainStyle);

    return {
      mainStyle,
      mainClass,
      changeIndex,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
