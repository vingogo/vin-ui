<template>
  <vin-popup
    :visible="visible"
    position="bottom"
    round
    @click-overlay="close"
    :closeOnClickOverlay="closeAbled"
  >
    <view :class="classes">
      <view v-if="title" class="vin-action-sheet__title">{{ title }}</view>
      <slot></slot>
      <view v-if="!slotDefault">
        <view class="vin-action-sheet__item vin-action-sheet__desc" v-if="description">{{
          description
        }}</view>
        <view class="vin-action-sheet__menu" v-if="menuItems.length">
          <view
            v-for="(item, index) of menuItems"
            class="vin-action-sheet__item"
            :class="{
              'vin-action-sheet__item--disabled': item.disable,
              'vin-action-sheet__item--loading': item.loading,
            }"
            :style="{ color: isHighlight(item) || item.color }"
            :key="index"
            @click="chooseItem(item, index)"
          >
            <vin-icon v-if="item.loading" name="loading" />
            <view v-else> {{ item[optionTag] }}</view>
            <view class="vin-action-sheet__subdesc">{{ item[optionSubTag] }}</view>
          </view>
        </view>
        <view class="vin-action-sheet__cancel" v-if="cancelTxt" @click="cancelActionSheet">
          {{ cancelTxt }}
        </view>
      </view>
    </view>
  </vin-popup>
</template>
<script lang="ts">
import { computed, useSlots } from 'vue';
import { createComponent } from '../common/create';
import { actionSheetProps } from './common';

const { create, useVinContext } = createComponent('action-sheet');

export interface menuItems {
  disable: boolean;
  loading: boolean;
  color: string;
  name: string;
  subname: string;
  [x: string]: string | boolean;
}
export default create({
  props: actionSheetProps,
  emits: ['cancel', 'choose', 'update:visible', 'close'],

  setup(props, { emit }) {
    const { getMainClass } = useVinContext(props);
    const slotDefault = !!useSlots().default;
    const classes = computed(getMainClass);

    const isHighlight = (item: { [x: string]: string | boolean }) => {
      return props.chooseTagValue && props.chooseTagValue === item[props.optionTag]
        ? props.color
        : '';
    };

    const cancelActionSheet = () => {
      emit('cancel');
      emit('update:visible', false);
    };

    const chooseItem = (item: { disable: boolean; loading: boolean }, index: any) => {
      if (!item.disable && !item.loading) {
        emit('choose', item, index);
        emit('update:visible', false);
      }
    };

    const close = (e: Event) => {
      emit('close', e);
      emit('update:visible', false);
    };

    return {
      slotDefault,
      isHighlight,
      cancelActionSheet,
      chooseItem,
      close,
      classes,
    };
  },
});
</script>

<style lang="scss">
@import './index.scss';
</style>
