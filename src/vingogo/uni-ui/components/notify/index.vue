<template>
  <vin-transition
    name="fade"
    :show="visible"
    :custom-class="mainClass"
    :custom-style="mainStyle"
    @click="onClick"
    @after-leave="onAfterLeave"
  >
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>{{ message }}</template>
  </vin-transition>
</template>
<script lang="ts">
import { computed, watch } from 'vue';
import { createComponent } from '../../common/create';
import Transition from '../transition/index.vue';
import { notifyProps } from './common';

const { create, useVinContext } = createComponent('notify');

export default create({
  components: {
    [Transition.name]: Transition,
  },
  props: notifyProps,
  emits: ['update:visible', 'closed', 'click'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    let timer: null | number = null;

    const mainClass = computed(() =>
      getMainClass([`vin-popup-${props.position}`, `vin-notify--${props.type}`])
    );
    const mainStyle = computed(() =>
      getMainStyle({
        color: props.color,
        background: props.background,
      })
    );

    const onClick = () => {
      emit('click');
    };
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const hide = () => {
      emit('update:visible', false);
      emit('closed');
    };

    const show = () => {
      clearTimer();
      if (props.duration) {
        timer = setTimeout(() => {
          hide();
        }, props.duration);
      }
    };

    watch(
      () => props.visible,
      (value: boolean) => {
        if (value) {
          show();
        }
      }
    );

    const onAfterLeave = () => {
      if (props.visible) {
        clearTimer();
        hide();
      }
    };

    return { mainStyle, mainClass, hide, onAfterLeave, onClick };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
