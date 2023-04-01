<template>
  <view>
    <vin-overlay
      v-if="overlay"
      :visible="visible"
      :close-on-click-overlay="closeOnClickOverlay"
      :class="overlayClass"
      :style="overlayStyle"
      :z-index="zIndex"
      :duration="duration"
      @click="onClickOverlay"
    />
    <vin-transition
      :show="visible"
      :name="transitionName"
      :custom-class="mainClass"
      :custom-style="popStyle"
      :duration="duration"
      @after-enter="onOpened"
      @after-leave="onClosed"
      @click="onClick"
    >
      <slot v-if="showSlot"></slot>
      <view
        v-if="closed"
        @click="onClickCloseIcon"
        class="vin-popup__close-icon"
        :class="'vin-popup__close-icon--' + closeIconPosition"
      >
        <vin-icon :name="closeIcon" size="12px" />
      </view>
    </vin-transition>
  </view>
</template>
<script lang="ts">
import {
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  watch,
  computed,
  reactive,
  toRefs,
} from 'vue';
import { popupProps } from './common';
import { createComponent } from '../common/create';

const { create, useVinContext } = createComponent('popup');

let defaultZIndex = 2000;

export default create({
  props: popupProps,
  emits: [
    'click',
    'click-close-icon',
    'open',
    'close',
    'opend',
    'closed',
    'update:visible',
    'click-overlay',
  ],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const state = reactive({
      zIndex: props.zIndex ? props.zIndex : defaultZIndex,
      showSlot: true,
      transitionName: `popup-fade-${props.position}`,
      overLayCount: 1,
      keepAlive: false,
      closed: props.closeable,
    });

    const mainClass = computed(() => {
      return getMainClass({
        round: props.round,
        [`vin-popup-${props.position}`]: true,
        [`vin-popup-${props.position}--safebottom`]:
          props.position === 'bottom' && props.safeAreaInsetBottom,
        [props.popClass]: true,
      });
    });

    const popStyle = computed(() => {
      return getMainStyle({ zIndex: state.zIndex });
    });

    const open = () => {
      if (!props.visible) {
        if (props.zIndex !== undefined) {
          defaultZIndex = Number(props.zIndex);
        }
        emit('update:visible', true);
        state.zIndex = ++defaultZIndex;
      }
      if (props.destroyOnClose) {
        state.showSlot = true;
      }
      emit('open');
    };
    const close = () => {
      if (props.visible) {
        emit('update:visible', false);
        if (props.destroyOnClose) {
          setTimeout(() => {
            state.showSlot = false;
            emit('close');
          }, +props.duration * 1000);
        }
      }
    };
    const onClick = (e: Event) => {
      emit('click', e);
    };
    const onClickCloseIcon = (e: Event) => {
      emit('click-close-icon', e);
      close();
    };
    const onClickOverlay = (e: Event) => {
      if (props.closeOnClickOverlay) {
        emit('click-overlay', e);
        close();
      }
    };
    const onOpened = (e: Event) => {
      emit('opend', e);
    };
    const onClosed = (e: Event) => {
      emit('closed', e);
    };
    onMounted(() => {
      state.transitionName = props.transition ? props.transition : `popup-slide-${props.position}`;

      props.visible && open();
    });
    onBeforeUnmount(() => {
      props.visible && close();
    });
    onActivated(() => {
      if (state.keepAlive) {
        emit('update:visible', true);
        state.keepAlive = false;
      }
    });
    onDeactivated(() => {
      if (props.visible) {
        close();
        state.keepAlive = true;
      }
    });
    watch(
      () => props.visible,
      (value) => {
        if (value) {
          open();
        } else {
          close();
        }
      }
    );
    watch(
      () => props.position,
      (value) => {
        state.transitionName = value === 'center' ? 'popup-fade' : `popup-slide-${value}`;
      }
    );
    watch(
      () => props.closeable,
      (value) => {
        state.closed = value;
      }
    );
    return {
      ...toRefs(state),
      popStyle,
      mainClass,
      onClick,
      onClickCloseIcon,
      onClickOverlay,
      onOpened,
      onClosed,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
