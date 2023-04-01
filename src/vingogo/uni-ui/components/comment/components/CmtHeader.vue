<template>
  <view>
    <view class="vin-comment-header" @click="handleClick" v-if="info">
      <view class="vin-comment-header__user">
        <view class="vin-comment-header__user-avater">
          <vin-avatar v-if="info.avatar" size="large" :icon="info.avatar"></vin-avatar>
        </view>

        <view :class="[`vin-comment-header__user-${type}`]" v-if="type == 'default'">
          <view :class="[`vin-comment-header__user-${type}-name`]">
            <span>{{ info.nickName }}</span>
            <slot name="labels"></slot>
          </view>

          <view class="vin-comment-header__user-score">
            <vin-rate
              v-model="info.score"
              icon-size="10"
              spacing="5"
              readonly
              @change="handleClick"
            />
          </view>
        </view>

        <view :class="[`vin-comment-header__user-${type}`]" v-else>
          <span :class="[`vin-comment-header__user-${type}-name`]">{{ info.nickName }}</span>
          <slot name="labels"></slot>
        </view>
      </view>
      <view class="vin-comment-header__time" v-if="info.time">{{ info.time }}</view>
    </view>
    <view :class="[`vin-comment-header__${type}-score`]" v-if="type == 'complex'">
      <vin-rate v-model="info.score" icon-size="12" spacing="3" readonly />
      <i :class="[`vin-comment-header__${type}-score-i`]"></i>
      <view :class="[`vin-comment-header__${type}-score-size`]">{{ info.size }}</view>
    </view>
  </view>
</template>
<script lang="ts">
import { createComponent } from '../../common/create';

const { componentName, create } = createComponent('comment-header');

export default create({
  props: {
    type: {
      type: String,
      default: 'default', // default，complex
    },
    info: {
      type: Object,
      default: () => ({}),
    },
    labels: {
      type: Function,
      default: () => '',
    },
  },
  emits: ['handleClick'],

  setup(props, { emit }) {
    const handleClick = () => {
      emit('handleClick');
    };

    return { handleClick };
  },
});
</script>
<style lang="scss">
@import '../index.scss';
</style>
