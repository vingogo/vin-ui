<template>
  <view>
    <scroll-view
      :scroll-y="true"
      :style="{ height }"
      @scroll="scroll"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
    >
      <slot name="content"></slot>
    </scroll-view>
    <view :class="classes" :style="style" @click.stop="click">
      <slot name="icon">
        <vin-icon size="19px" custom-class="vin-backtop-main" name="top"></vin-icon>
      </slot>
    </view>
  </view>
</template>

<script lang="ts">
import { reactive, computed, toRefs } from 'vue';
import { createComponent } from '../common/create';
import { backtopProps } from './common';

const { create, useVinContext } = createComponent('backtop');
export default create({
  props: backtopProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const state = reactive({
      backTop: false,
      scrollTop: 1,
    });

    const classes = computed(() => {
      return getMainClass({
        show: state.backTop,
      });
    });

    const style = computed(() => {
      return getMainStyle({
        right: `${props.right}px`,
        bottom: `${props.bottom}px`,
        zIndex: props.zIndex,
      });
    });

    const scroll = (e: CustomEvent) => {
      state.scrollTop = 2;
      state.backTop = e.detail.scrollTop >= props.distance;
    };

    const click = (e: MouseEvent) => {
      state.scrollTop = 1;
      emit('click', e);
    };

    return {
      ...toRefs(state),
      classes,
      style,
      scroll,
      click,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
