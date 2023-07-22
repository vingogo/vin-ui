<template>
  <vin-transition
    name="toast-fade"
    :custom-class="mainClass"
    :show="visible"
    :custom-style="mainStyle"
    @click="clickCover"
    @after-leave="onAfterLeave"
  >
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else>
      <view :class="['vin-toast-inner', toastClass]" :style="toastInnerStyle">
        <view v-if="hasIcon" class="vin-toast-icon-wrapper">
          <vin-icon :size="iconSize" color="#ffffff" :name="iconName"></vin-icon>
        </view>
        <view v-if="title" class="vin-toast-title">
          {{ title }}
        </view>
        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
        <view class="vin-toast-text" v-html="msg"></view>
      </view>
    </template>
  </vin-transition>
</template>
<script lang="ts">
import { computed, CSSProperties, watch } from 'vue';
import { createComponent } from '../common/create';
import { toastProps } from './common';

const { create, useVinContext } = createComponent('toast');

export default create({
  props: toastProps,
  emits: ['update:visible', 'closed'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    let timer: NodeJS.Timeout | null | undefined;
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
    const clickCover = () => {
      if (props.closeOnClickOverlay) {
        hide();
      }
    };

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          show();
        }
      },
    );

    const hasIcon = computed(() => {
      if (props.type !== 'text') {
        return true;
      }
      return !!props.icon;
    });
    const iconName = computed(() => {
      if (props.icon) {
        return props.icon;
      }
      return {
        success: 'success',
        fail: 'failure',
        warn: 'tips',
        loading: 'loading',
      }[props.type];
    });
    const mainClass = computed(() => {
      return getMainClass([
        { 'vin-toast-center': props.center },
        { 'vin-toast-has-icon': hasIcon.value },
        { 'vin-toast-cover': props.cover },
        {
          'vin-toast-loading': props.type === 'loading',
        },
        `vin-toast-${props.size}`,
      ]);
    });

    const mainStyle = computed(() => {
      return getMainStyle({
        bottom: props.center ? 'auto' : props.bottom,
        'background-color': props.coverColor,
      });
    });

    const toastInnerStyle = computed(() => {
      return {
        'text-align': props.textAlignCenter ? 'center' : 'left',
        'background-color': props.bgColor,
        ...(props.toastStyle || {}),
      } as CSSProperties;
    });

    const onAfterLeave = () => {
      if (props.visible) {
        clearTimer();
        hide();
      }
    };

    return {
      clickCover,
      hasIcon,
      iconName,
      mainClass,
      mainStyle,
      onAfterLeave,
      toastInnerStyle,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
