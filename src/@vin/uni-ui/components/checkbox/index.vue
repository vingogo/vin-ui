<template>
  <view :class="mainClass" :style="mainStyle" @click="handleClick">
    <vin-icon
      :name="iconName"
      :customClass="color"
      :size="iconSize"
      :classPrefix="iconClassPrefix"
      :fontClassName="iconFontClassName"
    ></vin-icon>

    <view :class="labelClass">
      <slot />
    </view>
  </view>
</template>
<script lang="ts">
import { computed, inject, getCurrentInstance, onMounted } from 'vue';
import { createComponent } from '../../common/create';
import Icon from '../icon/index.vue';

import { checkboxProps } from './common';

const { create, componentName, useVinContext } = createComponent('checkbox');

export default create({
  components: {
    [Icon.name]: Icon,
  },
  props: checkboxProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const parent: any = inject('parent', null);

    const hasParent = computed(() => !!parent);

    const pValue = computed(() => {
      if (hasParent.value) {
        return parent.value.value.includes(props.label);
      }
      return props.modelValue;
    });

    const pDisabled = computed(() => {
      return hasParent.value ? parent.disabled.value : props.disabled;
    });

    const checked = computed(() => !!props.modelValue);

    const color = computed(() => {
      return !pDisabled.value
        ? !pValue.value
          ? 'vin-checkbox__icon--unchecked'
          : 'vin-checkbox__icon'
        : 'vin-checkbox__icon--disable';
    });

    const labelClass = computed(() => {
      return `${componentName}__label ${
        pDisabled.value ? `${componentName}__label--disabled` : ''
      }`;
    });

    const iconName = computed(() => {
      return !pValue.value ? props.iconName : props.iconActiveName;
    });

    const emitChange = (value: string | boolean, label?: string) => {
      emit('update:modelValue', value);
      emit('change', value, label);
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (pDisabled.value) return;
      emitChange(!checked.value, props.label);
      if (hasParent.value) {
        const { value } = parent.value;
        const { label } = props;
        const index = value.indexOf(label);
        if (index > -1) {
          value.splice(index, 1);
        } else {
          value.push(label);
        }
        parent.updateValue(value);
      }
    };

    onMounted(() => {
      hasParent.value && parent.relation(getCurrentInstance());
    });

    const mainClass = computed(() => {
      return getMainClass({
        [`${componentName}--reverse`]: props.textPosition === 'left',
      });
    });

    const mainStyle = computed(getMainStyle);

    return {
      iconName,
      color,
      mainClass,
      mainStyle,
      labelClass,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
