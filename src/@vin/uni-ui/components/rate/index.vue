<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      class="vin-rate-item"
      v-for="n in count"
      :key="n"
      :style="{ marginRight: pxCheck(spacing) }"
    >
      <vin-icon
        :size="iconSize"
        @click="onClick(1, n)"
        :custom-class="
          disabled || n > modelValue
            ? 'vin-rate-item__icon vin-rate-item__icon--disabled'
            : 'vin-rate-item__icon'
        "
        :color="n <= modelValue ? activeColor : voidColor"
        :font-class-name="fontClassName"
        :class-prefix="classPrefix"
        :name="n <= modelValue ? checkedIcon : uncheckedIcon"
      />
      <vin-icon
        v-if="allowHalf && modelValue + 1 > n"
        custom-class="vin-rate-item__icon vin-rate-item__icon--half"
        @click="onClick(2, n)"
        :font-class-name="fontClassName"
        :class-prefix="classPrefix"
        :color="n <= modelValue + 1 ? activeColor : voidColor"
        :size="iconSize"
        :name="checkedIcon"
      />
      <vin-icon
        v-else-if="allowHalf && modelValue + 1 < n"
        custom-class="vin-rate-item__icon vin-rate-item__icon--disabled vin-rate-item__icon--half"
        @click="onClick(2, n)"
        :font-class-name="fontClassName"
        :class-prefix="classPrefix"
        :color="voidColor"
        :size="iconSize"
        :name="uncheckedIcon"
      />
    </view>
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../../common/create';
import { pxCheck } from '../../shared/utils/pxCheck';
import Icon from '../icon/index.vue';
import { rateProps } from './common';

const { create, useVinContext } = createComponent('rate');

export default create({
  components: {
    [Icon.name]: Icon,
  },
  props: rateProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    const onClick = (e: number, index: number) => {
      if (props.disabled || props.readonly) return;
      let value = 0;
      if (!(index === 1 && props.modelValue === index)) {
        value = index;
        if (props.allowHalf && e === 2) {
          value -= 0.5;
        }
      }
      emit('update:modelValue', value);
      emit('change', value);
    };

    return {
      mainClass,
      mainStyle,
      onClick,
      pxCheck,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
