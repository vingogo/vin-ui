<template>
  <scroll-view
    :class="mainClass"
    :scroll-y="true"
    :style="mainStyle"
    scroll-top="0"
    @scroll="handleScrollEvent"
    ref="list"
  >
    <view class="vin-list-phantom" :style="{ height: listHeight + 'px' }"></view>
    <view class="vin-list-container" :style="{ transform: getTransform }">
      <view
        class="vin-list-item"
        :style="{ height: height + 'px' }"
        v-for="(item, index) in visibleData"
        :key="item"
      >
        <slot :item="item" :index="index"></slot>
      </view>
    </view>
  </scroll-view>
</template>
<script lang="ts">
import { reactive, toRefs, computed, ref, Ref, watch } from 'vue';
import { createComponent } from '../common/create';
import { listProps } from './common';

const { create, useVinContext } = createComponent('list');

export default create({
  props: listProps,
  emits: ['scroll'],

  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const list = ref(null) as Ref;
    const state = reactive({
      startOffset: 0,
      start: 0,
      list: props.listData.slice(),
    });

    const visibleCount = computed(() => {
      return Math.ceil(props.containerHeight / props.height);
    });

    const end = computed(() => {
      return state.start + visibleCount.value;
    });

    const getTransform = computed(() => {
      return `translate3d(0, ${state.startOffset}px, 0)`;
    });

    const mainClass = computed(getMainClass);
    const mainStyle = computed(() => getMainStyle({ height: `${props.containerHeight}px` }));

    const listHeight = computed(() => {
      return state.list.length * props.height;
    });

    const visibleData = computed(() => {
      return state.list.slice(state.start, Math.min(end.value, state.list.length));
    });

    const handleScrollEvent = async (e: any) => {
      const { scrollTop } = e.detail;
      state.start = Math.floor(scrollTop / props.height);
      if (end.value > state.list.length) {
        emit('scroll');
      }
      state.startOffset = scrollTop - (scrollTop % props.height);
    };

    watch(
      () => props.listData,
      () => {
        state.list = props.listData.slice();
      }
    );

    return {
      ...toRefs(state),
      list,
      getTransform,
      listHeight,
      visibleData,
      mainClass,
      mainStyle,
      handleScrollEvent,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
