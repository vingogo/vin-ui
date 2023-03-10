<template>
  <view
    :class="mainClass"
    :style="mainStyle"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view class="vin-swipe__left" ref="leftRef" :id="leftRefId">
      <slot name="left"></slot>
    </view>

    <view class="vin-swipe__content">
      <slot name="default"></slot>
    </view>

    <view class="vin-swipe__right" ref="rightRef" :id="rightRefId">
      <slot name="right"></slot>
    </view>
  </view>
</template>
<script lang="ts">
import {
  computed,
  onMounted,
  reactive,
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue';
import { useTouch, useRect } from '../../shared/hooks';
import { createComponent } from '../../common/create';
import { swipeProps } from './common';

const { create, useVinContext } = createComponent('swipe');
export type SwipePosition = 'left' | 'right' | '';
export default create({
  props: swipeProps,
  emits: ['open', 'close'],

  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const instance = getCurrentInstance() as ComponentInternalInstance;
    const refRandomId = Math.random().toString(36).slice(-8);
    const mainClass = computed(getMainClass);

    const getRefWidth = async (elementId: string) => {
      const rect = await useRect(elementId, instance);
      return rect?.width || 0;
    };

    const leftRefId = `leftRef-${refRandomId}`;
    const leftRefWidth = ref(0);
    const rightRefId = `rightRef-${refRandomId}`;
    const rightRefWidth = ref(0);

    const initWidth = async () => {
      leftRefWidth.value = await getRefWidth(leftRefId);
      rightRefWidth.value = await getRefWidth(rightRefId);
    };

    onMounted(() => {
      setTimeout(() => {
        initWidth();
      }, 100);
    });

    let opened = false;
    let position: SwipePosition = '';
    let oldPosition: SwipePosition = '';

    const state = reactive({
      offset: 0,
      moving: false,
    });

    const open = (p: SwipePosition = '') => {
      opened = true;
      if (p) {
        state.offset = p === 'left' ? -rightRefWidth.value : leftRefWidth.value;
      }
      emit('open', {
        name: props.name,
        position: position || p,
      });
    };

    const close = () => {
      state.offset = 0;
      opened = false;
      emit('close', {
        name: props.name,
        position,
      });
    };

    const mainStyle = computed(() => {
      return getMainStyle({
        transform: `translate3d(${state.offset}px, 0, 0)`,
      });
    });

    const setoffset = (deltaX: number) => {
      position = deltaX > 0 ? 'right' : 'left';
      let offset = deltaX;
      switch (position) {
        case 'left':
          if (opened && oldPosition === position) {
            offset = -rightRefWidth.value;
          } else {
            offset = Math.abs(deltaX) > rightRefWidth.value ? -rightRefWidth.value : deltaX;
          }
          break;
        case 'right':
          if (opened && oldPosition === position) {
            offset = leftRefWidth.value;
          } else {
            offset = Math.abs(deltaX) > leftRefWidth.value ? leftRefWidth.value : deltaX;
          }
          break;
        default:
          break;
      }
      state.offset = offset;
    };

    const touch = useTouch();
    const touchMethods = {
      onTouchStart(event: Event) {
        if (props.disabled) return;
        touch.start(event);
      },
      async onTouchMove(event: Event) {
        if (props.disabled) return;
        touch.move(event);
        if (touch.isHorizontal()) {
          state.moving = true;
          setoffset(touch.deltaX.value);
          if (props.touchMovePreventDefault) {
            event.preventDefault();
          }
          if (props.touchMoveStopPropagation) {
            event.stopPropagation();
          }
        }
      },
      onTouchEnd() {
        if (state.moving) {
          state.moving = false;
          oldPosition = position;
          switch (position) {
            case 'left':
              if (Math.abs(state.offset) <= rightRefWidth.value / 2) {
                close();
              } else {
                state.offset = -rightRefWidth.value;
                open();
              }
              break;
            case 'right':
              if (Math.abs(state.offset) <= leftRefWidth.value / 2) {
                close();
              } else {
                state.offset = leftRefWidth.value;
                open();
              }
              break;
            default:
              break;
          }
        }
      },
    };

    return {
      mainClass,
      mainStyle,
      ...touchMethods,
      leftRefId,
      rightRefId,
      refRandomId,
      open,
      close,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
