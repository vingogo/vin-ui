<template>
  <vin-transition
    :show="visible"
    :custom-class="mainClass"
    :custom-style="mainStyle"
    :duration="duration"
    @click="onClick"
  >
    <slot></slot>
  </vin-transition>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { overlayProps } from './common';

const { create, useVinContext } = createComponent('overlay');

export default create({
  props: overlayProps,
  emits: ['click', 'update:visible'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const mainClass = computed(() => getMainClass(props.overlayClass));

    const mainStyle = computed(() => {
      return getMainStyle({
        zIndex: props.zIndex,
        ...props.overlayStyle,
      });
    });

    const onClick = (e: MouseEvent) => {
      emit('click', e);
      if (props.closeOnClickOverlay) {
        emit('update:visible', false);
      }
    };

    return { mainClass, mainStyle, onClick };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
