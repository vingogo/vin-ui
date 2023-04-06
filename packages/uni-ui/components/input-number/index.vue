<template>
  <view :class="mainClass" :style="mainStyle">
    <vin-icon
      name="minus"
      class="vin-input-number__icon"
      :class="{ 'vin-input-number__icon--disabled': !reduceAllow() }"
      :size="buttonSize"
      @click="reduce"
    >
    </vin-icon>
    <view v-if="readonly" class="vin-input-number__text--readonly">
      {{ modelValue }}
    </view>
    <input
      v-else
      type="number"
      :min="min"
      :max="max"
      :style="{ width: pxCheck(inputWidth) }"
      :disabled="disabled"
      :readonly="readonly"
      :value="modelValue"
      @input="change"
      @blur="blur"
      @focus="focus"
    />
    <vin-icon
      name="plus"
      class="vin-input-number__icon"
      :class="{ 'vin-input-number__icon--disabled': !addAllow() }"
      :size="buttonSize"
      @click="add"
    >
    </vin-icon>
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { pxCheck } from '../../shared/utils/pxCheck';
import { inputNumberProps } from './common';

const { componentName, create, useVinContext } = createComponent('input-number');
export default create({
  props: inputNumberProps,
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'reduce', 'add', 'overlimit'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const mainClass = computed(() => {
      const prefixCls = componentName;

      return getMainClass({
        [`${prefixCls}--disabled`]: props.disabled,
      });
    });

    const mainStyle = computed(() => {
      return getMainStyle({
        height: pxCheck(props.buttonSize),
      });
    });

    const fixedDecimalPlaces = (v: string | number): string => {
      return Number(v).toFixed(Number(props.decimalPlaces));
    };
    const change = (event: Event) => {
      const input = event.target as HTMLInputElement;
      emit('update:modelValue', input.value, event);
    };
    const emitChange = (value: string | number, event: Event) => {
      const output_value: number | string = fixedDecimalPlaces(value);
      emit('update:modelValue', output_value, event);
      emit('change', output_value, event);
    };
    const addAllow = (value = Number(props.modelValue)): boolean => {
      return value < Number(props.max) && !props.disabled;
    };
    const reduceAllow = (value = Number(props.modelValue)): boolean => {
      return value > Number(props.min) && !props.disabled;
    };
    const reduce = (event: Event) => {
      emit('reduce', event);
      if (reduceAllow()) {
        const output_value = Number(props.modelValue) - Number(props.step);
        emitChange(output_value, event);
      } else {
        emit('overlimit', event, 'reduce');
      }
    };
    const add = (event: Event) => {
      emit('add', event);
      if (addAllow()) {
        const output_value = Number(props.modelValue) + Number(props.step);
        emitChange(output_value, event);
      } else {
        emit('overlimit', event, 'add');
      }
    };
    const blur = (event: Event) => {
      if (props.disabled) return;
      if (props.readonly) return;
      const input = event.target as HTMLInputElement;
      let value = +input.value;
      if (value < Number(props.min)) {
        value = Number(props.min);
      } else if (value > Number(props.max)) {
        value = Number(props.max);
      }
      emitChange(value, event);
      emit('blur', event);
    };
    const focus = (event: Event) => {
      if (props.disabled) return;
      if (props.readonly) {
        blur(event);
        return;
      }
      emit('focus', event);
    };
    return {
      mainClass,
      mainStyle,
      change,
      blur,
      focus,
      add,
      addAllow,
      reduce,
      reduceAllow,
      pxCheck,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
