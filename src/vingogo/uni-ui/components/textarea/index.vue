<template>
  <view :class="mainClass" :style="mainStyle">
    <view v-if="readonly" class="vin-textarea__textarea">
      {{ modelValue }}
    </view>
    <textarea
      v-else
      class="vin-textarea__textarea"
      :style="styles"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      :value="modelValue"
      :auto-height="autosize"
      @input="change"
      @blur="blur"
      @focus="focus"
      :maxlength="maxLength"
      :placeholder="placeholder || translate('placeholder')"
      :focus="autofocus"
      :auto-focus="autofocus"
    />
    <view class="vin-textarea__limit" v-if="limitShow">
      {{ modelValue ? modelValue.length : 0 }}/{{ maxLength }}</view
    >
  </view>
</template>
<script lang="ts">
import { computed, onMounted } from 'vue';
import { createComponent } from '../common/create';
import { textareaProps } from './common';

const { componentName, create, translate, useVinContext } = createComponent('textarea');

export default create({
  props: textareaProps,

  emits: ['update:modelValue', 'change', 'blur', 'focus'],

  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const mainClass = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        [`${prefixCls}--disabled`]: props.disabled,
      });
    });

    const mainStyle = computed(getMainStyle);

    const styles: any = computed(() => {
      return {
        textAlign: props.textAlign,
        // resize: props.autosize ? 'vertical' : 'none'
      };
    });

    const emitChange = (value: string, event?: Event) => {
      if (props.maxLength && value?.length > Number(props.maxLength)) {
        value = value.substring(0, Number(props.maxLength));
      }
      emit('update:modelValue', value, event);
      emit('change', value, event);
    };

    onMounted(() => {
      if (props.modelValue) {
        emitChange(String(props.modelValue));
      }
    });

    const change = (event: Event) => {
      const { value } = event.detail;

      emitChange(value, event);
    };

    const focus = (event: Event) => {
      if (props.disabled) return;
      if (props.readonly) return;
      emit('focus', event);
    };

    const blur = (event: Event) => {
      if (props.disabled) return;
      if (props.readonly) return;
      const { value } = event.detail;

      emitChange(value, event);
      emit('blur', event);
    };

    return {
      mainStyle,
      mainClass,
      styles,
      change,
      focus,
      blur,
      translate,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
