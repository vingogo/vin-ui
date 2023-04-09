<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      v-if="leftIcon && leftIcon.length > 0"
      class="vin-input-left-icon"
      @click="onClickLeftIcon"
    >
      <vin-icon :name="leftIcon" :size="leftIconSize"></vin-icon>
    </view>
    <view
      v-if="label"
      class="vin-input-label"
      :class="labelClass"
      :style="{
        width: `${labelWidth}px`,
        textAlign: labelAlign,
      }"
    >
      <view class="label-string">
        {{ label }}
        {{ colon ? ':' : '' }}
      </view>
    </view>
    <view class="vin-input-value">
      <view class="vin-input-inner" @click="onClickInput">
        <textarea
          v-if="type == 'textarea'"
          class="input-text"
          ref="inputRef"
          :style="stylesTextarea"
          :maxlength="maxLength"
          :placeholder="placeholder"
          placeholder-class="vin-placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :value="modelValue"
          :formatTrigger="formatTrigger"
          :autofocus="autofocus"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        <input
          v-else
          class="input-text"
          ref="inputRef"
          :style="styles"
          :type="inputType(type)"
          :maxLength="maxLength"
          :placeholder="placeholder"
          placeholder-class="vin-placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :value="modelValue"
          :formatTrigger="formatTrigger"
          :autofocus="autofocus"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
        />
        <vin-icon
          custom-class="vin-input-clear"
          v-if="clearable && !readonly"
          v-show="active && modelValue.length > 0"
          :name="clearIcon"
          :size="clearSize"
          @click="clear"
        >
        </vin-icon>
        <view
          v-if="rightIcon && rightIcon.length > 0"
          class="vin-input-right-icon"
          @click="onClickRightIcon"
        >
          <vin-icon :name="rightIcon" :size="rightIconSize"></vin-icon>
        </view>
        <slot v-if="$slots.button" name="button" class="vin-input-button"></slot>
        <view v-if="readonly" class="vin-input-disabled-mask"></view>
      </view>
      <view v-if="showWordLimit && maxLength" class="vin-input-word-limit">
        <span class="vin-input-word-num">{{ modelValue ? modelValue.length : 0 }}</span
        >/{{ maxLength }}
      </view>
      <view
        v-if="errorMessage"
        class="vin-input-error-message"
        :style="{
          textAlign: errorMessageAlign,
        }"
      >
        {{ errorMessage }}
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { ref, reactive, computed, onMounted, watch, CSSProperties } from 'vue';
import { createComponent } from '../common/create';
import { formatNumber } from './util';
import { inputProps } from './common';
import type { InputFormatTrigger } from './common';

const { componentName, create, useVinContext } = createComponent('input');

export default create({
  props: inputProps,

  emits: [
    'update:modelValue',
    'change',
    'blur',
    'focus',
    'clear',
    'keypress',
    'click-input',
    'click-left-icon',
    'click-right-icon',
  ],

  setup(props, { emit, slots }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const active = ref(false);

    const inputRef = ref<HTMLInputElement>();
    const customValue = ref<() => unknown>();
    const getModelValue = () => String(props.modelValue ?? '');

    const state = reactive({
      focused: false,
      validateFailed: false, // 校验失败
      validateMessage: '', // 校验信息
    });

    const mainClass = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        center: props.center,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-required`]: props.required,
        [`${prefixCls}-error`]: props.error,
        [`${prefixCls}-border`]: props.border,
      });
    });

    const mainStyle = computed(getMainStyle);

    const styles = computed(() => {
      return {
        textAlign: props.inputAlign,
      } as CSSProperties;
    });
    const stylesTextarea = computed(() => {
      return {
        textAlign: props.inputAlign,
        height: `${Number(props.rows) * 24}px`,
      } as CSSProperties;
    });

    const inputType = (type: string) => {
      if (type === 'number') {
        return 'text';
      }
      if (type === 'digit') {
        return 'tel';
      }
      return type;
    };

    const formValue = computed(() => {
      if (customValue.value && slots.input) {
        return customValue.value();
      }
      return props.modelValue;
    });

    const blur = () => inputRef.value?.blur();
    const focus = () => inputRef.value?.focus();

    const updateValue = (value: string, trigger: InputFormatTrigger = 'onChange') => {
      if (props.type === 'digit') {
        value = formatNumber(value, false, false);
      }
      if (props.type === 'number') {
        value = formatNumber(value, true, true);
      }

      if (props.formatter && trigger === props.formatTrigger) {
        value = props.formatter(value);
      }

      if (value !== props.modelValue) {
        emit('update:modelValue', value);
        emit('change', value);
      }
    };

    const onInput = (event: any) => {
      const { value } = event.detail;

      updateValue(value);
    };

    const onFocus = (event: any) => {
      const { value } = event.detail;

      active.value = true;
      emit('focus', value, event);
    };

    const onBlur = (event: any) => {
      setTimeout(() => {
        active.value = false;
      }, 200);

      let { value } = event.detail;
      if (props.maxLength && value.length > Number(props.maxLength)) {
        value = value.slice(0, Number(props.maxLength));
      }
      updateValue(getModelValue(), 'onBlur');
      emit('blur', value, event);
    };

    const clear = (event: Event) => {
      emit('update:modelValue', '', event);
      emit('change', '', event);
      emit('clear', '', event);
    };

    const resetValidation = () => {
      if (state.validateFailed) {
        state.validateFailed = false;
        state.validateMessage = '';
      }
    };

    const onClickInput = (event: MouseEvent) => {
      emit('click-input', event);
    };

    const onClickLeftIcon = (event: MouseEvent) => emit('click-left-icon', event);

    const onClickRightIcon = (event: MouseEvent) => emit('click-right-icon', event);

    watch(
      () => props.modelValue,
      () => {
        updateValue(getModelValue());
        resetValidation();
      }
    );

    onMounted(() => {
      updateValue(getModelValue(), props.formatTrigger);
    });

    return {
      inputRef,
      active,
      mainClass,
      styles,
      mainStyle,
      stylesTextarea,
      inputType,
      onInput,
      onFocus,
      onBlur,
      clear,
      onClickInput,
      onClickLeftIcon,
      onClickRightIcon,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
