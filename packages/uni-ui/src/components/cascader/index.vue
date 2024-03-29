<template>
  <vin-popup
    v-model:visible="innerVisible"
    position="bottom"
    pop-class="vin-cascader__popup"
    round
    :closeable="!closeable"
    :close-icon="closeIcon"
    :destroy-on-close="false"
    :close-icon-position="closeIconPosition"
  >
    <template v-if="title">
      <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
      <view class="vin-cascader__bar" v-html="title"></view>
    </template>

    <vin-cascader-item
      @change="onChange"
      @path-change="onPathChange"
      :modelValue="innerValue"
      :options="options"
      :lazy="lazy"
      :lazy-load="lazyLoad"
      :value-key="valueKey"
      :text-key="textKey"
      :children-key="childrenKey"
      :convert-config="convertConfig"
      :visible="innerVisible"
    />
  </vin-popup>
</template>
<script lang="ts">
import { watch, ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { CascaderValue, CascaderOption } from './types';
import { createComponent } from '../common/create';
import { cascaderProps } from './common';

const { create } = createComponent('cascader');

export default create({
  props: cascaderProps,
  emits: ['update:modelValue', 'change', 'pathChange', 'update:visible'],
  setup(props, { emit }) {
    const innerValue: Ref<CascaderValue> = ref(props.modelValue as CascaderValue);
    const innerVisible = computed({
      get() {
        return props.visible;
      },
      set(value) {
        emit('update:visible', value);
      },
    });

    const onChange = (value: CascaderValue, pathNodes: CascaderOption[]) => {
      innerValue.value = value;
      innerVisible.value = false;

      emit('change', value, pathNodes);
      emit('update:modelValue', value);
    };

    const onPathChange = (pathNodes: CascaderOption[]) => {
      emit('pathChange', pathNodes);
    };

    watch(
      () => props.modelValue,
      (value) => {
        if (value !== innerValue.value) {
          innerValue.value = value as CascaderValue;
        }
      },
    );

    return {
      onChange,
      onPathChange,
      innerValue,
      innerVisible,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
