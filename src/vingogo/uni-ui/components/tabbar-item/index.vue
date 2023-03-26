<template>
  <view :class="mainClass" :style="mainStyle" @click="change(state.index)">
    <view class="vin-tabbar-item_icon-box">
      <template v-if="!dot">
        <view
          class="vin-tabbar-item_icon-box_tips vin-tabbar-item_icon-box_num"
          v-if="num && num <= 99"
        >
          {{ num }}
        </view>
        <view
          class="vin-tabbar-item_icon-box_tips vin-tabbar-item_icon-box_nums"
          v-else-if="num && num > 100"
          >{{ '99+' }}</view
        >
      </template>
      <template v-if="dot">
        <view class="vin-tabbar-item_icon-box_dot"></view>
      </template>
      <view v-if="icon">
        <vin-icon
          class="vin-tabbar-item_icon-box_icon"
          :size="state.size"
          :name="icon"
          :font-class-name="fontClassName"
          :class-prefix="classPrefix"
        ></vin-icon>
      </view>
      <view
        v-if="!icon && activeImg"
        class="vin-tabbar-item_icon-box_icon"
        :style="{
          backgroundImage: `url(${state.active == state.index ? activeImg : img})`,
          width: state.size,
          height: state.size,
        }"
      ></view>
      <view
        :class="[
          'vin-tabbar-item_icon-box_nav-word',
          { 'vin-tabbar-item_icon-box_big-word': !icon && !activeImg },
        ]"
      >
        <view v-if="tabTitle">{{ tabTitle }}</view>
        <slot v-if="!tabTitle"></slot>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  inject,
  reactive,
  watch,
} from 'vue';
import { createComponent } from '../../common/create';
import Icon from '../icon/index.vue';
import { tabbarItemProps } from './common';

const { create, useVinContext } = createComponent('tabbar-item');

export default create({
  component: {
    [Icon.name]: Icon,
  },
  props: tabbarItemProps,
  setup(props) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const parent: any = inject('parent');
    const state = reactive({
      size: parent.size,
      unactiveColor: parent.unactiveColor, // 未选中的颜色
      activeColor: parent.activeColor, // 选中的颜色
      active: parent.modelValue, // 是否选中
      index: 0,
    });
    const relation = (child: ComponentInternalInstance): void => {
      if (child.proxy) {
        const index = parent.children.length;
        state.index = index;
        parent.children.push(child.proxy);
      }
    };
    relation(getCurrentInstance() as ComponentInternalInstance);
    const change = (index: Number) => {
      parent.changeIndex(index);
    };
    const choosed = computed(() => {
      if (parent) {
        return parent.modelValue;
      }
      return null;
    });
    watch(choosed, (value, oldValue) => {
      state.active = value;
      setTimeout(() => {
        if (parent.children[value].href) {
          window.location.href = parent.children[value].href;
        }
      });
    });

    const mainClass = computed(() => {
      return getMainClass({
        'vin-tabbar-item__icon--unactive': state.active !== state.index,
      });
    });

    const mainStyle = computed(() => {
      return getMainStyle({
        color: state.active === state.index ? state.activeColor : state.unactiveColor,
      });
    });

    return {
      mainStyle,
      mainClass,
      state,
      change,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
