<template>
  <view
    :style="!showMax ? styles : maxStyles"
    :class="classes"
    @click="activeAvatar"
    ref="avatarRef"
    v-if="showMax || !parent?.props?.maxCount || index <= Number(parent?.props?.maxCount)"
  >
    <template v-if="!parent?.props?.maxCount || index <= Number(parent?.props?.maxCount)">
      <template v-if="url">
        <img :src="url" :alt="alt" @error="onError" />
      </template>
      <template v-else-if="icon">
        <vin-icon custom-class="icon" :name="iconStyles"></vin-icon>
      </template>
      <view class="text" v-if="isShowText">
        <slot></slot>
      </view>
    </template>
    <template v-if="showMax && parent?.props?.maxCount">
      {{
        parent?.props?.maxContent
          ? parent?.props?.maxContent
          : `+ ${maxIndex - (Number(parent?.props?.maxCount) || 0)}`
      }}
    </template>
  </view>
</template>
<script lang="ts">
import { toRefs, onMounted, computed, reactive, ref } from 'vue';
import { createComponent } from '../common/create';
import { avatarProps } from './common';
import { AVATAR_KEY } from '../avatar-group/common';
import type { AvatarGroupProps } from '../avatar-group/common';
import { useInject } from '../../shared/hooks';

const { create, useVinContext, componentName } = createComponent('avatar');

export default create({
  props: avatarProps,
  emits: ['active-avatar', 'onError'],
  setup(props, { emit, slots }) {
    const { size, shape, bgColor, color, icon } = toRefs(props);
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { parent, index } = useInject<{
      props: Required<AvatarGroupProps>;
    }>(AVATAR_KEY);
    const sizeValue = ['large', 'normal', 'small'];

    const avatarRef = ref(null);
    const visible = reactive({
      lightTheme: false,
    });
    const state = reactive({
      index: 1,
      showMax: false, // 是否显示的最大头像个数
      maxIndex: 0, // avatarGroup里的avatar的个数
    });

    const avatarLength = (children: any) => {
      state.maxIndex = children.length;
      state.index = index.value;
      if (state.index === state.maxIndex && state.index !== parent?.props?.maxCount) {
        state.showMax = true;
      }
    };

    onMounted(() => {
      const children = parent?.internalChildren;
      if (children) {
        avatarLength(children);
      }
    });

    const classes = computed(() => {
      return getMainClass({
        [`${componentName}-${size.value || parent?.props?.size || 'normal'}`]: true,
        [`${componentName}-${shape.value || parent?.props?.shape || 'normal'}`]: true,
      });
    });

    const styles = computed(() => {
      return getMainStyle({
        width: sizeValue.indexOf(size.value) > -1 ? '' : `${size.value}px`,
        height: sizeValue.indexOf(size.value) > -1 ? '' : `${size.value}px`,
        backgroundColor: `${bgColor.value}`,
        color: `${color.value}`,
        marginLeft: state.index !== 1 && (parent?.props?.span ? `${parent?.props?.span}px` : ''),
        zIndex:
          parent?.props?.zIndex === 'right' ? `${Math.abs(state.maxIndex - state.index)}` : '',
      });
    });

    const maxStyles = computed(() => {
      return getMainStyle({
        backgroundColor: `${parent?.props?.maxBgColor}`,
        color: `${parent?.props?.maxColor}`,
      });
    });

    const iconStyles = computed(() => {
      return icon.value ? icon.value : '';
    });

    const isShowText = computed(() => {
      return slots.default;
    });

    const activeAvatar = (event: any) => {
      emit('active-avatar', event);
    };

    const onError = (event: any) => {
      emit('onError', event);
    };

    return {
      classes,
      styles,
      iconStyles,
      isShowText,
      maxStyles,
      activeAvatar,
      onError,
      parent,
      visible,
      avatarRef,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
