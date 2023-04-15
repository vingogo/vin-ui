<template>
  <view :class="mainClass" :style="mainStyle">
    <slot />
  </view>
</template>
<script lang="ts">
import { provide, computed, reactive, ComponentInternalInstance } from 'vue';
import { createComponent } from '../common/create';
import { stepsProps } from './common';

const { create, componentName, useVinContext } = createComponent('steps');

export default create({
  props: stepsProps,
  emits: ['click-step'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const state = reactive({
      children: [] as ComponentInternalInstance[],
    });

    const mainClass = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        [`${prefixCls}-${props.direction}`]: true,
        [`${prefixCls}-dot`]: !!props.progressDot,
      });
    });

    const mainStyle = computed(getMainStyle);

    const relation = (child: ComponentInternalInstance) => {
      child && state.children.push(child as any);
    };

    const onEmit = (index: number) => {
      emit('click-step', index);
    };

    provide('parent', {
      relation,
      state,
      props,
      onEmit,
    });

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
