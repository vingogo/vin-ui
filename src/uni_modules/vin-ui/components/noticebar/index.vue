<template>
  <view :class="mainClass" :style="mainStyle">
    <view
      v-show="showNoticeBar"
      class="vin-noticebar-page"
      :class="{
        withicon: closeMode,
        close: closeMode,
        wrapable: wrapable,
      }"
      :style="barStyle"
      @click="handleClick"
      v-if="direction == 'across'"
    >
      <view
        class="left-icon"
        v-if="iconShow"
        :style="{
          'background-image': `url(${iconBg})`,
        }"
      >
        <slot name="left-icon"
          ><vin-icon name="notice" size="16" :color="color" v-if="!iconBg"></vin-icon
        ></slot>
      </view>
      <view ref="wrap" :class="`wrap wrap${id}`">
        <view
          ref="content"
          class="content"
          :class="[animationClass, { 'vin-ellipsis': isEllipsis }, `content${id}`]"
          :style="contentStyle"
          @animationend="onAnimationEnd"
          @webkitAnimationEnd="onAnimationEnd"
        >
          <slot>{{ text }}</slot>
        </view>
      </view>
      <view v-if="closeMode || rightIcon" class="right-icon" @click.stop="onClickIcon">
        <slot name="right-icon">
          <vin-icon :name="rightIcon ? rightIcon : 'close'" :color="color"></vin-icon
        ></slot>
      </view>
    </view>

    <view
      class="vin-noticebar-vertical"
      v-if="scrollList.length > 0 && direction == 'vertical'"
      :style="barStyle"
    >
      <ul class="horseLamp_list" :style="horseLampStyle">
        <li
          class="horseLamp_list_item"
          v-for="(item, index) in scrollList"
          :key="index"
          :style="{ height: height }"
          @click="go(item)"
        >
          {{ item }}
        </li>
      </ul>

      <view class="go" @click="!slots.rightIcon && handleClickIcon()">
        <template v-if="slots.rightIcon">
          <slot name="rightIcon"></slot>
        </template>
        <template v-else-if="closeMode">
          <vin-icon type="cross" :color="color" size="11px"></vin-icon>
        </template>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import {
  toRefs,
  onMounted,
  onUnmounted,
  reactive,
  computed,
  onActivated,
  onDeactivated,
  ref,
  watch,
  getCurrentInstance,
} from 'vue';
import { createComponent } from '../common/create';
import { noticebarProps } from './common';

const { create, useVinContext } = createComponent('noticebar');

