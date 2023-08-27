<template>
  <view :class="mainClass" :style="mainStyle">
    <view class="vin-card__left">
      <image :src="imgUrl" alt="" />
    </view>
    <view class="vin-card__right">
      <view class="vin-card__right__title">{{ title }}</view>
      <slot name="prolist"></slot>
      <view class="vin-card__right__price" v-if="isNeedPrice">
        <template v-if="isHaveSlot('price')">
          <slot name="price"></slot>
        </template>
        <vin-price v-else-if="price" :price="price"></vin-price>
        <template v-if="isHaveSlot('origin')">
          <slot name="origin"></slot>
        </template>
        <vin-price
          v-else-if="vipPrice"
          class="vin-card__right__price__origin"
          :price="vipPrice"
        ></vin-price>
        <template v-if="isHaveSlot('tag')">
          <slot name="tag"></slot>
        </template>
      </view>
      <view class="vin-card__right__other">
        <template v-if="isHaveSlot('shop-tag')">
          <slot name="shop-tag"></slot>
        </template>
        <template v-else>
          <vin-tag type="danger">{{ shopDesc }}</vin-tag>
          <vin-tag plain>{{ delivery }}</vin-tag>
        </template>
      </view>
      <view class="vin-card__right__shop">
        <view class="vin-card__right__shop__name">{{ shopName }}</view>
        <slot name="footer"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed } from 'vue';
import { createComponent } from '../common/create';
import { cardProps } from './common';

const { create, useVinContext } = createComponent('card');

export default create({
  props: cardProps,
  setup(props, { slots }) {
    const { getMainClass, getMainStyle } = useVinContext(props);
    const mainClass = computed(getMainClass);
    const mainStyle = computed(getMainStyle);

    const isHaveSlot = (slot: string) => {
      return slots[slot];
    };

    return {
      mainClass,
      mainStyle,
      isHaveSlot,
    };
  },
});
</script>
<style lang="scss">
@import './index.scss';
</style>
