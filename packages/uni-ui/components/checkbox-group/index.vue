<template>
  <view :class="mainClass" :style="mainStyle">
    <slot />
  </view>
</template>
<script lang="ts">
import {
  watch,
  provide,
  computed,
  ComponentInternalInstance,
  reactive,
  ComponentPublicInstance,
} from 'vue';
import { createComponent } from '../common/create';
import { checkboxGroupProps } from './common';

const { create, useVinContext } = createComponent('checkboxgroup');

export default create({
  props: checkboxGroupProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, expose }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const state = reactive({
      children: [] as ComponentPublicInstance[],
    });

    const relation = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        state.children.push(child.proxy);
      }
    };

    const updateValue = (value: any[]) => {
      emit('update:modelValue', value);
      emit('change', value);
    };

    const toggleAll = (checked: boolean) => {
      const values: any[] = [];
      if (checked) {
        state.children.forEach((item: any) => {
          values.push(item?.label);
        });
      }
      emit('update:modelValue', values);
    };

    provide('parent', {
      value: computed(() => props.modelValue),
      disabled: computed(() => props.disabled),
      updateValue,
      relation,
    });

    watch(
      () => props.modelValue,
      (value) => {
        emit('change', value);
      }
    );

    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    expose({ toggleAll });

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
