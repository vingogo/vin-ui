<template>
  <vin-cell :class="mainClass" :style="mainStyle">
    <view
      class="vin-cell__title vin-form-item__label"
      :style="labelStyle"
      v-if="label"
      :class="{ required: required }"
    >
      {{ label }}</view
    >
    <view class="vin-cell__value vin-form-item__body">
      <view class="vin-form-item__body__slots" :style="bodyStyle">
        <slot></slot>
      </view>
      <view
        class="vin-form-item__body__tips"
        :style="errorMessageStyle"
        v-if="formErrorTip[prop] && showErrorMessage"
      >
        {{ formErrorTip[prop] }}</view
      >
    </view>
  </vin-cell>
</template>
<script lang="ts">
import { computed, provide } from 'vue';
import { pxCheck } from '../../shared/utils/pxCheck';
import { createComponent } from '../../common/create';
import { useInject } from '../../shared/hooks';
import { FORM_KEY } from '../form/common';
import { formItemProps } from './common';

const { create, useVinContext } = createComponent('form-item');
export default create({
  inheritAttrs: false,
  props: formItemProps,

  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const Parent = useInject<{ formErrorTip: Required<any> }>(FORM_KEY);

    const formErrorTip = Parent.parent?.formErrorTip;

    provide('form', {
      props,
    });

    const labelStyle = computed(() => {
      return {
        width: pxCheck(props.labelWidth),
        textAlign: props.labelAlign,
      };
    });
    const bodyStyle = computed(() => {
      return {
        textAlign: props.bodyAlign,
      };
    });
    const errorMessageStyle = computed(() => {
      return {
        textAlign: props.errorMessageAlign,
      };
    });
    const mainClass = computed(() => {
      const { showErrorLine, prop } = props;

      return getMainClass({
        error: !!formErrorTip?.value?.[prop],
        line: showErrorLine,
      });
    });

    const mainStyle = computed(getMainStyle);

    return { formErrorTip, labelStyle, bodyStyle, errorMessageStyle, mainClass, mainStyle };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
