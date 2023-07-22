<template>
  <view :class="mainClass" :style="mainStyle" @click="handleClickStep">
    <view class="vin-step-head">
      <view class="vin-step-line"></view>
      <view class="vin-step-icon" :class="[!dot ? (icon ? 'is-icon' : 'is-text') : '']">
        <template v-if="icon">
          <vin-icon class="vin-step-icon-inner" :color="iconColor" :name="icon" :size="size" />
        </template>
        <template v-else-if="dot"></template>
        <template v-else>
          <view class="vin-step-inner">{{ index }}</view>
        </template>
      </view>
    </view>
    <view class="vin-step-main">
      <view class="vin-step-title">
        <text v-if="!$slots.title">{{ title }}</text>
        <slot name="title"></slot>
      </view>
      <view class="vin-step-content" v-if="content || $slots.content">
        <!-- eslint-disable-next-line -->
        <text v-if="!$slots.content" v-html="content"></text>
        <slot name="content"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {
  reactive,
  computed,
  inject,
  toRefs,
  getCurrentInstance,
  ComponentInternalInstance,
} from 'vue';
import { createComponent } from '../common/create';
import { stepProps } from './common';

const { create, componentName, useVinContext } = createComponent('step');

export default create({
  props: stepProps,
  emits: ['click-step'],

  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const parent: any = inject('parent');
    parent.relation(proxy);

    const state = reactive({
      dot: parent.props.progressDot,
    });

    const index = computed(() => parent.state.children.indexOf(proxy) + 1);

    const getCurrentStatus = () => {
      const activeIndex = index.value;
      if (activeIndex < +parent.props.current) return 'finish';
      return activeIndex === +parent.props.current ? 'process' : 'wait';
    };

    const status = computed(() => {
      return getCurrentStatus();
    });

    const mainClass = computed(() => {
      const prefixCls = componentName;
      return getMainClass({
        [`${prefixCls}-${status.value}`]: true,
      });
    });

    const mainStyle = computed(getMainStyle);

    const handleClickStep = () => {
      parent.onEmit(index.value);
    };

    return {
      ...toRefs(state),
      index,
      mainClass,
      mainStyle,
      handleClickStep,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
