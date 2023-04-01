<template>
  <scroll-view
    :class="mainClass"
    scrollY="true"
    :style="mainStyle"
    id="scroller"
    @scrolltolower="lower"
    @scroll="scroll"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    <view class="vin-infinite-top" :style="getStyle">
      <view class="top-box" id="refreshTop">
        <vin-icon custom-class="top-img" :name="pullIcon"></vin-icon>
        <view class="top-text">{{ pullText || translate('pullTxt') }}</view>
      </view>
    </view>

    <view class="vin-infinite-container">
      <slot></slot>
    </view>

    <view class="vin-infinite-bottom">
      <template v-if="isInfiniting">
        <view class="bottom-box">
          <vin-icon custom-class="bottom-img" :name="loadIcon"></vin-icon>
          <view class="bottom-text">{{ loadText || translate('loading') }}</view>
        </view>
      </template>
      <template v-else-if="!hasMore">
        <view class="tips">{{ loadMoreText || translate('loadMoreTxt') }}</view>
      </template>
    </view>
  </scroll-view>
</template>
<script lang="ts">
import { toRefs, onMounted, reactive, computed } from 'vue';
import { createComponent } from '../common/create';
import { infiniteLoadingProps } from './common';

const { create, translate, useVinContext } = createComponent('infiniteloading');

export default create({
  props: infiniteLoadingProps,
  emits: ['scroll-change', 'load-more', 'refresh'],
  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const state = reactive({
      scrollHeight: 0,
      scrollTop: 0,
      isInfiniting: false,
      direction: 'down',
      isTouching: false,
      refreshMaxH: 0,
      y: 0,
      x: 0,
      distance: 0,
    });

    const mainClass = computed(getMainClass);
    const mainStyle = computed(() => getMainStyle({ height: '100%' }));

    const getStyle = computed(() => {
      return {
        height: state.distance < 0 ? '0px' : `${state.distance}px`,
        transition: state.isTouching
          ? 'height 0s cubic-bezier(0.25,0.1,0.25,1)'
          : 'height 0.2s cubic-bezier(0.25,0.1,0.25,1)',
      };
    });

    const getParentElement = (el) => {
      return uni
        .createSelectorQuery()
        .select(props.containerId ? `#${props.containerId} #${el}` : `#${el}`);
    };
    /** 获取需要滚动的距离 */
    const getScrollHeight = () => {
      const parentElement = getParentElement('scroller');

      parentElement
        .boundingClientRect((rect) => {
          state.scrollHeight = rect?.height || 0;
        })
        .exec();
    };

    const infiniteDone = () => {
      state.isInfiniting = false;
    };

    /** 滚动到底部 */
    const lower = () => {
      if (state.direction === 'up' || !props.hasMore || state.isInfiniting) {
        return false;
      }
      state.isInfiniting = true;
      emit('load-more', infiniteDone);
    };

    const scroll = (e) => {
      // 滚动方向
      if (e.detail.scrollTop <= 0) {
        // 滚动到最顶部
        e.detail.scrollTop = 0;
      } else if (e.detail.scrollTop >= state.scrollHeight) {
        // 滚动到最底部
        e.detail.scrollTop = state.scrollHeight;
      }
      if (e.detail.scrollTop > state.scrollTop || e.detail.scrollTop >= state.scrollHeight) {
        state.direction = 'down';
      } else {
        state.direction = 'up';
      }
      state.scrollTop = e.detail.scrollTop;

      emit('scroll-change', e.detail.scrollTop);
    };

    const touchStart = (event: TouchEvent) => {
      if (state.scrollTop === 0 && !state.isTouching && props.isOpenRefresh) {
        state.y = event.touches[0].pageY;
        state.isTouching = true;
      }
    };

    const touchMove = (event: TouchEvent) => {
      state.distance = event.touches[0].pageY - state.y;

      if (state.distance > 0 && state.isTouching) {
        event.preventDefault();
        if (state.distance >= state.refreshMaxH) state.distance = state.refreshMaxH;
      } else {
        state.distance = 0;
        state.isTouching = false;
      }
    };

    const refreshDone = () => {
      state.distance = 0;
      state.isTouching = false;
    };

    const touchEnd = () => {
      if (state.distance < state.refreshMaxH) {
        state.distance = 0;
      } else {
        emit('refresh', refreshDone);
      }
    };

    onMounted(() => {
      state.refreshMaxH = props.upperThreshold;
      setTimeout(() => {
        getScrollHeight();
      }, 200);
    });

    return {
      mainStyle,
      mainClass,
      ...toRefs(state),
      lower,
      scroll,
      touchStart,
      touchMove,
      touchEnd,
      getStyle,
      translate,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
