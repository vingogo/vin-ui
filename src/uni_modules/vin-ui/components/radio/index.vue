<template>
  <view :class="mainClass" :style="mainStyle" @click="handleClick">
    <view v-if="shape === 'button'" :class="btnClass">
      <slot />
    </view>

    <template v-else-if="reverseState">
      <view :class="labelClass">
        <slot />
      </view>

      <vin-icon
        :customClass="iconClass"
        :name="curIconName"
        :size="iconSize"
        :classPrefix="iconClassPrefix"
        :fontClassName="iconFontClassName"
      ></vin-icon>
    </template>

    <template v-else>
      <vin-icon
        :customClass="iconClass"
        :name="curIconName"
        :size="iconSize"
        :classPrefix="iconClassPrefix"
        :fontClassName="iconFontClassName"
      ></vin-icon>

      <view :class="labelClass">
        <slot />
      </view>
    </template>
  </view>
</template>
<script lang="ts">
import { computed, inject } from 'vue';
import { createComponent } from '../common/create';
import { radioProps } from './common';

const { componentName, create, useVinContext } = createComponent('radio');

export default create({
  props: radioProps,
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const {
      label,
      shape,
      disabled,
      iconName,
      iconSize,
      iconActiveName,
      iconClassPrefix,
      iconFontClassName,
    } = props;

    const parent: any = inject('parent', null);

    const isCurValue = computed(() => {
      return parent.label.value === label;
    });

    const iconClass = computed(() => {
      return !disabled
        ? isCurValue.value
          ? 'vin-radio__icon'
          : 'vin-radio__icon--unchecked'
        : 'vin-radio__icon--disable';
    });

    const position = computed(() => {
      return parent.position;
    });

    const handleClick = () => {
      if (isCurValue.value || disabled) return;

      parent.updateValue(label);
    };

    const reverseState = position.value === 'left';

    const mainClass = computed(() => {
      return getMainClass({
        [`${componentName}--${shape}`]: true,
        [`${componentName}--reverse`]: !!reverseState,
      });
    });

    const mainStyle = computed(getMainStyle);

    const btnClass = computed(() => {
      return `${componentName}__button ${isCurValue.value && `${componentName}__button--active`} ${
        disabled ? `${componentName}__button--disabled` : ''
      }`;
    });

    const labelClass = computed(() => {
      return `${componentName}__label ${disabled ? `${componentName}__label--disabled` : ''}`;
    });

    const curIconName = computed(() => {
      return isCurValue.value ? iconActiveName : iconName;
    });

    return {
      shape,
      mainClass,
      mainStyle,
      btnClass,
      handleClick,
      reverseState,
      curIconName,
      iconSize,
      iconClass,
      iconClassPrefix,
      iconFontClassName,
      labelClass,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
