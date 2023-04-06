<template>
  <view :class="mainClass" :style="searchbarStyle">
    <view v-if="$slots.leftout" class="vin-searchbar__search-icon vin-searchbar__left-search-icon">
      <slot name="leftout"></slot>
    </view>
    <view class="vin-searchbar__search-input" :style="inputSearchbarStyle">
      <view
        v-if="$slots.leftin"
        class="vin-searchbar__search-icon vin-searchbar__iptleft-search-icon"
      >
        <slot name="leftin"></slot>
      </view>
      <view class="vin-searchbar__input-inner">
        <form action="#" onsubmit="return false" @submit.prevent="handleSubmit">
          <input
            class="vin-searchbar__input-bar"
            :type="inputType"
            :maxlength="maxLength"
            :placeholder="placeholder || translate('placeholder')"
            :value="modelValue"
            @input="valueChange"
            @focus="valueFocus"
            @blur="valueBlur"
            @confirm="handleSubmit"
          />
        </form>
        <view
          @click="handleClear"
          class="vin-searchbar__input-clear"
          v-if="clearable"
          v-show="modelValue.length > 0"
        >
          <vin-icon name="circle-close" size="12" color="#555"></vin-icon>
        </view>
      </view>
      <view
        v-if="$slots.rightin"
        class="vin-searchbar__search-icon vin-searchbar__iptright-sarch-icon"
      >
        <slot name="rightin"></slot>
      </view>
    </view>
    <view
      v-if="$slots.rightout"
      class="vin-searchbar__search-icon vin-searchbar__right-search-icon"
    >
      <slot name="rightout"></slot>
    </view>
  </view>
</template>

<script lang="ts">
import { toRefs, reactive, computed } from 'vue';
import { createComponent } from '../common/create';
import { searchbarProps } from './common';

const { create, translate, useVinContext } = createComponent('searchbar');

export default create({
  props: searchbarProps,

  emits: ['change', 'update:modelValue', 'blur', 'focus', 'clear', 'search'],

  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const state = reactive({
      active: false,
    });

    const mainClass = computed(getMainClass);

    const searchbarStyle = computed(() => {
      return getMainStyle({
        background: props.background,
      });
    });
    const inputSearchbarStyle = computed(() => {
      return {
        background: props.inputBackground,
      };
    });

    const valueChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      let val = input.value;

      if (props.maxLength && val.length > Number(props.maxLength)) {
        val = val.slice(0, Number(props.maxLength));
      }
      emit('update:modelValue', val, event);
      emit('change', val, event);
    };

    const valueFocus = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const { value } = input;
      state.active = true;
      emit('focus', value, event);
    };

    const valueBlur = (event: Event) => {
      setTimeout(() => {
        state.active = false;
      }, 0);

      const input = event.target as HTMLInputElement;
      let { value } = input;
      if (props.maxLength && value.length > Number(props.maxLength)) {
        value = value.slice(0, Number(props.maxLength));
      }
      emit('blur', value, event);
    };

    const handleClear = (event: Event) => {
      emit('update:modelValue', '', event);
      emit('change', '', event);
      emit('clear', '');
    };

    const handleSubmit = () => {
      emit('search', props.modelValue);
    };

    return {
      ...toRefs(state),
      mainClass,
      valueChange,
      valueFocus,
      valueBlur,
      handleClear,
      handleSubmit,
      searchbarStyle,
      inputSearchbarStyle,
      translate,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