export default create({
  props: noticebarProps,
  emits: ['click', 'close'],

  setup(props, { emit, slots }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const instance = getCurrentInstance();
    const wrap = ref<null | HTMLElement>(null);
    const content = ref<null | HTMLElement>(null);

    const state = reactive({
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      showNoticeBar: true,
      animationClass: '',

      animate: false,
      scrollList: [],
      distance: 0,
      timer: null,
      keepAlive: false,
      isCanScroll: false,
      id: Math.round(Math.random() * 100000),
    });

    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    const isEllipsis = computed(() => {
      if (state.isCanScroll == null) {
        return false && !props.wrapable;
      }
      return !state.isCanScroll && !props.wrapable;
    });

    const iconShow = computed(() => {
      if (props.leftIcon === 'close') {
        return false;
      }
      return true;
    });

    const barStyle = computed(() => {
      const style: {
        [props: string]: any;
      } = {
        color: props.color,
        background: props.background,
      };

      if (props.direction === 'vertical') {
        style.height = `${props.height}px`;
      }
      return style;
    });

    const contentStyle = computed(() => {
      return {
        animationDelay: `${state.firstRound ? props.delay : 0}s`,
        animationDuration: `${state.duration}s`,
        transform: `translateX(${state.firstRound ? 0 : `${state.wrapWidth}px`})`,
      };
    });

    const iconBg = computed(() => {
      let leftIcon = '';
      if (props.leftIcon) {
        leftIcon = props.leftIcon;
      }
      return leftIcon;
    });
    const horseLampStyle = computed(() => {
      let styles = {};
      if (props.complexAm) {
        styles = {
          transform: `translateY(${state.distance}px)`,
        };
      } else if (state.animate) {
        styles = {
          transition: `all ${~~(props.height / props.speed / 4)}s`,
          'margin-top': `-${props.height}px`,
        };
      }
      return styles;
    });

    watch(
      () => props.list,
      (value) => {
        state.scrollList = [].concat(value as any);
      },
    );

    const initScrollWrap = () => {
      if (state.showNoticeBar === false) {
        return;
      }
      setTimeout(() => {
        let wrapWidth = 0;
        let offsetWidth = 0;
        const query = uni
          .createSelectorQuery()
          // #ifndef MP-ALIPAY
          .in(instance);
        // #endif

        query
          .select(`.wrap${state.id}`)
          .boundingClientRect((rect: any) => {
            if (rect?.width > 0) wrapWidth = rect.width;
          })
          .exec();

        query
          .select(`.content${state.id}`)
          .boundingClientRect((rect: any) => {
            if (rect.width > 0) offsetWidth = rect.width;

            state.isCanScroll =
              props.scrollable == null ? offsetWidth > wrapWidth : props.scrollable;

            if (state.isCanScroll) {
              state.wrapWidth = wrapWidth;
              state.offsetWidth = offsetWidth;

              state.duration = offsetWidth / props.speed;
              state.animationClass = 'play';
            } else {
              state.animationClass = '';
            }
          })
          .exec();
      }, 100);
    };
    const handleClick = (event: Event) => {
      emit('click', event);
    };

    const onClickIcon = (event: Event) => {
      if (props.closeMode) {
        state.showNoticeBar = !props.closeMode;
      }
      emit('close', event);
    };

    const onAnimationEnd = () => {
      state.firstRound = false;

      setTimeout(() => {
        state.duration = (state.offsetWidth + state.wrapWidth) / props.speed;
        state.animationClass = 'play-infinite';
      }, 0);
    };

    const showhorseLamp = () => {
      state.animate = true;
      setTimeout(() => {
        state.scrollList.push(state.scrollList[0]);
        state.scrollList.shift();
        state.animate = false;
      }, ~~(props.height / props.speed / 4) * 1000);
    };

    /**
     * 利益点滚动方式一
     */
    const startRollEasy = () => {
      showhorseLamp();
      (state.timer as any) = setInterval(
        showhorseLamp,
        ~~(props.height / props.speed / 4) * 1000 + props.standTime,
      );
    };

    const scroll = (n: number, last: boolean) => {
      setTimeout(() => {
        state.distance -= props.height / 100;
        if (last) {
          state.scrollList.push(state.scrollList[0]);
          state.scrollList.shift();
          state.distance = 0;
        }
      }, n * props.speed);
    };

    const startRoll = () => {
      (state.timer as any) = setInterval(() => {
        const chunk = 100;
        for (let i = 0; i < chunk; i++) {
          scroll(i, !(i < chunk - 1));
        }
      }, props.standTime + 100 * props.speed);
    };
    /**
     * 点击滚动单元
     */
    const go = (item: any) => {
      emit('click', item);
    };

    const handleClickIcon = () => {
      emit('close', state.scrollList[0]);
    };

    watch(
      () => props.text,
      () => {
        initScrollWrap();
      },
    );

    onMounted(() => {
      if (props.direction === 'vertical') {
        // uniapp 暂不支持 slots.default()
        if (!slots.default) {
          //   state.scrollList = [].concat(slots.default()[0].children as any);
          // } else {
          state.scrollList = [].concat(props.list as any);
        }

        setTimeout(() => {
          props.complexAm ? startRoll() : startRollEasy();
        }, props.standTime);
      } else {
        initScrollWrap();
      }
    });

    onActivated(() => {
      if (state.keepAlive) {
        state.keepAlive = false;
      }
    });

    onDeactivated(() => {
      state.keepAlive = true;
      clearInterval(state.timer as any);
    });

    onUnmounted(() => {
      clearInterval(state.timer as any);
    });

    return {
      ...toRefs(props),
      ...toRefs(state),
      isEllipsis,
      mainClass,
      mainStyle,
      iconShow,
      barStyle,
      contentStyle,
      iconBg,
      horseLampStyle,
      wrap,
      content,
      handleClick,
      onClickIcon,
      onAnimationEnd,
      go,
      handleClickIcon,
      slots,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
