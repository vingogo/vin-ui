<template>
  <view :class="mainClass" :style="mainStyle">
    <vin-overlay v-if="overlay" :visible="visible" :z-index="200" @click="updateValue(false)" />
    <slot name="list">
      <view class="vin-fixednav__list">
        <view
          class="vin-fixednav__list-item"
          v-for="(item, index) in navList"
          @click="selected(item, $event)"
          :key="item.id || index"
        >
          <img :src="item.icon" />
          <view class="span">{{ item.text }}</view>
          <view class="b" v-if="item.num">{{ item.num }}</view>
        </view>
      </view>
    </slot>
    <view class="vin-fixednav__btn" @click="updateValue()">
      <slot name="btn">
        <vin-icon name="left" color="#fff" />
        <view class="vin-fixednav__btn-text"
          >{{
            visible
              ? activeText || translate('activeText')
              : unActiveText || translate('unActiveText')
          }}
        </view>
      </slot>
    </view>
  </view>
</template>
<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { fixednavProps } from './common';

const { create, translate, useVinContext } = createComponent('fixednav');

export default create({
  props: fixednavProps,
  emits: ['update:visible', 'selected'],

  setup(props, { emit }) {
    const { getMainClass, getMainStyle } = useVinContext(props);

    const mainClass = computed(() => {
      return getMainClass({
        active: props.visible,
        [props.type]: true,
      });
    });

    const mainStyle = computed(() => {
      return getMainStyle(props.position);
    });

    const updateValue = (value = !props.visible) => {
      emit('update:visible', value);
    };
    const selected = (item: any, event: Event) => {
      emit('selected', {
        item,
        event,
      });
    };

    return { mainClass, mainStyle, updateValue, selected, translate };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
